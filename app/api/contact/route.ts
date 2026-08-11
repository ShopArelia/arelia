import { NextResponse } from "next/server";
import { publicClient } from "@/utils/supabase/public";
import { Resend } from "resend";

const ADMIN_EMAIL = "shoparelia@yahoo.com";

// Constructed per-request: `new Resend()` throws when the key is absent, which
// at module scope would break `next build` on any machine without the secret.
function getResend() {
    const apiKey = process.env.RESEND_API_KEY;
    return apiKey ? new Resend(apiKey) : null;
}

const LIMITS = { name: 200, email: 320, reason: 100, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Everything here is attacker-controlled and lands in an inbox we open. */
function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, reason, message } = (body ?? {}) as Record<string, unknown>;

    const fields = { name, email, reason, message };
    for (const [key, value] of Object.entries(fields)) {
        if (typeof value !== "string" || value.trim() === "") {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }
        if (value.length > LIMITS[key as keyof typeof LIMITS]) {
            return NextResponse.json({ error: `${key} is too long.` }, { status: 400 });
        }
    }

    const submission = {
        name: (name as string).trim(),
        email: (email as string).trim(),
        reason: (reason as string).trim(),
        message: (message as string).trim(),
    };

    if (!EMAIL_PATTERN.test(submission.email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const { error: dbError } = await publicClient.from("forms").insert(submission);

    if (dbError) {
        return NextResponse.json({ error: "Failed to save submission." }, { status: 500 });
    }

    const safe = {
        name: escapeHtml(submission.name),
        email: escapeHtml(submission.email),
        reason: escapeHtml(submission.reason),
        message: escapeHtml(submission.message).replace(/\n/g, "<br/>"),
    };

    const resend = getResend();
    if (!resend) {
        console.error("RESEND_API_KEY is not set; submission saved but not emailed.");
        return NextResponse.json({ success: true, delivered: false });
    }

    const { error: emailError } = await resend.emails.send({
        from: "Arelia Contact <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        replyTo: submission.email,
        subject: `New contact form submission - ${submission.reason}`,
        html: `
            <h2>New message from ${safe.name}</h2>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Reason:</strong> ${safe.reason}</p>
            <p><strong>Message:</strong></p>
            <p>${safe.message}</p>
        `,
    });

    // The submission is already persisted, so a mail failure isn't fatal — but
    // the caller should know it wasn't delivered.
    if (emailError) {
        console.error("Email failed to send:", emailError);
        return NextResponse.json({ success: true, delivered: false });
    }

    return NextResponse.json({ success: true, delivered: true });
}

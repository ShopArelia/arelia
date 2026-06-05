import { NextResponse } from "next/server";
import { getSupabase } from "@/utils/supabase/database";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "shoparelia@yahoo.com";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, reason, message } = body;

    if (!name || !email || !reason || !message) {
        return NextResponse.json(
            { error: "All fields are required." },
            { status: 400 }
        );
    }

    const supabase = await getSupabase();

    const { error: dbError } = await supabase.from("forms").insert({
        name,
        email,
        reason,
        message,
    });

    if (dbError) {
        return NextResponse.json(
            { error: "Failed to save submission." },
            { status: 500 }
        );
    }

    const { error: emailError } = await resend.emails.send({
        from: "Arelia Contact <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `New contact form submission - ${reason}`,
        html: `
            <h2>New message from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Reason:</strong> ${reason}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
    });

    if (emailError) {
        console.error("Email failed to send:", emailError);
    }

    return NextResponse.json({ success: true });
}
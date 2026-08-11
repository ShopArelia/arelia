import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

/**
 * Runs before /admin routes render.
 *
 * Two jobs:
 *  1. Refresh the Supabase session so the access token doesn't expire mid-visit.
 *     (`utils/supabase/middleware.ts` was written for this but never wired up —
 *     there was no root middleware/proxy file, so it was dead code.)
 *  2. Bounce unauthenticated requests to /login *before* any rendering happens.
 *     Doing this here rather than only in the layout means the admin page never
 *     renders at all for a signed-out visitor, so no dashboard markup can reach
 *     them in the streamed response.
 *
 * In Next.js 16 this file convention is `proxy`, not `middleware`.
 */
export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options),
                );
            },
        },
    });

    // getUser() revalidates the token against Supabase; getSession() alone only
    // reads the cookie and can't be trusted here.
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*"],
};

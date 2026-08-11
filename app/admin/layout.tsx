import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

/**
 * Auth for this segment is enforced in `proxy.ts`, which redirects signed-out
 * requests to /login before any rendering happens — so nothing here can leak
 * into the response. Every mutation is re-checked server-side in
 * `app/admin/actions.ts`, and RLS is the backstop.
 *
 * Deliberately synchronous: an `await` here would make the layout itself a
 * blocking node above `loading.tsx`, which is what the Suspense boundary for
 * this segment is.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

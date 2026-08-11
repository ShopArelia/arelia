/**
 * Streaming boundary for the admin segment. Admin pages are request-time
 * (auth-gated, cookie-backed reads), so the prerenderer needs a Suspense
 * boundary here rather than blocking the whole route.
 */
export default function AdminLoading() {
    return (
        <div className="min-h-screen bg-surface-50">
            <div className="h-[60px] bg-white border-b border-surface-100" />
            <div className="max-w-[800px] mx-auto px-6 py-16 flex flex-col gap-4">
                <div className="h-10 w-64 rounded-md bg-surface-100 animate-pulse" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-28 rounded-lg bg-surface-100 animate-pulse" />
                ))}
            </div>
        </div>
    );
}

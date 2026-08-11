import Divider from "./Divider";

type ListingSkeletonProps = {
    title: string;
    description: string;
    /** "grid" for the product grid, "rows" for the blog/NGO lists. */
    layout?: "grid" | "rows";
}

/**
 * Prerendered placeholder for the listing pages. Their content depends on
 * searchParams, which is request-time data, so it streams in behind a Suspense
 * boundary — this is what the static shell shows meanwhile.
 */
export default function ListingSkeleton({ title, description, layout = "grid" }: ListingSkeletonProps) {
    return (
        <div className="flex flex-col items-center bg-white">
            <div className="w-full flex flex-col md:flex-row px-16 py-24 gap-6 justify-between items-center">
                <div className="flex flex-col items-center md:items-start gap-6">
                    <h1 className="text-display text-surface-400 font-DMSerif-Reg leading-none text-center md:text-left">{title}</h1>
                    <p className="text-body text-surface-300 font-DMSans-400 leading-none text-center md:text-left">{description}</p>
                </div>
                <div className="h-10 w-56 rounded-full border border-primary-300 animate-pulse" />
            </div>

            <Divider />

            <div className="w-full flex px-4 md:px-16 py-3 gap-6 items-center">
                <div className="h-8 w-full max-w-2xl rounded-xl bg-surface-100 animate-pulse" />
            </div>

            <Divider />

            <div className="w-full flex flex-col px-8 py-12 md:px-16 md:py-24 gap-16 items-center justify-center">
                {layout === "grid" ? (
                    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-16">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="w-50 h-80 rounded-md bg-surface-100 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-full h-28 rounded-md bg-surface-100 animate-pulse" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

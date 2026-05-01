import Link from "next/link";

import { Tables } from "@/types/supabase";

export default function BlogPost({blog}: {blog: Tables<"blogs">}) {
    const formattedUpdatedAt = blog.updated_at
        ? new Date(blog.updated_at)
        : null;

    const updatedAtLabel = formattedUpdatedAt && !Number.isNaN(formattedUpdatedAt.getTime())
        ? new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        }).format(formattedUpdatedAt)
        : blog.updated_at;

    return (
        <Link href={`/blogs/${blog.slug}`} className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <p className="text-h2 text-surface-400 font-DMSerif-Reg ">{blog.title}</p>
                <p className="text-label text-surface-300 font-DMSans-500 leading-none">{blog.read_time} min read</p>
            </div>
            <p className="text-body text-surface-300 font-DMSans-400 leading-none">{blog.excerpt}</p>
            <div className="flex gap-3">
                <p className="text-label text-surface-300 font-DMSans-500 leading-none">{blog.author}</p>
                <p className="text-label text-surface-200 font-DMSans-500 leading-none">{updatedAtLabel}</p>
            </div>
        </Link>
    )
}

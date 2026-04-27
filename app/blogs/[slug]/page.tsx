import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import MaskedIcon from "@/components/MaskedIcon";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/utils/supabase/database";
import type { Tables } from "@/types/supabase";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog: Tables<"blogs"> = await getBlogBySlug(slug);

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

    if (!blog) notFound();

    return (
        <div className="flex flex-col">

            {/* Blog Header */}
            <div className='flex px-16 py-30 items-center justify-center bg-primary-400'>
                <div className="max-w-[800px] w-full flex flex-col gap-6">
                    <div className="flex gap-3 items-center">
                        <p className='text-body-sm font-DMSans-500 text-primary-100'>BLOG</p>
                        <MaskedIcon src="/icons/arrow-right-long.svg" size="14px" className="text-primary-200" />
                        <p className='text-body-sm font-DMSans-400 text-primary-200 uppercase'>{blog.title}</p>
                    </div>
                    <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{blog.title}</p>
                    <p className='text-body font-DMSans-400 text-primary-100 text-wrap'>{blog.excerpt}</p>
                    <div className="flex gap-3">
                        <p className='text-body-sm font-DMSans-400 text-primary-100'>{blog.author}</p>
                        <p className='text-body-sm font-DMSans-400 text-primary-200'>{blog.read_time} min read</p>
                        <p className='text-body-sm font-DMSans-400 text-primary-200'>{updatedAtLabel}</p>
                    </div>
                </div>
            </div>

            {/* Blog Body */}
            <div className="flex px-16 py-24 items-center justify-center bg-white">
                <div className="max-w-[800px] w-full flex flex-col gap-6">
                    <div className="flex gap-6">
                        <div className="sticky top-24 flex flex-col items-center px-1 py-2 gap-3">
                            <p className="text-label text-surface-200 font-DMSans-500">SHARE</p>
                            <CopyButton />
                        </div>
                        <article className="prose prose-stone max-w-none
                            prose-headings:font-DMSerif-Reg prose-headings:text-display
                            prose-h1:text-h1 prose-h2:text-h2 prose-h3:text-h3
                            prose-p:text-surface-300 prose-p:text-body prose-p:font-DMSans-400
                            prose-a:text-primary-300 prose-a:underline-offset-[3px] hover:prose-a:text-primary-400
                            prose-blockquote:border-l-primary-200 prose-blockquote:bg-primary-50
                            prose-blockquote:rounded-r-md prose-blockquote:text-primary-400
                            prose-blockquote:font-serif prose-blockquote:not-italic
                            prose-hr:border-surface-100
                            prose-strong:font-medium
                            prose-img:rounded-md" >
                            <Markdown remarkPlugins={[remarkGfm]}>{blog.content ?? ""}</Markdown>
                        </article>
                    </div>
                </div>
            </div>

        </div>
    )
}
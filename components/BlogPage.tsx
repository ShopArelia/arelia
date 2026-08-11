import { Fragment } from "react";

import Header from "./Header";
import Divider from "./Divider";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import type { Tables } from "@/types/supabase";

type BlogPageProps = {
    blogs: Array<Tables<"blogs">>;
    count: number;
    currentPage: number;
    totalPages: number;
}

export default function BlogPage({ blogs, currentPage, totalPages }: BlogPageProps) {
    return (
        <div className="flex flex-col items-center bg-white">
            <Header
                title="Blog"
                description="Stories, people, and the causes behind the products"
                inputPlaceholder="Search blogs..."
                path="/blogs"
            />

            <Divider />

            {/* Blogs */}
            <div className="w-full flex flex-col px-8 py-12 md:px-16 md:py-24 gap-16 items-center justify-center">
                {blogs.length === 0 ? (
                    <p className="text-body text-surface-300 font-DMSans-400 py-12">No posts found.</p>
                ) : (
                    <div className="w-full flex flex-col gap-6 item-center justify-center">
                        {blogs.map((blog, index) => (
                            <Fragment key={blog.id}>
                                <BlogPost blog={blog} />
                                {index < blogs.length - 1 ? <Divider /> : null}
                            </Fragment>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} path="/blogs" />
                )}
            </div>

        </div>
    );
}

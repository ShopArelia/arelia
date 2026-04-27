import { getBlogs } from "@/utils/supabase/database";
import Link from "next/link";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AdminBlogsPage() {
  const { data: blogs, count} = await getBlogs();

  return (
    <div className="min-h-screen bg-surface-50">

      {/* Top bar */}
      <header className="h-[60px] bg-white border-b border-surface-100 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-surface-300">Admin</span>
          <span className="text-surface-200 mx-1">/</span>
          <span className="text-[13px] font-medium text-surface-400">Blogs</span>
        </div>

        <Link
          href="/admin/newBlog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-white bg-primary-300 shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)] hover:shadow-[0_3px_0_#2D5016,0_6px_16px_rgba(45,80,22,0.3)] hover:-translate-y-px transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New post
        </Link>
      </header>

      <main className="max-w-[860px] mx-auto px-6 py-12">
        <h1 className="font-serif text-[28px] font-normal tracking-[-0.015em] text-surface-400 mb-2">
          Blog posts
        </h1>
        <p className="text-[13px] text-surface-300 mb-10">
          {blogs?.length ?? 0} posts total. Click any post to edit it.
        </p>

        <div className="flex flex-col divide-y divide-surface-100">
          {blogs?.length === 0 && (
            <p className="text-[14px] text-surface-300 py-12 text-center">
              No posts yet. <Link href="/admin/newBlog" className="text-primary-300 underline underline-offset-2">Write your first one →</Link>
            </p>
          )}

          {blogs?.map((blog) => (
            <Link
              key={blog.id}
              href={`/admin/editBlog/${blog.slug}`}
              className="group flex items-start justify-between gap-6 py-5 hover:bg-primary-50 -mx-4 px-4 rounded-[10px] transition-colors"
            >
              <div className="min-w-0">
                <h2 className="text-[15px] font-medium text-surface-400 group-hover:text-primary-300 transition-colors truncate">
                  {blog.title}
                </h2>
                {blog.excerpt && (
                  <p className="text-[13px] text-surface-300 mt-1 line-clamp-1">{blog.excerpt}</p>
                )}
                <time className="text-[12px] text-surface-200 mt-1.5 block">
                  {formatDate(blog.created_at)}
                </time>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-[12px] text-surface-200 group-hover:text-primary-300 transition-colors mt-0.5">
                Edit
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
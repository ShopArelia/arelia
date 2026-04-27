"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogEditorProps = {
  mode: "new" | "edit";
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
  };
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function BlogEditor({ mode, initialData }: BlogEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle]     = useState(initialData?.title   ?? "");
  const [slug, setSlug]       = useState(initialData?.slug    ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [preview, setPreview] = useState(false);
  const [status, setStatus]   = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError]     = useState("");

  // Auto-generate slug from title only in new mode
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (mode === "new") setSlug(slugify(e.target.value));
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setError("Title, slug and content are required.");
      return;
    }
    setError("");
    setStatus("saving");

    if (mode === "new") {
      const { error } = await supabase.from("blogs").insert({
        title, slug, excerpt, content,
      });
      if (error) { setError(error.message); setStatus("error"); return; }
    } else {
      const { error } = await supabase
        .from("blogs")
        .update({ title, slug, excerpt, content })
        .eq("id", initialData!.id);
      if (error) { setError(error.message); setStatus("error"); return; }
    }

    setStatus("success");
    setTimeout(() => router.push("/admin/blogs"), 1000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post permanently?")) return;
    await supabase.from("blogs").delete().eq("id", initialData!.id);
    router.push("/admin/blogs");
  };

  // Tab key inserts spaces in textarea
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = content.substring(0, start) + "  " + content.substring(end);
      setContent(newVal);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  }, [content]);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">

      {/* ── Top bar ── */}
      <header className="h-[60px] bg-white border-b border-surface-100 flex items-center justify-between px-8 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex items-center gap-1.5 text-[13px] text-surface-300 hover:text-surface-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            All posts
          </button>
          <span className="text-surface-200">/</span>
          <span className="text-[13px] font-medium text-surface-400">
            {mode === "new" ? "New post" : "Edit post"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview toggle */}
          <button
            onClick={() => setPreview((p) => !p)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
              preview
                ? "bg-primary-50 border-primary-200 text-primary-300"
                : "bg-white border-surface-100 text-surface-300 hover:border-surface-200"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            {preview ? "Editor" : "Preview"}
          </button>

          {/* Delete (edit mode only) */}
          {mode === "edit" && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
              Delete
            </button>
          )}

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium text-white bg-primary-300 shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)] hover:shadow-[0_3px_0_#2D5016,0_6px_16px_rgba(45,80,22,0.3)] hover:-translate-y-px transition-all disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : status === "success" ? "Saved ✓" : mode === "new" ? "Publish" : "Save changes"}
          </button>
        </div>
      </header>

      {/* ── Meta fields ── */}
      <div className="border-b border-surface-100 bg-white px-8 py-5 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-[11px] font-medium uppercase tracking-[0.06em] text-surface-200">Title</label>
          <input
            type="text" value={title} onChange={handleTitleChange}
            placeholder="Post title..."
            className="text-[18px] font-medium text-surface-400 bg-transparent outline-none border-none placeholder:text-surface-200 font-serif"
          />
        </div>
        <div className="flex flex-col gap-1 w-[220px]">
          <label className="text-[11px] font-medium uppercase tracking-[0.06em] text-surface-200">Slug</label>
          <input
            type="text" value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-slug"
            className="text-[13px] text-surface-300 bg-transparent outline-none border-b border-surface-100 pb-0.5 placeholder:text-surface-200 font-mono focus:border-primary-200 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1 flex-[2] min-w-[260px]">
          <label className="text-[11px] font-medium uppercase tracking-[0.06em] text-surface-200">Excerpt</label>
          <input
            type="text" value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description shown in listings..."
            className="text-[13px] text-surface-300 bg-transparent outline-none border-b border-surface-100 pb-0.5 placeholder:text-surface-200 focus:border-primary-200 transition-colors"
          />
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-8 py-3 text-[13px] text-red-600">
          {error}
        </div>
      )}

      {/* ── Editor / Preview ── */}
      <div className="flex-1 flex overflow-hidden">
        {!preview ? (
          /* Editor */
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`# Start writing in markdown...\n\nYour post content goes here.`}
            className="flex-1 resize-none outline-none border-none bg-white px-12 py-10 text-[15px] leading-[1.8] text-surface-400 font-mono placeholder:text-surface-200"
            spellCheck
          />
        ) : (
          /* Preview */
          <div className="flex-1 overflow-y-auto px-12 py-10 bg-surface-50">
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
                prose-img:rounded-md"
            >
              {title && <h1>{title}</h1>}
              {excerpt && <p className="text-surface-300 italic">{excerpt}</p>}
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </article>
          </div>
        )}
      </div>

      {/* ── Status bar ── */}
      <div className="h-8 bg-white border-t border-surface-100 flex items-center px-8 gap-4 text-[11px] text-surface-200 shrink-0">
        <span>{content.trim().split(/\s+/).filter(Boolean).length} words</span>
        <span>·</span>
        <span>{Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read</span>
        <span>·</span>
        <span>Markdown</span>
      </div>
    </div>
  );
}
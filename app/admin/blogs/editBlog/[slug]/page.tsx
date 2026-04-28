import { getBlogBySlug } from "@/utils/supabase/database";
import { notFound } from "next/navigation";
import BlogEditor from "@/components/BlogEditor";
 
type Props = { params: { slug: string } };
 
export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug)
 
  if (!blog) notFound();
 
  return (
    <BlogEditor
      mode="edit"
      initialData={{
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt ?? "",
        content: blog.content ?? "",
        author: blog.author ?? "",
        read_time: blog.read_time ?? 1,
      }}
    />
  );
}
 
import { connection } from "next/server";
import { getSupabase } from "@/utils/supabase/database";
import { notFound } from "next/navigation";
import NGOEditor from "@/components/NGOEditor";

export default async function EditNGOPage({ params }: { params: Promise<{ id: string }> }) {
  // Admin routes are never prerendered — `params` is request-time data and
  // this subtree is auth-gated.
  await connection();

  const { id } = await params;
  const supabase = await getSupabase();
  const { data: ngo } = await supabase.from("ngos").select("*").eq("id", id).single();
 
  if (!ngo) notFound();
 
  return (
    <NGOEditor
      mode="edit"
      initialData={{
        id:          ngo.id,
        name:        ngo.name,
        logo_url:    ngo.logo_url    ?? "",
        description: ngo.description ?? "",
        cause:       ngo.cause       ?? "",
      }}
    />
  );
}
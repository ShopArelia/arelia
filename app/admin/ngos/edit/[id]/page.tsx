import { getSupabase } from "@/utils/supabase/database";
import { notFound } from "next/navigation";
import NGOEditor from "@/components/NGOEditor";

type EditNGOProps = { params: { id: string } };
 
export default async function EditNGOPage({ params }: { params: Promise<{ id: string }> }) {
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
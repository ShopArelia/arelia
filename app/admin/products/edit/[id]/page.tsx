import { connection } from "next/server";
import ProductEditor from "@/components/ProductEditor";
import { getSupabase } from "@/utils/supabase/database";
import { notFound } from "next/navigation";
 
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Admin routes are never prerendered — `params` is request-time data and
  // this subtree is auth-gated.
  await connection();

  const { id } = await params;
  const supabase = await getSupabase();
 
  const [{ data: product }, { data: ngos }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("ngos").select("id, name").order("name"),
  ]);
 
  if (!product) notFound();

  return (
    <ProductEditor
      mode="edit"
      ngos={ngos ?? []}
      initialData={{
        id:            product.id,
        title:         product.title,
        image_url:     product.image_url  ?? "",
        ngo_id:        product.ngo_id,
        merch:         product.merch_type ?? "",
        external_link: product.external_link ?? "",
        price:         product.price,
      }}
    />
  );
}
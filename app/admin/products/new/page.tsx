import { getSupabase } from "@/utils/supabase/database";
import ProductEditor from "@/components/ProductEditor";
 
export default async function NewProductPage() {
  const supabase = await getSupabase();
  const { data: ngos } = await supabase.from("ngos").select("id, name").order("name");
 
  return <ProductEditor mode="new" ngos={ngos ?? []} />;
}
import { Tables } from "@/types/supabase";
import { DMSans } from "@/app/fonts";
export default function ProductCard({data}: {data: Tables<'products'>}) {
    console.log(data);
    return(
        <div className={`w-[200px] h-[300px] bg-primary-400 rounded-[14px] ${DMSans.className}`}>{data.title}</div>
    )
}
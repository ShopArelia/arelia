import Image from "next/image";
import { Tables } from "@/types/supabase";
import { DMSans } from "@/app/fonts";
export default function ProductCard({product}: {product: Tables<'products'>}) {
    return(
        <div className={`w-[200px] h-[300px] card ${DMSans.className}`}>
            <div className="w-full h-auto">
                <Image
                    src={product.image_url}
                    alt={`Image of ${product.title}`}
                    width={200}
                    height={200}
                    loading="eager"
                    unoptimized={true}
                />
            </div>
            <div className="w-full h-auto flex flex-col p-3">
                <p></p>
                <p>{product.title}</p>
                <p>{product.price}</p>
            </div>
        </div>
    )
}
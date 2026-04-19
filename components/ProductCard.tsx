import Image from "next/image";
import Button from "./Button";

import type { Tables } from "@/types/supabase";

type ProductCardProps = {
    product: Tables<'products'>;
    ngoName?: string;
}

export default function ProductCard({product, ngoName}: ProductCardProps) {
    return(
        <div className={`w-[200px] h-[310px] flex flex-col card bg-surface-50`}>
            <div className="w-full h-fit">
                <Image
                    src={product.image_url}
                    alt={`Image of ${product.title}`}
                    width={200}
                    height={200}
                    loading="eager"
                    unoptimized={true}
                />
            </div>
            <div className="w-full h-full flex flex-col p-3 justify-between">
                <div className="flex flex-col gap-1">
                    <p className='text-meta font-DMSans-500 text-surface-300 leading-none'>{ngoName}</p>
                    <p className='text-body-sm font-DMSans-400 text-surface-400 leading-none'>{product.title}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className='text-body font-DMSans-400 text-surface-400 leading-none'>${product.price}</p>
                    <Button link={product.external_link} text="Buy now" newTab={true}/>
                </div>
            </div>
        </div>
    )
}

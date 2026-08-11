import Image from "next/image";
import Button from "./Button";

import type { Tables } from "@/types/supabase";

type ProductCardProps = {
    product: Tables<'products'>;
    ngoName?: string;
    cause?: string;
    /** Preload the first few cards in a grid; the rest lazy-load. */
    preload?: boolean;
}

export default function ProductCard({ product, ngoName, cause, preload = false }: ProductCardProps) {
    return (
        <div className="w-50 h-80 flex flex-col card bg-surface-50">
            <div className="w-full h-44 relative shrink-0">
                <Image
                    src={product.image_url}
                    alt={`Image of ${product.title}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    style={{ objectFit: "contain" }}
                    preload={preload}
                />
                {cause ? (
                    <div className="absolute z-10 bottom-2 left-2 bg-primary-100 flex px-1 rounded-sm">
                        <p className="text-meta font-DMSans-500 text-surface-300">{cause}</p>
                    </div>
                ) : null}
            </div>
            <div className="w-full flex-1 min-h-0 flex flex-col p-3 justify-between">
                <div className="flex flex-col gap-1">
                    <p className='text-meta font-DMSans-500 text-surface-300 leading-none'>{ngoName}</p>
                    <p className='text-body-sm font-DMSans-400 text-surface-400 leading-snug line-clamp-2'>{product.title}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className='text-body font-DMSans-400 text-surface-400 leading-none'>${product.price}</p>
                    <Button link={product.external_link} text="Buy now" newTab={true}/>
                </div>
            </div>
        </div>
    )
}

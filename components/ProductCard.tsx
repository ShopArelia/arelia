import Image from "next/image";
import Button from "./Button";

import { Tables } from "@/types/supabase";
import { getNGOsByID } from "@/utils/supabase/database";

export default async function ProductCard({product}: {product: Tables<'products'>}) {

    const ngo: Tables<'ngos'> = await getNGOsByID(product.ngo_id);

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
                    <p className='text-meta font-DMSans-500 text-surface-300 leading-none'>{ngo.name}</p>
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
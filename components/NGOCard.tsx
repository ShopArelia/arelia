
import Image from "next/image";
import type { Tables } from "@/types/supabase";

type NGOCardProps = {
    ngo: Tables<'ngos'> & {
        products: [{ count: number }];
    };
}

export default function NGOCard({ ngo }: NGOCardProps) {
    return (
        <div className="w-full flex py-12 gap-12 items-center">
            <div key={ngo.id} className='w-[60px] h-[60px] rounded-xl border border-surface-200 overflow-hidden'>
                <Image src={ngo.logo_url} alt={ngo.name} height={60} width={60} />
            </div>

            <div className="w-full flex flex-col gap-5">
                <div className="flex gap-3 items-end">
                    <h2 className="text-h2 text-surface-400 font-DMSerif-Reg leading-none">{ngo.name}</h2>
                    <p className="text-label text-primary-200 font-DMSans-500 uppercase leading-none">{ngo.cause}</p>
                </div>

                <p className="text-body text-surface-300 font-DMSans-400 leading-none">{ngo.description}</p>
            </div>

            <div className="flex flex-col gap-1 items-end">
                <h2 className="text-h2 text-surface-400 font-DMSerif-Reg leading-none">{ngo.products[0].count}</h2>
                <p className="text-body text-surface-300 font-DMSans-400 leading-none">products</p>
            </div>
        </div>
    );
}
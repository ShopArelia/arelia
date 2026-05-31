
import Image from "next/image";
import type { Tables } from "@/types/supabase";

type NGOCardProps = {
    ngo: Tables<'ngos'> & {
        products: [{ count: number }];
    };
}

export default function NGOCard({ ngo }: NGOCardProps) {
    return (
        <div className="w-full flex flex-col md:flex-row py-12 gap-12 items-center">
            <div key={ngo.id} className='w-20 h-20 flex relative items-center justify-center rounded-full border border-surface-200 overflow-hidden shrink-0'>
                {ngo.logo_url ? (
                    <Image src={ngo.logo_url} alt={ngo.name} fill unoptimized />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-300 font-DMSans-500 text-h4">
                        {ngo.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col gap-5">
                <div className="flex md:justify-start justify-between gap-3 items-end">
                    <h2 className="text-h2 text-surface-400 font-DMSerif-Reg leading-none">{ngo.name}</h2>
                    <p className="text-label text-primary-200 font-DMSans-500 uppercase leading-none">{ngo.cause}</p>
                </div>

                <p className="text-body text-surface-300 font-DMSans-400 leading-none">{ngo.description}</p>
            </div>

            <div className="flex md:flex-col items-center gap-2 md:gap-1 md:items-end">
                <h2 className="text-h2 text-surface-400 font-DMSerif-Reg leading-none">{ngo.products[0].count}</h2>
                <p className="text-body text-surface-300 font-DMSans-400 leading-none">products</p>
            </div>
        </div>
    );
}
'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "./Header";
import Divider from "./Divider";
import Filterbar from "./Filterbar";
import NGOCard from "./NGOCard";
import Pagination from "./Pagination";
import type { Tables } from "@/types/supabase";

type NGOsPageProps = {
    ngos: Array<Tables<'ngos'> & {
        products: [{ count: number }];
    }>;
    count: number;
    currentPage: number;
    totalPages: number;
    filter: string;
}

export default function NGOPage({ ngos, count, currentPage, totalPages, filter }: NGOsPageProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [text, setText] = useState<string>(searchParams.get("search") ?? "");

    useEffect(() => {
        setText(searchParams.get("search") ?? "");
    }, [searchParams]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (text) {
                params.set("search", text);
            } else {
                params.delete("search");
            }
            params.set("page", "1");
            router.push(`/nonprofits?${params.toString()}`);
        }, 400);

        return () => clearTimeout(timeout);
    }, [text]);

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`/nonprofits?${params.toString()}`);
    }

    return (
        <div className="flex flex-col items-center bg-white">
            <Header
                title="Nonprofit directory"
                description="30 nonprofits across 5 causes"
                inputPlaceholder="Search products..."
                text={text}
                onChange={setText}
            />

            <Divider />

            <Filterbar
                totalCount={count}
                countLabel="Products"
                activeFilter={filter}
                sortActive={false}
            />

            <Divider />

            {/* NGOs */}
            <div className="w-full flex flex-col px-16 py-24 gap-16 items-center justify-center">
                <div className="w-full flex flex-col item-center justify-center">
                    {ngos.map((ngo) => (
                        <NGOCard key={ngo.id} ngo={ngo} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
                )}
            </div>

        </div>
    );
}

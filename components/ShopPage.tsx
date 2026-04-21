'use client'

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Divider from "@/components/Divider";
import Filterbar from "@/components/Filterbar";
import ProductCard from "@/components/ProductCard";
import Pagination from "./Pagination";
import type { Tables } from "@/types/supabase";

type ShopProduct = Tables<'products'> & {
    ngoName: string;
};

type ShopPageProps = {
    products: Array<ShopProduct>;
    count: number;
    currentPage: number;
    totalPages: number;
    filter: string;
};

export default function ShopPage({ products, count, currentPage, totalPages, filter }: ShopPageProps) {
    const [text, setText] = useState<string>('');
    const [sort, setSort] = useState<string>('');

    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter", value);
        params.set("page", "1")
        console.log(params.toString());
        startTransition(() => {
            router.replace(`/shop?${params.toString()}`);
        })
    }

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`/shop?${params.toString()}`);
    }

    return (
        <div className="flex flex-col items-center bg-white">
            <Header
                title="Shop"
                description="320 products from 30 verified nonprofits"
                inputPlaceholder="Search products..."
                text={text}
                onChange={setText}
            />

            <Divider />

            <Filterbar
                totalCount={count}
                countLabel="Products"
                activeFilter={filter}
                activeSort={sort}
                onFilterChange={handleFilter}
                onSortChange={setSort}
            />

            <Divider />

            {/* Shop Page */}
            <div className="w-full flex flex-col px-16 py-24 gap-16 items-center justify-center">
                <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-16 ">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} ngoName={product.ngoName} />
                    ))}
                </div>
            

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
                )}
            </div>

        </div>
    );
}

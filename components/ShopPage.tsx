'use client'

import { useState, useEffect } from "react";
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
    sort: string;
};

export default function ShopPage({ products, count, currentPage, totalPages, filter, sort }: ShopPageProps) {
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
            router.push(`/shop?${params.toString()}`);
        }, 400);

        return () => clearTimeout(timeout);
    }, [text]);

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        params.set("page", "1");
        router.push(`/shop?${params.toString()}`);
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
                onSortChange={handleSort}
            />

            <Divider />

            {/* Shop Page */}
            <div className="w-full flex flex-col px-8 py-12 md:px-16 md:py-24 gap-16 items-center justify-center">
                <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-16 ">
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

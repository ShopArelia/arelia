'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

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
};

export default function ShopPage({ products, count, currentPage, totalPages }: ShopPageProps) {
    const [text, setText] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const [sort, setSort] = useState<string>('');
    const router = useRouter();

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        router.push(`/shop?page=${page}`);
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
                onFilterChange={setFilter}
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

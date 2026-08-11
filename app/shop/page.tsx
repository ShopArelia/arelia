import type { Metadata } from "next";
import { Suspense } from "react";

import ShopPage, { type ShopProduct } from "@/components/ShopPage";
import ListingSkeleton from "@/components/ListingSkeleton";
import { getProductsByRange, getAllCounts } from "@/utils/supabase/database";
import { Cause, MERCHTYPE } from "@/data/causes";

const PAGE_SIZE = 12;

const SORT_MAP = {
    "latest": { column: "created_at", ascending: false },
    "price-asc": { column: "price", ascending: true },
    "price-desc": { column: "price", ascending: false },
} as const;

type SearchParamsType = {
    [key: string]: string | undefined;
}

export const metadata: Metadata = {
    title: "Shop",
    description: "Browse products from verified nonprofits. Every purchase goes straight to the organization that made it.",
    alternates: { canonical: "/shop" },
};

export default function Page({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    // The listing depends on searchParams (request-time), so it streams in while
    // the shell prerenders.
    return (
        <Suspense fallback={<ListingSkeleton title="Shop" description="Products from verified nonprofits" />}>
            <ShopListing searchParams={searchParams} />
        </Suspense>
    );
}

async function ShopListing({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    const { page, filter, sort, merch, search } = await searchParams;

    const pageNumber = Math.max(1, Number(page ?? 1) || 1);
    const filterVal = filter ?? "all";
    const sortVal = sort ?? "latest";
    const searchVal = search ?? "";
    const merchVal = merch ?? "all";

    // `ngos.cause` stores display labels ("Health & Wellness") while the URL and
    // `products.merch_type` use slugs ("Health-Wellness"), so only the cause
    // needs mapping back to its label before querying.
    const filterLabel = Cause.find((c) => c.value === filterVal)?.label ?? "all";
    const merchValue = MERCHTYPE.find((m) => m.value === merchVal)?.value ?? "all";

    const from = (pageNumber - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { column, ascending } = SORT_MAP[sortVal as keyof typeof SORT_MAP] ?? SORT_MAP["latest"];

    const [{ data: products, count }, { ngoCount, productCount }] = await Promise.all([
        getProductsByRange({ from, to, filterVal: filterLabel, merchVal: merchValue, column, ascending, searchVal }),
        getAllCounts(),
    ]);

    const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

    // The NGO name and cause come from the join getProductsByRange already does.
    const shopProducts: ShopProduct[] = (products ?? []).map((product) => {
        const { ngo, ...rest } = product as typeof product & { ngo: { name: string; cause: string } | null };
        return { ...rest, ngoName: ngo?.name ?? "", cause: ngo?.cause ?? "" };
    });

    return (
        <ShopPage
            products={shopProducts}
            count={count ?? 0}
            currentPage={pageNumber}
            totalPages={totalPages}
            filter={filterVal}
            merch={merchVal}
            sort={sortVal}
            ngoCount={ngoCount}
            productCount={productCount}
        />
    );
}

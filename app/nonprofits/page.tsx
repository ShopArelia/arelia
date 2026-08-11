import type { Metadata } from "next";
import { Suspense } from "react";

import NGOPage from "@/components/NGOPage";
import ListingSkeleton from "@/components/ListingSkeleton";
import { getNGOs, getAllCounts } from "@/utils/supabase/database";
import type { Tables } from "@/types/supabase";
import { Cause } from "@/data/causes";
import { NGO_PAGE_SIZE } from "@/data/site";


export type NGOsType = {
    data: Array<Tables<'ngos'> & {
        products: [{ count: number }];
    }>;
    count: number | null;
}

type SearchParamsType = {
    [key: string]: string | undefined;
}

export const metadata: Metadata = {
    title: "Nonprofit directory",
    description: "Every nonprofit on Arelia, verified and organized by cause.",
    alternates: { canonical: "/nonprofits" },
};

export default function Page({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    // The listing depends on searchParams (request-time), so it streams in while
    // the shell prerenders.
    return (
        <Suspense fallback={<ListingSkeleton title="Nonprofit directory" description="Verified nonprofits, organized by cause" layout="rows" />}>
            <NGOListing searchParams={searchParams} />
        </Suspense>
    );
}

async function NGOListing({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    const { page, filter, search } = await searchParams;

    const pageNumber = Math.max(1, Number(page ?? 1) || 1);
    const filterVal = filter ?? "all";
    const searchVal = search ?? "";

    const filterLabel = Cause.find((c) => c.value === filterVal)?.label ?? "all";

    const from = (pageNumber - 1) * NGO_PAGE_SIZE;
    const to = from + NGO_PAGE_SIZE - 1;

    const [{ data: ngos, count }, { ngoCount, causeCount }] = await Promise.all([
        getNGOs({
            from,
            to,
            name: searchVal,
            cause: filterLabel === "all" ? undefined : filterLabel,
        }) as Promise<NGOsType>,
        getAllCounts(),
    ]);

    const totalPages = Math.ceil((count ?? 0) / NGO_PAGE_SIZE);

    return (
        <NGOPage
            ngos={ngos ?? []}
            count={count ?? 0}
            currentPage={pageNumber}
            totalPages={totalPages}
            filter={filterVal}
            ngoCount={ngoCount}
            causeCount={causeCount}
        />
    );
}

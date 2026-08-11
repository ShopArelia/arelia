import type { Metadata } from "next";
import { Suspense } from "react";

import BlogPage from "@/components/BlogPage";
import ListingSkeleton from "@/components/ListingSkeleton";
import { getBlogs } from "@/utils/supabase/database";
import type { Tables } from "@/types/supabase";

const PAGE_SIZE = 10;

type BlogsType = {
    data: Array<Tables<"blogs">>;
    count: number | null;
}

type SearchParamsType = {
    [key: string]: string | undefined;
}

export const metadata: Metadata = {
    title: "Blog",
    description: "Stories, people, and the causes behind the products.",
    alternates: { canonical: "/blogs" },
};

const DESCRIPTION = "Stories, people, and the causes behind the products";

export default function Page({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    // The listing depends on searchParams (request-time), so it streams in while
    // the shell prerenders.
    return (
        <Suspense fallback={<ListingSkeleton title="Blog" description={DESCRIPTION} layout="rows" />}>
            <BlogListing searchParams={searchParams} />
        </Suspense>
    );
}

async function BlogListing({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    const { page, search } = await searchParams;

    const pageNumber = Math.max(1, Number(page ?? 1) || 1);
    const searchVal = search ?? "";

    const from = (pageNumber - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: blogs, count }: BlogsType = await getBlogs({ from, to, title: searchVal });

    const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

    return <BlogPage blogs={blogs ?? []} count={count ?? 0} currentPage={pageNumber} totalPages={totalPages} />
}

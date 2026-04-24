import BlogPage from "@/components/BlogPage";
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

export default async function Page({ searchParams }: { searchParams: Promise<SearchParamsType>}) {
    const {page, search} = await searchParams;
    const pageNumber = Number(page ?? 1);
    const searchVal = search ?? "";

    const from = (pageNumber - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: blogs, count }: BlogsType = await getBlogs({from, to, title: searchVal});

    const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

    return <BlogPage blogs={blogs ?? []} count={count ?? 0} currentPage={pageNumber} totalPages={totalPages} />
}
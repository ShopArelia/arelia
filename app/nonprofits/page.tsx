import NGOPage from "@/components/NGOPage";
import { getNGOs } from "@/utils/supabase/database";
import type { Tables } from "@/types/supabase";

const PAGE_SIZE = 10;

export type NGOsType = {
    data: Array<Tables<'ngos'> & {
        products: [{ count: number }];
    }>;
    count: number | null;
}

type SearchParamsType = {
    [key: string]: string | undefined;
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    const {page, filter, search} = await searchParams;
    const pageNumber = Number(page ?? 1);
    const filterVal = filter ?? "all";
    const searchVal = search ?? "";

    const from = (pageNumber - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: ngos, count }: NGOsType = await getNGOs({from, to, name: searchVal });
    
    const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);
    
    return <NGOPage ngos={ngos ?? []} count={count ?? 0} currentPage={pageNumber} totalPages={totalPages} filter={filterVal} />
}
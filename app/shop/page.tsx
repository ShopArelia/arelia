import ShopPage from "@/components/ShopPage";
import { getNGOs, getProductsByRange } from "@/utils/supabase/database";
import type { Tables } from "@/types/supabase";
import { SearchParams } from "next/dist/server/request/search-params";

const PAGE_SIZE = 12;

type ProductsType = {
    data: Array<Tables<'products'>>;
    count: number | null;
}

type SearchParamsType = {
    [key: string]: string | undefined;
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
    const {page, filter} = await searchParams;
    const pageNumber = Number(page ?? 1);
    const filterVal = filter ?? "all"
    const from = (pageNumber - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: products, count }: ProductsType = await getProductsByRange({ from, to, filterVal });
    const ngos: Array<Tables<'ngos'>> = await getNGOs();
    const ngoNameById = new Map(ngos.map((ngo) => [ngo.id, ngo.name]));

    const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

    const shopProducts = products.map((product) => ({
        ...product,
        ngoName: ngoNameById.get(product.ngo_id) ?? "",
    }));

    return <ShopPage products={shopProducts ?? []} count={count ?? 0} currentPage={pageNumber} totalPages = {totalPages} filter={filterVal} />
}

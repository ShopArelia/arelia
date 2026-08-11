import Header from "@/components/Header";
import Divider from "@/components/Divider";
import Filterbar from "@/components/Filterbar";
import MerchCategory from "./MerchCategory";
import ProductCard from "@/components/ProductCard";
import Pagination from "./Pagination";
import type { Tables } from "@/types/supabase";

export type ShopProduct = Tables<'products'> & {
    ngoName: string;
    cause: string;
};

type ShopPageProps = {
    products: Array<ShopProduct>;
    count: number;
    currentPage: number;
    totalPages: number;
    filter: string;
    sort: string;
    merch: string;
    ngoCount: number | null;
    productCount: number | null;
};

export default function ShopPage({ products, count, currentPage, totalPages, filter, sort, merch, ngoCount, productCount }: ShopPageProps) {
    return (
        <div className="flex flex-col items-center bg-white">
            <Header
                title="Shop"
                description={`${productCount} products from ${ngoCount} verified nonprofits`}
                inputPlaceholder="Search products..."
                path="/shop"
            />

            <Divider />

            <Filterbar
                totalCount={count}
                countLabel="Products"
                activeFilter={filter}
                activeSort={sort}
                path="/shop"
            />

            <MerchCategory activeMerch={merch} path="/shop" />

            <Divider />

            {/* Shop Page */}
            <div className="w-full flex flex-col px-8 py-12 md:px-16 md:py-24 gap-16 items-center justify-center">
                {products.length === 0 ? (
                    <p className="text-body text-surface-300 font-DMSans-400 py-12">
                        No products match those filters.
                    </p>
                ) : (
                    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-16">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                ngoName={product.ngoName}
                                cause={product.cause}
                                preload={index < 4}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} path="/shop" />
                )}
            </div>

        </div>
    );
}

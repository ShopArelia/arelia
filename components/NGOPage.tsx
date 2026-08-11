import { Fragment } from "react";

import Header from "./Header";
import Divider from "./Divider";
import Filterbar from "./Filterbar";
import NGOCard from "./NGOCard";
import Pagination from "./Pagination";
import type { Tables } from "@/types/supabase";

type NGOsPageProps = {
    ngos: Array<Tables<'ngos'> & {
        products: [{ count: number }];
    }>;
    count: number;
    currentPage: number;
    totalPages: number;
    filter: string;
    ngoCount: number | null;
    causeCount: number | null;
}

export default function NGOPage({ ngos, count, currentPage, totalPages, filter, ngoCount, causeCount }: NGOsPageProps) {
    return (
        <div className="flex flex-col items-center bg-white">
            <Header
                title="Nonprofit directory"
                description={`${ngoCount} nonprofits across ${causeCount} causes`}
                inputPlaceholder="Search nonprofits..."
                path="/nonprofits"
            />

            <Divider />

            <Filterbar
                totalCount={count}
                countLabel="Nonprofits"
                activeFilter={filter}
                sortActive={false}
                path="/nonprofits"
            />

            <Divider />

            {/* NGOs */}
            <div className="w-full flex flex-col px-8 py-12 md:px-16 md:py-24 gap-16 items-center justify-center">
                {ngos.length === 0 ? (
                    <p className="text-body text-surface-300 font-DMSans-400 py-12">No nonprofits match those filters.</p>
                ) : (
                    <div className="w-full flex flex-col item-center justify-center">
                        {ngos.map((ngo, index) => (
                            <Fragment key={ngo.id}>
                                <NGOCard ngo={ngo} />
                                {index < ngos.length - 1 ? <Divider /> : null}
                            </Fragment>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} path="/nonprofits" />
                )}
            </div>

        </div>
    );
}

'use client'

import { useRouter, useSearchParams } from "next/navigation";

import Button from "./Button";
import { useDragScroll } from "./useDragScroll";
import { buildHref } from "@/utils/searchParams";
import { Cause } from "@/data/causes";

type FilterbarProps = {
    totalCount: number;
    countLabel: string;
    activeFilter: string;
    sortActive?: boolean;
    activeSort?: string;
    path: string;
}

export type FilterOption = {
    label: string;
    value: string;
}

export type SortOption = {
    label: string;
    value: string;
}

const FILTERS: FilterOption[] = [
    { label: "All", value: 'all' },
    ...Cause
]

const SORTS: SortOption[] = [
    { label: "Latest", value: 'latest' },
    { label: "Price: low to high", value: 'price-asc' },
    { label: "Price: high to low", value: 'price-desc' },
]

export default function Filterbar({ totalCount, countLabel, activeFilter, sortActive = true, activeSort, path }: FilterbarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const drag = useDragScroll<HTMLDivElement>();

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(buildHref(path, searchParams, { sort: e.target.value, page: "1" }));
    }

    return (
        <div className="w-full flex flex-col md:flex-row px-4 md:px-16 py-3 gap-6 items-center">
            <div {...drag} className="flex w-full no-scrollbar overflow-x-auto md:w-fit gap-6 py-1 items-center">
                {FILTERS.map((filter) => (
                    <Button
                        key={filter.value}
                        text={filter.label}
                        variant={activeFilter === filter.value ? 'primary' : 'ghost'}
                        link={buildHref(path, searchParams, { filter: filter.value, page: "1" })}
                    />
                ))}
            </div>

            <div className="flex shrink-0 w-full md:w-fit md:gap-6 items-center justify-between">
                <p className="text-body-sm text-surface-400 font-DMSans-400">Showing {totalCount} {countLabel}</p>

                {sortActive ? (
                    <div className="flex px-3 py-2 gap-1 border border-primary-300 rounded-xl items-center text-body-sm text-surface-400 font-DMSans-400">
                        <label htmlFor="sort-select" className="leading-none">Sort</label>
                        <select id="sort-select" value={activeSort} onChange={handleSort} className="leading-none">
                            {SORTS.map((sort) => (
                                <option key={sort.value} value={sort.value} className="leading-none">{sort.label}</option>
                            ))}
                        </select>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

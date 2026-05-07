'use client'

import { useState } from "react";
import Button from "./Button";
import { Cause } from "@/data/causes";

type FilterbarProps = {
    totalCount: number;
    countLabel: string;
    activeFilter: string;
    sortActive?: boolean;
    activeSort?: string;
    onSortChange?: (value: string) => void;
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

export default function Filterbar({ totalCount, countLabel, activeFilter, sortActive=true, activeSort, onSortChange, path }: FilterbarProps) {

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (sortActive){
            onSortChange!(e.target.value);
        }
    }

    return (
        <div className="w-full flex flex-col md:flex-row px-4 md:px-16 py-3 gap-6 items-center">
            <div className="flex w-full overflow-x-auto md:w-fit md:overflow-x-visible gap-6 py-1 items-center">
                {FILTERS.map((filter) => (
                    <Button key={filter.value} text={filter.label} variant={activeFilter === filter.value ? 'primary' : 'ghost'} link={`/${path}?page=1${sortActive ? "&sort="+activeSort : ""}&filter=${filter.value}`} />
                ))}
            </div>

            <div className="flex w-full items-center justify-between">
                <p className="w-full text-body-sm text-surface-400 font-DMSans-400 text-center md:text-left">Showing {totalCount} {countLabel}</p>

                {
                sortActive ?
                <div className="flex px-3 py-2 gap-1 border border-primary-300 rounded-xl items-center text-body-sm text-surface-400 font-DMSans-400">
                    <label htmlFor="sort-select" className="leading-none">Sort</label>
                    <select id="sort-select" value={activeSort} onChange={handleSort} className="leading-none">
                        {SORTS.map((sort) => (
                            <option key={sort.value} value={sort.value} className="leading-none">{sort.label}</option>
                        ))}
                    </select>
                </div> : null}
            </div>
        </div>
    )
}

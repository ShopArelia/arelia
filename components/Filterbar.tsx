'use client'

import { useState } from "react";
import Button from "./Button";

type FilterbarProps = {
    totalCount: number;
    countLabel: string;
    activeFilter: string;
    sortActive?: boolean;
    activeSort?: string;
    onSortChange?: (value: string) => void;
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
    { label: "Environment", value: 'Environment' },
    { label: "Wildlife", value: 'Wildlife' },
]

const SORTS: SortOption[] = [
    { label: "Latest", value: 'latest' },
    { label: "Price: low to high", value: 'price-asc' },
    { label: "Price: high to low", value: 'price-desc' },
]

export default function Filterbar({ totalCount, countLabel, activeFilter, sortActive=true, activeSort, onSortChange }: FilterbarProps) {

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (sortActive){
            onSortChange!(e.target.value);
        }
    }

    return (
        <div className="w-full flex px-16 py-3 gap-6 items-center">
            <div className="flex gap-6 items-center">
                {FILTERS.map((filter) => (
                    <Button key={filter.value} text={filter.label} variant={activeFilter === filter.value ? 'primary' : 'ghost'} link={`/shop?page=1&sort=${activeSort}&filter=${filter.value}`} />
                ))}
            </div>

            <p className="w-full text-body-sm text-surface-400 font-DMSans-400">Showing {totalCount} {countLabel}</p>

            {
            sortActive ??
            <div className="flex px-3 py-2 gap-1 border border-primary-300 rounded-xl items-center text-body-sm text-surface-400 font-DMSans-400">
                <label htmlFor="sort-select" className="leading-none">Sort</label>
                <select id="sort-select" value={activeSort} onChange={handleSort} className="leading-none">
                    {SORTS.map((sort) => (
                        <option key={sort.value} value={sort.value} className="leading-none">{sort.label}</option>
                    ))}
                </select>
            </div>}
        </div>
    )
}

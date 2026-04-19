'use client'

import { useState } from "react";
import Button from "./Button";

type FilterbarProps = {
    totalCount: number;
    countLabel: string;
    activeFilter: string;
    activeSort: string;
    onFilterChange: (value: string) => void;
    onSortChange: (value: string) => void;
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
    { label: "Environment", value: 'environment' },
    { label: "Animal welfare", value: 'animal-welfare' },
    { label: "Education", value: 'education' },
    { label: "Women & girls", value: 'women-girls' },
]

const SORTS: SortOption[] = [
    { label: "Featured", value: 'featured' },
    { label: "Price: low to high", value: 'price-asc' },
    { label: "Price: high to low", value: 'price-desc' },
    { label: "Newest", value: 'newest' },
]

export default function Filterbar({ totalCount, countLabel, activeFilter, activeSort, onFilterChange, onSortChange }: FilterbarProps) {
    const handleFilter = (value: string) => {
        onFilterChange(value);
    }

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value);
    }

    return (
        <div className="w-full flex px-16 py-3 gap-6 items-center">
            <div className="flex gap-6 items-center">
                {FILTERS.map((filter) => (
                    <Button key={filter.value} text={filter.label} variant={activeFilter === filter.value ? 'primary' : 'ghost'} link="" onClick={() => handleFilter(filter.value)} />
                ))}
            </div>

            <p className="w-full text-body-sm text-surface-400 font-DMSans-400">Showing {totalCount} {countLabel}</p>

            <div className="flex px-3 py-2 gap-1 border border-primary-300 rounded-xl items-center text-body-sm text-surface-400 font-DMSans-400">
                <label htmlFor="sort-select" className="leading-none">Sort</label>
                <select id="sort-select" value={activeSort} onChange={handleSort} className="leading-none">
                    {SORTS.map((sort) => (
                        <option key={sort.value} value={sort.value} className="leading-none">{sort.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

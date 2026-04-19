'use client'

import MaskedIcon from "./MaskedIcon";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const half = 2;
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, currentPage + half);
    const pages = range(start, end);

    return (
        <nav className="flex gap-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-[36px] h-[36px] flex items-center justify-center bg-primary-50 border border-primary-200 rounded-lg cursor-pointer"
            >
                <MaskedIcon src="./icons/arrow-left-long.svg" size="16px" className="text-surface-300" />
            </button>

            <div className="flex gap-2 items-center">
                {pages.map((p) => (
                    <button key={p}
                        onClick={() => onPageChange(p)}
                        className={`
                            w-[36px] h-[36px] flex items-center justify-center rounded-lg cursor-pointer leading-none text-body font-DMSans-400
                            ${p == currentPage ? "bg-primary-300 text-primary-50" : "bg-primary-50 border border-primary-200 text-surface-300"}
                        `}
                    >{p}</button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-[36px] h-[36px] flex items-center justify-center bg-primary-50 border border-primary-200 rounded-lg cursor-pointer"
            >
                <MaskedIcon src="./icons/arrow-right-long.svg" size="12px" />
            </button>
        </nav>
    )
}
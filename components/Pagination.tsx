'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import MaskedIcon from "./MaskedIcon";
import { buildHref } from "@/utils/searchParams";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    path: string;
}

const arrowClass = "w-[36px] h-[36px] flex items-center justify-center bg-primary-50 border border-primary-200 rounded-lg";

export default function Pagination({ currentPage, totalPages, path }: PaginationProps) {
    const searchParams = useSearchParams();

    const half = 2;
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, currentPage + half);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const href = (page: number) => buildHref(path, searchParams, { page: String(page) });

    return (
        <nav className="flex gap-4" aria-label="Pagination">
            {currentPage > 1 ? (
                <Link href={href(currentPage - 1)} rel="prev" aria-label="Previous page" className={`${arrowClass} cursor-pointer`}>
                    <MaskedIcon src="/icons/arrow-left-long.svg" size="16px" className="text-surface-300" />
                </Link>
            ) : (
                <span aria-hidden="true" className={`${arrowClass} opacity-40`}>
                    <MaskedIcon src="/icons/arrow-left-long.svg" size="16px" className="text-surface-300" />
                </span>
            )}

            <div className="flex gap-2 items-center">
                {pages.map((p) => (
                    <Link key={p}
                        href={href(p)}
                        aria-label={`Page ${p}`}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`
                            w-[36px] h-[36px] flex items-center justify-center rounded-lg cursor-pointer leading-none text-body font-DMSans-400
                            ${p === currentPage ? "bg-primary-300 text-primary-50" : "bg-primary-50 border border-primary-200 text-surface-300"}
                        `}
                    >{p}</Link>
                ))}
            </div>

            {currentPage < totalPages ? (
                <Link href={href(currentPage + 1)} rel="next" aria-label="Next page" className={`${arrowClass} cursor-pointer`}>
                    <MaskedIcon src="/icons/arrow-right-long.svg" size="16px" className="text-surface-300" />
                </Link>
            ) : (
                <span aria-hidden="true" className={`${arrowClass} opacity-40`}>
                    <MaskedIcon src="/icons/arrow-right-long.svg" size="16px" className="text-surface-300" />
                </span>
            )}
        </nav>
    )
}

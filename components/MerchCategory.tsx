'use client'

import { useSearchParams } from "next/navigation";

import Button from "./Button";
import { useDragScroll } from "./useDragScroll";
import { buildHref } from "@/utils/searchParams";
import { MERCHTYPE } from "@/data/causes";

type MerchCategoryProps = {
    activeMerch: string;
    path: string;
}

export type MerchOption = {
    label: string;
    value: string;
}

const MERCHOPTION: MerchOption[] = [
    { label: 'All', value: 'all'},
    ...MERCHTYPE
]

export default function MerchCategory({ activeMerch, path }: MerchCategoryProps) {
    const searchParams = useSearchParams();
    const drag = useDragScroll<HTMLDivElement>();

    return (
        <div className="w-full flex flex-col md:flex-row px-4 md:px-16 py-3 gap-6 items-center">
            <div {...drag} className="flex w-full no-scrollbar overflow-x-auto md:w-fit gap-6 py-1 items-center">
                {MERCHOPTION.map((merch) => (
                    <Button
                        key={merch.value}
                        text={merch.label}
                        variant={activeMerch === merch.value ? 'primary' : 'ghost'}
                        link={buildHref(path, searchParams, { merch: merch.value, page: "1" })}
                    />
                ))}
            </div>
        </div>
    )
}

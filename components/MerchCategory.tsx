'use client'

import { useRef } from "react";
import Button from "./Button";
import { MERCHTYPE } from "@/data/causes";

type MerchCategoryProps = {
    activeMerch: string;
    path: string;
    sortActive?: boolean;
    activeSort?: string;
    activeFilter?: string;
}

export type MerchOption = {
    label: string;
    value: string;
}

const MERCHOPTION: MerchOption[] = [
    { label: 'All', value: 'all'},
    ...MERCHTYPE
]

export default function MerchCategory({ activeMerch, activeFilter, path, sortActive=true, activeSort }: MerchCategoryProps) {
    const pillsRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - pillsRef.current!.offsetLeft;
        scrollLeft.current = pillsRef.current!.scrollLeft;
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - pillsRef.current!.offsetLeft;
        const walk = x - startX.current;
        pillsRef.current!.scrollLeft = scrollLeft.current - walk;
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    return (
        <div className="w-full flex flex-col md:flex-row px-4 md:px-16 py-3 gap-6 items-center">
            <div ref={pillsRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={stopDragging} className="flex w-full no-scrollbar overflow-x-auto md:w-fit gap-6 py-1 items-center">
                {MERCHOPTION.map((merch) => (
                    <Button key={merch.value} text={merch.label} variant={activeMerch === merch.value ? 'primary' : 'ghost'} link={`/${path}?page=1${sortActive ? "&sort="+activeSort : ""}&filter=${activeFilter}&merch=${merch.value}`} />
                ))}
            </div>
        </div>
    )
}
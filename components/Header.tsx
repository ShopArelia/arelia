'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MaskedIcon from "./MaskedIcon";
import { buildHref } from "@/utils/searchParams";

type HeaderProps = {
    title: string;
    description: string;
    inputPlaceholder: string;
    path: string;
}

export default function Header({ title, description, inputPlaceholder, path }: HeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParam = searchParams.get("search") ?? "";

    const [text, setText] = useState(searchParam);
    const [syncedParam, setSyncedParam] = useState(searchParam);

    // Keep the field in sync when the URL changes underneath us — back/forward,
    // or a filter link that cleared the term. Adjusting during render rather
    // than in an effect avoids a cascading re-render.
    if (searchParam !== syncedParam) {
        setSyncedParam(searchParam);
        setText(searchParam);
    }

    // Debounce typing into the URL. The equality guard means mounting on
    // /shop?search=tote doesn't immediately re-navigate to itself.
    useEffect(() => {
        if (text === searchParam) return;

        const timeout = setTimeout(() => {
            router.push(buildHref(path, searchParams, { search: text || null, page: "1" }));
        }, 400);

        return () => clearTimeout(timeout);
    }, [text, searchParam, path, router, searchParams]);

    return (
        <div className="w-full flex flex-col md:flex-row px-16 py-24 gap-6 justify-between items-center">
            <div className="flex flex-col items-center md:items-start gap-6">
                <h1 className="text-display text-surface-400 font-DMSerif-Reg leading-none text-center md:text-left">{title}</h1>
                <p className="text-body text-surface-300 font-DMSans-400 leading-none text-center md:text-left">{description}</p>
            </div>
            <div className="flex items-center justify-center px-4 py-2 gap-3 rounded-full border border-primary-300">
                <MaskedIcon src="/icons/search.svg" size="16px" className={text ? 'text-surface-300' : 'text-surface-200' } />
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={inputPlaceholder}
                    aria-label={inputPlaceholder}
                    className={`w-full bg-transparent outline-none text-body-sm font-DMSans-500 ${text ? 'text-surface-300' : 'text-surface-200'}`} />
            </div>
        </div>
    )
}

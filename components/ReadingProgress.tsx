"use client"

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const d = document.documentElement;
            const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
            if (barRef.current) {
                barRef.current.style.height = `${Math.min(100, pct)}%`;
            }
        };

        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div className="w-[2px] h-[100px] bg-surface-100">
            <div ref={barRef} className="w-full h-0 bg-primary-300 transition-[height] duration-100" />
        </div>
    )
}
'use client'

import { useRef } from "react";

/**
 * Click-and-drag horizontal scrolling for the filter pill rows.
 * Returns props to spread onto the scrolling container.
 */
export function useDragScroll<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!ref.current) return;
        isDragging.current = true;
        startX.current = e.pageX - ref.current.offsetLeft;
        scrollLeft.current = ref.current.scrollLeft;
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !ref.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    return {
        ref,
        onMouseDown,
        onMouseMove,
        onMouseUp: stopDragging,
        onMouseLeave: stopDragging,
    };
}

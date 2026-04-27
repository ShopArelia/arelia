"use client"
import MaskedIcon from "./MaskedIcon";

export default function CopyButton() {
    return (
        <button className="w-[36px] h-[36px] flex items-center justify-center border-2 rounded-md border-surface-200 cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.href)}>
            <MaskedIcon src="/icons/link-solid-full.svg" size="24px" className="text-surface-400" />
        </button>
    )
}
'use client'

import MaskedIcon from "./MaskedIcon";

type HeaderProps = {
    title: string;
    description: string;
    inputPlaceholder: string;
    text: string;
    onChange: (value: string) => void;
}

export default function Header({ title, description, inputPlaceholder, text, onChange }: HeaderProps) {
    return (
        <div className="w-full flex flex-col md:flex-row px-16 py-24 gap-6 justify-between items-center">
            <div className="flex flex-col items-center md:items-start gap-6">
                <p className="text-display text-surface-400 font-DMSerif-Reg leading-none text-center md:text-left">{title}</p>
                <p className="text-body text-surface-300 font-DMSans-400 leading-none text-center md:text-left">{description}</p>
            </div>
            <div className="flex items-center justify-center px-4 py-2 gap-3 rounded-full border border-primary-300">
                <MaskedIcon src="./icons/search.svg" size="16px" className={text ? 'text-surface-300' : 'text-surface-200' } />
                <input type="text" value={text} onChange={(e) => onChange(e.target.value)} placeholder={inputPlaceholder}
                    className={`w-full bg-transparent outline-none text-body-sm font-DMSans-500 ${text ? 'text-surface-300' : 'text-surface-200'}`} />
            </div>
        </div>
    )
}
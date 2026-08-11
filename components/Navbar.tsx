'use client'

import Link from "next/link";
import { Suspense, useState } from "react";

import MaskedIcon from "./MaskedIcon";
import Button from "./Button";
import NavLinks, { NavLinkList } from "./NavLinks";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full md:sticky top-0 z-50 bg-primary-50 relative">

            <div className="flex px-6 py-4 items-center justify-between">

                <Link className="flex items-center justify-center gap-2 font-DMSerif-Reg text-h2 text-primary-400 leading-none" onClick={() => setMenuOpen(false)} href="/">
                    <MaskedIcon src="/web_logo.svg" size="36px" className="text-primary-400" />
                    Arelia
                </Link>

                <nav className="hidden md:flex w-fit gap-6" aria-label="Main">
                    <Suspense fallback={<NavLinkList pathname={null} variant="desktop" />}>
                        <NavLinks variant="desktop" />
                    </Suspense>
                </nav>

                <Button text="Get Involved" link="/contact" classN="hidden md:block" />

                <button
                    className="md:hidden flex items-center justify-center text-primary-400"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    {menuOpen ? (
                        <MaskedIcon src="/icons/xmark-solid-full.svg" size="24px" />
                    ) : (
                        <MaskedIcon src="/icons/bars-solid-full.svg" size="24px" />
                    )}
                </button>

            </div>

            {menuOpen && (
                <nav aria-label="Main" className="md:hidden absolute top-full left-0 w-full bg-primary-50 border-t border-primary-100 px-6 py-4 flex flex-col gap-1 shadow-[0_8px_24px_rgba(45,80,22,0.1)]">
                    <Suspense fallback={<NavLinkList pathname={null} variant="mobile" />}>
                        <NavLinks variant="mobile" onNavigate={() => setMenuOpen(false)} />
                    </Suspense>

                    <div className="pt-3">
                        <Button text="Get Involved" link="/contact" classN="flex !justify-start" onClick={() => setMenuOpen(false)} />
                    </div>
                </nav>
            )}

        </div>
    )
}

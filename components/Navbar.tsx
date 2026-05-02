'use client'

import Link from "next/link";
import Image from "next/image";
import MaskedIcon from "./MaskedIcon";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLinkProps = {
    label: string;
    href: string;
}

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks: NavLinkProps[] = [
        { label: "Shop", href: "/shop" },
        { label: "Nonprofits", href: "/nonprofits" },
        { label: "Blog", href: "/blogs" },
        { label: "About", href: "/about" },
    ];

    return (
        <div className="w-full md:sticky top-0 z-50 bg-primary-50 relative">

            <div className="flex px-6 py-4 items-center justify-between">

                <Link className="flex items-center justify-center gap-2 font-DMSerif-Reg text-h2 text-primary-400 leading-none" href="/">
                    <MaskedIcon src="/web_logo.svg" size="36px" className="text-primary-400" />
                    Arelia
                </Link>

                <div className="hidden md:flex w-fit gap-6">
                    {navLinks.map(({ label, href }) => (
                        <Link key={href} className={`text-body ${pathname === href ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href={href}>{label}</Link>
                    ))}
                </div>

                <Button text="Get Involved" link="/contact" classN="hidden md:block" />

                <button className="md:hidden flex items-center justify-center text-primary-400" onClick={() => setMenuOpen((prev) => !prev)}>
                    {menuOpen ? (
                        <MaskedIcon src="/icons/xmark-solid-full.svg" size="24px" />
                    ) : (
                        <MaskedIcon src="/icons/bars-solid-full.svg" size="24px" />
                    )}
                </button>

            </div>

            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-primary-50 border-t border-primary-100 px-6 py-4 flex flex-col gap-1 shadow-[0_8px_24px_rgba(45,80,22,0.1)]">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`text-body py-3 border-b border-primary-100/50 last:border-none ${pathname === href ? 'font-DMSans-500 text-primary-500' : 'font-DMSans-400 text-primary-300'}`}>
                            {label}
                        </Link>
                    ))}

                    <div className="pt-3">
                        <Button text="Get Involved" link="/contact" classN="flex !justify-start" onClick={() => setMenuOpen((prev) => !prev)} />
                    </div>
                </div>
            )}

        </div>
    )
}
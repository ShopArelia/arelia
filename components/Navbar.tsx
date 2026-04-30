'use client'

import Link from "next/link";
import Image from "next/image";
import MaskedIcon from "./MaskedIcon";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="w-full sticky flex top-0 px-6 py-4 items-center justify-between bg-primary-50">

            <Link className="flex items-center justify-center gap-2 font-DMSerif-Reg text-h2 text-primary-400 leading-none" href="/">
                <MaskedIcon src="/web_logo.svg" size="36px" className="text-primary-400" />
                Arelia
            </Link>

            <div className="flex w-fit gap-6">
                <Link className={`text-body ${pathname === '/shop' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href="/shop">Shop</Link>
                <Link className={`text-body ${pathname === '/nonprofits' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href='/nonprofits'>Nonprofits</Link>
                <Link className={`text-body ${pathname === '/blogs' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href='/blogs'>Blog</Link>
                <Link className={`text-body ${pathname === '/about' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href='/about'>About</Link>
            </div>

            <Button text="Get Involved" link="/contact" />

        </div>
    )
}
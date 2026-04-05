'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="w-full sticky flex top-0 px-6 py-4 items-center justify-between bg-primary-50">

            <Link className="flex items-center justify-center gap-1 font-DMSerif-Reg text-[20px] text-primary-400 leading-none" href="/">
                <Image src='./web_logo.svg' alt="Arelia logo"  width={24} height={24} unoptimized />
                Arelia
            </Link>

            <div className="flex w-fit gap-6">
                <Link className={`text-body ${pathname === '/shop' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href="/shop">Browse</Link>
                <Link className={`text-body ${pathname === '/nonprofits' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href='/nonprofits'>Nonprofits</Link>
                <Link className={`text-body ${pathname === '/blogs' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href='/blogs'>Blog</Link>
                <Link className={`text-body ${pathname === '/about' ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`} href='/about'>About</Link>
            </div>

            <Link className="btn text-body-sm font-DMSans-500 btn-primary" href="/contact">Get Involved</Link>

        </div>
    )
}
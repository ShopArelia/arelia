'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkProps = {
    label: string;
    href: string;
}

export const navLinks: NavLinkProps[] = [
    { label: "Shop", href: "/shop" },
    { label: "Nonprofits", href: "/nonprofits" },
    { label: "Blog", href: "/blogs" },
    { label: "About", href: "/about" },
];

type ListProps = {
    pathname: string | null;
    variant: "desktop" | "mobile";
    onNavigate?: () => void;
}

/**
 * Presentational link list. `pathname` is null in the Suspense fallback — the
 * links render identically, just without the active highlight, so the shell can
 * prerender while the pathname streams in.
 */
export function NavLinkList({ pathname, variant, onNavigate }: ListProps) {
    if (variant === "desktop") {
        return (
            <>
                {navLinks.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                        className={`text-body ${pathname === href ? 'font-DMSans-500 text-primary-400' : 'font-DMSans-400 text-primary-300'}`}
                    >{label}</Link>
                ))}
            </>
        );
    }

    return (
        <>
            {navLinks.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`text-body py-3 border-b border-primary-100/50 last:border-none ${pathname === href ? 'font-DMSans-500 text-primary-500' : 'font-DMSans-400 text-primary-300'}`}
                >
                    {label}
                </Link>
            ))}
        </>
    );
}

/** Reads the current route — must be rendered inside a <Suspense>. */
export default function NavLinks({ variant, onNavigate }: Omit<ListProps, "pathname">) {
    const pathname = usePathname();
    return <NavLinkList pathname={pathname} variant={variant} onNavigate={onNavigate} />;
}

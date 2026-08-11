import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Partner with us, ask about a product, or just say hello. We reply within 48 hours.",
    alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}

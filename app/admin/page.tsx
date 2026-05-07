import { getSupabase } from "@/utils/supabase/database";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await getSupabase();

  const [
    { count: blogCount },
    { count: productCount },
    { count: ngoCount },
  ] = await Promise.all([
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("ngos").select("*", { count: "exact", head: true }),
  ]);

  const sections = [
    {
      href:        "/admin/blogs",
      newHref:     "/admin/blogs/newBlog",
      label:       "Blog posts",
      count:       blogCount ?? 0,
      unit:        "post",
      description: "Write and edit articles. Published posts appear on the public blog.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
    {
      href:        "/admin/products",
      newHref:     "/admin/products/new",
      label:       "Products",
      count:       productCount ?? 0,
      unit:        "product",
      description: "Add and manage products. Each product links directly to a nonprofit's store.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
    },
    {
      href:        "/admin/ngos",
      newHref:     "/admin/ngos/new",
      label:       "Nonprofits",
      count:       ngoCount ?? 0,
      unit:        "NGO",
      description: "Manage verified nonprofit partners. NGOs are linked to products and the public directory.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50">

      {/* ── Top bar ── */}
      <header className="h-[60px] bg-white border-b border-surface-100 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <span className="font-serif text-[1rem] text-surface-400">Arelia</span>
          <span className="text-surface-200 mx-0.5">/</span>
          <span className="text-[13px] font-medium text-surface-300">Admin</span>
        </div>

        <a
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[13px] text-surface-300 hover:text-surface-400 transition-colors"
        >
          View site
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </header>

      <main className="max-w-[800px] mx-auto px-6 py-16">

        {/* Heading */}
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-primary-200 mb-3">
            Content dashboard
          </p>
          <h1 className="font-serif text-[36px] font-normal tracking-[-0.02em] text-surface-400 leading-[1.15]">
            What would you like<br />
            <em className="italic text-primary-300">to work on?</em>
          </h1>
        </div>

        {/* Section cards */}
        <div className="flex flex-col gap-4">
          {sections.map(({ href, newHref, label, count, unit, description, icon }) => (
            <div
              key={href}
              className="bg-white border border-surface-100 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 hover:border-primary-200 hover:shadow-[0_2px_0_#D4EAC8,0_4px_12px_rgba(45,80,22,0.08)] transition-all group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-300 shrink-0 group-hover:bg-primary-100 transition-colors">
                {icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h2 className="text-[16px] font-medium text-surface-400">{label}</h2>
                  <span className="text-[12px] text-surface-200">
                    {count} {unit}{count !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-[13px] text-surface-300 leading-[1.6]">{description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={newHref}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border border-surface-100 bg-white text-surface-300 hover:border-primary-200 hover:text-primary-300 transition-all"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  New
                </Link>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white bg-primary-300 shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)] hover:shadow-[0_3px_0_#2D5016,0_6px_16px_rgba(45,80,22,0.3)] hover:-translate-y-px transition-all"
                >
                  View all
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-surface-100 my-10" />

        {/* Quick links */}
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium tracking-[0.06em] uppercase text-surface-200">
            Quick actions
          </p>
          <div className="flex gap-3">
            {[
              { href: "/admin/blogs/newBlog",   label: "Write a post"   },
              { href: "/admin/products/new",    label: "Add a product"  },
              { href: "/admin/ngos/new",        label: "Add an NGO"     },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] text-primary-300 hover:text-primary-400 underline underline-offset-[3px] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
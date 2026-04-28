import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6 py-16 relative overflow-hidden bg-surface-50">

        {/* Decorative rings */}
        <div className="absolute w-[560px] h-[560px] rounded-full border border-primary-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
        <div className="absolute w-[860px] h-[860px] rounded-full border border-primary-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-[480px] animate-[fadeUp_0.5s_ease_both]">

          {/* Ghost 404 */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 -z-10 font-serif text-[clamp(96px,18vw,152px)] font-normal leading-none tracking-[-0.04em] text-primary-100 select-none whitespace-nowrap"
            aria-hidden="true"
          >
            404
          </div>

          {/* Bear icon */}
          <div className="mt-[72px] mb-6 w-[72px] h-[72px] rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-300 shadow-[0_2px_0_#D4EAC8,0_4px_12px_rgba(45,80,22,0.12)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6.1V17h8v-1.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z"/>
              <circle cx="7"    cy="4"  r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="17"   cy="4"  r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="9.5"  cy="10" r="1"   fill="currentColor" stroke="none"/>
              <circle cx="14.5" cy="10" r="1"   fill="currentColor" stroke="none"/>
              <path d="M10 13.8c.6-.35 1.4-.55 2-.55s1.4.2 2 .55" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[clamp(26px,5vw,36px)] font-normal leading-tight tracking-[-0.015em] text-surface-400 mb-4">
            This page got lost<br />
            <em className="italic text-primary-300">in the wild.</em>
          </h1>

          {/* Body */}
          <p className="text-[15px] leading-[1.7] text-surface-300 mb-8 max-w-[380px]">
            The page you're looking for doesn't exist — or may have moved.
            Every good cause deserves to be found, so let's get you back.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2.5 mb-12 flex-wrap justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-medium text-white bg-primary-300 shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)] hover:shadow-[0_3px_0_#2D5016,0_6px_16px_rgba(45,80,22,0.3)] hover:-translate-y-px transition-all"
            >
              Go home
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-medium text-primary-300 border border-primary-300 shadow-[0_2px_0_#D4EAC8,0_4px_12px_rgba(45,80,22,0.12)] hover:bg-primary-50 hover:-translate-y-px transition-all"
            >
              Browse products
            </Link>
          </div>

          {/* Quick links */}
          <p className="text-[10px] font-medium tracking-[0.08em] uppercase text-surface-200 mb-3">
            Or try one of these
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { href: "/nonprofits", label: "Nonprofit directory" },
              { href: "/blogs",      label: "Blog"               },
              { href: "/about",      label: "About Arelia"       },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-surface-100 bg-white text-[13px] text-surface-300 hover:border-primary-200 hover:text-primary-300 hover:shadow-[0_2px_0_#D4EAC8,0_4px_12px_rgba(45,80,22,0.12)] transition-all"
              >
                {label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
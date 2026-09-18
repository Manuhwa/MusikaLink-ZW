"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/ussd-demo", label: "Farmer USSD" },
  { href: "/agent-dashboard", label: "Agent" },
  { href: "/buyer", label: "Buyer" },
  { href: "/prices", label: "Prices & Safety" },
  { href: "/compliance", label: "Compliance" },
  { href: "/how-it-works", label: "How it works" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-musika-blue/15 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-musika-blue text-musika-gold font-display font-extrabold text-sm shadow-sm">
            ML
          </span>
          <span className="font-display font-bold text-musika-blue group-hover:text-musika-blue-light transition-colors">
            MusikaLink <span className="text-musika-gold">ZW</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-wrap justify-end">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : l.href === "/prices"
                  ? pathname.startsWith("/prices") || pathname.startsWith("/safety")
                  : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-musika-blue text-white"
                    : "text-musika-blue hover:bg-musika-blue/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-musika-blue hover:bg-musika-blue/10"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-musika-blue/10 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : l.href === "/prices"
                  ? pathname.startsWith("/prices") || pathname.startsWith("/safety")
                  : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  active
                    ? "bg-musika-blue text-white"
                    : "text-musika-blue hover:bg-musika-blue/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

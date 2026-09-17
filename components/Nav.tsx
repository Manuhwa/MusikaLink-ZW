"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/ussd-demo", label: "USSD Demo" },
  { href: "/agent-dashboard", label: "Agent Dashboard" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-musika-blue/15 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-musika-blue text-musika-gold font-display font-extrabold text-sm shadow-sm">
            ML
          </span>
          <span className="font-display font-bold text-musika-blue group-hover:text-musika-blue-light transition-colors">
            MusikaLink <span className="text-musika-gold">ZW</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
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
      </div>
    </header>
  );
}

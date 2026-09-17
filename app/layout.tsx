import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MusikaLink ZW — Fair farm-to-market access",
  description:
    "USSD-first marketplace for Zimbabwe smallholders. POTRAZ Innovation EXPO 2026 demo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body min-h-screen`}>
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-musika-blue/10 bg-white/60 mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p>
              <span className="font-display font-bold text-musika-blue">MusikaLink ZW</span>{" "}
              — POTRAZ Innovation EXPO 2026 demo
            </p>
            <p className="text-slate-500">
              AgriTech · Food Security · Farm-to-Market
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

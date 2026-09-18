import Link from "next/link";
import { PricesSafety } from "@/components/PricesSafety";

/** Alias of /prices for “Prices & Safety” / check-before-you-pay */
export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-musika-gold-dark">
          Farmer safety · Mashonaland Central
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-musika-blue">
          Prices &amp; pay safety
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Same tools as{" "}
          <Link href="/prices" className="font-semibold text-musika-blue hover:underline">
            /prices
          </Link>
          : ward-level verified local prices and check-before-you-pay. Also on USSD menu{" "}
          <strong>5</strong>.
        </p>
      </div>
      <PricesSafety />
    </div>
  );
}

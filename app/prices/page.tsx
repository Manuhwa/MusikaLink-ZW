import Link from "next/link";
import { PricesSafety } from "@/components/PricesSafety";

export default function PricesPage() {
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
          See ward-level <strong>verified local</strong> indicative prices, then run a short{" "}
          <strong>check before you pay</strong> flow for EcoCash / OneMoney / Telecash tills.
          Also available from Farmer USSD menu option <strong>5</strong>. Related:{" "}
          <Link href="/compliance" className="font-semibold text-musika-blue hover:underline">
            informal trader compliance tips
          </Link>
          .
        </p>
      </div>
      <PricesSafety />
    </div>
  );
}

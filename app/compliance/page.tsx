import Link from "next/link";
import { ComplianceGuide } from "@/components/ComplianceGuide";

export default function CompliancePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-musika-gold-dark">
          Informal trade · Zimbabwe
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-musika-blue">
          Procurement compliance tips
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Educational good practice for farmers and informal traders: simple sale records,
          agreed weights/grades, recognised markets, and proof of sale. Pair with{" "}
          <Link href="/prices" className="font-semibold text-musika-blue hover:underline">
            Prices &amp; Safety
          </Link>{" "}
          before you pay a till.
        </p>
      </div>
      <ComplianceGuide />
    </div>
  );
}

"use client";

import { COMPLIANCE_DISCLAIMER, COMPLIANCE_TIPS } from "@/lib/data";

const SALE_FIELDS = [
  "Date",
  "Product",
  "Grade (A/B/C)",
  "Quantity + unit",
  "Unit price & total",
  "Buyer name / phone / till",
] as const;

export function ComplianceGuide() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
        <strong className="font-display">Disclaimer:</strong> {COMPLIANCE_DISCLAIMER}
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-musika-blue">
          Good practice for informal traders &amp; farmers
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl text-sm leading-relaxed">
          Short educational tips for Zimbabwe farm-gate and market sales. Use alongside
          MusikaLink listings, ward hubs, and the{" "}
          <a href="/prices" className="font-semibold text-musika-blue hover:underline">
            Prices &amp; Safety
          </a>{" "}
          till check.
        </p>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {COMPLIANCE_TIPS.map((tip, i) => (
            <li
              key={tip.id}
              className="rounded-2xl border border-musika-blue/10 bg-white p-5 shadow-sm"
            >
              <span className="font-display text-2xl font-extrabold text-musika-gold">
                {i + 1}
              </span>
              <h3 className="mt-1 font-display font-bold text-musika-blue">{tip.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{tip.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl bg-musika-cream p-6 ring-1 ring-musika-blue/10">
        <h2 className="font-display text-lg font-bold text-musika-blue">
          Simple sale record (template)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Copy into a notebook or phone note for each sale:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SALE_FIELDS.map((f) => (
            <li
              key={f}
              className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-musika-blue ring-1 ring-musika-blue/10"
            >
              {f}: _______________
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-musika-blue/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-musika-blue">
          USSD tip (also on *288# → option 5)
        </h2>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-[13px] leading-relaxed text-emerald-100">
{`MusikaLink · Compliance tips
1. Record sale (date/product/grade/qty/price/buyer)
2. Agree weights & grades first
3. Prefer markets / ward hubs
4. Keep SMS / till proof
0. Back
Educational only — not legal advice.`}
        </pre>
      </section>
    </div>
  );
}

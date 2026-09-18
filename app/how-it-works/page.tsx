import Link from "next/link";

const flow = [
  {
    title: "Farmer lists",
    body: "On any GSM phone, dial *288#. Register, pick crop (with Shona names), quantity, grade, and pickup ward — e.g. Madziwa.",
    href: "/ussd-demo",
    cta: "Open Farmer USSD",
  },
  {
    title: "Ward agent linked",
    body: "Each ward is assigned an aggregation agent (youth / women-led hub or agro-dealer). The listing is routed by ward assignment — not by random broadcast.",
    href: "/agent-dashboard",
    cta: "Open Agent dashboard",
  },
  {
    title: "Agent notified",
    body: "The agent desk shows a live alert (“New listing: maize 500kg — Madziwa”). They can filter by ward and status, weigh/grade, and batch loads.",
    href: "/agent-dashboard",
    cta: "See live alerts",
  },
  {
    title: "Buyer match & escrow",
    body: "A verified buyer (trader, school feeding, hotel, NGO) accepts the lot or posts demand. Payment is held in mobile-money escrow.",
    href: "/buyer",
    cta: "Open Buyer portal",
  },
  {
    title: "Delivery → release",
    body: "Goods move via self-delivery or the aggregation point. Agent marks delivered, then releases escrow to the farmer’s EcoCash / OneMoney / Telecash wallet.",
    href: "/agent-dashboard",
    cta: "Release escrow demo",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-musika-gold-dark">
          Agent linkage
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-musika-blue">
          How it works
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          MusikaLink ZW connects farmers, ward agents, and buyers on one trade trail —
          USSD-first for farmers, dashboard for agents, portal for buyers. In this demo,
          all roles share browser{" "}
          <code className="text-xs bg-musika-cream px-1 rounded">localStorage</code> so a
          USSD listing appears instantly on Agent and Buyer views.
        </p>
      </div>

      <ol className="space-y-4">
        {flow.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-musika-blue/10 bg-white p-5 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-musika-blue font-display text-xl font-extrabold text-musika-gold">
              {i + 1}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-musika-blue">
                {step.title}
              </h2>
              <p className="mt-1 text-slate-600 leading-relaxed">{step.body}</p>
              <Link
                href={step.href}
                className="mt-3 inline-block text-sm font-bold text-musika-blue hover:underline"
              >
                {step.cta} →
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl bg-musika-blue p-6 text-white">
        <h2 className="font-display text-xl font-bold text-musika-gold-light">
          Why ward agents matter
        </h2>
        <p className="mt-2 text-blue-100 leading-relaxed max-w-3xl">
          Distance, trust, and quality disputes are the hard parts of farm-gate trade.
          Linking each listing to a local agent creates a human checkpoint: weigh, grade,
          batch, and confirm delivery before escrow unlocks. Agents earn a transparent
          micro-fee per successful trade — youth and women livelihoods built into the
          marketplace spine.
        </p>
      </div>
    </div>
  );
}

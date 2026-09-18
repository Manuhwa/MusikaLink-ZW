import Link from "next/link";

const barriers = [
  {
    title: "Poor market information",
    body: "Farmers often do not know going prices beyond the farm gate.",
  },
  {
    title: "Distress selling",
    body: "No storage and urgent cash needs push sales below competitive prices.",
  },
  {
    title: "Payment risk",
    body: "Delayed or unreliable payments starve the next planting season.",
  },
  {
    title: "Digital divide",
    body: "Smartphones and data are uneven — basic phones and USSD remain inclusive.",
  },
];

const steps = [
  { n: "1", title: "Dial *288#", body: "List crop, quantity, grade & ward on any GSM phone." },
  { n: "2", title: "Ward agent linked", body: "Listing routes to the aggregation agent for that ward." },
  { n: "3", title: "Match a buyer", body: "Verified traders, processors, schools, hotels & NGOs." },
  { n: "4", title: "Escrow → EcoCash", body: "Funds held until delivery; released to mobile money." },
];

const roles = [
  {
    href: "/ussd-demo",
    eyebrow: "Farmer",
    title: "USSD Simulator (*288#)",
    body: "List produce → local prices → buyer match → escrow → EcoCash-style confirmation. English ↔ Shona. Listings sync to Agent & Buyer.",
    style: "bg-musika-blue text-white",
    eyebrowClass: "text-musika-gold-light",
    linkClass: "text-musika-gold",
  },
  {
    href: "/agent-dashboard",
    eyebrow: "Ward agent",
    title: "Agent Dashboard",
    body: "Live alerts for new listings, filter by ward/status, mark delivered, release escrow. Agents linked by ward assignment.",
    style: "border-2 border-musika-gold bg-white",
    eyebrowClass: "text-musika-gold-dark",
    titleClass: "text-musika-blue",
    bodyClass: "text-slate-600",
    linkClass: "text-musika-blue",
  },
  {
    href: "/buyer",
    eyebrow: "Buyer",
    title: "Buyer portal",
    body: "Browse available lots, post demand, accept & match into escrow. Traders, school feeding, hotels, NGOs.",
    style: "border-2 border-musika-blue/20 bg-white",
    eyebrowClass: "text-musika-blue",
    titleClass: "text-musika-blue",
    bodyClass: "text-slate-600",
    linkClass: "text-musika-blue",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-musika-blue-dark via-musika-blue to-musika-blue-light text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #D4A017 0%, transparent 45%), radial-gradient(circle at 80% 60%, #F0C040 0%, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-musika-gold-light ring-1 ring-musika-gold/40">
            POTRAZ Innovation EXPO 2026 · AgriTech
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-balance max-w-3xl">
            Fair farm-to-market access for Zimbabwe&apos;s smallholders
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-blue-100 leading-relaxed">
            <strong className="text-white">MusikaLink ZW</strong> is a{" "}
            <strong className="text-musika-gold-light">USSD-first marketplace</strong> — list
            produce, see real local prices, match verified buyers, and get paid through{" "}
            mobile-money escrow, with village aggregation points that scale beyond one truck.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ussd-demo"
              className="inline-flex items-center justify-center rounded-full bg-musika-gold px-6 py-3 font-display font-bold text-musika-blue-dark shadow-lg hover:bg-musika-gold-light transition-colors"
            >
              Farmer (USSD)
            </Link>
            <Link
              href="/agent-dashboard"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 font-display font-bold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors"
            >
              Agent
            </Link>
            <Link
              href="/buyer"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 font-display font-bold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors"
            >
              Buyer
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-display font-bold text-musika-gold-light hover:text-white transition-colors"
            >
              How it works →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-musika-blue">
          The critical problem
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
          Agriculture supports most Zimbabwean livelihoods, yet smallholders still struggle to
          sell at a fair price. Weaker farmer incomes mean thinner rural purchasing power and
          recurring food gaps — even when national harvests look strong.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {barriers.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-musika-blue/10 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 h-1.5 w-10 rounded-full bg-musika-gold" />
              <h3 className="font-display font-bold text-musika-blue">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-musika-blue/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-musika-blue">
                How it works
              </h2>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Inclusive by design: works on basic GSM (USSD/SMS), English & Shona menus,
                escrow until delivery confirmed.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="text-sm font-bold text-musika-blue hover:underline"
            >
              Agent linkage explained →
            </Link>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative rounded-2xl bg-musika-cream p-5 ring-1 ring-musika-blue/10"
              >
                <span className="font-display text-3xl font-extrabold text-musika-gold">
                  {s.n}
                </span>
                <h3 className="mt-1 font-display font-bold text-musika-blue">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-musika-blue">
          Live booth demos
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {roles.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`group rounded-2xl p-6 shadow-md transition-colors hover:opacity-95 ${r.style}`}
            >
              <p
                className={`text-sm font-semibold uppercase tracking-wide ${r.eyebrowClass}`}
              >
                {r.eyebrow}
              </p>
              <h3
                className={`mt-1 font-display text-xl font-bold ${r.titleClass ?? "text-white"}`}
              >
                {r.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${r.bodyClass ?? "text-blue-100"}`}
              >
                {r.body}
              </p>
              <span
                className={`mt-4 inline-block font-semibold group-hover:underline ${r.linkClass}`}
              >
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-musika-blue-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <blockquote className="font-display text-lg sm:text-xl font-semibold leading-relaxed text-balance max-w-4xl">
            &ldquo;Most Zimbabwean smallholders still sell at the farm gate because they lack
            price information, reliable buyers, and fast payment. MusikaLink ZW uses the phones
            farmers already have — USSD and SMS — plus mobile-money escrow and village
            aggregation points.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-musika-gold-light">
            Elevator pitch · Pilot geography: Madziwa & nearby wards (Mashonaland Central)
          </p>
        </div>
      </section>
    </div>
  );
}

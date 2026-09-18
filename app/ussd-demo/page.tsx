import { UssdSimulator } from "@/components/UssdSimulator";

export default function UssdDemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-musika-gold-dark">
          Feature-phone demo
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-musika-blue">
          Farmer USSD — *288#
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Interactive mock of the MusikaLink short code. Register, list produce, see ward-level
          prices, accept a buyer match (or list without match), hold funds in escrow, then
          confirm an EcoCash-style payout. Listings persist to the shared browser store so the{" "}
          <strong>Agent</strong> and <strong>Buyer</strong> pages update live. Toggle English ↔
          Shona for booth visitors.
        </p>
      </div>
      <UssdSimulator />
    </div>
  );
}

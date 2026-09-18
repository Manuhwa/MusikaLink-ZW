import { BuyerPortal } from "@/components/BuyerPortal";

export default function BuyerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-musika-gold-dark">
          Verified buyers
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-musika-blue">
          Buyer portal
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Browse ward lots from smallholders, post demand (school feeding, hotels, NGOs,
          traders), and accept a match — funds move into EcoCash-style escrow until the ward
          agent confirms delivery.
        </p>
      </div>
      <BuyerPortal />
    </div>
  );
}

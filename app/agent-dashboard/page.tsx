import { AgentDashboard } from "@/components/AgentDashboard";

export default function AgentDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-musika-gold-dark">
          Village aggregation
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-musika-blue">
          Agent Dashboard
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Ward-level view for youth / women-led aggregation points: inbound farmer lots,
          buyer orders, delivery confirmation, and escrow release to mobile money.
        </p>
      </div>
      <AgentDashboard />
    </div>
  );
}

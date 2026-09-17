"use client";

import { useMemo, useState } from "react";
import {
  BUYERS,
  CROPS,
  SEED_TRADES,
  WARDS,
  formatUsd,
  type Trade,
  type TradeStatus,
} from "@/lib/data";

const STATUS_LABEL: Record<TradeStatus, string> = {
  listed: "Listed",
  matched: "Matched",
  escrow: "In escrow",
  in_transit: "In transit",
  delivered: "Delivered",
  paid: "Paid",
};

const STATUS_STYLE: Record<TradeStatus, string> = {
  listed: "bg-slate-100 text-slate-700",
  matched: "bg-blue-100 text-blue-800",
  escrow: "bg-amber-100 text-amber-900",
  in_transit: "bg-indigo-100 text-indigo-800",
  delivered: "bg-teal-100 text-teal-900",
  paid: "bg-emerald-100 text-emerald-900",
};

function cropLabel(id: string) {
  const c = CROPS.find((x) => x.id === id);
  return c ? `${c.en} (${c.sn})` : id;
}

function buyerLabel(id: string | null) {
  if (!id) return "—";
  return BUYERS.find((b) => b.id === id)?.name ?? id;
}

export function AgentDashboard() {
  const [trades, setTrades] = useState<Trade[]>(SEED_TRADES);
  const [filter, setFilter] = useState<"all" | TradeStatus>("all");
  const [toast, setToast] = useState<string | null>(null);

  const stats = useMemo(() => {
    const active = trades.filter((t) => t.status !== "paid" && t.status !== "listed");
    const escrowValue = trades
      .filter((t) => t.status === "escrow" || t.status === "in_transit" || t.status === "delivered")
      .reduce((s, t) => s + t.totalUsd, 0);
    const fees = trades
      .filter((t) => t.status === "paid")
      .reduce((s, t) => s + t.agentFeeUsd, 0);
    const deliveredToday = trades.filter(
      (t) => t.status === "delivered" || t.status === "paid"
    ).length;
    return {
      total: trades.length,
      active: active.length,
      escrowValue,
      fees,
      deliveredToday,
    };
  }, [trades]);

  const visible = useMemo(() => {
    if (filter === "all") return trades;
    return trades.filter((t) => t.status === filter);
  }, [trades, filter]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function markDelivered(id: string) {
    setTrades((prev) =>
      prev.map((t) =>
        t.id === id && (t.status === "escrow" || t.status === "in_transit")
          ? { ...t, status: "delivered" as const }
          : t
      )
    );
    flash(`Marked ${id} delivered — ready to release escrow.`);
  }

  function releaseEscrow(id: string) {
    setTrades((prev) =>
      prev.map((t) =>
        t.id === id && t.status === "delivered"
          ? { ...t, status: "paid" as const }
          : t
      )
    );
    const t = trades.find((x) => x.id === id);
    flash(
      `Escrow released · EcoCash ${formatUsd(t?.totalUsd ?? 0)} → ${t?.farmerPhone ?? "farmer"}`
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-musika-blue px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Agent header */}
      <div className="rounded-2xl bg-gradient-to-r from-musika-blue to-musika-blue-light p-6 text-white shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-musika-gold-light">
              Aggregation agent
            </p>
            <h2 className="font-display text-2xl font-bold">Madziwa Hub · Ward desk</h2>
            <p className="mt-1 text-sm text-blue-100">
              Agent: Nyasha Chirume · Wards: {WARDS.join(", ")}
            </p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-2 text-right ring-1 ring-white/20">
            <p className="text-xs text-blue-100">Session fees (paid trades)</p>
            <p className="font-display text-xl font-bold text-musika-gold-light">
              {formatUsd(stats.fees)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Open trades", value: String(stats.active) },
          { label: "Escrow held", value: formatUsd(stats.escrowValue) },
          { label: "Lots today", value: String(stats.total) },
          { label: "Delivered / paid", value: String(stats.deliveredToday) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-musika-blue/10 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {s.label}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-musika-blue">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            "all",
            "listed",
            "escrow",
            "in_transit",
            "delivered",
            "paid",
          ] as const
        ).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === f
                ? "bg-musika-gold text-musika-blue-dark"
                : "bg-white text-musika-blue ring-1 ring-musika-blue/20 hover:bg-musika-cream"
            }`}
          >
            {f === "all" ? "All" : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      {/* Trade table */}
      <div className="overflow-hidden rounded-2xl border border-musika-blue/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-musika-blue text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Trade</th>
                <th className="px-4 py-3 font-semibold">Farmer</th>
                <th className="px-4 py-3 font-semibold">Produce</th>
                <th className="px-4 py-3 font-semibold">Buyer</th>
                <th className="px-4 py-3 font-semibold">Value</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((t) => (
                <tr key={t.id} className="hover:bg-musika-cream/50">
                  <td className="px-4 py-3">
                    <div className="font-mono font-semibold text-musika-blue">{t.id}</div>
                    <div className="text-xs text-slate-500">{t.ward} · Grade {t.grade}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{t.farmer}</div>
                    <div className="text-xs text-slate-500">{t.farmerPhone}</div>
                  </td>
                  <td className="px-4 py-3">
                    {cropLabel(t.cropId)}
                    <div className="text-xs text-slate-500">× {t.qty}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{buyerLabel(t.buyerId)}</td>
                  <td className="px-4 py-3 font-semibold">{formatUsd(t.totalUsd)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_STYLE[t.status]}`}
                    >
                      {STATUS_LABEL[t.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(t.status === "escrow" || t.status === "in_transit") && (
                        <button
                          type="button"
                          onClick={() => markDelivered(t.id)}
                          className="rounded-lg bg-musika-blue px-2.5 py-1 text-xs font-bold text-white hover:bg-musika-blue-light"
                        >
                          Mark delivered
                        </button>
                      )}
                      {t.status === "delivered" && (
                        <button
                          type="button"
                          onClick={() => releaseEscrow(t.id)}
                          className="rounded-lg bg-musika-gold px-2.5 py-1 text-xs font-bold text-musika-blue-dark hover:bg-musika-gold-light"
                        >
                          Release escrow
                        </button>
                      )}
                      {t.status === "paid" && (
                        <span className="text-xs text-emerald-700 font-semibold">Complete</span>
                      )}
                      {t.status === "listed" && (
                        <span className="text-xs text-slate-500">Awaiting match</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No trades in this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Demo data only — mark delivered then release escrow to simulate the EcoCash payout path.
      </p>
    </div>
  );
}

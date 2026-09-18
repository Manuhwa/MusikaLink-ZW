"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AGENTS,
  BUYERS,
  WARDS,
  formatUsd,
  getCrop,
  type Trade,
  type TradeStatus,
  type Ward,
} from "@/lib/data";
import { patchTrade, resetStore, useMusikaStore } from "@/lib/store";

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
  const c = getCrop(id);
  return c ? `${c.en} (${c.sn})` : id;
}

function buyerLabel(id: string | null) {
  if (!id) return "—";
  return BUYERS.find((b) => b.id === id)?.name ?? id;
}

function alertText(t: Trade): string {
  const c = getCrop(t.cropId);
  const crop = c ? c.en.toLowerCase() : t.cropId;
  const qtyLabel =
    c?.id === "maize"
      ? `${t.qty * 50}kg`
      : `${t.qty} ${c?.unit ?? "units"}`;
  return `New listing: ${crop} ${qtyLabel} — ${t.ward}`;
}

const DEFAULT_AGENT = AGENTS[0];

export function AgentDashboard() {
  const { trades, ready } = useMusikaStore();
  const [statusFilter, setStatusFilter] = useState<"all" | TradeStatus>("all");
  const [wardFilter, setWardFilter] = useState<"all" | Ward>("all");
  const [toast, setToast] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const seenIds = useRef<Set<string>>(new Set());
  const primed = useRef(false);

  // Prime seen set once store is ready so seed data doesn't spam alerts
  useEffect(() => {
    if (!ready || primed.current) return;
    seenIds.current = new Set(trades.map((t) => t.id));
    primed.current = true;
  }, [ready, trades]);

  // Live alerts for newly arrived listings
  useEffect(() => {
    if (!ready || !primed.current) return;
    const fresh = trades.filter(
      (t) =>
        !seenIds.current.has(t.id) &&
        (t.status === "listed" || t.status === "escrow" || t.status === "matched")
    );
    if (fresh.length === 0) return;
    fresh.forEach((t) => seenIds.current.add(t.id));
    const messages = fresh.map(alertText);
    setAlerts((prev) => [...messages, ...prev].slice(0, 5));
  }, [trades, ready]);

  const stats = useMemo(() => {
    const scoped = wardFilter === "all" ? trades : trades.filter((t) => t.ward === wardFilter);
    const active = scoped.filter((t) => t.status !== "paid");
    const escrowValue = scoped
      .filter(
        (t) =>
          t.status === "escrow" ||
          t.status === "in_transit" ||
          t.status === "delivered"
      )
      .reduce((s, t) => s + t.totalUsd, 0);
    const fees = scoped
      .filter((t) => t.status === "paid")
      .reduce((s, t) => s + t.agentFeeUsd, 0);
    const deliveredToday = scoped.filter(
      (t) => t.status === "delivered" || t.status === "paid"
    ).length;
    return {
      total: scoped.length,
      active: active.length,
      escrowValue,
      fees,
      deliveredToday,
    };
  }, [trades, wardFilter]);

  const visible = useMemo(() => {
    return trades.filter((t) => {
      if (wardFilter !== "all" && t.ward !== wardFilter) return false;
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      return true;
    });
  }, [trades, wardFilter, statusFilter]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function markDelivered(id: string) {
    patchTrade(id, { status: "delivered" });
    flash(`Marked ${id} delivered — ready to release escrow.`);
  }

  function releaseEscrow(id: string) {
    const t = trades.find((x) => x.id === id);
    patchTrade(id, { status: "paid" });
    flash(
      `Escrow released · EcoCash ${formatUsd(t?.totalUsd ?? 0)} → ${t?.farmerPhone ?? "farmer"}`
    );
  }

  function dismissAlert(idx: number) {
    setAlerts((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-musika-blue px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Live alert banners */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((msg, i) => (
            <div
              key={`${msg}-${i}`}
              className="flex items-start justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 shadow-sm animate-pulse"
              style={{ animationIterationCount: 2 }}
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                    Live alert · ward assignment
                  </p>
                  <p className="font-semibold">{msg}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => dismissAlert(i)}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Agent header */}
      <div className="rounded-2xl bg-gradient-to-r from-musika-blue to-musika-blue-light p-6 text-white shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-musika-gold-light">
              Aggregation agent
            </p>
            <h2 className="font-display text-2xl font-bold">
              {DEFAULT_AGENT.hub} · Ward desk
            </h2>
            <p className="mt-1 text-sm text-blue-100">
              Agent: {DEFAULT_AGENT.name} · Linked by ward assignment (
              {DEFAULT_AGENT.wards.join(", ")}) — also monitors all pilot wards in this demo
            </p>
            <p className="mt-2 text-xs text-blue-200 max-w-xl">
              When a farmer lists via USSD, the ward agent for that pickup ward is notified.
              Confirm delivery, then release escrow to the farmer&apos;s EcoCash wallet.
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
          { label: "Lots (filter)", value: String(stats.total) },
          { label: "Delivered / paid", value: String(stats.deliveredToday) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-musika-blue/10 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {s.label}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-musika-blue">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Ward filter */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Filter by ward
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setWardFilter("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              wardFilter === "all"
                ? "bg-musika-blue text-white"
                : "bg-white text-musika-blue ring-1 ring-musika-blue/20 hover:bg-musika-cream"
            }`}
          >
            All wards
          </button>
          {WARDS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWardFilter(w)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                wardFilter === w
                  ? "bg-musika-blue text-white"
                  : "bg-white text-musika-blue ring-1 ring-musika-blue/20 hover:bg-musika-cream"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Status filters */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Filter by status
        </p>
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
              onClick={() => setStatusFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                statusFilter === f
                  ? "bg-musika-gold text-musika-blue-dark"
                  : "bg-white text-musika-blue ring-1 ring-musika-blue/20 hover:bg-musika-cream"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABEL[f]}
            </button>
          ))}
        </div>
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
                <tr
                  key={t.id}
                  className={`hover:bg-musika-cream/50 ${
                    t.source === "ussd" ? "bg-amber-50/40" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-mono font-semibold text-musika-blue">
                      {t.id}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.ward} · Grade {t.grade}
                      {t.source === "ussd" ? " · USSD" : ""}
                      {t.source === "buyer" ? " · Buyer match" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{t.farmer}</div>
                    <div className="text-xs text-slate-500">{t.farmerPhone}</div>
                  </td>
                  <td className="px-4 py-3">
                    {cropLabel(t.cropId)}
                    <div className="text-xs text-slate-500">× {t.qty}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {buyerLabel(t.buyerId)}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatUsd(t.totalUsd)}
                  </td>
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
                        <span className="text-xs text-emerald-700 font-semibold">
                          Complete
                        </span>
                      )}
                      {t.status === "listed" && (
                        <span className="text-xs text-slate-500">
                          Awaiting match
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No trades in this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          Shared store: <code>musikalink-zw-v1</code> — open USSD in another tab to create a
          listing and watch the alert banner.
        </p>
        <button
          type="button"
          onClick={() => {
            resetStore();
            seenIds.current = new Set();
            primed.current = false;
            setAlerts([]);
            flash("Demo data reset.");
          }}
          className="rounded-full px-3 py-1 font-semibold text-musika-blue ring-1 ring-musika-blue/20 hover:bg-white"
        >
          Reset demo data
        </button>
      </div>
    </div>
  );
}

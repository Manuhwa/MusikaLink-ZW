"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  BUYERS,
  CROPS,
  GRADES,
  WARDS,
  formatUsd,
  getCrop,
  midPrice,
  newDemandId,
  productLabel,
  productsMatch,
  type Demand,
  type Grade,
  type Trade,
  type Ward,
} from "@/lib/data";
import {
  addDemand,
  matchListingToBuyer,
  useMusikaStore,
} from "@/lib/store";

export function BuyerPortal() {
  const { trades, demands, ready } = useMusikaStore();
  const [buyerId, setBuyerId] = useState(BUYERS[0].id);
  const [toast, setToast] = useState<string | null>(null);
  const [wardFilter, setWardFilter] = useState<"all" | Ward>("all");
  const [cropFilter, setCropFilter] = useState<string>("all");

  // Post demand form
  const [dCrop, setDCrop] = useState(CROPS[0].id);
  const [dCustomName, setDCustomName] = useState("");
  const [dGrade, setDGrade] = useState<Grade>("A");
  const [dQty, setDQty] = useState(20);
  const [dWard, setDWard] = useState<Ward>("Madziwa");
  const [dPrice, setDPrice] = useState(midPrice(CROPS[0]));

  const buyer = BUYERS.find((b) => b.id === buyerId) ?? BUYERS[0];

  const available = useMemo(() => {
    return trades.filter((t) => {
      if (t.status !== "listed" && t.status !== "matched") return false;
      if (wardFilter !== "all" && t.ward !== wardFilter) return false;
      if (cropFilter !== "all") {
        if (cropFilter === "custom") {
          if (t.cropId !== "custom") return false;
        } else if (
          !productsMatch(t, { cropId: cropFilter }) &&
          t.cropId !== cropFilter
        ) {
          return false;
        }
      }
      return true;
    });
  }, [trades, wardFilter, cropFilter]);

  const myMatches = useMemo(() => {
    return trades.filter(
      (t) =>
        t.buyerId === buyerId &&
        (t.status === "escrow" ||
          t.status === "in_transit" ||
          t.status === "delivered" ||
          t.status === "paid")
    );
  }, [trades, buyerId]);

  const openDemands = useMemo(
    () => demands.filter((d) => d.status === "open"),
    [demands]
  );

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  function acceptListing(trade: Trade) {
    const crop = getCrop(trade.cropId);
    const premium = buyer.offerPremium;
    const unit =
      crop != null
        ? Math.round(midPrice(crop) * (1 + premium) * 100) / 100
        : trade.unitPrice;
    const result = matchListingToBuyer(trade.id, buyerId, unit);
    if (result) {
      const label = productLabel(trade);
      flash(
        `Matched ${trade.id} (${label}, grade ${trade.grade}) · escrow ${formatUsd(Math.round(unit * trade.qty * 100) / 100)} held from ${buyer.wallet}`
      );
    } else {
      flash("Could not match — listing may already be taken.");
    }
  }

  function postDemand(e: FormEvent) {
    e.preventDefault();
    const isCustom = dCrop === "custom";
    const custom = dCustomName.trim();
    if (isCustom && custom.length < 2) {
      flash("Enter a custom product name (Other…).");
      return;
    }
    const preset = getCrop(dCrop);
    const name = isCustom ? custom : preset?.en ?? dCrop;
    const demand: Demand = {
      id: newDemandId(),
      buyerId: buyer.id,
      buyerName: buyer.name,
      cropId: isCustom ? "custom" : dCrop,
      productName: name,
      qty: dQty,
      ward: dWard,
      grade: dGrade,
      priceMax: dPrice,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    addDemand(demand);
    flash(
      `Demand ${demand.id} posted (${name}, grade ${dGrade}) — visible to agents & matching farmers.`
    );
  }

  function onCropChange(id: string) {
    setDCrop(id);
    if (id === "custom") {
      if (!dCustomName) setDPrice(8);
      return;
    }
    const c = getCrop(id);
    if (c) setDPrice(midPrice(c));
  }

  if (!ready) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
        Loading marketplace…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-musika-blue px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Buyer identity */}
      <div className="rounded-2xl border border-musika-blue/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end gap-4 justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-musika-gold-dark">
              Signed in as buyer
            </p>
            <h2 className="font-display text-xl font-bold text-musika-blue">
              {buyer.name}
            </h2>
            <p className="text-sm text-slate-600">
              {buyer.type} · Preferred ward {buyer.ward} · {buyer.wallet}
            </p>
          </div>
          <label className="text-sm">
            <span className="mr-2 font-semibold text-slate-600">Switch buyer</span>
            <select
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
              className="rounded-lg border border-musika-blue/20 bg-musika-cream px-3 py-2 font-medium text-musika-blue"
            >
              {BUYERS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.type})
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Available lots */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-musika-blue">
              Available lots
            </h3>
            <div className="flex flex-wrap gap-2">
              <select
                value={wardFilter}
                onChange={(e) =>
                  setWardFilter(e.target.value as "all" | Ward)
                }
                className="rounded-full border border-musika-blue/20 px-3 py-1 text-xs font-semibold"
              >
                <option value="all">All wards</option>
                {WARDS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="rounded-full border border-musika-blue/20 px-3 py-1 text-xs font-semibold"
              >
                <option value="all">All products</option>
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.en}
                  </option>
                ))}
                <option value="custom">Other / custom</option>
              </select>
            </div>
          </div>

          {available.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-musika-blue/20 bg-white p-8 text-center text-slate-500">
              No open listings. Create one on the{" "}
              <a href="/ussd-demo" className="font-semibold text-musika-blue underline">
                Farmer USSD
              </a>{" "}
              demo (option 2: list without match).
            </div>
          ) : (
            <ul className="space-y-3">
              {available.map((t) => {
                const c = getCrop(t.cropId);
                const label = productLabel(t);
                const isCustom = t.cropId === "custom" || (!c && !!t.productName);
                return (
                  <li
                    key={t.id}
                    className="rounded-2xl border border-musika-blue/10 bg-white p-4 shadow-sm flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-mono text-xs font-semibold text-musika-gold-dark">
                        {t.id}
                      </p>
                      <p className="font-display font-bold text-musika-blue">
                        {isCustom
                          ? label
                          : c
                            ? `${c.en} (${c.sn})`
                            : label}{" "}
                        × {t.qty}
                        {isCustom ? (
                          <span className="ml-2 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase text-violet-800">
                            Custom
                          </span>
                        ) : null}
                      </p>
                      <p className="text-sm text-slate-600">
                        {t.farmer} · {t.ward} · Grade {t.grade} · ask{" "}
                        {formatUsd(t.unitPrice)}
                        {c && c.id !== "custom" ? ` / ${c.unit}` : " / unit"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Total ask {formatUsd(t.totalUsd)}
                        {t.source === "ussd" ? " · from USSD" : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => acceptListing(t)}
                      className="rounded-full bg-musika-gold px-4 py-2 text-sm font-bold text-musika-blue-dark hover:bg-musika-gold-light"
                    >
                      Accept & escrow
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {myMatches.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-lg font-bold text-musika-blue mb-3">
                Your matched trades
              </h3>
              <ul className="space-y-2">
                {myMatches.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-xl bg-musika-cream px-4 py-3 text-sm flex flex-wrap justify-between gap-2"
                  >
                    <span>
                      <span className="font-mono font-semibold">{t.id}</span> —{" "}
                      {productLabel(t)} (grade {t.grade}) × {t.qty} · {t.ward}
                    </span>
                    <span className="font-semibold text-musika-blue">
                      {formatUsd(t.totalUsd)} · {t.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Post demand */}
        <section className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-musika-gold/40 bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-bold text-musika-blue">
              Post demand
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              RFQ for traders, school feeding, hotels & NGOs.
            </p>
            <form onSubmit={postDemand} className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="font-semibold text-slate-600">Product</span>
                <select
                  value={dCrop}
                  onChange={(e) => onCropChange(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-musika-blue/20 px-3 py-2"
                >
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.en} ({c.sn})
                    </option>
                  ))}
                  <option value="custom">Other…</option>
                </select>
              </label>
              {dCrop === "custom" && (
                <label className="block text-sm">
                  <span className="font-semibold text-slate-600">
                    Custom product name
                  </span>
                  <input
                    type="text"
                    value={dCustomName}
                    onChange={(e) => setDCustomName(e.target.value)}
                    placeholder="e.g. Sweet potato, onions…"
                    className="mt-1 w-full rounded-lg border border-musika-blue/20 px-3 py-2"
                    required
                    minLength={2}
                  />
                </label>
              )}
              <label className="block text-sm">
                <span className="font-semibold text-slate-600">Grade</span>
                <select
                  value={dGrade}
                  onChange={(e) => setDGrade(e.target.value as Grade)}
                  className="mt-1 w-full rounded-lg border border-musika-blue/20 px-3 py-2"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                      {g === "A" ? " (Good)" : g === "B" ? " (Fair)" : " (Poor)"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-slate-600">Quantity</span>
                <input
                  type="number"
                  min={1}
                  max={9999}
                  value={dQty}
                  onChange={(e) => setDQty(parseInt(e.target.value, 10) || 1)}
                  className="mt-1 w-full rounded-lg border border-musika-blue/20 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-slate-600">Collection ward</span>
                <select
                  value={dWard}
                  onChange={(e) => setDWard(e.target.value as Ward)}
                  className="mt-1 w-full rounded-lg border border-musika-blue/20 px-3 py-2"
                >
                  {WARDS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-slate-600">
                  Max unit price (USD)
                </span>
                <input
                  type="number"
                  step="0.01"
                  min={0.1}
                  value={dPrice}
                  onChange={(e) => setDPrice(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-musika-blue/20 px-3 py-2"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-musika-blue py-2.5 text-sm font-bold text-white hover:bg-musika-blue-light"
              >
                Post demand
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-musika-blue/10 bg-white p-5 shadow-sm">
            <h3 className="font-display font-bold text-musika-blue">
              Open demand board
            </h3>
            <ul className="mt-3 space-y-2">
              {openDemands.map((d) => {
                const label = productLabel(d);
                const isCustom = d.cropId === "custom";
                return (
                  <li
                    key={d.id}
                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm"
                  >
                    <span className="font-mono text-xs text-slate-500">
                      {d.id}
                    </span>
                    <p className="font-semibold text-musika-blue">
                      {label}
                      {isCustom ? " (custom)" : ""} · grade {d.grade} × {d.qty} ·{" "}
                      {d.ward}
                    </p>
                    <p className="text-xs text-slate-600">
                      {d.buyerName} · max {formatUsd(d.priceMax)}
                    </p>
                  </li>
                );
              })}
              {openDemands.length === 0 && (
                <li className="text-sm text-slate-500">No open demands.</li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

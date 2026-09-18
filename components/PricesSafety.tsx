"use client";

import { useMemo, useState } from "react";
import {
  PRESSURE_SAMPLES,
  VERIFIED_TILLS,
  VERIFIED_WARD_PRICES,
  WARDS,
  formatUsd,
  lookupVerifiedTill,
  type Ward,
} from "@/lib/data";
import { addChecklistOutcome, useMusikaStore } from "@/lib/store";

export function PricesSafety() {
  const { checklistOutcomes, ready } = useMusikaStore();
  const [ward, setWard] = useState<Ward>("Madziwa");
  const [tillInput, setTillInput] = useState("");
  const [selectedPressure, setSelectedPressure] = useState<string>("");
  const [lastResult, setLastResult] = useState<string | null>(null);

  const prices = useMemo(
    () => VERIFIED_WARD_PRICES.filter((r) => r.ward === ward),
    [ward]
  );

  const tillMatch = useMemo(() => {
    if (!tillInput.trim()) return null;
    return lookupVerifiedTill(tillInput) ?? false;
  }, [tillInput]);

  function runCheck(persist: boolean) {
    const match = lookupVerifiedTill(tillInput);
    const tillStatus: "verified" | "unknown" | "empty" = !tillInput.trim()
      ? "empty"
      : match
        ? "verified"
        : "unknown";
    const pressure = PRESSURE_SAMPLES.find((p) => p.id === selectedPressure);
    const pressureFlagged = Boolean(pressure);

    const parts: string[] = [];
    if (tillStatus === "empty") {
      parts.push("Enter a till / merchant number to check.");
    } else if (tillStatus === "verified" && match) {
      parts.push(
        `✓ Verified local till: ${match.label} (${match.network} · ${match.ward})`
      );
    } else {
      parts.push(
        "⚠ Unknown till — not on the verified buyer allowlist. Pause before you pay."
      );
    }
    if (pressure) {
      parts.push(`⚠ Pressure flag: ${pressure.flag}. ${pressure.tip}`);
    } else {
      parts.push("No urgency sample selected — still read the message carefully.");
    }
    parts.push(
      "Partner framing: EcoCash / OneMoney / Telecash — educational demo, not a live bank or MNO integration."
    );

    const summary = parts.join("\n");
    setLastResult(summary);

    if (persist) {
      addChecklistOutcome({
        id: `CK-${Date.now().toString().slice(-8)}`,
        at: new Date().toISOString(),
        tillInput: tillInput.trim(),
        tillStatus,
        matchedTillId: match?.id,
        pressureFlagged,
        pressureSampleId: pressure?.id,
        note: tillStatus === "verified" ? "ok" : "caution",
      });
    }
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-musika-blue">
              Verified local prices
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Ward-level indicative prices marked{" "}
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                verified local
              </span>
              . Demo data styled like an AGRITEX ward bulletin — not live market feeds.
            </p>
          </div>
          <label className="text-sm font-semibold text-musika-blue">
            Ward{" "}
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value as Ward)}
              className="ml-2 rounded-lg border border-musika-blue/20 bg-white px-3 py-2 font-semibold text-musika-blue"
            >
              {WARDS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-musika-blue/10 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-musika-cream text-musika-blue">
              <tr>
                <th className="px-4 py-3 font-bold">Product</th>
                <th className="px-4 py-3 font-bold">Unit</th>
                <th className="px-4 py-3 font-bold">Grade A</th>
                <th className="px-4 py-3 font-bold">Grade B</th>
                <th className="px-4 py-3 font-bold">Grade C</th>
                <th className="px-4 py-3 font-bold">As of</th>
                <th className="px-4 py-3 font-bold">Source</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((row) => (
                <tr
                  key={`${row.ward}-${row.cropId}`}
                  className="border-t border-musika-blue/5"
                >
                  <td className="px-4 py-3">
                    <span className="font-semibold text-musika-blue">
                      {row.productName}
                    </span>{" "}
                    <span className="ml-1 inline-flex rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                      verified local
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.unit}</td>
                  <td className="px-4 py-3 font-mono">{formatUsd(row.gradeA)}</td>
                  <td className="px-4 py-3 font-mono">{formatUsd(row.gradeB)}</td>
                  <td className="px-4 py-3 font-mono">{formatUsd(row.gradeC)}</td>
                  <td className="px-4 py-3 text-slate-500">{row.asOf}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {row.sourceLabel}
                  </td>
                </tr>
              ))}
              {prices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-slate-500">
                    No bulletin rows for this ward in the demo set.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-musika-gold/40 bg-musika-cream p-6">
        <h2 className="font-display text-xl font-bold text-musika-blue">
          Check before you pay
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Short checklist: compare a till / merchant number to a small allowlist of verified
          buyers, and spot urgency / pressure language. Framed for{" "}
          <strong>EcoCash / OneMoney / Telecash</strong> — educational demo only, not a real
          payment integration.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-musika-blue">
              Till / merchant number
              <input
                value={tillInput}
                onChange={(e) => setTillInput(e.target.value)}
                placeholder="e.g. 0772 100 201"
                className="mt-1 w-full rounded-lg border border-musika-blue/20 bg-white px-3 py-2 font-mono text-sm"
              />
            </label>
            {tillMatch === false && tillInput.trim() && (
              <p className="text-sm font-semibold text-amber-800">
                Unknown till — not on verified list
              </p>
            )}
            {tillMatch && typeof tillMatch === "object" && (
              <p className="text-sm font-semibold text-emerald-800">
                Match: {tillMatch.label} · {tillMatch.network}
              </p>
            )}

            <div>
              <p className="text-sm font-semibold text-musika-blue mb-2">
                Does the message sound like pressure?
              </p>
              <div className="space-y-2">
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="pressure"
                    checked={selectedPressure === ""}
                    onChange={() => setSelectedPressure("")}
                    className="mt-1"
                  />
                  <span>No urgency sample (or message looks calm)</span>
                </label>
                {PRESSURE_SAMPLES.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-start gap-2 rounded-lg bg-white/70 p-2 text-sm text-slate-700 ring-1 ring-musika-blue/10"
                  >
                    <input
                      type="radio"
                      name="pressure"
                      checked={selectedPressure === p.id}
                      onChange={() => setSelectedPressure(p.id)}
                      className="mt-1"
                    />
                    <span>
                      <span className="font-semibold text-amber-900">{p.flag}:</span>{" "}
                      “{p.text}”
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => runCheck(false)}
                className="rounded-full bg-musika-blue px-4 py-2 text-sm font-bold text-white hover:bg-musika-blue-light"
              >
                Run check
              </button>
              <button
                type="button"
                onClick={() => runCheck(true)}
                className="rounded-full bg-musika-gold px-4 py-2 text-sm font-bold text-musika-blue-dark hover:bg-musika-gold-light"
              >
                Run &amp; save outcome
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-white p-4 ring-1 ring-musika-blue/10">
              <h3 className="font-display font-bold text-musika-blue text-sm">
                Verified buyer tills (demo allowlist)
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                {VERIFIED_TILLS.map((t) => (
                  <li key={t.id} className="flex flex-wrap gap-x-2">
                    <span className="font-mono text-musika-blue">{t.number}</span>
                    <span>· {t.network}</span>
                    <span>· {t.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {lastResult && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 whitespace-pre-wrap">
                <strong>Checklist result</strong>
                {"\n"}
                {lastResult}
              </div>
            )}

            {ready && checklistOutcomes.length > 0 && (
              <div className="rounded-xl bg-white p-4 ring-1 ring-musika-blue/10">
                <h3 className="font-display font-bold text-musika-blue text-sm">
                  Saved outcomes (this browser)
                </h3>
                <ul className="mt-2 max-h-40 overflow-y-auto space-y-1 text-xs text-slate-600">
                  {checklistOutcomes.slice(0, 8).map((o) => (
                    <li key={o.id} className="font-mono">
                      {o.id} · {o.tillStatus}
                      {o.pressureFlagged ? " · pressure" : ""} ·{" "}
                      {o.tillInput || "(empty)"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

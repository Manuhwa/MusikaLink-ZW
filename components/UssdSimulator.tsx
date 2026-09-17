"use client";

import { useCallback, useMemo, useState } from "react";
import {
  BUYERS,
  CROPS,
  WARDS,
  cropName,
  cropUnit,
  formatUsd,
  midPrice,
  type Crop,
  type Lang,
  type Ward,
} from "@/lib/data";

type Step =
  | "idle"
  | "main"
  | "crop"
  | "qty"
  | "ward"
  | "prices"
  | "buyer"
  | "confirm"
  | "escrow"
  | "payment"
  | "done";

const copy = {
  en: {
    dialHint: "Dial *288# on a feature phone",
    start: "Dial *288#",
    reset: "End session",
    langToggle: "Shona",
    network: "Econet",
    ussdTitle: "MusikaLink ZW",
    welcome: "Welcome to MusikaLink ZW",
    main1: "1. List produce",
    main2: "2. Check my listings",
    main3: "3. Help",
    main0: "0. Exit",
    pickCrop: "Select crop:",
    enterQty: "Enter quantity",
    pickWard: "Pickup ward:",
    localPrices: "Local prices (recent trades)",
    mid: "Indicative mid",
    range: "Range",
    continue: "1. Continue to buyers",
    back: "0. Back",
    buyers: "Buyer matches near you:",
    accept: "Accept offer?",
    yes: "1. Accept & hold escrow",
    no: "2. Decline",
    escrowMsg: "Buyer paid into escrow.",
    deliver: "1. Confirm ready for pickup",
    paying: "Releasing to EcoCash…",
    paid: "PAYMENT CONFIRMED",
    ref: "Ref",
    thankYou: "Thank you. SMS receipt sent.",
    invalid: "Invalid option. Try again.",
    units: "units",
    grade: "Grade A assumed",
    total: "Est. total",
    agent: "Aggregation: Madziwa Hub",
  },
  sn: {
    dialHint: "Dhaira *288# pafoni",
    start: "Dhaira *288#",
    reset: "Pedza",
    langToggle: "English",
    network: "Econet",
    ussdTitle: "MusikaLink ZW",
    welcome: "Titambire kuMusikaLink ZW",
    main1: "1. Nyora zvirimwa",
    main2: "2. Tarisa zvandanyora",
    main3: "3. Rubatsiro",
    main0: "0. Buda",
    pickCrop: "Sarudza chirimwa:",
    enterQty: "Isa huwandu",
    pickWard: "Wodhi yekutora:",
    localPrices: "Mitengo yenzvimbo (kutengwa kuchangobva)",
    mid: "Mutengo wepakati",
    range: "Pakati",
    continue: "1. Enda kuvatengi",
    back: "0. Dzokera",
    buyers: "Vatengi vari pedyo:",
    accept: "Gamuchira?",
    yes: "1. Gamuchira & escrow",
    no: "2. Ramba",
    escrowMsg: "Mutengi abhadhara mu-escrow.",
    deliver: "1. Ndakagadzirira kutora",
    paying: "Kutumira kuEcoCash…",
    paid: "KUBHADHARA KWAKABUDIRIRA",
    ref: "Ref",
    thankYou: "Ndatenda. SMS yarehwa.",
    invalid: "Hazvina kukwana. Edza zvakare.",
    units: "zviyero",
    grade: "Giredhi A",
    total: "Mari yese",
    agent: "Aggregation: Madziwa Hub",
  },
} as const;

function ScreenLines({ lines }: { lines: string[] }) {
  return (
    <div className="font-mono text-[13px] leading-relaxed text-emerald-100 whitespace-pre-wrap min-h-[200px]">
      {lines.map((line, i) => (
        <div key={i}>{line || "\u00A0"}</div>
      ))}
    </div>
  );
}

export function UssdSimulator() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("idle");
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [qty, setQty] = useState(0);
  const [ward, setWard] = useState<Ward | null>(null);
  const [buyerIdx, setBuyerIdx] = useState(0);
  const [payRef, setPayRef] = useState("");

  const t = copy[lang];

  const matchedBuyers = useMemo(() => {
    if (!ward) return BUYERS.slice(0, 3);
    const primary = BUYERS.filter((b) => b.ward === ward);
    const rest = BUYERS.filter((b) => b.ward !== ward);
    return [...primary, ...rest].slice(0, 3);
  }, [ward]);

  const selectedBuyer = matchedBuyers[buyerIdx] ?? matchedBuyers[0];

  const offerPrice = useMemo(() => {
    if (!crop || !selectedBuyer) return 0;
    const mid = midPrice(crop);
    return Math.round(mid * (1 + selectedBuyer.offerPremium) * 100) / 100;
  }, [crop, selectedBuyer]);

  const total = useMemo(() => {
    return Math.round(offerPrice * qty * 100) / 100;
  }, [offerPrice, qty]);

  const reset = useCallback(() => {
    setStep("idle");
    setInput("");
    setFlash(null);
    setCrop(null);
    setQty(0);
    setWard(null);
    setBuyerIdx(0);
    setPayRef("");
  }, []);

  const lines = useMemo((): string[] => {
    if (flash) return [flash, "", t.back.replace("0. ", "Press any key · ")];

    switch (step) {
      case "idle":
        return [t.dialHint, "", "Press Dial to begin."];
      case "main":
        return [t.welcome, "", t.main1, t.main2, t.main3, t.main0];
      case "crop":
        return [
          t.pickCrop,
          "",
          ...CROPS.map((c, i) => `${i + 1}. ${cropName(c, lang)}`),
          t.back,
        ];
      case "qty":
        return [
          `${cropName(crop!, lang)}`,
          `${t.enterQty} (${cropUnit(crop!, lang)}):`,
          "",
          t.grade,
          t.back,
        ];
      case "ward":
        return [
          t.pickWard,
          "",
          ...WARDS.map((w, i) => `${i + 1}. ${w}`),
          t.back,
        ];
      case "prices": {
        const c = crop!;
        return [
          t.localPrices,
          `${ward}`,
          "",
          `${cropName(c, lang)} · ${cropUnit(c, lang)}`,
          `${t.mid}: ${formatUsd(midPrice(c))}`,
          `${t.range}: ${formatUsd(c.priceMin)}–${formatUsd(c.priceMax)}`,
          `Qty: ${qty}`,
          "",
          t.continue,
          t.back,
        ];
      }
      case "buyer": {
        const c = crop!;
        return [
          t.buyers,
          "",
          ...matchedBuyers.map((b, i) => {
            const p =
              Math.round(midPrice(c) * (1 + b.offerPremium) * 100) / 100;
            return `${i + 1}. ${b.name}`;
            // second line style via next entries
          }),
          "",
          ...matchedBuyers.map((b, i) => {
            const p =
              Math.round(midPrice(c) * (1 + b.offerPremium) * 100) / 100;
            const typ = lang === "sn" ? b.typeSn : b.type;
            return `   ${i + 1}: ${formatUsd(p)} · ${typ} · ${b.ward}`;
          }),
          "",
          t.back,
        ];
      }
      case "confirm": {
        const b = selectedBuyer!;
        const typ = lang === "sn" ? b.typeSn : b.type;
        return [
          t.accept,
          "",
          `${cropName(crop!, lang)} × ${qty}`,
          `${ward} → ${b.name}`,
          `${typ}`,
          `${formatUsd(offerPrice)} × ${qty} = ${formatUsd(total)}`,
          "",
          t.yes,
          t.no,
        ];
      }
      case "escrow":
        return [
          t.escrowMsg,
          `Hold: ${formatUsd(total)}`,
          t.agent,
          "",
          t.deliver,
          t.back,
        ];
      case "payment":
        return [t.paying, "", "…"];
      case "done":
        return [
          `✓ ${t.paid}`,
          `${t.ref}: ${payRef}`,
          `EcoCash → farmer`,
          `${formatUsd(total)}`,
          "",
          t.thankYou,
          "",
          "1. New listing",
          "0. Exit",
        ];
      default:
        return [];
    }
  }, [
    step,
    flash,
    t,
    lang,
    crop,
    qty,
    ward,
    matchedBuyers,
    selectedBuyer,
    offerPrice,
    total,
    payRef,
  ]);

  function showFlash(msg: string) {
    setFlash(msg);
    setTimeout(() => setFlash(null), 1400);
  }

  function submit(raw?: string) {
    const val = (raw ?? input).trim();
    setInput("");

    if (flash) {
      setFlash(null);
      return;
    }

    if (step === "idle") {
      setStep("main");
      return;
    }

    switch (step) {
      case "main":
        if (val === "1") setStep("crop");
        else if (val === "2") showFlash(lang === "sn" ? "Hapana listing ichiri." : "No active listings.");
        else if (val === "3")
          showFlash(
            lang === "sn"
              ? "Batsira: *288# · EcoCash escrow"
              : "Help: Dial *288# · EcoCash escrow"
          );
        else if (val === "0") reset();
        else showFlash(t.invalid);
        break;

      case "crop":
        if (val === "0") {
          setStep("main");
          break;
        }
        {
          const idx = parseInt(val, 10) - 1;
          if (idx >= 0 && idx < CROPS.length) {
            setCrop(CROPS[idx]);
            setStep("qty");
          } else showFlash(t.invalid);
        }
        break;

      case "qty":
        if (val === "0") {
          setStep("crop");
          break;
        }
        {
          const n = parseInt(val, 10);
          if (!Number.isNaN(n) && n > 0 && n <= 9999) {
            setQty(n);
            setStep("ward");
          } else showFlash(t.invalid);
        }
        break;

      case "ward":
        if (val === "0") {
          setStep("qty");
          break;
        }
        {
          const idx = parseInt(val, 10) - 1;
          if (idx >= 0 && idx < WARDS.length) {
            setWard(WARDS[idx]);
            setStep("prices");
          } else showFlash(t.invalid);
        }
        break;

      case "prices":
        if (val === "1") setStep("buyer");
        else if (val === "0") setStep("ward");
        else showFlash(t.invalid);
        break;

      case "buyer":
        if (val === "0") {
          setStep("prices");
          break;
        }
        {
          const idx = parseInt(val, 10) - 1;
          if (idx >= 0 && idx < matchedBuyers.length) {
            setBuyerIdx(idx);
            setStep("confirm");
          } else showFlash(t.invalid);
        }
        break;

      case "confirm":
        if (val === "1") setStep("escrow");
        else if (val === "2") setStep("buyer");
        else showFlash(t.invalid);
        break;

      case "escrow":
        if (val === "1") {
          setStep("payment");
          const ref = `EC${Date.now().toString().slice(-8)}`;
          setPayRef(ref);
          setTimeout(() => setStep("done"), 1200);
        } else if (val === "0") setStep("confirm");
        else showFlash(t.invalid);
        break;

      case "done":
        if (val === "1") {
          setCrop(null);
          setQty(0);
          setWard(null);
          setBuyerIdx(0);
          setPayRef("");
          setStep("crop");
        } else if (val === "0") reset();
        else showFlash(t.invalid);
        break;

      default:
        break;
    }
  }

  function softKey(digit: string) {
    if (step === "idle") {
      setStep("main");
      return;
    }
    setInput((prev) => (prev + digit).slice(0, 6));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Phone shell */}
      <div className="mx-auto w-full max-w-[320px] shrink-0">
        <div className="rounded-[2.25rem] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-700">
          <div className="rounded-[1.75rem] bg-slate-800 overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 text-[10px] text-slate-400 bg-black/40">
              <span>{t.network}</span>
              <span className="h-1.5 w-12 rounded-full bg-slate-600" />
              <span>4G · 72%</span>
            </div>

            {/* USSD screen */}
            <div className="bg-[#0a1f14] px-4 py-3 border-y border-emerald-900/50">
              <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 mb-2">
                {t.ussdTitle}
              </p>
              <ScreenLines lines={lines} />
            </div>

            {/* Input row */}
            <div className="bg-slate-900 px-3 py-2 flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
                placeholder={step === "idle" ? "*288#" : "Reply…"}
                className="flex-1 rounded-md bg-slate-800 px-3 py-2 font-mono text-sm text-emerald-200 placeholder:text-slate-500 outline-none ring-1 ring-slate-700 focus:ring-musika-gold"
                inputMode="numeric"
                disabled={step === "payment"}
              />
              <button
                type="button"
                onClick={() => submit()}
                disabled={step === "payment"}
                className="rounded-md bg-musika-gold px-3 py-2 text-xs font-bold text-musika-blue-dark hover:bg-musika-gold-light disabled:opacity-40"
              >
                OK
              </button>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-1.5 p-3 bg-slate-900">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
                (d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => softKey(d)}
                    className="rounded-lg bg-slate-800 py-3 font-mono text-lg text-white hover:bg-slate-700 active:bg-slate-600"
                  >
                    {d}
                  </button>
                )
              )}
            </div>

            <div className="flex gap-2 p-3 pt-0 bg-slate-900">
              <button
                type="button"
                onClick={() => {
                  if (step === "idle") setStep("main");
                  else submit(input || "1");
                }}
                className="flex-1 rounded-full bg-emerald-700 py-2 text-xs font-bold text-white hover:bg-emerald-600"
              >
                {step === "idle" ? t.start : "Send"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex-1 rounded-full bg-slate-700 py-2 text-xs font-bold text-slate-200 hover:bg-slate-600"
              >
                {t.reset}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="flex-1 w-full space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "sn" : "en"))}
            className="rounded-full bg-musika-blue px-4 py-2 text-sm font-bold text-white hover:bg-musika-blue-light"
          >
            {lang === "en" ? "English → Shona" : "Shona → English"}
          </button>
          <span className="text-sm text-slate-500">
            Language: <strong className="text-musika-blue">{lang === "en" ? "English" : "ChiShona"}</strong>
          </span>
        </div>

        <div className="rounded-2xl border border-musika-blue/10 bg-white p-5 shadow-sm">
          <h3 className="font-display font-bold text-musika-blue">Booth flow</h3>
          <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal list-inside">
            <li>Dial *288# (or tap Dial)</li>
            <li>1 → List produce → pick crop (Shona names available)</li>
            <li>Enter quantity → choose ward (Madziwa, Bindura, Mazowe, Guruve, Mtoko)</li>
            <li>Review local prices → pick a buyer match</li>
            <li>Accept → escrow held → confirm pickup → EcoCash confirmation</li>
          </ol>
        </div>

        {(crop || ward || qty > 0) && (
          <div className="rounded-2xl border border-musika-gold/40 bg-musika-cream p-5">
            <h3 className="font-display font-bold text-musika-blue">Session</h3>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <dt className="text-slate-500">Crop</dt>
              <dd className="font-semibold">{crop ? cropName(crop, lang) : "—"}</dd>
              <dt className="text-slate-500">Qty</dt>
              <dd className="font-semibold">{qty || "—"}</dd>
              <dt className="text-slate-500">Ward</dt>
              <dd className="font-semibold">{ward ?? "—"}</dd>
              <dt className="text-slate-500">Offer</dt>
              <dd className="font-semibold text-musika-blue">
                {offerPrice && qty ? formatUsd(total) : "—"}
              </dd>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

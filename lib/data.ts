export type Lang = "en" | "sn";

export const WARDS = [
  "Madziwa",
  "Bindura",
  "Mazowe",
  "Guruve",
  "Mtoko",
] as const;

export type Ward = (typeof WARDS)[number];

export type Crop = {
  id: string;
  en: string;
  sn: string;
  unit: string;
  unitSn: string;
  priceMin: number;
  priceMax: number;
  unitPrice: string;
};

export const CROPS: Crop[] = [
  {
    id: "maize",
    en: "Maize",
    sn: "Chibage",
    unit: "50kg bag",
    unitSn: "bhegi re50kg",
    priceMin: 8,
    priceMax: 11,
    unitPrice: "USD / 50kg bag",
  },
  {
    id: "groundnuts",
    en: "Groundnuts",
    sn: "Nzungu",
    unit: "bucket",
    unitSn: "bhaketi",
    priceMin: 12,
    priceMax: 16,
    unitPrice: "USD / bucket",
  },
  {
    id: "tomatoes",
    en: "Tomatoes",
    sn: "Matomatisi",
    unit: "crate",
    unitSn: "kireti",
    priceMin: 6,
    priceMax: 9,
    unitPrice: "USD / crate",
  },
  {
    id: "beans",
    en: "Beans",
    sn: "Nyemba",
    unit: "15kg bag",
    unitSn: "bhegi re15kg",
    priceMin: 14,
    priceMax: 18,
    unitPrice: "USD / 15kg bag",
  },
  {
    id: "cabbage",
    en: "Cabbage",
    sn: "Kabichi",
    unit: "head",
    unitSn: "musoro",
    priceMin: 0.4,
    priceMax: 0.7,
    unitPrice: "USD / head",
  },
];

export type Buyer = {
  id: string;
  name: string;
  type: string;
  typeSn: string;
  ward: Ward;
  offerPremium: number;
  wallet: string;
};

export const BUYERS: Buyer[] = [
  {
    id: "b1",
    name: "Bindura Millers Co-op",
    type: "Processor",
    typeSn: "Mugadziri",
    ward: "Bindura",
    offerPremium: 0.05,
    wallet: "EcoCash · 0772 100 201",
  },
  {
    id: "b2",
    name: "Madziwa School Feeding",
    type: "School feeding",
    typeSn: "Chikafu chechikoro",
    ward: "Madziwa",
    offerPremium: 0.02,
    wallet: "EcoCash · 0773 220 110",
  },
  {
    id: "b3",
    name: "Mazowe Fresh Traders",
    type: "Trader",
    typeSn: "Mutengesi",
    ward: "Mazowe",
    offerPremium: 0.08,
    wallet: "OneMoney · 0712 445 880",
  },
  {
    id: "b4",
    name: "Guruve Agro Dealers",
    type: "Buyer",
    typeSn: "Mutengi",
    ward: "Guruve",
    offerPremium: 0.03,
    wallet: "Telecash · 0733 991 040",
  },
  {
    id: "b5",
    name: "Mtoko Market Hub",
    type: "Aggregator",
    typeSn: "Muunganidzi",
    ward: "Mtoko",
    offerPremium: 0.06,
    wallet: "EcoCash · 0782 334 567",
  },
  {
    id: "b6",
    name: "Kariba Lakeside Hotel",
    type: "Hotel",
    typeSn: "Hotera",
    ward: "Mazowe",
    offerPremium: 0.1,
    wallet: "EcoCash · 0771 608 912",
  },
  {
    id: "b7",
    name: "Harare Relief NGO",
    type: "NGO",
    typeSn: "Sangano",
    ward: "Bindura",
    offerPremium: 0.04,
    wallet: "EcoCash · 0775 201 333",
  },
];

/** Ward agents — linked by ward assignment */
export const AGENTS = [
  {
    id: "a1",
    name: "Nyasha Chirume",
    hub: "Madziwa Hub",
    wards: ["Madziwa", "Bindura"] as Ward[],
    phone: "0772 880 441",
    wallet: "EcoCash · 0772 880 441",
  },
  {
    id: "a2",
    name: "Tafadzwa Ndlovu",
    hub: "Mazowe Aggregation",
    wards: ["Mazowe", "Guruve"] as Ward[],
    phone: "0783 112 209",
    wallet: "OneMoney · 0783 112 209",
  },
  {
    id: "a3",
    name: "Blessing Mutasa",
    hub: "Mtoko Desk",
    wards: ["Mtoko"] as Ward[],
    phone: "0715 443 778",
    wallet: "Telecash · 0715 443 778",
  },
] as const;

export type TradeStatus =
  | "listed"
  | "matched"
  | "escrow"
  | "in_transit"
  | "delivered"
  | "paid";

export type Grade = "A" | "B" | "C";

export const GRADES: Grade[] = ["A", "B", "C"];

export type Trade = {
  id: string;
  farmer: string;
  farmerPhone: string;
  /** Preset crop id, or "custom" when productName is free-text */
  cropId: string;
  /** Display name — preset crop EN name or farmer/buyer custom product */
  productName?: string;
  qty: number;
  ward: Ward;
  grade: Grade;
  buyerId: string | null;
  unitPrice: number;
  totalUsd: number;
  status: TradeStatus;
  listedAt: string;
  agentFeeUsd: number;
  source?: "seed" | "ussd" | "buyer";
};

export type DemandStatus = "open" | "matched" | "closed";

export type Demand = {
  id: string;
  buyerId: string;
  buyerName: string;
  /** Preset crop id, or "custom" when productName is free-text */
  cropId: string;
  /** Display name — preset crop EN name or buyer custom product */
  productName?: string;
  qty: number;
  ward: Ward;
  grade: Grade;
  priceMax: number;
  status: DemandStatus;
  createdAt: string;
  matchedTradeId?: string;
};

/** Seed trades for first-load demo */
export const SEED_TRADES: Trade[] = [
  {
    id: "ML-2401",
    farmer: "Tendai Moyo",
    farmerPhone: "0772 441 203",
    cropId: "maize",
    productName: "Maize",
    qty: 12,
    ward: "Madziwa",
    grade: "A",
    buyerId: "b1",
    unitPrice: 10.2,
    totalUsd: 122.4,
    status: "escrow",
    listedAt: "2026-09-15T08:12:00+02:00",
    agentFeeUsd: 1.8,
    source: "seed",
  },
  {
    id: "ML-2402",
    farmer: "Chipo Ncube",
    farmerPhone: "0783 992 110",
    cropId: "groundnuts",
    productName: "Groundnuts",
    qty: 8,
    ward: "Madziwa",
    grade: "A",
    buyerId: "b2",
    unitPrice: 14.5,
    totalUsd: 116,
    status: "in_transit",
    listedAt: "2026-09-15T10:40:00+02:00",
    agentFeeUsd: 1.7,
    source: "seed",
  },
  {
    id: "ML-2403",
    farmer: "Farai Dube",
    farmerPhone: "0712 334 889",
    cropId: "tomatoes",
    productName: "Tomatoes",
    qty: 20,
    ward: "Bindura",
    grade: "B",
    buyerId: "b3",
    unitPrice: 7.2,
    totalUsd: 144,
    status: "delivered",
    listedAt: "2026-09-14T14:05:00+02:00",
    agentFeeUsd: 2.1,
    source: "seed",
  },
  {
    id: "ML-2404",
    farmer: "Rudo Sibanda",
    farmerPhone: "0778 201 554",
    cropId: "beans",
    productName: "Beans",
    qty: 6,
    ward: "Mazowe",
    grade: "A",
    buyerId: "b3",
    unitPrice: 16,
    totalUsd: 96,
    status: "paid",
    listedAt: "2026-09-13T09:22:00+02:00",
    agentFeeUsd: 1.4,
    source: "seed",
  },
  {
    id: "ML-2405",
    farmer: "Tapiwa Chirwa",
    farmerPhone: "0734 667 021",
    cropId: "maize",
    productName: "Maize",
    qty: 25,
    ward: "Guruve",
    grade: "B",
    buyerId: null,
    unitPrice: 9.5,
    totalUsd: 237.5,
    status: "listed",
    listedAt: "2026-09-16T16:30:00+02:00",
    agentFeeUsd: 0,
    source: "seed",
  },
  {
    id: "ML-2406",
    farmer: "Nyaradzo Gumbo",
    farmerPhone: "0775 118 440",
    cropId: "cabbage",
    productName: "Cabbage",
    qty: 100,
    ward: "Mtoko",
    grade: "A",
    buyerId: "b5",
    unitPrice: 0.55,
    totalUsd: 55,
    status: "escrow",
    listedAt: "2026-09-16T11:15:00+02:00",
    agentFeeUsd: 0.8,
    source: "seed",
  },
];

export const SEED_DEMANDS: Demand[] = [
  {
    id: "DM-101",
    buyerId: "b2",
    buyerName: "Madziwa School Feeding",
    cropId: "maize",
    productName: "Maize",
    qty: 40,
    ward: "Madziwa",
    grade: "A",
    priceMax: 10.5,
    status: "open",
    createdAt: "2026-09-16T09:00:00+02:00",
  },
  {
    id: "DM-102",
    buyerId: "b6",
    buyerName: "Kariba Lakeside Hotel",
    cropId: "tomatoes",
    productName: "Tomatoes",
    qty: 30,
    ward: "Mazowe",
    grade: "A",
    priceMax: 8.5,
    status: "open",
    createdAt: "2026-09-16T12:30:00+02:00",
  },
  {
    id: "DM-103",
    buyerId: "b7",
    buyerName: "Harare Relief NGO",
    cropId: "beans",
    productName: "Beans",
    qty: 20,
    ward: "Bindura",
    grade: "B",
    priceMax: 17,
    status: "open",
    createdAt: "2026-09-17T08:15:00+02:00",
  },
];

export function cropName(crop: Crop, lang: Lang): string {
  return lang === "sn" ? crop.sn : crop.en;
}

export function cropUnit(crop: Crop, lang: Lang): string {
  return lang === "sn" ? crop.unitSn : crop.unit;
}

export function midPrice(crop: Crop): number {
  return Math.round(((crop.priceMin + crop.priceMax) / 2) * 100) / 100;
}

export function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function getCrop(id: string): Crop | undefined {
  return CROPS.find((c) => c.id === id);
}

/** Synthetic crop row for free-text / custom products */
export function makeCustomCrop(name: string): Crop {
  const trimmed = name.trim() || "Custom product";
  return {
    id: "custom",
    en: trimmed,
    sn: trimmed,
    unit: "unit",
    unitSn: "unit",
    priceMin: 5,
    priceMax: 12,
    unitPrice: "USD / unit",
  };
}

/** Resolve display name for a trade or demand (custom or preset). */
export function productLabel(
  item: { cropId: string; productName?: string },
  lang: Lang = "en"
): string {
  if (item.productName && item.productName.trim()) {
    return item.productName.trim();
  }
  const c = getCrop(item.cropId);
  if (c) return cropName(c, lang);
  return item.cropId;
}

/** Flexible product match by crop id or case-insensitive name. */
export function productsMatch(
  a: { cropId: string; productName?: string },
  b: { cropId: string; productName?: string }
): boolean {
  if (a.cropId && b.cropId && a.cropId === b.cropId && a.cropId !== "custom") {
    return true;
  }
  const nameA = productLabel(a, "en").toLowerCase().trim();
  const nameB = productLabel(b, "en").toLowerCase().trim();
  return nameA.length > 0 && nameA === nameB;
}

export function agentForWard(ward: Ward) {
  return AGENTS.find((a) => (a.wards as readonly string[]).includes(ward)) ?? AGENTS[0];
}

export function newTradeId(): string {
  return `ML-${Date.now().toString().slice(-6)}`;
}

export function newDemandId(): string {
  return `DM-${Date.now().toString().slice(-5)}`;
}

/** Demo ward bulletins — indicative “verified local” prices (Mashonaland Central). */
export type WardPriceRow = {
  ward: Ward;
  cropId: string;
  productName: string;
  unit: string;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  asOf: string;
  sourceLabel: string;
};

export const VERIFIED_WARD_PRICES: WardPriceRow[] = [
  {
    ward: "Madziwa",
    cropId: "maize",
    productName: "Maize",
    unit: "50kg bag",
    gradeA: 10.5,
    gradeB: 9.2,
    gradeC: 7.8,
    asOf: "2026-09-15",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Madziwa",
    cropId: "groundnuts",
    productName: "Groundnuts",
    unit: "bucket",
    gradeA: 15.0,
    gradeB: 13.5,
    gradeC: 11.0,
    asOf: "2026-09-15",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Bindura",
    cropId: "maize",
    productName: "Maize",
    unit: "50kg bag",
    gradeA: 10.8,
    gradeB: 9.5,
    gradeC: 8.0,
    asOf: "2026-09-16",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Bindura",
    cropId: "tomatoes",
    productName: "Tomatoes",
    unit: "crate",
    gradeA: 8.2,
    gradeB: 7.0,
    gradeC: 5.5,
    asOf: "2026-09-16",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Mazowe",
    cropId: "tomatoes",
    productName: "Tomatoes",
    unit: "crate",
    gradeA: 8.5,
    gradeB: 7.2,
    gradeC: 5.8,
    asOf: "2026-09-16",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Mazowe",
    cropId: "beans",
    productName: "Beans",
    unit: "15kg bag",
    gradeA: 16.5,
    gradeB: 15.0,
    gradeC: 13.0,
    asOf: "2026-09-16",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Guruve",
    cropId: "maize",
    productName: "Maize",
    unit: "50kg bag",
    gradeA: 9.8,
    gradeB: 8.8,
    gradeC: 7.5,
    asOf: "2026-09-14",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Guruve",
    cropId: "cabbage",
    productName: "Cabbage",
    unit: "head",
    gradeA: 0.6,
    gradeB: 0.5,
    gradeC: 0.35,
    asOf: "2026-09-14",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Mtoko",
    cropId: "cabbage",
    productName: "Cabbage",
    unit: "head",
    gradeA: 0.55,
    gradeB: 0.45,
    gradeC: 0.3,
    asOf: "2026-09-15",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
  {
    ward: "Mtoko",
    cropId: "groundnuts",
    productName: "Groundnuts",
    unit: "bucket",
    gradeA: 14.5,
    gradeB: 13.0,
    gradeC: 10.5,
    asOf: "2026-09-15",
    sourceLabel: "Demo · AGRITEX-style ward bulletin",
  },
];

export type VerifiedTill = {
  id: string;
  label: string;
  /** Digits only for matching (spaces stripped on check) */
  number: string;
  network: "EcoCash" | "OneMoney" | "Telecash";
  buyerName: string;
  ward: Ward;
};

/** Small allowlist of verified buyer tills — educational demo only. */
export const VERIFIED_TILLS: VerifiedTill[] = [
  {
    id: "t1",
    label: "Bindura Millers Co-op",
    number: "0772100201",
    network: "EcoCash",
    buyerName: "Bindura Millers Co-op",
    ward: "Bindura",
  },
  {
    id: "t2",
    label: "Madziwa School Feeding",
    number: "0773220110",
    network: "EcoCash",
    buyerName: "Madziwa School Feeding",
    ward: "Madziwa",
  },
  {
    id: "t3",
    label: "Mazowe Fresh Traders",
    number: "0712445880",
    network: "OneMoney",
    buyerName: "Mazowe Fresh Traders",
    ward: "Mazowe",
  },
  {
    id: "t4",
    label: "Guruve Agro Dealers",
    number: "0733991040",
    network: "Telecash",
    buyerName: "Guruve Agro Dealers",
    ward: "Guruve",
  },
  {
    id: "t5",
    label: "Mtoko Market Hub",
    number: "0782334567",
    network: "EcoCash",
    buyerName: "Mtoko Market Hub",
    ward: "Mtoko",
  },
];

/** Urgency / pressure language samples for “check before you pay” education. */
export const PRESSURE_SAMPLES = [
  {
    id: "p1",
    text: "Pay NOW or the price drops — only 10 minutes left!",
    flag: "Urgency pressure",
    tip: "Pause. Verified buyers do not force instant till payments without a written deal.",
  },
  {
    id: "p2",
    text: "Send to this new EcoCash number — our old till is broken today.",
    flag: "Unknown / switched till",
    tip: "Check the till against the MusikaLink verified list before you pay.",
  },
  {
    id: "p3",
    text: "Don't tell anyone — secret buyer deal, cash only to my personal phone.",
    flag: "Secrecy + personal wallet",
    tip: "Prefer recognised markets, ward hubs, and named buyer tills.",
  },
  {
    id: "p4",
    text: "Police / council will seize your stock unless you pay this fine till now.",
    flag: "Threat / fake authority",
    tip: "Official fees go through known channels — verify with your ward agent.",
  },
] as const;

export type ChecklistOutcome = {
  id: string;
  at: string;
  tillInput: string;
  tillStatus: "verified" | "unknown" | "empty";
  matchedTillId?: string;
  pressureFlagged: boolean;
  pressureSampleId?: string;
  note?: string;
};

export function normalizeTillDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function lookupVerifiedTill(raw: string): VerifiedTill | undefined {
  const digits = normalizeTillDigits(raw);
  if (digits.length < 7) return undefined;
  return VERIFIED_TILLS.find((t) => {
    const n = normalizeTillDigits(t.number);
    return n === digits || n.endsWith(digits) || digits.endsWith(n);
  });
}

/** Educational compliance tips for informal traders / farmers (ZW). */
export const COMPLIANCE_TIPS = [
  {
    id: "c1",
    title: "Keep a simple sale record",
    body: "Note date, product, grade, quantity, unit price, total, and buyer name/phone. A notebook or SMS to yourself counts.",
  },
  {
    id: "c2",
    title: "Use agreed weights and grades",
    body: "Agree the scale and Grade A/B/C (or local equivalent) before loading. Disputes drop when both sides see the same measure.",
  },
  {
    id: "c3",
    title: "Prefer recognised markets / ward hubs",
    body: "Sell at known markets or ward aggregation points when you can — clearer prices, witnesses, and safer payment trails.",
  },
  {
    id: "c4",
    title: "Keep proof of sale",
    body: "Keep the SMS receipt, till confirmation, or a signed note. Helps with follow-ups and shows you traded in good faith.",
  },
] as const;

export const COMPLIANCE_DISCLAIMER =
  "Educational guidance only — not legal advice. Local by-laws, market rules, and licensing requirements vary by council and ward. Check with your local authority or ward agent when unsure.";

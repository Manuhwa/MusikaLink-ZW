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

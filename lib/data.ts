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
  unitPrice: string; // USD per unit label
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
  offerPremium: number; // fraction above mid price
};

export const BUYERS: Buyer[] = [
  {
    id: "b1",
    name: "Bindura Millers Co-op",
    type: "Processor",
    typeSn: "Mugadziri",
    ward: "Bindura",
    offerPremium: 0.05,
  },
  {
    id: "b2",
    name: "Madziwa School Feeding",
    type: "Institution",
    typeSn: "Sangano",
    ward: "Madziwa",
    offerPremium: 0.02,
  },
  {
    id: "b3",
    name: "Mazowe Fresh Traders",
    type: "Trader",
    typeSn: "Mutengesi",
    ward: "Mazowe",
    offerPremium: 0.08,
  },
  {
    id: "b4",
    name: "Guruve Agro Dealers",
    type: "Buyer",
    typeSn: "Mutengi",
    ward: "Guruve",
    offerPremium: 0.03,
  },
  {
    id: "b5",
    name: "Mtoko Market Hub",
    type: "Aggregator",
    typeSn: "Muunganidzi",
    ward: "Mtoko",
    offerPremium: 0.06,
  },
];

export type TradeStatus =
  | "listed"
  | "matched"
  | "escrow"
  | "in_transit"
  | "delivered"
  | "paid";

export type Trade = {
  id: string;
  farmer: string;
  farmerPhone: string;
  cropId: string;
  qty: number;
  ward: Ward;
  grade: "A" | "B" | "C";
  buyerId: string | null;
  unitPrice: number;
  totalUsd: number;
  status: TradeStatus;
  listedAt: string;
  agentFeeUsd: number;
};

/** Seed trades for the agent dashboard demo */
export const SEED_TRADES: Trade[] = [
  {
    id: "ML-2401",
    farmer: "Tendai Moyo",
    farmerPhone: "0772 441 203",
    cropId: "maize",
    qty: 12,
    ward: "Madziwa",
    grade: "A",
    buyerId: "b1",
    unitPrice: 10.2,
    totalUsd: 122.4,
    status: "escrow",
    listedAt: "2026-09-15T08:12:00+02:00",
    agentFeeUsd: 1.8,
  },
  {
    id: "ML-2402",
    farmer: "Chipo Ncube",
    farmerPhone: "0783 992 110",
    cropId: "groundnuts",
    qty: 8,
    ward: "Madziwa",
    grade: "A",
    buyerId: "b2",
    unitPrice: 14.5,
    totalUsd: 116,
    status: "in_transit",
    listedAt: "2026-09-15T10:40:00+02:00",
    agentFeeUsd: 1.7,
  },
  {
    id: "ML-2403",
    farmer: "Farai Dube",
    farmerPhone: "0712 334 889",
    cropId: "tomatoes",
    qty: 20,
    ward: "Bindura",
    grade: "B",
    buyerId: "b3",
    unitPrice: 7.2,
    totalUsd: 144,
    status: "delivered",
    listedAt: "2026-09-14T14:05:00+02:00",
    agentFeeUsd: 2.1,
  },
  {
    id: "ML-2404",
    farmer: "Rudo Sibanda",
    farmerPhone: "0778 201 554",
    cropId: "beans",
    qty: 6,
    ward: "Mazowe",
    grade: "A",
    buyerId: "b3",
    unitPrice: 16,
    totalUsd: 96,
    status: "paid",
    listedAt: "2026-09-13T09:22:00+02:00",
    agentFeeUsd: 1.4,
  },
  {
    id: "ML-2405",
    farmer: "Tapiwa Chirwa",
    farmerPhone: "0734 667 021",
    cropId: "maize",
    qty: 25,
    ward: "Guruve",
    grade: "B",
    buyerId: null,
    unitPrice: 9.5,
    totalUsd: 237.5,
    status: "listed",
    listedAt: "2026-09-16T16:30:00+02:00",
    agentFeeUsd: 0,
  },
  {
    id: "ML-2406",
    farmer: "Nyaradzo Gumbo",
    farmerPhone: "0775 118 440",
    cropId: "cabbage",
    qty: 100,
    ward: "Mtoko",
    grade: "A",
    buyerId: "b5",
    unitPrice: 0.55,
    totalUsd: 55,
    status: "escrow",
    listedAt: "2026-09-16T11:15:00+02:00",
    agentFeeUsd: 0.8,
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

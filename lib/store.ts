"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SEED_DEMANDS,
  SEED_TRADES,
  type Demand,
  type Trade,
  type TradeStatus,
} from "@/lib/data";

export const STORAGE_KEY = "musikalink-zw-v2";
export const UPDATE_EVENT = "musikalink-updated";

export type MusikaStore = {
  version: 2;
  trades: Trade[];
  demands: Demand[];
};

function seedStore(): MusikaStore {
  return {
    version: 2,
    trades: SEED_TRADES.map((t) => ({ ...t })),
    demands: SEED_DEMANDS.map((d) => ({ ...d })),
  };
}

function readStore(): MusikaStore {
  if (typeof window === "undefined") return seedStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedStore();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as MusikaStore;
    if (!parsed || !Array.isArray(parsed.trades) || !Array.isArray(parsed.demands)) {
      const seeded = seedStore();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return parsed;
  } catch {
    const seeded = seedStore();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    } catch {
      /* ignore quota */
    }
    return seeded;
  }
}

function writeStore(next: MusikaStore): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: next }));
}

export function getStoreSnapshot(): MusikaStore {
  return readStore();
}

export function upsertTrade(trade: Trade): MusikaStore {
  const current = readStore();
  const idx = current.trades.findIndex((t) => t.id === trade.id);
  const trades =
    idx >= 0
      ? current.trades.map((t, i) => (i === idx ? trade : t))
      : [trade, ...current.trades];
  const next = { ...current, trades };
  writeStore(next);
  return next;
}

export function patchTrade(
  id: string,
  patch: Partial<Trade>
): MusikaStore | null {
  const current = readStore();
  const idx = current.trades.findIndex((t) => t.id === id);
  if (idx < 0) return null;
  const trades = current.trades.map((t, i) =>
    i === idx ? { ...t, ...patch } : t
  );
  const next = { ...current, trades };
  writeStore(next);
  return next;
}

export function addDemand(demand: Demand): MusikaStore {
  const current = readStore();
  const next = { ...current, demands: [demand, ...current.demands] };
  writeStore(next);
  return next;
}

export function patchDemand(
  id: string,
  patch: Partial<Demand>
): MusikaStore | null {
  const current = readStore();
  const idx = current.demands.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  const demands = current.demands.map((d, i) =>
    i === idx ? { ...d, ...patch } : d
  );
  const next = { ...current, demands };
  writeStore(next);
  return next;
}

export function matchListingToBuyer(
  tradeId: string,
  buyerId: string,
  unitPrice?: number
): MusikaStore | null {
  const current = readStore();
  const trade = current.trades.find((t) => t.id === tradeId);
  if (!trade || (trade.status !== "listed" && trade.status !== "matched")) {
    return null;
  }
  const price = unitPrice ?? trade.unitPrice;
  const totalUsd = Math.round(price * trade.qty * 100) / 100;
  const agentFeeUsd = Math.round(totalUsd * 0.015 * 100) / 100;
  return patchTrade(tradeId, {
    buyerId,
    unitPrice: price,
    totalUsd,
    agentFeeUsd,
    status: "escrow" as TradeStatus,
  });
}

export function resetStore(): MusikaStore {
  const seeded = seedStore();
  writeStore(seeded);
  return seeded;
}

/**
 * React hook: shared browser store via localStorage.
 * Syncs across tabs (storage event) and same-tab (musikalink-updated).
 */
export function useMusikaStore() {
  const [store, setStore] = useState<MusikaStore>(() => seedStore());
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setStore(readStore());
  }, []);

  useEffect(() => {
    setStore(readStore());
    setReady(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        setStore(readStore());
      }
    };

    const onCustom = () => {
      setStore(readStore());
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(UPDATE_EVENT, onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(UPDATE_EVENT, onCustom as EventListener);
    };
  }, []);

  return {
    trades: store.trades,
    demands: store.demands,
    ready,
    refresh,
    upsertTrade,
    patchTrade,
    addDemand,
    patchDemand,
    matchListingToBuyer,
    resetStore,
  };
}

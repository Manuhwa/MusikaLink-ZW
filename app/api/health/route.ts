import { NextResponse } from "next/server";

/** Thin health check — no DB, no secrets required. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "musikalink-zw",
    mode: "demo",
    store: "browser-localStorage:musikalink-zw-v1",
    timestamp: new Date().toISOString(),
  });
}

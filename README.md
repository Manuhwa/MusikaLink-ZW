# MusikaLink ZW

USSD-first farm-to-market marketplace demo for **POTRAZ Innovation EXPO 2026** (Zimbabwe).

Smallholders list produce on feature phones (`*288#`), see local prices, match verified buyers, and get paid via mobile-money escrow — with ward aggregation agents to batch loads.

## Quick start

```bash
cd musikalink-zw
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Routes

| Path | What it shows |
|------|----------------|
| `/` | Landing — problem / solution / booth CTAs |
| `/ussd-demo` | Interactive feature-phone USSD simulator (EN ↔ Shona) |
| `/agent-dashboard` | Aggregation agent: trades, mark delivered, release escrow |

## Booth demo (2–3 min)

1. Open **USSD Demo** → Dial `*288#` → `1` List produce.
2. Pick a crop (Shona names on toggle) → enter qty → ward (e.g. Madziwa).
3. Review local prices → choose a buyer → Accept → confirm pickup → EcoCash confirmation.
4. Switch to **Agent Dashboard** → filter **In escrow** / **In transit** → **Mark delivered** → **Release escrow**.

Optional: see `DEMO_SCRIPT.md` / `QUICKSTART.md`.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Package name: `musikalink-zw`

## Notes

- Demo / prototype only — no live USSD gateway or real EcoCash.
- Pilot geography in the storyboard: Madziwa & nearby wards (Mashonaland Central).

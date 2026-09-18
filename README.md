# MusikaLink ZW

USSD-first farm-to-market marketplace demo for **POTRAZ Innovation EXPO 2026** (Zimbabwe).

Smallholders list produce on feature phones (`*288#`), see local prices, match verified buyers, and get paid via mobile-money escrow — with ward aggregation agents to batch loads.

## Live demo

- **GitHub Pages (permanent, free):** https://manuhwa.github.io/MusikaLink-ZW/
- **Source:** https://github.com/Manuhwa/MusikaLink-ZW

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

## Deploy to Vercel (free)

No paid services or API keys required. The demo stores all marketplace data in the browser (`localStorage` key `musikalink-zw-v1`).

1. Push this repo to GitHub (or import the folder in the Vercel dashboard).
2. In [vercel.com](https://vercel.com): **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Leave Environment Variables empty.
4. Deploy. Optional health check: `GET /api/health`.

Cross-role sync works on the **same browser** (and across tabs via `storage` + `musikalink-updated` events). That is intentional for a zero-cost Expo booth demo.

## Routes

| Path | Role | What it shows |
|------|------|----------------|
| `/` | — | Landing — problem / solution / CTAs |
| `/ussd-demo` | Farmer | Interactive feature-phone USSD (EN ↔ Shona); listings persist to shared store |
| `/agent-dashboard` | Agent | Live alerts, ward/status filters, mark delivered, release escrow |
| `/buyer` | Buyer | Browse lots, post demand, accept/match into escrow |
| `/how-it-works` | — | Agent linkage: farmer → ward → agent → delivery → escrow release |
| `/api/health` | — | JSON health check (no secrets) |

Nav: **Home | Farmer USSD | Agent | Buyer | How it works**.

## Shared data store

- Key: `musikalink-zw-v1`
- Seeded with sample trades & demands on first load
- USSD “list without match” or “accept & escrow” writes a trade
- Agent and Buyer subscribe to `storage` and custom `musikalink-updated` events

## Booth demo (2–3 min)

See `DEMO_SCRIPT.md` / `QUICKSTART.md`.

1. Open **Farmer USSD** → Dial `*288#` → register → list produce.
2. At prices: **2 List without match** (or pick a buyer → Accept).
3. Open **Agent** (same browser / second tab) → live alert banner → Mark delivered → Release escrow.
4. Open **Buyer** → browse available lots or post demand → Accept & escrow.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Package name: `musikalink-zw`
- No Redis, Postgres, or env secrets for the demo

## Notes

- Demo / prototype only — no live USSD gateway or real EcoCash.
- Pilot geography: Madziwa, Bindura, Mazowe, Guruve, Mtoko (Mashonaland Central storyline).

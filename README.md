# MusikaLink ZW

USSD-first farm-to-market marketplace demo for **POTRAZ Innovation EXPO 2026** (Zimbabwe).

Smallholders list produce on feature phones (`*288#`), see **verified local** ward prices, **check before you pay** (EcoCash / OneMoney / Telecash educational till check), follow **informal-trader compliance** tips, match verified buyers, and get paid via mobile-money escrow — with ward aggregation agents to batch loads.

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

No paid services or API keys required. The demo stores all marketplace data in the browser (`localStorage` key `musikalink-zw-v2`).

1. Push this repo to GitHub (or import the folder in the Vercel dashboard).
2. In [vercel.com](https://vercel.com): **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Leave Environment Variables empty.
4. Deploy. Optional health check: `GET /api/health`.

Cross-role sync works on the **same browser** (and across tabs via `storage` + `musikalink-updated` events). That is intentional for a zero-cost Expo booth demo.

## Routes

| Path | Role | What it shows |
|------|------|----------------|
| `/` | — | Landing — problem / solution / CTAs |
| `/ussd-demo` | Farmer | Interactive feature-phone USSD (EN ↔ Shona); option **5** = Prices & pay safety |
| `/agent-dashboard` | Agent | Live alerts, ward/status filters, mark delivered, release escrow |
| `/buyer` | Buyer | Browse lots, post demand, accept/match into escrow |
| `/prices` (also `/safety`) | Farmer | Verified local ward prices + check-before-you-pay checklist |
| `/compliance` | Trader / farmer | Informal procurement good practice (educational; not legal advice) |
| `/how-it-works` | — | Agent linkage: farmer → ward → agent → delivery → escrow release |
| `/api/health` | — | JSON health check (no secrets) |

Nav: **Home | Farmer USSD | Agent | Buyer | Prices & Safety | Compliance | How it works**.

## Shared data store

- Key: `musikalink-zw-v2`
- Seeded with sample trades & demands on first load
- Optional `checklistOutcomes` from USSD / web till checks
- USSD “list without match” or “accept & escrow” writes a trade
- Agent and Buyer subscribe to `storage` and custom `musikalink-updated` events

## Booth demo (2–3 min)

See `DEMO_SCRIPT.md` / `QUICKSTART.md`.

1. Open **Farmer USSD** → Dial `*288#` → register → list produce.
2. At prices: **2 List without match** (or pick a buyer → Accept).
3. Optionally **5 Prices & pay safety** → view prices → check till → tip.
4. Open **Agent** (same browser / second tab) → live alert → Mark delivered → Release escrow.
5. Open **Buyer** → browse lots or post demand; peek **Prices & Safety** / **Compliance**.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Package name: `musikalink-zw`
- No Redis, Postgres, or env secrets for the demo

## Notes

- Demo / prototype only — no live USSD gateway or real EcoCash / OneMoney / Telecash integration.
- Compliance content is educational guidance, not legal advice; local by-laws vary.
- Pilot geography: Madziwa, Bindura, Mazowe, Guruve, Mtoko (Mashonaland Central storyline).

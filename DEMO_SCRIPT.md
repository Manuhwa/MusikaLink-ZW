# MusikaLink ZW — Booth demo script (~3 minutes)

## Setup

- Browser on `/` (landing), then keep tabs for `/ussd-demo`, `/agent-dashboard`, and `/buyer` **in the same browser** (shared `localStorage`).
- Prefer a tablet or laptop with the phone mock visible.

## Script

**0:00 — Hook (landing)**  
“Most smallholders still sell at the farm gate — no prices, no trusted buyers, slow payment. MusikaLink works on the phones they already have.”

**0:25 — How it works (optional)**  
One sentence: farmer lists → ward assignment links an agent → buyer escrow → delivery → EcoCash release. Point at `/how-it-works` if judges want depth.

**0:40 — USSD**  
Dial `*288#` → register (1 / 1) → List produce → maize / *chibage* → quantity (e.g. 10) → **Madziwa** ward.  
Show indicative local price band. Either:
- **2 List without match** — agent gets a live alert immediately, or  
- pick **Bindura Millers** / school feeding → Accept → escrow held.

Toggle **Shona** once so judges see ChiShona menus.

**2:00 — Agent**  
Open Agent Dashboard (Madziwa Hub). Point at the amber **live alert** (“New listing: … — Madziwa”).  
Filter by ward/status. **Mark delivered** on an escrow/in-transit lot → **Release escrow** → toast shows EcoCash to farmer phone.  
Explain: agent is linked by **ward assignment**, not random broadcast.

**2:30 — Buyer (optional 30s)**  
Buyer portal → switch to School Feeding / Hotel / NGO → Accept an open lot or post demand.

**2:50 — Close**  
“Inclusive USSD spine, escrow trust, village aggregation — scalable district by district, funded by tiny trade fees. Deploys on free Vercel with no paid database.”

## Fallback if Wi‑Fi fails

Run `npm run build && npm start` beforehand; demo offline on localhost.

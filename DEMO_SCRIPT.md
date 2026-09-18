# MusikaLink ZW — Booth demo script (~3 minutes)

## Setup

- Browser on `/` (landing), then keep tabs for `/ussd-demo`, `/agent-dashboard`, `/buyer`, and optionally `/prices` **in the same browser** (shared `localStorage`).
- Prefer a tablet or laptop with the phone mock visible.

## Script

**0:00 — Hook (landing)**  
“Most smallholders still sell at the farm gate — no prices, no trusted buyers, slow payment. MusikaLink works on the phones they already have — plus verified local prices and a check-before-you-pay till check.”

**0:25 — How it works (optional)**  
One sentence: farmer lists → ward assignment links an agent → buyer escrow → delivery → EcoCash release. Point at `/how-it-works` if judges want depth. Mention `/compliance` for informal-trader good practice (records, grades, proof of sale — educational only).

**0:40 — USSD**  
Dial `*288#` → register (1 / 1) → List produce → maize / *chibage* → quantity (e.g. 10) → **Madziwa** ward.  
Show indicative local price band. Either:
- **2 List without match** — agent gets a live alert immediately, or  
- pick **Bindura Millers** / school feeding → Accept → escrow held.

Optional 20s: main menu **5 Prices & pay safety** → view verified prices → check a till (1 = verified, 2 = unknown) → safety tip.

Toggle **Shona** once so judges see ChiShona menus. Point out **CLR** / letter keypad when typing a custom product.

**2:00 — Agent**  
Open Agent Dashboard (Madziwa Hub). Point at the amber **live alert** (“New listing: … — Madziwa”).  
Filter by ward/status. **Mark delivered** on an escrow/in-transit lot → **Release escrow** → toast shows EcoCash to farmer phone.  
Explain: agent is linked by **ward assignment**, not random broadcast.

**2:30 — Buyer / Prices (optional 30s)**  
Buyer portal → switch to School Feeding / Hotel / NGO → Accept an open lot or post demand.  
Or open **Prices & Safety** → show ward bulletin + unknown till flag.

**2:50 — Close**  
“Inclusive USSD spine, escrow trust, village aggregation, pay-safety and compliance literacy — scalable district by district. Deploys on free hosting with no paid database.”

## Fallback if Wi‑Fi fails

Run `npm run build && npm start` beforehand; demo offline on localhost.

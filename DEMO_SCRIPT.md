# MusikaLink ZW — Booth demo script (~3 minutes)

## Setup

- Browser on `/` (landing), then keep tabs for `/ussd-demo` and `/agent-dashboard`.
- Prefer a tablet or laptop with the phone mock visible.

## Script

**0:00 — Hook (landing)**  
“Most smallholders still sell at the farm gate — no prices, no trusted buyers, slow payment. MusikaLink works on the phones they already have.”

**0:30 — USSD**  
Dial `*288#` → List produce → maize / *chibage* → quantity → **Madziwa** ward.  
Show indicative local price band → pick **Bindura Millers** or school feeding → Accept.  
Escrow held → confirm ready for pickup → EcoCash confirmation + ref.

**Toggle Shona** once so judges see ChiShona menus.

**2:00 — Agent**  
Open Agent Dashboard (Madziwa Hub). Point at escrow held value.  
**Mark delivered** on an escrow/in-transit lot → **Release escrow** → toast shows EcoCash to farmer phone.

**2:45 — Close**  
“Inclusive USSD spine, escrow trust, village aggregation — scalable district by district, funded by tiny trade fees.”

## Fallback if Wi‑Fi fails

Run `npm run build && npm start` beforehand; demo offline on localhost.

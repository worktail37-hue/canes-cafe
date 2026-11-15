# Cane's Café — Specialty Coffee & Fresh Bakery

A full-stack café website for **Cane's Café**: a single-origin coffee roastery and fresh-bakery storefront with an online order flow, table reservations, and an owner-only admin dashboard. The AI features (barista chatbot, menu read-aloud, ambient music, image-to-video) are powered by Google Gemini and run **server-side only**.

---

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | GSAP, Motion |
| Icons | lucide-react |
| Maps | Leaflet |
| Backend | Express 4 (TypeScript, run via `tsx`) |
| AI | `@google/genai` — Gemini chat with Search/Maps grounding, Lyria music, Gemini TTS, Veo video |
| Auth / DB | Firebase Auth + Firestore (client), JSON file store (server) |
| Notifications | WhatsApp Cloud API / Twilio / generic webhook (all optional) |

---

## Features

**Customer-facing**
- Hero, marquee, featured categories, roastery spotlight, coffee origins, full menu explorer
- Cart drawer + checkout modal (pay-at-counter or online)
- Table reservation form and enquiry form
- Coffee Vibe Matcher and a grounded **barista chatbot** (Gemini + Google Search / Maps citations)
- Menu read-aloud (Gemini TTS) and generated café ambience (Lyria)
- Gallery, reviews, FAQ, visit-us block with hours and map, newsletter signup
- SEO: per-route head manager, JSON-LD `Restaurant`/`CafeOrCoffeeShop`/`Bakery` schema, sitemap, robots, web manifest

**Owner-only (`/owner`, `/admin`)**
- Dashboard over orders, reservations, enquiries and subscribers
- Firebase Auth sign-in restricted to the owner email, verified **server-side** against Google Identity Toolkit
- WhatsApp alert dispatch + test button, AI usage counters with a daily cap and circuit breaker
- Data-retention purge

---

## Getting started

**Requirements:** Node.js 20+ (or Bun — a `bun.lock` is included).

```bash
npm install
cp .env.example .env.local     # then fill in the values below
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production bundle into dist/
npm run preview  # preview the built bundle
npm run lint     # tsc --noEmit
npm start        # run the Express server (serves dist/ when NODE_ENV=production)
```

---

## Environment variables

Copy `.env.example` to `.env.local`. Nothing is required to *view* the site; the AI endpoints and WhatsApp alerts need keys.

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | For AI features | Chat, TTS, Lyria music, Veo video |
| `APP_URL` | Optional | Public base URL of the deployment |
| `AUTHORIZED_OWNER_EMAIL` | Recommended | Email allowed into the admin area (defaults to the one baked into `server.ts`) |
| `FIREBASE_API_KEY` | Optional | Overrides the key read from `firebase-applet-config.json` |
| `ADMIN_WHATSAPP_PHONE` | Optional | Owner number for enquiry alerts (E.164) |
| `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` | Optional | Meta WhatsApp Cloud API |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER` | Optional | Twilio WhatsApp alternative |
| `WHATSAPP_WEBHOOK_URL` | Optional | Make / Zapier / n8n webhook alternative |

> **Never** put `GEMINI_API_KEY` in a `VITE_`-prefixed variable — that would ship it to the browser. All Gemini calls are made from `server.ts`.

---

## Project structure

```
api/index.ts            Vercel serverless entry — re-exports the Express app
server.ts               Express API + Gemini endpoints + owner auth + JSON store
src/
  components/           UI sections (Hero, Menu, Cart, Admin, Chatbot, …)
  components/ui/        shadcn-style primitives
  context/              Auth, Cart, Search, Theme providers
  config/seoConfig.ts   Canonical URL, business schema, social links
  lib/firebase.ts       Firebase client init
public/                 Static assets, robots.txt, sitemap.xml, manifest
firestore.rules         Security rules for the Firestore database
firebase-blueprint.json Schema description of the Firestore collections
data/                   JSON store for orders/reservations/enquiries (git-ignored contents)
```

---

## API

| Method & path | Auth | Purpose |
| --- | --- | --- |
| `GET /api/health` | – | Liveness probe |
| `POST /api/gemini/chat` | – | Barista chatbot with Search/Maps grounding |
| `POST /api/tts` | – | Menu read-aloud |
| `POST /api/gemini/generate-music` | – | Lyria ambience |
| `POST /api/generate-video`, `/api/video-status`, `/api/video-download` | – | Veo image-to-video |
| `POST /api/orders`, `POST /api/reservations`, `POST /api/enquiries` | – | Public submissions (rate-limited) |
| `GET/PUT /api/store-info` | – | Store details |
| `GET /api/admin/*`, `POST /api/admin/*`, `DELETE /api/admin/*` | Bearer Firebase ID token, owner only | Dashboard operations |

---

## Deployment (Vercel)

The repo ships with `vercel.json` and `api/index.ts`:

- `npm run build` produces the static bundle in `dist/`
- `api/index.ts` mounts the Express app so every `/api/*` route runs as a serverless function
- All non-API routes rewrite to `index.html` for client-side routing

Set `GEMINI_API_KEY` (and any WhatsApp variables) under **Project → Settings → Environment Variables**, then deploy. Nothing else is needed.

**Note on storage:** the bundled JSON store writes to the local filesystem, which is read-only on serverless. Orders, reservations and enquiries written by `server.ts` will not persist on Vercel — connect Firestore (already wired client-side) or a hosted database before taking real orders. Static content, the menu, and all AI endpoints work as-is.

---

## Security notes

- No API keys are committed. `firebase-applet-config.json` holds the Firebase **web** config, which is public by design; access is controlled by `firestore.rules` and Firebase Auth.
- Owner authorization is enforced on the server: the Firebase ID token is verified with Google, `email_verified` must be true, and the email must match the owner account.
- Admin routes are behind bearer-token middleware; rate limiting is applied to public submissions; PII is masked in logs.
- `.env*` files are git-ignored (`!.env.example` is kept).

---

## License

Private project. All rights reserved.

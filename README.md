# RK Farmstay — Karjat

A premium, cinematic brochure + booking-enquiry website for **RK Farmstay**,
a private farmstay in Urja · Bhoirwadi, Karjat (Raigad, Maharashtra 410201).

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Lucide icons**. Fully static prerender, responsive desktop + mobile
designs, accessible lightbox gallery, WhatsApp booking-enquiry flow.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production check (tsc + eslint + static prerender)
npm start
```

## Project layout

| Path | What lives there |
| --- | --- |
| `app/` | Routes (`/`, `/privacy`, `/api/reviews`, sitemap, robots, 404) |
| `components/` | Section + UI components (hero, intro, gallery, booking, …) |
| `lib/site.ts` | **Central business settings** — phone numbers, links, address, Google rating snapshot |
| `lib/images.ts` | Typed image manifest (all photography referenced from here) |
| `public/images/farmstay/` | Property photographs + hero, optimized WebP |
| `public/videos/` · `public/audio/` | Reserved for owner-supplied intro video / ambience audio |
| `qa/` | Playwright verification scripts (screenshots excluded from git) |

## Key flows

- **Booking enquiry** → validated form opens WhatsApp (`wa.me`) with the
  enquiry pre-typed to the preferred booking number in `lib/site.ts`.
- **Reviews** → `GET /api/reviews` serves live Google data when
  `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` are set, otherwise falls back
  to the owner-supplied snapshot. No secrets ever reach the client.

## Contact

- Booking/WhatsApp: +91 77758 07655 · Call: +91 82373 92121
- Instagram: https://www.instagram.com/rk_farmstay_karjat/

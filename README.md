# Dr. Stacy A.S. Williams, PhD — Website Redesign

A modernized, multilingual portfolio site for **Dr. Stacy A.S. Williams**, Associate Professor of Psychology at Marist University. Built as a Next.js/Vercel demonstration and migration proposal from the existing Weebly site at [stacywilliamsphd.com](https://www.stacywilliamsphd.com).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router, static export) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + shadcn/ui design tokens |
| i18n | [next-intl](https://next-intl-docs.vercel.app) — English, French, Spanish, Italian |
| Animation | [Framer Motion](https://www.framer-motion.com) |
| Contact form | [Resend](https://resend.com) (email delivery) + [Google reCAPTCHA](https://www.google.com/recaptcha/about/) (spam protection) |
| UI components | shadcn/ui pattern (`src/components/ui/`) |
| Deployment | [Vercel](https://vercel.com) |
| Node | 22.22.2 (see `.nvmrc`) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/en` | Home — animated hero, credentials, expertise, CTA |
| `/en/teaching` | Courses at Marist University and University at Albany |
| `/en/scholarship` | Publications, book chapters, presentations, position statements |
| `/en/consulting` | Training topics, client list, consulting approach |
| `/en/service` | Professional service — TSP, NYASP, NASP roles |
| `/en/photography` | Photography gallery overview |
| `/en/photography/ai-enhanced-art` | Full gallery of AI-enhanced artwork (39 images) |
| `/en/poems` | Poems of the Heart — three collections linking to Google Drive |
| `/en/contact` | Contact form with Google reCAPTCHA + office info |

All pages are statically pre-rendered in 4 locales: `en`, `fr`, `es`, `it` (40 total routes).

---

## Project Structure

```
swphd-upgrade-cc/
├── messages/                  # i18n translation files
│   ├── en.json
│   ├── fr.json
│   ├── es.json
│   └── it.json
├── public/
│   ├── SASWPHD_20250906.jpeg  # Hero photo
│   ├── chatgpt-image-sep-6-2025-10-33-53-pm_orig.png
│   └── ai-enhanced-art/       # 39 AI-enhanced images + gallery.json manifest
├── src/
│   ├── app/
│   │   ├── [locale]/          # All locale-aware pages
│   │   │   ├── page.tsx       # Home
│   │   │   ├── teaching/
│   │   │   ├── scholarship/
│   │   │   ├── consulting/
│   │   │   ├── service/
│   │   │   ├── photography/
│   │   │   │   └── ai-enhanced-art/
│   │   │   ├── poems/
│   │   │   └── contact/
│   │   └── api/contact/       # Contact form API route (Resend)
│   ├── components/
│   │   ├── Header.tsx         # Sticky nav with locale switcher
│   │   ├── Footer.tsx         # Footer with social links
│   │   └── ui/                # shadcn/ui components
│   │       ├── hero-section-2.tsx
│   │       ├── image-gallery.tsx
│   │       ├── aspect-ratio.tsx
│   │       └── ContactForm.tsx
│   ├── i18n.ts                # next-intl config
│   └── middleware.ts          # Locale routing middleware
├── .env.local.example         # Environment variable template
├── .nvmrc                     # Node version pin (22.22.2)
├── WEEBLY-GUIDE.md            # Weebly implementation + migration guide
└── vercel.json                # Vercel deployment config
```

---

## Getting Started

### Prerequisites

- Node.js 22.22.2 (`nvm use` will pick it up from `.nvmrc`)
- npm

### Install and run locally

```bash
# Install dependencies
npm install

# Copy environment variable template
cp .env.local.example .env.local
# Edit .env.local and fill in your Resend + reCAPTCHA keys

# Start the development server
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

### Build for production

```bash
npm run build
npm run start
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Where to get it | Required |
|----------|----------------|----------|
| `RESEND_API_KEY` | [resend.com](https://resend.com) — free tier: 3,000 emails/month | Yes (contact form) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | [Google reCAPTCHA](https://www.google.com/recaptcha/admin) | Yes (contact form) |
| `RECAPTCHA_SECRET_KEY` | [Google reCAPTCHA](https://www.google.com/recaptcha/admin) | Yes (contact form) |
| `ENV` | Use `PROD` in production; `LOCAL`, `TEST`, and `DEV` show testing notices | Recommended |

The default keys in `.env.local.example` are Google's public reCAPTCHA test keys. They are safe for local development and should be replaced with real keys in deployed environments.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add the environment variables in the Vercel dashboard:
   `RESEND_API_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, and `ENV=PROD`
4. Deploy — live in under 2 minutes

**Hosting cost:** Vercel's free Hobby tier handles this site's traffic with no charges.

---

## AI-Enhanced Art Gallery

The gallery at `/photography/ai-enhanced-art` is driven by a JSON manifest — no code changes needed to add or remove images:

1. Drop a new image into `public/ai-enhanced-art/`
2. Add an entry to `public/ai-enhanced-art/gallery.json`:

```json
{
  "filename": "my-new-image.png",
  "src": "/ai-enhanced-art/my-new-image.png",
  "alt": "Description of the image",
  "width": 533,
  "height": 800
}
```

3. Commit and push — Vercel rebuilds and deploys automatically.

---

## Multilingual Support (i18n)

The site supports four locales with explicit URL prefixes:

| Locale | URL prefix | Example |
|--------|-----------|---------|
| English (default) | `/en` | `/en/teaching` |
| French | `/fr` | `/fr/teaching` |
| Spanish | `/es` | `/es/teaching` |
| Italian | `/it` | `/it/teaching` |

Translation files live in `messages/`. To add a new language:
1. Add the locale code to `src/i18n.ts`
2. Create `messages/<locale>.json` following the existing structure
3. Add it to the middleware locales array

For Weebly: multilingual support requires the **Weglot** plugin (~$17/month). See `WEEBLY-GUIDE.md` for full details.

---

## Platform Migration Notes

See **`WEEBLY-GUIDE.md`** for:
- Weebly contact form setup with reCAPTCHA
- Sticky navigation CSS for Weebly
- Platform alternatives (Squarespace, Wix, Webflow, Framer) at the same price point
- Step-by-step migration strategy from Weebly

---

## Contact Form Flow

```
User submits form
      ↓
Google reCAPTCHA token verified server-side (POST /api/contact)
      ↓
Resend delivers email to Stacy.Williams@marist.edu
with reply-to set to the sender's address
```

---

## License

This project was built as a client demonstration. All content, photography, and published works belong to Dr. Stacy A.S. Williams. Code structure may be reused with attribution.

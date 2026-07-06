# Design: Nabeel Ahmad — Signature Portfolio

Date: 2026-07-06
Status: Approved (design), pending implementation plan

## Goal

An award-worthy (Awwwards / CSS Design Awards caliber) personal portfolio for
Nabeel Ahmad, Full-Stack Engineer. Minimal-but-luxurious, futuristic, editorial,
heavy on tasteful motion and micro-interactions. Must read instantly as
"top-tier engineer." All content sourced faithfully from the CV
(`public/nabeel-full-stack-engineer-cv.pdf`).

## Confirmed decisions

- **Palette:** Electric Indigo → Violet → Fuchsia. Dark canvas `#06060A`;
  accents `#6366F1 → #A855F7 → #EC4899`. Aurora glows, glass layers, neon-lite.
- **Theme:** Light **and** dark, with an animated toggle. Dark is the hero
  experience; light is a warm off-white (`#FAFAFB`) variant with softened glows.
  Both must be fully polished.
- **Contact:** Elegant animated contact links with click-to-copy (email/phone),
  LinkedIn, location. No backend (site is a static export).
- **Testimonials / certifications:** none in CV → omit. "Achievements" becomes an
  animated impact-metrics band built from real CV numbers.

## Tech & foundation

- Next.js 13.5.1 (existing, `output: 'export'` static), TypeScript, Tailwind 3.3.
- Framer Motion 11 (installed), `next-themes` (installed), `lucide-react`.
- Add **Lenis** for smooth scroll. Add a custom **cursor** and **magnetic**
  wrapper. **No GSAP** — Framer Motion + Lenis cover the motion needs and keep the
  bundle lean for the Lighthouse ≥ 90 target.
- **Typography:** display serif (Fraunces/Instrument-style via `next/font`) for
  editorial headlines + **Inter** for body + a mono for labels/metadata. Strong
  hierarchy, large headings, generous whitespace.
- **Accessibility:** semantic landmarks, keyboard nav, visible focus rings, good
  contrast in both themes, `prefers-reduced-motion` disables parallax / particles
  / custom cursor and falls back to simple fades. Custom cursor only on
  fine-pointer devices. Respect reduced-data where practical.
- **Performance:** static export, no external asset requests, self-hosted fonts,
  code-split heavy fx, lazy-init observers, GPU-friendly transforms only, SEO
  metadata + JSON-LD Person schema.

## Architecture

Refactor the current 877-line monolithic `app/page.tsx` into focused modules:

```
app/layout.tsx              fonts, ThemeProvider, SmoothScroll, SEO metadata, JSON-LD
app/page.tsx                thin composition of sections
app/globals.css             design tokens (both themes), base styles, keyframes
lib/content.ts              SINGLE source of truth — all real CV data, typed
lib/motion.ts               shared animation variants/easings

components/providers/
  theme-provider.tsx        next-themes wrapper
  smooth-scroll.tsx         Lenis provider

components/fx/
  preloader.tsx             load screen
  cursor.tsx                custom cursor (fine-pointer only)
  magnetic.tsx              magnetic hover wrapper
  aurora-background.tsx     mesh/aurora gradient layer
  grid-background.tsx       animated grid + noise
  reveal-text.tsx           char/line reveal on scroll
  scroll-progress.tsx       top progress bar
  count-up.tsx              number count-up on view
  tilt.tsx                  card tilt wrapper

components/sections/
  nav.tsx  hero.tsx  about.tsx  journey.tsx  skills.tsx
  projects.tsx  experience.tsx  metrics.tsx  contact.tsx  footer.tsx
```

Each unit: one clear purpose, props-driven, understandable in isolation.

## Sections (each visually distinct — no repeated card grid)

1. **Preloader** — name draws in, 0→100 counter, curtain wipe → hero. Skipped
   under reduced-motion.
2. **Hero** — oversized "Nabeel Ahmad" char-by-char reveal; rotating role words
   (AI-integrated systems / microservices / cloud-native apps); aurora mesh +
   faint animated grid; magnetic CTAs (View Work, Download CV); social links;
   mouse-parallax glow; scroll cue.
3. **About** — editorial two-column: large pull-quote bio (rewritten from the CV
   summary) + a live "status" strip (Lahore · 6+ yrs · open to work) over subtle
   noise. Not a boxy card.
4. **Career Journey** — scroll-scrubbed animated timeline with sticky year
   markers: InvoZone → Petsaal → Bloomrix. Distinct treatment from Experience.
5. **Skills** — floating tech constellation grouped by category (Languages ·
   AI & LLM · Frontend · Backend · Databases · Cloud/DevOps); nodes drift and
   react to cursor; category filter. No progress bars.
6. **Featured Projects** — full-bleed alternating case-study rows, each with a
   generated animated gradient "visual" (no stock images), role, challenge →
   solution → result, tech chips, tilt/hover. Four: **Cybrology** (AI/RAG
   cybersecurity platform, team lead), **Ask / Hulul** (Saudi gov event system),
   **Muck Rack / Keyhole** (social insights), **Nano Apply** (AI job-application
   tool).
7. **Experience** — refined expandable detail list of the 3 roles with real
   bullet points (OpenAI streaming, LLM summarization, NestJS microservices,
   RabbitMQ/Pub-Sub/Apache Pulsar, caching/query optimization, RBAC/OAuth, etc.).
8. **Metrics / Impact** — animated count-up band from real CV numbers: 60% faster
   report generation, 45% API response improvement, 35% dashboard load speedup,
   30% page-load improvement, 6+ years, 4 featured products.
9. **Contact** — oversized "Let's build something" line; copy-to-clipboard email
   (`nabeel.dev.eng@gmail.com`) and phone (`+923117064200`); LinkedIn; location
   Lahore, Pakistan; magnetic buttons.
10. **Footer** — minimal, back-to-top, © 2026 Nabeel Ahmad.

Sticky nav with active-section indicator, theme toggle, and Download CV
(→ `/nabeel-full-stack-engineer-cv.pdf`).

## Content integrity

`lib/content.ts` holds only CV-accurate data. Copy is rewritten to be sharp and
premium but factually exact. No invented employers, projects, titles, metrics, or
contact details. The fabricated content in the old `page.tsx` (Talkspresso,
Fortune 500, "Technical Team Lead", wrong phone) is discarded.

Canonical facts:
- Name: Nabeel Ahmad · Role: Full-Stack Engineer · Location: Lahore, Pakistan
- Email: nabeel.dev.eng@gmail.com · Phone: +923117064200 · LinkedIn (in CV)
- Summary: 6+ yrs, scalable cloud-native apps (Next.js, NestJS, distributed
  microservices), AWS/GCP, event-driven systems; recently AI-integrated —
  LLM-powered features, RAG pipelines, intelligent automation.
- Experience: Senior Software Engineer @ InvoZone (Oct 2021–Present);
  Software Engineer @ Petsaal Technologies (Sept 2020–Oct 2021);
  Software Developer @ Bloomrix (Sep 2019–Sept 2020).
- Projects: Cybrology, Ask/Hulul, Muck Rack/Keyhole, Nano Apply.
- Education: BS Computer Science, University of Lahore (2015–2019).
- Skills by category exactly as CV. Strengths: Frontend & Backend Development;
  Team Leadership & Agile; Research & System Optimization.

## Out of scope

Testimonials, blog/CMS, i18n, contact backend, GSAP, unit tests (this is a
static presentational site; verification is visual + Lighthouse + build).

## Verification

`next build` (static export) passes; visual pass in browser at mobile/tablet/
desktop; keyboard + reduced-motion sanity; Lighthouse ≥ 90 target.

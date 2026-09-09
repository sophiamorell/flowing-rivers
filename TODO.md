# TODO — things Sophie needs from Allison before launch

Updated 2026-09-09 after Website Edits, Round 1. Every placeholder or open
question in the code is marked with a `TODO n` comment pointing at the item
number below. Search the project for `TODO 18`, for example, to find every
spot that depends on item 18.

Status key: **Blocking launch** = the site cannot go live without it.
**Blocking deploy** = needed to put it on the real domain. **Needed** = should
be done before launch but the site works without it. **Nice to have** = later.
✅ = closed in this round.

## Original items (1–14)

| #  | Item | Status | Where in the code |
|----|------|--------|-------------------|
| 1  | **Vector logo files (SVG).** Still only rasters supplied. The mark on the site is the PNG; the wordmark is live text. Request SVG or EPS/AI from the designer. Do not trace or recreate it. | **Still blocking** | `components/Logo.tsx`, `public/logo-mark.png`, `public/og.jpg`, `app/icon.png` |
| 2  | Legal / marketing name | ✅ Closed: "Flowing Rivers Health" (E-37) | `content/site.ts` |
| 3  | Credentials | ✅ Closed: E-04 trust line and E-14 credentials list, verbatim. No board certification exists and none is implied. See item 22 for the 2026 certificate. | `content/site.ts` → `hero.trustLine`, `about.credentials` |
| 4  | **Pricing.** $100 (60 min) and $150 (90 min) were in the copy Allison marked up and she left them unchanged, so they are now on the page. Sophie to verify before launch. Starter Package price: see item 16. | ⚠️ Partly | `content/site.ts` → `services.offers[].price` |
| 5  | Domain | ✅ Closed: `flowingrivershealth.com` is registered, pointed at Netlify, and live (www redirects to the bare domain). Canonical, sitemap, Open Graph, and structured data use it. | `lib/site-url.ts`, `netlify.toml`, `.env.example` |
| 6  | Business email | ✅ On the page, in the footer, and as the form fallback. **The live form still fails with `not_configured`**: `RESEND_API_KEY` and `CONTACT_EMAIL` are not set in Netlify (see item 26). | `content/site.ts` → `email` |
| 7  | Photograph of Allison (About) | ✅ Received. The headshot is 1242px on its long edge, under the ~1600px bar. Ask for the original. | `public/images/allison.jpg` |
| 8  | Hero image | ✅ Closed: the seated portrait. | `public/images/hero.jpg` |
| 9  | About copy in Allison's voice | ✅ Closed (E-06, E-07, E-10, E-11). See items 27 and 28 for two wording checks. | `content/site.ts` → `about` |
| 10 | Free intro call | ✅ Confirmed: the 20-minute discovery call stands. | `content/site.ts` → `services.offers[0]` |
| 11 | Term of address ("clients") | Still open, no correction marked | `content/site.ts` |
| 12 | Physical address, or virtual + Durango only | Still open | `lib/json-ld.ts` |
| 13 | Social profiles | Still open | `lib/json-ld.ts` → `sameAs` |
| 14 | **Compliance review by board or attorney.** Now larger: the testimonials (item 15), the "Stress & anxiety management" wording (item 28), "chronic illness," and the yoga / mindful movement addition to the services quote (E-16) all belong in that review. | **Before launch** | `content/site.ts` → `faq`, `footer`, `services.quote`, `about.focus` |

## New from Round 1 (15–22)

| #  | Item | Status | Where in the code |
|----|------|--------|-------------------|
| 15 | **Testimonials are live at Sophie's direction (2026-09-09)**, as a rotating banner above How It Works, full text verbatim. Still outstanding before launch: written permission from all six people; parental consent for Ayla (7) and Mason (5), whose first names are shown; a decision on Stephanie and Carrie, who describe peer coaching rather than client coaching; Kellie's two HRV sentences, which read as a measurable health claim; and disclosure if "Sophie, 39" is the site's marketer. The short excerpts shown before "Read the full testimonial" are verbatim sub-strings but Allison should approve the trims. | **Before launch** | `content/site.ts` → `testimonials`, `components/Testimonials.tsx` |
| 16 | **Starter Package price.** Assets doc says $1,000 for ten sessions; the marked-up edit says "Price agreed upon." Built as marked. | **Blocking** | `content/site.ts` → `services.offers[2].price` |
| 17 | **25% discount scope.** Assets doc: Starter Package only, for veterans, first responders, teachers. Marked-up edit: no package named, and adds active military. Built as marked, under all cards. | Blocking E-23 | `content/site.ts` → `services.discountNote` |
| 18 | **Audience.** The marked-up FAQ says "Women between about 25 and 65"; the hero still says "adults and children," and the testimonials include a 5-year-old boy. Her assets doc says "I specialize in working with women," which is a different claim. The FAQ currently keeps "Adults" with every other change applied (25–65, under 12, the new sentences). Allison's call. | **Blocking E-33** | `content/site.ts` → `faq.items[5]`, `hero.sub` |
| 19 | **Years of experience.** Hero says "20 years of nursing experience"; About says 20 years Army plus 10+ years hospital. Ask whether the hero should say 30 or the years overlap. Both lines are verbatim from Allison; not adjusted. | Needed | `content/site.ts` → `hero.sub`, `about.paragraphs[0]` |
| 20 | **Brand palette and fonts to client spec.** Her spec: primary `#28587B` (already exact), secondary `#8DA4C3`, tertiary `#CFD2B2` (a sage-tan), orange `#D34E24`; Merriweather headings, Roboto body. Not applied yet, per the edits doc. Recommended approach when approved: orange only for display/decoration (it fails AA for body text and on buttons), keep the darker terracotta steps for anything interactive, add the sage as a third background used once, swap fonts and re-check the H1 line breaks. About an hour of work plus a Lighthouse re-run. | Needed before build | `app/globals.css`, `app/layout.tsx` |
| 21 | **Practice Better / EHR / unlimited messaging** detail from her assets doc was deliberately left off the Starter Package card. It implies HIPAA-grade handling the site cannot claim. If she wants it, it needs its own wording and a compliance check. | Needed | `content/site.ts` → `services.offers[2]` |
| 22 | Confirm the "Transformative Nurse Coach Certificate (2026)" is awarded, not in progress. If in progress, it must say so. | Needed | `content/site.ts` → `about.credentials[3]` |

## Carried over and copy flags (23–31)

| #  | Item | Status | Where in the code |
|----|------|--------|-------------------|
| 23 | Reply-time promise ("within two business days") in the contact intro and success message. Confirm she can keep it. | Needed | `content/site.ts` → `contact` |
| 24 | **Resend sending domain.** Until `flowingrivershealth.com` is verified in Resend, the form sends from Resend's test address, which only delivers to the account owner's inbox. Verify the domain and set `CONTACT_FROM`. | Blocking deploy | `.env.example`, Resend dashboard |
| 25 | Analytics: none installed, per the brief. Netlify Analytics is server-side and cookieless if she wants numbers. | Nice to have | Netlify dashboard |
| 26 | **Live form does not send yet.** Netlify needs `RESEND_API_KEY` (from resend.com) and `CONTACT_EMAIL` under Site configuration → Environment variables, then a redeploy, then one real test submission. Until the domain is verified in Resend, delivery only works to the inbox that owns the Resend account. | **Blocking launch** | `app/api/contact/route.ts` |
| 27 | E-06 wording: the markup read "I'm **add** Registered Nurse". Built as "I'm a Registered Nurse in Durango, Colorado." Confirm. | Confirm | `content/site.ts` → `about.paragraphs[0]` |
| 28 | E-11 list items 1 and 2: her markup says "Stress & anxiety management" and "Chronic illness." "Management" is the verb the compliance rules prohibit, so the page shows "Living with stress and anxiety" and "Living with chronic illness" until she signs off. | Confirm | `content/site.ts` → `about.focus.items` |
| 29 | E-23 typography: she wrote the discount line in all caps; it is rendered in sentence case (all caps is reserved for eyebrow labels and reads badly to screen readers). | Flag | `components/Services.tsx` |
| 30 | E-30: "directly" now appears twice in three sentences. Her words, kept. "Answer them straight" or "then and there" would read better. | Flag | `content/site.ts` → `faq.items[2]` |
| 31 | E-34: "diving deep into the six areas" is warmer than the rest of the answer. Her phrasing, kept. "Looking at all six areas" is the lighter option if she is open to it. | Flag | `content/site.ts` → `faq.items[6]` |

## Supplied but deliberately not used (Appendix B of the edits doc)

- "I help you to make sustainable lifestyle changes." Not on the page yet; a good candidate for the hero sub or meta description.
- The "Sick Care" paragraph contains "treat the whole person," which the compliance rules exclude. Needs rewriting before use.
- "Let's Connect" / "Check out the testimonials" button labels: no change marked; the build keeps "Book a free consult" and "Get in touch."
- The ":)" emoticon line. Off-voice, not carried over.

# TODO — things Sophie needs from Allison before launch

Every placeholder in the code is marked with a `TODO n` comment that points
at the item number below. Search the project for `TODO 3`, for example, to
find every spot that depends on item 3.

Status key: **Blocking launch** = the site cannot go live without it.
**Blocking deploy** = needed to put it on a real domain. **Needed** = should
be done before launch but the site works without it. **Nice to have** = later.

## From the brief (items 1–14)

| #  | Item | Status | Where in the code |
|----|------|--------|-------------------|
| 1  | **Vector logo files (SVG).** The mark on the site is a PNG extracted from the Google Doc. It is sharp enough for the header but not for print, large screens, or the social card. Ask the designer for SVG or EPS/AI. The wordmark is currently rendered as live text so it stays crisp. | **Blocking launch** | `components/Logo.tsx`, `public/logo-mark.png`, `public/og.jpg`, `app/icon.png`, `app/apple-icon.png` |
| 2  | **Legal / marketing name.** The lockups say "Flowing Rivers Health" (used here), "Health Coaching," and "Health Coaching Care." Confirm before launch; the `<title>`, wordmark, footer copyright, and structured data all read from `content/site.ts`. | **Blocking launch** | `content/site.ts` → `name`, `legalName`, `ui.wordmark` |
| 3  | **Credentials.** Exact licenses, degrees, and certifications. Nothing has been invented: the hero trust line says "Licensed nurse [credentials to confirm]" and the About credentials list is four visible `[TODO]` bullets. | **Blocking launch** | `content/site.ts` → `hero.trustLine`, `about.credentials` |
| 4  | **Pricing.** `[CONFIRM PRICE]` The Nov 2025 survey listed $75 for a 60-minute session. No price for 90 minutes was given. Both cards currently show "[Price to confirm]". Each price is one string. | **Blocking launch** | `content/site.ts` → `services.offers[].price` |
| 5  | **Domain name.** Set `NEXT_PUBLIC_SITE_URL` in Vercel once known. | Blocking deploy | `.env.example`, Vercel env vars |
| 6  | **Business email for the contact form.** Currently `hello@example.com`, which is shown in the footer, the contact section, and the form's error fallback. Also set `CONTACT_EMAIL` in Vercel. | Blocking deploy | `content/site.ts` → `email`; Vercel env vars |
| 7  | **Photograph of Allison (About).** Using the landscape headshot from the assets folder, cropped 4:5. Confirm she is happy with it, or supply another. | Needed | `public/images/allison.jpg` |
| 8  | **Hero image.** Using the seated full-length headshot, cropped 3:4. Works well. Swap if she prefers a landscape/Animas valley shot. | Needed | `public/images/hero.jpg` |
| 9  | **About copy in Allison's voice.** The two paragraphs are drafted in the brief's register and include an invented backstory line ("watched people leave appointments with a diagnosis and a prescription"). She must rewrite or approve. | Needed | `content/site.ts` → `about.paragraphs` |
| 10 | **Free intro call.** The site assumes a free 20-minute call (hero CTA, first offer card, step 1 of How It Works). Confirm. | Needed | `content/site.ts` → `services.offers[0]`, `howItWorks.steps[0]` |
| 11 | **Term of address.** The site says "clients." Confirm. | Nice to have | `content/site.ts` (search "client") |
| 12 | **Physical address.** None is published. The contact section says "In person in Durango, Colorado." Add a street address to the structured data if she wants one listed. | Nice to have | `lib/json-ld.ts`, `content/site.ts` → `location` |
| 13 | **Social profiles.** None linked. | Nice to have | `lib/json-ld.ts` → `sameAs` |
| 14 | **Compliance language reviewed** by her licensing board or an attorney: the FAQ "Is this therapy?" answer, the footer disclaimer, the 988 line, and the consent checkbox text. | **Before launch** | `content/site.ts` → `faq.items[1]`, `footer.disclaimer`, `contact.form.consent` |

## Found while building (items 15+)

| #  | Item | Status | Where in the code |
|----|------|--------|-------------------|
| 15 | **Surname.** "Allison Scobie" is taken from the headshot filenames and used only in structured data (not on the page). Confirm she wants her full name published. | Needed | `content/site.ts` → `owner.fullName` |
| 16 | **FAQ assumptions.** Answer 4 ("How long do people usually work with you?") describes a typical cadence I made up. Answer 6 says children are seen "together with a parent." Both need her sign-off. | Needed | `content/site.ts` → `faq.items[3]`, `faq.items[5]` |
| 17 | **Reply-time promise.** The contact intro and success message promise a reply "within two business days." Confirm she can keep that. | Needed | `content/site.ts` → `contact.intro`, `contact.form.success` |
| 18 | **Resend sending domain.** Until the business domain is verified in Resend, the form sends from `onboarding@resend.dev`, which can only deliver to the email that owns the Resend account. Verify the domain and set `CONTACT_FROM`. | Blocking deploy | `.env.example`, Resend dashboard |
| 19 | **Fonts.** The brief asked for Fraunces + Inter. Montserrat was supplied in the assets folder, so the site uses Fraunces (headings) + Montserrat (body), both self-hosted through `next/font`. Fraunces loads only its optical-size axis; the brief's `SOFT 40` setting was dropped because it doubles the font download (117KB vs 65KB). Easy to change in `app/layout.tsx`. | Confirm | `app/layout.tsx` |
| 20 | **Analytics.** None installed, per the brief. If Allison wants visitor numbers, enable Vercel Analytics (cookieless, no banner needed). | Nice to have | Vercel dashboard |
| 21 | **End-to-end email test.** The form has not yet been sent through a real Resend key. Do this once items 6 and 18 are set (see README). | Before launch | `app/api/contact/route.ts` |

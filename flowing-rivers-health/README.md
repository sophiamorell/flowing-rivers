# Flowing Rivers Health — website

A one-page marketing site with a contact form for Allison's holistic nurse
coaching practice in Durango, Colorado. Built with Next.js and Tailwind CSS,
ready to deploy on Netlify or Vercel.

This README is written for someone who does not code. The three things you
will most likely want to do are: **change the words**, **swap the logo**, and
**put the site online**. Each has its own section below.

Before launch, work through **TODO.md**. It lists everything that still
needs Allison's confirmation (credentials, prices, her email, and so on).

---

## 1. Changing the words on the site

Every word on the site lives in **one file**: `content/site.ts`.

Open it in any text editor (VS Code is free and works well). You will see
blocks like this:

```ts
hero: {
  h1: "Holistic nurse coaching in Durango, Colorado.",
  sub: "A calm, practical place to work through stress ...",
```

Change the text between the quotes, keep the quotes, and save. That is it.
Headings, paragraphs, FAQ questions and answers, prices, button labels, image
descriptions, the privacy policy, and the words search engines see are all in
there.

A few rules that keep the file working:

- Keep the quote marks `"` around each piece of text.
- If your text needs a quote mark inside it, use a curly one: “like this”.
- Don't delete a line entirely. If you want something gone, leave the quotes
  empty: `""`. (Some sections will look odd empty, so ask if unsure.)
- Lines starting with `//` are notes, not text on the page.

If you save and the site stops building, the message will name the line
number where the problem is. Usually it is a missing quote or comma.

## 2. Swapping the logo

The logo is wired through a single file: `components/Logo.tsx`.

Right now the mark (the heart with the river) is `public/logo-mark.png`, a
PNG pulled from the Google Doc. When the designer sends the proper vector
file:

1. Save it as `public/logo-mark.svg`.
2. Open `components/Logo.tsx` and change `/logo-mark.png` to `/logo-mark.svg`.

Nothing else on the site needs to change. Also replace `public/og.jpg`
(1200×630, shown when the link is shared on social media) and the two icons
in `app/icon.png` and `app/apple-icon.png` with versions made from the vector.

The words "Flowing Rivers" and "HEALTH" next to the mark are typed text, not
part of the image, so they stay sharp at every size. Change them in
`content/site.ts` under `ui.wordmark`.

## 3. Running the site on your computer

You need Node.js 20 or newer (https://nodejs.org, choose the LTS download).

**If this folder lives in Google Drive**, first copy it somewhere local (for
example a `Sites` folder in your home directory). `npm install` creates tens of
thousands of small files that Drive syncs badly. Then, in a terminal, inside
the copied folder:

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. Edits to `content/site.ts` show up as soon as you
save.

To make sure everything is error-free before deploying:

```bash
npm run build
```

## 4. Making the contact form send email

The form sends messages through a service called **Resend** (free at this
volume). Three settings are needed, and they go in a file called `.env.local`
for local testing, or in Vercel's Environment Variables for the live site.
Copy `.env.example` to `.env.local` to start.

| Setting | What it is |
|---|---|
| `RESEND_API_KEY` | From resend.com → API Keys. |
| `CONTACT_EMAIL` | The inbox that should receive messages (Allison's). |
| `CONTACT_FROM` | Optional. The "from" address, on a domain verified in Resend, e.g. `Flowing Rivers Health <hello@yourdomain.com>`. Until the domain is verified, leave it blank and Resend's test address is used, which can only deliver to the email that owns the Resend account. |
| `NEXT_PUBLIC_SITE_URL` | The site's public address, e.g. `https://flowingrivershealth.com`, no trailing slash. |

Never commit `.env.local` to git. It is already ignored.

**Test it end to end:** run `npm run dev`, fill in the form, and check the
`CONTACT_EMAIL` inbox. Replying to that email replies to the person who
submitted the form.

## 5. Putting it online

The site needs a host that can run a small server function for the contact
form, so it cannot be uploaded as plain files. Netlify and Vercel both work
and both have free plans that cover this traffic. Either way the flow is the
same: put the code on GitHub, connect the host to GitHub, add the four
settings from section 4, deploy.

### Step 1: put the code on GitHub (once)

1. Create a free account at github.com if you do not have one.
2. Install GitHub Desktop (desktop.github.com) and sign in.
3. In GitHub Desktop: **File → Add Local Repository**, choose your local
   copy of this folder. If it says the folder is not a repository, click
   **create a repository** in that dialog and accept the defaults.
4. Click **Publish repository**. Keep it private. Done.

From now on, every change you save and then **Commit** and **Push** in
GitHub Desktop is redeployed automatically.

### Step 2a: Netlify

1. Go to app.netlify.com and sign in with GitHub.
2. **Add new project → Import an existing project → GitHub**, pick the
   repository.
3. Netlify reads `netlify.toml` and fills in the build settings itself.
   Nothing to change.
4. Before clicking Deploy, open **Environment variables** and add
   `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM` (optional), and
   `NEXT_PUBLIC_SITE_URL`.
5. Click **Deploy**. In a minute or two you get a `something.netlify.app`
   address you can send to Allison.
6. Real domain: **Domain management → Add a domain**, follow the DNS steps.
   Then set `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and trigger a
   redeploy (**Deploys → Trigger deploy**).

### Step 2b: Vercel (the alternative)

1. Go to vercel.com, sign in with GitHub, **Add New → Project**, pick the
   repository. Vercel detects Next.js; no settings need changing.
2. Add the same environment variables, click **Deploy**.
3. Domain: **Settings → Domains**, add it, follow the DNS instructions, then
   update `NEXT_PUBLIC_SITE_URL` and redeploy.

### After the first deploy

- Send a test message through the live form and confirm it lands in the
  `CONTACT_EMAIL` inbox (TODO 21).
- Check the share preview by pasting the URL into a Slack or iMessage
  window; it should show the logo card.

## 6. What is where

```
app/
  layout.tsx          fonts, page metadata, skip link
  page.tsx            the home page (composes the sections in order)
  privacy/page.tsx    the privacy policy page
  api/contact/        the code that sends the form by email
  globals.css         colors and base styles
  icon.png, apple-icon.png   browser and phone icons
components/           one file per section of the page
content/site.ts       ALL THE WORDS
public/images/        photographs
public/logo-mark.png  the logo mark (see section 2)
public/og.jpg         the image shown when the link is shared
TODO.md               the pre-launch checklist
```

## Design and content rules baked in

- No treatment claims. Coaching does not treat, cure, diagnose, or manage
  anything. The FAQ and footer carry the boundary statement and the 988 line.
- No credentials, prices, or testimonials that have not been confirmed.
- Muted small text uses the `river-700` token, added during the build because
  the brief's `river-600` measures 4.49:1 on cream and 4.03:1 on sand (below
  the 4.5:1 AA minimum for small text). `river-600` is fine at 18px and up.
- No trackers, no cookies, no cookie banner. If you want visitor numbers,
  turn on Vercel Analytics in the Vercel dashboard.
- The contact form is ordinary email, not a secure medical channel, and it
  says so.

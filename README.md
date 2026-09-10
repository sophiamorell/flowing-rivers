# Flowing Rivers Health — website

A one-page marketing site with a contact form for Allison's holistic nurse
coaching practice in Durango, Colorado. Built with Next.js and Tailwind CSS,
deployed on Netlify from GitHub.

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

The form is handled by **Netlify Forms**, which is part of the hosting. There
are no keys to manage. One-time setup in the Netlify dashboard:

1. Open the project, then **Forms** in the left menu, and click **Enable form
   detection** if it is not already on.
2. Go to **Deploys**, **Trigger deploy**, **Deploy site**. After this deploy a
   form named **contact** appears under Forms.
3. Open the **contact** form, click **Notifications** (or Form notifications
   under Project configuration), choose **Email notification**, and enter the
   address that should receive messages (Allison's).
4. Submit one test through the live form and check the inbox. Replies go to
   the visitor's address, which is in the email.

Submissions are also listed under Forms in Netlify, so nothing is lost if an
email goes astray. The free plan includes 100 submissions a month, more than
enough for this practice. Spam is filtered by Netlify; the form also carries a
hidden honeypot field that bots fill in and people never see.

## 5. Putting it online (GitHub + Netlify)

The working copy of the code lives outside Google Drive, at
`~/Sites/flowing-rivers-health`, because git and `npm install` do not get along
with Drive's sync. The copy in the Drive folder is a plain-file mirror for
reference. Make edits in the `~/Sites` copy, then commit and push.

**One-time setup**

1. Sign in to GitHub from the terminal (opens a browser page to approve):

   ```bash
   gh auth login --web --git-protocol https
   ```

2. Create the repository and push (private):

   ```bash
   cd ~/Sites/flowing-rivers-health && gh repo create flowing-rivers-health --private --source=. --push
   ```

3. Go to app.netlify.com, sign in with GitHub, choose **Add new project →
   Import an existing project → GitHub**, and pick `flowing-rivers-health`.
   Netlify reads `netlify.toml`; nothing to change in the build settings.
4. No environment variables are needed; `NEXT_PUBLIC_SITE_URL` is set in
   `netlify.toml`. Set up form notifications as described in section 4.
5. Click **Deploy**. You get a `something.netlify.app` link in a minute or two.

**Every later change**

```bash
cd ~/Sites/flowing-rivers-health && git add -A && git commit -m "Describe the change" && git push
```

Netlify rebuilds and publishes automatically on every push.

**The real domain**

In Netlify, open **Domain management**, add `flowingrivershealth.com`, and
follow the DNS instructions. The primary domain is the bare
`flowingrivershealth.com` (www redirects to it), matching `NEXT_PUBLIC_SITE_URL`.

## 6. What is where

```
app/
  layout.tsx          fonts, page metadata, skip link
  page.tsx            the home page (composes the sections in order)
  privacy/page.tsx    the privacy policy page
  (form submissions go to Netlify Forms; see public/__forms.html)
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
  turn on Netlify Analytics in the Netlify dashboard (server-side, no cookies).
- The contact form is ordinary email, not a secure medical channel, and it
  says so.

# sensemakers.be — website

Static site, no build step, no framework, no tracking. Seven pages (`index.html`, `academy.html`, `guidance.html`, `frontier-watch.html`, `scan.html`, `audit.html`, `readiness.html`), one stylesheet, one small script, self-hosted fonts. Since 16 Sep 2026 the site is Academy-first: the Academy (eight formats in three layers) leads, Guidance (Programme, Scan, Audit) sits beside it, Frontier Watch is the hero product with its own page. Anything in this folder is exactly what gets served.

## Files

| File | What it is |
|---|---|
| `index.html` | The homepage: one wide hero card (add the class `hero-wide--dark` to `.hero-wide` for the deep-pine variant), Why now (the thesis, four voices, six evidence cards), the Academy block (three layer tiles that filter the eight format cards, lab principle with tool logos), Guidance, the Frontier Watch band, values, Meet the people (placeholder, no names yet), contact. |
| `academy.html` | The Academy: three layers and eight formats, each with an anchor (`#briefing`, `#sprint`, `#foundations`, `#thinking`, `#tracks`, `#build-day`, `#frontier-watch`, `#champions`), the lab principle, two routes. |
| `guidance.html` | Guidance: what we guide, the AI Transformation Programme (`#programme`), the Scan and the Audit, how we price, who you get. |
| `frontier-watch.html` | The Frontier Watch landing page: why a radar, what you get, who it's for, how it starts. |
| `offers.html` | Kept only as a redirect to `guidance.html` (old links keep working). |
| `scan.html` | The AI Transformation Scan: who it's for, what happens, what you keep. Request-information CTA, no prices. |
| `audit.html` | The AI Spend & Ownership Audit: same structure. |
| `readiness.html` | The 90-second "Where are you with AI?" check. |
| `404.html` | Not-found page (GitHub Pages picks it up automatically). |
| `styles.css` | All styling. The "Aurora" system (16 Sep 2026): brand tokens are the CSS variables at the top — warm-white canvas `#FBFAF7`, ink `#111815`, pine `#0C5C3C` for actions, and four layer colours with meaning: gold = Lead, sky = Work, mint = Keep up, field = Guidance (each with a `-deep` text shade and a `-tint` background). Panels get their aurora from `.atmo::before` (variants `aurora--sky`, `aurora--gold`, `aurora--mint`); there is no SVG art any more. Type: Figtree for headlines and text, Newsreader italic for accents, quotes and numerals. |
| `site.js` | Mobile menu, stage tabs, reveal animation, count-up numbers, the compounding-curve draw-on, footer year, **and the two config lines** (see below). |
| `assets/` | Favicons (a letter S until the logo is ready), Apple touch icon, `og.png` share image (aurora card, regenerated 16 Sep 2026), `fonts/` (Newsreader + Figtree, OFL licence), `logos/` (drop the vendor logo files here, see below). |
| `CNAME` | Tells GitHub Pages the custom domain is `sensemakers.be`. Don't rename. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |
| `robots.txt`, `sitemap.xml` | Search-engine housekeeping. |

## The two settings you'll change first

Open `site.js`. The top has:

```js
var BOOKING_URL = "";                  // paste a Calendly / cal.com link here → every "Book a call" button uses it
var CONTACT_EMAIL = "hello@sensemakers.be";
```

Leave `BOOKING_URL` empty and the buttons open an email instead.

## Go live on sensemakers.be (GitHub Pages + Combell DNS)

Why this setup: it's free, has no server to maintain, gives you HTTPS automatically, keeps every version of the site in git, and any future Claude session can update it by editing files and pushing. The domain stays at Combell; only the DNS records point to GitHub.

### 1. Put the site in a GitHub repository (5 min)

This folder is already a git repository with one commit. On your Mac, in Terminal:

```bash
cd path/to/sensemakers.be   # this folder
gh repo create sensemakers-site --public --source=. --remote=origin --push
```

(If you don't have the GitHub CLI: create an empty **public** repo called `sensemakers-site` on github.com, then run
`git remote add origin https://github.com/<your-username>/sensemakers-site.git && git branch -M main && git push -u origin main`.)

The repo must be public for free GitHub Pages. That's fine: it's a public website.

### 2. Switch on Pages (2 min)

On github.com → your repo → **Settings → Pages**.
Under *Build and deployment*: Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)**. Save.
Under *Custom domain*: type `sensemakers.be` and Save. (The `CNAME` file already matches.)
Wait a minute; the page will say the DNS check is pending until step 3 propagates.

### 3. Point the domain at GitHub, in Combell (5 min)

Combell → **My Combell → Domain names → sensemakers.be → DNS**. Remove any existing `A` record or web-forwarding on the root (`@`) that Combell put there as a default, then add:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `<your-github-username>.github.io.` |

Leave the MX records (email) alone. DNS usually propagates within an hour, sometimes longer.

### 4. Enforce HTTPS (1 min, once the DNS check is green)

Back in **Settings → Pages**, tick **Enforce HTTPS**. GitHub issues the certificate itself. `www.sensemakers.be` will redirect to `sensemakers.be`.

### 5. The mailbox

The site points to `hello@sensemakers.be`. Create that mailbox in Combell (Email → Mailboxes), or set up a forward to your usual address, before the site goes live.

## Updating the site later

Edit the files, then:

```bash
git add -A && git commit -m "Update copy" && git push
```

GitHub Pages redeploys in about a minute.

## If you'd rather host at Combell

If your Combell package includes web hosting, you can skip GitHub entirely: upload every file in this folder (including the `assets` folder, `.nojekyll` can be ignored) to the web root (`www/` or `httpdocs/`) via Combell's file manager or SFTP, and enable the free Let's Encrypt certificate in the hosting panel. The `CNAME` file does nothing there and is harmless.

## Still to add when you have them

- The Calendly link: paste it into `BOOKING_URL` at the top of `site.js` and every "Book a call" button switches over.
- A final name for the subscription: "Frontier Watch" is a working title (it appears on every page, in the header, and has its own page `frontier-watch.html`).
- Tool logos: drop the official files in `assets/logos/` as `claude.svg`, `microsoft-copilot.svg`, `chatgpt.svg`, `codex.svg`, `cursor.svg`, `claude-code.svg` (from each vendor's brand page, following their guidelines). Until a file exists, the pill shows the name only.
- Meet the people: replace the three "Name to follow" cards with names, photos and bios when you're ready.
- Product pages per Academy format (one template: who it's for, the promise, what happens, what you leave with, format, where it fits, CTA) once each format is built; today every format lives as an anchor on `academy.html`.
- The header and footer are identical on every page; when you change them, change them everywhere (a small build script did this for the Sep 2026 restructure).
- A named founder/team section, when you want the site to point to people. It is deliberately anonymous for now.
- Legal identification in the footer: Belgian law expects the company name, registered office and enterprise (BTW) number on a business website. A one-line addition to the footer once you decide which entity the site speaks for.
- Analytics, if wanted: Plausible or Cloudflare Web Analytics are cookie-free and need no banner.

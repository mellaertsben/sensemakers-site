# sensemakers.be — website

Static site, no build step, no framework, no tracking. Two pages (`index.html`, `readiness.html`), one stylesheet, one small script, self-hosted fonts. Anything in this folder is exactly what gets served.

## Files

| File | What it is |
|---|---|
| `index.html` | The site. One long page with anchored sections. |
| `readiness.html` | The 90-second "Where are you with AI?" check. |
| `404.html` | Not-found page (GitHub Pages picks it up automatically). |
| `styles.css` | All styling. Brand tokens are the CSS variables at the top. |
| `site.js` | Mobile menu, reveal animation, footer year, **and the two config lines** (see below). |
| `assets/` | Mark (`mark.svg`), favicons, Apple touch icon, `og.png` share image, `fonts/` (Fraunces + Inter, OFL licence). |
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
cd "/Users/benmellaerts/Desktop/Claude Cowork/Claude/Projects/Sensemakers/OUTPUTS/Website/sensemakers.be"
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

- Your LinkedIn URL (the founder section and footer have room for it).
- A photo for the founder section, if you want one.
- Legal identification in the footer: Belgian law expects the company name, registered office and enterprise (BTW) number on a business website. A one-line addition to the footer once you decide which entity the site speaks for.
- Analytics, if wanted: Plausible or Cloudflare Web Analytics are cookie-free and need no banner.

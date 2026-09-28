# sensemakers.be — website

Static site, no build step, no framework, no cookies. One stylesheet, one small script, self-hosted fonts. Anything in this folder is exactly what gets served.

Since 28 Sep 2026 the site follows three products: **Frontier Watch** (for the leadership team), the **Academy** (for everyone) and **Transformation** (help with the change itself), plus **About us**.

## Files

| File | What it is |
|---|---|
| `index.html` | The homepage: hero with three tiles (leadership · people · the transformation itself), Frontier Watch, Academy, Transformation, Why now, values, contact. |
| `frontier-watch.html` | Frontier Watch: the sample monthly note, what you get, the Executive Briefing (`#briefing`), who it's for, questions. |
| `academy.html` | The Academy: five formats in three groups, each with "Read more" (`#foundations`, `#thinking`, `#tracks`, `#build-day`, `#champions`). A link to one of these anchors opens its "Read more". Old anchors (`#briefing`, `#sprint`, …) forward to their new page. |
| `transformation.html` | Transformation: six examples of where we help, how it starts. |
| `about.html` | About us. Shows Ben only; Niels' and Tim's profiles are ready in the file as a comment, to switch on once they agree. |
| `privacy.html` | The privacy page. It follows the settings in `site.js` (booking, analytics, company details), so it stays true. |
| `readiness.html` | The 90-second "Where are you with AI?" check. Answers stay in the browser. |
| `404.html` | Not-found page (GitHub Pages picks it up automatically). |
| `guidance.html`, `scan.html`, `audit.html`, `offers.html` | Old pages, kept only as redirects to `transformation.html` so old links keep working. |
| `styles.css` | All styling. Brand tokens are the CSS variables at the top (`:root`). Each product keeps one colour: Frontier Watch = mint, Academy = sky, Transformation = field, About us = gold. New components since 28 Sep 2026 are in the last block of the file. |
| `site.js` | The settings (see below), mobile menu, dropdown, "Read more" from links, reveal animation, count-up numbers, the slow turn of the hero S, footer year. |
| `assets/` | `logo/` (the logo files, see below), favicons and app icons made from the S, `og.png` share image (28 Sep 2026), `fonts/` (Newsreader + Figtree, OFL licence), `people/` (team photos go here), `logos/` (unused for now: the tools show as names). |
| `CNAME` | Tells GitHub Pages the custom domain is `sensemakers.be`. Don't rename. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |
| `robots.txt`, `sitemap.xml` | Search-engine housekeeping. |

## The logo and the S

The logo is the designer's: an S in two halves (pine and slate) with SENSEMAKERS beside it. The shapes on the site are traced from the designer's logo PDF until the final SVG files arrive.

| File | Use |
|---|---|
| `assets/logo/sensemakers-lockup.svg` | Header and footer of every page. |
| `assets/logo/sensemakers-lockup-on-dark.svg` | For dark backgrounds (not used on the site yet). |
| `assets/logo/sensemakers-mark.svg`, `…-mark-on-dark.svg` | The S on its own. |
| `assets/favicon.svg`, `favicon-32.png`, `favicon-256.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Browser tab and phone home screen. |

How the S is used, following one rule (one big moment, one moving moment, a few small marks with a job):

- **One big moment**: the two halves, oversized and soft, in the homepage hero (gold and mint), turning slowly as you scroll; and a faint S on the dark Frontier Watch band.
- **One moving moment**: the S turns while the readiness check works out your result.
- **Small marks with a job**: a crescent under the menu item of the page you're on, and before kickers, hero tiles and Academy groups, in the colour of the product. Body lists keep plain dots.
- **Photo frames**: a crescent peeking out behind each portrait on About us.

When the designer's final SVGs arrive: replace the files in `assets/logo/` and the icons, then the two S shapes that also sit inside `index.html` (hero and band), `readiness.html` (loader), `about.html` (frames) and the `--cres` line in `styles.css`. A Claude session can do this in one go.

## The settings

Open `site.js`. The top has five settings. Anything left empty stays hidden on the site, so no placeholder ever shows.

```js
var BOOKING_URL = "";      // Calendly link → every "Book a call" button opens it (empty: they open an email)
var CONTACT_EMAIL = "hello@sensemakers.be";
var LINKEDIN_URL = "";     // company page → "LinkedIn" appears in the footer
var LEGAL = { company: "", office: "", enterprise: "", rpr: "", vat: "" };
var ANALYTICS = "";        // Plausible: the script link it gives you, or just "sensemakers.be"
```

- **LEGAL**: the company details Belgian law asks for on a business website. Filled in, they appear in the footer of every page and in "Who we are" on the privacy page. If the company is called "Sensemakers BV", the line reads "Sensemakers BV"; otherwise "Sensemakers is a trade name of … BV".
- **BOOKING_URL**: when set, the privacy page also shows the paragraph about Calendly. If you use another booking tool, change the name in that paragraph of `privacy.html`.
- **ANALYTICS**: when set, Plausible loads and the privacy page says so. Keep it cookie-free: no Google Analytics, and link out to Calendly rather than embedding it, or the site needs a cookie banner.

## Go live on sensemakers.be (GitHub Pages + Combell DNS)

The site is already live from the GitHub repository `sensemakers-site` (GitHub Pages, custom domain `sensemakers.be`, DNS at Combell). To publish changes:

```bash
git add -A && git commit -m "Update copy" && git push
```

GitHub Pages redeploys in about a minute.

<details>
<summary>Setting it up from scratch</summary>

1. Put this folder in a **public** GitHub repository (`gh repo create sensemakers-site --public --source=. --remote=origin --push`).
2. On github.com → the repo → **Settings → Pages**: Source = Deploy from a branch, Branch = `main`, folder `/ (root)`. Custom domain: `sensemakers.be`.
3. In Combell → **Domain names → sensemakers.be → DNS**, remove any default `A` record or forwarding on `@`, then add `A @ 185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, `AAAA @ 2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`, and `CNAME www <your-github-username>.github.io.` Leave the MX records (email) alone.
4. Once the DNS check is green, tick **Enforce HTTPS** in Settings → Pages.

</details>

## Still to add when you have them

- The Calendly link, the company details, the LinkedIn page and (if wanted) Plausible: the settings above.
- Ben's photo: save it as `assets/people/ben-mellaerts.jpg` and follow the comment in `about.html`.
- The client names in Ben's bio, once each client agrees: the sentence is ready as a comment in `about.html`.
- Niels and Tim on About us, once they agree: fill in the surname, their past role and one result each, then remove the comment marks around their cards in `about.html`.
- The designer's final logo SVGs: see "The logo and the S" above. Colours and fonts, if the kit changes them, go in the tokens at the top of `styles.css`.
- The header and footer are the same on every page; when you change them, change them everywhere.

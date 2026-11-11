# sensemakers.be — website

Static site, no build step, no framework, no cookies. One stylesheet, one small script, self-hosted fonts. Anything in this folder is exactly what gets served.

Since 5 Nov 2026 (Round 17) the site is **the Academy only**: the homepage is the Academy, with five courses and a course finder, plus **About us**. Transformation and the AI Accelerator for SMEs left the site: their old addresses forward to the homepage, and their last versions are in the git history (commit `23cf19d`), should one of them come back. Frontier Watch keeps its own address for the interviews with AI leads, but nothing on the site links to it (see Round 17b).

## Round 17 (5 Nov 2026): Academy only

- **Homepage** (`index.html`): the brand headline stays (Building the human capability to lead your AI transformation), now with the Academy promise and one action, the course finder. Then the tools strip, before and after a course, why now, the five courses with the course finder, why it sticks and the team.
- **Menu** on every page: Courses (the five courses) · Course finder · About us. The **footer** follows the course groups: For everyone · For teams · For the organization · Sensemakers.
- **Course finder** (`./#finder`) takes over from the readiness check: three questions, one suggestion, and the S turns while it works one out. `readiness.html` forwards to it.
- **Course pages**: the breadcrumb starts at Courses, and they speak of courses (course 1 of 5, the other courses) instead of formats; nothing else changed.
- **About us**: the lead and "How we work" speak of courses only. The mission reads "the skills and judgment to get the most out of AI in a responsible way" (to confirm with Niels and Tim), without the three pillar links.
- **AI info** and `llms.txt` describe Sensemakers as an AI academy. Keep both in sync when the courses change.
- **Share image** (`assets/og.png`): the headline with three course names instead of the three products. Every page points to `og.png?v=2`, so LinkedIn fetches the new one.
- No longer used, safe to delete: `assets/logo/sensemakers-lockup-transformation.svg` and the Newsreader and Figtree fonts. The Transformation rules in `styles.css` are unused too.

## Round 17b (11 Nov 2026): Frontier Watch, unlisted

- `frontier-watch.html` is back for the interviews with AI leads: the 28 Oct page with today's header and footer, and its Academy links pointing to the courses.
- Nothing links to it: not in the menu, footer, sitemap, AI info or `llms.txt`, and `noindex` keeps it out of search engines. Share the link directly; `frontier-watch-draft.html` forwards to it.
- Its own share image (`assets/og-frontier-watch.png`), so a shared link doesn't show the Academy image. It still uses its orange (`.c-keep`) styles and `assets/logo/sensemakers-lockup-frontier-watch.svg`, so keep those.

## House rules

- American spelling (organization, program, license, practice).
- No client names anywhere on the site, the page source included.
- People are never tied to a course: team cards and portrait frames are brand green, roles name no course, and course pages say "From the Sensemakers team".
- Thinking with AI gets a quiet spotlight: first in the menu, the rail and the footer, a slightly wider card, course 1 of 5. The word "flagship" is not used on the site.
- The footer is the only closing call to action.

## Files

| File | What it is |
|---|---|
| `index.html` | The homepage, which is the Academy: hero, tools strip, before and after (`#change`), why now (`#why`), the five courses (`#courses`) with the course finder (`#finder`; its scores are in the script at the end of the page), why it sticks (`#labs`), the team (`#team`). |
| `thinking-with-ai.html`, `ai-foundations.html`, `ai-for-your-role.html`, `ai-build-day.html`, `ai-champions.html` | One page per course: At a glance (audience, group size, duration, format, start, trainer), outcomes, the program (click a module), what you leave with, trainers, the other courses. Group sizes and module timings are first proposals. |
| `about.html` | About us: vision and mission, Ben, Niels and Tim (bios and photos), how we work. |
| `privacy.html` | The privacy page. It follows the settings in `site.js` (booking, analytics, company details), so it stays true. |
| `ai-info.html`, `llms.txt` | Facts for AI assistants and search engines. Keep both in sync. Linked in the footer. |
| `404.html` | Not-found page (GitHub Pages picks it up automatically). |
| `academy.html`, `readiness.html` | Forward to the courses and the course finder on the homepage; the old anchors of `academy.html` still land on the right course. |
| `frontier-watch.html` | Frontier Watch for AI and data leads, unlisted (see Round 17b). `frontier-watch-draft.html` forwards to it. |
| `transformation.html`, `ai-accelerator.html`, `guidance.html`, `scan.html`, `audit.html`, `offers.html` | Pages that left the site, kept only as redirects to the homepage so old links keep working. |
| `styles.css` | All styling. Brand tokens are the CSS variables at the top (`:root`). The Academy is cerulean (`.c-work`), About us brand green (`.c-lead`). Round 17 rules are in the last block of the file. |
| `site.js` | The settings (see below), mobile menu, dropdown, "Read more" from links, reveal animation, count-up numbers, the course rail, footer year. |
| `assets/` | `logo/` (the logo files, see below), favicons and app icons made from the S, `og.png` share image (5 Nov 2026: evergreen, the headline and three course names), `og-frontier-watch.png` (the share image of the unlisted Frontier Watch page), `fonts/` (Work Sans, OFL license), `people/` (team photos), `logos/` (the tool logos in the tools strip: Claude, Copilot, ChatGPT, Gemini, Cursor, Codex, Lovable; replace a file to update a logo). |
| `CNAME` | Tells GitHub Pages the custom domain is `sensemakers.be`. Don't rename. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |
| `robots.txt`, `sitemap.xml` | Search-engine housekeeping. |

## The logo and the S

The logo is the designer's: an S in two halves with SENSEMAKERS beside it. Since Round 12 the site uses the single-colour version (`…-mono.svg`: pine S, ink word; `…-mono-on-dark.svg` on the dark homepage header); the two-tone files were removed on 18 Oct 2026. The S was checked against the designer's final SVG (Atelier Angèle, Oct 2026) and matches it; colours and font follow our own branding kit, not the designer's.

| File | Use |
|---|---|
| `assets/logo/sensemakers-lockup-mono.svg` | Header and footer of every page. |
| `assets/logo/sensemakers-lockup-mono-on-dark.svg` | Footer of every page (dark). |
| `assets/favicon.svg`, `favicon-32.png`, `favicon-256.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Browser tab and phone home screen: the S in one colour (pine), since 5 Oct 2026. |

How the S is used, following one rule (one big moment, one moving moment, a few small marks with a job):

- **One big moment**: the two halves, oversized and soft, drifting slowly in the homepage hero (mint on evergreen).
- **One moving moment**: the S turns while the course finder works out a suggestion.
- **Small marks with a job**: a crescent under the menu item of the page you're on, and before kickers and footer headings, in the colour of their context. Body lists keep plain dots.
- **Photo frames**: a crescent peeking out behind each portrait on About us.

When the designer's final SVGs arrive: replace the files in `assets/logo/` and the icons, then the two S shapes that also sit inside `index.html` (hero, course finder loader and team), `about.html` (frames) and the `--cres` line in `styles.css`. A Claude session can do this in one go.

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
- The designer's final logo SVGs: see "The logo and the S" above. Colours and fonts, if the kit changes them, go in the tokens at the top of `styles.css`.
- The header and footer are the same on every page (the Courses menu lists every course); when you change them, change them everywhere.

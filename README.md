# sensemakers.be — website

Static site, no build step, no framework, no cookies. One stylesheet, one small script, self-hosted fonts. Anything in this folder is exactly what gets served.

Since 11 Nov 2026 (Round 18) the site sells **one program, Thinking with AI**, in four modules of half a day, plus **keynotes** and an **AI hackathon**, all in **blue**. Since 5 Nov 2026 (Round 17) it is the Academy only: Transformation and the AI Accelerator for SMEs left the site (their old addresses forward to the homepage; their last versions are in the git history, commit `23cf19d`). Frontier Watch keeps its own address for the interviews with AI leads, but nothing on the site links to it (Round 17b).

## Round 18 (11 Nov 2026): Thinking with AI, in blue

- **The program**: Thinking with AI, four modules of half a day, in this order: **Understand** and **Think** work with any tool (for everyone); **Build** and **Scale** run in the client's own tool (for teams). Scale is never sold alone: it always comes after Build. Clients book all four or a few.
- **Homepage** (`index.html`): the hero, then the program with one row per module (what it is, the sales argument, what's inside), three starting points (everyone: Understand + Think · one team: Build + Scale · the full program) and a request button that writes an email with the chosen modules. Then the tools strip, why now, before and after, keynotes and the hackathon, the team.
- **Module pages**: `understand.html` (the AI Foundations half-day as designed: six stops, no tools), `think.html`, `build.html` (in Claude, ChatGPT, Copilot or Claude Code, beginner or advanced) and `scale.html` (after Build). Timings, group sizes and the Think, Build and Scale programs are first proposals.
- **Side products**: `keynotes.html` (three talks, drafts) and `hackathon.html` (the former AI Build Day, now the AI Hackathon).
- **Menu**: Thinking with AI (the program and its four modules) · Keynotes · Hackathon · About us. **Footer**: Thinking with AI · Also · Sensemakers.
- **Blue everywhere**: the greens in `styles.css` were swapped for blues (evergreen → `#185A90`, pine → `#1F6DAB`, mint → `#BFE3FA`, tints → `#E1F0FA` and `#F1F6FB`, canvas → `#F6F9FC`); the hero is `#1F6DAB`. The logo S, favicons, app icons and both share images (`og.png?v=3`, `og-frontier-watch.png?v=2`) are blue too.
- **Gone**: the course finder (the module picker replaces it; old `#finder` links land on the program) and the AI Champions Program. Old course pages forward: `thinking-with-ai.html` and `ai-champions.html` → the program, `ai-foundations.html` → Understand, `ai-for-your-role.html` → Build, `ai-build-day.html` → Hackathon.

## Round 17b (11 Nov 2026): Frontier Watch, unlisted

- `frontier-watch.html` is back for the interviews with AI leads: the 28 Oct page with today's header and footer, and its Academy links pointing to the program (since Round 18).
- Nothing links to it: not in the menu, footer, sitemap, AI info or `llms.txt`, and `noindex` keeps it out of search engines. Share the link directly; `frontier-watch-draft.html` forwards to it.
- Its own share image (`assets/og-frontier-watch.png`), so a shared link doesn't show the Academy image. It still uses its orange (`.c-keep`) styles and `assets/logo/sensemakers-lockup-frontier-watch.svg`, so keep those.

## House rules

- American spelling (organization, program, license, practice).
- No client names anywhere on the site, the page source included.
- People are never tied to a module: team cards and portrait frames are in the brand colour, roles name no module, and module pages say "From the Sensemakers team".
- Thinking with AI is the program and the hero of the site.
- Scale is never offered on its own.
- The footer is the only closing call to action.

## Files

| File | What it is |
|---|---|
| `index.html` | The homepage: hero, the program (`#program`: one row per module, matching its module page; the add/remove logic and the request email are in the script at the end of the page), tools strip, why now (`#why`), before and after (`#change`), keynotes and hackathon (`#more`), the team (`#team`). |
| `understand.html`, `think.html`, `build.html`, `scale.html` | One page per module: At a glance (audience, group size, duration, format, tool, trainer), outcomes, how the half-day runs (click a part), what you leave with, trainers, the other modules. |
| `keynotes.html`, `hackathon.html` | The two side products, in the same layout. |
| `about.html` | About us: vision and mission, Ben, Niels and Tim (bios and photos), how we work. |
| `privacy.html` | The privacy page. It follows the settings in `site.js` (booking, analytics, company details), so it stays true. |
| `ai-info.html`, `llms.txt` | Facts for AI assistants and search engines. Keep both in sync. Linked in the footer. |
| `404.html` | Not-found page (GitHub Pages picks it up automatically). |
| `frontier-watch.html` | Frontier Watch for AI and data leads, unlisted (see Round 17b). `frontier-watch-draft.html` forwards to it. |
| `thinking-with-ai.html`, `ai-foundations.html`, `ai-for-your-role.html`, `ai-build-day.html`, `ai-champions.html`, `academy.html`, `readiness.html` | Former course pages, now forwarding to the program, a module or the hackathon (the old anchors of `academy.html` too). |
| `transformation.html`, `ai-accelerator.html`, `guidance.html`, `scan.html`, `audit.html`, `offers.html` | Pages that left the site, kept only as redirects to the homepage so old links keep working. |
| `styles.css` | All styling. Brand tokens are the CSS variables at the top (`:root`). Round 18 rules (the program rows, keynote and hackathon cards, the blue hero) are in the last block of the file. |
| `site.js` | The settings (see below), mobile menu, dropdown, "Read more" from links, reveal animation, count-up numbers, footer year. |
| `assets/` | `logo/` (the logo files, see below), favicons and app icons made from the S, `og.png` share image (11 Nov 2026: blue, the headline and Thinking with AI), `og-frontier-watch.png` (the share image of the unlisted Frontier Watch page), `fonts/` (Work Sans, OFL license), `people/` (team photos), `logos/` (the tool logos in the tools strip; replace a file to update a logo). |
| `CNAME` | Tells GitHub Pages the custom domain is `sensemakers.be`. Don't rename. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |
| `robots.txt`, `sitemap.xml` | Search-engine housekeeping. |

## The logo and the S

The logo is the designer's: an S in two halves with SENSEMAKERS beside it. Since Round 12 the site uses the single-colour version (`…-mono.svg`: blue S since Round 18, ink word; `…-mono-on-dark.svg`: light-blue S and white word, in the footer); the two-tone files were removed on 18 Oct 2026. The S was checked against the designer's final SVG (Atelier Angèle, Oct 2026) and matches it; colours and font follow our own branding kit, not the designer's.

| File | Use |
|---|---|
| `assets/logo/sensemakers-lockup-mono.svg` | Header and footer of every page. |
| `assets/logo/sensemakers-lockup-mono-on-dark.svg` | Footer of every page (dark). |
| `assets/favicon.svg`, `favicon-32.png`, `favicon-256.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Browser tab and phone home screen: the S in one colour (blue since 11 Nov 2026). |

How the S is used, following one rule (one big moment, one moving moment, a few small marks with a job):

- **One big moment**: the two halves, oversized and soft, drifting slowly in the homepage hero (light on blue).
- **One moving moment**: the turning S left with the course finder in Round 18; bring it back where a wait needs one.
- **Small marks with a job**: a crescent under the menu item of the page you're on, and before kickers and footer headings, in the colour of their context. Body lists keep plain dots.
- **Photo frames**: a crescent peeking out behind each portrait on About us.

When the designer's final SVGs arrive: replace the files in `assets/logo/` and the icons, then the two S shapes that also sit inside `index.html` (hero and team), the module pages (trainer), `about.html` (frames) and the `--cres` line in `styles.css`. A Claude session can do this in one go.

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
- The header and footer are the same on every page (the Thinking with AI menu lists every module); when you change them, change them everywhere.

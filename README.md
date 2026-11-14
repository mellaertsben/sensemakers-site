# sensemakers.be — website

Static site, no build step, no framework, no cookies. One stylesheet, one small script, self-hosted fonts. Anything in this folder is exactly what gets served.

Since 13 Nov 2026 (Round 20) the site sells **one program, Making Sense of AI**, in three modules of half a day and two parts: **Thinking with AI** (Understand, Think) and **Building with AI** (Build, with an optional follow-up session), plus **keynotes** and an **AI hackathon**, all in **blue** (Round 18). Since 11 Nov 2026 (Round 19) the site is in **Dutch** (at the root) and **English** (under `en/`), with a language switch in the header. Since 5 Nov 2026 (Round 17) it is the Academy only: Transformation and the AI Accelerator for SMEs left the site (their old addresses forward to the homepage; their last versions are in the git history, commit `23cf19d`). Frontier Watch keeps its own address for the interviews with AI leads, but nothing on the site links to it (Round 17b).

## Round 21 (14 Nov 2026): what the research says

Ben chose between two mockups: the research figures as a band on the homepage (A), or as a block in the questions (B). He went for A.

- **A band in the old `#why` slot**, above "Wat er verandert" / "What changes": the kicker "Wat het onderzoek zegt", the heading "Gebruik komt niet vanzelf. Oordeel ook niet." and three figures. Each figure has a label (the barrier, the lever, the risk), its source with year and sample, and a link to the original: the AI-barometer 2025 (ECOOM, UGent), Humlum & Vestergaard 2026 and the imec.digimeter 2025. One closing line: use and judgment, in the same program. `#why` is a section again; the empty span in `#change` is gone.
- **One sentence under "Wat er verandert" / "What changes"**: "Toegang is het probleem niet meer. Vaardigheid en oordeel wel." became "Toegang alleen is niet genoeg. Je mensen hebben ook vaardigheid en oordeel nodig." (EN: "Access alone isn't enough. Your people also need skill and judgment."), because the band above it shows tools as one of three things that raise use.
- **The figures and their caveats** are in `sales/evidence-activation.md` in the Sensemakers project. Change a figure there first, then here, in both languages. The imec.digimeter is named after the year of its fieldwork: the 2025 edition came out in March 2026 (the VRT article links it as "digimeter 2026").
- **No count-up** on these numbers: the script counts in whole numbers, and 72,5% has a decimal. The figures reuse `.stat`, so they fade in on scroll.
- **New in `styles.css`** (last block): `.ev-band`, `.ev-head`, `.ev-grid`, `.ev-k`, `.ev-close`, and the `.stat` rules inside `.ev-band`. The older `.why-band` rules stay in the file, unused. `styles.css` and `site.js` are at `?v=24`.

## Round 20 (13 Nov 2026): Making Sense of AI, people first

Ben's feedback on the whole site, and three choices he made: the program name, Scale and the main title.

- **The program is Making Sense of AI.** "Thinking with AI" only fitted Think. It now names the first part (Understand + Think, any tool, for everyone); the second part is **Building with AI** (Build, in the client's own tool, for teams). The menu, the footer, titles, crumbs, email subjects, AI info and `llms.txt` follow.
- **Three modules.** Scale is no longer a module: it is an optional **follow-up session** after Build, a few weeks later (`build.html#followup`): look back, share what works, agree who owns and checks what. No business cases. It is an option to add: not in the picker, without a price or a length on the site, priced in the proposal. `scale.html` forwards there, in both languages, and left the sitemap. The picker in `site.js` has three rows.
- **People first.** The main title is "Zet je mensen centraal in je AI-transformatie." / "Put your people at the center of your AI transformation." (hero, footer claim, share images). The line under it is about control and confidence, not about the format.
- **Homepage.** Think carries a **Flagship** mark. The "why now" band with three statistics is gone (an empty `#why` span keeps old links working). New before-and-after rows (thinking errors, risks, a tangible picture of digital, fundamentals that outlast the tool). Keynotes and the hackathon sit under "Laat je inspireren" / "Get inspired". New team lines. Two rewritten answers (we already did an AI training; how many people per session).
- **Module pages.** Outcomes rewritten. "How the half-day runs" is a real agenda with clock times: per part a question, what people do and the sentence they keep (Understand follows the run sheet, Think the trainer deck; Build is a proposal). "What you leave with" shows the card itself next to the list of what each participant and HR or L&D get. The trainers block is one link to About us. Groups are up to 20 people everywhere.
- **Keynotes.** About inspiring: three keynotes, each with its message and the moment the audience remembers; no fixed length.
- **About us.** New title ("De technologie is er. Je mensen maken het verschil.") and new texts for Ben, Niels and Tim.
- **AI Act wording.** Since 27 July 2026 Article 4 asks employers to take measures that support AI literacy. The site says Understand "supports the AI literacy the EU AI Act asks for"; it no longer says it "covers the duty".
- **New in `styles.css`** (last block): `.mr-flag`, `.agenda`, `.followup`, `.take` and `.tcard`, `.tr-link`, `.others--3`. `styles.css` and `site.js` are at `?v=23`; share images at `og-nl.png?v=2` and `og.png?v=4`.

## Round 19 (11 Nov 2026): Dutch and English, and lessons from ai.nl and Rozet

- **Two languages.** Dutch at the root (`index.html`, `understand.html`, …), English under `en/` with the same file names. Every page has a NL | EN switch in the header (a link in the phone menu), `hreflang` links in its head, and both versions are in `sitemap.xml`. Frontier Watch stays English only. `404.html` is one page with both languages.
- **Homepage, new sections:** pain points (`#pains`, each linking to the module that solves it), prices in the program rows and the summary, how it works (`#how`: a free 30-minute call, a proposal, the sessions) and questions with visible answers (`#faq`). The free call is also the button in the header.
- **New settings** in `site.js`: prices and the proposal time. Empty, they stay hidden (see "The settings").
- A strip of facts under the hero (12 Nov) was taken out again at Ben's request.
- The program picker moved from the end of `index.html` into `site.js` (`program()`); its words come from the `data-i18n` attribute of `#program`.
- **Share images:** `assets/og-nl.png` for the Dutch pages, `assets/og.png` for the English ones.
- `llms.txt` stays English and links to the English pages.

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
- Making Sense of AI is the program and the hero of the site. Thinking with AI (Understand, Think) and Building with AI (Build) are its two parts. Think is the flagship and may be labeled so.
- Scale is not a module anymore: what it did is an optional follow-up session after Build (an option to add, never "included"). Never sell business cases to participants.
- Words we don't use in Dutch: "haltes" (never, in any document), "flessenhals", "menselijk vermogen", "de hele zaal". Don't give a keynote a fixed length.
- Groups are up to 20 people per session; anything is possible, larger groups get several sessions.
- The AI Act: Understand supports the AI literacy the Act asks for. Never call it a duty to reach a level, and never say a module "covers the duty".
- Bias belongs to Think. Understand is about digital, data and statistics.
- The agenda on a module page is the program as it is given, with something to do in every part. Not a list of titles.
- The footer is the only closing call to action.
- Every figure on the site shows its source, year and sample, and links to the original. No figure from a seller of AI training, and no return in euros.
- Every page exists in Dutch and English, with the same file name (Dutch at the root, English in `en/`): change both. Dutch copy uses "je".

## Files

| File | What it is |
|---|---|
| `index.html` | The homepage in Dutch (`en/index.html` in English): hero, pain points (`#pains`), the program (`#program`: one row per module in two parts, matching its module page; the add/remove logic and the request email are `program()` in `site.js`), how it works (`#how`), tools strip, what the research says (`#why`), before and after (`#change`), keynotes and hackathon (`#more`), the team (`#team`), questions (`#faq`). |
| `en/` | The English site: the same pages and file names as the Dutch root. |
| `understand.html`, `think.html`, `build.html` | One page per module, in both languages: At a glance (audience, group size, duration, format, tool, price once set, trainer), outcomes, how the half-day runs (an agenda with clock times), what you leave with (the card and the list), a link to About us for the trainers, the other modules. `build.html` also holds the optional follow-up session (`#followup`) and the tool editions. |
| `scale.html` | Forwards to `build.html#followup`, in both languages (Scale was a module until 13 Nov 2026; it is now the optional follow-up session after Build). |
| `keynotes.html`, `hackathon.html` | The two side products, in the same layout. |
| `about.html` | About us: vision and mission, Ben, Niels and Tim (bios and photos), how we work. |
| `privacy.html` | The privacy page. It follows the settings in `site.js` (booking, analytics, company details), so it stays true. |
| `ai-info.html`, `en/ai-info.html`, `llms.txt` | Facts for AI assistants and search engines. Keep all three in sync. Linked in the footer. |
| `404.html` | Not-found page in Dutch, with an English line (GitHub Pages shows it for any missing address). |
| `frontier-watch.html` | Frontier Watch for AI and data leads, unlisted and English only (see Round 17b). `frontier-watch-draft.html` forwards to it. |
| `thinking-with-ai.html`, `ai-foundations.html`, `ai-for-your-role.html`, `ai-build-day.html`, `ai-champions.html`, `academy.html`, `readiness.html` | Former course pages, now forwarding to the program, a module or the hackathon (the old anchors of `academy.html` too). `thinking-with-ai.html` forwards to the program, of which Thinking with AI is now the first part. |
| `transformation.html`, `ai-accelerator.html`, `guidance.html`, `scan.html`, `audit.html`, `offers.html` | Pages that left the site, kept only as redirects to the homepage so old links keep working. |
| `styles.css` | All styling. Brand tokens are the CSS variables at the top (`:root`). The Round 18 rules (program rows, keynote and hackathon cards, blue hero), Round 19 rules (language switch, pain points, prices, how it works, questions), Round 20 rules (flagship mark, agenda, follow-up session, take-home card, trainers link) and Round 21 rules (the research band) are the last four blocks of the file. |
| `site.js` | The settings (see below), the program picker, mobile menu, dropdown, "Read more" from links, reveal animation, count-up numbers, footer year. |
| `assets/` | `logo/` (the logo files, see below), favicons and app icons made from the S, `og.png` and `og-nl.png` share images (English and Dutch: blue, the headline and Making Sense of AI), `og-frontier-watch.png` (the share image of the unlisted Frontier Watch page), `fonts/` (Work Sans, OFL license), `people/` (team photos), `logos/` (the tool logos in the tools strip; replace a file to update a logo). |
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

Open `site.js`. The settings are at the top. Anything left empty stays hidden on the site, in both languages, so no placeholder ever shows.

```js
var BOOKING_URL = "";      // Calendly link → every "Book a call" button opens it (empty: they open an email)
var CONTACT_EMAIL = "hello@sensemakers.be";
var LINKEDIN_URL = "";     // company page → "LinkedIn" appears in the footer
var LEGAL = { company: "", office: "", enterprise: "", rpr: "", vat: "" };
var PRICE_MODULE = "";     // from-price of one half-day module for one group, whole euros excl. VAT, e.g. "3500"
var PRICE_PROGRAM = "";    // optional: all three modules together; empty = three times PRICE_MODULE
var PROPOSAL_DAYS = "";    // working days between the free call and the proposal, e.g. "2"
var ANALYTICS = "";        // Plausible: the script link it gives you, or just "sensemakers.be"
```

- **LEGAL**: the company details Belgian law asks for on a business website. Filled in, they appear in the footer of every page and in "Who we are" on the privacy page. If the company is called "Sensemakers BV", the line reads "Sensemakers BV"; otherwise "Sensemakers is a trade name of … BV".
- **BOOKING_URL**: when set, the privacy page also shows the paragraph about Calendly. If you use another booking tool, change the name in that paragraph of `privacy.html`.
- **PRICE_MODULE / PRICE_PROGRAM**: filled in, prices appear in the program rows and total on the homepage, on the module pages and in the questions, written the way each language writes them (€ 3.500 and €3,500). Empty: no prices anywhere, and the questions say the price depends on the modules.
- **PROPOSAL_DAYS**: step 2 of how it works then reads "Een voorstel binnen 2 werkdagen" / "A proposal within 2 working days"; empty, it reads "Een voorstel op maat" / "A tailored proposal".
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
- Prices and the proposal time: the settings above.
- The designer's final logo SVGs: see "The logo and the S" above. Colours and fonts, if the kit changes them, go in the tokens at the top of `styles.css`.
- The header and footer are the same on every page, in both languages (the Making Sense of AI menu lists every module, grouped in its two parts); when you change them, change them everywhere.
- Build: its agenda is a proposal, and the length and price of the follow-up session are not set. Align both with whoever delivers Build.
- The three keynotes are drafts.

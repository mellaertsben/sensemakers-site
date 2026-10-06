#!/usr/bin/env python3
"""
Sensemakers site builder: one layout per page, one text file per language.

  src/pages/<page>.html        the layout, with {{key}} where text goes
  src/partials/*.html          head, header, footer (shared by every page)
  src/text/<page>.en.txt       English texts   (key: text, one per line)
  src/text/<page>.nl.txt       Dutch texts
  src/text/common.<lang>.txt   texts in the header and footer

Run from the site folder:   python3 tools/build.py
English pages are written to the site root, Dutch pages to nl/.
The build stops if a text is missing in either language, so a half-translated
page never goes live. Pages without a layout in src/pages stay hand-written (English only).
"""
import os, re, sys, urllib.parse, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
LANGS = {'en': {'out': '', 'root': '', 'locale': 'en_GB'},
         'nl': {'out': 'nl', 'root': '../', 'locale': 'nl_BE'}}
SITE = 'https://sensemakers.be/'

def read_text(name, lang):
    path = os.path.join(SRC, 'text', f'{name}.{lang}.txt')
    out = {}
    if not os.path.exists(path):
        return out
    for n, line in enumerate(open(path, encoding='utf-8'), 1):
        line = line.rstrip('\n')
        if not line.strip() or line.lstrip().startswith('#'):
            continue
        if ':' not in line:
            sys.exit(f'{path}:{n}: expected "key: text"')
        k, v = line.split(':', 1)
        out[k.strip()] = v.strip()
    return out

def partial(name):
    return open(os.path.join(SRC, 'partials', name + '.html'), encoding='utf-8').read()

pages = sorted(f[:-5] for f in os.listdir(os.path.join(SRC, 'pages')) if f.endswith('.html'))
built = {p + '.html' for p in pages}
problems = []

for page in pages:
    layout = open(os.path.join(SRC, 'pages', page + '.html'), encoding='utf-8').read()
    meta = dict(re.findall(r'(\w+)=(\S+)', re.match(r'<!--page (.*?)-->\n', layout).group(1)))
    layout = re.sub(r'^<!--page .*?-->\n', '', layout)
    fname = page + '.html'
    path_en = '' if page == 'index' else fname
    for lang, cfg in LANGS.items():
        t = {**read_text('common', lang), **read_text(page, lang)}
        url = SITE + (cfg['out'] + '/' if cfg['out'] else '') + path_en
        alt = {l: SITE + (c['out'] + '/' if c['out'] else '') + path_en for l, c in LANGS.items()}
        doc = layout
        for name in ('head', 'header', 'footer'):
            doc = doc.replace('{{>' + name + '}}', partial(name))
        active = meta.get('active', 'none')
        for a in ('fw', 'academy', 'tr', 'about'):
            doc = doc.replace('{{act_' + a + '}}', ' active' if a == active else '')
            doc = doc.replace('{{cur_' + a + '}}', ' aria-current="page"' if a == active else '')
        def href_for(l):
            target = '' if page == 'index' else fname
            if l == lang: return target or './'
            return ('nl/' if l == 'nl' else '../') + target
        toggle = ('<div class="lang-toggle" aria-label="{{lang_label}}">' + ''.join(
            f'<a href="{href_for(l)}" hreflang="{l}" lang="{l}"' + (' class="on" aria-current="true"' if l == lang else '') + f'>{l.upper()}</a>'
            for l in ('en', 'nl')) + '</div>')
        doc = doc.replace('{{toggle}}', toggle)
        doc = doc.replace('{{alternates}}', '\n'.join(
            [f'<link rel="alternate" hreflang="{l}" href="{u}">' for l, u in alt.items()]
            + [f'<link rel="alternate" hreflang="x-default" href="{alt["en"]}">']))
        fixed = {'lang': lang, 'root': cfg['root'], 'canonical': url, 'og_locale': cfg['locale'], 'theme': meta.get('theme', '#FBFAF7')}
        def sub(m):
            key = m.group(1)
            if key.startswith('mail:'):
                k = key[5:]
                if k not in t:
                    problems.append(f'{lang}: missing "{k}" ({page})'); return ''
                return 'mailto:hello@sensemakers.be?subject=' + urllib.parse.quote(html.unescape(t[k]), safe='')
            if key in fixed: return fixed[key]
            if key not in t:
                problems.append(f'{lang}: missing "{key}" ({page})'); return ''
            return t[key]
        for _ in range(2):
            doc = re.sub(r'\{\{([\w:]+)\}\}', sub, doc)
        if lang == 'nl':
            # links to pages that have no Dutch version yet point to the English page
            def fix(m):
                href = m.group(1); p = href.split('#')[0]
                if p.endswith('.html') and '/' not in p and p not in built:
                    return 'href="../' + href + '"'
                return m.group(0)
            doc = re.sub(r'href="([^"]+)"', fix, doc)
        out_dir = os.path.join(ROOT, cfg['out'])
        os.makedirs(out_dir, exist_ok=True)
        open(os.path.join(out_dir, fname), 'w', encoding='utf-8').write(doc)

# texts that exist in one language but not the other
for page in pages + ['common']:
    en, nl = read_text(page, 'en'), read_text(page, 'nl')
    for k in sorted(set(en) ^ set(nl)):
        problems.append(f'{page}: "{k}" exists in {"en" if k in en else "nl"} only')

if problems:
    print('Build stopped. Fix these first:\n  ' + '\n  '.join(sorted(set(problems))))
    sys.exit(1)
print(f'Built {len(pages)} page(s) in {len(LANGS)} languages: ' + ', '.join(pages))

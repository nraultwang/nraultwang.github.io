# Website Architecture & Software Stack

Reference doc for the single-column Jekyll site at nraultwang.github.io.

## Core Framework: Jekyll on GitHub Pages

Jekyll takes Markdown, Liquid templates, and CSS and compiles them to static HTML in `_site/`.
GitHub Pages runs Jekyll natively — no GitHub Actions or build pipeline needed. Push to `main`
and it builds automatically.

## Layout Architecture

Single centered reading column (720px wide) with an optional sticky right ToC rail:

```
┌─────────────────────────────────────┐
│           top-header (nav)          │  fixed, 56px
├──────────────┬──────────────────────┤
│              │                      │
│  .main-content (720px max-width)    │  .layout-wrapper (flex center)
│              │  .sidebar-right      │  becomes grid (1fr 220px) when
│              │  (ToC, sticky)       │  page has layout='post' or toc:true
│              │                      │
└──────────────┴──────────────────────┘
```

The ToC is auto-generated from h2/h3 headings in #main-content via JavaScript.
It appears only when `page.layout == 'post'` or `page.toc == true`.

Margin notes float into the right gutter at viewports ≥1100px; collapse to inline below that,
and always inline on post pages (the ToC rail occupies that space).

## Directory Structure

- `_config.yml` — Jekyll config (site metadata, exclude list, kramdown/MathJax)
- `_layouts/default.html` — master template: head, top nav, layout-wrapper, scripts
- `_layouts/post.html` — thin wrapper that sets toc:true and inherits default
- `_includes/` — reusable Liquid snippets: figure.html, callout.html, marginnote.html,
  video.html, plotly.html
- `_posts/` — Markdown blog posts (YYYY-MM-DD-title.md)
- `_templates/` — starter files: post_template.md (with snippet cheat-sheet), project_template.md
- `assets/css/style.css` — all styling; CSS variables at :root and [data-theme="dark"]
- `assets/js/figures.js` — code-copy button injection
- `search.json` — Jekyll template generating the Fuse.js search index
- `index.html` — home page (lean identity + 3 highlights)
- `posts.html` — writing feed (reverse-chron list)
- `research.html` — full research record (projects, pubs, education, coursework)
- `proj*_web/`, `final_proj_web/` — static CS180 write-ups; externally linked URLs, do not rename

## Third-Party Integrations (all via CDN, no npm)

| Library | Version | Purpose |
|---|---|---|
| Fuse.js | 6.6.2 | Client-side fuzzy search (⌘K) |
| MathJax 3 | latest | LaTeX rendering ($...$ and $$...$$) + copy-tex |
| Highlight.js | 11.8 | Syntax highlighting |
| Plotly | 2.32 | Interactive charts |
| Inter + Fira Code | Google Fonts | Typography |

## Design Tokens (CSS variables)

Key variables in `assets/css/style.css :root`:

```css
--content-width: 720px
--nav-height: 56px
--font-body: 'Inter', sans-serif
--font-mono: 'Fira Code', monospace
--font-size-base: 17px
--line-height-base: 1.75
--color-accent: #1a56db (light) / #5b8def (dark)
```

Dark mode via `[data-theme="dark"]` attribute on `<html>`. Persists in `localStorage`.

## Component Library (_includes/)

| Include | Usage |
|---|---|
| `figure.html` | `{% include figure.html src=… caption=… wide=true %}` |
| `callout.html` | `{% include callout.html title=… body=_body type="warning" %}` |
| `marginnote.html` | `{% include marginnote.html text="…" %}` |
| `video.html` | `{% include video.html src=… caption=… wide=true %}` |
| `plotly.html` | `{% include plotly.html div_id=… height=… %}` |

## Image Optimization (CS180 project pages)

All `proj*_web/` images are optimized in place (filenames/paths unchanged — externally linked).
Strategy: sips to cap long edge at 2048px (JPEG q85), lazy-loading on all `<img>` tags,
GIFs converted to MP4 via ffmpeg and replaced with `<video autoplay loop muted playsinline>`.
Result: ~642MB → ~318MB across the project folders.

Recipe for future re-runs:
```bash
# Downscale only files >2048px AND >300KB (avoids re-encoding already-small images)
sips -Z 2048 -s formatOptions 85 <file.jpg>   # JPEG
sips -Z 2048 <file.png>                        # PNG (skip if sips would inflate it)

# GIF → MP4
ffmpeg -i in.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
       -c:v libx264 -pix_fmt yuv420p -movflags +faststart -crf 23 -preset slow out.mp4
```

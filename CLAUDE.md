# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bundle install              # install Ruby gems (first time / after Gemfile changes)
bundle exec jekyll serve    # serve at http://localhost:4000 with live reload
bundle exec jekyll build    # build into _site/ without serving
npm install                 # install ESLint (JS linting only; not needed for build)
npm run lint                # ESLint check on assets/js/
```

GitHub Pages builds Jekyll automatically on push to `main` — no CI/CD needed.

## Architecture

**Jekyll static site.** The build pipeline converts Markdown + Liquid templates → pure HTML in `_site/`. No custom plugins — stays compatible with GitHub Pages' native Jekyll build.

### Layout

Two-column grid with a sticky left nav and a centered reading column. The right gutter is free for floating sidenotes and margin notes at wide viewports.

```
top-header (sticky, full-width)
  site-title   [mobile nav links — hidden on desktop]   → CV ↗ | search | dark mode

layout-wrapper (CSS grid: [1fr] [--sidebar-width] [--sidebar-gap] [--content-width] [1fr])
  aside.sidebar-left (sticky) ← site nav + "§" ToC; hidden ≤bp-sidebar-hide
    Home / Blog / Projects / Research
    §
    Section A          ← auto-injected by JS when page has h2 headings
    ...

  main.main-content
    breadcrumbs
    {{ content }}        ← sidenotes/marginnotes float right at ≥1360px (bp-note-float)
    footer
```

### CSS design tokens

All layout geometry lives in `:root` in `style.css`. **Change values there, not at call sites.**

**Typography & chrome**

| Variable | Default | Purpose |
|---|---|---|
| `--font-body` | Inter | Body + UI font stack |
| `--font-mono` | Fira Code | Code font |
| `--nav-height` | 56px | Sticky top-nav height |
| `--content-pad` | 40px (20px mobile) | Horizontal padding inside `.main-content` |

**Grid layout** (fixed cols: sidebar-width + sidebar-gap + content-width)

| Variable | Default | Purpose |
|---|---|---|
| `--content-width` | 760px | Reading column width |
| `--sidebar-width` | 160px | Left nav sidebar width |
| `--sidebar-gap` | 80px | Gap between sidebar right edge and content |

**Floating annotations** (sidenotes, marginnotes)

| Variable | Default | Purpose |
|---|---|---|
| `--note-width` | 160px | Width of a floating note in the right gutter |
| `--note-gap` | 20px | Space between content right edge and note left edge |
| `--note-popup-width` | 240px | Width of the hover-tooltip popup (narrow viewports) |

`margin-right` on floating notes = `calc(-1 * (--note-width + --note-gap))` — pulls the note out of flow. Note reach = 160 + 20 = 180px of right gutter required.

**Figure breakouts**

| Variable | Default | Purpose |
|---|---|---|
| `--breakout-wide` | 60px | Extra width per side for `figure.wide` |
| `--breakout-full` | 120px | Extra width per side for `figure.full-bleed` |

**Colors** — all in `[data-theme="dark"]` overrides; never hardcode colors outside `:root`.

### Responsive breakpoints

CSS custom properties **cannot be used inside `@media` conditions** (a CSS spec rule, not a browser bug — all browsers reject it identically). Breakpoints are therefore hardcoded, but each is derived from the variables above. The derivation table lives in `style.css` just before the `@media` blocks:

| Name | Value | Formula |
|---|---|---|
| `bp-note-float` | 1360px | fixed-cols + 2 × (note-width + note-gap) = 1000 + 360 |
| `bp-sidebar-hide` | 1040px | fixed-cols + 40px buffer = 1000 + 40 |
| `bp-mobile` | 720px | tighten chrome |
| `bp-xs` | 480px | scale type, stack cards |

**If you change a grid variable, recalculate and update the `@media` breakpoints using the formulas above.**

### Key files

| File | Role |
|---|---|
| `_layouts/default.html` | Master template: head, nav, layout, search modal, dark mode, ToC JS, all CDN scripts |
| `_layouts/post.html` | Thin wrapper for `_posts/` entries (inherits default.html) |
| `assets/css/style.css` | All styling — CSS variables, typography, layout, components, dark mode, responsive |
| `assets/js/figures.js` | Code-copy buttons injected into `<pre>` blocks |
| `_config.yml` | Jekyll config: title, description, URL, `cv_url`, kramdown/MathJax |
| `search.json` | Jekyll template → JSON array; indexes posts + 4 main pages only (excludes proj*_web) |
| `index.html` | Home page (lean: identity + trajectory + 3 highlights) |
| `blog.html` | Blog feed (reverse-chron list) |
| `projects.html` | Class/hobby projects (CS180, EECS151 CPU) — visual cards with thumbnails |
| `research.html` | Active research: projects, pubs, education |

### CSS design tokens (in `style.css :root`)

| Variable | Purpose |
|---|---|
| `--content-width` | Max width of reading column (760px) |
| `--content-pad` | Horizontal padding inside main-content (40px; 20px on mobile) |
| `--nav-height` | Sticky nav height (56px) |
| `--font-body` | Body + UI font (Inter) |
| `--font-mono` | Code font (Fira Code) |

All color tokens (`--text-main`, `--bg-main`, `--link-color`, etc.) switch automatically via `[data-theme="dark"]`.

### Third-party integrations (CDN, no npm)

| Tool | Version | Where |
|---|---|---|
| MathJax 3 | latest | `_layouts/default.html` `<head>` — `$...$` inline, `$$...$$` display |
| Highlight.js | 11.8 | CDN CSS + JS in `<head>` |
| Fuse.js | 6.6.2 | CDN script; search index built from `search.json` |
| Plotly | 2.32.0 | Loaded on-demand (CDN) in posts that use it |

## Component library (`_includes/`)

Every include is a one-liner in Markdown posts:

```liquid
{% include figure.html src="/path/to/img.png" caption="Caption." wide=true %}
{% include callout.html title="Note" body=_body type="warning" %}
{% include marginnote.html text="Appears in right gutter on wide screens." %}
{% include sidenote.html num=1 text="Numbered citation; HTML allowed in text." %}
{% include video.html src="/path/to/demo.mp4" caption="Caption." %}
{% include plotly.html div_id="my-chart" height="420px" %}
```

See `_templates/post_template.md` for the full snippet cheat-sheet (copy-paste examples for every component, math, code, and raw JS).

### Margin notes and sidenotes

Floating margin notes (`{% include marginnote.html text="..." %}`) and numbered sidenotes (`{% include sidenote.html num=1 text="..." %}`) appear in the right gutter at ≥`bp-note-float` (1360px). Below that they become hover-popup tooltips — the `†` / superscript is the trigger. There is no right sidebar or `has-toc` variant — the right `1fr` gutter is always free for annotations.

### Figure width options

```html
<figure>            <!-- normal inline figure -->
<figure class="wide">       <!-- breaks outside content padding both sides -->
<figure class="full-bleed"> <!-- even wider -->
```

Or via the include: `wide=true` / `full_bleed=true`.

## Adding new content

### New post

1. Copy `_templates/post_template.md` → `_posts/YYYY-MM-DD-title.md`
2. Fill front matter (title, date). The left sidebar automatically shows an "On this page" section when the post has h2 headings — no extra front matter needed.
3. Write Markdown; use includes for figures/math/charts
4. Put media in `assets/posts/YYYY-MM-DD-title/`

### New project page

1. Copy `_templates/project_template.md`, rename, set `category: research`
2. Link from `research.html` under the relevant section

### New nav page

Pages at the root render at `/<filename>` URLs. The nav links in `_layouts/default.html` (`header-nav`) must be updated manually (there are only three: Home, Writing, Research).

## Image optimization recipe

For new per-post images: keep originals ≤2048px long edge. For legacy CS180 images (`proj*_web/`):

```bash
# Downscale JPEG in place
sips -Z 2048 -s format jpeg -s formatOptions 85 path/to/image.jpg

# Downscale PNG in place (stays PNG, just smaller)
sips -Z 2048 path/to/image.png

# Convert GIF → MP4 (then swap <img> for <video> in HTML)
ffmpeg -i animation.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
       -c:v libx264 -pix_fmt yuv420p -movflags +faststart out.mp4
```

**Critical:** never rename, move, or delete `proj*_web/` folders or their internal filenames — these URLs are externally linked (e.g., CS180 class site → `proj2_web/`).

## Linting

ESLint is configured in `eslint.config.js` for `assets/js/*.js`.
Run `npm run lint` after editing `assets/js/figures.js` or any new JS file added there.
Inline `<script>` blocks in Liquid templates are not linted — follow the same style conventions manually (single quotes, semicolons, `const`/`let`, 4-space indent).

**TypeScript:** not set up. The JS in this project is minimal enough that JSDoc annotations + ESLint cover correctness. If you write complex standalone interactive widgets (D3, WebGL, custom physics), consider compiling them separately with esbuild and committing the output to `assets/js/` — but don't add a compile step to the main site build.

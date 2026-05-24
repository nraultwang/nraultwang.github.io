# Nicolas Rault-Wang | Personal Website

Personal academic and research website, hosted on GitHub Pages and powered by Jekyll.
No build pipeline needed — GitHub Pages builds Jekyll automatically on push to `main`.

## Local development

```bash
bundle install             # first time / after Gemfile changes
bundle exec jekyll serve   # preview at http://localhost:4000 (live reload)
npm install                # install ESLint (once; for JS linting only)
npm run lint               # check assets/js/ with ESLint
```

## Writing a post

1. Copy `_templates/post_template.md` → `_posts/YYYY-MM-DD-your-title.md`
2. Fill in the YAML front matter (title, date; add `toc: true` for a Table of Contents)
3. Write in Markdown. Use the snippet cheat-sheet at the bottom of the template for figures, math, callouts, Plotly charts, and videos
4. Put per-post media in `assets/posts/YYYY-MM-DD-your-title/`
5. Commit and push

## Adding a project page

1. Copy `_templates/project_template.md` to the root (or a subfolder) and rename it
2. Set `layout: default` and `category: research` in the front matter
3. Link it from `research.html` under the relevant section

## Site structure

```
_layouts/
  default.html    — master template (nav, layout, search, dark mode, ToC)
  post.html       — thin wrapper for _posts/ entries; sets toc:true via layout
_includes/
  figure.html     — {% include figure.html src=… caption=… wide=true %}
  callout.html    — {% include callout.html title=… body=_body type="warning" %}
  marginnote.html — {% include marginnote.html text=… %} (floats in right gutter)
  video.html      — {% include video.html src=… caption=… %}  (for MP4 / ex-GIFs)
  plotly.html     — {% include plotly.html div_id=… height=… %}
_posts/           — Markdown blog posts (YYYY-MM-DD-title.md)
_templates/       — post_template.md, project_template.md (starters + snippet cheat-sheet)
assets/
  css/style.css   — all styling (CSS variables, typography, layout, dark mode)
  js/figures.js   — code-copy buttons and future JS utilities
  posts/<slug>/   — per-post images and media
images/           — site-wide images (profile photo, etc.)
index.html        — home page
posts.html        — writing feed (reverse-chron list)
research.html     — full research record (projects, pubs, education, coursework)
search.json       — Jekyll template that generates the Fuse.js search index
proj*_web/        — static CS180 project write-ups (externally linked; do not move or rename)
```

## Interactive features

| Feature | How to use |
|---|---|
| LaTeX | `$...$` inline, `$$...$$` display. Right-click → Copy TeX |
| Code copy | Auto-added to every `<pre>` block |
| Fuzzy search | ⌘K (or Ctrl+K) — indexes all posts and pages |
| Dark mode | Toggle button in nav; persists via `localStorage` |
| ToC | Add `toc: true` to front matter (auto-generated from h2/h3) |
| Figures | `{% include figure.html ... %}` or raw `<figure>` HTML |
| Margin notes | `{% include marginnote.html text="..." %}` |
| Plotly charts | Paste `fig.to_html(full_html=False, include_plotlyjs='cdn')` output, or use include |
| Video / GIF | Convert GIF→MP4 with ffmpeg, then `{% include video.html ... %}` |
| Raw JS/canvas | Drop `<script>` or `<canvas>` directly into any .md post |

## Design decisions

- **Single-column layout** — centered 720px reading column, no persistent left sidebar
- **Right ToC** — appears only on posts and `toc: true` pages; auto-generated; hidden on mobile
- **Margin notes** — float into right gutter (≥1100px viewport); collapse to inline otherwise
- **Modern sans** — Inter for everything, Fira Code for mono; all via Google Fonts
- **CSS variables** — all design tokens in `style.css :root`; dark mode via `[data-theme="dark"]`
- **No custom Jekyll plugins** — stays compatible with GitHub Pages zero-config build
- **proj\*\_web/ URLs are stable** — these are externally linked (CS180 class site, etc.); do not rename, move, or delete them

# Website Architecture & Software Stack

This document explains the underlying software architecture of my website, serving as a reference for future me to understand how everything works together.

## The Core Framework: Jekyll

My website is powered by **Jekyll**, a static site generator written in Ruby.
Jekyll takes my Markdown files, HTML templates, and CSS, and compiles them into a purely static website (a collection of raw `.html` files) in the `_site/` directory. 

Because GitHub Pages natively supports Jekyll, I do not need to run a build pipeline (like GitHub Actions). When I push code to the `main` or `master` branch, GitHub automatically runs Jekyll behind the scenes and serves the resulting HTML files.

### Why Jekyll?
I chose Jekyll for a few key reasons:
1. **Low Maintenance:** I don't need to maintain a database, manage NPM dependencies, or worry about React framework updates breaking my site in two years.
2. **Markdown Support:** It natively converts my Markdown files (placed in `_posts/`) into styled blog pages.
3. **Academic Standard:** It is the standard way to host simple, clean, academic websites on GitHub Pages.

## Directory Structure

Here is how my repository is organized:

- `_config.yml`: The central configuration file for Jekyll. It dictates site-wide variables, specifies the Markdown parser (kramdown), and configures MathJax.
- `_layouts/`: Contains the HTML skeletons for my site.
  - `default.html`: The master wrapper. It contains the `<head>` tags (with CSS, MathJax, and highlight.js imports), the navigation bar, and the footer.
  - `post.html`: The template for individual blog posts. It inherits from `default.html` but adds formatting for the title and date.
- `_posts/`: Where my Markdown explainer posts live.
- `assets/css/style.css`: The central stylesheet. It is entirely custom (no Tailwind) to ensure a premium, lightweight, academic aesthetic.
- `images/`: The folder for my static assets and profile pictures.
- `index.html`: The homepage. It uses HTML (instead of Markdown) to allow for complex layout structures (like the profile grid and curated project lists).
- `posts.html`: The posts directory page. It loops through all files in `_posts/` and displays them as a list.

### Legacy Project Folders
There are several folders like `proj1_web/`, `proj2_web/`, `final_proj_web/`, etc. These are static HTML exports from my previous UC Berkeley class projects. Because they are not prefixed with an underscore (`_`), Jekyll simply copies them verbatim into the final `_site/` directory. This ensures that any old links I shared to those projects continue to work perfectly without requiring Jekyll to process them.

## Third-Party Integrations

I use a few lightweight client-side libraries to achieve the clean, "ML Paper" aesthetic:

1. **MathJax**: Injected via a CDN script in `_layouts/default.html`. It automatically scans the page for LaTeX symbols (`$` and `$$`) and renders them beautifully as SVG paths.
2. **Highlight.js**: Also injected via CDN. It automatically detects `<code>` blocks and applies syntax highlighting mimicking GitHub's style.
3. **Google Fonts**: I use **Inter** for crisp, modern headings, **Lora** for a classic, readable academic body text, and **Fira Code** for monospaced elements.

## Adding Javascript Frameworks (e.g., Plotly, D3)

Because the final product is just HTML, I can seamlessly embed interactive JavaScript visualizations directly into my Markdown files. If I generate a Plotly graph in Python, I can output it as raw HTML and paste it into a post. The browser will execute the Javascript, allowing for tooltips, zooming, and interactivity just like the Berkeley Stat210a reader pages.

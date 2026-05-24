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

## VSCode-Style Layout Architecture

The layout of this website is modeled heavily after highly-readable software documentation (like VSCode or Quarto), consisting of three primary columns:
1. **Contextual Left Sidebar:** Managed by Liquid logic in `_layouts/default.html`. It dynamically changes its content based on the page's category (e.g., showing CS180 projects when in the Projects category, or blog posts when in the Writing category).
2. **Main Content:** The center column holding the actual text/content.
3. **Global Right ToC:** A Javascript function runs on page load, queries all `<h2>` and `<h3>` tags in the main content, and auto-generates a clickable Table of Contents on the right side.

## Directory Structure

Here is how my repository is organized:

- `_config.yml`: The central configuration file for Jekyll.
- `_layouts/`: Contains the HTML skeletons for my site.
  - `default.html`: The master wrapper. It contains the `<head>` tags, the 3-column architecture, the Top Header (search bar + global nav), and the Left Sidebar Liquid logic.
  - `post.html`: The template for individual blog posts. Inherits from `default.html`.
- `_posts/`: Where my Markdown explainer posts live.
- `_templates/`: Contains boilerplate templates (`post_template.md` and `project_template.md`) to make adding new content frictionless.
- `assets/css/style.css`: The central stylesheet containing CSS Grid and Flexbox layouts. 
- `search.json`: A Jekyll template that generates a JSON array of all site contents on build.
- `projects.html`: The landing page for the Projects section.

### Legacy Project Folders
There are several folders like `proj1_web/`, `proj2_web/`, `final_proj_web/`, etc. These are static HTML exports from my previous UC Berkeley class projects. Because they are not prefixed with an underscore (`_`), Jekyll simply copies them verbatim into the final `_site/` directory, ensuring old links never break.

## Third-Party Integrations

1. **Fuse.js (Fuzzy Search)**: We use Fuse.js to power the search bar in the Top Header. Upon page load, it fetches `search.json` (which contains the full text of all posts and pages) and executes client-side fuzzy searching. We use `ignoreLocation: true` so it successfully searches massive documents.
2. **MathJax 3**: Injected via a CDN script in `_layouts/default.html`. It automatically scans the page for LaTeX symbols (`$` and `$$`) and renders them beautifully as SVG paths. It includes a copy-tex extension so users can right-click equations to copy raw LaTeX.
3. **Highlight.js**: Also injected via CDN. It automatically detects `<code>` blocks and applies syntax highlighting mimicking GitHub's style.
4. **Google Fonts**: I use **Inter** for crisp headings, **Lora** for academic body text, and **Fira Code** for monospaced elements.

## Adding Javascript Frameworks (e.g., Plotly)

Because the final product is just HTML, I can seamlessly embed interactive JavaScript visualizations directly into my Markdown files. If I generate a Plotly graph in Python, I can output it as raw HTML (using `.to_html()`) and paste it directly into my `.md` files. The browser will execute the Javascript natively, allowing for sliders and interactivity.

# Nicolas Rault-Wang | Personal Website

This is the repository for my personal academic and research website, hosted on GitHub Pages and powered by Jekyll.

## How to Add Explainer Posts

My posts are located in the `_posts/` directory. The website automatically parses Markdown files dropped into this directory and generates the `Writing & Notes` page.

### 1. File Naming Convention
Every post file **must** begin with the date in `YYYY-MM-DD` format, followed by the title, and end in `.md`.
*Example: `_posts/2026-05-23-my-new-post.md`*

### 2. YAML Front Matter
At the very top of my `.md` file, I must include a metadata block (called Front Matter) bordered by `---`:

```yaml
---
layout: post
title: "The Title of My Post"
date: 2026-05-23
---
```

### 3. Using Notion Exports
If I draft a post in Notion:
1. Export the page as Markdown.
2. Rename the exported `.md` file to match the `YYYY-MM-DD-title.md` format.
3. Add the YAML Front Matter (as shown above) to the top of the file.
4. If Notion exported an images folder, I need to move those images into the `images/` or `assets/` folder in the root directory, and update the paths in my markdown file to point to them (e.g. `![caption](/images/my_image.png)`).

### 4. Math and Code
- **Math:** The site is configured with MathJax. I can write inline math like `$E=mc^2$` and block math with `$$ ... $$`.
- **Code:** Standard Markdown triple backticks (```` ```python ````) will automatically receive syntax highlighting via highlight.js.

### 5. Interactive Figures (Plotly)
Since the site compiles to standard HTML, I can drop any interactive Javascript charts directly into my Markdown files. I can export interactive Plotly plots from Python as `.html` files and embed them in an `<iframe>`, or just copy-paste the raw Plotly JS into the Markdown file. See the example post in `_posts/` for a demonstration.

## Local Development
To run this website locally and preview changes before pushing:

1. Ensure I have the required gems installed:
   ```bash
   bundle install
   ```
2. Start the Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```
3. Open `http://localhost:4000` in the browser.

## Documentation
For more detailed information on my website architecture, styling, and how it is built, I can refer to the [Website Architecture Documentation](docs/website_architecture.md).
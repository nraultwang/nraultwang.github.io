# Nicolas Rault-Wang | Personal Website

This is the repository for my personal academic and research website, hosted on GitHub Pages and powered by Jekyll.

## 🚀 Website Features
- **VSCode-Style Layout:** 3-column architecture with a Top Header, Contextual Left Sidebar, and Global Right Table of Contents.
- **Fuzzy Search:** Powerful client-side search across all posts and pages using `Fuse.js`.
- **Math & Code:** Built-in MathJax 3 with copy-tex support and Highlight.js for code syntax.
- **Interactive:** Full support for embedding interactive Plotly HTML charts.

## 📝 How to Add Content

I have set up boilerplate templates in the `_templates/` directory to make adding content easy!

### Adding a Blog Post (Writing & Notes)
1. Copy `_templates/post_template.md` to the `_posts/` directory.
2. Rename the file following the Jekyll convention: `YYYY-MM-DD-your-title.md` (e.g., `2026-05-23-my-new-post.md`).
3. Update the YAML Front Matter at the top of the file with the correct title and date.

### Adding a Project Page
1. Copy `_templates/project_template.md` to the root directory (or a subfolder).
2. Rename it to `my_project.md` (or `.html`).
3. Update the YAML Front Matter. The `category: projects` tag ensures it is recognized by the navigation logic.
4. To link it in the Left Nav, edit `_layouts/default.html` and add an `<a>` tag under the Projects logic.

### Using Notion Exports
If I draft a post in Notion:
1. Export the page as Markdown.
2. Rename the exported `.md` file to match the `YYYY-MM-DD-title.md` format and place it in `_posts/`.
3. Copy the YAML Front Matter from `_templates/post_template.md` to the top of the file.
4. Move exported images into `images/` or `assets/` and fix the markdown image links (e.g. `![caption](/images/my_image.png)`).

## 💻 Local Development
To run this website locally and preview changes before pushing:

1. Ensure required gems are installed:
   ```bash
   bundle install
   ```
2. Start the Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```
3. Open `http://localhost:4000` in the browser.

## 📚 Documentation
For more detailed information on the website architecture, CSS Grid layout, and Javascript integrations, refer to the [Website Architecture Documentation](docs/website_architecture.md).
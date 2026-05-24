---
layout: post
title: "Site Components - demo"
date: 2026-05-23
---

*Note to self: this post documents the interactive and visual components available on this site.
Keep it up to date as you add new things!*

---

## Copyable LaTeX math

MathJax 3 is loaded on every page. Right-click any rendered equation → **Copy TeX** to get the raw LaTeX.

Inline math with `$...$`: The ELBO is $\mathcal{L}(\theta, \phi; x)$.

Display math with `$$...$$`:

$$
\mathcal{L}(\theta, \phi; x) = \mathbb{E}_{q_\phi(z|x)} \left[ \log p_\theta(x|z) \right] - D_{KL}\!\left( q_\phi(z|x) \| p(z) \right)
$$

Matched filters in signal processing:

$$
h_{\text{MF}}(t) = s^*(T - t), \quad \text{SNR}_{\text{out}} = \frac{2E_s}{N_0}
$$

---

## Code with copy button

Code blocks get a **Copy** button on hover (top-right of the block). Syntax highlighting via Highlight.js.

```python
import numpy as np

def matched_filter(signal, template):
    """Cross-correlate signal with conjugate-flipped template."""
    h = np.conj(template[::-1])
    return np.convolve(signal, h, mode='full')
```

```bash
bundle exec jekyll serve   # local dev at http://localhost:4000
npm run lint               # ESLint check on assets/js/
```

---

## Figures

Standard figure (using the `_includes/figure.html` include):

{% include figure.html
   src="/proj4ab_web/CS180%20Project%204%20Image%20Warping%20and%20Mosaicing%20%26%20Feat%2012c4d556e62b80a79e64c5a59c6e237a/4a-mosaic_etch_alley_short_0.png"
   caption="Standard figure — Etch Alley mosaic from CS180 Project 4A (manual keypoint stitching)." %}

Wide figure — breaks noticeably past the text column. Great for panoramas:

{% include figure.html
   src="/proj4ab_web/CS180%20Project%204%20Image%20Warping%20and%20Mosaicing%20%26%20Feat%2012c4d556e62b80a79e64c5a59c6e237a/4b-AUTO-mosaic_glade_lights_0%201.png"
   caption="Wide figure — auto-stitched glade panorama from CS180 Project 4B (Harris corners + RANSAC homography)."
   wide=true %}

You can also use raw HTML for full control:

```html
<figure class="wide">
  <img src="/path/to/image.png" alt="description" loading="lazy">
  <figcaption>Caption text.</figcaption>
</figure>
```

---

## Callout boxes

{% capture _note %}
Use callouts to highlight definitions, key results, or caveats.
Markdown works inside: **bold**, `code`, $E=mc^2$.
{% endcapture %}
{% include callout.html title="Note" body=_note %}

{% capture _warn %}
This is a warning callout. Use for gotchas or things that commonly go wrong.
{% endcapture %}
{% include callout.html title="Warning" body=_warn type="warning" %}

{% capture _tip %}
Success / tip variant.
{% endcapture %}
{% include callout.html title="Tip" body=_tip type="success" %}

---

## Margin notes and hover tooltips

Margin notes come in two flavours depending on screen width:

- **≥1320px viewport** — the note floats into the right gutter, Tufte-style.
- **&lt;1320px viewport** — the note is hidden; a small `†` marker appears. Hover or focus it to reveal the note as a popup tooltip.

Try it here — hover the `†` symbol:

This sentence discusses signal detection theory.{% include marginnote.html text="The Neyman–Pearson lemma establishes that the likelihood ratio test is the most powerful test for simple hypotheses. It underpins the design of optimal detectors in radar and communications." %} Optimal detectors exploit the structure of the noise distribution.{% include marginnote.html text="Under AWGN, the optimal receiver is the matched filter — it maximizes output SNR by correlating the observation with the expected signal waveform." %}

```liquid
{% raw %}...signal detection theory.{% include marginnote.html text="Note text here." %} Next sentence.{% endraw %}
```

No space before the tag. The `†` appears right after the word the note annotates.

---

## Numbered sidenotes and hover citations

Sidenotes are the numbered-citation version of margin notes. The superscript number is the hover trigger at narrow widths, and the note floats in the margin at wide widths.

The matched filter{% include sidenote.html num=1 text="The matched filter (correlator receiver) is the optimal linear detector under AWGN: it maximizes output SNR by correlating the received signal with a conjugate-flipped replica of the template. See Turin, 1960, <em>IRE Trans. Inf. Theory</em>." %} is the foundation of coherent radar and communication receivers. Applying it requires knowledge of the waveform{% include sidenote.html num=2 text="When the target has significant radial velocity, the replica must be Doppler-compensated. Pulse-Doppler radars do this by processing a bank of matched filters spanning the expected Doppler interval." %} at the receiver.

**How to write one:**

```liquid
{% raw %}The matched filter{% include sidenote.html num=1 text="Turin (1960). <em>IRE Trans. Inf. Theory</em>, 6(3), 311–329." %} maximizes SNR.{% endraw %}
```

**With a link in the note text** (`text` accepts raw HTML):

```liquid
{% raw %}...the ELBO objective{% include sidenote.html num=2 text="See <a href='https://arxiv.org/abs/1312.6114'>Kingma & Welling (2013)</a>, eq. 4." %} lower-bounds the log-likelihood.{% endraw %}
```

**With a literature note (math + sidenote combined):**

$$
\text{SNR}_{\text{out}} = \frac{2E_s}{N_0}
$$

This bound{% include sidenote.html num=3 text="The bound is tight: a matched filter <em>achieves</em> SNR = 2E/N₀, not merely approaches it. The proof follows from Cauchy-Schwarz applied to the cross-correlation integral." %} is tight and achieved by the matched filter. It depends only on signal energy $E_s$ and noise spectral density $N_0$, not the waveform shape.

At ≥1320px, sidenotes ¹ ² ³ float into the right gutter. Below that width, hover the superscript to reveal the note as a popup tooltip.

### HTML comments (invisible notes to yourself)

Drop invisible notes anywhere in a post — they appear in the Markdown source but not on the page:

```html
<!-- TODO: add a figure comparing matched filter output for different SNRs. -->
<!-- NOTE: double-check the Doppler formula when target velocity > 30 m/s. -->
```

<!-- This is an example hidden comment — visible in source, invisible on page. -->

---

## Interactive Plotly chart

**Option A — paste Python output directly (simplest):**

Generate in Python:
```python
fig = go.Figure(...)
html_str = fig.to_html(full_html=False, include_plotlyjs='cdn')
# paste html_str directly into your .md file
```

**Option B — write JS inline (below uses raw script, no include needed):**

<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>

<div id="demo-plot" style="width:100%; height:420px; margin:1.5em 0;"></div>
<script>
(function () {
    var x = [];
    for (var i = 0; i <= 200; i++) { x.push(i * 0.05); }

    function makeTrace(freq) {
        return { x: x, y: x.map(function (t) { return Math.sin(2 * Math.PI * freq * t) * Math.exp(-0.3 * t); }),
                 mode: 'lines', line: { color: '#0366d6', width: 2 }, name: 'freq=' + freq.toFixed(1) };
    }

    var steps = [];
    for (var f = 0.5; f <= 3.0; f += 0.25) {
        var ff = parseFloat(f.toFixed(2));
        steps.push({
            label: ff.toFixed(2),
            method: 'update',
            args: [{ y: [x.map(function (t) { return Math.sin(2 * Math.PI * ff * t) * Math.exp(-0.3 * t); })] },
                   { title: { text: 'Damped sinusoid — frequency ' + ff.toFixed(2) + ' Hz' } }]
        });
    }

    Plotly.newPlot('demo-plot', [makeTrace(1.0)], {
        title: { text: 'Damped sinusoid — frequency 1.0 Hz' },
        xaxis: { title: 'Time (s)' },
        yaxis: { title: 'Amplitude' },
        margin: { t: 50, l: 55, r: 20, b: 50 },
        sliders: [{ pad: { t: 30 }, currentvalue: { prefix: 'Frequency: ', suffix: ' Hz' }, steps: steps }]
    });
})();
</script>

Use the slider to sweep frequency. Plotly charts are fully interactive: zoom, pan, export PNG.

---

## Animated video (live example)

Videos are preferred over GIFs: ≈10× smaller and no dithering artifacts. The CS180 NeRF project used large animated GIFs; converting them to MP4 with ffmpeg cut the page weight dramatically.

Here is one — a NeRF trained on the lego bulldozer scene, synthesizing novel views by rotating around the object:

{% include video.html
   src="/final_proj_web/CS180%20Final%20Projects%20Neural%20Radiance%20Fields%20%26%20Faci%201594d556e62b8055b3ccc03a935ebe29/download-22.mp4"
   caption="NeRF — novel view synthesis rotating around the lego bulldozer scene (CS 180 Final Project)." %}

And a wide variant, good for panoramic or wider renders:

{% include video.html
   src="/final_proj_web/CS180%20Final%20Projects%20Neural%20Radiance%20Fields%20%26%20Faci%201594d556e62b8055b3ccc03a935ebe29/download-15.mp4"
   caption="NeRF volume renders — wider breakout for side-by-side comparison frames."
   wide=true %}

**How to convert and embed your own:**

```bash
# Convert GIF → MP4 (preserves dimensions, web-ready)
ffmpeg -i animation.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
       -c:v libx264 -pix_fmt yuv420p -movflags +faststart -crf 23 out.mp4
```

```liquid
{% raw %}{% include video.html src="/assets/posts/YYYY-MM-DD-title/demo.mp4"
   caption="Optional caption." wide=true %}{% endraw %}
```

Put the `.mp4` in `assets/posts/YYYY-MM-DD-title/` alongside other post assets.

---

## Custom JS / canvas (escape hatch)

Any raw `<script>` or `<canvas>` block drops in directly — Jekyll/kramdown passes HTML through untouched.

<canvas id="wave-canvas" width="700" height="100"
        style="width:100%; border-radius:4px; background:var(--bg-secondary); display:block;"></canvas>
<script>
(function () {
    var canvas = document.getElementById('wave-canvas');
    var ctx    = canvas.getContext('2d');
    var t      = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#0366d6';
        ctx.lineWidth   = 2;
        ctx.beginPath();
        for (var x = 0; x < canvas.width; x++) {
            var y = canvas.height / 2 + 35 * Math.sin((x / canvas.width) * 4 * Math.PI + t);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        t += 0.04;
        requestAnimationFrame(draw);
    }
    draw();
})();
</script>

*An animated sine wave rendered on a `<canvas>` element with vanilla JS — no framework needed.*

---

## Asset organization

Put per-post assets in `assets/posts/YYYY-MM-DD-post-title/`. Example:

```
assets/
  posts/
    2026-05-23-interactive-demo/
      fig1.png
      demo.mp4
```

Reference with `{% raw %}/assets/posts/2026-05-23-interactive-demo/fig1.png{% endraw %}`.

---

## Adding a new post

1. Copy `_templates/post_template.md` → `_posts/YYYY-MM-DD-your-title.md`
2. Fill in the front matter (title, date)
3. Write in Markdown, use the snippets above for figures/math/interactives
4. `bundle exec jekyll serve` to preview locally
5. Commit and push — GitHub Pages builds automatically

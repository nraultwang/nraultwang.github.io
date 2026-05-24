---
layout: post
title: "Your Post Title Here"
date: YYYY-MM-DD
# toc: true  ← uncomment to show Table of Contents (auto-generated from h2/h3 headings)
# image: "/assets/posts/your-post-slug/thumbnail.png"  ← optional preview thumbnail
---

Short introduction or abstract — 1-3 sentences. This becomes the excerpt shown in the post list.

## First Heading

Your content here. Put assets for this post in `assets/posts/YYYY-MM-DD-your-title/`.

---

<!-- ════════════════════════════════════════════════════════════
     SNIPPET CHEAT-SHEET — delete everything below before publishing
     ════════════════════════════════════════════════════════════ -->

## Math

Inline math with `$...$`: The loss is $\mathcal{L}(\theta)$.

Display math with `$$...$$`:

$$
\mathcal{L}(\theta, \phi; x) = \mathbb{E}_{q_\phi(z|x)} \left[ \log p_\theta(x|z) \right] - D_{KL}\!\left(q_\phi(z|x) \| p(z)\right)
$$

Right-click any rendered equation → "Copy TeX" to copy the raw LaTeX.

## Code

```python
import numpy as np

def fourier_transform(signal, fs):
    """Compute one-sided magnitude spectrum."""
    n   = len(signal)
    fft = np.fft.fft(signal)
    freq = np.fft.fftfreq(n, 1 / fs)
    return freq[:n // 2], np.abs(fft[:n // 2]) * 2 / n
```

## Figure (standard)

{% include figure.html src="/assets/posts/YYYY-MM-DD-your-title/fig1.png"
   caption="Figure 1. Caption text goes here." %}

## Figure (wide — breaks past the text column)

{% include figure.html src="/assets/posts/YYYY-MM-DD-your-title/fig1.png"
   caption="Wide figure." wide=true %}

## Figure (full bleed)

{% include figure.html src="/assets/posts/YYYY-MM-DD-your-title/fig1.png"
   caption="Full bleed." full_bleed=true %}

## Callout / note box

{% capture _note %}
This is a **note**. You can use markdown inside.
{% endcapture %}
{% include callout.html title="Note" body=_note %}

Variants: `type="warning"` (amber), `type="danger"` (red), `type="success"` (green).

## Margin note (appears in right gutter on wide screens)

Here is a sentence with a side-note.{% include marginnote.html text="This will float into the
right margin on screens wider than 1100px, and collapse to inline otherwise." %}

## Video (from an MP4 or converted GIF)

{% include video.html src="/assets/posts/YYYY-MM-DD-your-title/demo.mp4"
   caption="Optional caption." %}

## Plotly interactive chart

Two options:

**Option A — paste Python output directly (easiest):**
In Python: `fig.to_html(full_html=False, include_plotlyjs='cdn')`
Then paste the raw HTML string into your .md. Done.

**Option B — use the include:**

{% include plotly.html div_id="my-chart" height="420px" %}
<script>
  // Plotly.newPlot('my-chart', [{x:[1,2,3], y:[1,4,9], type:'scatter'}], {});
</script>

## Inline raw HTML/JS (canvas, D3, custom widgets)

You can drop any raw `<script>` or `<canvas>` block directly into a .md post.
Jekyll+kramdown passes it through untouched.

<div id="canvas-demo" style="width:100%; height:200px; background:var(--bg-secondary); border-radius:4px;"></div>
<script>
  // vanilla JS or D3 targeting #canvas-demo
</script>

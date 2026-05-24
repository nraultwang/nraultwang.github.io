---
layout: default
title: "Your Project Title"
category: projects
toc: true
---

<h1>{{ page.title }}</h1>

<p>Brief summary of the project — one or two sentences that orient the reader.</p>

<h2>Overview</h2>
<p>Detailed explanation of the project architecture and goals.</p>

<h2>Methods</h2>
<p>Describe the approach, algorithms, or hardware involved.</p>

<h2>Results</h2>
<p>Embed plots, images, or tables. Use the includes for figures:</p>

{% include figure.html src="/assets/posts/your-project/fig1.png"
   caption="Figure 1. Caption." %}

{% include figure.html src="/assets/posts/your-project/panorama.png"
   caption="Wide figure — good for panoramas and wide outputs."
   wide=true %}

<h2>Discussion</h2>
<p>What worked, what didn't, and what you would do differently.</p>

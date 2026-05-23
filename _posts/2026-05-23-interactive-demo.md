---
layout: post
title: "Interactive Demo: Math, Code & Plotly"
date: 2026-05-23
---

This post serves as a demonstration of the interactive capabilities of this website. Because the site is built into raw static HTML, it can seamlessly execute Javascript in the browser. 

## Copyable LaTeX

MathJax 3 is configured to use CommonHTML and the `copy-tex` extension. This means that if you highlight the equation below and copy it (Cmd+C / Ctrl+C), your clipboard will capture the raw LaTeX string, not the rendered unicode symbols.

Here is the objective function for a Variational Autoencoder:

$$
\mathcal{L}(\theta, \phi; x) = \mathbb{E}_{q_\phi(z|x)} \left[ \log p_\theta(x|z) \right] - D_{KL} \left( q_\phi(z|x) \| p(z) \right)
$$

Try highlighting it and pasting it into a text editor!

## Syntax Highlighting

Code blocks are automatically highlighted using Highlight.js.

```python
import torch
import torch.nn as nn

class SignalProcessor(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.conv = nn.Conv1d(in_channels, out_channels, kernel_size=3)
        self.activation = nn.ReLU()
        
    def forward(self, x):
        # Process 1D signal
        return self.activation(self.conv(x))
```

## Interactive Plotly Slider

Below is an embedded Plotly chart with a built-in interactive slider. You can generate complex charts like this in Python using `plotly.express` or `plotly.graph_objects`, export them as HTML, and embed them natively in these markdown files.

<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<div id="slider-plot" style="width:100%; height:500px; margin-top:30px;"></div>

<script>
  // Generate some sine wave data for the slider
  var x_values = [];
  for (var i = 0; i < 100; i++) {
    x_values.push(i * 0.1);
  }
  
  var traces = [];
  var steps = [];
  
  // Create 10 different frequencies
  for (var i = 0; i < 10; i++) {
    var freq = 0.5 + (i * 0.2);
    var y_values = x_values.map(x => Math.sin(freq * x));
    
    var trace = {
      x: x_values,
      y: y_values,
      mode: 'lines',
      name: 'Freq ' + freq.toFixed(1),
      visible: i === 0, // Only first is visible initially
      line: {color: '#0366d6', width: 3}
    };
    traces.push(trace);
    
    // Create the slider step for this trace
    var step = {
      label: freq.toFixed(1),
      method: 'update',
      args: [
        {'visible': traces.map((_, index) => index === i)},
        {'title': 'Sine Wave (Frequency = ' + freq.toFixed(1) + ')'}
      ]
    };
    steps.push(step);
  }
  
  var layout = {
    title: 'Sine Wave (Frequency = 0.5)',
    margin: { t: 50, l: 40, r: 20, b: 50 },
    sliders: [{
      pad: {t: 30},
      currentvalue: {
        xanchor: 'right',
        prefix: 'Frequency: ',
        font: {color: '#888', size: 14}
      },
      steps: steps
    }]
  };
  
  Plotly.newPlot('slider-plot', traces, layout);
</script>

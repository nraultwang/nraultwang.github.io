---
layout: post
title: "Interactive Demo: Math, Code & Plotly"
date: 2026-05-23
---

This post serves as a demonstration of the interactive capabilities of this website. Because the site is built into raw static HTML, it can seamlessly execute Javascript in the browser. 

## Copyable LaTeX

MathJax 3 has built-in support for copying raw LaTeX. To copy the equation below, simply **Right-Click the equation &rarr; Copy to Clipboard &rarr; TeX Commands**. Your clipboard will capture the exact `$\LaTeX$` string used to generate the math.

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
  
  // Create a single trace
  var trace = {
    x: x_values,
    y: x_values.map(x => Math.sin(0.5 * x)),
    mode: 'lines',
    name: 'Sine Wave',
    line: {color: '#0366d6', width: 3}
  };
  
  var steps = [];
  
  // Create 10 different frequencies for the slider steps
  for (var i = 0; i < 10; i++) {
    var freq = 0.5 + (i * 0.2);
    var y_values = x_values.map(x => Math.sin(freq * x));
    
    // Create the slider step to update the y-data of the single trace
    var step = {
      label: freq.toFixed(1),
      method: 'update',
      args: [
        {'y': [y_values]}, 
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
  
  Plotly.newPlot('slider-plot', [trace], layout);
</script>

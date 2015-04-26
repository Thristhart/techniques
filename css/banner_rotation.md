---
title: Creating a rotating banner animation in pure CSS
categories: 
  - css
  - design
published: true
---

<link rel="stylesheet" href="assets/rotating_banner.css"/>
Here's what we're building today:

<div class="banner final"></div>

We want to create an animation that rotates infinitely between a set of states. In most use cases, that's probably between different background images, but for this article we'll use background color.

Our first step is to build a set of keyframes, which represent each state in our set. In CSS, keyframes are placed at values between 0% and 100%, representing the beginning and end of the animation.
<img src="assets/animation_timeline_1.png" />
Since we're using 3 stages, it might seem reasonable to split it to 0%, 50% and 100%:
<img src="assets/animation_timeline_2.png" />
gist insert goes here

But that ends up looking like this - notice the transition between Frame3 and Frame1 happens instantly.

<div class="banner attempt1"></div>

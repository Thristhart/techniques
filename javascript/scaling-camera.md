---
title: A scaling camera for your canvas
categories: 
  - javascript
  - programming
published: true
---
For most 2D games, you don't want to show the player everything in your game at once. It makes sense, therefore, to keep track of some sort of camera position and zoom.

Here is a demo of what we'll be building today:
{% include javascript_demo.html demoname="scaling_camera" %}

Let's take a look at the source. We'll skip over some unimportant stuff (code for getting input and drawing the grid) and focus on the camera controls and applying the camera state to our rendering and logic.

Here's the main meat of the thing, our drawFrame function.
<script src="http://gist-it.appspot.com/github/Thristhart/techniques/blob/gh-pages/assets/javascript/scaling_camera.js?slice=9:25"></script>

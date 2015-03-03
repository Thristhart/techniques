---
title: Identifying cursor quadrants
categories: 
  - javascript
  - programming
published: true
---

Here's what we're building today:
{% include javascript_demo.html demoname="quadrants" %}

Specifically, we're interested in identifying which quadrant of a given rectangle contains a given point. For the demo, we're using the mouse cursor location as our point.

There are two main ways of forming quadrants for a rectangle: diagonal and rectangular.
The difference is in whether you split it into four smaller rectangles via parallel lines, or four smaller triangles via the diagonals.

For rectangular quadrants, calculating which quadrant a point is contained in is easy and straightforward:
<script src="http://gist-it.appspot.com/github/Thristhart/techniques/blob/gh-pages/assets/javascript/quadrants.js?slice=72:88"></script>
We determine which vertical half contains the point by dividing the height by two, and the same for the horizontal half with the width. Combining the two values gives us one of the four potential corners.

For diagonals, however, it's not as simple. Instead, we will have to return to basic algebra for our solution.

Consider that the slope of a line is Rise over Run; ie <img src="assets/deltayoverdeltax.png" class="inline" alt="Delta Y over Delta X" />. It follows that the slope of the diagonal of a rectangle is height / width. This gives us an equation we can use to calculate where any given Y value is on the diagonal, given an x value.

Let's say we have a rectangle with a width of 10 and a height of 5. The slope of its diagonal is <img src="assets/yequals510x.png" class="inline" alt="y=5/10x" />.
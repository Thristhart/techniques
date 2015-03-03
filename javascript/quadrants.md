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
<script src="http://gist-it.appspot.com/github/Thristhart/techniques/blob/gh-pages/assets/javascript/quadrants.js?slice=72:87"></script>
We determine which vertical half contains the point by dividing the height by two, and the same for the horizontal half with the width. Combining the two values gives us one of the four potential corners.

For diagonals, however, it's not as simple. Instead, we will have to return to basic algebra for our solution.

Consider that the slope of a line is Rise over Run; ie <img src="assets/deltayoverdeltax.png" class="inline" alt="Delta Y over Delta X" />. It follows that the slope of the diagonal of a rectangle is height / width. This gives us an equation we can use to calculate where any given Y value is on the diagonal, given an x value.

Let's say we have a rectangle with a width of 10 and a height of 5. The slope of its diagonal is <img src="assets/yequals510x.png" class="inline" alt="y=5/10x" />.

Here is a graph of this equation, with the rectangle superimposed:
![](assets/example_graph_1.png)

For any given point on that line, if the Y value of the cursor is greater than the Y value of the point on the line that corresponds to the X value of the cursor, we know that the cursor is in the top-left corner.

In other words, 
{% highlight javascript %}
if(y > height / width * x) {
	/* top left corner */
}
else {
	/* bottom right corner */
}
{% endhighlight %}
Now that we've identified which half of the rectangle the point is in, we need to divide the rectangle in the other direction. If the slope of one diagonal is <img src="assets/diagonal_equation.png" class="inline" alt="f(x)=height/widthx" />, then the other diagonal is <img src="assets/other_diagonal_equation.png" class="inline" alt="f(x)=-height/widthx + height" />.

![](assets/example_graph_2.png)
If we use this equation in a conditional, we can figure out the last remaining corner:
{% highlight javascript %}
if(y > -height / width * x + height) {
	/* left or bottom */
}
else {
	/* top or right */
}
{% endhighlight %}

Putting them together, here is my implementation of diagonal quadrant detection:
<script src="http://gist-it.appspot.com/github/Thristhart/techniques/blob/gh-pages/assets/javascript/quadrants.js?slice=50:71"></script>
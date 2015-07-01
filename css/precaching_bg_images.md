---
title: Precaching background images with pure CSS
categories: 
  - css
  - design
published: true
---
Sometimes you want to set up a rotation of multiple background images on an element (perhaps via this technique: [Creating a rotating banner animation in pure CSS](/techniques/css/banner_rotation.html).)

However, this can look bad on the first few rotations, because the browser doesn't load the background-image until it's applied to an element, and so the image will be loading in during the transition.

In the past I've solved this by using javascript to create img elements and force precaching. However, there's a very simple way to force the browser to load all the images, and that's by abusing multiple background images.

```
background-image: url('../images/foo1.png'),
				  url('../images/foo2.png'),
                  url('../images/foo3.png'),
                  url('../images/foo4.png');
                  /* etc */
```

Apply this to any element on the page to easily make the browser cache all those images, without needing to get through the rotation first. It doesn't even have to be rendered - an element with display: none will still download the images.
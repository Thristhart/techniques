---
title: Forcing line breaks
categories: 
  - css
  - design
published: true
---
Let's say you've got a design you're building, where it's important that a key phrase be on a new line. In this case, it reads better if 'two free' starts the line, and we need to be sure that it will go on a new line regardless of the size of the container it's in. Furthermore, we want this to be optional - this text will appear in multiple elements of different sizes, but the new line should only happen in the banner variant.

<style>
.demo {
  margin: auto;
  text-align: center;
  background-color: white;
}
.banner {
  width: 300px;
  height: 50px;
}
.panel {
  width: 200px;
  height: 100px;
}
.banner.solution em:before {
  content: '\A';
  white-space: pre;
}
em {
  font-weight: bold;
}
</style>
<div class="demo banner solution">Buy one cool design, get <em>two free</em> dirty CSS hacks!</div>
<div class="demo panel solution">Buy one cool design, get <em>two free</em> dirty CSS hacks!</div>

So adding a `<br />` before the text won't work, because we want to be able to reuse the text without the new line.
Text doesn't normally wrap like that - usually, the second line will be shorter than the first line:
<div class="demo banner">Buy one cool design, get <em>two free</em> dirty CSS hacks!</div>

So how do we force a new line to appear in front of an arbitrary element? You might be tempted to do something like:

```
.banner em:before {
  content: '<br />';
}
```

but unfortunately that doesn't work - it just renders the plaintext `<br />`.

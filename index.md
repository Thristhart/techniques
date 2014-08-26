---
title: Technique Repository
layout: default
published: true
---

hello world!!!
{% for category in site.visible-categories %}
### {{ category }}
<ul>
{% for page in site.pages %}
{% if page.categories contains category %}
<li><a href="{{ site.url }}/{{ page.url }}">{{ page.title }}</a></li>
{% endif %}
{% endfor %}
{% endfor %}

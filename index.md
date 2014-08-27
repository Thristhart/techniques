---
title: Technique Repository
layout: default
published: true
---

{% for category in site.visible-categories %}
### {{ category }}
<ul id="content">
{% for page in site.pages %}
{% if page.categories contains category %}
<li><a href="{{ page.url | replace_first:'/',''}}">{{ page.title }}</a></li>
{% endif %}
{% endfor %}
{% endfor %}
</ul>
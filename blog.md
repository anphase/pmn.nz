---
layout: page
title: Blog
permalink: /blog/
---

<section class="blog-intro">
  <p class="eyebrow">Writing</p>
  <h1>Posts and notes</h1>
  <p>Thoughts, experiences, and things I'm learning about technology, DevOps, systems, and whatever else is currently tugging at my attention.</p>
</section>

<section class="blog-posts">
  {% for post in site.posts %}
    <article class="post-card">
      <div class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <div class="post-excerpt">
        {{ post.excerpt | strip_html | truncate: 260 }}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">Read more</a>
    </article>
  {% endfor %}
</section>

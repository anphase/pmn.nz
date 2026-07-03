---
layout: page
title: Home
permalink: /
---

<section class="home-intro">
  <p class="eyebrow">Panashe's Panache Panacea</p>
  <h1>A public notebook for scattered thoughts, useful patterns, books, and experiments.</h1>
  <p>PMN is my workshop: a place for reading notes, essays, fragments, lab ideas, and the half-polished things that are still useful enough to keep in public.</p>
  <p>For the polished professional front door, visit <a href="https://panashe.nz">panashe.nz</a>.</p>
</section>

{% assign latest_post = site.posts.first %}
{% if latest_post %}
  <section class="latest-post">
    <div class="section-heading">
      <p class="eyebrow">Latest</p>
      <h2>Recent writing</h2>
    </div>
    <article class="post-card featured">
      <div class="post-meta">{{ latest_post.date | date: "%B %-d, %Y" }}</div>
      <h3><a href="{{ latest_post.url | relative_url }}">{{ latest_post.title }}</a></h3>
      <p>{{ latest_post.excerpt | strip_html | truncate: 260 }}</p>
      <a href="{{ latest_post.url | relative_url }}" class="read-more">Read more</a>
    </article>
  </section>
{% endif %}

<section class="recent-posts">
  <div class="section-heading">
    <p class="eyebrow">Archive</p>
    <h2>More posts</h2>
  </div>
  <div class="posts-grid">
    {% for post in site.posts offset:1 limit:4 %}
      <article class="post-card">
        <div class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</div>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
        <a href="{{ post.url | relative_url }}" class="read-more">Read more</a>
      </article>
    {% endfor %}
  </div>
  <div class="view-all">
    <a href="{{ '/blog/' | relative_url }}">View all posts</a>
  </div>
</section>

<section class="home-sections" aria-label="Site sections">
  <article class="section-card">
    <p class="eyebrow">Books</p>
    <h2><a href="{{ '/books/' | relative_url }}">Reading notes</a></h2>
    <p>A living shelf of books I've read, what stood out, and what I’m currently working through.</p>
  </article>
  <article class="section-card">
    <p class="eyebrow">Lab</p>
    <h2><a href="{{ '/projects/' | relative_url }}">Experiments</a></h2>
    <p>Older projects, prototypes, and useful bits that do not need to be portfolio-grade to be worth keeping.</p>
  </article>
  <article class="section-card">
    <p class="eyebrow">Identity</p>
    <h2><a href="https://panashe.nz">Panashe.nz</a></h2>
    <p>The curated profile, CV, selected work, and contact details live on my real-name site.</p>
  </article>
</section>

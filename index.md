---
layout: page
title: Home
permalink: /
---

<div class="home-intro">
    <h1>Welcome to my corner of the internet</h1>
    <p>I'm Panashe, a curious mind exploring the intersection of technology, philosophy, and human experience. This is where I share my thoughts, experiments, and discoveries as I navigate through life's fascinating journey.</p>
</div>

<div class="latest-post">
    {% assign latest_post = site.posts.first %}
    {% if latest_post %}
        <div class="featured-post">
            <h2>Latest Post</h2>
            <div class="post-card featured">
                <h3><a href="{{ latest_post.url }}">{{ latest_post.title }}</a></h3>
                <div class="post-meta">
                    <span class="post-date">{{ latest_post.date | date: "%B %-d, %Y" }}</span>
                </div>
                <div class="post-excerpt">
                    {{ latest_post.excerpt | strip_html | truncate: 300 }}
                </div>
                <a href="{{ latest_post.url }}" class="read-more">Read more →</a>
            </div>
        </div>
    {% endif %}
</div>

<div class="recent-posts">
    <h2>Recent Posts</h2>
    <div class="posts-grid">
        {% for post in site.posts offset:1 limit:4 %}
            <div class="post-card">
                <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
                <div class="post-meta">
                    <span class="post-date">{{ post.date | date: "%B %-d, %Y" }}</span>
                </div>
                <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
                <a href="{{ post.url }}" class="read-more">Read more →</a>
            </div>
        {% endfor %}
    </div>
    <div class="view-all">
        <a href="/blog">View all posts</a>
    </div>
</div>

<div class="home-sections">
    <div class="section-card">
        <h2><a href="/books">Books</a></h2>
        <p>My reading list and thoughts on books I've read, from science and technology to psychology and philosophy.</p>
    </div>
    
    <div class="section-card">
        <h2><a href="/cv">Professional Journey</a></h2>
        <p>An overview of my professional experience and skills in DevOps engineering.</p>
    </div>
</div>

<style>
.home-intro {
    max-width: 800px;
    margin: 0 auto;
    padding: 2em;
    line-height: 1.6;
    text-align: center;
}

.home-intro h1 {
    font-size: 2.5em;
    margin-bottom: 0.5em;
    color: #333;
}

.home-intro p {
    font-size: 1.2em;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}

.latest-post {
    max-width: 1200px;
    margin: 2em auto;
    padding: 0 2em;
}

.featured-post {
    margin-bottom: 4em;
}

.featured-post h2 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 1em;
    text-align: center;
}

.post-card.featured {
    background: #f8f9fa;
    padding: 2em;
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.post-card.featured h3 {
    font-size: 1.8em;
    margin-bottom: 0.5em;
}

.post-card.featured .post-excerpt {
    font-size: 1.1em;
    line-height: 1.6;
    color: #666;
    margin: 1em 0;
}

.recent-posts {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2em;
}

.recent-posts h2 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 1.5em;
    text-align: center;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2em;
    margin-bottom: 3em;
}

.post-card {
    background: #f8f9fa;
    padding: 1.5em;
    border-radius: 8px;
    transition: transform 0.2s;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.post-card h3 {
    margin: 0 0 0.5em 0;
    font-size: 1.2em;
}

.post-card h3 a {
    text-decoration: none;
    color: #333;
}

.post-meta {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 1em;
}

.post-card p {
    color: #666;
    margin-bottom: 1em;
    line-height: 1.6;
}

.read-more {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
}

.read-more:hover {
    text-decoration: underline;
}

.view-all {
    text-align: center;
    margin: 2em 0 4em;
}

.view-all a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5em 1em;
    border: 1px solid #2c3e50;
    border-radius: 4px;
    transition: all 0.2s;
}

.view-all a:hover {
    background: #2c3e50;
    color: white;
}

.home-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2em;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2em;
}

.section-card {
    background: #f8f9fa;
    padding: 2em;
    border-radius: 8px;
    transition: transform 0.2s;
}

.section-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.section-card h2 {
    margin: 0 0 1em 0;
    color: #333;
}

.section-card h2 a {
    text-decoration: none;
    color: inherit;
}

.section-card p {
    margin: 0;
    color: #666;
    font-size: 1em;
}

@media (max-width: 600px) {
    .home-intro {
        padding: 1em;
    }
    
    .home-intro h1 {
        font-size: 2em;
    }
    
    .latest-post,
    .recent-posts {
        padding: 0 1em;
    }
    
    .post-card.featured {
        padding: 1.5em;
    }
    
    .home-sections {
        grid-template-columns: 1fr;
    }
}
</style> 
---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-intro">
    <h1>Blog Posts</h1>
    <p>Thoughts, experiences, and things I'm learning about technology, DevOps, and more.</p>
</div>

<div class="blog-posts">
    {% for post in site.posts %}
        <div class="post-card">
            <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
            <div class="post-meta">
                <span class="post-date">{{ post.date | date: "%B %-d, %Y" }}</span>
            </div>
            <div class="post-excerpt">
                {{ post.excerpt | strip_html }}
            </div>
            <a href="{{ post.url }}" class="read-more">Read more →</a>
        </div>
    {% endfor %}
</div>

<style>
.blog-intro {
    max-width: 800px;
    margin: 0 auto;
    padding: 2em;
    text-align: center;
}

.blog-intro h1 {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 0.5em;
}

.blog-intro p {
    font-size: 1.2em;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}

.blog-posts {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2em;
}

.post-card {
    background: #f8f9fa;
    padding: 2em;
    border-radius: 8px;
    margin-bottom: 2em;
    transition: transform 0.2s;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.post-card h2 {
    margin: 0 0 0.5em 0;
    font-size: 1.8em;
}

.post-card h2 a {
    text-decoration: none;
    color: #333;
}

.post-meta {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 1em;
}

.post-excerpt {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1em;
}

.read-more {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
}

.read-more:hover {
    text-decoration: underline;
}

@media (max-width: 600px) {
    .blog-intro {
        padding: 1em;
    }
    
    .blog-posts {
        padding: 0 1em;
    }
    
    .post-card {
        padding: 1.5em;
    }
}
</style> 
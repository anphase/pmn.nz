---
layout: page
title: Books
permalink: /books/
date:   2024-04-26
pagination:
  enabled: true
  collection: books
  per_page: 12
  sort_field: 'title'
  sort_reverse: false
---

<div class="books-intro">
I enjoy reading other people's book lists so I've written my own — hopefully someone finds it interesting. 
The books are rated out of 5 and I've added an asterisk * to books that stood out to me. 
I've also written a blurb with my thoughts or some takeaways where I can. 
I generally read non-fiction books on a variety of topics from art and business to science and engineering. I do dabble in fiction here and there.

> I cannot remember the books I've read any more than the meals I have eaten; even so, they have made me. <br> --- Ralph Waldo Emerson

*last updated: {{ page.date }}*
</div>

<style>
.books-intro {
    margin-bottom: 2em;
    line-height: 1.6;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1em;
}

.book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2em;
    margin: 2em auto;
    max-width: 1200px;
    padding: 0 1em;
}

.book-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1em;
    transition: transform 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 300px;
    margin: 0 auto;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.book-cover {
    width: 200px;
    height: 300px;
    border-radius: 4px;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.2em;
    position: relative;
    overflow: hidden;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.book-cover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1));
    z-index: 1;
}

.book-cover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    z-index: 2;
}

.book-cover-title {
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 0.5em;
    position: relative;
    z-index: 3;
    line-height: 1.3;
    word-wrap: break-word;
    hyphens: auto;
    max-height: 60%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.book-cover-author {
    font-size: 0.75em;
    opacity: 0.9;
    position: relative;
    z-index: 3;
    margin-top: auto;
    padding-top: 0.5em;
    border-top: 1px solid rgba(255,255,255,0.2);
}

.book-cover-category {
    font-size: 0.65em;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    z-index: 3;
    align-self: flex-start;
    background: rgba(255,255,255,0.2);
    padding: 0.2em 0.5em;
    border-radius: 3px;
    margin-bottom: 0.8em;
}

/* Category-specific colors */
.book-cover[data-category="Science"] {
    background: linear-gradient(135deg, #2c3e50, #3498db);
}

.book-cover[data-category="Programming"] {
    background: linear-gradient(135deg, #1a2a6c, #b21f1f);
}

.book-cover[data-category="Productivity"] {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
}

.book-cover[data-category="Learning"] {
    background: linear-gradient(135deg, #0f2027, #203a43);
}

.book-cover[data-category="Psychology"] {
    background: linear-gradient(135deg, #8e0e00, #1f1c18);
}

.book-cover[data-category="Technology"] {
    background: linear-gradient(135deg, #000428, #004e92);
}

.book-cover[data-category="Neuroscience"] {
    background: linear-gradient(135deg, #1a2980, #26d0ce);
}

.book-cover[data-category="Philosophy"] {
    background: linear-gradient(135deg, #3a1c71, #d76d77);
}

.book-cover[data-category="Health"] {
    background: linear-gradient(135deg, #1d976c, #93f9b9);
}

.book-cover[data-category="Business"] {
    background: linear-gradient(135deg, #2c3e50, #4ca1af);
}

.book-title {
    font-size: 1.2em;
    margin: 0.5em 0;
    color: #333;
}

.book-author {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 0.5em;
}

.book-rating {
    color: #ffd700;
    margin: 0.5em 0;
    font-size: 1.2em;
}

.currently-reading {
    background-color: #f8f9fa;
    padding: 1.5em;
    border-radius: 8px;
    margin: 2em auto;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.book-details {
    margin-top: 1em;
    font-size: 0.9em;
    width: 100%;
}

.book-thoughts {
    font-style: italic;
    margin: 0.5em 0;
    background-color: #f8f9fa;
    padding: 1em;
    border-radius: 4px;
    text-align: left;
}

.filters {
    display: flex;
    gap: 1em;
    margin: 2em auto;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 800px;
    padding: 0 1em;
}

.filter-group {
    display: flex;
    gap: 0.5em;
    align-items: center;
}

.filter-label {
    font-weight: bold;
    margin-right: 0.5em;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 1em;
    margin: 2em 0;
}

.pagination a {
    padding: 0.5em 1em;
    border: 1px solid #eee;
    border-radius: 4px;
    text-decoration: none;
}

.pagination a.active {
    background-color: #eee;
}

.toc {
    background-color: #f8f9fa;
    padding: 1.5em;
    border-radius: 8px;
    margin: 2em auto;
    max-width: 800px;
}

.toc h3 {
    margin-top: 0;
}

.toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
    columns: 2;
}

.toc li {
    margin: 0.5em 0;
}

.toc a {
    text-decoration: none;
    color: #333;
}

.toc a:hover {
    text-decoration: underline;
}

.goodreads-link {
    font-size: 0.8em;
    color: #666;
    margin-top: 0.5em;
}
</style>

<div class="toc">
    <h3>Table of Contents</h3>
    <ul>
        {% for book in site.data.books %}
            <li><a href="#{{ book.title | slugify }}">{{ book.title }}</a></li>
        {% endfor %}
    </ul>
</div>

<div class="filters">
    <div class="filter-group">
        <span class="filter-label">Category:</span>
        <select id="category-filter">
            <option value="">All Categories</option>
            {% assign categories = site.data.books | map: "category" | uniq | sort %}
            {% for category in categories %}
                <option value="{{ category }}">{{ category }}</option>
            {% endfor %}
        </select>
    </div>
    
    <div class="filter-group">
        <span class="filter-label">Rating:</span>
        <select id="rating-filter">
            <option value="">All Ratings</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★</option>
            <option value="3">★★★</option>
        </select>
    </div>
    
    <div class="filter-group">
        <span class="filter-label">Status:</span>
        <select id="status-filter">
            <option value="">All Books</option>
            <option value="currently_reading">Currently Reading</option>
            <option value="read">Read</option>
        </select>
    </div>
</div>

<div id="books-container">
    {% for book in site.data.books %}
        {% if book.status == "currently_reading" %}
            <div class="currently-reading">
                <div class="book-card" id="{{ book.title | slugify }}" data-category="{{ book.category }}" data-rating="{{ book.rating }}" data-status="{{ book.status }}">
                    <div class="book-cover" data-category="{{ book.category }}">
                        <div class="book-cover-category">{{ book.category }}</div>
                        <div class="book-cover-title">{{ book.title }}</div>
                        <div class="book-cover-author">by {{ book.author }}</div>
                    </div>
                    <h3 class="book-title">{{ book.title }}</h3>
                    <p class="book-author">by {{ book.author }}</p>
                    <div class="book-details">
                        <div class="book-thoughts">
                            <strong>My Thoughts:</strong><br>
                            {{ book.thoughts }}
                        </div>
                        <a href="{{ book.goodreads }}" target="_blank" class="goodreads-link">View on Goodreads</a>
                    </div>
                </div>
            </div>
        {% endif %}
    {% endfor %}

    <div class="book-grid">
        {% for book in site.data.books %}
            {% if book.status != "currently_reading" %}
                <div class="book-card" id="{{ book.title | slugify }}" data-category="{{ book.category }}" data-rating="{{ book.rating }}" data-status="{{ book.status }}">
                    <div class="book-cover" data-category="{{ book.category }}">
                        <div class="book-cover-category">{{ book.category }}</div>
                        <div class="book-cover-title">{{ book.title }}</div>
                        <div class="book-cover-author">by {{ book.author }}</div>
                    </div>
                    <h3 class="book-title">{{ book.title }}</h3>
                    <p class="book-author">by {{ book.author }}</p>
                    <div class="book-rating">
                        {% if book.rating > 0 %}
                            {% assign full_stars = book.rating | floor %}
                            {% assign half_star = book.rating | modulo: 1 %}
                            {% for i in (1..full_stars) %}★{% endfor %}
                            {% if half_star > 0 %}½{% endif %}
                        {% endif %}
                    </div>
                    <div class="book-details">
                        <div class="book-thoughts">
                            <strong>My Thoughts:</strong><br>
                            {{ book.thoughts }}
                        </div>
                        <a href="{{ book.goodreads }}" target="_blank" class="goodreads-link">View on Goodreads</a>
                    </div>
                </div>
            {% endif %}
        {% endfor %}
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const statusFilter = document.getElementById('status-filter');
    const bookCards = document.querySelectorAll('.book-card');

    function filterBooks() {
        const selectedCategory = categoryFilter.value;
        const selectedRating = ratingFilter.value;
        const selectedStatus = statusFilter.value;

        bookCards.forEach(card => {
            const category = card.dataset.category;
            const rating = card.dataset.rating;
            const status = card.dataset.status;

            const categoryMatch = !selectedCategory || category === selectedCategory;
            const ratingMatch = !selectedRating || rating === selectedRating;
            const statusMatch = !selectedStatus || status === selectedStatus;

            if (categoryMatch && ratingMatch && statusMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    categoryFilter.addEventListener('change', filterBooks);
    ratingFilter.addEventListener('change', filterBooks);
    statusFilter.addEventListener('change', filterBooks);
});
</script>
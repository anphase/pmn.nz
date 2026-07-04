---
layout: page
title: Books
permalink: /books/
date: 2024-04-26
---

<section class="page-hero books-hero">
  <p class="eyebrow">Reading list</p>
  <h1>Books that left a mark</h1>
  <p>I read mostly nonfiction across science, technology, psychology, philosophy, business, and craft. These notes are less a ranking than a trail of what shaped my thinking.</p>
  <p class="page-note">Last updated: {{ page.date | date: "%B %-d, %Y" }}</p>
</section>

<blockquote class="pull-quote">
  I cannot remember the books I've read any more than the meals I have eaten; even so, they have made me.
  <cite>Ralph Waldo Emerson</cite>
</blockquote>

<section class="book-controls" aria-label="Book filters">
  <label>
    <span>Category</span>
    <select id="category-filter">
      <option value="">All categories</option>
      {% assign categories = site.data.books | map: "category" | uniq | sort %}
      {% for category in categories %}
        <option value="{{ category }}">{{ category }}</option>
      {% endfor %}
    </select>
  </label>

  <label>
    <span>Rating</span>
    <select id="rating-filter">
      <option value="">All ratings</option>
      <option value="5">5 stars</option>
      <option value="4">4+ stars</option>
      <option value="3">3+ stars</option>
    </select>
  </label>

  <label>
    <span>Status</span>
    <select id="status-filter">
      <option value="">All books</option>
      <option value="currently_reading">Currently reading</option>
      <option value="read">Read</option>
    </select>
  </label>
</section>

{% assign current_books = site.data.books | where: "status", "currently_reading" %}
{% if current_books.size > 0 %}
  <section class="book-section">
    <div class="section-heading">
      <p class="eyebrow">Now reading</p>
      <h2>In progress</h2>
    </div>
    <div class="book-grid book-grid-featured">
      {% for book in current_books %}
        {% assign book_page = site.books | where: "title", book.title | first %}
        {% assign book_url = book_page.url %}
        <article class="book-entry book-card" id="{{ book.title | slugify }}" data-category="{{ book.category }}" data-rating="{{ book.rating }}" data-status="{{ book.status }}">
          <div class="book-header">
            <div class="book-art">
              <img src="{{ book.cover | relative_url }}" alt="{{ book.title }} cover artwork" width="512" height="768">
              <span class="book-status">Currently reading</span>
            </div>
            <div class="book-copy">
              <div class="book-meta">
                <span>{{ book.category }}</span>
                <span>{% if book.rating > 0 %}{{ book.rating }}/5{% else %}Unrated{% endif %}</span>
              </div>
              <h3><a href="{{ book_url | relative_url }}">{{ book.title }}</a></h3>
              <p class="book-author">by {{ book.author }}</p>
            </div>
          </div>
          <div class="book-body">
            <div class="review-note">
              <span>My note</span>
              <p>{{ book.thoughts | strip_html | truncate: 190 }}</p>
            </div>
            <div class="book-actions">
              <a class="text-link" href="{{ book_url | relative_url }}">Read notes</a>
              <a class="text-link secondary-link" href="{{ book.goodreads }}" target="_blank" rel="noopener">Goodreads</a>
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
  </section>
{% endif %}

<section class="book-section">
  <div class="section-heading">
    <p class="eyebrow">Shelf notes</p>
    <h2>Finished reads</h2>
  </div>
  <div class="book-grid" id="books-container">
    {% for book in site.data.books %}
      {% if book.status != "currently_reading" %}
        {% assign book_page = site.books | where: "title", book.title | first %}
        {% assign book_url = book_page.url %}
        <article class="book-entry book-card" id="{{ book.title | slugify }}" data-category="{{ book.category }}" data-rating="{{ book.rating }}" data-status="{{ book.status }}">
          <div class="book-header">
            <div class="book-art">
              <img src="{{ book.cover | relative_url }}" alt="{{ book.title }} cover artwork" width="512" height="768">
            </div>
            <div class="book-copy">
              <div class="book-meta">
                <span>{{ book.category }}</span>
                <span>{{ book.rating }}/5</span>
              </div>
              <h3><a href="{{ book_url | relative_url }}">{{ book.title }}</a></h3>
              <p class="book-author">by {{ book.author }}</p>
            </div>
          </div>
          <div class="book-body">
            <div class="review-note">
              <span>My note</span>
              <p>{{ book.thoughts | strip_html | truncate: 190 }}</p>
            </div>
            <div class="book-actions">
              <a class="text-link" href="{{ book_url | relative_url }}">Read notes</a>
              <a class="text-link secondary-link" href="{{ book.goodreads }}" target="_blank" rel="noopener">Goodreads</a>
            </div>
          </div>
        </article>
      {% endif %}
    {% endfor %}
  </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const categoryFilter = document.getElementById('category-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const statusFilter = document.getElementById('status-filter');
  const bookCards = document.querySelectorAll('.book-entry');

  function filterBooks() {
    const selectedCategory = categoryFilter.value;
    const selectedRating = Number(ratingFilter.value || 0);
    const selectedStatus = statusFilter.value;

    bookCards.forEach(card => {
      const category = card.dataset.category;
      const rating = Number(card.dataset.rating || 0);
      const status = card.dataset.status;

      const categoryMatch = !selectedCategory || category === selectedCategory;
      const ratingMatch = !selectedRating || rating >= selectedRating;
      const statusMatch = !selectedStatus || status === selectedStatus;

      card.hidden = !(categoryMatch && ratingMatch && statusMatch);
    });
  }

  categoryFilter.addEventListener('change', filterBooks);
  ratingFilter.addEventListener('change', filterBooks);
  statusFilter.addEventListener('change', filterBooks);
});
</script>

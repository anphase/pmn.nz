const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', '..');
const newest = fs.readdirSync(path.join(root, '_posts')).filter(f => /^\d{4}-\d\d-\d\d-.+\.md$/.test(f)).sort().pop();
const [, y, m, d, slug] = newest.match(/^(\d{4})-(\d\d)-(\d\d)-(.+)\.md$/);
const book = fs.readdirSync(path.join(root, '_books')).filter(f => f.endsWith('.md')).sort()[0].replace(/\.md$/, '');

const PAGES = {
  home: '/',
  blog: '/blog/',
  'newest post': `/blog/${y}/${m}/${d}/${slug}/`,
  books: '/books/',
  'book page': `/books/${book}/`,
  projects: '/projects/',
  fails: '/fails/',
  404: '/404.html',
};

// Light only: the site has no dark theme yet (see .tracking.md).
const THEMES = ['light'];
const VIEWPORTS = [375, 1280];

const url = p => process.env.E2E_BASE_URL + p;

module.exports = { PAGES, THEMES, VIEWPORTS, url, newestPost: PAGES['newest post'] };

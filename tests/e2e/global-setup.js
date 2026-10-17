// Builds the site (unless SITE_DIR points at a build) and serves it on a free
// port. The URL is passed to the workers through process.env.E2E_BASE_URL.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml',
};

function resolveFile(root, urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath.split('?')[0]); } catch { decoded = '/404.html'; }
  const clean = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const target = path.join(root, clean);
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) return path.join(target, 'index.html');
  return target;
}

module.exports = async () => {
  let root = process.env.SITE_DIR && path.resolve(process.env.SITE_DIR);
  let tmp;
  if (!root) {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pmn-e2e-'));
    root = tmp;
    execFileSync('bundle', ['exec', 'jekyll', 'build', '--destination', root], {
      stdio: 'inherit',
      env: { ...process.env, JEKYLL_ENV: 'production' },
    });
  }

  const server = http.createServer((req, res) => {
    let file = resolveFile(root, req.url);
    let status = 200;
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
      file = path.join(root, '404.html');
      status = 404;
    }
    res.writeHead(status, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  process.env.E2E_BASE_URL = `http://127.0.0.1:${server.address().port}`;

  return async () => {
    server.close();
    if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
  };
};

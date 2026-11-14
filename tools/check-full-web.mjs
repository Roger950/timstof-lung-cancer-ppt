import { chromium } from '../web/node_modules/playwright-chromium/index.mjs';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('web/dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

let ownServer = null;
let port = 0;
async function ensureServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.resolve(root, '.' + requested);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403).end();
        return;
      }
      try {
        if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
      } catch {
        file = path.join(root, 'index.html');
      }
      const data = await fs.readFile(file);
      res
        .writeHead(200, {
          'Content-Type': types[path.extname(file)] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        })
        .end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      ownServer = server;
      port = server.address().port;
      resolve(true);
    });
  });
}

await ensureServer();
const browser = await chromium.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [],
  failedRequests = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('requestfailed', (r) => failedRequests.push(r.url()));
await fs.mkdir('output/previews/intro-web', { recursive: true });
await fs.mkdir('output/previews/full', { recursive: true });
const results = [];
try {
  for (let i = 1; i <= 26; i++) {
    await page.goto(`http://127.0.0.1:${port}/#/${i}`, { waitUntil: 'networkidle' });
    const slide = page.locator(`.deck-page[data-slide="${i}"]:visible`);
    await slide.waitFor();
    await page.evaluate(() => document.fonts.ready);
    const pngName = `slide-${String(i).padStart(2, '0')}.png`;
    await page.screenshot({ path: `output/previews/intro-web/${pngName}` });
    await page.screenshot({ path: `output/previews/full/${pngName}` });
    results.push(
      await slide.evaluate((el) => {
        const bounds = el.getBoundingClientRect(),
          footer = el.querySelector('footer').getBoundingClientRect(),
          header = el.querySelector('header').getBoundingClientRect();
        const headerBad = [...el.querySelectorAll('header *')]
          .filter((n) => {
            const r = n.getBoundingClientRect();
            return (
              r.width &&
              r.height &&
              (r.bottom > header.bottom + 2 ||
                r.right > bounds.right + 2 ||
                n.scrollHeight > n.clientHeight + 4)
            );
          })
          .map((n) => ({ tag: n.tagName, class: n.className, text: n.innerText?.slice(0, 120) }));
        const bad = [...el.querySelectorAll('main *')]
          .filter((n) => {
            const r = n.getBoundingClientRect();
            return (
              r.width &&
              r.height &&
              (r.bottom > footer.top + 2 ||
                r.left < bounds.left - 2 ||
                r.right > bounds.right + 2 ||
                n.scrollHeight > n.clientHeight + 3 ||
                n.scrollWidth > n.clientWidth + 3)
            );
          })
          .map((n) => ({ tag: n.tagName, class: n.className, text: n.innerText?.slice(0, 120) }));
        return {
          slide: el.dataset.slide,
          title: el.querySelector('h1').innerText,
          images: [...el.querySelectorAll('img')].map((n) => ({
            src: n.getAttribute('src'),
            loaded: n.complete && n.naturalWidth > 0
          })),
          overflow: [...headerBad, ...bad]
        };
      })
    );
  }
  await page.goto(`http://127.0.0.1:${port}/#/1`, { waitUntil: 'networkidle' });
  await page.keyboard.press('ArrowRight');
  await page.waitForURL('**/2');
  await page.keyboard.press('ArrowLeft');
  await page.waitForURL('**/1');
  await page.keyboard.press('f');
  await page.waitForFunction(() => !!document.fullscreenElement);
  const fullscreen = true;
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 960, height: 600 });
  await page.goto(`http://127.0.0.1:${port}/#/26`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'output/previews/intro-web/small.png' });
  const scaled = await page.locator('.deck-page:visible').evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { width: r.width, height: r.height, left: r.left, top: r.top };
  });
  await page.goto(`http://127.0.0.1:${port}/#/presenter/26`, { waitUntil: 'networkidle' });
  await page.locator('.slidev-note').getByText('PASEF', { exact: false }).first().waitFor({ timeout: 15000 });
  const presenterNotes = true;
  await page.screenshot({ path: 'output/previews/intro-web/presenter-26.png' });
  const report = {
    totalSlides: 26,
    port,
    errors,
    failedRequests,
    results,
    keyboardNavigation: true,
    fullscreen,
    presenterNotes,
    smallViewport: scaled
  };
  await fs.writeFile('.build/intro-web-validation.json', JSON.stringify(report, null, 2));
  await fs.writeFile('.build/full-web-validation.json', JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        totalSlides: report.totalSlides,
        port,
        errors: report.errors.length,
        failedRequests: report.failedRequests.length,
        overflowSlides: results.filter((r) => r.overflow.length > 0),
        unloadedImages: results.filter((r) => r.images.some((i) => !i.loaded))
      },
      null,
      2
    )
  );
  if (
    errors.length ||
    failedRequests.length ||
    results.some((r) => r.overflow.length || r.images.some((i) => !i.loaded)) ||
    !presenterNotes
  )
    process.exitCode = 1;
} finally {
  await browser.close();
  if (ownServer) ownServer.close();
}

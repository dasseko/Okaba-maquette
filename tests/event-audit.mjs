import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--disable-gpu', '--no-sandbox'],
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));

await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));
await page.evaluate(() => window.__okabaNav.reset('event', {
  event: {
    title: 'FEMOGA 26 — Festival de la Mode',
    date: '29 juin – 05 juil. 2026',
    time: '18h00',
    place: 'Esplanade bord de mer · Libreville',
    img: 'assets/event-femoga.jpg',
    organizer: 'FEMOGA',
  },
}));
await page.waitForTimeout(300);

await mkdir('test-results', { recursive: true });
await page.screenshot({ path: 'test-results/event-immersive.png' });
const result = await page.evaluate(() => {
  const screen = document.querySelector('[data-screen-label^="Événement"]');
  const media = screen.querySelector('[data-event-media]');
  const footer = screen.querySelector('[data-event-footer]');
  const images = [...screen.querySelectorAll('img')];
  const foreground = images.at(-1);
  const rect = screen.getBoundingClientRect();
  const mediaRect = media.getBoundingClientRect();
  const imageRect = foreground.getBoundingClientRect();
  const footerRect = footer.getBoundingClientRect();
  const centerDelta = {
    x: Math.abs((imageRect.left + imageRect.width / 2) - (mediaRect.left + mediaRect.width / 2)),
    y: Math.abs((imageRect.top + imageRect.height / 2) - (mediaRect.top + mediaRect.height / 2)),
  };
  return {
    label: screen.getAttribute('data-screen-label'),
    screen: { width: Math.round(rect.width), height: Math.round(rect.height) },
    imageFit: getComputedStyle(foreground).objectFit,
    image: { naturalWidth: foreground.naturalWidth, naturalHeight: foreground.naturalHeight },
    centerDelta: { x: Math.round(centerDelta.x), y: Math.round(centerDelta.y) },
    footerInsideScreen: footerRect.bottom <= rect.bottom + 1,
    darkBackground: getComputedStyle(screen).backgroundColor === 'rgb(5, 5, 5)',
    brokenImages: images.filter(image => image.complete && !image.naturalWidth).length,
  };
});
const audit = { ...result, runtimeErrors: errors };
console.log(JSON.stringify(audit, null, 2));
if (audit.imageFit !== 'contain' || audit.centerDelta.x > 1 || audit.centerDelta.y > 1 || !audit.footerInsideScreen || !audit.darkBackground || audit.brokenImages || audit.runtimeErrors.length) {
  throw new Error('Le visualiseur d’événement ne respecte pas la mise en page immersive attendue.');
}
await browser.close();

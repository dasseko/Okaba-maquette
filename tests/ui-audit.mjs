import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.OKABA_URL || 'http://127.0.0.1:4173';
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const viewportWidth = Number(process.env.OKABA_VIEWPORT_WIDTH || 390);
const viewportHeight = Number(process.env.OKABA_VIEWPORT_HEIGHT || 844);
const outputDir = path.resolve('test-results', 'ui-audit');
const screenshotDir = path.join(outputDir, 'screens');

const allScreens = [
  { screen: 'splash' },
  { screen: 'welcome' },
  { screen: 'signup' },
  { screen: 'login' },
  { screen: 'home' },
  { screen: 'services' },
  { screen: 'market', params: { cat: 'all' } },
  { screen: 'search' },
  { screen: 'shops' },
  { screen: 'shop', params: { id: 'mas-famille' } },
  { screen: 'listing', params: { id: 'savon-karite' } },
  { screen: 'annuaire' },
  { screen: 'annuaire-search' },
  { screen: 'annuaire-map' },
  { screen: 'entity', params: { id: 'seeg' } },
  { screen: 'entity', name: 'entity-fmct', params: { id: 'fmct' } },
  { screen: 'entity', name: 'entity-baie', params: { id: 'baie-des-rois' } },
  { screen: 'tenant', params: { id: 'labraise' } },
  { screen: 'tenant', name: 'tenant-paul', params: { id: 'paul' } },
  { screen: 'tenant', name: 'tenant-morellis', params: { id: 'morellis' } },
  { screen: 'tourisme' },
  { screen: 'tourisme-spots', name: 'tourisme-plages', params: { cat: 'plages' } },
  { screen: 'tourisme-place', name: 'tourisme-pointe-denis', params: { id: 'pointe-denis' } },
  { screen: 'baie' },
  { screen: 'baie-spots', name: 'baie-restaurants', params: { cat: 'restaurants' } },
  { screen: 'baie-spots', name: 'baie-hotels', params: { cat: 'hotels' } },
  { screen: 'baie-spots', name: 'baie-loisirs', params: { cat: 'loisirs' } },
  { screen: 'baie-place', name: 'baie-place-hilton', params: { cat: 'hotels', id: 'hilton-baie' } },
  { screen: 'events' },
  { screen: 'event', name: 'event-immersive', params: { event: { title: 'Festival Gabao Hip-Hop', date: '12 – 14 août 2026', time: '19h30', place: 'IFG · Libreville', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80&auto=format&fit=crop' } } },
  { screen: 'baie-information' },
  { screen: 'baie-article', params: { id: 'fmct-financement-2026' } },
  { screen: 'smartcity' },
  { screen: 'publier' },
  { screen: 'notifications' },
  { screen: 'messages' },
  { screen: 'chat', params: { id: 'mas-famille' } },
  { screen: 'favoris' },
  { screen: 'compte' },
];

const requestedScreens = new Set((process.env.OKABA_SCREENS || '').split(',').map(value => value.trim()).filter(Boolean));
const scrollY = Number(process.env.OKABA_SCROLL_Y || 0);
const screens = requestedScreens.size
  ? allScreens.filter(route => requestedScreens.has(route.name || route.screen))
  : allScreens;

await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--disable-gpu', '--no-sandbox'],
});

const context = await browser.newContext({
  viewport: { width: viewportWidth, height: viewportHeight },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});

const page = await context.newPage();
const runtimeErrors = [];
const consoleErrors = [];
const failedRequests = [];

page.on('pageerror', (error) => runtimeErrors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('requestfailed', (request) => {
  failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' });
});

await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.waitForFunction(() => Boolean(window.__okabaNav?.reset), null, { timeout: 10_000 });

const results = [];

for (const route of screens) {
  const name = route.name || route.screen;
  const errorStart = runtimeErrors.length;
  const consoleStart = consoleErrors.length;
  const requestStart = failedRequests.length;

  await page.evaluate(({ screen, params }) => window.__okabaNav.reset(screen, params || {}), route);
  await page.waitForTimeout(250);

  if (scrollY > 0) {
    await page.evaluate((top) => {
      const explicitScroller = document.querySelector('[data-home-scroll], [data-screen-scroll]');
      const fallbackScroller = [...document.querySelectorAll('#okaba-phone div')].find((node) => {
        const style = getComputedStyle(node);
        return /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
      });
      const scroller = explicitScroller || fallbackScroller;
      if (scroller) scroller.scrollTop = top;
    }, scrollY);
    await page.waitForTimeout(120);
  }

  const snapshot = await page.evaluate(() => {
    const phone = document.querySelector('#okaba-phone');
    const buttons = [...document.querySelectorAll('button')].filter((button) => {
      const rect = button.getBoundingClientRect();
      const style = getComputedStyle(button);
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    });
    const brokenImages = [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src);

    return {
      title: document.querySelector('[data-screen-label]')?.getAttribute('data-screen-label') || null,
      textLength: (phone?.innerText || '').trim().length,
      buttonCount: buttons.length,
      bodyOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      phoneRect: phone ? {
        left: Math.round(phone.getBoundingClientRect().left),
        right: Math.round(phone.getBoundingClientRect().right),
        width: Math.round(phone.getBoundingClientRect().width),
        height: Math.round(phone.getBoundingClientRect().height),
      } : null,
      brokenImages,
      fixedHeader: (() => {
        const header = document.querySelector('[data-fixed-header]');
        const scroller = document.querySelector('[data-home-scroll]');
        if (!header) return null;
        const rect = header.getBoundingClientRect();
        return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), scrollTop: Math.round(scroller?.scrollTop || 0) };
      })(),
      fixedHero: (() => {
        const hero = document.querySelector('[data-fixed-hero]');
        const scroller = document.querySelector('[data-screen-scroll]');
        if (!hero) return null;
        const rect = hero.getBoundingClientRect();
        return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), scrollTop: Math.round(scroller?.scrollTop || 0) };
      })(),
      state: window.__okabaNav.getState?.() || null,
    };
  });

  await page.screenshot({ path: path.join(screenshotDir, `${name}${scrollY > 0 ? '-scrolled' : ''}.png`) });

  const clickResults = [];
  for (let index = 0; index < snapshot.buttonCount; index += 1) {
    await page.evaluate(({ screen, params }) => window.__okabaNav.reset(screen, params || {}), route);
    await page.waitForTimeout(80);

    const buttons = page.locator('button:visible');
    if (index >= await buttons.count()) break;

    const button = buttons.nth(index);
    const label = ((await button.getAttribute('aria-label')) || (await button.innerText()).trim() || `button-${index}`).slice(0, 100);
    const clickErrorStart = runtimeErrors.length;
    let clickError = null;

    try {
      await button.click({ timeout: 2_000, force: true });
      await page.waitForTimeout(100);
    } catch (error) {
      clickError = error.message.split('\n')[0];
    }

    clickResults.push({
      index,
      label,
      clickError,
      runtimeErrors: runtimeErrors.slice(clickErrorStart),
      state: await page.evaluate(() => window.__okabaNav.getState?.() || null),
    });
  }

  results.push({
    route,
    snapshot,
    clickResults,
    runtimeErrors: runtimeErrors.slice(errorStart),
    consoleErrors: consoleErrors.slice(consoleStart),
    failedRequests: failedRequests.slice(requestStart),
  });
}

await browser.close();

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  screenCount: results.length,
  results,
  totals: {
    runtimeErrors: runtimeErrors.length,
    consoleErrors: consoleErrors.length,
    failedRequests: failedRequests.length,
    testedButtons: results.reduce((sum, result) => sum + result.clickResults.length, 0),
  },
};

await writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));

const summary = results.map((result) => ({
  screen: result.route.name || result.route.screen,
  rendered: result.snapshot.textLength > 0,
  buttons: result.clickResults.length,
  brokenImages: result.snapshot.brokenImages.length,
  overflowX: result.snapshot.bodyOverflowX,
  runtimeErrors: result.runtimeErrors.length,
  consoleErrors: result.consoleErrors.length,
}));

console.table(summary);
console.log(JSON.stringify(report.totals, null, 2));

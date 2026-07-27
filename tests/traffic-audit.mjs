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
const runtimeErrors = [];
page.on('pageerror', error => runtimeErrors.push(error.message));

await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));
await page.evaluate(() => window.__okabaNav.reset('traffic-3d'));
await page.waitForTimeout(700);

await mkdir('test-results', { recursive: true });
await page.screenshot({ path: 'test-results/traffic-map-animated.png' });
const points = await page.locator('circle[fill="#D92D2D"]').count();
const cars = await page.locator('.okaba-map-car').count();
const state = points > 10 ? 'jam' : 'fluid';
const label = await page.locator('[data-screen-label="Carte trafic réelle"]').getAttribute('data-screen-label');
const visibleText = (await page.locator('[data-screen-label="Carte trafic réelle"]').innerText()).trim();

console.log(JSON.stringify({ label, state, points, cars, visibleText, runtimeErrors }, null, 2));
await browser.close();

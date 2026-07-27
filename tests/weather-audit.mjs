import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--disable-gpu', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const runtimeErrors = [];
page.on('pageerror', error => runtimeErrors.push(error.message));

await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));
await page.evaluate(() => window.__okabaNav.reset('weather'));
await page.waitForTimeout(500);
await mkdir('test-results', { recursive: true });
await page.screenshot({ path: 'test-results/weather-glass.png' });

const label = await page.locator('[data-screen-label="Météo Libreville"]').getAttribute('data-screen-label');
const forecastDays = await page.locator('[data-screen-label="Météo Libreville"] section > div:last-child > div').count();
console.log(JSON.stringify({ label, forecastDays, runtimeErrors }, null, 2));
await browser.close();

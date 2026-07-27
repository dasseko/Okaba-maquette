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
await page.evaluate(() => window.__okabaNav.reset('smartcity'));
await page.locator('button').filter({ hasText: /^Carburant$/ }).click();
await page.waitForSelector('[data-screen-label="Stations carburant Baie des Rois"]');
await mkdir('test-results', { recursive: true });
await page.screenshot({ path: 'test-results/fuel-stations-list.png' });

const cards = await page.locator('[data-screen-label="Stations carburant Baie des Rois"] article').count();
const logos = await page.locator('[data-screen-label="Stations carburant Baie des Rois"] article img[src*="assets/fuel/"]').evaluateAll(images => images.map(image => ({
  src: image.getAttribute('src'),
  loaded: image.complete && image.naturalWidth > 0,
})));

await page.getByRole('button', { name: 'OLA Energy', exact: true }).click();
const olaCards = await page.locator('[data-screen-label="Stations carburant Baie des Rois"] article').count();
await page.getByRole('button', { name: /Carte/ }).click();
await page.waitForTimeout(250);
await page.screenshot({ path: 'test-results/fuel-stations-map.png' });
const olaMarkers = await page.locator('[data-screen-label="Stations carburant Baie des Rois"] button[aria-label^="OLA Energy"]').count();
const mapTiles = await page.locator('[data-screen-label="Stations carburant Baie des Rois"] img[src*="assets/maps/fuel/"]').evaluateAll(images => images.map(image => image.complete && image.naturalWidth > 0));
const label = await page.locator('[data-screen-label="Stations carburant Baie des Rois"]').getAttribute('data-screen-label');

console.log(JSON.stringify({ label, cards, olaCards, olaMarkers, logos, mapTiles, runtimeErrors }, null, 2));
await browser.close();

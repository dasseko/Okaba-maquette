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
await page.evaluate(() => window.__okabaNav.reset('pharmacies'));
await mkdir('test-results', { recursive: true });
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/pharmacies-list.png' });
const cards = await page.locator('[data-screen-label="Pharmacies Baie des Rois"] article').count();

await page.getByRole('button', { name: /Carte/ }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/pharmacies-map.png' });
const markers = await page.locator('[data-screen-label="Pharmacies Baie des Rois"] button[aria-label]:not([aria-label="Retour"])').count();
const label = await page.locator('[data-screen-label="Pharmacies Baie des Rois"]').getAttribute('data-screen-label');

console.log(JSON.stringify({ label, cards, markers, runtimeErrors }, null, 2));
await browser.close();

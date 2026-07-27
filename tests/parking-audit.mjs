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
await page.evaluate(() => window.__okabaNav.reset('parking'));
await page.getByRole('button', { name: /Parking Nord/ }).click();
await page.getByPlaceholder('Ex. GA 1234 AA').fill('GA 241 OK');
await page.getByRole('button', { name: 'Continuer' }).click();
await page.getByRole('button', { name: /Moov Money/ }).click();
await mkdir('test-results', { recursive: true });
await page.screenshot({ path: 'test-results/parking-payment-logos.png' });
const paymentLogos = await page.locator('img[src*="assets/payments/"]').evaluateAll(images => images.map(image => ({ src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 })));
await page.getByRole('button', { name: /Confirmer/ }).click();
await page.screenshot({ path: 'test-results/parking-reservation-confirmed.png' });

const label = await page.locator('[data-screen-label="Réservation parking"]').getAttribute('data-screen-label');
const confirmation = await page.getByRole('heading', { name: 'Votre place est réservée' }).innerText();
const code = await page.locator('text=/OKP-[0-9]+/').first().innerText();
console.log(JSON.stringify({ label, confirmation, code, paymentLogos, runtimeErrors }, null, 2));
await browser.close();

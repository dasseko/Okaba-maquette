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
  const footer = screen.querySelector('[data-event-footer]');
  const reserveButton = [...footer.querySelectorAll('button')].find(button => button.textContent.includes('Réserver'));
  const images = [...screen.querySelectorAll('img')];
  const foreground = images.at(-1);
  const rect = screen.getBoundingClientRect();
  const imageRect = foreground.getBoundingClientRect();
  const coversScreen = Math.abs(imageRect.width - rect.width) <= 1 && Math.abs(imageRect.height - rect.height) <= 1
    && Math.abs(imageRect.left - rect.left) <= 1 && Math.abs(imageRect.top - rect.top) <= 1;
  return {
    label: screen.getAttribute('data-screen-label'),
    screen: { width: Math.round(rect.width), height: Math.round(rect.height) },
    imageFit: getComputedStyle(foreground).objectFit,
    image: { naturalWidth: foreground.naturalWidth, naturalHeight: foreground.naturalHeight },
    coversScreen,
    hasReserveButton: Boolean(reserveButton),
    hasOldFooterText: /FEMOGA|Esplanade|18h00/.test(footer.textContent),
    darkBackground: getComputedStyle(screen).backgroundColor === 'rgb(5, 5, 5)',
    brokenImages: images.filter(image => image.complete && !image.naturalWidth).length,
  };
});
await page.evaluate(() => {
  const footer = document.querySelector('[data-event-footer]');
  const reserveButton = [...footer.querySelectorAll('button')].find(button => button.textContent.includes('Réserver'));
  reserveButton.click();
});
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/event-ticket-step1.png' });
const ticketStep1 = await page.evaluate(() => document.querySelector('[data-screen-label="Billetterie événement"]')?.getAttribute('data-screen-label') || null);
await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('button')];
  buttons.find(button => button.textContent.includes('Continuer')).click();
});
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/event-ticket-step2.png' });
await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('button')];
  buttons.find(button => button.textContent.includes('Confirmer')).click();
});
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/event-ticket-step3.png' });
const ticketStep3 = await page.evaluate(() => ({
  label: document.querySelector('[data-screen-label="Billetterie événement"]')?.getAttribute('data-screen-label') || null,
  hasCode: /OKT-/.test(document.body.innerText),
}));

const audit = { ...result, ticketStep1, ticketStep3, runtimeErrors: errors };
console.log(JSON.stringify(audit, null, 2));
if (audit.imageFit !== 'cover' || !audit.coversScreen || !audit.hasReserveButton || audit.hasOldFooterText || !audit.darkBackground || audit.brokenImages || !ticketStep1 || !ticketStep3.hasCode || audit.runtimeErrors.length) {
  throw new Error('Le visualiseur d’événement ou le workflow de billetterie ne respecte pas le comportement attendu.');
}
await browser.close();

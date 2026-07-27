import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.OKABA_URL || 'http://127.0.0.1:43127';
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = 'test-results/carousel-tablet-audit';

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true, args: ['--disable-gpu', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 800, height: 1280 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });

const visibleDirectChildren = async (selector) => page.locator(selector).evaluate(node =>
  [...node.children].filter(child => getComputedStyle(child).display !== 'none' && getComputedStyle(child).visibility !== 'hidden').length,
);

try {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));
  await page.evaluate(() => window.__okabaNav.reset('home'));

  const homeCard = page.locator('[data-auto-carousel="home-events"]');
  await homeCard.waitFor();
  const homeHeight = await homeCard.evaluate(node => node.getBoundingClientRect().height);
  if (homeHeight < 300) throw new Error(`Carte événement trop basse sur tablette : ${homeHeight}px`);

  const homeFit = await homeCard.locator('[data-carousel-media] > img').evaluate(img => getComputedStyle(img).objectFit);
  if (homeFit !== 'contain') throw new Error(`L'affiche d'événement est encore recadrée (${homeFit})`);

  // Échantillonne toute la transition automatique : une seule diapositive doit
  // être peinte à la fois, même pendant l'apparition de la suivante.
  await page.waitForTimeout(4300);
  const visibleSamples = [];
  for (let index = 0; index < 12; index += 1) {
    visibleSamples.push(await page.locator('[data-auto-carousel="home-banner"]').locator(':scope > [data-carousel-media]').evaluateAll(nodes =>
      nodes.filter(node => getComputedStyle(node).display !== 'none').length,
    ));
    await page.waitForTimeout(60);
  }
  if (visibleSamples.some(count => count !== 1)) throw new Error(`Superposition détectée : ${visibleSamples.join(', ')}`);
  await page.screenshot({ path: `${outputDir}/home-after-transition.png`, fullPage: false });

  await page.evaluate(() => window.__okabaNav.reset('baie'));
  const baieHeight = await page.locator('[data-auto-carousel="baie-events"]').evaluate(node => node.getBoundingClientRect().height);
  if (baieHeight < 300) throw new Error(`Carrousel Baie trop bas sur tablette : ${baieHeight}px`);

  await page.evaluate(() => window.__okabaNav.reset('smartcity'));
  const smartHeight = await page.locator('[data-auto-carousel="smart-city"]').evaluate(node => node.getBoundingClientRect().height);
  if (smartHeight < 250) throw new Error(`Carrousel Smart City trop bas sur tablette : ${smartHeight}px`);

  console.log(JSON.stringify({ ok: true, viewport: '800x1280', homeHeight, baieHeight, smartHeight, visibleSamples }, null, 2));
} finally {
  await browser.close();
}

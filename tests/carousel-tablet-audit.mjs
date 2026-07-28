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

const assertMediaFillsCard = async (card, media, label) => {
  await media.waitFor();
  const result = await media.evaluate((node) => {
    const card = node.closest('[data-auto-carousel]');
    const mediaBox = node.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const style = getComputedStyle(node);
    return {
      widthDelta: Math.abs(mediaBox.width - cardBox.width),
      heightDelta: Math.abs(mediaBox.height - cardBox.height),
      fit: node.tagName === 'IMG' ? style.objectFit : style.backgroundSize,
      loaded: node.tagName !== 'IMG' || (node.complete && node.naturalWidth > 0),
    };
  });
  if (!result.loaded) throw new Error(`${label} n'est pas chargee`);
  if (result.fit !== 'cover') throw new Error(`${label} ne remplit pas sa carte (${result.fit})`);
  if (result.widthDelta > 1 || result.heightDelta > 1) {
    throw new Error(`${label} ne couvre pas tout le cadre (${result.widthDelta} x ${result.heightDelta}px d'ecart)`);
  }
};

try {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));
  await page.evaluate(() => window.__okabaNav.reset('home'));

  const homeCard = page.locator('[data-auto-carousel="home-events"]');
  await homeCard.waitFor();
  const homeHeight = await homeCard.evaluate(node => node.getBoundingClientRect().height);
  if (Math.abs(homeHeight - 176) > 1) throw new Error(`Hauteur d'origine de la carte événement perdue : ${homeHeight}px`);

  const homeFit = await homeCard.locator('[role="img"]').evaluate(image => getComputedStyle(image).backgroundSize);
  if (homeFit !== 'cover') throw new Error(`L'affiche d'événement ne remplit pas sa carte (${homeFit})`);

  // Échantillonne toute la transition automatique : une seule diapositive doit
  // être peinte à la fois, même pendant l'apparition de la suivante.
  const homeIndicators = homeCard.locator('xpath=..').locator('button[aria-label^="Afficher "]');
  const homeSlideCount = await homeIndicators.count();
  for (let index = 0; index < homeSlideCount; index += 1) {
    await homeIndicators.nth(index).click();
    await page.waitForTimeout(350);
    const activeHomeCard = page.locator('[data-auto-carousel="home-events"]');
    await assertMediaFillsCard(activeHomeCard, activeHomeCard.locator('[role="img"]'), `Evenement accueil ${index + 1}`);
    await activeHomeCard.screenshot({ path: `${outputDir}/home-event-${index + 1}.png` });
  }

  const homeBanner = page.locator('[data-auto-carousel="home-banner"]');
  const bannerMedia = homeBanner.locator(':scope > img');
  const bannerCount = await bannerMedia.count();
  for (let index = 0; index < bannerCount; index += 1) {
    await assertMediaFillsCard(homeBanner, bannerMedia.nth(index), `Banniere accueil ${index + 1}`);
  }

  await page.waitForTimeout(4300);
  const visibleSamples = [];
  for (let index = 0; index < 12; index += 1) {
    visibleSamples.push(await page.locator('[data-auto-carousel="home-banner"]').locator(':scope > img').evaluateAll(nodes =>
      nodes.filter(node => getComputedStyle(node).display !== 'none').length,
    ));
    await page.waitForTimeout(60);
  }
  if (visibleSamples.some(count => count !== 1)) throw new Error(`Superposition détectée : ${visibleSamples.join(', ')}`);
  await page.screenshot({ path: `${outputDir}/home-after-transition.png`, fullPage: false });

  await page.evaluate(() => window.__okabaNav.reset('baie'));
  const baieCard = page.locator('[data-auto-carousel="baie-events"]');
  const baieHeight = await baieCard.evaluate(node => node.getBoundingClientRect().height);
  if (Math.abs(baieHeight - 200) > 1) throw new Error(`Hauteur d'origine du carrousel Baie perdue : ${baieHeight}px`);

  const baieIndicators = baieCard.locator('xpath=..').locator('button[aria-label^="Afficher "]');
  const baieSlideCount = await baieIndicators.count();
  for (let index = 0; index < baieSlideCount; index += 1) {
    await baieIndicators.nth(index).click();
    await page.waitForTimeout(350);
    const activeBaieCard = page.locator('[data-auto-carousel="baie-events"]');
    await assertMediaFillsCard(activeBaieCard, activeBaieCard.locator('img'), `Evenement Baie ${index + 1}`);
    await activeBaieCard.screenshot({ path: `${outputDir}/baie-event-${index + 1}.png` });
  }

  await page.evaluate(() => window.__okabaNav.reset('smartcity'));
  const smartHeight = await page.locator('[data-auto-carousel="smart-city"]').evaluate(node => node.getBoundingClientRect().height);
  if (Math.abs(smartHeight - 196) > 1) throw new Error(`Hauteur d'origine du carrousel Smart City perdue : ${smartHeight}px`);

  console.log(JSON.stringify({ ok: true, viewport: '800x1280', homeHeight, homeSlideCount, bannerCount, baieHeight, baieSlideCount, smartHeight, visibleSamples }, null, 2));
} finally {
  await browser.close();
}

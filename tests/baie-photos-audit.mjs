import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.OKABA_URL || 'http://127.0.0.1:43127';
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const screenshotDir = 'test-results/baie-photos-audit';

await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--disable-gpu', '--no-sandbox'],
});

const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});

try {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));
  await page.evaluate(() => window.__okabaNav.reset('baie-place', { cat: 'restaurants', id: 'labraise' }));

  const screen = page.locator('[data-screen-label^="Restaurant"]').first();
  await screen.getByRole('button', { name: 'Photos', exact: true }).click();

  const galleryImages = screen.locator('[role="img"][aria-label^="Restaurant La Braise — photo"]');
  const photoCount = await galleryImages.count();
  if (photoCount !== 3) throw new Error(`La galerie devrait contenir 3 photos uniques, reçu : ${photoCount}`);

  await page.evaluate(() => {
    const hero = document.querySelector('[data-baie-service-hero]');
    let scroller = hero?.parentElement;
    while (scroller && !/(auto|scroll)/.test(getComputedStyle(scroller).overflowY)) scroller = scroller.parentElement;
    if (!scroller) throw new Error('Conteneur de défilement introuvable');
    scroller.scrollTop = 430;
  });
  await page.waitForTimeout(150);

  const geometry = await page.evaluate(() => {
    const hero = document.querySelector('[data-baie-service-hero]');
    const screen = document.querySelector('[data-screen-label^="Restaurant"]');
    const firstPhoto = document.querySelector('[role="img"][aria-label^="Restaurant La Braise — photo"]');
    if (!hero || !screen || !firstPhoto) throw new Error('Éléments du restaurant introuvables');
    const heroRect = hero.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();
    const firstPhotoRect = firstPhoto.getBoundingClientRect();
    return {
      heroPosition: getComputedStyle(hero).position,
      heroBottom: heroRect.bottom,
      firstPhotoTop: firstPhotoRect.top,
      screenTop: screenRect.top,
    };
  });

  if (geometry.heroPosition === 'sticky') throw new Error('Le hero du restaurant reste sticky');
  if (geometry.heroBottom > geometry.firstPhotoTop) {
    throw new Error(`Le hero recouvre encore la galerie (${JSON.stringify(geometry)})`);
  }

  await page.screenshot({ path: `${screenshotDir}/labraise-photos-scrolled.png` });
  console.log(JSON.stringify({ ok: true, photoCount, geometry }, null, 2));
} finally {
  await browser.close();
}

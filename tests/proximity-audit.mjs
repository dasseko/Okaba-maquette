import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.OKABA_URL || 'http://127.0.0.1:4173';
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('test-results', 'proximity-audit');
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true, args: ['--disable-gpu', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const runtimeErrors = [];
page.on('pageerror', error => runtimeErrors.push(error.message));

await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));

await page.evaluate(() => window.__okabaNav.reset('proposer-service'));
await page.getByText('Zone d’intervention', { exact: true }).waitFor();
await page.getByText('Profil lié', { exact: true }).waitFor();
if (await page.getByText('Créer mon profil', { exact: true }).count()) throw new Error('L’écran d’introduction service est encore affiché.');
if (await page.getByText('Choisissez votre métier', { exact: true }).count()) throw new Error('L’étape métier est encore affichée.');
await page.screenshot({ path: path.join(outputDir, 'workflow-zone-linked-profile.png'), fullPage: true });

await page.getByRole('button', { name: 'Continuer' }).click();
await page.getByText('Mode de tarification', { exact: true }).waitFor();
await page.screenshot({ path: path.join(outputDir, 'workflow-pricing.png'), fullPage: true });

await page.getByRole('button', { name: 'Continuer' }).click();
await page.getByText('Photos de réalisations', { exact: true }).waitFor();
await page.getByRole('button', { name: 'Voir l’aperçu' }).click();
await page.getByText('Aperçu de la vitrine', { exact: true }).waitFor();
for (const label of ['À propos', 'Disponibilité et tarif', 'Réalisations']) await page.getByText(label, { exact: true }).first().waitFor();
await page.screenshot({ path: path.join(outputDir, 'workflow-vitrine-preview.png'), fullPage: true });

await page.evaluate(() => window.__okabaNav.reset('proximity-profile', { id: 'demo-plomberie' }));
await page.getByText('Profil du prestataire', { exact: true }).waitFor();
for (const label of ['À propos', 'Disponibilité et tarif', 'Réalisations']) await page.getByText(label, { exact: true }).first().waitFor();
await page.screenshot({ path: path.join(outputDir, 'provider-vitrine.png'), fullPage: true });

await page.evaluate(() => window.__okabaNav.reset('publier'));
await page.getByText('Dans quelle catégorie ?', { exact: true }).waitFor();
if (await page.getByText('Créer une annonce', { exact: true }).count()) throw new Error('L’écran d’introduction annonce est encore affiché.');
await page.screenshot({ path: path.join(outputDir, 'listing-direct-category.png'), fullPage: true });

await page.setViewportSize({ width: 1000, height: 1000 });
await page.evaluate(() => window.__okabaNav.reset('proposer-service'));
const desktopCta = page.getByRole('button', { name: 'Continuer' });
const footerGeometry = await desktopCta.evaluate(button => {
  const buttonRect = button.getBoundingClientRect();
  const footerRect = button.parentElement.getBoundingClientRect();
  return {
    button: { left: buttonRect.left, right: buttonRect.right, width: buttonRect.width },
    footer: { left: footerRect.left, right: footerRect.right, width: footerRect.width },
  };
});
if (footerGeometry.button.left - footerGeometry.footer.left < 12 || footerGeometry.footer.right - footerGeometry.button.right < 12) throw new Error(`Le bouton fixe touche encore les bords : ${JSON.stringify(footerGeometry)}`);

if (runtimeErrors.length) throw new Error(`Erreurs runtime : ${runtimeErrors.join(' | ')}`);
console.log(JSON.stringify({ directServiceFlow: 'ok', linkedProfile: 'ok', sharedVitrine: 'ok', directListingFlow: 'ok', footerGeometry, runtimeErrors }, null, 2));
await browser.close();

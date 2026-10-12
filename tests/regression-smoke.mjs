import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import http from 'node:http';

const port = 4174;
const url = `http://127.0.0.1:${port}`;
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const routes = [
  ['welcome', 'Bienvenue'],
  ['signup', 'Inscription 1'],
  ['login', 'Connexion'],
  ['home', 'Accueil'],
  ['market', 'Marketplace'],
  ['services', 'Explorer'],
  ['compte', 'Profil'],
];

function waitForServer() {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const probe = () => {
      http.get(url, () => resolve()).on('error', () => {
        tries += 1;
        if (tries === 30) reject(new Error('Le serveur de vérification ne démarre pas.'));
        else setTimeout(probe, 200);
      });
    };
    probe();
  });
}

const server = spawn('cmd.exe', ['/c', `npx vite preview --host 127.0.0.1 --port ${port} --strictPort`], { stdio: 'ignore' });
let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ executablePath: chromePath, headless: true, args: ['--disable-gpu', '--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.querySelector('.okaba-p5-canvas')?.parentElement?.click());
  await page.waitForFunction(() => Boolean(window.__okabaNav?.reset));

  for (const [screen, expectedLabel] of routes) {
    await page.evaluate((target) => window.__okabaNav.reset(target), screen);
    await page.waitForSelector(`[data-screen-label="${expectedLabel}"]`, { timeout: 4_000 });
    const text = await page.locator('#okaba-phone').innerText();
    if (!text.trim()) throw new Error(`L’écran « ${screen} » est vide.`);
  }

  if (errors.length) throw new Error(`Erreur d’interface : ${errors.join(' | ')}`);
  console.log(`✓ Contrôle de non-régression local validé (${routes.length} écrans essentiels).`);
} finally {
  await browser?.close();
  server.kill();
}

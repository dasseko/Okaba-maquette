import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Pilote le WebView de l'app tournant réellement sur l'émulateur Android via
// un client CDP minimal (le WebView Android n'expose pas le domaine
// Browser/Target complet dont Playwright a besoin pour connectOverCDP — on
// parle donc directement au websocket de la PAGE : Runtime.evaluate pour
// naviguer via window.__okabaNav, Page.captureScreenshot pour la capture).
const cdpHttpUrl = process.env.OKABA_CDP_URL || 'http://127.0.0.1:9223';
const outputDir = path.resolve('test-results', 'emulator-screens');

const allScreens = [
  { screen: 'splash' },
  { screen: 'welcome' },
  { screen: 'signup' },
  { screen: 'login' },
  { screen: 'home' },
  { screen: 'services' },
  { screen: 'market', params: { cat: 'all' } },
  { screen: 'search' },
  { screen: 'shops' },
  { screen: 'shop', params: { id: 'mas-famille' } },
  { screen: 'listing', params: { id: 'savon-karite' } },
  { screen: 'annuaire' },
  { screen: 'annuaire-search' },
  { screen: 'annuaire-map' },
  { screen: 'entity', params: { id: 'seeg' } },
  { screen: 'entity', name: 'entity-fmct', params: { id: 'fmct' } },
  { screen: 'entity', name: 'entity-baie', params: { id: 'baie-des-rois' } },
  { screen: 'tenant', params: { id: 'labraise' } },
  { screen: 'tenant', name: 'tenant-paul', params: { id: 'paul' } },
  { screen: 'tenant', name: 'tenant-morellis', params: { id: 'morellis' } },
  { screen: 'tourisme' },
  { screen: 'tourisme-spots', name: 'tourisme-plages', params: { cat: 'plages' } },
  { screen: 'tourisme-place', name: 'tourisme-pointe-denis', params: { id: 'pointe-denis' } },
  { screen: 'baie' },
  { screen: 'baie-spots', name: 'baie-restaurants', params: { cat: 'restaurants' } },
  { screen: 'baie-spots', name: 'baie-hotels', params: { cat: 'hotels' } },
  { screen: 'baie-spots', name: 'baie-loisirs', params: { cat: 'loisirs' } },
  { screen: 'baie-place', name: 'baie-place-hilton', params: { cat: 'hotels', id: 'hilton-baie' } },
  { screen: 'events' },
  { screen: 'baie-information' },
  { screen: 'baie-article', params: { id: 'fmct-financement-2026' } },
  { screen: 'smartcity' },
  { screen: 'publier' },
  { screen: 'notifications' },
  { screen: 'messages' },
  { screen: 'chat', params: { id: 'mas-famille' } },
  { screen: 'favoris' },
  { screen: 'compte' },
];

const requestedScreens = new Set((process.env.OKABA_SCREENS || '').split(',').map((v) => v.trim()).filter(Boolean));
const screens = requestedScreens.size
  ? allScreens.filter((route) => requestedScreens.has(route.name || route.screen))
  : allScreens;

await mkdir(outputDir, { recursive: true });

const list = await (await fetch(`${cdpHttpUrl}/json/list`)).json();
const target = list.find((t) => t.type === 'page') || list[0];
if (!target) throw new Error('No inspectable page found via CDP');
console.log(`Target: ${target.title} (${target.url})`);

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});

let nextId = 1;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
});

function send(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`${method} timed out`));
      }
    }, 10_000);
  });
}

await send('Page.enable');
await send('Runtime.enable');
await send('Runtime.evaluate', {
  expression: `!!window.__okabaNav && typeof window.__okabaNav.reset === 'function'`,
  awaitPromise: false,
});

const results = [];
for (const route of screens) {
  const name = route.name || route.screen;
  try {
    const expression = `window.__okabaNav.reset(${JSON.stringify(route.screen)}, ${JSON.stringify(route.params || {})})`;
    await send('Runtime.evaluate', { expression, awaitPromise: false });
    await new Promise((r) => setTimeout(r, 450));
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    await writeFile(path.join(outputDir, `${name}.png`), Buffer.from(data, 'base64'));
    results.push({ name, ok: true });
    console.log(`OK   ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: error.message });
    console.log(`FAIL ${name}: ${error.message.split('\n')[0]}`);
  }
}

ws.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} screens captured successfully.`);
if (failed.length) {
  console.log('Failed:', failed.map((f) => f.name).join(', '));
}

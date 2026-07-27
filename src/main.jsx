import React from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import OkabaApp from './okaba-bundle.jsx';
import './styles.css';

const isNativeApp = Capacitor.isNativePlatform();
window.__OKABA_NATIVE__ = isNativeApp;
document.documentElement.classList.toggle('okaba-native', isNativeApp);

if (isNativeApp) {
  document.documentElement.style.setProperty('--okaba-status-bar-height', '24px');
  Promise.allSettled([
    StatusBar.show(),
    StatusBar.setOverlaysWebView({ overlay: true }),
    StatusBar.setStyle({ style: Style.Dark }),
    StatusBar.getInfo().then(info => {
      if (info.height > 0) {
        document.documentElement.style.setProperty('--okaba-status-bar-height', `${info.height}px`);
      }
    }),
  ]);
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="okaba-app-shell">
      <OkabaApp />
    </main>
  </React.StrictMode>,
);

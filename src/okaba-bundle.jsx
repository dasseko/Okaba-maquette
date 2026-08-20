import React from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import QRCode from 'qrcode';

// okaba-bundle.jsx — concaténation du prototype O'KABA (généré)
// Un seul scope module : les const/globals se résolvent entre fichiers.


// ===================== 00-data =====================
// data.jsx — OKABA Annuaire · design tokens, 36 rubriques, etablissements + photos
//
// Design system inspired by the brief (OpenTable/Yelp/TripAdvisor refs) but
// adapted to OKABA's Gabonese identity. Cream surface, vert chrome primary,
// or Gabon accent. Type: Instrument Serif (display) + Manrope (UI).

// ── Design tokens ───────────────────────────────────────────
const OKABA = {
  // Surfaces (warm cream — OpenTable vibe)
  bg:      '#FAF6EC',
  bg2:     '#F4EEDF',
  card:    '#FFFFFF',
  // Brand (drapeau gabonais)
  vert:    '#0E6B34',  // vert chrome — primary CTA
  vertSoft:'#1B8C4A',
  vertDeep:'#08431F',
  or:      '#FCD116',  // or Gabon — accent
  orDeep:  '#D89B1F',
  bleu:    '#3A75C4',  // bleu Gabon
  bleuDeep:'#1F4E79',
  // Text
  ink:     '#1A1815',  // warm black
  ink2:    '#5A554C',
  ink3:    '#8C8678',
  // Lines
  line:    '#E8E2D2',
  lineSoft:'#F0EAD8',
  // Functional
  promo:   '#C8553D',
  star:    '#F5A623',
  ok:      '#1B8C4A',
};

const FONT_DISPLAY = '"Instrument Serif", "Times New Roman", serif';
const FONT_UI = '"Manrope", -apple-system, system-ui, sans-serif';

// ── Iconography (single-stroke, minimal) ────────────────────
const Icon = ({ name, size = 22, color = '#0E6B34', strokeWidth = 1.8, fill = 'none' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill, stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    // Category icons
    case 'all':        return <svg {...p}><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>;
    case 'admin':      return <svg {...p}><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-7h6v7M9 14h0M15 14h0"/></svg>;
    case 'immo':       return <svg {...p}><path d="M3 11l9-7 9 7v10H3z"/><circle cx="15" cy="14" r="1.6"/><path d="M15.5 15.3l2 2.7"/></svg>;
    case 'food':       return <svg {...p}><path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10M16 3c-1.5 0-3 1-3 4s1.5 4 3 4v10"/></svg>;
    case 'paw':        return <svg {...p}><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><path d="M8 14c0-2 2-3 4-3s4 1 4 3-1.5 6-4 6-4-4-4-6z"/></svg>;
    case 'scale':      return <svg {...p}><path d="M12 3v18M5 21h14M7 8l-4 6c0 1.5 1.5 2.5 4 2.5s4-1 4-2.5l-4-6zM17 8l-4 6c0 1.5 1.5 2.5 4 2.5s4-1 4-2.5l-4-6zM4 8h16"/></svg>;
    case 'people':     return <svg {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 21c0-3 3-5 6-5s6 2 6 5M15 21c0-2.5 2-4 4.5-4"/></svg>;
    case 'shield':     return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>;
    case 'car':        return <svg {...p}><path d="M5 16h14v-4l-2-4H7l-2 4v4zM5 16v2M19 16v2"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>;
    case 'bank':       return <svg {...p}><path d="M3 10l9-6 9 6M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18"/></svg>;
    case 'btp':        return <svg {...p}><path d="M4 12h16M6 12V8c0-3 3-5 6-5s6 2 6 5v4M9 8h6M3 16h18M5 21l2-5M19 21l-2-5M9 16v5M15 16v5"/></svg>;
    case 'scissors':   return <svg {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5L20 18M8.5 16.5L20 6"/></svg>;
    case 'truck':      return <svg {...p}><path d="M3 7h11v10H3zM14 10h4l3 4v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
    case 'culte':      return <svg {...p}><path d="M12 2v6M9 5h6M5 22V11l7-4 7 4v11M9 22v-6h6v6"/></svg>;
    case 'culture':    return <svg {...p}><path d="M7 4c-1 4-1 8 0 12 1 2 3 3 5 3s4-1 5-3c1-4 1-8 0-12-1 0-2 1-3 1s-2-1-2-1-1 1-2 1-2-1-3-1z"/><circle cx="10" cy="11" r="0.8" fill={color}/><circle cx="14" cy="11" r="0.8" fill={color}/></svg>;
    case 'edu':        return <svg {...p}><path d="M2 9l10-5 10 5-10 5L2 9zM6 11v5c0 2 3 3 6 3s6-1 6-3v-5M22 9v6"/></svg>;
    case 'ong':        return <svg {...p}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-3 4 4 0 0 1 7 3c0 5.5-7 10-7 10z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'security':   return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8 12l3 3 5-5"/></svg>;
    case 'hotel':      return <svg {...p}><path d="M3 20V8h18v12M3 20h18M7 14h4M7 11h0M14 13a3 3 0 0 1 7 0"/></svg>;
    case 'book':       return <svg {...p}><path d="M3 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H3zM21 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/></svg>;
    case 'factory':    return <svg {...p}><path d="M3 21V11l5 3V11l5 3V8l8 4v9zM3 21h18M8 17h2M14 17h2"/></svg>;
    case 'laptop':     return <svg {...p}><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20M9 19v-3M15 19v-3"/></svg>;
    case 'loisir':     return <svg {...p}><rect x="3" y="8" width="18" height="10" rx="3"/><path d="M8 13h2M9 12v2M15 13h0M17 13h0M15 11h0M17 11h0"/></svg>;
    case 'media':      return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>;
    case 'urgence':    return <svg {...p}><path d="M12 2l3 5 5 1-4 4 1 6-5-3-5 3 1-6-4-4 5-1z"/></svg>;
    case 'info':       return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8h0"/></svg>;
    case 'globe':      return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'oil':        return <svg {...p}><path d="M12 3l-5 7a6 6 0 1 0 10 0z"/><path d="M9 14a3 3 0 0 0 3 3"/></svg>;
    case 'home':       return <svg {...p}><path d="M3 11l9-7 9 7v10H3z"/><path d="M9 21v-6h6v6"/></svg>;
    case 'briefcase':  return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/></svg>;
    case 'restaurant': return <svg {...p}><path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10M16 3c-1.5 0-3 1-3 4s1.5 4 3 4v10"/></svg>;
    case 'sante':      return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>;
    case 'shop':       return <svg {...p}><path d="M5 8h14l-1 13H6zM9 8V5a3 3 0 0 1 6 0v3"/></svg>;
    case 'sport':      return <svg {...p}><path d="M6 9v6M18 9v6M3 11v2M21 11v2M9 7v10M15 7v10M9 12h6"/></svg>;
    case 'telecom':    return <svg {...p}><path d="M3 20a13 13 0 0 1 18 0M6 16a8 8 0 0 1 12 0M9 12a3 3 0 0 1 6 0M12 20h0"/></svg>;
    case 'travel':     return <svg {...p}><path d="M21 12l-9 4-3-2-4 1 2-4-2-4 4 1 3-2 9 4z"/></svg>;
    case 'transport':  return <svg {...p}><path d="M3 12h7l3-4h5l3 4v5H3z"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/><path d="M3 12V8h4"/></svg>;

    // UI icons
    case 'arrow-r':    return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-l':    return <svg {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'back':       return <svg {...p}><path d="M15 18l-6-6 6-6"/></svg>;
    case 'search':     return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>;
    case 'filter':     return <svg {...p}><path d="M3 6h18M6 12h12M10 18h4"/></svg>;
    case 'sliders':    return <svg {...p}><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case 'star':       return <svg {...p} fill={color} stroke="none"><path d="M12 2l3 6.9 7.6.7-5.7 5.1 1.7 7.4L12 18l-6.6 4.1 1.7-7.4L1.4 9.6 9 8.9z"/></svg>;
    case 'star-o':     return <svg {...p}><path d="M12 2l3 6.9 7.6.7-5.7 5.1 1.7 7.4L12 18l-6.6 4.1 1.7-7.4L1.4 9.6 9 8.9z"/></svg>;
    case 'star-half':  return <svg {...p}><path d="M12 2v15.5l-6.6 4.1 1.7-7.4L1.4 9.6 9 8.9z" fill={color} stroke="none"/><path d="M12 2l3 6.9 7.6.7-5.7 5.1 1.7 7.4L12 18l-6.6 4.1 1.7-7.4L1.4 9.6 9 8.9z"/></svg>;
    case 'heart':      return <svg {...p}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-3 4 4 0 0 1 7 3c0 5.5-7 10-7 10z"/></svg>;
    case 'heart-f':    return <svg {...p} fill={color} stroke="none"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-3 4 4 0 0 1 7 3c0 5.5-7 10-7 10z"/></svg>;
    case 'bookmark':   return <svg {...p}><path d="M6 4h12v17l-6-4-6 4z"/></svg>;
    case 'bookmark-f': return <svg {...p} fill={color} stroke={color}><path d="M6 4h12v17l-6-4-6 4z"/></svg>;
    case 'phone':      return <svg {...p}><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case 'message':    return <svg {...p}><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z"/></svg>;
    case 'mail':       return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case 'pin':        return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'clock':      return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'plus':       return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'user':       return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'users':      return <svg {...p}><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-4 4.5-4"/></svg>;
    case 'check':      return <svg {...p}><path d="M5 12l5 5 9-11"/></svg>;
    case 'check-c':    return <svg {...p} fill={color} stroke="none"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'verified':   return <svg {...p} fill={color} stroke="none"><path d="M12 1l2.4 2.1 3.1-.3 1 3 2.8 1.4-.7 3.1 1.7 2.7L20 15l-.3 3.1-3 1-1.4 2.8-3.1-.7-2.7 1.7L7.5 21l-3.1-.3-1-3-2.8-1.4.7-3.1L-.4 10.5 2 8.3l.3-3.1 3-1L6.7 1.4 9.8 2.1z"/><path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'chev-r':     return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chev-d':     return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'chev-l':     return <svg {...p}><path d="M15 18l-6-6 6-6"/></svg>;
    case 'chev-u':     return <svg {...p}><path d="M6 15l6-6 6 6"/></svg>;
    case 'whatsapp':   return <svg {...p}><path d="M3 21l1.5-5A8 8 0 1 1 8 19.5L3 21z"/><path d="M8.5 9.5c0 4 3 6.5 6 6.5l1.5-2-2.5-1-1 1c-1 0-2-1-2-2l1-1-1-2.5L8.5 9.5z" fill={color} stroke="none"/></svg>;
    case 'send':       return <svg {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case 'share':      return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>;
    case 'share-ios':  return <svg {...p}><path d="M12 3v14M8 7l4-4 4 4M5 12v8h14v-8"/></svg>;
    case 'fb':         return <svg {...p}><path d="M14 4h-2a3 3 0 0 0-3 3v3H7v3h2v8h3v-8h3l1-3h-4V7a1 1 0 0 1 1-1h2z"/></svg>;
    case 'ig':         return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill={color}/></svg>;
    case 'web':        return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'navigate':   return <svg {...p}><path d="M3 11l18-8-8 18-2-8z"/></svg>;
    case 'compass':    return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 7-4 1 2-7z"/></svg>;
    case 'sparkle':    return <svg {...p}><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/></svg>;
    case 'close':      return <svg {...p}><path d="M6 6l12 12M18 6l-12 12"/></svg>;
    case 'grid':       return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'list':       return <svg {...p}><path d="M8 6h13M8 12h13M8 18h13M4 6h0M4 12h0M4 18h0"/></svg>;
    case 'map':        return <svg {...p}><path d="M9 4l-6 2v15l6-2 6 2 6-2V4l-6 2zM9 4v15M15 6v15"/></svg>;
    case 'camera':     return <svg {...p}><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></svg>;
    case 'calendar':   return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'tag':        return <svg {...p}><path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.5"/></svg>;
    case 'flame':      return <svg {...p}><path d="M12 3s-4 5-4 9a4 4 0 0 0 8 0c0-2-2-3-2-5 0 0 4 2 4 6a6 6 0 0 1-12 0c0-5 6-10 6-10z"/></svg>;
    case 'trend':      return <svg {...p}><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>;
    case 'ok-pro':     return <svg {...p} fill={color} stroke="none"><path d="M12 2l1.8 1.6L16 3l1 2.4 2.4 1L19 9l1.6 1.8L18 12.5l.6 2.5-2.6.4-1 2.4-2.5-.9L10.5 18l-1.5-2.1-2.5-.4L7 13l-2.4-1L5 9.5 3.4 7.7 5.5 6l-.4-2.5L7.5 3l1-2.4z"/><path d="M8 11l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'circle':     return <svg {...p} fill={color} stroke="none"><circle cx="12" cy="12" r="5"/></svg>;
    case 'dots':       return <svg {...p} fill={color} stroke="none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>;
    case 'bell':       return <svg {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>;
    case 'lock':       return <svg {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>;
    case 'gear':       return <svg {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>;
    case 'logout':     return <svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'wallet':     return <svg {...p}><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 14h2"/></svg>;
    case 'fuel':       return <svg {...p}><path d="M5 21V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17M3 21h16M8 6h6v5H8z"/><path d="M17 7h1l3 3v7a2 2 0 0 1-4 0v-4M19 9v3h2"/></svg>;
    case 'gift':       return <svg {...p}><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13h16M12 9v11M12 9S9 9 9 6.5 12 9 12 9zM12 9s3 0 3-2.5S12 9 12 9z"/></svg>;
    case 'ticket':     return <svg {...p}><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4 2 2 0 0 1 0-4z"/><path d="M9 6v12" strokeDasharray="2 2"/></svg>;
    case 'edit':       return <svg {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>;
    case 'key':        return <svg {...p}><circle cx="8" cy="8" r="4.5"/><path d="M11 11l9 9M17 17l2-2M14 14l2-2"/></svg>;
    case 'help':       return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h0"/></svg>;
    case 'history':    return <svg {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 4v4h4M12 8v4l3 2"/></svg>;
    case 'qr':         return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M20 14v0M14 20v0M17 20h3v-3"/></svg>;
    case 'video':      return <svg {...p}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>;
    case 'flag':       return <svg {...p}><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>;
    case 'bolt':       return <svg {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>;
    case 'weather':    return <svg {...p}><circle cx="8" cy="8" r="3.2"/><path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1"/><path d="M9 18a4 4 0 0 1 .5-7.9A5 5 0 0 1 19 11.5a3.5 3.5 0 0 1-.5 6.5z"/></svg>;
    case 'doc':        return <svg {...p}><path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/></svg>;
    case 'handshake':  return <svg {...p}><path d="M3 12l3-3 4 1 2-2 5 4M21 12l-3 3-3-2M11 8l-3 3 2 2 3-3M14 17l-2 2-3-3"/></svg>;
    case 'logo':       return (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill={OKABA.vert}/>
        <path d="M14 16 L24 10 L34 16 L34 32 L24 38 L14 32 Z" fill={OKABA.or}/>
        <circle cx="24" cy="24" r="5" fill={OKABA.vert}/>
      </svg>
    );
    default:           return <svg {...p}><circle cx="12" cy="12" r="6"/></svg>;
  }
};

// ── 36 Rubriques officielles OKABA ──────────────────────────
const ALL_CATEGORIES = [
  { id: 'admin',        short: 'Admin.',     name: 'Administrations',                                 icon: 'admin',      count: 142,  tone: '#1F4E79' },
  { id: 'immo',         short: 'Immobilier', name: 'Agences Immobilières',                            icon: 'immo',       count: 218,  tone: '#3A75C4' },
  { id: 'alimentation', short: 'Aliment.',   name: 'Alimentation et distribution',                    icon: 'food',       count: 633,  tone: '#C8553D' },
  { id: 'animaux',      short: 'Animaux',    name: 'Animaux et vétérinaires',                         icon: 'paw',        count: 47,   tone: '#B8731E' },
  { id: 'juridique',    short: 'Juridique',  name: 'Assistance Juridique, Comptable & Fiscale',       icon: 'scale',      count: 184,  tone: '#404040' },
  { id: 'assoc',        short: 'Assoc.',     name: 'Associations',                                    icon: 'people',     count: 312,  tone: '#8E5BB5' },
  { id: 'assurances',   short: 'Assurances', name: 'Assurances',                                      icon: 'shield',     count: 56,   tone: '#1F4E79' },
  { id: 'auto',         short: 'Auto',       name: 'Automobiles',                                     icon: 'car',        count: 287,  tone: '#404040' },
  { id: 'banques',      short: 'Banques',    name: 'Banques et organismes financiers',                icon: 'bank',       count: 38,   tone: '#1F4E79' },
  { id: 'btp',          short: 'BTP',        name: 'Bâtiment et Travaux Publics',                     icon: 'btp',        count: 421,  tone: '#D89B1F' },
  { id: 'coiffure',     short: 'Coiffure',   name: 'Coiffure & Esthétique',                           icon: 'scissors',   count: 1230, tone: '#8E5BB5' },
  { id: 'courrier',     short: 'Courrier',   name: 'Courrier et livraison express',                   icon: 'truck',      count: 73,   tone: '#3A75C4' },
  { id: 'cultes',       short: 'Cultes',     name: 'Cultes',                                          icon: 'culte',      count: 96,   tone: '#7A4F2A' },
  { id: 'culture',      short: 'Culture',    name: 'Culture',                                         icon: 'culture',    count: 64,   tone: '#C8553D' },
  { id: 'edu',          short: 'Éducation',  name: 'Enseignement et formation',                       icon: 'edu',        count: 207,  tone: '#3A75C4' },
  { id: 'ong',          short: 'ONG',        name: 'Fondations et ONG',                               icon: 'ong',        count: 88,   tone: '#C8553D' },
  { id: 'securite',     short: 'Sécurité',   name: 'Gardiennage et sécurité',                         icon: 'security',   count: 79,   tone: '#404040' },
  { id: 'hotels',       short: 'Hôtels',     name: 'Hôtels',                                          icon: 'hotel',      count: 156,  tone: '#0E6B34' },
  { id: 'imprim',       short: 'Librairies', name: 'Imprimeries — Librairies — Papeteries',           icon: 'book',       count: 124,  tone: '#7A4F2A' },
  { id: 'industries',   short: 'Industries', name: 'Industries',                                      icon: 'factory',    count: 102,  tone: '#404040' },
  { id: 'info',         short: 'Informat.',  name: 'Informatique — Hifi — Photo — Vidéo',             icon: 'laptop',     count: 198,  tone: '#1F4E79' },
  { id: 'loisirs',      short: 'Loisirs',    name: 'Loisirs',                                         icon: 'loisir',     count: 167,  tone: '#8E5BB5' },
  { id: 'medias',       short: 'Médias',     name: 'Médias',                                          icon: 'media',      count: 41,   tone: '#C8553D' },
  { id: 'urgence',      short: 'Urgence',    name: 'Numéros d\u2019Urgence',                          icon: 'urgence',    count: 18,   tone: '#C8553D' },
  { id: 'utiles',       short: 'Utiles',     name: 'Numéros Utiles',                                  icon: 'info',       count: 64,   tone: '#3A75C4' },
  { id: 'intl',         short: 'Intl.',      name: 'Organismes internationaux',                       icon: 'globe',      count: 32,   tone: '#009E60' },
  { id: 'petrole',      short: 'Pétrole',    name: 'Pétrole',                                         icon: 'oil',        count: 27,   tone: '#404040' },
  { id: 'maison',       short: 'Maison',     name: 'Pour la maison',                                  icon: 'home',       count: 341,  tone: '#B8731E' },
  { id: 'services',     short: 'Services',   name: 'Prestations de services',                         icon: 'briefcase',  count: 478,  tone: '#404040' },
  { id: 'proximite',    short: 'Proximité',  name: 'Services de proximité',                           icon: 'handshake',  count: 52,   tone: '#0B7C39' },
  { id: 'restaurants',  short: 'Restos',     name: 'Restaurants et sorties',                          icon: 'restaurant', count: 842,  tone: '#C8553D' },
  { id: 'sante',        short: 'Santé',      name: 'Santé',                                           icon: 'sante',      count: 234,  tone: '#009E60' },
  { id: 'shopping',     short: 'Shopping',   name: 'Shopping',                                        icon: 'shop',       count: 612,  tone: '#8E5BB5' },
  { id: 'sport',        short: 'Sport',      name: 'Sport et forme',                                  icon: 'sport',      count: 184,  tone: '#D89B1F' },
  { id: 'telecom',      short: 'Télécoms',   name: 'Télécommunications',                              icon: 'telecom',    count: 22,   tone: '#3A75C4' },
  { id: 'tourisme',     short: 'Tourisme',   name: 'Tourisme et voyages',                             icon: 'travel',     count: 91,   tone: '#009E60' },
  { id: 'transport',    short: 'Transport',  name: 'Transport aérien, maritime et terrestre',         icon: 'transport',  count: 524,  tone: '#404040' },
];

// Top 6 categories shown on Home (cover photos)
const TOP_CATEGORIES = [
  { id: 'restaurants', label: 'Restaurants', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75&auto=format&fit=crop' },
  { id: 'coiffure',    label: 'Coiffure',    img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=75&auto=format&fit=crop' },
  { id: 'sante',       label: 'Santé',       img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75&auto=format&fit=crop' },
  { id: 'auto',        label: 'Auto',        img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=75&auto=format&fit=crop' },
  { id: 'hotels',      label: 'Hôtels',      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=75&auto=format&fit=crop' },
  { id: 'btp',         label: 'BTP',         img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=75&auto=format&fit=crop' },
];

// ── Establishments ──────────────────────────────────────────
const ESTABLISHMENTS = [
  {
    id: 'mama-africa', name: 'Chez Maman Africa',
    category: 'Restaurant traditionnel', subCategory: 'restaurants',
    address: 'Quartier Louis · Libreville', neighborhood: 'Quartier Louis',
    rating: 4.8, reviews: 247, distance: 1.2, price: '€€',
    badges: ['pro', 'gabon', 'certif'],
    open: true, closingTime: '23:00',
    phone: '+241 06 12 34 56', email: 'contact@mama-africa.ga',
    web: 'mamaafrica.ga',
    tagline: 'Cuisine gabonaise authentique',
    member: 'Membre depuis 2022', followers: 1842, since: 2018,
    cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop',
    ],
    coords: { lat: 0.4162, lon: 9.4673 },
  },
  {
    id: 'salon-mbolo', name: 'Salon Mbolo Beauté',
    category: 'Coiffure · Soins femmes', subCategory: 'coiffure',
    address: 'Nombakélé · Libreville', neighborhood: 'Nombakélé',
    rating: 4.9, reviews: 318, distance: 0.6, price: '€€',
    badges: ['pro', 'gabon'],
    open: true, closingTime: '20:00',
    phone: '+241 06 45 78 12', email: 'contact@salonmbolo.ga',
    web: 'salonmbolo.ga',
    tagline: 'Tresses · Lissage · Soins',
    member: 'Membre depuis 2021', followers: 2104, since: 2019,
    cover: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80&auto=format&fit=crop',
    ],
    coords: { lat: 0.4082, lon: 9.4521 },
  },
  {
    id: 'hotel-akewa', name: 'Hôtel Akewa Beach',
    category: 'Hôtel 4 étoiles', subCategory: 'hotels',
    address: 'Bord de mer · Libreville', neighborhood: 'Bord de mer',
    rating: 4.5, reviews: 89, distance: 4.2, price: '€€€',
    badges: ['pro', 'certif'],
    open: true, closingTime: '24h/24',
    phone: '+241 01 73 24 50', email: 'reservation@akewa.ga',
    web: 'akewabeach.ga',
    tagline: 'Vue océan · Restaurant · Piscine',
    member: 'Membre depuis 2022', followers: 956, since: 2015,
    cover: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80&auto=format&fit=crop',
    ],
    coords: { lat: 0.3724, lon: 9.4198 },
  },
  {
    id: 'plomberie-express', name: 'Plomberie Express Libreville',
    category: 'BTP · Dépannage 24/7', subCategory: 'btp',
    address: 'Akanda · Libreville', neighborhood: 'Akanda',
    rating: 4.6, reviews: 132, distance: 2.8, price: '€€',
    badges: ['pro', 'gabon'],
    open: true, closingTime: '24h/24',
    phone: '+241 07 88 21 09', email: 'contact@plomberie-express.ga',
    web: 'plomberie-express.ga',
    tagline: 'Interventions rapides à domicile',
    member: 'Membre depuis 2023', followers: 412, since: 2020,
    cover: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80&auto=format&fit=crop',
    ],
    coords: { lat: 0.4501, lon: 9.4878 },
  },
  {
    id: 'menuiserie-akanda', name: 'Bois d\u2019Okoumé',
    category: 'Menuiserie · Pour la maison', subCategory: 'maison',
    address: 'Owendo · Libreville', neighborhood: 'Owendo',
    rating: 4.7, reviews: 64, distance: 7.1, price: '€€',
    badges: ['pro', 'gabon'],
    open: false, closingTime: 'Ouvre à 08:00',
    phone: '+241 07 12 88 44', email: 'contact@boisdokoume.ga',
    web: 'boisdokoume.ga',
    tagline: 'Mobilier sur mesure · Okoumé local',
    member: 'Membre depuis 2024', followers: 248, since: 2022,
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80&auto=format&fit=crop',
    ],
    coords: { lat: 0.2891, lon: 9.5012 },
  },
  {
    id: 'bgd', name: 'BGD Mont-Bouët',
    category: 'Banque · Services financiers', subCategory: 'banques',
    address: 'Mont-Bouët · Libreville', neighborhood: 'Mont-Bouët',
    rating: 4.1, reviews: 421, distance: 1.8, price: '—',
    badges: ['pro', 'certif'],
    open: true, closingTime: '16:30',
    phone: '+241 01 76 24 14', email: 'agence-mb@bgd.ga',
    web: 'bgd.ga',
    tagline: 'Comptes · Crédits · Mobile Money',
    member: 'Membre depuis 2021', followers: 3210, since: 1985,
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop',
    ],
    coords: { lat: 0.4276, lon: 9.4498 },
  },
];

const FEATURED = ESTABLISHMENTS[0];

// ── Reviews ─────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1, author: 'Aminata Boundzanga', initials: 'AB', avatar: 'https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=120&q=80&auto=format&fit=crop',
    rating: 5, date: 'Il y a 3 jours', verified: true,
    text: 'Le poulet nyembwé est incroyable, sauce onctueuse comme à la maison. Service rapide même un samedi midi. Je recommande à 100%.',
    helpful: 12,
    photos: [
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 2, author: 'Jean-Pierre Mboumba', initials: 'JP', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&q=80&auto=format&fit=crop',
    rating: 5, date: 'Il y a 1 semaine', verified: true,
    text: 'Cadre chaleureux, ambiance familiale. Les feuilles de manioc sont préparées dans les règles. Prix très raisonnables pour la qualité.',
    helpful: 8, photos: [],
  },
  {
    id: 3, author: 'Sandra Engonga', initials: 'SE', avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=120&q=80&auto=format&fit=crop',
    rating: 4, date: 'Il y a 2 semaines', verified: true,
    text: 'Très bon repas. Le seul bémol : la salle se remplit vite à midi, mieux vaut réserver. Mention spéciale au gâteau au manioc.',
    helpful: 5,
    photos: [
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 4, author: 'Patrick Obiang', initials: 'PO', avatar: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=120&q=80&auto=format&fit=crop',
    rating: 5, date: 'Il y a 3 semaines', verified: true,
    text: 'Mon adresse préférée à Libreville. Sauce graine, poisson braisé, tout est à tomber. L\u2019équipe est aux petits soins.',
    helpful: 9, photos: [],
  },
];

// ── User (current user profile) ─────────────────────────────
const USER = {
  firstName: 'Patricia',
  lastName: 'Ondo',
  handle: '@patricia_o',
  phone: '+241 06 12 34 56',
  email: 'patricia.ondo@gmail.com',
  city: 'Libreville',
  member: 'Membre depuis mai 2026',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=240&q=80&auto=format&fit=crop',
  stats: { avis: 23, photos: 47, points: 1240, badges: 6 },
  level: 'Explorateur Or',
  recentBookings: [
    {
      id: 1, etab: 'Chez Maman Africa', when: 'Demain · 19:30 · 4 pers.',
      cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80&auto=format&fit=crop',
      status: 'confirmed',
    },
    {
      id: 2, etab: 'Salon Mbolo Beauté', when: 'Sam. 24 mai · 14:00',
      cover: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&q=80&auto=format&fit=crop',
      status: 'pending',
    },
  ],
  favorites: [
    { id: 1, name: 'Hôtel Akewa Beach', cover: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80&auto=format&fit=crop', cat: 'Hôtel' },
    { id: 2, name: 'Bois d\u2019Okoumé',    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80&auto=format&fit=crop', cat: 'Menuiserie' },
  ],
};

// ── Business owner data (Maman Africa vitrine pro) ──────────
const BUSINESS = {
  ...FEATURED,
  owner: { name: 'Marguerite Mavoungou', avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=240&q=80&auto=format&fit=crop', role: 'Fondatrice' },
  // public posts (Reels/photos on vitrine)
  posts: [
    { id: 1, cover: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80&auto=format&fit=crop', caption: 'Nyembwé du jeudi', likes: 124, type: 'photo' },
    { id: 2, cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&auto=format&fit=crop', caption: 'Menu du jour', likes: 87, type: 'photo' },
    { id: 3, cover: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80&auto=format&fit=crop', caption: 'Sauce graine', likes: 156, type: 'reel', views: '2.1k' },
    { id: 4, cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80&auto=format&fit=crop', caption: 'La salle', likes: 64, type: 'photo' },
    { id: 5, cover: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80&auto=format&fit=crop', caption: 'Atanga grillé', likes: 92, type: 'photo' },
    { id: 6, cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop', caption: 'Spécialité maison', likes: 211, type: 'reel', views: '4.8k' },
  ],
  promos: [
    { id: 1, title: 'Soirée Gabonaise', subtitle: 'Tous les jeudis · -15%', ends: 'Se termine dans 3j' },
    { id: 2, title: 'Menu Découverte', subtitle: '3 plats à 12 500 FCFA', ends: 'Permanent' },
  ],
};

Object.assign(window, {
  Icon, OKABA, FONT_DISPLAY, FONT_UI,
  ALL_CATEGORIES, TOP_CATEGORIES,
  ESTABLISHMENTS, FEATURED, REVIEWS,
});


// ===================== 01-data2 =====================
// okaba-data2.jsx — Données du prototype cliquable (marketplace + boutiques)
// Réutilise OKABA, Icon, ESTABLISHMENTS, REVIEWS depuis data.jsx.

// ── Thème VERT O'KABA (fidèle aux captures de la présentation) ──
const OK = {
  green:     '#0A6A2F',   // header + nav + CTA — vert profond
  greenMid:  '#0C7C38',
  greenDeep: '#054D22',
  greenSplashTop: '#0c7338',
  greenSplashBot: '#063f1d',
  gold:      '#F5B800',   // O' du logo + bouton Publier
  goldSoft:  '#FFCF33',
  red:       '#E0241B',   // badge Nouveau + bannière
  ink:       '#1A1A1A',
  ink2:      '#5C5C5C',
  ink3:      '#8E8E8E',
  bg:        '#FFFFFF',
  bg2:       '#F4F6F4',
  line:      '#E6E9E6',
  star:      '#F5A623',
  blue:      '#1F73C4',
  wa:        '#25D366',
  fb:        '#1877F2',
};

// Modules de l'accueil O'KABA — icônes rondes en photos (cf. capture)
const HOME_MODULES = [
  { id: 'market',       label: 'Marketplace',   target: 'market',    param: 'all', img: 'assets/services/boutiques.jpg' },
  { id: 'baie',         label: 'Baie des Rois', target: 'baie',      param: null,  img: 'assets/baie-cover.png' },
  { id: 'tourisme',     label: 'Tourisme',      target: 'tourisme',  param: null,  img: 'assets/tour-plage.jpg' },
  { id: 'made-gabon',   label: 'Made in Gabon', target: 'market',    param: 'gabon', img: 'assets/gabon-flag.svg' },
  { id: 'services-pro', label: 'Services Pro',  target: 'proximity-services', param: null, img: 'assets/proximite-artisan.jpg' },
  { id: 'annuaire',     label: 'Annuaire',      target: 'annuaire',  param: null,  img: 'assets/services/annuaire-book.jpg' },
];

const OKABA_SERVICES = [
  { id: 'marketplace', label: 'Marketplace', target: 'market', params: { cat: 'all' }, img: 'assets/services/boutiques.jpg' },
  { id: 'boutiques', label: 'Boutiques', target: 'shops', img: 'assets/services/service-boutiques.jpg' },
  { id: 'made-gabon', label: 'Made in Gabon', target: 'market', params: { cat: 'gabon' }, img: 'assets/gabon-flag.svg' },
  { id: 'annuaire', label: 'Annuaire', target: 'annuaire', img: 'assets/services/annuaire-book.jpg' },
  { id: 'taxi-vtc', label: 'Taxi / VTC', target: 'annuaire', params: { cat: 'transport' }, img: 'assets/services/service-taxi.jpg' },
  { id: 'coursier', label: 'Coursier', target: 'annuaire', params: { cat: 'courrier' }, img: 'assets/services/service-coursier.jpg' },
  { id: 'manger', label: 'Manger', target: 'annuaire', params: { cat: 'restaurants' }, img: 'assets/services/service-manger.jpg' },
  { id: 'divertir', label: 'Se divertir', target: 'home', img: 'assets/services/service-divertir.jpg' },
  { id: 'emploi', label: 'Emploi', target: 'market', params: { cat: 'services' }, img: 'assets/services/service-emploi.jpg' },
  { id: 'immobilier', label: 'Immobilier', target: 'market', params: { cat: 'immo' }, img: 'assets/services/service-immobilier.jpg' },
  { id: 'tourisme', label: 'Tourisme', target: 'tourisme', img: 'assets/tour-plage.jpg' },
  { id: 'sante-voyage', label: 'Santé', target: 'annuaire', params: { cat: 'sante' }, img: 'assets/services/service-sante-soins.jpg' },
  { id: 'bon-plan', label: 'Bon Plan', target: 'market', params: { cat: 'all' }, img: 'assets/services/service-bon-plan.jpg' },
  { id: 'evenements', label: 'Événements', target: 'events', img: 'assets/services/service-evenements.jpg' },
  { id: 'culture', label: 'Culture', target: 'annuaire', params: { cat: 'culture' }, img: 'assets/services/service-culture.jpg' },
  { id: 'education', label: 'Éducation', target: 'annuaire', params: { cat: 'edu' }, img: 'assets/services/service-education.jpg' },
  { id: 'importation', label: 'Importation', target: 'annuaire', params: { cat: 'transport' }, img: 'assets/services/service-importation.jpg' },
  { id: 'actualite', label: 'Actualité', target: 'notifications', img: 'assets/services/service-actualite.jpg' },
  { id: 'billetterie', label: 'Billetterie', target: 'events', img: 'assets/services/service-billetterie.jpg' },
  { id: 'sante', label: 'Santé', target: 'annuaire', params: { cat: 'sante' }, img: 'assets/services/service-sante-docteur.jpg' },
  { id: 'services', label: 'Services', target: 'proximity-services', img: 'assets/proximite-artisan.jpg' },
  { id: 'services-publics', label: 'Services Publics', target: 'annuaire', params: { cat: 'admin' }, img: 'assets/mairie-lbv-building.jpg' },
  { id: 'entreprenariat', label: 'Entreprenariat', target: 'shops', img: 'assets/services/service-entreprenariat.jpg' },
  { id: 'chat', label: 'Chat', target: 'messages', img: 'assets/services/service-chat.jpg' },
];

// ── TOURISME — explorer le Gabon (style img1) ───────────────
const TOURISM_CATS = [
  { id: 'plages',  label: 'Plages',              img: 'assets/tour-plage.jpg' },
  { id: 'cascades',label: 'Rivières et Cascades',img: 'assets/tour-riviere.jpg' },
  { id: 'parcs',   label: 'Parcs et Réserves',   img: 'assets/tour-parc.jpg' },
  { id: 'patrimoine',label: 'Culture et patrimoine',img: 'assets/tour-patrimoine.jpg' },
  { id: 'gastro',  label: 'Gastronomie',         img: 'assets/tour-gastro.jpg' },
  { id: 'activites',label: 'Activités',          img: 'assets/tour-activites.jpg' },
];
const TOURISM_SPOTS = [
  { id: 'loango', name: 'Parc national de Loango', catId: 'parcs', cat: 'Parc et réserve', city: 'Ogooué-Maritime', rating: 4.9,
    img: 'assets/tour-parc.jpg', description: 'Entre savane, lagunes et océan, Loango offre l’une des expériences naturelles les plus emblématiques du Gabon.' },
  { id: 'pointe-denis', name: 'Pointe Denis', catId: 'plages', cat: 'Plage', city: 'Estuaire · Libreville', rating: 4.7,
    img: 'assets/tour-plage.jpg', description: 'Une escapade balnéaire face à Libreville, appréciée pour ses plages, ses activités nautiques et ses couchers de soleil.' },
  { id: 'kongou', name: 'Chutes de Kongou', catId: 'cascades', cat: 'Cascade', city: 'Ogooué-Ivindo', rating: 4.8,
    img: 'assets/tour-riviere.jpg', description: 'Un vaste ensemble de chutes au cœur de la forêt équatoriale, accessible avec un accompagnement local.' },
  { id: 'musee-national', name: 'Musée national', catId: 'patrimoine', cat: 'Culture et patrimoine', city: 'Estuaire · Libreville', rating: 4.6,
    img: 'assets/tour-patrimoine.jpg', description: 'Masques, rites, langues et mémoires du pays sont réunis dans un parcours consacré au patrimoine gabonais.' },
  { id: 'saveurs-gabonaises', name: 'Saveurs gabonaises', catId: 'gastro', cat: 'Gastronomie', city: 'Libreville', rating: 4.7,
    img: 'assets/tour-gastro.jpg', description: 'Poisson braisé, feuilles de manioc, odika et produits du terroir à découvrir auprès des tables et marchés locaux.' },
  { id: 'arboretum-sibang', name: 'Arboretum de Sibang', catId: 'activites', cat: 'Activité nature', city: 'Estuaire · Libreville', rating: 4.5,
    img: 'assets/tour-activites.jpg', description: 'Une promenade guidée dans un îlot de forêt urbaine pour découvrir la biodiversité et les essences gabonaises.' },
];

// Évènements et sorties (affiches)
const EVENTS = [
  { id: 'ev1', title: 'FEMOGA 26 — Festival de la Mode', date: '29 juin – 05 juil. 2026', time: '18h00', place: 'Esplanade bord de mer · Libreville',
    img: 'assets/event-femoga.jpg', organizer: 'FEMOGA', price: 'Accès selon programmation',
    description: 'La 4e édition du Festival de la Mode au Gabon réunit défilés, village créatif, expositions, ateliers et rencontres autour du thème « Le vestiaire parfait pour la Ve République ».' },
  { id: 'ev2', title: 'Awards de la Femme Gabonaise', date: '31 juillet 2026', time: '20h00', place: 'Radisson Blu · Libreville',
    img: 'assets/cat-mode.jpg', organizer: 'Awards de la Femme Gabonaise', price: 'Sur invitation',
    description: 'Une soirée dédiée aux parcours, initiatives et réussites des femmes gabonaises.' },
  { id: 'ev3', title: 'Festival Gabao Hip-Hop', date: '12 – 14 août 2026', time: '19h30', place: 'IFG · Libreville',
    img: 'assets/tour-activites.jpg', organizer: 'Gabao Hip-Hop', price: 'Billetterie sur place',
    description: 'Trois jours de concerts, performances et rencontres autour des cultures urbaines.' },
];

const BAIE_EVENTS = [
  { id: 'ngori-vacances', title: 'Le Ngori des Vacances', date: '18 juillet 2026', time: '15h00 – 23h30', place: 'La Baie des Rois · Libreville', poster: 'assets/ev-a.jpeg', organizer: 'Ngori des Vacances', price: 'Accès libre',
    description: 'Festival de vacances avec marché artisanal, activités familiales, jeux, animations et concerts à la Baie des Rois.' },
  { id: 'fete-musique-baie', title: 'Fête de la Musique', date: '20 – 21 juin 2026', time: 'À partir de 18h00', place: 'La Baie des Rois · Libreville', poster: 'assets/ev-c.jpeg', organizer: 'La Baie des Rois', price: 'Accès libre',
    description: 'Deux soirées de musique et d’animations sur le front de mer.' },
  { id: 'camp-noel-baie', title: 'Camp de Noël', date: '20 décembre – 3 janvier', time: 'Selon programmation', place: 'La Baie des Rois · Libreville', poster: 'assets/ev-b.jpeg', organizer: 'La Baie des Rois', price: 'Selon activité',
    description: 'Animations, ateliers et activités familiales pendant les fêtes de fin d’année.' },
];

// Catégories du marketplace (annonces)
const MARKET_CATS = [
  { id: 'all',      label: 'Tout',         icon: 'grid' },
  { id: 'gabon',    label: 'Made in Gabon', icon: 'flag' },
  { id: 'immo',     label: 'Immobilier',   icon: 'immo' },
  { id: 'auto',     label: 'Véhicules',    icon: 'car' },
  { id: 'tech',     label: 'Électronique', icon: 'laptop' },
  { id: 'mode',     label: 'Mode',         icon: 'tag' },
  { id: 'maison',   label: 'Maison',       icon: 'home' },
  { id: 'services', label: 'Services',     icon: 'briefcase' },
  { id: 'events',   label: 'Événements',   icon: 'calendar' },
];

// Boutiques (vendeurs) ──────────────────────────────────────
const SHOPS = {
  'mas-famille': {
    id: 'mas-famille', name: 'MAS et Famille', handle: '@masetfamille',
    cat: 'Coopérative Agricole', city: 'Quartier London · Libreville · Gabon',
    verified: true, pro: true, rating: 4.1, ratingStr: '4,1/5', reviews: 28, followers: 2300, followersStr: '2,3 K', since: 2026,
    avatar: 'assets/mas-famille-avatar.jpg',
    cover: 'assets/mas-famille-cover.jpg',
    bio: 'Coopérative agricole familiale spécialisée dans la transformation de produits naturels locaux.',
    produits: 'Savons et shampooings artisanaux, beurre de moabi, poudre de cacao, huile de pain (magningou) — 100 % naturels, sans additifs.',
    phone: '+241 74 06 67 64 / +241 66 61 09 81', email: 'cooperativemasetfamille@gmail.com',
    responseTime: 'Répond en ~2h', photosCount: 11, avisCount: 28,
  },
  'mama-style': {
    id: 'mama-style', name: 'Mama Style', handle: '@mamastyle',
    cat: 'Mode · Pagne & créations', city: 'Libreville · Nombakélé',
    verified: false, pro: true, rating: 4.9, reviews: 412, followers: 8920, since: 2018,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&q=80&auto=format&fit=crop',
    bio: 'Créations sur mesure en pagne et wax. Robes, ensembles et accessoires faits main au Gabon.',
    phone: '+241 06 78 90 12', responseTime: 'Répond en ~3h',
  },
  'okaba-motors': {
    id: 'okaba-motors', name: 'Okaba Motors', handle: '@okabamotors',
    cat: 'Véhicules · Concession', city: 'Libreville · Glass',
    verified: true, pro: true, rating: 4.7, reviews: 128, followers: 3240, since: 2019,
    avatar: 'assets/africa-hilux-4x4.jpg',
    cover: 'assets/africa-hilux-4x4.jpg',
    bio: 'Vente de véhicules d’occasion révisés et garantis. Reprise possible. Financement disponible.',
    phone: '+241 06 22 14 80', responseTime: 'Répond en ~1h',
  },
  'gabon-tech': {
    id: 'gabon-tech', name: 'Gabon Tech Store', handle: '@gabontech',
    cat: 'Électronique · High-tech', city: 'Libreville · Mont-Bouët',
    verified: true, pro: true, rating: 4.8, reviews: 254, followers: 5680, since: 2020,
    avatar: 'assets/africa-phone-shop.jpg',
    cover: 'assets/africa-phone-shop.jpg',
    bio: 'Smartphones, ordinateurs et accessoires neufs et reconditionnés. Garantie 6 à 12 mois. Livraison Libreville.',
    phone: '+241 07 45 11 03', responseTime: 'Répond en ~30 min',
  },
};

// Annonces (listings) ──────────────────────────────────────
// prix en FCFA. ref = numéro de référence (consigne sécurité PDF BETA).
const LISTINGS = [
  {
    id: 'ensemble-wax', cat: 'mode', shop: 'mama-style', madeInGabon: true,
    title: 'Pagne pour mariage coutumier ',
    price: 4500, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Nombakélé', posted: 'Il y a 3 jours', ref: 'OKB-MO-19884',
    featured: false,
    images: [
      'assets/africa-wax-fabric-shop-1.jpg',
      'assets/africa-wax-fabric-shop-2.jpg',
    ],
    specs: [['Tissu', 'Wax premium'], ['Tailles', '36 à 46'], ['Délai', '5 jours'], ['Sur mesure', 'Oui']],
    desc: 'Ensemble deux pièces en wax authentique, confectionné sur mesure. Choix du tissu et des finitions. Retouches offertes. Livraison Libreville sous 5 jours.',
  },
  {
    id: 'pickup-hilux', cat: 'auto', shop: 'okaba-motors',
    title: 'Toyota Hilux 2020 — Double cabine',
    price: 22000000, negotiable: true, condition: 'Occasion',
    city: 'Libreville · Glass', posted: 'Il y a 6 jours', ref: 'OKB-AU-40558',
    featured: false,
    images: ['assets/africa-hilux-4x4.jpg'],
    specs: [['Année', '2020'], ['Kilométrage', '48 000 km'], ['Carburant', 'Diesel'], ['Boîte', 'Manuelle']],
    desc: 'Hilux double cabine 4x4, parfait pour chantier ou usage familial. Pneus neufs, révision complète effectuée. Très robuste.',
  },
  {
    id: 'iphone-14', cat: 'tech', shop: 'gabon-tech',
    title: 'iPhone 14 Pro 256 Go — Reconditionné',
    price: 520000, negotiable: true, condition: 'Reconditionné',
    city: 'Libreville · Mont-Bouët', posted: 'Hier', ref: 'OKB-TE-77120',
    featured: false,
    images: ['assets/iphone-14-pro.jpg'],
    specs: [['Stockage', '256 Go'], ['État', 'Très bon'], ['Batterie', '92 %'], ['Garantie', '6 mois']],
    desc: 'iPhone 14 Pro reconditionné grade A, débloqué tous opérateurs. Livré avec chargeur et coque. Garantie boutique 6 mois. Possibilité de livraison à Libreville.',
  },
  {
    id: 'macbook-air', cat: 'tech', shop: 'gabon-tech',
    title: 'MacBook Air M2 — Neuf scellé',
    price: 980000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Mont-Bouët', posted: 'Il y a 4 jours', ref: 'OKB-TE-66301',
    featured: false,
    images: ['assets/macbook-air-m2-open.png'],
    specs: [['Puce', 'Apple M2'], ['RAM', '8 Go'], ['SSD', '256 Go'], ['Garantie', '12 mois']],
    desc: 'MacBook Air M2 neuf sous blister, garantie internationale 12 mois. Clavier AZERTY. Facture fournie. Livraison gratuite Libreville.',
  },
  {
    id: 'huile-de-palme', cat: 'maison', shop: 'mas-famille', madeInGabon: true, gabonPriority: 1,
    title: 'Huile de palme rouge artisanale',
    price: 2500, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 2 jours', ref: 'OKB-MA-90025',
    featured: true,
    images: ['assets/gabon-huile-palme.jpg'],
    specs: [['Format', '1 L (bouteille consignée)'], ['Fabrication', 'Artisanale'], ['Origine', 'Gabon'], ['Additifs', 'Aucun']],
    desc: 'Huile de palme rouge extraite et pressée de façon artisanale à partir de régimes de palme locaux. Parfaite pour le nkoumou, la sauce gombo ou le poulet nyembwe.',
  },
  {
    id: 'atanga-safou', cat: 'maison', shop: 'mas-famille', madeInGabon: true, gabonPriority: 2,
    title: 'Atanga le tas',
    price: 1500, unit: '', negotiable: true, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 1 jour', ref: 'OKB-MA-90026',
    featured: false,
    images: ['assets/gabon-atanga-safou.jpg'],
    specs: [['Origine', 'Gabon'], ['Saison', 'Juillet à septembre'], ['Conservation', '3 à 5 jours'], ['Additifs', 'Aucun']],
    desc: 'Atanga fraîchement récolté, à déguster grillé ou passé à l’eau chaude. Cueilli et vendu directement par la coopérative, sans intermédiaire.',
  },
  {
    id: 'baton-manioc', cat: 'maison', shop: 'mas-famille', madeInGabon: true, gabonPriority: 3,
    title: 'Bâtons de manioc — lot de 6',
    price: 3000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 4 jours', ref: 'OKB-MA-90027',
    featured: false,
    images: ['assets/gabon-baton-manioc.jpg'],
    specs: [['Quantité', '6 bâtons'], ['Fabrication', 'Artisanale'], ['Origine', 'Gabon'], ['Additifs', 'Aucun']],
    desc: 'Manioc fermenté, pilé et cuit dans la feuille selon la méthode traditionnelle. Accompagne le poisson, la viande ou la sauce feuille.',
  },
  {
    id: 'poisson-fume', cat: 'maison', shop: 'mas-famille', madeInGabon: true, gabonPriority: 4,
    title: 'Poisson fumé du terroir — au kilo',
    price: 4500, unit: '', negotiable: true, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 2 jours', ref: 'OKB-MA-90028',
    featured: false,
    images: ['assets/gabon-poisson-fume.jpg'],
    specs: [['Fumage', 'Artisanal au bois'], ['Origine', 'Gabon'], ['Conservation', '2 semaines'], ['Additifs', 'Aucun']],
    desc: 'Poisson pêché localement puis fumé au bois selon la méthode traditionnelle, pour une conservation longue et un goût fumé authentique.',
  },
  {
    id: 'savon-noir-gabonais', cat: 'maison', shop: 'mas-famille', madeInGabon: true, gabonPriority: 5,
    title: 'Véritable 1er Savon noir Gabonais',
    price: 3500, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 5 jours', ref: 'OKB-MA-90030',
    featured: false,
    images: ['assets/mas-famille-savon-noir.jpg'],
    specs: [['Format', 'Pot 100 % naturel'], ['Fabrication', 'Artisanale'], ['Origine', 'Gabon'], ['Additifs', 'Aucun']],
    desc: 'Le véritable premier savon noir gabonais, 100 % naturel et fabriqué de façon artisanale par la coopérative. Nettoie et purifie l’épiderme : appliquer une cuillère à café, laisser poser quelques minutes puis rincer à l’eau tiède.',
  },
  {
    id: 'huile-de-pain', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Huile de Pain — Magningou',
    price: 2000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 1 mois', ref: 'OKB-MA-90016',
    featured: false,
    images: ['assets/mas-famille-huile-de-pain.jpg'],
    specs: [['Format', '10 g (aussi dispo 5000 F)'], ['Fabrication', 'Artisanale'], ['Origine', 'Gabon'], ['Additifs', 'Aucun']],
    desc: 'C’est la saison sèche, le magningou tu l’as ? Vas chez MAS et Famille coopérative agricole et prends le tien. Ce format est à 2 000 FCFA et il existe aussi pour 5 000 FCFA.',
  },
  {
    id: 'poudre-cacao', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Poudre de cacao 100 % naturelle',
    price: 5000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 3 jours', ref: 'OKB-MA-90017',
    featured: false,
    images: ['assets/mas-famille-poudre-cacao.jpg'],
    specs: [['Poids', '500 g'], ['Fabrication', 'Artisanale'], ['Origine', 'Gabon'], ['Additifs', 'Aucun']],
    desc: 'Poudre de cacao pure, transformée artisanalement par la coopérative à partir de fèves gabonaises. Idéale pour vos boissons chocolatées et pâtisseries maison.',
  },
  {
    id: 'beurre-moabi', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Beurre de Moabi',
    price: 3000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 3 jours', ref: 'OKB-MA-90018',
    featured: false,
    images: ['assets/mas-famille-beurre-moabi.jpg'],
    specs: [['Poids', '50 g'], ['Fabrication', 'Artisanale'], ['Origine', 'Gabon'], ['Additifs', 'Aucun']],
    desc: 'Beurre de moabi 100 % naturel, fabriqué de façon artisanale. Nourrit intensément la peau et les cheveux secs.',
  },
  {
    id: 'savon-tomate-pdt-riz', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Savon naturel Tomate, Pomme de Terre, Riz',
    price: 2600, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 1 semaine', ref: 'OKB-MA-90019',
    featured: false,
    images: ['assets/mas-famille-savon-tomate-pdt-riz.jpg'],
    specs: [['Poids', '135 g'], ['Naturel', '100 %'], ['Usage', 'Corps et visage'], ['Additifs', 'Aucun']],
    desc: 'Savon artisanal à la tomate, pomme de terre et riz. 100 % artisanal, pour le corps et le visage.',
  },
  {
    id: 'savon-carotte-curcuma', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Savon naturel à la Carotte et Curcuma',
    price: 2700, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 1 semaine', ref: 'OKB-MA-90020',
    featured: false,
    images: ['assets/mas-famille-savon-carotte-curcuma.jpg'],
    specs: [['Poids', '135 g'], ['Naturel', '100 %'], ['Peaux', 'Sensibles'], ['Additifs', 'Aucun']],
    desc: 'Savon artisanal à la carotte et au curcuma, formulé pour les peaux sensibles. Corps et visage.',
  },
  {
    id: 'savon-cafe', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Savon naturel Au Café',
    price: 2900, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 1 semaine', ref: 'OKB-MA-90021',
    featured: false,
    images: ['assets/mas-famille-savon-cafe.jpg'],
    specs: [['Poids', '135 g'], ['Naturel', '100 %'], ['Effet', 'Anti-odeur et exfoliant'], ['Additifs', 'Aucun']],
    desc: 'Savon artisanal au café, anti-odeur et exfoliant. Corps et visage, fabrication 100 % artisanale.',
  },
  {
    id: 'savon-palme-curcuma', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Savon naturel Huile de Palme et Curcuma',
    price: 2600, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 2 semaines', ref: 'OKB-MA-90022',
    featured: false,
    images: ['assets/mas-famille-savon-palme-curcuma.jpg'],
    specs: [['Poids', '135 g'], ['Naturel', '100 %'], ['Usage', 'Corps et visage'], ['Additifs', 'Aucun']],
    desc: 'Savon artisanal à l’huile de palme et au curcuma. Corps et visage, sans additifs ni conservateurs.',
  },
  {
    id: 'shampooing-biere-oeufs', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Shampooing 100 % naturel à la bière et aux œufs',
    price: 4000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 2 semaines', ref: 'OKB-MA-90023',
    featured: false,
    images: ['assets/mas-famille-shampooing-biere-oeufs.jpg'],
    specs: [['Poids', '135 g'], ['Naturel', '100 %'], ['Usage', 'Tous types de cheveux'], ['Additifs', 'Aucun']],
    desc: 'Shampooing artisanal 100 % naturel à la bière et aux œufs, pour tous types de cheveux.',
  },
  {
    id: 'shampooing-shikakai', cat: 'maison', shop: 'mas-famille', madeInGabon: true,
    title: 'Shampooing riche en poudre de Shikakaï',
    price: 3500, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Gabon', posted: 'Il y a 2 semaines', ref: 'OKB-MA-90024',
    featured: false,
    images: ['assets/mas-famille-shampooing-shikakai.jpg'],
    specs: [['Poids', '135 g'], ['Naturel', '100 %'], ['Usage', 'Cheveux secs'], ['Additifs', 'Aucun']],
    desc: 'Shampooing artisanal riche en poudre de shikakaï, spécialement formulé pour les cheveux secs.',
  },
];

// ── ANNUAIRE — entités gabonaises (réseau social) ───────────
const ANNU_ENTITIES = {
  'seeg': {
    id: 'seeg', name: 'SEEG', cat: 'Eau & Électricité · Service public', service: 'industries', featured: true, verified: true,
    logo: 'assets/seeg-logo.webp', cover: 'assets/seeg-building.jpg', geo: { x: 40, y: 46 },
    followers: '76,4 K', city: 'Boulevard du Bord de Mer · Libreville', phone: '+241 01 79 59 59',
    links: { website: 'https://www.seeg-gabon.com/', facebook: 'https://www.facebook.com/SEEG-Gabon-197789817663183' },
    bio: 'Société d’Énergie et d’Eau du Gabon. Distribution d’eau potable et d’électricité sur l’ensemble du territoire national.',
  },
  'sobraga': {
    id: 'sobraga', name: 'SOBRAGA', cat: 'Industrie · Boissons du Gabon', service: 'industries', featured: true, verified: true,
    logo: 'assets/sobraga-logo.jpg', cover: 'assets/sobraga-building.jpg', geo: { x: 62, y: 64 },
    followers: '102 K', city: 'Oloumi · Libreville', phone: '+241 01 70 24 00',
    links: { website: 'https://sobraga.net/' },
    bio: 'Société des Brasseries du Gabon. Régab, eau Andza et boissons fabriquées au Gabon depuis 1966.',
  },
  'mairie-lbv': {
    id: 'mairie-lbv', name: 'Mairie de Libreville', cat: 'Administration · Commune', service: 'admin', featured: true, verified: true,
    logo: 'assets/mairie-lbv-logo.gif', cover: 'assets/mairie-lbv-building.jpg', geo: { x: 38, y: 42 },
    followers: '48,2 K', city: 'Hôtel de Ville · Libreville', phone: '+241 01 72 04 04',
    links: { website: 'https://libreville.ga/' },
    bio: 'Compte officiel de la Mairie de Libreville. Services municipaux, état civil, voirie et grands projets de la capitale gabonaise.',
  },
  'fmct': {
    id: 'fmct', name: 'FMCT', cat: 'Aménagement urbain · Baie des Rois', service: 'services', featured: true, verified: true,
    directoryPriority: 390,
    logo: 'assets/fmct/fmct-logo.png', cover: 'assets/baie/fmct-chantier-01.jpg', geo: { x: 37, y: 51 },
    coverAspectRatio: '640 / 473', coverFit: 'cover', coverPosition: 'center',
    followers: 'Page officielle', followersLabel: 'Facebook', directoryMeta: 'Page Facebook officielle',
    city: 'La Baie des Rois · Libreville', phone: '',
    links: { facebook: 'https://www.facebook.com/FmctGabon' },
    bio: 'La Façade Maritime du Champ Triomphal pilote l’aménagement de la Baie des Rois, projet urbain éco-durable du front de mer de Libreville dédié aux affaires, au tourisme et aux loisirs.',
  },
  'min-tourisme': {
    id: 'min-tourisme', name: 'Ministère du Tourisme Durable', cat: 'Ministère · Tourisme & Artisanat', service: 'ministeres', featured: true, verified: true,
    logo: 'assets/mintourisme-logo.webp', cover: 'assets/mintourisme-cover.jpeg', geo: { x: 48, y: 30 },
    followers: '31,5 K', city: 'Boulevard Triomphal · Libreville', phone: '+241 01 76 00 00',
    links: { website: 'https://tourisme.gouv.ga/', facebook: 'https://www.facebook.com/110775097640122' },
    bio: 'Ministère du Tourisme Durable et de l’Artisanat de la République Gabonaise. Promotion des destinations et du patrimoine national.',
  },
  'papyrus': {
    id: 'papyrus', name: 'Papyrus by Chef O’miel', cat: 'Restaurant · Cuisine gabonaise', service: 'restaurants', featured: true, verified: true,
    logo: 'assets/papyrus-logo.jpg', cover: 'assets/papyrus-cover.png', geo: { x: 58, y: 40 },
    followers: '18,9 K', city: 'Terrasse CFNG · Libreville', phone: '+241 06 03 21 45',
    bio: 'Restaurant-terrasse signé Chef O’miel. Cuisine gabonaise revisitée, cocktails et ambiance conviviale au cœur de Libreville.',
  },
  'gabon-telecom': {
    id: 'gabon-telecom', name: 'Gabon Telecom', cat: 'Télécoms · Entreprise', service: 'telecoms', verified: true,
    logo: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format&fit=crop', geo: { x: 28, y: 58 },
    followers: '67,9 K', city: 'Avenue du Colonel Parant · Libreville', phone: '+241 01 79 19 19',
    links: { website: 'https://www.gabontelecom.ga/' },
    bio: 'Opérateur télécom national. Internet fibre, mobile et solutions entreprises partout au Gabon.',
  },
  'chu-libreville': {
    id: 'chu-libreville', name: 'CHU de Libreville', cat: 'Santé · Hôpital public', service: 'sante', verified: true,
    logo: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop', geo: { x: 55, y: 48 },
    followers: '22,7 K', city: 'Avenue Jean-Paul II · Libreville', phone: '+241 01 76 17 31',
    links: { website: 'https://chul.ga/', facebook: 'https://www.facebook.com/chulibreville' },
    bio: 'Centre Hospitalier Universitaire de Libreville. Soins, urgences et spécialités médicales.',
  },
  'bgfi': {
    id: 'bgfi', name: 'BGFIBank Gabon', cat: 'Banque · Finance', service: 'banques', verified: true,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop', geo: { x: 44, y: 70 },
    followers: '54,1 K', city: 'Boulevard de l’Indépendance · Libreville', phone: '+241 01 79 20 20',
    links: { website: 'https://www.bgfi.com/bgfi-bank-gabon/' },
    bio: 'Première banque de la sous-région. Comptes, crédits et solutions de paiement pour particuliers et entreprises.',
  },
  'phare-large': {
    id: 'phare-large', name: 'Le Phare du Large', cat: 'Restaurant · Fruits de mer', service: 'restaurants', verified: true,
    logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&auto=format&fit=crop', geo: { x: 70, y: 36 },
    followers: '12,3 K', city: 'Bord de mer · Libreville', phone: '+241 06 55 12 00',
    bio: 'Restaurant de fruits de mer face à l’océan. Cuisine gabonaise et internationale.',
  },
  'mairie-akanda': {
    id: 'mairie-akanda', name: 'Mairie d’Akanda', cat: 'Administration · Commune', service: 'admin', verified: true,
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop', geo: { x: 33, y: 24 },
    followers: '9,8 K', city: 'Akanda · Estuaire', phone: '+241 01 82 00 00',
    bio: 'Compte officiel de la Mairie d’Akanda. Services municipaux et vie de la commune.',
  },
};
// ── LA BAIE DES ROIS — complexe de loisirs (entité « parent » → enseignes) ──
const bImg = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w || 700}&q=80&auto=format&fit=crop`;
const baieMedia = (src, w) => (/^(?:assets\/|https?:\/\/)/.test(src || '') ? src : bImg(src, w));
const BAIE_LEGACY_TENANTS = [
  { id: 'paul', group: 'Restaurants', name: 'PAUL', cat: 'Boulangerie · pâtisserie · café', rating: 4.7, reviews: 96,
    tagline: 'Boulangerie, pâtisserie & restauration', priceLevel: '€€', open: true, hours: 'Tous les jours · horaires sur place',
    phone: 'Contact sur place', cta: 'Commander', menuLabel: 'Carte',
    links: { website: 'https://www.paul.fr/' },
    img: 'assets/baie/paul-cover.jpg',
    desc: 'La maison PAUL propose à la Baie des Rois ses pains, viennoiseries, pâtisseries, sandwichs et formules de restauration dans un format adapté aux pauses gourmandes du front de mer.',
    tags: ['Boulangerie', 'Pâtisserie', 'Café', 'À emporter'],
    gallery: ['assets/baie/paul-cover.jpg', 'assets/baie/paul-boulangerie.jpg', 'assets/baie/paul-maison.png', 'assets/baie/paul-engagements.jpg'],
    menu: [
      { t: 'Boulangerie & viennoiseries', items: [['Croissant', 'Pur beurre', 0], ['Pain au chocolat', '', 0], ['Sélection de pains PAUL', 'Selon disponibilité', 0]] },
      { t: 'Déjeuner', items: [['Sandwich PAUL', 'Recette selon la sélection du jour', 0], ['Salade', 'Selon la sélection du jour', 0], ['Formule déjeuner', 'Sandwich, dessert et boisson', 0]] },
      { t: 'Pâtisseries & boissons', items: [['Pâtisserie individuelle', 'Selon vitrine', 0], ['Café', '', 0], ['Jus de fruits', '', 0]] },
    ],
    reviewList: [['Estelle M.', 5, 'Il y a 4 j', 'Une adresse pratique pour le petit-déjeuner et les pauses sur la promenade.'], ['Marc O.', 4, 'Il y a 1 sem', 'Bon choix de pains, sandwichs et pâtisseries.']] },
  { id: 'morellis', group: 'Restaurants', name: 'Morelli’s Gelato Gabon', cat: 'Glacier · salon de thé', rating: 4.8, reviews: 196,
    tagline: 'Gelato, desserts & salon de thé', priceLevel: '€€', open: true, hours: 'Tous les jours · 10:00 – 22:30',
    phone: 'Contact sur place', cta: 'Commander', menuLabel: 'Carte',
    links: { website: 'https://morellisgelato.com/' },
    img: 'assets/baie/morellis-sundaes.jpg',
    desc: 'Morelli’s propose une expérience gourmande autour du gelato, des coupes glacées, du café et des boissons, pensée pour les familles et les promenades au bord de l’eau.',
    tags: ['Gelato', 'Desserts', 'Salon de thé', 'Famille'],
    gallery: ['assets/baie/morellis-sundaes.jpg', 'assets/baie/morellis-gelato.jpg', 'assets/baie/morellis-drinks.jpg', 'assets/baie/morellis-strawberry.jpg'],
    menu: [
      { t: 'Gelato', items: [['Coupe 2 parfums', 'Sélection artisanale', 3500], ['Coupe 3 parfums', 'Sélection artisanale', 4500], ['Affogato', 'Gelato vanille et espresso', 4000]] },
      { t: 'Salon de thé', items: [['Thé gourmand', 'Thé et mignardises', 5000], ['Café latte', '', 2500]] },
    ],
    reviewList: [['Mélissa A.', 5, 'Il y a 3 j', 'Les coupes sont généreuses et le cadre face à la baie est très agréable.'], ['Joël M.', 4, 'Il y a 1 sem', 'Une bonne pause glacée pendant la promenade.']] },
  { id: 'labraise', group: 'Restaurants', name: 'La Braise', cat: 'Grillades & braisé', rating: 4.6, reviews: 168,
    tagline: 'Grillades & braisé · ambiance conviviale', priceLevel: '€€', open: true, hours: '12:00 – 23:00',
    phone: '+241 07 47 38 42', cta: 'Réserver une table', menuLabel: 'Menu',
    img: bImg('1529692236671-f1f6cf9683ba'),
    desc: 'Institution du braisé à la Baie des Rois : poisson et poulet braisés, brochettes et accompagnements gabonais, à savourer face à l’océan.',
    tags: ['Terrasse', 'Vue mer', 'À emporter', 'Paiement mobile'],
    gallery: ['1529692236671-f1f6cf9683ba', '1544025162-d76694265947', '1568901346375-23c9450c58cd', '1504674900247-0877df9cc836'],
    menu: [
      { t: 'Grillades', items: [['Poulet braisé entier', 'Sauce et accompagnement', 6000], ['Poisson braisé du jour', '', 7000], ['Côtes de porc grillées', '', 6500], ['Brochettes de bœuf', 'x2', 3500]] },
      { t: 'Accompagnements', items: [['Banane plantain', '', 1500], ['Bâton de manioc', '', 1000], ['Attiéké', '', 2000]] },
      { t: 'Boissons', items: [['Régab (33 cl)', '', 1500], ['Sodas', '', 1000]] },
    ],
    reviewList: [['Rodrigue M.', 5, 'Il y a 3 j', 'Le poisson braisé est excellent, portions généreuses et bon rapport qualité-prix.'], ['Chris N.', 4, 'Il y a 1 sem', 'Bonnes grillades en bord de mer, service rapide.']] },
  { id: 'zaytouna', group: 'Restaurants', name: 'Zaytouna', cat: 'Cuisine libanaise & orientale', rating: 4.7, reviews: 142,
    tagline: 'Cuisine libanaise & orientale', priceLevel: '€€€', open: true, hours: '12:00 – 23:30',
    phone: '+241 06 01 88 88', cta: 'Réserver une table', menuLabel: 'Menu',
    img: bImg('1544510808-91bcbee1df55'),
    desc: 'Mezzés, grillades orientales et pâtisseries maison dans un cadre élégant, l’une des tables de référence du front de mer.',
    tags: ['Halal', 'Terrasse', 'Climatisé', 'Réservation'],
    gallery: ['1544510808-91bcbee1df55', '1504674900247-0877df9cc836', '1546069901-ba9599a7e63c', '1567620905732-2d1ec7ab7445'],
    menu: [
      { t: 'Mezzés', items: [['Houmous', 'Purée de pois chiches, huile d’olive', 3500], ['Moutabal', 'Caviar d’aubergine', 3500], ['Falafel', 'x6', 3000]] },
      { t: 'Grillades', items: [['Chich taouk', 'Brochettes de poulet mariné', 8500], ['Kefta', 'Bœuf haché épicé', 8000], ['Assiette mixte grill', 'Pour 1 pers.', 12000]] },
      { t: 'Desserts', items: [['Baklava', '', 3000], ['Mouhalabia', '', 2500]] },
    ],
    reviewList: [['Leïla H.', 5, 'Il y a 2 j', 'Mezzés généreux et savoureux, on se croirait à Beyrouth.'], ['Omar D.', 5, 'Il y a 1 sem', 'Le chich taouk est parfait, cadre élégant.']] },
  { id: 'sakura', group: 'Restaurants', name: 'Sakura', cat: 'Restaurant japonais', rating: 4.8, reviews: 205,
    tagline: 'Sushi · ramen · cuisine japonaise', priceLevel: '€€€', open: true, hours: '12:00 – 22:30',
    phone: '+241 06 05 20 20', cta: 'Réserver une table', menuLabel: 'Menu',
    img: bImg('1579584425555-c3ce17fd4351'),
    desc: 'Sushis frais, makis et plats chauds japonais préparés minute par nos chefs, à déguster sur place ou à emporter.',
    tags: ['Sushi bar', 'À emporter', 'Climatisé'],
    gallery: ['1579584425555-c3ce17fd4351', '1580476262798-bddd9f4b7369', '1565958011703-44f9829ba187', '1553621042-f6e147245754'],
    menu: [
      { t: 'Sushis & makis', items: [['Assortiment sushi', '12 pièces', 9000], ['California rolls', 'x8', 6000], ['Sashimi saumon', '', 7500]] },
      { t: 'Plats chauds', items: [['Ramen', 'Bouillon, nouilles, œuf', 6500], ['Yakitori', 'Brochettes de poulet', 5000], ['Gyoza', 'x6', 4000]] },
      { t: 'Boissons', items: [['Thé vert', '', 1500], ['Saké', '', 4000]] },
    ],
    reviewList: [['Marina E.', 5, 'Hier', 'Sushis très frais, le meilleur japonais de Libreville.'], ['Hugo T.', 4, 'Il y a 1 sem', 'Bon ramen, service soigné.']] },
  { id: 'lebuffet', group: 'Restaurants', name: 'Le Buffet', cat: 'Buffet à volonté', rating: 4.4, reviews: 120,
    tagline: 'Buffet à volonté · saveurs du monde', priceLevel: '€€', open: true, hours: '12:00 – 23:00',
    phone: '+241 06 07 30 30', cta: 'Réserver une table', menuLabel: 'Formules',
    img: bImg('1555244162-803834f70033'),
    desc: 'Buffet à volonté mêlant spécialités gabonaises et cuisine internationale, idéal en famille ou entre collègues.',
    tags: ['Buffet', 'Famille', 'Climatisé', 'Vue mer'],
    gallery: ['1555244162-803834f70033', '1504674900247-0877df9cc836', '1546069901-ba9599a7e63c', '1551183053-bf91a1d81141'],
    menu: [
      { t: 'Formules', items: [['Buffet déjeuner', 'Entrées, plats, desserts à volonté', 12000], ['Buffet dîner', '', 15000], ['Brunch dominical', '', 18000]] },
      { t: 'Enfants', items: [['Menu enfant', '- 12 ans', 6000]] },
    ],
    reviewList: [['Nadège O.', 5, 'Il y a 4 j', 'Choix immense et tout est bon, parfait en famille.'], ['Franck B.', 4, 'Il y a 2 sem', 'Bon buffet, un peu d’attente le dimanche.']] },
  { id: 'lamaia', group: 'Restaurants', name: 'Lamaia', cat: 'Steakhouse & lounge bar', rating: 4.6, reviews: 156,
    tagline: 'Steakhouse & lounge bar', priceLevel: '€€€', open: true, hours: '16:00 – 02:00',
    phone: '+241 06 09 40 40', cta: 'Réserver une table', menuLabel: 'Carte',
    img: bImg('1544025162-d76694265947'),
    desc: 'Viandes maturées grillées et cocktails maison dans une ambiance lounge, l’adresse tendance des soirées en bord de mer.',
    tags: ['Steakhouse', 'Lounge', 'DJ le week-end', 'Vue mer'],
    gallery: ['1544025162-d76694265947', '1414235077428-338989a2e8c0', '1517248135467-4c7edcad34c4', '1546069901-ba9599a7e63c'],
    menu: [
      { t: 'Viandes', items: [['Entrecôte grillée', 'Sauce au choix', 12000], ['Filet de bœuf', '', 14000], ['Ribs BBQ', '', 10000]] },
      { t: 'Cocktails', items: [['Cocktail signature', '', 5000], ['Mojito', '', 4000]] },
    ],
    reviewList: [['Steve K.', 5, 'Il y a 3 j', 'Viande au top et ambiance lounge très agréable le soir.'], ['Aline P.', 4, 'Il y a 1 sem', 'Bonne adresse pour un dîner chic.']] },
  { id: 'snack-sakura', group: 'Restaurants', name: 'Snack by Sakura', cat: 'Fast food & snacking', rating: 4.3, reviews: 88,
    tagline: 'Fast food & snacking', priceLevel: '€', open: true, hours: '11:00 – 22:00',
    phone: '+241 06 05 21 21', cta: 'Commander', menuLabel: 'Menu',
    img: bImg('1568901346375-23c9450c58cd'),
    desc: 'Le comptoir rapide signé Sakura : burgers, baos et bentos à emporter ou à déguster sur la promenade.',
    tags: ['Fast food', 'À emporter', 'Livraison'],
    gallery: ['1568901346375-23c9450c58cd', '1565958011703-44f9829ba187'],
    menu: [
      { t: 'Snacks', items: [['Burger maison', 'Frites incluses', 5000], ['Bao poulet', 'x2', 4000], ['Bento du midi', '', 6000]] },
      { t: 'Boissons', items: [['Bubble tea', '', 3000], ['Sodas', '', 1000]] },
    ],
    reviewList: [['Yann M.', 4, 'Il y a 2 j', 'Rapide et bon, les baos sont excellents.']] },
  { id: 'murmure', group: 'Bars & lounges', name: 'Murmure', cat: 'Lounge & bar', rating: 4.7, reviews: 96,
    tagline: 'Lounge cosy · cocktails', priceLevel: '€€€', open: true, hours: '17:00 – 02:00',
    phone: '+241 06 11 50 50', cta: 'Réserver', menuLabel: 'Carte',
    img: bImg('1470337458703-46ad1756a187'),
    desc: 'Un lounge feutré au bord de l’eau : cocktails signature, tapas et chicha dans une ambiance douce au coucher du soleil.',
    tags: ['Lounge', 'Cocktails', 'Chicha', 'Vue mer'],
    gallery: ['1470337458703-46ad1756a187', '1551183053-bf91a1d81141', '1566417713940-fe7c737a9ef2'],
    menu: [
      { t: 'Cocktails', items: [['Cocktail signature', '', 5000], ['Mojito', '', 4000], ['Spritz', '', 4500]] },
      { t: 'Tapas', items: [['Planche mixte', '', 9000], ['Olives & feta', '', 3000]] },
    ],
    reviewList: [['Sarah N.', 5, 'Il y a 3 j', 'Ambiance feutrée et cocktails délicieux, coup de cœur.']] },
  { id: 'theone', group: 'Bars & lounges', name: 'THE ONE Lounge', cat: 'Rooftop & nightlife', rating: 4.5, reviews: 210,
    tagline: 'Rooftop · DJ · nightlife', priceLevel: '€€€', open: true, hours: '20:00 – 04:00',
    phone: '+241 06 13 60 60', cta: 'Réserver une table', menuLabel: 'Carte',
    img: bImg('1566417713940-fe7c737a9ef2'),
    desc: 'Le rooftop nightlife du complexe : DJ résidents, cocktails et bouteilles avec vue panoramique sur la baie.',
    tags: ['Rooftop', 'DJ', 'Bouteilles', 'Nightlife'],
    gallery: ['1566417713940-fe7c737a9ef2', '1516450360452-9312f5e86fc7'],
    menu: [
      { t: 'Bar', items: [['Cocktail maison', '', 5000], ['Bouteille (spiritueux)', '', 65000], ['Chicha', '', 6000]] },
    ],
    reviewList: [['Kevin B.', 5, 'Hier', 'La meilleure ambiance du bord de mer, DJ au top.']] },
  { id: 'club-plage', group: 'Loisirs & famille', name: 'Club de Plage & Marina', cat: 'Plage · marina · détente', rating: 4.6, reviews: 74,
    tagline: 'Club de plage · marina · farniente', priceLevel: '€€', open: true, hours: '09:00 – 20:00',
    phone: '+241 06 15 70 70', cta: 'Réserver', menuLabel: 'Tarifs',
    img: 'assets/tour-plage.jpg',
    desc: 'Transats face à l’océan, cabanes privées et activités nautiques à la marina : la parenthèse détente de la Baie des Rois.',
    tags: ['Plage', 'Marina', 'Familial', 'Bar'],
    gallery: ['1506929562872-bb421503ef21', '1519046904884-53103b34b206'],
    menu: [
      { t: 'Détente', items: [['Transat + parasol', 'La journée', 5000], ['Cabane privée', '', 20000]] },
      { t: 'Activités', items: [['Location kayak', '1h', 6000], ['Balade en bateau', 'Marina', 15000]] },
    ],
    reviewList: [['Paola M.', 5, 'Il y a 5 j', 'Super spot pour la journée, eau calme et service au transat.']] },
  { id: 'aire-jeux', group: 'Loisirs & famille', name: 'Aire de jeux enfants', cat: 'Jeux d’eau & espace famille', rating: 4.8, reviews: 61,
    tagline: 'Jeux d’eau & aire de jeux', priceLevel: '€', open: true, hours: '10:00 – 19:00',
    phone: '+241 06 17 80 80', cta: 'Réserver', menuLabel: 'Tarifs',
    img: bImg('1560859251-d563a49c5e4a'),
    desc: 'Jeux d’eau, structures gonflables et animations encadrées pour les enfants pendant que les parents profitent du complexe.',
    tags: ['0-12 ans', 'Jeux d’eau', 'Animateurs', 'Anniversaires'],
    gallery: ['1560859251-d563a49c5e4a'],
    menu: [
      { t: 'Entrées', items: [['Entrée enfant', '1h30', 2000], ['Pass journée', '', 4000], ['Jeux d’eau', 'Accès', 2500]] },
    ],
    reviewList: [['Grace M.', 5, 'Il y a 3 j', 'Espace propre et sécurisé, les enfants adorent les jeux d’eau.']] },
  { id: 'carrefour', group: 'Shopping', name: 'Carrefour by Prix Import', cat: 'Supermarché', rating: 4.2, reviews: 340,
    tagline: 'Supermarché · courses & plus', priceLevel: '', open: true, hours: '09:00 – 21:00',
    phone: '+241 01 44 20 20', cta: 'Voir le magasin', menuLabel: 'Rayons',
    img: bImg('1604719312566-8912e9227c6a'),
    desc: 'Le supermarché du complexe : alimentation, produits frais, électroménager et parapharmacie, avec parking gratuit.',
    tags: ['Alimentation', 'Électroménager', 'Parking', 'Mobile Money'],
    gallery: ['1604719312566-8912e9227c6a', '1534723452862-4c874018d66d'],
    menu: [
      { t: 'Rayons', items: [['Alimentation & produits frais', '', 0], ['Électroménager & high-tech', '', 0], ['Mode & maison', '', 0], ['Parapharmacie', '', 0]] },
    ],
    reviewList: [['Divine O.', 4, 'Il y a 1 sem', 'Grand choix et bien approvisionné, pratique.']] },
  { id: 'galerie', group: 'Shopping', name: 'Galerie des Créateurs', cat: 'Boutiques & mode', rating: 4.5, reviews: 61,
    tagline: 'Boutiques & créateurs gabonais', priceLevel: '€€', open: true, hours: '10:00 – 21:00',
    phone: '+241 06 18 90 90', cta: 'Voir les boutiques', menuLabel: 'Enseignes',
    img: bImg('1601924994987-69e26d50dc26'),
    desc: 'Une galerie dédiée aux créateurs gabonais : mode, pagne et wax, accessoires, beauté et souvenirs faits au Gabon.',
    tags: ['Mode', 'Créateurs', 'Beauté', 'Souvenirs'],
    gallery: ['1601924994987-69e26d50dc26'],
    menu: [
      { t: 'Enseignes', items: [['Créateurs gabonais', 'Mode, pagne & wax', 0], ['Accessoires & bijoux', '', 0], ['Beauté & parfumerie', '', 0], ['Souvenirs du Gabon', '', 0]] },
    ],
    reviewList: [['Sonia P.', 5, 'Il y a 1 sem', 'Belle sélection de créateurs locaux, j’adore.']] },
];

const standAsset = name => `assets/baie/stands/${name}`;
const BAIE_COLLECTED_TENANTS = [
  { id: 'labraise', group: 'Restaurants', name: 'Restaurant La Braise', cat: 'Restaurant · Spécialité grillades',
    tagline: 'Grillades au bord de mer', priceLevel: '€€', open: true, hours: 'Lun. – Dim. · 07:30 – 22:30',
    phone: '+241 07 47 38 342', manager: 'Mme BALKINDRA Hélène', cta: 'Appeler',
    address: 'Bord de mer, Zone Nord, Baie des Rois', zone: 'Zone Nord · Bord de mer', gps: '0.4031227, 9.4324317',
    img: standAsset('la-braise-logo.png'), logo: standAsset('la-braise-logo.png'), imgFit: 'cover', imgPosition: 'center',
    desc: 'Spécialité grillades. Réservation et livraison disponibles.',
    tags: ['Terrasse ou plein air', 'Espèces', 'Carte bancaire', 'Airtel Money'],
    gallery: ['la-braise-logo.png', 'la-braise-interieur.png', 'la-braise-produit.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '23 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'touti-frouti', group: 'Restaurants', name: 'Touti Frouti', cat: 'Restaurant · Sucré & salé',
    tagline: 'Desserts, jus, petits-déjeuners & livraison', priceLevel: '€', open: true, hours: 'Lun. – Dim. · 24 h/24',
    phone: '+241 06 51 67 878', manager: 'Mohamed', cta: 'Appeler',
    address: 'Bord de mer, Zone Nord, Baie des Rois', zone: 'Zone Nord · Bord de mer', gps: '0.4049158, 9.4313719',
    img: standAsset('touti-frouti-logo.png'), logo: standAsset('touti-frouti-logo.png'), imgFit: '162% auto', imgPosition: 'center 18%',
    desc: 'Offre sucrée et salée avec service de livraison.',
    tags: ['Terrasse ou plein air', 'Livraison', 'Espèces', 'Airtel Money'],
    gallery: ['touti-frouti-logo.png', 'touti-frouti-facade.png', 'touti-frouti-interieur.png'].map(standAsset),
    links: { facebook: 'https://fb.com/toutifroutiplus', instagram: 'https://instagram.com/toutifroutiplus', tiktok: 'https://tiktok.com/@toutifroutiplus' },
    collected: true, collectedAt: '23 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'rhuma', group: 'Bars & lounges', name: 'Le Rhum’A', cat: 'Restaurant · Bar',
    tagline: 'Rhums arrangés & tapas', priceLevel: '€€', open: true, hours: 'Mer. – Ven. · 16:00 – 02:00',
    phone: '+241 06 28 44 584', email: 'rhumalibreville@gmail.com', manager: 'M. Sirick', cta: 'Appeler',
    address: 'Bord de mer, Zone Centre, Baie des Rois', zone: 'Zone Centre · Bord de mer', gps: '0.4027391, 9.433142',
    img: standAsset('rhuma-logo.png'), logo: standAsset('rhuma-logo.png'),
    desc: 'Vente de rhums arrangés et tapas. Établissement ouvert à tous.',
    tags: ['Terrasse ou plein air', 'Espèces', 'Carte bancaire', 'Airtel Money'],
    gallery: ['rhuma-logo.png', 'rhuma-facade.png', 'rhuma-interieur-1.png', 'rhuma-interieur-2.png', 'rhuma-interieur-3.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'sunu-assurances', group: 'Services', name: 'SUNU Assurances', cat: 'Entreprise · Assurance',
    tagline: 'Assurance', priceLevel: '€', open: true, hours: 'Lun. – Ven. · 08:00 – 17:00',
    phone: '+241 01 17 43 434', email: 'gabon.vie@sunu-group.com', cta: 'Appeler',
    address: 'Bord de mer, Zone Centre, Baie des Rois', zone: 'Zone Centre · Bord de mer', gps: '0.4049928, 9.431489',
    img: standAsset('sunu-logo.png'), logo: standAsset('sunu-logo.png'), imgFit: 'contain', desc: 'Stand SUNU Assurances à la Baie des Rois.',
    tags: ['Kiosque ou stand', 'Espèces', 'Airtel Money'], gallery: ['sunu-logo.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'creamsty', group: 'Restaurants', name: 'Creamsty Glaces', cat: 'Glacier',
    tagline: 'Glaces & desserts', priceLevel: '€', open: true, hours: 'Lun. – Dim. · 24 h/24',
    phone: '+241 07 44 38 556', email: 'nkolechristie@gmail.com', cta: 'Appeler',
    address: 'Promenade, Zone Centre, Baie des Rois', zone: 'Zone Centre · Promenade', gps: '0.4048801, 9.4312743',
    img: standAsset('creamsty-logo.png'), logo: standAsset('creamsty-logo.png'), desc: 'Glacier installé sur la promenade de la Baie des Rois.',
    tags: ['Kiosque ou stand', 'Espèces', 'Airtel Money'],
    gallery: ['creamsty-logo.png', 'creamsty-facade.png', 'creamsty-interieur.png', 'creamsty-produit.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'argana', group: 'Restaurants', name: 'Argana', cat: 'Restaurant',
    tagline: 'Restaurant sur la promenade', priceLevel: '€', open: true, hours: 'Lun. – Dim. · 08:00 – 18:00',
    phone: '+241 06 28 35 552', cta: 'Appeler',
    address: 'Promenade, Zone Centre, Baie des Rois', zone: 'Zone Centre · Promenade', gps: '0.4049607, 9.4312696',
    img: standAsset('argana-logo.png'), logo: standAsset('argana-logo.png'), desc: 'Restaurant en kiosque sur la promenade de la Baie des Rois.',
    tags: ['Kiosque ou stand', 'Espèces'],
    gallery: ['argana-logo.png', 'argana-facade.png', 'argana-interieur.png', 'argana-menu.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'ivoca', group: 'Restaurants', name: 'Ivoca Gabon', cat: 'Restaurant · Jus & gourmandises',
    tagline: 'Jus naturels, smoothies & mini pancakes', priceLevel: '€€', open: true, hours: 'Mar. – Ven. · 14:00 – 20:00',
    phone: '+241 07 72 70 952', email: 'pawoucs@gmail.com', manager: 'Claude PAWOU', cta: 'Appeler',
    address: 'Promenade, Zone Centre, Baie des Rois', zone: 'Zone Centre · Promenade', gps: '0.4047955, 9.4311898',
    img: standAsset('ivoca-visuel.png'), logo: standAsset('ivoca-visuel.png'),
    desc: 'Fabrication de jus naturels 100 % sans sucre ajouté, smoothies et mini pancakes.',
    tags: ['Kiosque ou stand', 'Espèces', 'Airtel Money'], gallery: ['ivoca-visuel.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'zaytouna', group: 'Restaurants', name: 'Zaytouna', cat: 'Restaurant libanais',
    tagline: 'Hospitalité du Levant & douceur de l’Orient', priceLevel: '€€', open: true, hours: 'Lun. – Dim. · 24 h/24',
    phone: '+241 06 01 88 188', manager: 'Nader Komo', cta: 'Appeler',
    address: 'Bord de mer, Zone Nord, Baie des Rois', zone: 'Zone Nord · Bord de mer', gps: '0.5082832, 9.413057',
    img: bImg('1544510808-91bcbee1df55'),
    desc: 'Restaurant libanais moderne au cœur de Libreville, où l’hospitalité du Levant rencontre la douceur de l’Orient.',
    tags: ['Terrasse ou plein air', 'Espèces', 'Carte bancaire'],
    gallery: ['1544510808-91bcbee1df55', '1504674900247-0877df9cc836', '1546069901-ba9599a7e63c'].map(id => bImg(id, 700)),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725', mediaNote: 'Les médias collectés étaient attribués à Touti Frouti.' },
  { id: 'paul', group: 'Restaurants', name: 'PAUL', cat: 'Restaurant · Café',
    tagline: 'Boulangerie, pâtisserie & café', priceLevel: '€€€', open: true, hours: 'Lun. – Dim. · 16:00 – 02:00',
    phone: '+241 01 14 49 999', email: 'paulbdr@resto-group.com', manager: 'Mme MEKINA Fabricia', cta: 'Appeler',
    address: 'Bord de mer, Zone Centre, Baie des Rois', zone: 'Zone Centre · Bord de mer', gps: '0.4051262, 9.4315016',
    img: standAsset('paul-facade.png'), logo: standAsset('paul-facade.png'), desc: 'Restaurant et café PAUL de la Baie des Rois.',
    tags: ['Local fixe', 'Espèces', 'Carte bancaire'], gallery: ['paul-facade.png', 'paul-interieur.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
  { id: 'otaku-n-co', group: 'Shopping', name: 'Otaku N Co', cat: 'Boutique · Culture manga',
    tagline: 'Manga, figurines, cosplay & espace jeu', priceLevel: '€€', open: true, hours: 'Lun. – Dim. · 24 h/24',
    phone: '+241 07 45 00 456', manager: 'Amélie Gisèle', cta: 'Appeler',
    address: 'Bord de mer, Zone Centre, Baie des Rois', zone: 'Zone Centre · Bord de mer',
    img: standAsset('otaku-facade-2.png'), logo: standAsset('otaku-logo.png'),
    desc: 'Figurines, mangas, colliers, cosplay, tableaux, sacs, katanas et espace jeu.',
    tags: ['Local fixe', 'Espèces'],
    gallery: ['otaku-logo.png', 'otaku-facade-2.png', 'otaku-interieur-1.png', 'otaku-interieur-2.png', 'otaku-produit.png'].map(standAsset),
    links: {}, collected: true, collectedAt: '25 juillet 2026', collectionRef: 'OKB-BDR-20260725' },
];
const BAIE_COLLECTED_IDS = new Set(BAIE_COLLECTED_TENANTS.map(t => t.id));
const BAIE_TENANTS = [...BAIE_COLLECTED_TENANTS, ...BAIE_LEGACY_TENANTS.filter(t => !BAIE_COLLECTED_IDS.has(t.id))];
const BAIE_TENANTS_MAP = Object.fromEntries(BAIE_TENANTS.map(t => [t.id, t]));
ANNU_ENTITIES['baie-des-rois'] = {
  id: 'baie-des-rois', name: 'La Baie des Rois', type: 'complexe',
  cat: 'Complexe front de mer · Sorties', service: 'restaurants', featured: true, verified: true,
  directoryPriority: 400,
  logo: 'assets/ev-d.jpeg',
  cover: 'assets/baie-cover.png',
  photos: ['assets/baie-cover.png', 'assets/baie-2.png'],
  geo: { x: 36, y: 52 }, followers: '27,3 K', city: 'Bord de mer · Libreville', phone: '+241 06 00 12 00',
  links: { facebook: 'https://www.facebook.com/BaieDesRois/' },
  tagline: 'Le rendez-vous du bord de mer', rating: 4.7, reviewsTotal: '3 200', priceLevel: '€€', hours: 'Tous les jours · 10:00 – 00:00',
  bio: 'Pilotée par la Façade Maritime du Champ Triomphal sous l’égide du FGIS, la Baie des Rois transforme le front de mer de Libreville en un pôle éco-durable de tourisme, d’affaires et de loisirs.',
  gallery: ['1506929562872-bb421503ef21', '1519046904884-53103b34b206', '1414235077428-338989a2e8c0', '1519708227418-c8fd9a32b7a2', '1489599849927-2ee91cede3ba', '1470229722913-7c0e2dbbafd3'],
  tenants: BAIE_TENANTS,
};

// Services de l'annuaire (grille d'accueil)
const ANNU_SERVICES = [
  { id: 'admin',       label: 'Administrations',      icon: 'home',     count: 24,  tone: '#0E6B34', bg: 'rgba(14,107,52,0.10)' },
  { id: 'ministeres',  label: 'Ministères',           icon: 'shield',   count: 18,  tone: '#1F4E79', bg: 'rgba(31,78,121,0.10)' },
  { id: 'entreprises', label: 'Entreprises',          icon: 'briefcase',count: 156, tone: '#C8553D', bg: 'rgba(200,85,61,0.10)' },
  { id: 'sante',       label: 'Santé',                icon: 'sante',    count: 89,  tone: '#E0241B', bg: 'rgba(224,36,27,0.09)' },
  { id: 'restaurants', label: 'Restaurants',          icon: 'restaurant',count: 210,tone: '#D89B1F', bg: 'rgba(216,155,31,0.14)' },
  { id: 'banques',     label: 'Banques & Assurances', icon: 'bank',     count: 32,  tone: '#1B8C4A', bg: 'rgba(27,140,74,0.10)' },
  { id: 'education',   label: 'Éducation',            icon: 'book',     count: 67,  tone: '#8E5BB5', bg: 'rgba(142,91,181,0.10)' },
  { id: 'telecoms',    label: 'Télécoms',             icon: 'globe',    count: 8,   tone: '#3A75C4', bg: 'rgba(58,117,196,0.10)' },
];
// Stories / Réels (en haut de l'annuaire)
const ANNU_STORIES = [
  { id: 'mairie-lbv', label: 'Mairie LBV', live: true },
  { id: 'sobraga', label: 'SOBRAGA' },
  { id: 'min-tourisme', label: 'Min. Tourisme' },
  { id: 'gabon-telecom', label: 'Gabon Telecom' },
];
// Réels (vidéos courtes)
const ANNU_REELS = [
  { id: 'r1', entity: 'mairie-lbv', views: '12,4 K', img: 'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=400&q=80&auto=format&fit=crop', title: 'Nettoyage du front de mer' },
  { id: 'r2', entity: 'sobraga', views: '88 K', img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&q=80&auto=format&fit=crop', title: 'Visite de la brasserie' },
  { id: 'r3', entity: 'min-tourisme', views: '24 K', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&q=80&auto=format&fit=crop', title: 'Loango vu du ciel' },
  { id: 'r5', entity: 'seeg', views: '15 K', img: 'assets/seeg-building.jpg', title: 'Dans les coulisses du réseau' },
  { id: 'r6', entity: 'papyrus', views: '41 K', img: 'assets/papyrus-cover.png', title: 'Le nyembwe du Chef' },
  { id: 'r4', entity: 'gabon-telecom', views: '9,1 K', img: 'assets/okaba-banner.png', title: 'La fibre arrive à Akanda' },
  { id: 'r7', entity: 'fmct', views: 'Projet', img: 'assets/baie/fmct-chantier-03.jpg', title: 'La Baie des Rois en transformation' },
];
// Feed de publications (style réseau social)
const ANNU_POSTS = [
  { id: 'p1', entity: 'mairie-lbv', time: 'Il y a 2 h',
    text: 'Lancement officiel des travaux de réhabilitation de la voirie du quartier Glass. Merci aux Librevillois pour leur patience 🚧🇬🇦',
    img: 'assets/mairie-lbv-building.jpg', likes: 1240, comments: 86, shares: 42 },
  { id: 'p2', entity: 'sobraga', time: 'Il y a 5 h',
    text: 'La Régab fait peau neuve ! Découvrez notre nouvelle bouteille consignée, toujours brassée à Libreville. #MadeInGabon',
    img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop', likes: 5680, comments: 312, shares: 198 },
  { id: 'p3', entity: 'min-tourisme', time: 'Hier',
    text: 'Saison touristique 2026 : le Parc national de Loango rouvre ses pistes d\u2019observation des éléphants de forêt et des baleines à bosse 🐘🐋',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&auto=format&fit=crop', likes: 3210, comments: 145, shares: 276 },
  { id: 'p4', entity: 'gabon-telecom', time: 'Il y a 2 j',
    text: 'La fibre optique est désormais disponible à Akanda. Souscrivez en agence ou directement sur O\u2019KABA 📶',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop', likes: 2040, comments: 230, shares: 88 },
  { id: 'p5', entity: 'seeg', time: 'Il y a 4 h',
    text: 'Travaux de renforcement du réseau électrique à Libreville. Quelques coupures programmées ce week-end dans la zone de Glass. Merci de votre compréhension ⚡',
    img: 'assets/seeg-building.jpg', likes: 1870, comments: 412, shares: 96 },
  { id: 'p6', entity: 'seeg', time: 'Hier',
    text: 'Pensez à relever votre compteur et à régler vos factures directement depuis O\u2019KABA, sans vous déplacer 💧',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop', likes: 940, comments: 88, shares: 54 },
  { id: 'p7', entity: 'papyrus', time: 'Il y a 6 h',
    text: 'Ce week-end au Papyrus : nyembwe de poulet, brochettes et cocktails maison sur la terrasse 🌴 Réservez votre table !',
    img: 'assets/papyrus-cover.png', likes: 2310, comments: 178, shares: 64 },
  { id: 'p8', entity: 'papyrus', time: 'Il y a 2 j',
    text: 'Merci à tous pour la soirée d’hier 🔥 Chef O’miel vous prépare une nouvelle carte pour la rentrée.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop', likes: 1520, comments: 96, shares: 38 },
  { id: 'p9', entity: 'fmct', time: 'Projet Baie des Rois',
    text: 'La Façade Maritime du Champ Triomphal poursuit l’aménagement de la Baie des Rois, nouveau pôle éco-durable du front de mer de Libreville.',
    img: 'assets/baie/fmct-chantier-01.jpg', likes: 0, comments: 0, shares: 0 },
  { id: 'p10', entity: 'fmct', time: 'Développement urbain',
    text: 'Espaces publics, activités économiques, tourisme et loisirs composent ce projet urbain porté autour du Champ Triomphal.',
    img: 'assets/baie/fmct-chantier-02.jpg', likes: 0, comments: 0, shares: 0 },
];

// Notifications ─────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, type: 'message', icon: 'message', tone: '#1F8A5B',
    title: 'Okaba Motors vous a répondu',
    body: '« Oui le RAV4 est toujours disponible, passez quand vous voulez. »',
    time: 'Il y a 12 min', unread: true },
  { id: 2, type: 'price', icon: 'tag', tone: '#C8553D',
    title: 'Baisse de prix sur une annonce suivie',
    body: 'iPhone 14 Pro 256 Go est passé à 520 000 F.',
    time: 'Il y a 1 h', unread: true },
  { id: 3, type: 'follow', icon: 'user', tone: '#3A75C4',
    title: 'Mama Style a publié une nouvelle annonce',
    body: 'Ensemble pagne wax sur mesure — Femme.',
    time: 'Il y a 3 h', unread: false },
  { id: 4, type: 'review', icon: 'star', tone: '#D89B1F',
    title: 'Votre avis a été publié',
    body: 'Merci d\u2019avoir noté Gabon Tech Store (5 étoiles).',
    time: 'Hier', unread: false },
  { id: 5, type: 'system', icon: 'shield', tone: '#0E6B34',
    title: 'Conseil sécurité O\u2019KABA',
    body: 'Rencontrez le vendeur dans un lieu public et vérifiez le produit avant de payer.',
    time: 'Il y a 2 j', unread: false },
];

// Helper : format prix FCFA
const fcfa = (n) => n.toLocaleString('fr-FR').replace(/\u202f/g, ' ') + ' F';

// Annonce vedette (bannière marketplace)
const FEATURED_LISTING = LISTINGS[0];

Object.assign(window, {
  OK, EVENTS, TOURISM_CATS, TOURISM_SPOTS,
  ANNU_ENTITIES, ANNU_SERVICES, ANNU_STORIES, ANNU_REELS, ANNU_POSTS,
  HOME_MODULES, MARKET_CATS, SHOPS, LISTINGS, FEATURED_LISTING, NOTIFICATIONS, fcfa,
});


// ===================== 02-nav =====================
// okaba-nav.jsx — Bezel iPhone doré, router (historique/back), status bar, tab bar
const { useState, useEffect, useRef, createContext, useContext, useCallback } = React;

// ── Navigation context (pile d'historique) ──────────────────
const NavCtx = createContext(null);
const useNav = () => useContext(NavCtx);

// La maquette n'a pas de backend d'authentification : on conserve donc une
// session locale après la première connexion/inscription pour alléger la démo.
const OKABA_DEMO_SESSION_KEY = 'okaba.demo.session';

function hasOkabaDemoSession() {
  try {
    return window.localStorage.getItem(OKABA_DEMO_SESSION_KEY) === 'active';
  } catch {
    return false;
  }
}

function saveOkabaDemoSession() {
  try {
    window.localStorage.setItem(OKABA_DEMO_SESSION_KEY, 'active');
  } catch {
    // Le parcours reste utilisable même si le stockage local est indisponible.
  }
}

function clearOkabaDemoSession() {
  try {
    window.localStorage.removeItem(OKABA_DEMO_SESSION_KEY);
  } catch {
    // Rien d'autre à faire pour une maquette hors ligne.
  }
}

function NavProvider({ children, initial = 'splash', initialParams = {} }) {
  // stack: [{screen, params, scroll}]
  const [stack, setStack] = useState([{ screen: initial, params: initialParams }]);
  const [tab, setTab] = useState('home');
  const [dir, setDir] = useState('fwd');
  const [pubSheet, setPubSheet] = useState(false);

  const navigate = useCallback((screen, params = {}) => {
    setDir('fwd');
    setStack(s => [...s, { screen, params }]);
  }, []);
  const back = useCallback(() => {
    setDir('back');
    setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  }, []);
  // remplace toute la pile (utilisé par la tab bar)
  const goTab = useCallback((screen, tabId) => {
    setDir('fwd');
    setStack([{ screen, params: {} }]);
    if (tabId) setTab(tabId);
  }, []);
  const reset = useCallback((screen, params = {}) => {
    setDir('fwd'); setStack([{ screen, params }]);
  }, []);

  const top = stack[stack.length - 1];
  const canBack = stack.length > 1;

  // Le bouton Retour Android doit suivre la même navigation que les boutons
  // de la maquette. Une ref évite de réenregistrer le listener natif à chaque
  // changement d'écran tout en lui donnant toujours l'état le plus récent.
  const nativeBackHandler = useRef(null);
  nativeBackHandler.current = () => {
    if (pubSheet) {
      setPubSheet(false);
      return;
    }

    if (canBack) {
      back();
      return;
    }

    // Les onglets sont des racines de navigation. Depuis un onglet autre que
    // l'accueil, Retour revient d'abord à l'accueil avant de quitter l'app.
    if (tab !== 'home') {
      goTab('home', 'home');
      return;
    }

    // À la racine de l'accueil, on laisse Android fermer l'application.
    CapacitorApp.exitApp();
  };

  useEffect(() => {
    if (!IS_NATIVE_APP) return undefined;

    let listener;
    let disposed = false;

    CapacitorApp.addListener('backButton', () => nativeBackHandler.current?.())
      .then(handle => {
        if (disposed) handle.remove();
        else listener = handle;
      });

    return () => {
      disposed = true;
      listener?.remove();
    };
  }, []);

  // expose une API globale pour l'export PPTX (navigation directe)
  useEffect(() => {
    window.__okabaNav = {
      navigate,
      back,
      goTab,
      reset,
      getState: () => ({ top, tab, pubSheet }),
    };
  }, [navigate, back, goTab, reset, top, tab, pubSheet]);

  return (
    <NavCtx.Provider value={{ navigate, back, goTab, reset, top, canBack, tab, setTab, dir, depth: stack.length, pubSheet, setPubSheet }}>
      {children}
    </NavCtx.Provider>
  );
}

// ── Status bar ──────────────────────────────────────────────
// Les imports ES sont évalués avant le corps de main.jsx. Lire ici un drapeau
// défini par main.jsx classait donc toujours l'APK comme une page web et
// affichait la barre iPhone fictive par-dessus celle du téléphone. Capacitor
// est la source de vérité pour l'environnement natif. Sur le web de bureau,
// le cadre de démonstration reste visible ; sur un vrai téléphone, les règles
// responsive le retirent pour conserver toute la surface utile.
const IS_NATIVE_APP = Capacitor.isNativePlatform();
// Dans l'APK, le téléphone fournit déjà sa propre coque et sa barre système.
// Dans un navigateur de bureau, on conserve au contraire le cadre de la
// maquette Claude Design pour visualiser l'interface à sa vraie échelle mobile.
const USE_DEVICE_CHROME = IS_NATIVE_APP;
const APP_SAFE_TOP = IS_NATIVE_APP
  ? 'max(env(safe-area-inset-top), var(--okaba-status-bar-height, 24px))'
  : USE_DEVICE_CHROME ? 'env(safe-area-inset-top, 0px)' : '50px';
// Le contenu monte derrière la barre de statut (edge-to-edge) : les en-têtes
// intègrent donc la zone sûre dans leur padding haut pour rester lisibles.
const APP_HEADER_TOP = `calc(${APP_SAFE_TOP} + 12px)`;
const APP_HEADER_TOP_PLUS_2 = `calc(${APP_SAFE_TOP} + 14px)`;
const APP_HEADER_TOP_PLUS_4 = `calc(${APP_SAFE_TOP} + 16px)`;
const APP_BOTTOM_PADDING = IS_NATIVE_APP ? 'max(14px, env(safe-area-inset-bottom))' : 20;
const APP_DETAIL_BOTTOM_PADDING = IS_NATIVE_APP ? 'max(16px, env(safe-area-inset-bottom))' : '26px';
const APP_DETAIL_HEADER_HEIGHT = '68px';
// Position des boutons flottants sur les écrans « hero » plein cadre (edgeTop) :
// juste sous la barre de statut.
const APP_EDGE_TOP = `calc(${APP_SAFE_TOP} + 8px)`;

const StatusBar = ({ dark = false, time = '9:41' }) => {
  if (USE_DEVICE_CHROME) return null;
  const c = dark ? '#fff' : OKABA.ink;
  return (
    <div style={{
      height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '0 30px 7px', position: 'relative', zIndex: 60, pointerEvents: 'none',
      fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 600,
      fontSize: 15.5, color: c, letterSpacing: -0.2,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="11" viewBox="0 0 17 11"><rect x="0" y="6" width="3" height="5" rx="0.6" fill={c}/><rect x="4.5" y="4" width="3" height="7" rx="0.6" fill={c}/><rect x="9" y="2" width="3" height="9" rx="0.6" fill={c}/><rect x="13.5" y="0" width="3" height="11" rx="0.6" fill={c}/></svg>
        <svg width="16" height="11" viewBox="0 0 15 11"><path d="M7.5 3c2 0 3.7.8 5 2L13.7 4C12.1 2.4 9.9 1.3 7.5 1.3S2.9 2.4 1.3 4l1.2 1c1.3-1.2 3-2 5-2z" fill={c}/><path d="M7.5 6c1.2 0 2.3.4 3.1 1.2l1.1-1.1c-1.1-1.1-2.6-1.8-4.2-1.8S4.4 5 3.3 6.1L4.4 7.2C5.2 6.4 6.3 6 7.5 6z" fill={c}/><circle cx="7.5" cy="9.2" r="1.3" fill={c}/></svg>
        <svg width="25" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="21" height="10" rx="3" fill="none" stroke={c} strokeOpacity="0.4"/><rect x="2" y="2" width="18" height="7" rx="1.6" fill={c}/><path d="M22 3.5v4c.6-.2 1-.8 1-1.5v-1c0-.7-.4-1.3-1-1.5z" fill={c} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
};

// The mock status bar sits on the Screen background. Deriving its contrast
// here prevents individual routes from accidentally leaving white symbols on
// a light surface (the legacy statusDark flags are kept only as a fallback).
function hasDarkStatusBackground(color, fallback = false) {
  if (typeof color !== 'string') return fallback;

  const value = color.trim();
  const shortHex = value.match(/^#([\da-f]{3})$/i);
  const longHex = value.match(/^#([\da-f]{6})(?:[\da-f]{2})?$/i);
  let channels;

  if (shortHex) {
    channels = [...shortHex[1]].map(channel => parseInt(channel + channel, 16));
  } else if (longHex) {
    channels = [0, 2, 4].map(index => parseInt(longHex[1].slice(index, index + 2), 16));
  } else {
    const rgb = value.match(/^rgba?\(\s*(\d+(?:\.\d+)?)\s*[, ]\s*(\d+(?:\.\d+)?)\s*[, ]\s*(\d+(?:\.\d+)?)/i);
    if (!rgb) return fallback;
    channels = rgb.slice(1, 4).map(Number);
  }

  const [red, green, blue] = channels;
  const perceivedLightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return perceivedLightness < 145;
}

// ── Action sheet « Publier » (cf. capture) ──────────────────
const PUB_ACTIONS = [
  { id: 'annonce',    label: 'Publier une annonce',         icon: 'edit',      tone: '#0B7C39', screen: 'publier', primary: true },
  { id: 'reel',       label: 'Diffuser une capsule vidéo (Reel)', icon: 'video', tone: '#C8302E' },
  { id: 'etab',       label: 'Référencer un établissement', icon: 'shop',      tone: '#E0A400', screen: 'etab' },
  { id: 'event',      label: 'Créer un événement',          icon: 'calendar',  tone: '#5C6B7A' },
  { id: 'cv',         label: 'Soumettre mon CV / offre d’emploi', icon: 'doc',  tone: '#5C6B7A' },
  { id: 'service',    label: 'Proposer un service',         icon: 'handshake', tone: '#0B7C39', screen: 'proposer-service' },
  { id: 'partenariat',  label: 'Demande de partenariat',    icon: 'handshake', tone: '#E0A400' },
];

function PublishSheet({ open, onClose }) {
  const { reset } = useNav();
  const [toast, setToast] = useState(null);
  const G = (typeof OK !== 'undefined') ? OK.green : '#0B7C39';
  const INK = (typeof OK !== 'undefined') ? OK.ink : '#15321f';
  const LINE = (typeof OK !== 'undefined') ? OK.line : '#e8e6df';
  const handle = (a) => {
    if (a.screen) { onClose(); reset(a.screen); return; }
    setToast(a.label);
    setTimeout(() => setToast(null), 1700);
  };
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, pointerEvents: open ? 'auto' : 'none' }}>
      {/* scrim */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(7,30,16,0.45)',
        opacity: open ? 1 : 0, transition: 'opacity .22s ease' }}/>
      {/* sheet */}
      <div style={{ position: 'absolute', left: 10, right: 10, bottom: 96, maxHeight: 'calc(100% - 150px)',
        display: 'flex', flexDirection: 'column',
        background: '#fff', borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 18px 50px rgba(0,0,0,0.32)',
        transform: open ? 'translateY(0)' : 'translateY(24px)', opacity: open ? 1 : 0,
        transition: 'transform .26s cubic-bezier(.2,.8,.2,1), opacity .2s ease' }}>
        <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${LINE}`, flexShrink: 0 }}>
          <span style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 15.5, color: G }}>Que voulez-vous publier ?</span>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: '#F1EFEA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="close" size={16} color={INK} strokeWidth={2.4}/>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {PUB_ACTIONS.map((a, i) => (
            <button key={a.id} onClick={() => handle(a)} style={{
              width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
              background: a.primary ? 'rgba(11,124,57,0.06)' : '#fff',
              borderBottom: i < PUB_ACTIONS.length - 1 ? `1px solid ${LINE}` : 'none',
              padding: '13px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: a.tone + '1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={a.icon} size={19} color={a.tone} strokeWidth={2}/>
              </span>
              <span style={{ flex: 1, fontFamily: FONT_UI, fontSize: 14.5, fontWeight: a.primary ? 800 : 600, color: INK }}>{a.label}</span>
              {a.badge && <span style={{ fontFamily: FONT_UI, fontSize: 9.5, fontWeight: 800, color: '#C8302E', background: '#C8302E1A', border: '1px solid #C8302E55', padding: '3px 7px', borderRadius: 6, whiteSpace: 'nowrap' }}>{a.badge}</span>}
              <Icon name="chev-r" size={16} color="#B8B6AE" strokeWidth={2}/>
            </button>
          ))}
        </div>
      </div>
      {/* toast “bientôt disponible” */}
      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 110, transform: 'translateX(-50%)',
          background: 'rgba(21,50,31,0.95)', color: '#fff', padding: '11px 16px', borderRadius: 12,
          fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', maxWidth: 320,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 80 }}>
          {toast} · bientôt disponible
        </div>
      )}
    </div>
  );
}

// ── Bottom tab bar — barre VERTE pleine (cf. captures) ──────
const TABS = [
  { id: 'home',  label: 'Accueil',  icon: 'home',     screen: 'home' },
  { id: 'fav',   label: 'Favoris',  icon: 'heart',    screen: 'favoris' },
  { id: 'pub',   label: 'Publier',  icon: 'plus',     screen: 'publier', center: true },
  { id: 'msg',   label: 'Messages', icon: 'message',  screen: 'messages' },
  { id: 'me',    label: 'Profil',   icon: 'user',     screen: 'compte' },
];
const AMBER = '#E5A01D';

function TabBar() {
  const { tab, goTab, setPubSheet } = useNav();
  const G = (typeof OK !== 'undefined') ? OK.green : '#0B7C39';
  const GOLD = (typeof OK !== 'undefined') ? OK.gold : '#F5B800';
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 45,
      background: G, paddingBottom: APP_BOTTOM_PADDING, paddingTop: 10,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.14)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
    }}>
      {TABS.map(it => {
        if (it.center) return (
          <div key={it.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button onClick={() => setPubSheet(true)} style={{
              width: 58, height: 58, borderRadius: 999, border: `2.5px solid ${GOLD}`,
              background: `radial-gradient(circle at 50% 32%, #15924b 0%, ${G} 60%, ${(typeof OK!=='undefined')?OK.greenDeep:'#054D22'} 100%)`,
              color: '#fff', cursor: 'pointer', marginTop: -36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 4px rgba(245,184,0,0.22), 0 8px 22px rgba(245,184,0,0.45), 0 4px 10px rgba(0,0,0,0.3)`,
              position: 'relative', padding: 0, overflow: 'hidden',
            }}>
              <span aria-hidden style={{ position: 'absolute', top: 4, left: '22%', width: '56%', height: '34%', borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0))' }}/>
              <img src="assets/okaba-mark-white.png" alt="O'KABA" style={{ width: 40, height: 40, objectFit: 'contain', position: 'relative',
                filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))' }}/>
            </button>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', fontFamily: FONT_UI }}>{it.label}</span>
          </div>
        );
        const on = it.id === tab;
        return (
          <button key={it.id} onClick={() => goTab(it.screen, it.id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '3px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            <Icon name={on && it.icon === 'heart' ? 'heart-f' : it.icon}
              size={23} color="#fff" strokeWidth={on ? 2.5 : 1.9}/>
            <span style={{ fontSize: 10.5, fontWeight: on ? 800 : 600,
              color: '#fff', opacity: on ? 1 : 0.82, fontFamily: FONT_UI }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Screen wrapper (gère le scroll + status bar + tab bar) ──
// Edge-to-edge : le contenu monte TOUJOURS derrière la barre de statut, qui est
// transparente. Le haut de l'écran (couleur d'en-tête OU image) se prolonge donc
// naturellement sous la barre de statut. Les en-têtes intègrent la zone sûre via
// APP_HEADER_TOP. `lightStatus` = le haut est clair → icônes de statut sombres.
function Screen({ children, bg = OKABA.bg, statusDark = false, tabBar = false, noScroll = false, scrollRef, footer, footerPad = 0, edgeTop = false, lightStatus = false }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: bg,
      fontFamily: FONT_UI, color: OKABA.ink, WebkitFontSmoothing: 'antialiased',
      overflow: 'hidden', overscrollBehavior: 'none', contain: 'layout paint',
    }}>
      <div ref={scrollRef} style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        overflowY: noScroll ? 'hidden' : 'auto',
        overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch',
        paddingBottom: tabBar ? 132 : footerPad,
      }}>
        {children}
      </div>
      <div aria-hidden={USE_DEVICE_CHROME || undefined} style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: APP_SAFE_TOP,
        zIndex: 60, pointerEvents: 'none', overflow: 'hidden', background: 'transparent',
      }}>
      {!USE_DEVICE_CHROME &&
        <StatusBar dark={!lightStatus}/>
      }
      </div>
      {footer}
      {tabBar && <TabBar/>}
    </div>
  );
}

const DEMO_TOAST_EVENT = 'okaba:toast';
const notifyDemo = (message) => window.dispatchEvent(new CustomEvent(DEMO_TOAST_EVENT, { detail: message }));

function DemoToast() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    let timer;
    const show = (event) => {
      clearTimeout(timer);
      setMessage(event.detail || 'Action effectuée');
      timer = setTimeout(() => setMessage(''), 1800);
    };
    window.addEventListener(DEMO_TOAST_EVENT, show);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(DEMO_TOAST_EVENT, show);
    };
  }, []);
  if (!message) return null;
  return (
    <div role="status" style={{
      position: 'absolute', left: 18, right: 18, bottom: 96, zIndex: 95,
      padding: '12px 16px', borderRadius: 14, background: 'rgba(18,36,24,0.94)',
      color: '#fff', textAlign: 'center', fontFamily: FONT_UI, fontSize: 12.5,
      fontWeight: 700, boxShadow: '0 8px 28px rgba(0,0,0,0.25)', pointerEvents: 'none',
    }}>{message}</div>
  );
}

// ── Intro / splash — animation du logo au lancement ─────────
// Overlay plein écran joué une fois par ouverture. Skip au tap.
// Concept sélectionnable via INTRO_CONCEPT.
//   1 = « Trait qui se dessine »  (draw-on sur fond blanc + reflet doré)
//   2 = « Allumage / power-on »   (le logo s'allume sur fond sombre)
//   3 = « Reflet doré / shine »   (apparition + balayage doré, fond crème)
//   4 = « Signature » (director's cut) : draw-on net + étincelle + bloom + sortie douce
//   5 = « Particules » : le symbole s'assemble à partir de centaines de particules
const INTRO_CONCEPT = 5;

// Concept #5 — Assemblage par particules (canvas + requestAnimationFrame).
// Le symbole vert est échantillonné en points ; des particules vertes et
// dorées convergent depuis l'extérieur et se calent sur leur cible.
function IntroParticles() {
  const canvasRef = React.useRef(null);
  const [phase, setPhase] = React.useState('run');
  const done = () => setPhase(p => (p === 'done' ? p : 'out'));

  React.useEffect(() => {
    if (phase !== 'run') return;
    const t = setTimeout(done, 4200);
    return () => clearTimeout(t);
  }, [phase]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0, particles = [], startT = 0, alive = true;

    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const GREEN = [0, 102, 0], GOLD = [252, 209, 22];

    const build = () => {
      const W = canvas.clientWidth, H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Échantillonne le symbole en points-cibles
      const SIZE = Math.min(190, W * 0.5);
      const cx = W / 2, cy = H * 0.42;
      const off = document.createElement('canvas');
      off.width = SIZE; off.height = SIZE;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, SIZE, SIZE);
      const data = octx.getImageData(0, 0, SIZE, SIZE).data;
      const step = 3;
      const pts = [];
      for (let y = 0; y < SIZE; y += step) {
        for (let x = 0; x < SIZE; x += step) {
          if (data[(y * SIZE + x) * 4 + 3] > 128) pts.push([x, y]);
        }
      }
      const ox = cx - SIZE / 2, oy = cy - SIZE / 2;
      const maxR = Math.hypot(W, H) * 0.6;
      particles = pts.map(([x, y], i) => {
        const ang = (i * 2.399) + Math.random() * 0.5;           // dispersion en spirale
        const r = SIZE * 0.9 + Math.random() * maxR;
        const gold = Math.random() < 0.16;
        return {
          tx: ox + x, ty: oy + y,
          sx: cx + Math.cos(ang) * r, sy: cy + Math.sin(ang) * r,
          delay: Math.random() * 0.6,
          size: gold ? 2.4 : 1.9,
          col: gold ? GOLD : GREEN,
        };
      });
      startT = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const loop = (now) => {
      if (!alive) return;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      const el = (now - startT) / 1000;
      ctx.clearRect(0, 0, W, H);
      const DUR = 2.3;
      for (const p of particles) {
        const raw = (el - p.delay) / (DUR - p.delay);
        const t = raw <= 0 ? 0 : raw >= 1 ? 1 : easeOut(raw);
        const x = p.sx + (p.tx - p.sx) * t;
        const y = p.sy + (p.ty - p.sy) * t;
        const a = Math.min(1, 0.25 + t);
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${p.col[0]},${p.col[1]},${p.col[2]})`;
        ctx.fillRect(x, y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      if (el < 2.7) raf = requestAnimationFrame(loop);
    };

    const img = new Image();
    img.onload = build;
    img.src = 'assets/okaba-mark-green.png';

    return () => { alive = false; cancelAnimationFrame(raf); };
  }, []);

  if (phase === 'done') return null;
  return (
    <div
      onClick={done}
      style={{
        position: 'absolute', inset: 0, zIndex: 200, cursor: 'pointer',
        background: 'radial-gradient(circle at 50% 42%, #FFFFFF 0%, #FBFAF6 70%, #F3EEE2 100%)',
        opacity: phase === 'out' ? 0 : 1,
        transform: phase === 'out' ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 600ms ease, transform 700ms cubic-bezier(0.4,0,0.2,1)',
      }}
      onTransitionEnd={() => phase === 'out' && setPhase('done')}
    >
      <canvas ref={canvasRef} className="okaba-p5-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <span className="okaba-p5-flash" aria-hidden style={{ left: '50%', top: '42%', marginLeft: -180, marginTop: -180 }} />
      {/* Logo net qui se révèle une fois les particules assemblées */}
      <img className="okaba-p5-solid" src="assets/okaba-mark-green.png" alt="O'KABA"
        style={{ width: 190, height: 190, objectFit: 'contain' }} />
      <div className="okaba-p5-word" style={{ position: 'absolute', left: 0, right: 0, top: '58%', display: 'flex', justifyContent: 'center' }}>
        <img src="assets/okaba-wordmark.png" alt="O'KABA" style={{ width: 236, height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}

function IntroAnimation() {
  if (INTRO_CONCEPT === 5) return <IntroParticles />;
  const [phase, setPhase] = React.useState('run'); // 'run' → 'out' → 'done'
  const done = () => setPhase(p => (p === 'done' ? p : 'out'));

  // Auto-dismiss une fois l'animation terminée, puis fondu.
  React.useEffect(() => {
    if (phase !== 'run') return;
    const t = setTimeout(done, INTRO_CONCEPT === 4 ? 2800 : 2600);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 'done') return null;

  const markSrc = 'assets/okaba-mark-green.png';
  const isPower = INTRO_CONCEPT === 2;
  const isShine = INTRO_CONCEPT === 3;
  const isSig = INTRO_CONCEPT === 4;

  const bg = isPower
    ? 'radial-gradient(circle at 50% 46%, #0d2a19 0%, #071912 55%, #04100a 100%)'
    : isShine
      ? 'radial-gradient(circle at 50% 44%, #FFFDF7 0%, #F7F1E1 60%, #F0E9D6 100%)'
      : isSig
        ? 'radial-gradient(circle at 50% 43%, #FFFFFF 0%, #FBFAF5 68%, #F3EEE2 100%)'
        : '#FFFFFF';

  const markClass = isPower ? 'okaba-intro-mark--power'
    : isShine ? 'okaba-intro-mark--shine'
    : isSig ? 'okaba-sig-mark'
    : 'okaba-intro-mark';

  const wordClass = isPower ? 'okaba-intro-word okaba-intro-word--power'
    : isShine ? 'okaba-intro-word okaba-intro-word--shine'
    : isSig ? 'okaba-sig-word'
    : 'okaba-intro-word';

  return (
    <div
      onClick={done}
      style={{
        position: 'absolute', inset: 0, zIndex: 200, cursor: 'pointer', background: bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26,
        opacity: phase === 'out' ? 0 : 1,
        transform: phase === 'out' && isSig ? 'scale(1.05)' : 'scale(1)',
        transition: isSig ? 'opacity 600ms ease, transform 700ms cubic-bezier(0.4,0,0.2,1)' : 'opacity 550ms ease',
      }}
      onTransitionEnd={() => phase === 'out' && setPhase('done')}
    >
      {/* Groupe logo — le balayage doré (#3/#4) couvre symbole + mot */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
        {/* Symbole (anneau + K) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isPower && <span className="okaba-intro-halo" aria-hidden />}
          {isSig && <span className="okaba-sig-bloom" aria-hidden />}
          <img
            className={markClass}
            src={markSrc}
            alt="O'KABA"
            style={{ width: 168, height: 168, objectFit: 'contain', position: 'relative' }}
          />
          {isSig && <span className="okaba-sig-spark" aria-hidden />}
        </div>
        {/* Mot O'KABA — image officielle (police exacte du logo) */}
        <div className={wordClass} style={{ position: 'relative' }}>
          <img
            src={isPower ? 'assets/okaba-wordmark-light.png' : 'assets/okaba-wordmark.png'}
            alt="O'KABA"
            style={{ width: 232, height: 'auto', display: 'block' }}
          />
          {INTRO_CONCEPT === 1 && <span className="okaba-intro-shine" aria-hidden />}
        </div>
        {isShine && <span className="okaba-intro-goldsweep" aria-hidden />}
        {isSig && <span className="okaba-sig-sweep" aria-hidden />}
      </div>
    </div>
  );
}

// ── Gold iPhone bezel + render active screen ────────────────
function PhoneFrame({ render }) {
  const { top, dir, depth, pubSheet, setPubSheet } = useNav();
  // Each navigation remounts the wrapper (via key) so the CSS entrance
  // animation plays exactly once. fill-mode is forwards and the base state
  // is visible (opacity:1), so content can never be stranded invisible.
  if (USE_DEVICE_CHROME) {
    return (
      <div id="okaba-phone" className={IS_NATIVE_APP ? 'okaba-phone--native' : 'okaba-phone--device'} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: OKABA.bg }}>
        <div key={depth + ':' + top.screen} style={{ position: 'absolute', inset: 0 }}>
          {render(top)}
        </div>
        <PublishSheet open={pubSheet} onClose={() => setPubSheet(false)}/>
        <DemoToast/>
        <IntroAnimation/>
      </div>
    );
  }
  return (
    <div id="okaba-phone" className="okaba-phone--mock" style={{
      position: 'relative', width: 390 + 28, height: 844 + 28,
    }}>
      {/* Graphite titanium bezel, used for browser screenshots. */}
      <div className="okaba-device-bezel" style={{
        position: 'absolute', inset: 0, borderRadius: 68,
        background: 'linear-gradient(135deg, #91979A 0%, #34393C 11%, #111416 31%, #060708 53%, #2E3336 77%, #9BA0A2 100%)',
        border: '1px solid rgba(235,239,240,.72)',
        boxShadow: '0 42px 85px -24px rgba(0,0,0,.68), 0 16px 34px rgba(0,0,0,.30), inset 0 0 0 1px rgba(255,255,255,.24)',
        padding: 14,
      }}>
        {/* Inner black rim */}
        <div style={{
          position: 'absolute', inset: 7, borderRadius: 62,
          background: '#050606',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.13), inset 0 0 0 5px #050606',
        }}/>
        {/* Screen */}
        <div style={{
          position: 'absolute', inset: 14, borderRadius: 56, overflow: 'hidden',
          background: OKABA.bg,
          boxShadow: '0 0 0 1px rgba(255,255,255,.11)',
        }}>
          <div key={depth + ':' + top.screen} style={{ position: 'absolute', inset: 0 }}>
            {render(top)}
          </div>
          {/* Action sheet Publier — dans l'écran pour rester dans le cadre */}
          <PublishSheet open={pubSheet} onClose={() => setPubSheet(false)}/>
          <DemoToast/>
          <IntroAnimation/>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 116, height: 33, borderRadius: 20, background: '#050505', zIndex: 70,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.025)',
          }}>
            <span aria-hidden style={{
              position: 'absolute', right: 12, top: 12, width: 8, height: 8,
              borderRadius: 999, background: '#08111B',
              boxShadow: 'inset 0 0 2px rgba(76,116,150,.55)',
            }}/>
          </div>
          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.28)', zIndex: 70,
            pointerEvents: 'none',
          }}/>
        </div>
        {/* Side controls complete the silhouette in exported screenshots. */}
        <span className="okaba-device-button okaba-device-button--mute" aria-hidden/>
        <span className="okaba-device-button okaba-device-button--volume-up" aria-hidden/>
        <span className="okaba-device-button okaba-device-button--volume-down" aria-hidden/>
        <span className="okaba-device-button okaba-device-button--power" aria-hidden/>
      </div>
    </div>
  );
}

// ── Common header bar (back + title + action) ───────────────
function TopBar({ title, onAction, actionIcon, light = false, transparent = false, sub }) {
  const { back, canBack } = useNav();
  const fg = light ? '#fff' : OKABA.ink;
  return (
    <div style={{
      position: transparent ? 'absolute' : 'sticky',
      top: 0, left: 0, right: 0, zIndex: 40,
      padding: `${APP_HEADER_TOP_PLUS_4} 14px 10px`,
      display: 'flex', alignItems: 'center', gap: 10,
      background: transparent ? 'transparent' : OKABA.bg,
      borderBottom: transparent ? 'none' : `1px solid ${OKABA.lineSoft}`,
    }}>
      <button onClick={back} style={{
        width: 38, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0,
        background: transparent ? 'rgba(255,255,255,0.92)' : OKABA.card,
        boxShadow: transparent ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        border: transparent ? 'none' : `1px solid ${OKABA.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="back" size={18} color={transparent ? OKABA.ink : OKABA.ink} strokeWidth={2.2}/>
      </button>
      {title && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 21, color: fg, lineHeight: 1.05, letterSpacing: -0.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          {sub && <div style={{ fontSize: 11.5, color: light ? 'rgba(255,255,255,0.8)' : OKABA.ink2, marginTop: 1 }}>{sub}</div>}
        </div>
      )}
      {!title && <div style={{ flex: 1 }}/>}
      {onAction && (
        <button onClick={onAction} style={{
          width: 38, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0,
          background: transparent ? 'rgba(255,255,255,0.92)' : OKABA.card,
          border: transparent ? 'none' : `1px solid ${OKABA.line}`,
          boxShadow: transparent ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={actionIcon || 'dots'} size={17} color={OKABA.ink} strokeWidth={2}/>
        </button>
      )}
    </div>
  );
}

Object.assign(window, {
  NavCtx, useNav, NavProvider, StatusBar, TabBar, Screen, PhoneFrame, TopBar, TABS, AMBER,
});


// ===================== 03-comp =====================
// okaba-comp.jsx — Composants partagés (thème VERT O'KABA)
// OK, fcfa, SHOPS, LISTINGS viennent de okaba-data2.jsx ; Icon, FONT_UI de data.jsx

const F = "'Manrope', system-ui, sans-serif";

// Image avec fond + overlay
const Img = ({ src, style = {}, overlay, alt = '', children }) => (
  <div style={{
    position: 'relative', overflow: 'hidden', background: OK.bg2,
    backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    ...style,
  }} role="img" aria-label={alt}>
    {overlay && <div style={{ position: 'absolute', inset: 0, background: overlay, pointerEvents: 'none' }}/>}
    {children}
  </div>
);

const Avatar = ({ src, size = 32, ring, radius }) => (
  <div style={{
    width: size, height: size, borderRadius: radius != null ? radius : size,
    background: `${OK.bg2} url('${src}') center/cover`, flexShrink: 0,
    border: ring ? `2px solid ${ring}` : 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
  }}/>
);

const Stars = ({ value, size = 12, gap = 1 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.4 && value - full < 0.9;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      {[0, 1, 2, 3, 4].map(i => (
        <Icon key={i} name={i < full ? 'star' : (i === full && half ? 'star-half' : 'star-o')}
          size={size} color={i < full || (i === full && half) ? OK.star : '#D8D2C2'} strokeWidth={1.4}/>
      ))}
    </span>
  );
};

const Badge = ({ kind, size = 'sm' }) => {
  const map = {
    pro:    { label: 'Pro vérifié',   bg: 'rgba(11,124,57,0.10)',  fg: OK.green,  icon: 'check-c' },
    gabon:  { label: 'Made in Gabon', bg: 'rgba(245,184,0,0.20)',  fg: '#8A6B00', icon: 'sparkle' },
    certif: { label: 'Vérifié',       bg: 'rgba(31,115,196,0.12)', fg: OK.blue,   icon: 'verified' },
  };
  const b = map[kind]; if (!b) return null;
  const pad = size === 'lg' ? '5px 11px 5px 8px' : '3px 9px 3px 6px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, padding: pad,
      borderRadius: 999, background: b.bg, color: b.fg,
      fontSize: size === 'lg' ? 11.5 : 10.5, fontWeight: 700, lineHeight: 1.2,
      whiteSpace: 'nowrap', fontFamily: F,
    }}>
      <Icon name={b.icon} size={size === 'lg' ? 13 : 11} color={b.fg} strokeWidth={2}/>
      {b.label}
    </span>
  );
};

// Pastille vedette (or)
const FeaturedTag = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 9px',
    borderRadius: 999, background: OK.gold, color: '#6b4e00',
    fontSize: 10, fontWeight: 800, letterSpacing: 0.3, fontFamily: F,
    boxShadow: '0 2px 8px rgba(245,184,0,0.5)',
  }}>
    <Icon name="sparkle" size={11} color="#6b4e00" strokeWidth={2}/> VEDETTE
  </span>
);

// En-tête de section
const SectionHead = ({ eyebrow, title, cta, onCta }) => (
  <div style={{ padding: '0 16px', marginBottom: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
    <div style={{ minWidth: 0 }}>
      {eyebrow && (
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.4,
          color: OK.green, textTransform: 'uppercase', marginBottom: 3, fontFamily: F }}>{eyebrow}</div>
      )}
      <div style={{ fontFamily: F, fontWeight: 800, fontSize: 18, color: OK.green, lineHeight: 1.1, letterSpacing: -0.2 }}>
        {title}
      </div>
    </div>
    {cta && (
      <button onClick={onCta} style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        fontFamily: F, fontSize: 13, fontWeight: 700, color: OK.green,
        display: 'inline-flex', alignItems: 'center', gap: 2, padding: 0, flexShrink: 0,
      }}>
        {cta}<Icon name="chev-r" size={14} color={OK.green} strokeWidth={2.4}/>
      </button>
    )}
  </div>
);

// Prix (vert, gras)
const Price = ({ value, unit, size = 18 }) => (
  <span style={{ fontFamily: F, fontWeight: 800, fontSize: size, color: OK.green, lineHeight: 1, letterSpacing: -0.3, whiteSpace: 'nowrap' }}>
    {fcfa(value)}{unit && <span style={{ fontSize: size * 0.6, color: OK.ink3, fontWeight: 600 }}>{unit}</span>}
  </span>
);

// Carte annonce — grille (2 colonnes)
const ListingCard = ({ item, onClick, fav, onFav, compact }) => {
  const shop = SHOPS[item.shop];
  return (
    <div role="button" tabIndex={0} onClick={onClick}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick && onClick();
        }
      }} style={{
      textAlign: 'left', background: '#fff', borderRadius: compact ? 13 : 16, overflow: 'hidden',
      border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', aspectRatio: compact ? '17 / 12' : '4 / 3' }}>
        <Img src={item.images[0]} style={{ position: 'absolute', inset: 0 }}/>
        {item.featured && <div style={{ position: 'absolute', top: compact ? 6 : 8, left: compact ? 6 : 8 }}><FeaturedTag/></div>}
        <button onClick={(e) => { e.stopPropagation(); onFav && onFav(); }} style={{
          position: 'absolute', top: compact ? 6 : 8, right: compact ? 6 : 8, width: compact ? 25 : 30, height: compact ? 25 : 30, borderRadius: 999,
          border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
        }}>
          <Icon name={fav ? 'heart-f' : 'heart'} size={compact ? 12 : 15} color={fav ? OK.red : OK.ink2} strokeWidth={2}/>
        </button>
        <span style={{
          position: 'absolute', bottom: compact ? 6 : 8, left: compact ? 6 : 8, padding: compact ? '2px 6px' : '3px 8px', borderRadius: 8,
          background: 'rgba(0,0,0,0.72)', color: '#fff', fontSize: compact ? 8.5 : 9.5, fontWeight: 700,
        }}>{item.condition}</span>
      </div>
      <div style={{ padding: compact ? '8px 10px 9px' : '10px 11px 12px', display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
        <Price value={item.price} unit={item.unit} size={compact ? 16 : 18}/>
        <div style={{ fontFamily: F, fontSize: compact ? 11.5 : 12.5, fontWeight: 700, color: OK.ink, lineHeight: 1.25,
          display: '-webkit-box', WebkitLineClamp: compact ? 1 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: compact ? 0 : 32 }}>
          {item.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
          <Icon name="pin" size={11} color={OK.ink3} strokeWidth={2}/>
          <span style={{ fontFamily: F, fontSize: 10.5, color: OK.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.city.split('·')[1]?.trim() || item.city}
          </span>
          {shop?.verified && <Icon name="verified" size={12} color={OK.green} strokeWidth={2}/>}
        </div>
      </div>
    </div>
  );
};

// Carte annonce horizontale (liste / résultats)
const ListingRow = ({ item, onClick }) => (
  <button onClick={onClick} style={{
    textAlign: 'left', background: '#fff', borderRadius: 14, overflow: 'hidden',
    border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 8, width: '100%',
    display: 'flex', gap: 12, alignItems: 'stretch', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  }}>
    <div style={{ width: 104, flexShrink: 0, position: 'relative', borderRadius: 11, overflow: 'hidden' }}>
      <Img src={item.images[0]} style={{ position: 'absolute', inset: 0 }}/>
      {item.featured && <div style={{ position: 'absolute', top: 6, left: 6 }}><FeaturedTag/></div>}
    </div>
    <div style={{ flex: 1, minWidth: 0, padding: '4px 4px 4px 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: OK.ink, lineHeight: 1.25,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {item.title}
      </div>
      <Price value={item.price} unit={item.unit} size={19}/>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: OK.ink2, background: OK.bg2, padding: '2px 7px', borderRadius: 6 }}>{item.condition}</span>
        <Icon name="pin" size={11} color={OK.ink3} strokeWidth={2}/>
        <span style={{ fontFamily: F, fontSize: 10.5, color: OK.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.city.split('·')[1]?.trim() || item.city} · {item.posted}
        </span>
      </div>
    </div>
  </button>
);

// Ligne boutique
const ShopRow = ({ shop, onClick, count }) => (
  <button onClick={onClick} style={{
    textAlign: 'left', background: '#fff', borderRadius: 14, border: `1px solid ${OK.line}`,
    cursor: 'pointer', padding: 12, width: '100%', display: 'flex', alignItems: 'center', gap: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  }}>
    <Avatar src={shop.avatar} size={50} radius={13}/>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shop.name}</span>
        {shop.verified && <Icon name="verified" size={14} color={OK.green} strokeWidth={2}/>}
      </div>
      <div style={{ fontFamily: F, fontSize: 11.5, color: OK.ink2, marginTop: 1 }}>{shop.cat}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: F, fontSize: 11, fontWeight: 700, color: OK.ink }}>
          <Icon name="star" size={11} color={OK.star}/> {shop.rating.toString().replace('.', ',')}
        </span>
        <span style={{ fontFamily: F, fontSize: 11, color: OK.ink3 }}>· {count != null ? count + ' annonces' : (shop.followersStr || shop.followers.toLocaleString('fr-FR') + ' abonnés')}</span>
      </div>
    </div>
    <Icon name="chev-r" size={18} color={OK.ink3} strokeWidth={2}/>
  </button>
);

// Puce catégorie (scroll horizontal) — active = vert plein
const CatChip = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{
    flexShrink: 0, height: 38, padding: '0 14px', borderRadius: 999, cursor: 'pointer',
    border: active ? 'none' : `1px solid ${OK.line}`,
    background: active ? OK.green : '#fff', color: active ? '#fff' : OK.ink,
    display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: F,
    fontSize: 12.5, fontWeight: 700,
  }}>
    {icon && <Icon name={icon} size={15} color={active ? OK.gold : OK.ink2} strokeWidth={2}/>}
    {label}
  </button>
);

// État vide / aucun résultat
const EmptyState = ({ icon = 'search', title, body, ctaLabel, onCta }) => (
  <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
    <div style={{
      width: 92, height: 92, borderRadius: 999, background: 'rgba(11,124,57,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    }}>
      <Icon name={icon} size={40} color={OK.green} strokeWidth={1.6}/>
    </div>
    <div style={{ fontFamily: F, fontWeight: 800, fontSize: 21, color: OK.ink, lineHeight: 1.1, letterSpacing: -0.3 }}>{title}</div>
    <p style={{ margin: '10px 0 0', fontFamily: F, fontSize: 13.5, color: OK.ink2, lineHeight: 1.5, maxWidth: 280 }}>{body}</p>
    {ctaLabel && (
      <button onClick={onCta} style={{
        marginTop: 22, height: 48, padding: '0 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
        background: OK.green, color: '#fff', fontFamily: F, fontSize: 14.5, fontWeight: 800,
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        {ctaLabel}<Icon name="arrow-r" size={17} color="#fff" strokeWidth={2.4}/>
      </button>
    )}
  </div>
);

// En-tête vert standard (titre + retour) — pour les écrans internes
const GreenHeader = ({ title, onBack, right }) => (
  <div style={{ position: 'sticky', top: 0, zIndex: 30, background: OK.green,
    padding: `${APP_HEADER_TOP} 14px 12px`, display: 'flex', alignItems: 'center', gap: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
    {onBack && (
      <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0,
        background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="back" size={19} color="#fff" strokeWidth={2.4}/>
      </button>
    )}
    <div style={{ flex: 1, fontFamily: F, fontWeight: 800, fontSize: 19, color: '#fff', letterSpacing: -0.2,
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
    {right}
  </div>
);

// Navigation fixe des écrans à grande couverture. Elle reste transparente au
// départ puis protège le contenu avec un fond vert dès que la page défile.
const DetailOverlayHeader = ({ solid, title, onBack, onAction, actionIcon = 'share', actionLabel = 'Partager' }) => (
  <>
    <div aria-hidden style={{ position: 'absolute', zIndex: 40, top: 0, left: 0, right: 0,
      height: `calc(${APP_DETAIL_HEADER_HEIGHT} + ${APP_SAFE_TOP})`, pointerEvents: 'none',
      background: solid ? OK.green : 'transparent',
      borderBottom: solid ? '1px solid rgba(255,255,255,0.16)' : '1px solid transparent',
      boxShadow: solid ? '0 5px 18px rgba(0,0,0,0.14)' : 'none',
      transition: 'background .12s ease, box-shadow .12s ease' }}/>
    <div style={{ position: 'absolute', zIndex: 50, top: APP_EDGE_TOP, left: 14, right: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
      <button onClick={onBack} aria-label="Retour" style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
      </button>
      <div style={{ flex: 1, minWidth: 0, textAlign: 'center', opacity: solid ? 1 : 0, transition: 'opacity .15s ease',
        fontFamily: F, fontSize: 14, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
      <button onClick={onAction} aria-label={actionLabel} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: solid ? '#fff' : 'rgba(4,25,12,0.62)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={actionIcon} size={17} color={solid ? OK.green : '#fff'} strokeWidth={2}/>
      </button>
    </div>
  </>
);

// Pilule statut ouvert/fermé
const StatusPill = ({ open, time }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: F, fontSize: 11.5, fontWeight: 700, color: open ? OK.green : OK.ink3 }}>
    <span style={{ width: 6, height: 6, borderRadius: 6, background: open ? OK.green : '#A8A299' }}/>
    {open ? 'Ouvert' : 'Fermé'}{time && <span style={{ color: OK.ink3, fontWeight: 500 }}>· {time}</span>}
  </span>
);

Object.assign(window, {
  Img, Avatar, Stars, Badge, FeaturedTag, SectionHead, Price,
  ListingCard, ListingRow, ShopRow, CatChip, EmptyState, GreenHeader, DetailOverlayHeader, StatusPill,
});


// ===================== 04-home =====================
// okaba-screens-home.jsx — Splash (2 écrans) + Accueil — thème VERT fidèle aux captures
const { useState: useStateH, useEffect: useEffectH } = React;

// Wordmark O'KABA : O' doré + KABA (blanc sur vert / sombre sur clair)
const Wordmark = ({ size = 26, onLight = false }) => (
  <div style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: FONT_UI, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1,
    textShadow: onLight ? 'none' : '0 1px 2px rgba(0,0,0,0.18)' }}>
    <span style={{ fontSize: size, color: OK.gold }}>O</span>
    <span style={{ fontSize: size * 0.74, color: OK.gold }}>’</span>
    <span style={{ fontSize: size, color: onLight ? OK.green : '#fff' }}>KABA</span>
  </div>
);

// ── SPLASH (2 temps : nature → logo vert) ───────────────────
function SplashScreen() {
  const { goTab, reset } = useNav();
  const [step, setStep] = useStateH(0);
  const frozen = window.OKABA_STORYBOARD; // export : pas d'auto-avance
  useEffectH(() => {
    if (frozen) return;
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 2600 : 2600);
    if (step >= 2) { reset('welcome'); return; }
    return () => clearTimeout(t);
  }, [step]);

  if (step >= 1) {
    // Écran 2 — dégradé vert + grand logo K
    return (
      <Screen statusDark={true} bg={OK.greenDeep}>
        <div data-screen-label="Splash 2" onClick={() => reset('welcome')} style={{
          position: 'absolute', inset: 0, cursor: 'pointer',
          background: `radial-gradient(circle at 50% 44%, #15924b 0%, #0c7338 34%, #075028 62%, ${OK.greenDeep} 100%)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginTop: 92 }}><Wordmark size={42}/></div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
            <div aria-hidden style={{ position: 'absolute', width: 280, height: 280, borderRadius: 999,
              background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 68%)' }}/>
            <img src="assets/okaba-mark-white.png" alt="O'KABA" style={{ width: 188, height: 188, objectFit: 'contain',
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))', position: 'relative' }}/>
          </div>
          <div style={{ marginBottom: 64, fontFamily: FONT_UI, fontWeight: 700, fontSize: 20, color: '#fff', textShadow: '0 1px 5px rgba(0,0,0,0.35)' }}>
            Découvrez le Gabon autrement
          </div>
        </div>
      </Screen>
    );
  }

  // Écran 1 — photo nature plein cadre
  return (
    <Screen statusDark={true} bg="#0a2a16">
      <div data-screen-label="Splash 1" onClick={() => setStep(1)} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}>
        <Img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85&auto=format&fit=crop"
          style={{ position: 'absolute', inset: 0 }}
          overlay="linear-gradient(180deg, rgba(8,40,18,0.35) 0%, rgba(8,40,18,0.05) 30%, rgba(8,40,18,0.10) 62%, rgba(6,30,14,0.78) 100%)"/>
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginTop: 70, textAlign: 'center' }}>
            <Wordmark size={46}/>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 1.5, background: OK.gold, opacity: 0.8 }}/>
              <span style={{ fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 700, color: OK.gold, letterSpacing: 0.3 }}>
                Le partage, la proximité, l’avenir numérique du Gabon
              </span>
              <span style={{ width: 16, height: 1.5, background: OK.gold, opacity: 0.8 }}/>
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ marginBottom: 52, textAlign: 'center' }}>
            <div style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 17, color: '#fff', letterSpacing: 1, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
              L’APPLICATION <span style={{ color: OK.gold }}>100% GABONAISE</span>
            </div>
            <div style={{ marginTop: 14, fontFamily: FONT_UI, fontWeight: 700, fontSize: 12.5, color: 'rgba(255,255,255,0.92)', letterSpacing: 2 }}>
              TOUT . PARTOUT . POUR TOUS
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ── ACCUEIL (thème vert) ────────────────────────────────────
const HOME_BANNERS = [
  { id: 'okaba', src: 'assets/okaba-banner.png', alt: "O'KABA — Rejoignez la plateforme de partage", fit: 'cover' },
  { id: 'baie-des-rois', src: 'assets/home-baie-banner.jpg', alt: 'La Baie des Rois', fit: 'cover', target: 'baie' },
  ...BAIE_EVENTS.map(event => ({
    id: `baie-event-${event.id}`,
    src: event.poster,
    alt: `${event.title} — La Baie des Rois`,
    fit: 'cover',
    event,
  })),
];
const HOME_EVENTS = [...EVENTS, ...BAIE_EVENTS];

function HomeScreen() {
  const { navigate } = useNav();
  const homeEvents = HOME_EVENTS;
  const [bannerSlide, setBannerSlide] = useStateH(0);
  const [eventSlide, setEventSlide] = useStateH(0);
  useEffectH(() => {
    const timer = setInterval(() => setBannerSlide(index => (index + 1) % HOME_BANNERS.length), 4600);
    return () => clearInterval(timer);
  }, []);
  useEffectH(() => {
    const timer = setInterval(() => setEventSlide(index => (index + 1) % homeEvents.length), 4200);
    return () => clearInterval(timer);
  }, [homeEvents.length]);
  const featuredEvent = homeEvents[eventSlide] || homeEvents[0];
  const activeBanner = HOME_BANNERS[bannerSlide] || HOME_BANNERS[0];
  const openActiveBanner = () => {
    if (activeBanner.event) {
      navigate('event', { event: activeBanner.event });
      return;
    }
    if (activeBanner.target) navigate(activeBanner.target);
  };
  return (
    <Screen bg={OK.bg2} statusDark={false} tabBar noScroll>
      <div data-screen-label="Accueil" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header vert */}
        <div data-fixed-header="home" style={{ position: 'relative', zIndex: 30, flexShrink: 0, background: OK.green,
          padding: `${APP_HEADER_TOP} 16px 12px`, display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <button aria-label="Menu" onClick={() => navigate('services')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><Wordmark size={27}/></div>
          <button aria-label="Notifications" onClick={() => navigate('notifications')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
            <span style={{ position: 'absolute', top: 3, right: 3, width: 8, height: 8, borderRadius: 8, background: OK.gold, border: '1.5px solid ' + OK.green }}/>
          </button>
        </div>

        <div data-home-scroll style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: 112 }}>
        {/* Emplacement publicitaire */}
        <div style={{ padding: '14px 14px 0' }}>
          <button data-auto-carousel="home-banner" aria-label={activeBanner.alt} onClick={openActiveBanner} style={{ width: '100%', border: 'none', cursor: activeBanner.target || activeBanner.event ? 'pointer' : 'default', padding: 0, borderRadius: 16, overflow: 'hidden',
            display: 'block', position: 'relative', aspectRatio: '1672 / 941', textAlign: 'left',
            background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.16)' }}>
            {HOME_BANNERS.map((banner, index) => <img key={banner.id} src={banner.src} alt={banner.alt}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: bannerSlide === index ? 'block' : 'none', animation: bannerSlide === index ? 'okabaCarouselIn .28s ease-out' : 'none', background: '#fff' }}/>) }
          </button>
        </div>

        <div style={{ padding: '8px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button onClick={() => navigate('services')} style={{ padding: '4px 0', border: 'none', background: 'transparent', color: OK.green, fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 800, cursor: 'pointer' }}>Voir plus</button>
        </div>
        {/* Services O'KABA */}
        <div style={{ padding: '4px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 8, columnGap: 10 }}>
          {HOME_MODULES.map(m => (
            <button key={m.id} onClick={() => navigate(m.target, m.param ? { cat: m.param } : {})}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative', width: 74, height: 74 }}>
                <div style={{ width: 74, height: 74, borderRadius: 999, overflow: 'hidden', border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
                  <Img src={m.img} style={{ width: '100%', height: '100%' }}/>
                </div>
                {m.nouveau && (
                  <span style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)',
                    background: OK.red, color: '#fff', fontSize: 8, fontWeight: 800, letterSpacing: 0.2,
                    padding: '2px 7px', borderRadius: 999, boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                    fontFamily: FONT_UI, whiteSpace: 'nowrap', zIndex: 2, lineHeight: 1.3,
                    border: '1.5px solid #fff' }}>NOUVEAU</span>
                )}
              </div>
              <span style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, color: OK.ink, textAlign: 'center', lineHeight: 1.1 }}>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Événements et sorties */}
        <div style={{ padding: '10px 16px 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 16, color: OK.green }}>Événements et sorties</span>
          <button onClick={() => navigate('events')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FONT_UI, fontWeight: 700, fontSize: 13, color: OK.green }}>Voir plus</button>
        </div>
        <div style={{ position: 'relative', padding: '12px 14px 10px' }}>
            <button data-auto-carousel="home-events" className="okaba-auto-card" key={featuredEvent.id} onClick={() => navigate('event', { event: featuredEvent })} style={{ width: '100%', border: 'none', cursor: 'pointer', padding: 0,
              borderRadius: 16, overflow: 'hidden', position: 'relative', height: 176, textAlign: 'left',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'block', animation: 'okabaCarouselIn .28s ease-out' }}>
              <Img src={featuredEvent.poster || featuredEvent.img} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 22%' }}
                overlay="linear-gradient(90deg, rgba(7,40,20,0.86) 0%, rgba(7,40,20,0.55) 45%, rgba(7,40,20,0.15) 100%)"/>
              {/* badge date */}
              <div style={{ position: 'absolute', top: 12, right: 12, background: OK.gold, color: '#3a2c00',
                padding: '5px 11px', borderRadius: 999, fontFamily: FONT_UI, fontWeight: 800, fontSize: 11,
                display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: 6, background: OK.red }}/> Événement
              </div>
              {/* texte */}
              <div style={{ position: 'absolute', left: 16, right: 14, bottom: 14 }}>
                <div style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 20, color: '#fff', lineHeight: 1.12,
                  textShadow: '0 1px 6px rgba(0,0,0,0.4)', maxWidth: 240,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{featuredEvent.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 9, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FONT_UI, fontWeight: 700, fontSize: 11.5, color: '#fff' }}>
                    <Icon name="calendar" size={13} color={OK.gold} strokeWidth={2.2}/>{featuredEvent.date} · {featuredEvent.time}
                  </span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 5, fontFamily: FONT_UI, fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.9)' }}>
                  <Icon name="pin" size={12} color="rgba(255,255,255,0.9)" strokeWidth={2}/>{featuredEvent.place}
                </div>
              </div>
            </button>
            <div style={{ position: 'absolute', right: 27, bottom: 20, display: 'flex', gap: 4, zIndex: 4 }}>
              {homeEvents.map((event, index) => <button key={event.id} onClick={() => setEventSlide(index)} aria-label={`Afficher ${event.title}`} style={{ width: index === eventSlide ? 15 : 5, height: 5, borderRadius: 999, padding: 0, border: 'none', cursor: 'pointer', background: index === eventSlide ? OK.gold : 'rgba(255,255,255,.65)', transition: 'width .25s ease' }}/>) }
            </div>
        </div>

        <div style={{ height: 16 }}/>
        </div>
      </div>
    </Screen>
  );
}

function ServicesScreen() {
  const { back, navigate } = useNav();
  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Tous les services">
        <GreenHeader title="Tous les services" onBack={back}/>
        <div style={{ padding: '15px 16px 4px' }}>
          <h1 style={{ margin: 0, fontFamily: FONT_UI, fontSize: 19, fontWeight: 850, color: OK.ink }}>Tout le Gabon dans votre poche</h1>
        </div>
        <div style={{ padding: '12px 10px 0', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', rowGap: 16, columnGap: 5 }}>
          {OKABA_SERVICES.map(service => (
            <button key={service.id} onClick={() => navigate(service.target, service.params || {})} style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, overflow: 'hidden', border: '2.5px solid #fff', background: OK.green, boxShadow: '0 3px 10px rgba(0,0,0,0.16), 0 0 0 2px rgba(11,124,57,0.16)' }}><Img src={service.img} style={{ width: '100%', height: '100%' }}/></div>
              <div style={{ marginTop: 6, width: '100%', padding: '0 1px', fontFamily: FONT_UI, fontSize: 9.5, fontWeight: 780, lineHeight: 1.15, color: OK.ink, textAlign: 'center', overflowWrap: 'anywhere' }}>{service.label}</div>
            </button>
          ))}
        </div>
        <div style={{ height: 32 }}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { Wordmark, SplashScreen, HomeScreen, ServicesScreen });


// ===================== 05-auth =====================
// okaba-screens-auth.jsx — Bienvenue + Inscription (tél → OTP → infos) + Connexion
// Thème VERT O'KABA, fidèle au splash et au flow Publier.
const FAU = "'Manrope', system-ui, sans-serif";

const AU_FIELD = { width: '100%', height: 52, background: '#fff', border: '1px solid ' + OK.line, borderRadius: 12,
  padding: '0 14px', fontFamily: FAU, fontSize: 14.5, color: OK.ink, outline: 'none' };
const AU_LABEL = { fontFamily: FAU, fontSize: 12, fontWeight: 800, color: OK.ink, display: 'block', margin: '0 2px 7px' };

// Bouton plein vert (CTA principal)
function AuBtn({ label, onClick, disabled, icon }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', height: 54, borderRadius: 14, border: 'none',
      background: disabled ? OK.bg2 : OK.green, color: disabled ? OK.ink3 : '#fff', cursor: disabled ? 'default' : 'pointer',
      fontFamily: FAU, fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxShadow: disabled ? 'none' : '0 8px 20px rgba(11,124,57,0.28)', transition: 'background .15s' }}>
      {label}{icon && <Icon name={icon} size={18} color="#fff" strokeWidth={2.4}/>}
    </button>
  );
}

// ── BIENVENUE (landing auth) ────────────────────────────────
// Boutons sociaux (ronds blancs) — style du modèle
const SocialGoogle = () => (
  <svg viewBox="0 0 48 48" width="23" height="23" aria-hidden>
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);
const SocialFacebook = () => (
  <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden>
    <path fill="#1877F2" d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"/>
  </svg>
);
const SocialApple = () => (
  <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden>
    <path fill="#111" d="M17.05 12.04c-.03-2.65 2.16-3.92 2.26-3.98-1.23-1.8-3.15-2.05-3.83-2.08-1.63-.16-3.18.96-4 .96-.83 0-2.1-.94-3.46-.91-1.78.03-3.42 1.03-4.34 2.62-1.85 3.21-.47 7.95 1.33 10.55.88 1.27 1.93 2.7 3.31 2.65 1.33-.05 1.83-.86 3.44-.86 1.6 0 2.05.86 3.46.83 1.43-.02 2.33-1.3 3.2-2.58 1.01-1.48 1.42-2.91 1.44-2.98-.03-.01-2.76-1.06-2.79-4.2zM14.5 4.5c.73-.89 1.22-2.12 1.09-3.35-1.05.04-2.32.7-3.07 1.58-.67.78-1.26 2.03-1.1 3.23 1.17.09 2.36-.6 3.08-1.46z"/>
  </svg>
);

// Accroches publicitaires de l'annuaire — défilent sur l'écran de bienvenue
const WELCOME_PROMOS = [
  'Trouvez, découvrez et profitez des meilleurs services, produits et commerces locaux',
  'Découvrez les meilleurs établissements du Gabon',
];

function WelcomePromo() {
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState('in'); // 'in' → 'out' → (swap) 'in'
  React.useEffect(() => {
    const cycle = setInterval(() => {
      setPhase('out');
      setTimeout(() => { setI(v => (v + 1) % WELCOME_PROMOS.length); setPhase('in'); }, 400);
    }, 4200);
    return () => clearInterval(cycle);
  }, []);
  const words = WELCOME_PROMOS[i].split(' ');
  return (
    <p className={phase === 'out' ? 'okaba-promo-out' : undefined}
      style={{ margin: '14px auto 0', maxWidth: 300, minHeight: 42,
        fontFamily: FAU, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.92)', lineHeight: 1.5,
        textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}>
      {phase === 'in'
        ? words.map((w, k) => (
            <span key={`${i}-${k}`} className="okaba-promo-word" style={{ animationDelay: `${k * 55}ms` }}>{w}&nbsp;</span>
          ))
        : words.map((w, k) => <span key={`o-${k}`}>{w}&nbsp;</span>)}
    </p>
  );
}

function WelcomeScreen() {
  const { navigate } = useNav();
  return (
    <Screen statusDark={true} bg="#04120A" noScroll edgeTop lightStatus>
      <div data-screen-label="Bienvenue" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Photo plein cadre */}
        <div aria-hidden style={{ position: 'absolute', inset: 0,
          backgroundImage: "url('assets/okaba-welcome-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}/>
        <div aria-hidden style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(3,13,8,0.45) 0%, rgba(3,13,8,0.22) 38%, rgba(3,13,8,0.5) 72%, rgba(2,9,5,0.9) 100%)' }}/>

        {/* Titre centré sur l'image (animation d'entrée) */}
        <div className="okaba-welcome-title" style={{ position: 'absolute', left: 26, right: 26, top: '45%', transform: 'translateY(-50%)', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 33, lineHeight: 1.12, color: '#fff',
            letterSpacing: -0.6, textShadow: '0 2px 18px rgba(0,0,0,0.6)' }}>
            Bienvenue sur<br/>l'application <span style={{ color: OK.goldSoft }}>Okaba</span>
          </h1>
          {/* Sous-titre publicitaire qui défile */}
          <WelcomePromo/>
          <div style={{ margin: '18px auto 0', width: 54, height: 4, borderRadius: 999, background: '#22B24F' }}/>
        </div>

        {/* Boutons posés sur l'image */}
        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button onClick={() => navigate('signup')} style={{ width: '100%', height: 58, borderRadius: 30, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, #18A64C 0%, ${OK.green} 100%)`, color: '#fff',
            fontFamily: FAU, fontSize: 15.5, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 12px 30px rgba(10,106,47,0.45)' }}>
            Créer un compte <Icon name="arrow-r" size={19} color="#fff" strokeWidth={2.4}/>
          </button>
          <div onClick={() => navigate('login')} style={{ textAlign: 'center', fontFamily: FAU, fontSize: 15, fontWeight: 800,
            color: OK.goldSoft, opacity: 0.8, cursor: 'pointer', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            J’ai déjà un compte
          </div>
        </div>
      </div>
    </Screen>
  );
}

// En-tête clair (retour) pour les écrans de formulaire auth
function AuHeader({ onBack }) {
  return (
    <div style={{ padding: `${APP_HEADER_TOP} 14px 6px`, display: 'flex', alignItems: 'center' }}>
      <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${OK.line}`,
        background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
      </button>
    </div>
  );
}

// Cercle d'icône (fond vert clair) — en-tête d'étape auth
function IconCircle({ name }) {
  return (
    <div style={{ width: 78, height: 78, borderRadius: 999, margin: '4px auto 18px',
      background: 'rgba(11,124,57,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={name} size={34} color={OK.green} strokeWidth={1.9}/>
    </div>
  );
}

// Pavé numérique (OTP / code PIN)
function NumKeypad({ onKey, onBack }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];
  const cell = { height: 56, borderRadius: 14, border: 'none', cursor: 'pointer', background: OK.bg2,
    fontFamily: FAU, fontWeight: 800, fontSize: 23, color: OK.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 8 }}>
      {keys.map((k, i) => {
        if (k === '') return <div key={i}/>;
        if (k === 'back') return (
          <button key={i} aria-label="Effacer" onClick={onBack} style={{ ...cell, background: 'transparent', fontSize: 24 }}>⌫</button>
        );
        return <button key={i} onClick={() => onKey(k)} style={cell}>{k}</button>;
      })}
    </div>
  );
}

// ── INSCRIPTION (tél → OTP → PIN → infos) ───────────────────
function SignupScreen() {
  const { reset } = useNav();
  const [step, setStep] = useState(0); // 0 tél · 1 OTP · 2 PIN · 3 infos
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [timer, setTimer] = useState(45);

  // Compte à rebours de renvoi du code (étape OTP)
  useEffect(() => {
    if (step !== 1) return;
    setTimer(45);
    const t = setInterval(() => setTimer(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  // Avance auto quand l'OTP (6) ou le PIN (4) est complet
  useEffect(() => { if (step === 1 && otp.length === 6) { const t = setTimeout(() => setStep(2), 260); return () => clearTimeout(t); } }, [otp, step]);
  useEffect(() => { if (step === 2 && pin.length === 4) { const t = setTimeout(() => setStep(3), 260); return () => clearTimeout(t); } }, [pin, step]);

  const goBack = () => { if (step === 0) reset('welcome'); else setStep(s => s - 1); };
  const phoneOk = phone.replace(/\D/g, '').length >= 8;
  const infosOk = nom.trim() && prenom.trim();
  const finish = () => { saveOkabaDemoSession(); reset('home'); };
  const mm = String(Math.floor(timer / 60)).padStart(2, '0');
  const ss = String(timer % 60).padStart(2, '0');

  return (
    <Screen bg="#fff" statusDark={true} lightStatus noScroll={false}>
      <div data-screen-label={`Inscription ${step + 1}`}>
        {/* En-tête : flèche retour + logo O'KABA (comme le modèle) */}
        <div style={{ padding: `${APP_HEADER_TOP} 14px 8px`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <button onClick={goBack} style={{ position: 'absolute', left: 14, width: 40, height: 40, borderRadius: 999, border: `1px solid ${OK.line}`,
            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
          </button>
          <img src="assets/okaba-wordmark.png" alt="O'KABA" style={{ height: 24, width: 'auto', display: 'block' }}/>
        </div>
        <div style={{ padding: '14px 22px 30px' }}>

          {/* Étape 1a — Numéro de téléphone */}
          {step === 0 && (
            <div>
              <IconCircle name="phone"/>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 23, color: OK.ink, letterSpacing: -0.4, textAlign: 'center' }}>Entrez votre numéro de téléphone</h1>
              <p style={{ margin: '10px 0 26px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, textAlign: 'center' }}>
                Nous allons vous envoyer un code pour vérifier votre numéro.
              </p>
              <div style={{ ...AU_FIELD, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FAU, fontWeight: 800, fontSize: 14.5, color: OK.ink, paddingRight: 10, borderRight: `1px solid ${OK.line}` }}>
                  🇬🇦 +241
                </span>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9 ]/g, ''))} placeholder="07 12 34 56" inputMode="numeric"
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FAU, fontSize: 15, fontWeight: 600, color: OK.ink }}/>
              </div>
              <div style={{ marginTop: 26 }}><AuBtn label="Envoyer le code OTP" icon="arrow-r" disabled={!phoneOk} onClick={() => phoneOk && setStep(1)}/></div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Icon name="lock" size={13} color={OK.ink3} strokeWidth={2}/>
                <span style={{ fontFamily: FAU, fontSize: 12, color: OK.ink3 }}>Vos informations sont sécurisées et ne seront jamais partagées.</span>
              </div>
            </div>
          )}

          {/* Étape 1b — Code OTP */}
          {step === 1 && (
            <div>
              <IconCircle name="shield"/>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 23, color: OK.ink, letterSpacing: -0.4, textAlign: 'center' }}>Entrez le code OTP</h1>
              <p style={{ margin: '10px 0 24px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, textAlign: 'center' }}>
                Nous avons envoyé un code à <strong style={{ color: OK.ink }}>+241 {phone || '07 12 34 56'}</strong>
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ width: 46, height: 56, borderRadius: 12, border: `1.5px solid ${otp[i] ? OK.green : OK.line}`,
                    background: otp[i] ? 'rgba(11,124,57,0.05)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FAU, fontWeight: 800, fontSize: 24, color: OK.ink }}>{otp[i] || ''}</div>
                ))}
              </div>
              <div style={{ margin: '18px 0 4px', fontFamily: FAU, fontSize: 12.5, color: OK.ink2, textAlign: 'center' }}>
                {timer > 0
                  ? <>Renvoyer le code dans <strong style={{ color: OK.ink }}>{mm}:{ss}</strong></>
                  : <span onClick={() => setTimer(45)} style={{ color: OK.green, fontWeight: 800, cursor: 'pointer' }}>Renvoyer le code</span>}
              </div>
              <NumKeypad onKey={d => setOtp(o => (o.length < 6 ? o + d : o))} onBack={() => setOtp(o => o.slice(0, -1))}/>
            </div>
          )}

          {/* Étape 2 — Code PIN */}
          {step === 2 && (
            <div>
              <IconCircle name="lock"/>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 23, color: OK.ink, letterSpacing: -0.4, textAlign: 'center' }}>Créez votre code PIN</h1>
              <p style={{ margin: '10px 0 26px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, textAlign: 'center' }}>
                Choisissez un code PIN à 4 chiffres pour sécuriser votre compte.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 8 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ width: 18, height: 18, borderRadius: 999,
                    background: i < pin.length ? OK.green : 'transparent', border: `2px solid ${i < pin.length ? OK.green : OK.line}` }}/>
                ))}
              </div>
              <NumKeypad onKey={d => setPin(p => (p.length < 4 ? p + d : p))} onBack={() => setPin(p => p.slice(0, -1))}/>
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Icon name="shield" size={13} color={OK.ink3} strokeWidth={2}/>
                <span style={{ fontFamily: FAU, fontSize: 12, color: OK.ink3 }}>Ce code PIN vous sera demandé à chaque connexion.</span>
              </div>
            </div>
          )}

          {/* Étape 3 — Informations */}
          {step === 3 && (
            <div>
              <IconCircle name="user"/>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 23, color: OK.ink, letterSpacing: -0.4, textAlign: 'center' }}>Complétez vos informations</h1>
              <p style={{ margin: '10px 0 22px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, textAlign: 'center' }}>
                Ces informations nous permettent de mieux personnaliser votre expérience.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={AU_LABEL}>Nom</label>
                    <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Ndong" style={AU_FIELD}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={AU_LABEL}>Prénom</label>
                    <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Patricia" style={AU_FIELD}/>
                  </div>
                </div>
                <div>
                  <label style={AU_LABEL}>Âge</label>
                  <div style={{ position: 'relative' }}>
                    <select value={age} onChange={e => setAge(e.target.value)}
                      style={{ ...AU_FIELD, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: 38,
                        cursor: 'pointer', color: age ? OK.ink : OK.ink3 }}>
                      <option value="" disabled>Sélectionnez votre âge</option>
                      {Array.from({ length: 83 }, (_, i) => i + 13).map(a => <option key={a} value={a}>{a} ans</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={OK.ink3} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label style={AU_LABEL}>Email <span style={{ color: OK.ink3, fontWeight: 600 }}>(optionnel)</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="patricia.ndong@email.com" style={AU_FIELD}/>
                </div>
                <div>
                  <label style={AU_LABEL}>Adresse <span style={{ color: OK.ink3, fontWeight: 600 }}>(optionnel)</span></label>
                  <input value={adresse} onChange={e => setAdresse(e.target.value)} placeholder="Libreville, Akanda" style={AU_FIELD}/>
                </div>
              </div>
              <div style={{ marginTop: 24 }}><AuBtn label="Continuer" icon="arrow-r" disabled={!infosOk} onClick={() => infosOk && finish()}/></div>
              <button onClick={finish} style={{ width: '100%', height: 50, marginTop: 12, borderRadius: 14, cursor: 'pointer',
                border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, fontFamily: FAU, fontSize: 14.5, fontWeight: 800 }}>
                Passer pour l’instant
              </button>
              <div style={{ marginTop: 10, textAlign: 'center', fontFamily: FAU, fontSize: 12, color: OK.ink3 }}>Vous pourrez compléter plus tard</div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}

// ── CONNEXION (tél + code PIN) ──────────────────────────────
function LoginScreen() {
  const { back, navigate, reset } = useNav();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const ok = phone.replace(/\D/g, '').length >= 8 && pin.length === 4;
  return (
    <Screen bg="#fff" statusDark={true} lightStatus>
      <div data-screen-label="Connexion">
        <div style={{ padding: `${APP_HEADER_TOP} 14px 6px`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <button onClick={back} style={{ position: 'absolute', left: 14, width: 40, height: 40, borderRadius: 999, border: `1px solid ${OK.line}`,
            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
          </button>
          <span style={{ fontFamily: FAU, fontWeight: 800, fontSize: 16, color: OK.ink }}>Connexion</span>
        </div>

        <div style={{ padding: '12px 22px 0' }}>
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="assets/okaba-wordmark.png" alt="O'KABA" style={{ height: 34, width: 'auto', display: 'block' }}/>
          </div>
          <IconCircle name="lock"/>

          <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 24, color: OK.ink, letterSpacing: -0.4, textAlign: 'center' }}>Bienvenue de retour&nbsp;!</h1>
          <p style={{ margin: '8px 0 24px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, textAlign: 'center' }}>
            Connectez-vous pour accéder à votre compte et retrouver tout votre univers O’KABA.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={AU_LABEL}>Numéro de téléphone</label>
              <div style={{ ...AU_FIELD, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FAU, fontWeight: 800, fontSize: 14.5, color: OK.ink, paddingRight: 10, borderRight: `1px solid ${OK.line}` }}>
                  🇬🇦 +241
                </span>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9 ]/g, ''))} placeholder="07 12 34 56" inputMode="numeric"
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FAU, fontSize: 15, fontWeight: 600, color: OK.ink }}/>
              </div>
            </div>
            <div>
              <label style={AU_LABEL}>Code PIN (4 chiffres)</label>
              <div style={{ ...AU_FIELD, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px' }}>
                <input value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} inputMode="numeric"
                  placeholder="••••" type={showPin ? 'text' : 'password'}
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FAU, fontSize: 16, fontWeight: 700, letterSpacing: 4, color: OK.ink }}/>
                <button onClick={() => setShowPin(s => !s)} aria-label="Afficher le code" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={OK.ink3} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>
                    {!showPin && <path d="M3 3l18 18"/>}
                  </svg>
                </button>
              </div>
              <div style={{ marginTop: 8, textAlign: 'right', fontFamily: FAU, fontSize: 12.5, fontWeight: 700, color: OK.green, cursor: 'pointer' }}>Mot de passe oublié&nbsp;?</div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}><AuBtn label="Se connecter" disabled={!ok} onClick={() => { if (ok) { saveOkabaDemoSession(); reset('home'); } }}/></div>

          <div style={{ margin: '22px 0 30px', padding: '14px', borderRadius: 14, background: OK.bg2, textAlign: 'center', fontFamily: FAU, fontSize: 13, color: OK.ink2 }}>
            Vous n’avez pas encore de compte&nbsp;?{' '}
            <span onClick={() => navigate('signup')} style={{ color: OK.green, fontWeight: 800, cursor: 'pointer' }}>S’inscrire maintenant&nbsp;›</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { WelcomeScreen, SignupScreen, LoginScreen });


// ===================== 06-market =====================
// okaba-screens-market.jsx — Marketplace, Recherche, Boutiques (thème VERT)
const FM = "'Manrope', system-ui, sans-serif";

// ── MARKETPLACE / Catégorie ─────────────────────────────────
function MarketScreen({ params }) {
  const { navigate, back } = useNav();
  const [cat, setCat] = useState(params?.cat || 'all');
  const [view, setView] = useState('grid');
  const [favs, setFavs] = useState({});

  const catObj = MARKET_CATS.find(c => c.id === cat) || MARKET_CATS[0];
  const items = cat === 'all'
    ? LISTINGS
    : cat === 'gabon'
      ? LISTINGS.filter(l => l.madeInGabon).sort((a, b) => (a.gabonPriority ?? 99) - (b.gabonPriority ?? 99))
      : LISTINGS.filter(l => l.cat === cat);

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar noScroll>
      <div data-screen-label="Marketplace" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div data-fixed-header="market" style={{ position: 'relative', zIndex: 30, flexShrink: 0, background: OK.bg2 }}>
        {/* Header vert */}
        <GreenHeader title={cat === 'all' ? 'Marketplace' : catObj.label} onBack={back}
          right={
            <button onClick={() => navigate('shops')} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0,
              background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="shop" size={19} color="#fff" strokeWidth={2}/>
            </button>
          }/>

        {/* Search bar */}
        <div style={{ padding: '14px 16px 0' }}>
          <button onClick={() => navigate('search')} style={{
            width: '100%', height: 48, background: '#fff', borderRadius: 12, border: `1px solid ${OK.line}`,
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <span style={{ flex: 1, fontFamily: FM, fontSize: 13, color: OK.ink3 }}>Rechercher dans le marché…</span>
          </button>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 16px 4px' }}>
          {MARKET_CATS.map(c => (
            <CatChip key={c.id} icon={c.icon} label={c.label} active={c.id === cat} onClick={() => setCat(c.id)}/>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ padding: '8px 18px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: FM, fontSize: 12.5, color: OK.ink2, fontWeight: 600 }}>
            <strong style={{ color: OK.ink }}>{items.length}</strong> annonce{items.length > 1 ? 's' : ''}
          </span>
          <div style={{ flex: 1 }}/>
          <button onClick={() => notifyDemo('Filtres : catégorie, prix et localisation')} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 34, padding: '0 12px',
            borderRadius: 10, border: `1px solid ${OK.line}`, background: '#fff', cursor: 'pointer',
            fontFamily: FM, fontSize: 12, fontWeight: 700, color: OK.ink }}>
            <Icon name="sliders" size={14} color={OK.ink2} strokeWidth={2}/> Filtrer
          </button>
          <div style={{ display: 'flex', background: '#fff', borderRadius: 10, border: `1px solid ${OK.line}`, overflow: 'hidden' }}>
            {[['grid', 'grid'], ['list', 'list']].map(([v, ic]) => (
              <button key={v} onClick={() => setView(v)} style={{
                width: 34, height: 34, border: 'none', cursor: 'pointer',
                background: view === v ? OK.green : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={ic} size={15} color={view === v ? '#fff' : OK.ink3} strokeWidth={2}/>
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Results */}
        <div data-screen-scroll="market" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: 112 }}>
        {items.length === 0 ? (
          <EmptyState title="Aucune annonce" body="Aucune annonce dans cette catégorie pour le moment. Revenez bientôt ou publiez la vôtre."
            icon="tag" ctaLabel="Publier une annonce" onCta={() => navigate('publier')}/>
        ) : view === 'grid' ? (
          <div style={{ padding: '10px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {items.map(item => (
              <ListingCard key={item.id} item={item} fav={!!favs[item.id]}
                onFav={() => setFavs(f => ({ ...f, [item.id]: !f[item.id] }))}
                onClick={() => navigate('listing', { id: item.id })}/>
            ))}
          </div>
        ) : (
          <div style={{ padding: '10px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map(item => (
              <ListingRow key={item.id} item={item} onClick={() => navigate('listing', { id: item.id })}/>
            ))}
          </div>
        )}

        <div style={{ height: 30 }}/>
        </div>
      </div>
    </Screen>
  );
}

// ── RECHERCHE ───────────────────────────────────────────────
const RECENT = ['Savon karité', 'Villa Batterie IV', 'iPhone', 'Pagne wax'];
const TRENDING = ['Voiture occasion', 'Appartement meublé', 'Savon naturel', 'MacBook', 'Terrain Akanda'];

function SearchScreen() {
  const { navigate, back } = useNav();
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

  const results = q.trim().length
    ? LISTINGS.filter(l => (l.title + ' ' + l.city + ' ' + l.condition).toLowerCase().includes(q.toLowerCase()))
    : null;

  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Recherche">
        {/* Search header (vert) */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: OK.green, padding: `${APP_HEADER_TOP} 14px 14px`, display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <button onClick={back} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={18} color="#fff" strokeWidth={2.2}/>
          </button>
          <div style={{ flex: 1, height: 44, background: '#fff', borderRadius: 12,
            display: 'flex', alignItems: 'center', padding: '0 12px', gap: 9 }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un produit, un pro…"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FM, fontSize: 14, color: OK.ink }}/>
            {q && <button onClick={() => setQ('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
              <Icon name="close" size={16} color={OK.ink3} strokeWidth={2}/>
            </button>}
          </div>
        </div>

        {results === null ? (
          <div style={{ padding: '20px 18px 0' }}>
            <div style={{ fontFamily: FM, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.4, color: OK.ink3, textTransform: 'uppercase', marginBottom: 12 }}>Recherches récentes</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {RECENT.map(t => (
                <button key={t} onClick={() => setQ(t)} style={{ height: 36, padding: '0 14px', borderRadius: 999,
                  border: `1px solid ${OK.line}`, background: '#fff', cursor: 'pointer', fontFamily: FM,
                  fontSize: 12.5, fontWeight: 600, color: OK.ink, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Icon name="history" size={14} color={OK.ink3} strokeWidth={2}/>{t}
                </button>
              ))}
            </div>
            <div style={{ fontFamily: FM, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.4, color: OK.ink3, textTransform: 'uppercase', margin: '24px 0 8px' }}>Tendances</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TRENDING.map((t, i) => (
                <button key={t} onClick={() => setQ(t)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px',
                  border: 'none', borderBottom: `1px solid ${OK.line}`, background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: FM, fontWeight: 800, fontSize: 16, color: OK.gold, width: 20 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontFamily: FM, fontSize: 13.5, fontWeight: 600, color: OK.ink }}>{t}</span>
                  <Icon name="trend" size={15} color={OK.green} strokeWidth={2}/>
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <EmptyState title="Aucun résultat" body={`Aucune annonce ne correspond à « ${q} ». Essayez un autre mot-clé ou parcourez les catégories.`}
            ctaLabel="Parcourir le marché" onCta={() => navigate('market', { cat: 'all' })}/>
        ) : (
          <div style={{ padding: '14px 16px 0' }}>
            <div style={{ fontFamily: FM, fontSize: 12.5, color: OK.ink2, marginBottom: 10, fontWeight: 600 }}>
              <strong style={{ color: OK.ink }}>{results.length}</strong> résultat{results.length > 1 ? 's' : ''} pour « {q} »
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {results.map(item => <ListingRow key={item.id} item={item} onClick={() => navigate('listing', { id: item.id })}/>)}
            </div>
          </div>
        )}
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

// ── LISTE DES BOUTIQUES (annuaire commerçants) ──────────────
const SHOP_TAGS = [
  { id: 'all',   label: 'Tout' },
  { id: 'mode',  label: 'Mode', match: ['mode', 'pagne'] },
  { id: 'tech',  label: 'High-tech', match: ['électro', 'high-tech', 'tech'] },
  { id: 'auto',  label: 'Auto', match: ['véhicule', 'concession', 'auto'] },
  { id: 'immo',  label: 'Immobilier', match: ['immobilier'] },
  { id: 'food',  label: 'Alimentation', match: ['agricole', 'coopérative', 'aliment'] },
];

function ShopsScreen() {
  const { navigate, back } = useNav();
  const [tag, setTag] = useState('all');
  const count = (id) => LISTINGS.filter(l => l.shop === id).length;
  const all = Object.values(SHOPS);
  const matchTag = (s) => {
    if (tag === 'all') return true;
    const t = SHOP_TAGS.find(x => x.id === tag);
    const c = (s.cat || '').toLowerCase();
    return t && t.match && t.match.some(m => c.includes(m));
  };
  const shops = all.filter(matchTag);
  // boutique vedette = mieux notée
  const featured = [...all].sort((a, b) => (b.rating - a.rating) || (b.followers - a.followers))[0];
  const grid = shops.filter(s => s.id !== featured.id || tag !== 'all');

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Boutiques">
        <GreenHeader title="Boutiques" onBack={back}/>

        {/* Recherche */}
        <div style={{ padding: '14px 16px 0' }}>
          <button onClick={() => navigate('search')} style={{ width: '100%', height: 46, background: '#fff', borderRadius: 12,
            border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <span style={{ flex: 1, textAlign: 'left', fontFamily: FM, fontSize: 13, color: OK.ink3 }}>Rechercher une boutique, un commerce…</span>
          </button>
        </div>

        {/* Filtres */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 16px 2px' }}>
          {SHOP_TAGS.map(t => <CatChip key={t.id} label={t.label} active={t.id === tag} onClick={() => setTag(t.id)}/>)}
        </div>

        {/* Boutique à la une */}
        {tag === 'all' && (
          <div style={{ padding: '14px 16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 2px 10px' }}>
              <Icon name="star" size={15} color={OK.gold}/>
              <span style={{ fontFamily: FM, fontWeight: 800, fontSize: 13, color: OK.ink, letterSpacing: 0.2 }}>Boutique à la une</span>
            </div>
            <button onClick={() => navigate('shop', { id: featured.id })} style={{ width: '100%', textAlign: 'left', cursor: 'pointer',
              border: 'none', padding: 0, borderRadius: 18, overflow: 'hidden', position: 'relative', boxShadow: '0 8px 22px rgba(0,0,0,0.16)' }}>
              <div style={{ position: 'relative', height: 158 }}>
                <Img src={featured.cover} style={{ position: 'absolute', inset: 0 }}
                  overlay="linear-gradient(180deg, rgba(7,40,20,0.05) 0%, rgba(5,77,34,0.35) 55%, rgba(5,40,20,0.92) 100%)"/>
                <div style={{ position: 'absolute', top: 12, right: 12, background: OK.gold, color: '#3a2c00',
                  padding: '4px 10px', borderRadius: 999, fontFamily: FM, fontWeight: 800, fontSize: 10.5 }}>★ {featured.ratingStr || featured.rating.toString().replace('.', ',')}</div>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 13, display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                  <Avatar src={featured.avatar} size={58} radius={16} ring="#fff"/>
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontFamily: FM, fontSize: 17, fontWeight: 800, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{featured.name}</span>
                      {featured.verified && <Icon name="verified" size={15} color="#fff" strokeWidth={2}/>}
                    </div>
                    <div style={{ fontFamily: FM, fontSize: 11.5, color: 'rgba(255,255,255,0.92)', marginTop: 2 }}>{featured.cat}</div>
                  </div>
                  <span style={{ background: '#fff', color: OK.green, fontFamily: FM, fontWeight: 800, fontSize: 12,
                    padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>Visiter</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Toutes les boutiques */}
        <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: FM, fontWeight: 800, fontSize: 16, color: OK.green }}>{tag === 'all' ? 'Toutes les boutiques' : SHOP_TAGS.find(t => t.id === tag).label}</span>
          <span style={{ fontFamily: FM, fontSize: 12, fontWeight: 600, color: OK.ink3 }}>{grid.length} commerce{grid.length > 1 ? 's' : ''}</span>
        </div>

        <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {grid.map(s => (
            <button key={s.id} onClick={() => navigate('shop', { id: s.id })} style={{
              textAlign: 'left', background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${OK.line}`,
              cursor: 'pointer', padding: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: 78 }}>
                <Img src={s.cover} style={{ position: 'absolute', inset: 0 }}/>
                {s.pro && <span style={{ position: 'absolute', top: 7, left: 7, background: 'rgba(10,106,47,0.92)', color: '#fff',
                  fontFamily: FM, fontWeight: 800, fontSize: 8.5, padding: '2px 6px', borderRadius: 5, letterSpacing: 0.4 }}>PRO</span>}
              </div>
              <div style={{ padding: '0 11px 12px', marginTop: -22, position: 'relative', zIndex: 2 }}>
                <Avatar src={s.avatar} size={44} radius={13} ring="#fff"/>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                  <span style={{ fontFamily: FM, fontSize: 13.5, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{s.name}</span>
                  {s.verified && <Icon name="verified" size={13} color={OK.green} strokeWidth={2}/>}
                </div>
                <div style={{ fontFamily: FM, fontSize: 10.5, color: OK.ink2, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.cat}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${OK.line}` }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: FM, fontSize: 11, fontWeight: 800, color: OK.ink }}>
                    <Icon name="star" size={12} color={OK.star}/> {s.rating.toString().replace('.', ',')}
                  </span>
                  <span style={{ width: 3, height: 3, borderRadius: 3, background: OK.ink3 }}/>
                  <span style={{ fontFamily: FM, fontSize: 11, color: OK.ink3 }}>{count(s.id)} annonces</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { MarketScreen, SearchScreen, ShopsScreen });


// ===================== 07-detail =====================
// okaba-screens-detail.jsx — Détail annonce + Profil boutique (thème VERT)
const FD = "'Manrope', system-ui, sans-serif";

// ── DÉTAIL ANNONCE ──────────────────────────────────────────
function ListingScreen({ params }) {
  const { navigate, back } = useNav();
  const item = LISTINGS.find(l => l.id === params?.id) || LISTINGS[0];
  const shop = SHOPS[item.shop];
  const [img, setImg] = useState(0);
  const [fav, setFav] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const similar = LISTINGS.filter(l => l.cat === item.cat && l.id !== item.id).slice(0, 4);
  const sref = useRef(null);

  return (
    <Screen bg={OK.bg} statusDark={true} noScroll edgeTop footer={
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#fff', borderTop: `1px solid ${OK.line}`, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`,
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
        <button onClick={() => setFav(f => !f)} style={{ width: 50, height: 52, borderRadius: 13, border: `1.5px solid ${OK.line}`,
          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={fav ? 'heart-f' : 'heart'} size={21} color={fav ? OK.red : OK.ink2} strokeWidth={2}/>
        </button>
        <button onClick={() => navigate('chat', { id: shop.id })} style={{ width: 50, height: 52, borderRadius: 13, border: `1.5px solid ${OK.green}`,
          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="message" size={20} color={OK.green} strokeWidth={2}/>
        </button>
        <button onClick={() => navigate('chat', { id: shop.id })} style={{ flex: 1, height: 52, borderRadius: 13, border: 'none',
          background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FD, fontSize: 15, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(11,124,57,0.32)' }}>
          <Icon name="phone" size={18} color="#fff" strokeWidth={2.2}/> Contacter le vendeur
        </button>
      </div>
    }>
      <div data-screen-label="Détail annonce" style={{ position: 'absolute', inset: 0, overflow: 'hidden', '--detail-hero-h': 'clamp(250px, 38vh, 320px)' }}>
        {/* Gallery */}
        <div data-fixed-hero="listing" style={{ position: 'absolute', zIndex: 0, top: 0, left: 0, right: 0, height: 'var(--detail-hero-h)' }}>
          <Img src={item.images[img]} style={{ position: 'absolute', inset: 0 }}
            overlay="linear-gradient(180deg, rgba(0,0,0,0.32) 0%, transparent 24%)"/>
          {item.featured && <div style={{ position: 'absolute', bottom: 34, left: 16, zIndex: 4 }}><FeaturedTag/></div>}
          {item.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: 34, right: 16, display: 'flex', gap: 6, zIndex: 4 }}>
              {item.images.map((_, i) => (
                <button key={i} onClick={() => setImg(i)} style={{ width: i === img ? 22 : 7, height: 7, borderRadius: 99,
                  background: i === img ? '#fff' : 'rgba(255,255,255,0.55)', border: 'none', cursor: 'pointer', transition: 'all .2s' }}/>
              ))}
            </div>
          )}
        </div>

        {/* Navigation réellement fixe au-dessus de l'image et de la feuille */}
        <div aria-hidden style={{ position: 'absolute', zIndex: 20, top: 0, left: 0, right: 0,
          height: `calc(${APP_DETAIL_HEADER_HEIGHT} + ${APP_SAFE_TOP})`,
          pointerEvents: 'none', background: headerSolid ? OK.green : 'transparent',
          borderBottom: headerSolid ? '1px solid rgba(255,255,255,0.16)' : '1px solid transparent',
          boxShadow: headerSolid ? '0 5px 18px rgba(0,0,0,0.14)' : 'none', transition: 'background .12s ease, box-shadow .12s ease' }}/>
        <div style={{ position: 'absolute', top: APP_EDGE_TOP, left: 14, right: 14, display: 'flex', alignItems: 'center', gap: 10, zIndex: 30 }}>
          <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
          </button>
          <div style={{ flex: 1, minWidth: 0, textAlign: 'center', paddingLeft: 46, opacity: headerSolid ? 1 : 0, transition: 'opacity .15s ease',
            fontFamily: FD, fontSize: 14, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
          {['share', 'dots'].map(ic => (
            <button key={ic} onClick={() => notifyDemo(ic === 'share' ? 'Lien de l’annonce copié' : 'Options de l’annonce')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={ic} size={17} color={OK.ink} strokeWidth={2}/>
            </button>
          ))}
        </div>

        {/* La feuille défile sur toute la hauteur et recouvre progressivement l'image */}
        <div ref={sref} data-screen-scroll="listing" onScroll={e => setHeaderSolid(e.currentTarget.scrollTop > 80)} style={{ position: 'absolute', zIndex: 1, inset: '0 0 92px', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
          <div aria-hidden style={{ height: 'calc(var(--detail-hero-h) - 22px)', pointerEvents: 'none' }}/>
          <div data-scroll-sheet="listing" style={{ minHeight: `calc(100% - ${APP_DETAIL_HEADER_HEIGHT})`, background: OK.bg, borderRadius: '26px 26px 0 0', padding: '22px 20px 24px' }}>
          {/* condition + posted + ref */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: FD, fontSize: 11, fontWeight: 800, color: OK.green, background: 'rgba(11,124,57,0.10)', padding: '4px 10px', borderRadius: 999 }}>{item.condition}</span>
            <span style={{ fontFamily: FD, fontSize: 12, color: OK.ink3 }}>{item.posted}</span>
            <span style={{ marginLeft: 'auto', fontFamily: FD, fontSize: 11, color: OK.ink3, letterSpacing: 0.3 }}>Réf. {item.ref}</span>
          </div>

          <h1 style={{ margin: '12px 0 0', fontFamily: FD, fontWeight: 800, fontSize: 23, lineHeight: 1.18, color: OK.ink, letterSpacing: -0.3 }}>
            {item.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 30, color: OK.green, letterSpacing: -0.6, whiteSpace: 'nowrap' }}>
              {fcfa(item.price)}<span style={{ fontSize: 15, color: OK.ink3, fontWeight: 600 }}>{item.unit || ''}</span>
            </span>
            {item.negotiable && <span style={{ fontFamily: FD, fontSize: 11.5, fontWeight: 700, color: '#8A6B00', background: 'rgba(245,184,0,0.22)', padding: '4px 10px', borderRadius: 999 }}>Négociable</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: OK.ink2 }}>
            <Icon name="pin" size={15} color={OK.ink2} strokeWidth={2}/>
            <span style={{ fontFamily: FD, fontSize: 13 }}>{item.city}</span>
          </div>

          {/* Seller card */}
          <button onClick={() => navigate('shop', { id: shop.id })} style={{
            marginTop: 18, width: '100%', textAlign: 'left', background: '#fff', borderRadius: 14,
            border: `1px solid ${OK.line}`, padding: 12, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <Avatar src={shop.avatar} size={46} radius={13}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shop.name}</span>
                {shop.verified && <Icon name="verified" size={14} color={OK.green} strokeWidth={2}/>}
              </div>
              <div style={{ fontFamily: FD, fontSize: 11.5, color: OK.ink3, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="star" size={11} color={OK.star}/> {shop.rating.toString().replace('.', ',')} · {shop.responseTime}
              </div>
            </div>
            <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 700, color: OK.green, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              Voir <Icon name="chev-r" size={14} color={OK.green} strokeWidth={2.4}/>
            </span>
          </button>

          {/* Specs */}
          <div style={{ marginTop: 22 }}>
            <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: OK.green, marginBottom: 12 }}>Caractéristiques</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {item.specs.map(([k, v]) => (
                <div key={k} style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 12, padding: '11px 13px' }}>
                  <div style={{ fontFamily: FD, fontSize: 10.5, color: OK.ink3, fontWeight: 700, letterSpacing: 0.3 }}>{k.toUpperCase()}</div>
                  <div style={{ fontFamily: FD, fontSize: 14.5, fontWeight: 800, color: OK.ink, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginTop: 22 }}>
            <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: OK.green, marginBottom: 8 }}>Description</div>
            <p style={{ margin: 0, fontFamily: FD, fontSize: 13.5, lineHeight: 1.65, color: OK.ink2 }}>{item.desc}</p>
          </div>

          {/* Sécurité (consignes PDF BETA) */}
          <div style={{ marginTop: 22, background: 'rgba(11,124,57,0.055)', border: `1px solid rgba(11,124,57,0.18)`, borderRadius: 14, padding: '14px 15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Icon name="shield" size={17} color={OK.green} strokeWidth={2}/>
              <span style={{ fontFamily: FD, fontSize: 13.5, fontWeight: 800, color: OK.green }}>Conseils de sécurité O’KABA</span>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {['Rencontrez le vendeur dans un lieu public.', 'Vérifiez le produit avant de payer.', 'Ne versez jamais d’acompte avant de voir l’article.'].map(t => (
                <li key={t} style={{ display: 'flex', gap: 8, fontFamily: FD, fontSize: 12.5, color: OK.ink2, lineHeight: 1.4 }}>
                  <Icon name="check" size={15} color={OK.green} strokeWidth={2.4}/>{t}
                </li>
              ))}
            </ul>
          </div>

          {/* Similar */}
          {similar.length > 0 && (
            <div style={{ margin: '26px -20px 0' }}>
              <div style={{ padding: '0 20px', fontFamily: FD, fontWeight: 800, fontSize: 16, color: OK.green, marginBottom: 12 }}>Annonces similaires</div>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 4px' }}>
                {similar.map(s => (
                  <div key={s.id} style={{ width: 168, flexShrink: 0 }}>
                    <ListingCard item={s} onClick={() => { sref.current && sref.current.scrollTo({ top: 0 }); navigate('listing', { id: s.id }); }}/>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: 24 }}/>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ── PROFIL BOUTIQUE / VENDEUR (cf. capture MAS et Famille) ──
function ShopScreen({ params }) {
  const { navigate, back } = useNav();
  const shop = SHOPS[params?.id] || SHOPS['mas-famille'] || Object.values(SHOPS)[0];
  const [tab, setTab] = useState('apropos');
  const [following, setFollowing] = useState(false);
  const [fav, setFav] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const listings = LISTINGS.filter(l => l.shop === shop.id);
  const photosCount = shop.photosCount || listings.reduce((n, l) => n + l.images.length, 0);
  const avisCount = shop.avisCount || shop.reviews || 0;
  const photoPool = listings.flatMap(l => l.images).concat(shop.cover, shop.avatar);
  // évite deux photos trop semblables (shampooings) côte à côte en tête de grille
  const annoncesOrderFirst = ['beurre-moabi', 'poudre-cacao', 'huile-de-pain', 'savon-noir-gabonais'];
  const reversedListings = [...listings].reverse();
  const listingsForAnnonces = [
    ...annoncesOrderFirst.map(id => reversedListings.find(l => l.id === id)).filter(Boolean),
    ...reversedListings.filter(l => !annoncesOrderFirst.includes(l.id)),
  ];
  const shopReviews = [
    { name: 'Jean-Pierre M.', rating: 5, time: 'Il y a 3 j', text: 'Produits naturels de grande qualité, savon au karité excellent. Je recommande vivement !' },
    { name: 'Aline N.', rating: 4, time: 'Il y a 1 sem', text: 'Très bon contact, livraison rapide. Les infusions sont délicieuses.' },
    { name: 'Cédric O.', rating: 5, time: 'Il y a 2 sem', text: 'Coopérative sérieuse, prix corrects. Merci O’KABA de les mettre en avant !' },
  ];

  const TABS_SHOP = [
    ['apropos', 'À propos'],
    ['annonces', `Annonces (${listings.length})`],
    ['photos', `Média (${photosCount})`],
    ['avis', `Avis (${avisCount})`],
  ];

  // ligne de contacts sociaux (bas de page)
  const SOCIALS = [
    { ic: 'phone', bg: OK.green }, { ic: 'mail', bg: OK.blue }, { ic: 'globe', bg: OK.green },
    { ic: 'pin', bg: OK.blue }, { ic: 'whatsapp', bg: OK.wa }, { ic: 'fb', bg: OK.fb },
    { ic: 'ig', bg: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)' },
  ];

  return (
    <Screen bg={OK.bg} statusDark={true} noScroll edgeTop>
      <div data-screen-label="Profil boutique" style={{ position: 'absolute', inset: 0, overflow: 'hidden', '--detail-hero-h': 'clamp(200px, 28vh, 230px)' }}>
        {/* Cover (épinglée en arrière-plan) */}
        <div data-fixed-hero="shop" style={{ position: 'absolute', zIndex: 0, top: 0, left: 0, right: 0, height: 'var(--detail-hero-h)' }}>
          <Img src={shop.cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.50) 100%)"/>
          {/* avatar logo coopérative */}
          <div style={{ position: 'absolute', left: 18, bottom: 24, width: 92, height: 92, borderRadius: 16, overflow: 'hidden',
            border: '3px solid #fff', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.22)' }}>
            <Img src={shop.avatar} style={{ width: '100%', height: '100%' }}/>
          </div>
          {/* heart */}
          <button onClick={() => setFav(f => !f)} style={{ position: 'absolute', right: 16, bottom: 24, width: 44, height: 44, borderRadius: 999,
            border: 'none', cursor: 'pointer', background: '#3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.22)' }}>
            <Icon name={fav ? 'heart-f' : 'heart'} size={20} color={fav ? '#fff' : '#fff'} strokeWidth={2}/>
          </button>
        </div>

        <div aria-hidden style={{ position: 'absolute', zIndex: 20, top: 0, left: 0, right: 0,
          height: `calc(${APP_DETAIL_HEADER_HEIGHT} + ${APP_SAFE_TOP})`,
          pointerEvents: 'none', background: headerSolid ? OK.green : 'transparent',
          borderBottom: headerSolid ? '1px solid rgba(255,255,255,0.16)' : '1px solid transparent',
          boxShadow: headerSolid ? '0 5px 18px rgba(0,0,0,0.14)' : 'none', transition: 'background .12s ease, box-shadow .12s ease' }}/>
        <div style={{ position: 'absolute', top: APP_EDGE_TOP, left: 14, right: 14, zIndex: 30, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <button onClick={back} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={20} color={OK.ink} strokeWidth={2.4}/>
          </button>
          <button onClick={() => notifyDemo(`Profil ${shop.name} prêt à être partagé`)} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: headerSolid ? '#fff' : '#3a3a3a', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="share" size={18} color={headerSolid ? OK.green : '#fff'} strokeWidth={2}/>
          </button>
          <div style={{ position: 'absolute', left: 58, right: 58, top: 10, textAlign: 'center', opacity: headerSolid ? 1 : 0, transition: 'opacity .15s ease',
            fontFamily: FONT_UI, fontSize: 14, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pointerEvents: 'none' }}>{shop.name}</div>
        </div>

        {/* Feuille de contenu qui remonte par-dessus la couverture */}
        <div data-screen-scroll="shop" onScroll={e => setHeaderSolid(e.currentTarget.scrollTop > 80)} style={{ position: 'absolute', zIndex: 1, inset: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
        <div aria-hidden style={{ height: 'calc(var(--detail-hero-h) - 20px)', pointerEvents: 'none' }}/>
        <div data-scroll-sheet="shop" style={{ minHeight: `calc(100% - ${APP_DETAIL_HEADER_HEIGHT})`, background: OK.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        {/* Identity */}
        <div style={{ padding: '18px 18px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ margin: 0, fontFamily: FONT_UI, fontWeight: 800, fontSize: 22, color: OK.ink, letterSpacing: -0.3 }}>{shop.name}</h1>
              <div style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 12, color: OK.green, letterSpacing: 0.4, marginTop: 3, textTransform: 'uppercase' }}>{shop.cat}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 7 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 800, color: OK.ink }}>
                  <Icon name="star" size={14} color={OK.star}/> {shop.ratingStr || shop.rating.toString().replace('.', ',') + '/5'} <span style={{ color: OK.ink2, fontWeight: 600 }}>({shop.reviews} avis)</span>
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: OK.ink }}>{shop.followersStr || shop.followers.toLocaleString('fr-FR')} <span style={{ color: OK.ink2, fontWeight: 600 }}>followers</span></span>
              </div>
              <div style={{ fontSize: 12, color: OK.ink3, marginTop: 7 }}>Membre depuis juin {shop.since}</div>
            </div>
            <button onClick={() => setFollowing(f => !f)} style={{ flexShrink: 0, height: 38, padding: '0 20px', borderRadius: 10, cursor: 'pointer',
              border: following ? `1.5px solid ${OK.green}` : 'none', background: following ? '#fff' : OK.green, color: following ? OK.green : '#fff',
              fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6,
              boxShadow: following ? 'none' : '0 4px 12px rgba(11,124,57,0.3)' }}>
              {following ? 'Abonné' : 'Suivre'}
            </button>
          </div>
        </div>

        {/* Tabs (pills) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, padding: '16px 14px 4px' }}>
          {TABS_SHOP.map(([id, l]) => {
            const on = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{ flex: '0 0 auto', height: 34, padding: '0 10px', borderRadius: 999, cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: on ? 'none' : `1px solid ${OK.line}`, background: on ? OK.green : OK.bg2, color: on ? '#fff' : OK.ink2,
                fontFamily: FONT_UI, fontSize: 12, fontWeight: 700 }}>{l}</button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={{ padding: '14px 16px 0' }}>
          {tab === 'apropos' && (
            <div style={{ background: '#fff', border: `1.5px solid ${OK.green}`, borderRadius: 16, padding: 16 }}>
              <div style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 16, color: OK.ink, marginBottom: 10 }}>{shop.name}</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: OK.ink }}>{shop.bio}</p>
              {shop.produits && (
                <p style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.6, color: OK.ink }}>
                  <strong style={{ fontWeight: 800 }}>Produits :</strong> {shop.produits}
                </p>
              )}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[['pin', shop.city], ['phone', shop.phone], ['mail', shop.email]].map(([ic, v]) => (
                  <div key={ic} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <Icon name={ic} size={17} color={OK.ink} strokeWidth={2}/>
                    <span style={{ fontSize: 12.5, color: OK.ink, fontWeight: 600, lineHeight: 1.3 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'annonces' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {listingsForAnnonces.map(item => <ListingCard key={item.id} item={item} compact onClick={() => navigate('listing', { id: item.id })}/>)}
            </div>
          )}
          {tab === 'photos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {photoPool.slice(0, photosCount).map((src, i) => (
                <div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 10, overflow: 'hidden' }}>
                  <Img src={src} style={{ width: '100%', height: '100%', backgroundSize: 'contain', backgroundColor: OK.bg2 }}/>
                </div>
              ))}
            </div>
          )}
          {tab === 'avis' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 2px 14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 40, color: OK.ink, lineHeight: 1 }}>{shop.rating.toString().replace('.', ',')}</div>
                  <Stars value={shop.rating} size={13}/>
                  <div style={{ fontSize: 11, color: OK.ink3, marginTop: 4 }}>{avisCount} avis</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[5, 4, 3, 2, 1].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontSize: 10, color: OK.ink3, width: 8 }}>{s}</span>
                      <div style={{ flex: 1, height: 5, borderRadius: 5, background: OK.bg2, overflow: 'hidden' }}>
                        <div style={{ width: `${[55, 28, 10, 4, 3][5 - s]}%`, height: '100%', background: OK.star }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {shopReviews.map((r, i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 14, padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 999, background: OK.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>{r.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: OK.ink }}>{r.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Stars value={r.rating} size={10}/><span style={{ fontSize: 10.5, color: OK.ink3 }}>{r.time}</span></div>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: OK.ink2 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ligne contacts sociaux */}
        {tab === 'apropos' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 9, padding: '22px 14px 0', flexWrap: 'nowrap' }}>
            {SOCIALS.map((s, i) => (
              <button key={i} onClick={() => s.ic === 'message' && navigate('chat', { id: shop.id })}
                style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer', background: s.bg, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
                <Icon name={s.ic} size={20} color="#fff" strokeWidth={2}/>
              </button>
            ))}
          </div>
        )}

        <div style={{ height: 36 }}/>
        </div>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { ListingScreen, ShopScreen });


// ===================== 08-annuaire =====================
// okaba-screens-annuaire.jsx — Annuaire (répertoire d'entités) + Profil entité (réseau social)
const FA = "'Manrope', system-ui, sans-serif";

// La Baie des Rois reste accessible depuis son hub dédié. Dans l'annuaire,
// seule la FMCT représente le projet qu'elle pilote.
const entityList = () => Object.values(ANNU_ENTITIES).filter(e => e.id !== 'baie-des-rois');
// rubrique (ALL_CATEGORIES) correspondant au service d'une entité
const SVC2RUB = { industries: 'industries', admin: 'admin', ministeres: 'tourisme', restaurants: 'restaurants', telecoms: 'telecom', sante: 'sante', banques: 'banques', loisirs: 'loisirs', shopping: 'shopping', hotels: 'hotels', services: 'services', proximite: 'proximite' };

const tenantRubric = group => {
  if (['Restaurants', 'Bars & lounges'].includes(group)) return 'restaurants';
  if (group === 'Loisirs & famille') return 'loisirs';
  if (group === 'Shopping') return 'shopping';
  return 'services';
};

// Une seule source pour les résultats et leurs destinations : entités,
// enseignes de la Baie et projet hôtelier confirmé.
const directoryList = () => {
  const entities = entityList().map(e => ({ ...e, directoryMeta: e.directoryMeta || `${e.followers} abonnés`, directoryRoute: ['entity', { id: e.id }] }));
  const proximity = proximityDirectoryEntries();
  const tenants = BAIE_TENANTS.map(t => ({
    ...t,
    service: tenantRubric(t.group),
    logo: t.img,
    cover: t.img,
    city: 'La Baie des Rois · Libreville',
    followers: Number.isFinite(t.reviews) ? `${t.reviews} avis` : 'Fiche terrain',
    directoryMeta: Number.isFinite(t.reviews) ? `${t.reviews} avis` : 'Fiche terrain',
    verified: true,
    directoryPriority: 300,
    directoryRoute: ['tenant', { id: t.id }],
  }));
  const hotels = (BAIE_PLACES?.hotels?.places || []).map(place => ({
    ...place,
    cat: 'Hôtel · Projet annoncé',
    service: 'hotels',
    logo: place.image,
    cover: place.image,
    city: 'La Baie des Rois · Libreville',
    followers: 'Ouverture à venir',
    directoryMeta: 'Ouverture à venir',
    verified: true,
    directoryPriority: 280,
    directoryRoute: ['baie-place', { cat: 'hotels', id: place.id }],
  }));
  return [...proximity, ...entities, ...tenants, ...hotels];
};

const sortDirectoryItems = items => [...items].sort((a, b) =>
  ((b.directoryPriority || 0) - (a.directoryPriority || 0)) ||
  ((b.featured ? 1 : 0) - (a.featured ? 1 : 0))
);

const openDirectoryItem = (navigate, item) => {
  const [screen, params] = item.directoryRoute || ['entity', { id: item.id }];
  navigate(screen, params);
};

const openProfileLink = href => {
  if (!href) return;
  if (/^https?:\/\//i.test(href)) window.open(href, '_blank', 'noopener,noreferrer');
  else window.location.href = href;
};

function ProfileLinks({ links = {}, phone }) {
  const cleanPhone = /\d/.test(phone || '') ? phone.replace(/[^+\d]/g, '') : '';
  const actions = [
    cleanPhone && { key: 'phone', label: 'Appeler', icon: 'phone', bg: OK.green, href: `tel:${cleanPhone}` },
    links.email && { key: 'email', label: 'E-mail', icon: 'mail', bg: OK.blue, href: `mailto:${links.email}` },
    links.website && { key: 'website', label: 'Site officiel', icon: 'globe', bg: OK.green, href: links.website },
    links.whatsapp && { key: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', bg: OK.wa, href: links.whatsapp },
    links.facebook && { key: 'facebook', label: 'Facebook', icon: 'fb', bg: OK.fb, href: links.facebook },
    links.instagram && { key: 'instagram', label: 'Instagram', icon: 'ig', bg: '#C13584', href: links.instagram },
  ].filter(Boolean);
  if (!actions.length) return null;
  return <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
    {actions.map(action => <button key={action.key} type="button" aria-label={action.label} title={action.label} onClick={() => openProfileLink(action.href)} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer', background: action.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}><Icon name={action.icon} size={19} color="#fff" strokeWidth={2}/></button>)}
  </div>;
}

// Carte entité — ligne HORIZONTALE (logo à gauche, infos à droite)
function AnnuaireRow({ e, onClick }) {
  const tint = e.tint || 'rgba(11,124,57,0.06)';
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', background: '#fff', borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 10, width: '100%',
      display: 'flex', gap: 13, alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      {/* logo */}
      <div style={{ width: 78, height: 78, flexShrink: 0, borderRadius: 14, background: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: `1px solid ${OK.line}` }}>
        <img src={e.logo} alt={e.name} style={e.type === 'proximity' ? { width: '100%', height: '100%', objectFit: 'cover' } : { maxWidth: '78%', maxHeight: '78%', objectFit: 'contain' }}/>
      </div>
      {/* infos */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {e.featured && <span style={{ background: OK.gold, color: '#6b4e00', fontFamily: FA, fontSize: 8.5, fontWeight: 800, padding: '2px 6px', borderRadius: 5, letterSpacing: 0.3 }}>À LA UNE</span>}
          <span style={{ fontFamily: FA, fontSize: 15, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{e.name}</span>
          {e.verified && <Icon name="verified" size={15} color={OK.green} strokeWidth={2}/>}
        </div>
        <span style={{ fontFamily: FA, fontSize: 12, color: OK.ink2, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.cat}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FA, fontSize: 11, color: OK.ink3, minWidth: 0 }}>
            <Icon name="pin" size={11} color={OK.ink3} strokeWidth={2}/>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.type === 'proximity' ? e.city : e.city.split('·').pop().trim()}</span>
          </span>
          {e.followers && <span style={{ fontFamily: FA, fontSize: 11, fontWeight: 700, color: OK.green, whiteSpace: 'nowrap' }}>· {e.followers}</span>}
        </div>
      </div>
      <Icon name="chev-r" size={18} color={OK.ink3} strokeWidth={2}/>
    </button>
  );
}

// ── ANNUAIRE (style marketplace : header + recherche + rubriques + fiches) ──
function AnnuaireScreen({ params }) {
  const { back, navigate } = useNav();
  const [cat, setCat] = useState(params?.cat || 'tout');
  const [serviceJob, setServiceJob] = useState('');
  const [serviceZone, setServiceZone] = useState('');
  const [serviceRating, setServiceRating] = useState('');
  if (cat === 'proximite') return <ProximityServicesScreen/>;
  let items = directoryList();
  if (cat !== 'tout') items = items.filter(e => SVC2RUB[e.service] === cat);
  if (cat === 'proximite') {
    if (serviceJob) items = items.filter(e => (e.jobs || []).includes(serviceJob));
    if (serviceZone) items = items.filter(e => (e.city || '').toLowerCase().includes(serviceZone.toLowerCase()));
    if (serviceRating) items = items.filter(e => Number(e.rating || 0) >= Number(serviceRating));
  }
  // Priorité : complexe, FMCT, enseignes et projets de la Baie, puis fiches à la une.
  items = sortDirectoryItems(items);

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar noScroll>
      <div data-screen-label="Annuaire" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div data-fixed-header="annuaire" style={{ position: 'relative', zIndex: 30, flexShrink: 0, background: OK.bg2 }}>
        <GreenHeader title="Annuaire" onBack={back}
          right={<button onClick={() => navigate('annuaire-map')} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="pin" size={18} color="#fff" strokeWidth={2}/>
          </button>}/>

        {/* Search bar */}
        <div style={{ padding: '14px 16px 0' }}>
          <button onClick={() => navigate('annuaire-search')} style={{ width: '100%', height: 48, background: '#fff', borderRadius: 12, border: `1px solid ${OK.line}`,
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', textAlign: 'left' }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <span style={{ flex: 1, fontFamily: FA, fontSize: 13, color: OK.ink3 }}>{cat === 'proximite' ? 'Métier, prestataire ou quartier…' : 'Mairie, ministère, entreprise…'}</span>
          </button>
        </div>

        {/* Rubriques (chips horizontaux — 36 rubriques) */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 16px 4px' }}>
          <button onClick={() => navigate('annuaire-map')} style={{ flexShrink: 0, height: 38, padding: '0 13px', borderRadius: 999, cursor: 'pointer',
            border: 'none', background: OK.gold, color: '#6b4e00', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FA, fontSize: 12.5, fontWeight: 800 }}>
            <Icon name="pin" size={14} color="#6b4e00" strokeWidth={2.4}/> Autour de moi
          </button>
          <CatChip label="Tout" active={cat === 'tout'} onClick={() => setCat('tout')}/>
          {ALL_CATEGORIES.map(c => (
            <CatChip key={c.id} icon={c.icon} label={c.short} active={cat === c.id} onClick={() => setCat(c.id)}/>
          ))}
        </div>

        {cat === 'proximite' && <div style={{ display: 'flex', gap: 8, padding: '8px 16px 2px', overflowX: 'auto' }}>
          <select aria-label="Filtrer par métier" value={serviceJob} onChange={event => setServiceJob(event.target.value)} style={{ height: 38, minWidth: 126, borderRadius: 999, border: `1px solid ${OK.line}`, background: '#fff', padding: '0 12px', fontFamily: FA, fontSize: 12, fontWeight: 700, color: OK.ink }}>
            <option value="">Tous les métiers</option>
            {PROXIMITY_JOBS.map(job => <option key={job} value={job}>{job}</option>)}
          </select>
          <select aria-label="Filtrer par quartier" value={serviceZone} onChange={event => setServiceZone(event.target.value)} style={{ height: 38, minWidth: 112, borderRadius: 999, border: `1px solid ${OK.line}`, background: '#fff', padding: '0 12px', fontFamily: FA, fontSize: 12, fontWeight: 700, color: OK.ink }}>
            <option value="">Tous les quartiers</option>
            {['Akanda', 'Glass', 'Louis', 'Nkembo', 'Nzeng-Ayong', 'Owendo'].map(zone => <option key={zone} value={zone}>{zone}</option>)}
          </select>
          <select aria-label="Filtrer par note" value={serviceRating} onChange={event => setServiceRating(event.target.value)} style={{ height: 38, minWidth: 96, borderRadius: 999, border: `1px solid ${OK.line}`, background: '#fff', padding: '0 12px', fontFamily: FA, fontSize: 12, fontWeight: 700, color: OK.ink }}>
            <option value="">Toutes les notes</option>
            <option value="4">4★ et +</option>
            <option value="4.5">4,5★ et +</option>
          </select>
        </div>}

        {/* Compteur */}
        <div style={{ padding: '8px 18px 4px', fontFamily: FA, fontSize: 12.5, color: OK.ink2, fontWeight: 600 }}>
          <strong style={{ color: OK.ink }}>{items.length}</strong> fiche{items.length > 1 ? 's' : ''}
          {cat !== 'tout' && <span style={{ color: OK.ink3 }}> · {(ALL_CATEGORIES.find(c => c.id === cat) || {}).name}</span>}
        </div>
        </div>

        {/* Liste des fiches — lignes horizontales */}
        <div data-screen-scroll="annuaire" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: 112 }}>
        <div style={{ padding: '8px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(e => <AnnuaireRow key={`${e.directoryRoute?.[0] || 'entity'}-${e.id}`} e={e} onClick={() => openDirectoryItem(navigate, e)}/>)}
          {items.length === 0 && <div style={{ padding: '28px 14px', textAlign: 'center', borderRadius: 16, background: '#fff', border: `1px solid ${OK.line}`, fontFamily: FA, fontSize: 13, lineHeight: 1.55, color: OK.ink3 }}>Aucune fiche disponible dans cette rubrique pour le moment.</div>}
        </div>
        <div style={{ height: 40 }}/>
        </div>
      </div>
    </Screen>
  );
}

// Carte entité (réutilisée par recherche)
function EntityCard({ e, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', background: '#fff', borderRadius: 16, border: `1px solid ${OK.line}`,
      cursor: 'pointer', padding: 0, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '100%' }}>
      <div style={{ position: 'relative', height: 84 }}>
        <Img src={e.cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.25) 100%)"/>
      </div>
      <div style={{ padding: '0 12px 12px', display: 'flex', gap: 11, alignItems: 'flex-end', marginTop: -24 }}>
        <div style={{ width: 54, height: 54, borderRadius: 13, overflow: 'hidden', border: '2px solid #fff', background: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
          <Img src={e.logo} style={{ width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundColor: '#fff' }}/>
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: FA, fontSize: 14.5, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.name}</span>
            {e.verified && <Icon name="verified" size={14} color={OK.green} strokeWidth={2}/>}
          </div>
          <div style={{ fontFamily: FA, fontSize: 11.5, color: OK.ink2, marginTop: 1 }}>{e.cat}</div>
        </div>
        <span style={{ fontFamily: FA, fontSize: 11, fontWeight: 700, color: OK.ink3, paddingBottom: 3, whiteSpace: 'nowrap' }}>{e.directoryMeta || `${e.followers} abonnés`}</span>
      </div>
    </button>
  );
}

// ── ANNUAIRE — recherche ────────────────────────────────────
function AnnuaireSearchScreen() {
  const { back, navigate } = useNav();
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const searchable = sortDirectoryItems(directoryList());
  const res = q.trim() ? searchable.filter(e => `${e.name} ${e.cat} ${e.city || ''} ${(e.jobs || []).join(' ')}`.toLowerCase().includes(q.toLowerCase())) : searchable;
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Annuaire recherche">
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: OK.green, padding: `${APP_HEADER_TOP} 14px 14px`, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <button onClick={back} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={18} color="#fff" strokeWidth={2.2}/>
          </button>
          <div style={{ flex: 1, height: 44, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 9 }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Métier, entreprise, institution…"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FA, fontSize: 14, color: OK.ink }}/>
          </div>
        </div>
        <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {res.map(e => <EntityCard key={`${e.directoryRoute?.[0] || 'entity'}-${e.id}`} e={e} onClick={() => openDirectoryItem(navigate, e)}/>)}
          {res.length === 0 && <div style={{ fontFamily: FA, fontSize: 13, color: OK.ink3, textAlign: 'center', padding: '30px 0' }}>Aucune institution trouvée.</div>}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

// ── ANNUAIRE — carte (services autour de moi) ───────────────
function AnnuaireMapScreen() {
  const { back, navigate } = useNav();
  const [sel, setSel] = useState(null);
  const items = entityList();
  const selEntity = sel ? ANNU_ENTITIES[sel] : null;
  return (
    <Screen bg={OK.bg2} statusDark={false} noScroll>
      <div data-screen-label="Carte annuaire" style={{ position: 'absolute', inset: 0 }}>
        {/* fond de carte virtuelle (style plan de ville — Libreville) */}
        <svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* terre */}
          <rect x="0" y="0" width="390" height="844" fill="#EAE7E0"/>
          {/* estuaire / océan (ouest + nord) */}
          <path d="M0,0 H180 C150,90 120,150 95,230 C70,320 60,430 30,520 C12,575 0,610 0,640 Z" fill="#AED5E6"/>
          <path d="M0,700 H120 C90,760 60,810 0,844 Z" fill="#AED5E6"/>
          {/* baie / plan d'eau */}
          <ellipse cx="60" cy="430" rx="46" ry="70" fill="#B7DAEA"/>
          {/* parcs / espaces verts */}
          <rect x="250" y="120" width="92" height="70" rx="14" fill="#CFE6C4"/>
          <rect x="150" y="600" width="120" height="86" rx="16" fill="#CFE6C4"/>
          <circle cx="305" cy="470" r="38" fill="#CFE6C4"/>
          {/* routes principales */}
          <g stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.95">
            <path d="M120,40 C160,180 150,330 210,470 C250,560 300,690 330,820"/>
            <path d="M40,560 C140,520 240,520 360,540"/>
            <path d="M70,250 C170,300 250,300 370,260"/>
          </g>
          {/* routes secondaires */}
          <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.9">
            <path d="M180,90 C220,200 240,360 250,520"/>
            <path d="M110,400 C200,420 300,420 360,400"/>
            <path d="M150,640 C230,660 300,680 360,700"/>
            <path d="M90,160 C160,200 230,220 320,210"/>
            <path d="M210,560 C250,640 280,720 300,810"/>
          </g>
          {/* liserés routes (fines lignes médianes) */}
          <g stroke="#E7C66B" strokeWidth="1.4" strokeDasharray="2 5" fill="none" opacity="0.8">
            <path d="M120,40 C160,180 150,330 210,470 C250,560 300,690 330,820"/>
            <path d="M40,560 C140,520 240,520 360,540"/>
          </g>
          {/* labels */}
          <text x="250" y="60" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="800" fill="#5C5C5C" opacity="0.7" letterSpacing="2">LIBREVILLE</text>
          <text x="34" y="360" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="700" fill="#3E7FA0" opacity="0.85" transform="rotate(-90 34 360)">ESTUAIRE DU GABON</text>
          <g fontFamily="Manrope, sans-serif" fontSize="9.5" fontWeight="700" fill="#7A766C" opacity="0.75">
            <text x="160" y="250">Glass</text>
            <text x="270" y="200">Batterie IV</text>
            <text x="250" y="360">Mont-Bouët</text>
            <text x="180" y="660">Nombakélé</text>
            <text x="285" y="500">Akanda</text>
          </g>
        </svg>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0) 70%, rgba(11,124,57,0.06) 100%)', pointerEvents: 'none' }}/>

        {/* position utilisateur (centre) */}
        <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: OK.blue, border: '3px solid #fff', boxShadow: '0 0 0 8px rgba(31,115,196,0.20), 0 2px 6px rgba(0,0,0,0.25)' }}/>
        </div>

        {/* pins entités */}
        {items.map(e => e.geo && (
          <button key={e.id} onClick={() => setSel(e.id)} style={{ position: 'absolute', left: e.geo.x + '%', top: e.geo.y + '%', transform: 'translate(-50%,-100%)', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, zIndex: sel === e.id ? 20 : 10 }}>
            <div style={{ width: sel === e.id ? 46 : 38, height: sel === e.id ? 46 : 38, borderRadius: 999, overflow: 'hidden', border: `3px solid ${sel === e.id ? OK.gold : '#fff'}`, boxShadow: '0 3px 8px rgba(0,0,0,0.3)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={e.logo} alt={e.name} style={{ width: '82%', height: '82%', objectFit: 'contain' }}/>
            </div>
            <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid ${sel === e.id ? OK.gold : '#fff'}`, margin: '0 auto' }}/>
          </button>
        ))}

        {/* header flottant */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: `${APP_HEADER_TOP} 14px 0`, display: 'flex', alignItems: 'center', gap: 10, zIndex: 30 }}>
          <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: '#fff', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
          </button>
          <div style={{ flex: 1, height: 40, background: '#fff', borderRadius: 999, boxShadow: '0 2px 10px rgba(0,0,0,0.14)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
            <Icon name="pin" size={16} color={OK.green} strokeWidth={2.2}/>
            <span style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 700, color: OK.ink }}>Libreville · autour de moi</span>
          </div>
        </div>

        {/* fiche sélectionnée */}
        {selEntity && (
          <div style={{ position: 'absolute', left: 14, right: 14, bottom: 26, zIndex: 30 }}>
            <button onClick={() => navigate('entity', { id: selEntity.id })} style={{ width: '100%', textAlign: 'left', background: '#fff', borderRadius: 16, border: 'none', cursor: 'pointer', padding: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 8px 26px rgba(0,0,0,0.22)' }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, overflow: 'hidden', flexShrink: 0, border: `1px solid ${OK.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={selEntity.logo} alt={selEntity.name} style={{ width: '86%', height: '86%', objectFit: 'contain' }}/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontFamily: FA, fontSize: 14, fontWeight: 800, color: OK.ink }}>{selEntity.name}</span>
                  {selEntity.verified && <Icon name="verified" size={13} color={OK.green} strokeWidth={2}/>}
                </div>
                <div style={{ fontFamily: FA, fontSize: 11.5, color: OK.ink2, marginTop: 1 }}>{selEntity.cat}</div>
                <div style={{ fontFamily: FA, fontSize: 11, color: OK.ink3, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="pin" size={11} color={OK.ink3} strokeWidth={2}/>{selEntity.city}</div>
              </div>
              <Icon name="chev-r" size={18} color={OK.ink3} strokeWidth={2}/>
            </button>
          </div>
        )}
      </div>
    </Screen>
  );
}

// ── PROFIL ENTITÉ (réseau social : publications + réels) ────
function EntityScreen({ params }) {
  const { back, navigate } = useNav();
  const e = ANNU_ENTITIES[params?.id];
  const [tab, setTab] = useState(e?.tenants ? 'etablissements' : 'publications');
  const [following, setFollowing] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  if (!e) return <Screen bg={OK.bg2} statusDark={true}><div data-screen-label="Fiche introuvable"><GreenHeader title="Fiche introuvable" onBack={back}/><div style={{ padding: 24, fontFamily: FA, fontSize: 13.5, lineHeight: 1.6, color: OK.ink2 }}>Cette fiche n’existe pas ou n’est plus disponible dans l’annuaire.</div></div></Screen>;
  const posts = ANNU_POSTS.filter(p => p.entity === e.id);
  const reels = ANNU_REELS.filter(r => r.entity === e.id);
  const allReels = ANNU_REELS; // pour remplir l'onglet réels

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar noScroll edgeTop>
      <div data-screen-label="Profil entité" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <DetailOverlayHeader solid={headerSolid} title={e.name} onBack={back} onAction={() => notifyDemo(`Profil ${e.name} prêt à être partagé`)}/>
        <div data-screen-scroll="entity" onScroll={event => setHeaderSolid(event.currentTarget.scrollTop > 80)} style={{ position: 'absolute', inset: '0 0 92px', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: 24 }}>
        {/* Cover bâtiment */}
        <div style={{ position: 'relative', height: e.coverAspectRatio ? 'auto' : 170, aspectRatio: e.coverAspectRatio || undefined }}>
          <Img src={e.cover} style={{ position: 'absolute', inset: 0, backgroundSize: e.coverFit || 'cover', backgroundPosition: e.coverPosition || 'center' }} overlay="linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 36%)"/>
        </div>

        {/* Identité */}
        <div style={{ padding: '0 18px', marginTop: -34 }}>
          <div style={{ width: 76, height: 76, borderRadius: 18, overflow: 'hidden', border: '3px solid #fff', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
            <Img src={e.logo} style={{ width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundColor: '#fff' }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginTop: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h1 style={{ margin: 0, fontFamily: FA, fontWeight: 800, fontSize: 21, color: OK.ink, letterSpacing: -0.3 }}>{e.name}</h1>
                {e.verified && <Icon name="verified" size={17} color={OK.green} strokeWidth={2}/>}
              </div>
              <div style={{ fontFamily: FA, fontWeight: 700, fontSize: 12, color: OK.green, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.3 }}>{e.cat}</div>
            </div>
            <button onClick={() => setFollowing(f => !f)} style={{ flexShrink: 0, height: 38, padding: '0 18px', borderRadius: 10, cursor: 'pointer',
              border: following ? `1.5px solid ${OK.green}` : 'none', background: following ? '#fff' : OK.green, color: following ? OK.green : '#fff',
              fontFamily: FA, fontSize: 13.5, fontWeight: 800, boxShadow: following ? 'none' : '0 4px 12px rgba(11,124,57,0.3)' }}>
              {following ? 'Abonné' : 'Suivre'}
            </button>
          </div>
          {/* stats */}
          <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
            {e.followers && <span style={{ fontFamily: FA, fontSize: 13, color: OK.ink }}><strong style={{ fontWeight: 800 }}>{e.followers}</strong> <span style={{ color: OK.ink2 }}>{e.followersLabel || 'abonnés'}</span></span>}
            <span style={{ fontFamily: FA, fontSize: 13, color: OK.ink }}><strong style={{ fontWeight: 800 }}>{posts.length}</strong> <span style={{ color: OK.ink2 }}>publications</span></span>
          </div>
          <p style={{ margin: '12px 0 0', fontFamily: FA, fontSize: 13, color: OK.ink2, lineHeight: 1.55 }}>{e.bio}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
            {[['pin', e.city], e.phone && ['phone', e.phone]].filter(Boolean).map(([ic, v]) => (
              <div key={ic} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Icon name={ic} size={15} color={OK.green} strokeWidth={2}/>
                <span style={{ fontFamily: FA, fontSize: 12.5, color: OK.ink, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          {/* actions sociales */}
          <div style={{ marginTop: 14 }}><ProfileLinks links={e.links} phone={e.phone}/></div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, margin: '18px 18px 0', borderBottom: `1px solid ${OK.line}` }}>
          {(e.tenants ? [['etablissements', 'Établissements'], ['publications', 'Publications'], ['reels', 'Réels'], ['infos', 'Infos']] : [['publications', 'Publications'], ['reels', 'Réels'], ['infos', 'Infos']]).map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '10px 0 12px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: FA, fontSize: 13.5, fontWeight: tab === id ? 800 : 600, color: tab === id ? OK.green : OK.ink3,
              borderBottom: tab === id ? `2.5px solid ${OK.green}` : '2.5px solid transparent', marginBottom: -1 }}>{l}</button>
          ))}
        </div>

        {/* Contenu */}
        {tab === 'etablissements' && e.tenants && (
          <div style={{ padding: '8px 16px 0' }}>
            {['Restaurants', 'Sport & loisirs', 'Famille & shopping'].map(grp => {
              const list = e.tenants.filter(t => t.group === grp);
              if (!list.length) return null;
              return (
                <div key={grp} style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 2px 10px' }}>
                    <span style={{ fontFamily: FA, fontWeight: 800, fontSize: 14.5, color: OK.green }}>{grp}</span>
                    <span style={{ fontFamily: FA, fontSize: 11.5, color: OK.ink3 }}>{list.length} enseigne{list.length > 1 ? 's' : ''}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {list.map(t => (
                      <button key={t.id} onClick={() => navigate('tenant', { id: t.id })} style={{ textAlign: 'left', background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', aspectRatio: '4 / 3' }}>
                          <Img src={t.img} style={{ position: 'absolute', inset: 0 }}/>
                          <span style={{ position: 'absolute', top: 8, left: 8, display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(0,0,0,0.66)', color: '#fff', fontFamily: FA, fontWeight: 800, fontSize: 10, padding: '3px 7px', borderRadius: 999 }}><Icon name="star" size={10} color={OK.gold}/> {t.rating.toString().replace('.', ',')}</span>
                        </div>
                        <div style={{ padding: '9px 11px 11px' }}>
                          <div style={{ fontFamily: FA, fontSize: 13, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                          <div style={{ fontFamily: FA, fontSize: 11, color: OK.ink2, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.cat}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ height: 10 }}/>
          </div>
        )}
        {tab === 'publications' && (
          <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {posts.map(p => <PostCard key={p.id} post={p} entity={e}/>)}
            {posts.length === 0 && <div style={{ fontFamily: FA, fontSize: 13, color: OK.ink3, textAlign: 'center', padding: '20px 0' }}>Aucune publication pour le moment.</div>}
          </div>
        )}
        {tab === 'reels' && (
          <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {(reels.length ? reels.concat(allReels) : allReels).slice(0, 9).map((r, i) => (
              <div key={r.id + i} style={{ position: 'relative', aspectRatio: '9 / 16', borderRadius: 10, overflow: 'hidden' }}>
                <Img src={r.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)"/>
                <div style={{ position: 'absolute', top: 6, right: 6 }}><Icon name="media" size={14} color="#fff" strokeWidth={2}/></div>
                <span style={{ position: 'absolute', left: 6, bottom: 6, fontFamily: FA, fontSize: 9.5, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 3 }}>
                  ▶ {r.views}
                </span>
              </div>
            ))}
          </div>
        )}
        {tab === 'infos' && (
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 16, padding: 16 }}>
              <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 15, color: OK.ink, marginBottom: 10 }}>À propos</div>
              <p style={{ margin: 0, fontFamily: FA, fontSize: 13, color: OK.ink2, lineHeight: 1.6 }}>{e.bio}</p>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[['pin', 'Adresse', e.city], e.phone && ['phone', 'Téléphone', e.phone], ['verified', 'Statut', 'Compte officiel vérifié O’KABA']].filter(Boolean).map(([ic, l, v]) => (
                  <div key={l} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(11,124,57,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={ic} size={16} color={OK.green} strokeWidth={2}/>
                    </div>
                    <div>
                      <div style={{ fontFamily: FA, fontSize: 10.5, fontWeight: 800, color: OK.ink3, letterSpacing: 0.3, textTransform: 'uppercase' }}>{l}</div>
                      <div style={{ fontFamily: FA, fontSize: 13, fontWeight: 600, color: OK.ink, marginTop: 1 }}>{v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div style={{ height: 30 }}/>
        </div>
      </div>
    </Screen>
  );
}

// Carte publication (style réseau social)
function PostCard({ post, entity }) {
  const [liked, setLiked] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${OK.line}`, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: `1px solid ${OK.line}` }}>
          <Img src={entity.logo} style={{ width: '100%', height: '100%' }}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: FA, fontSize: 13.5, fontWeight: 800, color: OK.ink }}>{entity.name}</span>
            {entity.verified && <Icon name="verified" size={13} color={OK.green} strokeWidth={2}/>}
          </div>
          <div style={{ fontFamily: FA, fontSize: 11, color: OK.ink3, marginTop: 1 }}>{post.time}</div>
        </div>
        <Icon name="dots" size={18} color={OK.ink3} strokeWidth={2}/>
      </div>
      {/* texte */}
      <p style={{ margin: '0 12px 10px', fontFamily: FA, fontSize: 13, color: OK.ink, lineHeight: 1.5 }}>{post.text}</p>
      {/* image */}
      {post.img && <div style={{ position: 'relative', height: 220 }}><Img src={post.img} style={{ position: 'absolute', inset: 0 }}/></div>}
      {/* actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '10px 14px 12px' }}>
        <button onClick={() => setLiked(l => !l)} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <Icon name={liked ? 'heart-f' : 'heart'} size={20} color={liked ? OK.red : OK.ink2} strokeWidth={2}/>
          <span style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 700, color: OK.ink2 }}>{(post.likes + (liked ? 1 : 0)).toLocaleString('fr-FR')}</span>
        </button>
        <button onClick={() => notifyDemo('Commentaires ouverts')} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <Icon name="message" size={19} color={OK.ink2} strokeWidth={2}/>
          <span style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 700, color: OK.ink2 }}>{post.comments}</span>
        </button>
        <button onClick={() => notifyDemo('Publication prête à être partagée')} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <Icon name="share" size={18} color={OK.ink2} strokeWidth={2}/>
          <span style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 700, color: OK.ink2 }}>{post.shares}</span>
        </button>
        <div style={{ flex: 1 }}/>
        <Icon name="bookmark" size={18} color={OK.ink2} strokeWidth={2}/>
      </div>
    </div>
  );
}

// ── VITRINE ÉTABLISSEMENT (enseigne d'un complexe : menu, photos, avis, infos) ──
function TenantScreen({ params }) {
  const { back, navigate } = useNav();
  const t = (typeof BAIE_TENANTS_MAP !== 'undefined' && BAIE_TENANTS_MAP[params?.id]) || null;
  const [tab, setTab] = useState('infos');
  const [fav, setFav] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  if (!t) return (<Screen bg={OK.bg2} statusDark={true}><div data-screen-label="Établissement"><GreenHeader title="Établissement" onBack={back}/></div></Screen>);
  const gallery = (t.gallery || []).map(src => baieMedia(src, 600));
  const hasReviews = Number.isFinite(t.rating) && (t.reviews || 0) > 0;
  const hasMenu = Array.isArray(t.menu) && t.menu.length > 0;
  const TABS_E = [
    ['infos', 'Infos'],
    hasReviews && ['avis', 'Avis'],
    hasMenu && ['menu', t.menuLabel || 'Menu'],
    gallery.length > 0 && ['photos', 'Photos'],
  ].filter(Boolean);
  const dist = [58, 62, 24, 8, 4];
  return (
    <Screen bg={OK.bg} statusDark={true} noScroll edgeTop footer={
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fff', borderTop: `1px solid ${OK.line}`, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`, display: 'flex', gap: 10, boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
        <button onClick={() => setFav(f => !f)} style={{ width: 52, height: 52, borderRadius: 13, border: `1.5px solid ${OK.line}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={fav ? 'heart-f' : 'heart'} size={21} color={fav ? OK.red : OK.ink2} strokeWidth={2}/></button>
        <button onClick={() => navigate('messages')} style={{ width: 52, height: 52, borderRadius: 13, border: `1.5px solid ${OK.green}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="message" size={20} color={OK.green} strokeWidth={2}/></button>
        <button onClick={() => notifyDemo(`${t.cta || 'Réservation'} enregistrée pour la démonstration`)} style={{ flex: 1, height: 52, borderRadius: 13, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FA, fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(11,124,57,0.32)' }}>{t.cta || 'Réserver'}</button>
      </div>
    }>
      <div data-screen-label="Vitrine établissement" style={{ position: 'absolute', inset: 0, overflow: 'hidden', '--detail-hero-h': 'clamp(220px, 30vh, 250px)' }}>
        {/* Hero */}
        <div data-fixed-hero="tenant" style={{ position: 'absolute', zIndex: 0, top: 0, left: 0, right: 0, height: 'var(--detail-hero-h)' }}>
          <Img src={t.img} style={{ position: 'absolute', inset: 0, backgroundSize: t.imgFit || 'cover', backgroundPosition: t.imgPosition || 'center', backgroundColor: t.imgFit === 'contain' ? '#fff' : OK.bg2 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.34) 0%, transparent 30%, rgba(0,0,0,0.52) 100%)"/>
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 32 }}>
            <span style={{ display: 'inline-block', background: OK.gold, color: '#3a2c00', fontFamily: FA, fontWeight: 800, fontSize: 10, padding: '3px 9px', borderRadius: 999, marginBottom: 8 }}>{t.group}</span>
            <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 25, color: '#fff', letterSpacing: -0.4, textShadow: '0 1px 6px rgba(0,0,0,0.45)' }}>{t.name}</div>
            <div style={{ fontFamily: FA, fontWeight: 600, fontSize: 12.5, color: 'rgba(255,255,255,0.92)', marginTop: 3, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{t.tagline}</div>
          </div>
        </div>

        <div aria-hidden style={{ position: 'absolute', zIndex: 20, top: 0, left: 0, right: 0,
          height: `calc(${APP_DETAIL_HEADER_HEIGHT} + ${APP_SAFE_TOP})`,
          pointerEvents: 'none', background: headerSolid ? OK.green : 'transparent',
          borderBottom: headerSolid ? '1px solid rgba(255,255,255,0.16)' : '1px solid transparent',
          boxShadow: headerSolid ? '0 5px 18px rgba(0,0,0,0.14)' : 'none', transition: 'background .12s ease, box-shadow .12s ease' }}/>
        <div style={{ position: 'absolute', top: APP_EDGE_TOP, left: 14, right: 14, zIndex: 30, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/></button>
          <button onClick={() => notifyDemo(`${t.name} prêt à être partagé`)} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: headerSolid ? '#fff' : '#3a3a3a', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" size={17} color={headerSolid ? OK.green : '#fff'} strokeWidth={2}/></button>
          <div style={{ position: 'absolute', left: 56, right: 56, top: 10, textAlign: 'center', opacity: headerSolid ? 1 : 0, transition: 'opacity .15s ease',
            fontFamily: FA, fontSize: 14, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pointerEvents: 'none' }}>{t.name}</div>
        </div>

        <div data-screen-scroll="tenant" onScroll={e => setHeaderSolid(e.currentTarget.scrollTop > 80)} style={{ position: 'absolute', zIndex: 1, inset: '0 0 92px', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
        <div aria-hidden style={{ height: 'calc(var(--detail-hero-h) - 20px)', pointerEvents: 'none' }}/>
        <div data-scroll-sheet="tenant" style={{ minHeight: `calc(100% - ${APP_DETAIL_HEADER_HEIGHT})`, paddingTop: 6, background: OK.bg, borderRadius: '22px 22px 0 0' }}>
        {/* Identity */}
          <div style={{ padding: '14px 18px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
              {hasReviews && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FA, fontSize: 13, fontWeight: 800, color: OK.ink }}><Icon name="star" size={14} color={OK.star}/> {t.rating.toString().replace('.', ',')} <span style={{ color: OK.ink2, fontWeight: 600 }}>({t.reviews} avis)</span></span>}
              {hasReviews && t.priceLevel ? <span style={{ width: 3, height: 3, borderRadius: 3, background: OK.ink3 }}/> : null}
              {t.priceLevel ? <span style={{ fontFamily: FA, fontSize: 12.5, color: OK.ink2, fontWeight: 700 }}>{t.priceLevel}</span> : null}
              {t.priceLevel && <span style={{ width: 3, height: 3, borderRadius: 3, background: OK.ink3 }}/>} 
              <StatusPill open={t.open} time={t.hours}/>
              {t.collected && <span style={{ padding: '4px 9px', borderRadius: 999, background: 'rgba(197,150,0,0.13)', border: '1px solid rgba(197,150,0,0.34)', color: '#7A5A00', fontFamily: FA, fontSize: 10, fontWeight: 800 }}>Fiche terrain</span>}
          </div>
          {/* lien complexe */}
          <button onClick={() => navigate('entity', { id: 'baie-des-rois' })} style={{ marginTop: 13, width: '100%', textAlign: 'left', background: 'rgba(11,124,57,0.055)', border: `1px solid rgba(11,124,57,0.18)`, borderRadius: 14, padding: '11px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="shop" size={17} color="#fff" strokeWidth={2}/></div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 800, color: OK.green }}>La Baie des Rois</div><div style={{ fontFamily: FA, fontSize: 11, color: OK.ink2, marginTop: 1 }}>Enseigne du site aménagé par la FMCT · Libreville</div></div>
            <Icon name="chev-r" size={16} color={OK.green} strokeWidth={2.4}/>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 18px 4px' }}>
          {TABS_E.map(([id, l]) => {
            const on = tab === id;
            return (<button key={id} onClick={() => setTab(id)} style={{ flexShrink: 0, height: 34, padding: '0 15px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap', border: on ? 'none' : `1px solid ${OK.line}`, background: on ? OK.green : OK.bg2, color: on ? '#fff' : OK.ink2, fontFamily: FA, fontSize: 12.5, fontWeight: 700 }}>{l}</button>);
          })}
        </div>

        {/* Contenu */}
        <div style={{ padding: '12px 18px 0' }}>
          {tab === 'menu' && (
            <div>
              {(t.menu || []).map(sec => (
                <div key={sec.t} style={{ marginTop: 14 }}>
                  <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 11.5, color: OK.green, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>{sec.t}</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {sec.items.map(([nm, ds, pr], i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '11px 0', borderBottom: `1px solid ${OK.line}` }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: FA, fontSize: 13.5, fontWeight: 700, color: OK.ink }}>{nm}</div>
                          {ds && <div style={{ fontFamily: FA, fontSize: 11.5, color: OK.ink3, marginTop: 2, lineHeight: 1.4 }}>{ds}</div>}
                        </div>
                        {pr > 0 && <div style={{ fontFamily: FA, fontSize: 13.5, fontWeight: 800, color: OK.green, whiteSpace: 'nowrap' }}>{fcfa(pr)}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'photos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 2 }}>
              {gallery.map((src, i) => (
                <div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 10, overflow: 'hidden' }}><Img src={src} style={{ width: '100%', height: '100%', backgroundSize: src === t.logo ? 'contain' : 'cover', backgroundColor: src === t.logo ? '#fff' : OK.bg2 }}/></div>
              ))}
            </div>
          )}
          {tab === 'avis' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '4px 2px 14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 40, color: OK.ink, lineHeight: 1 }}>{t.rating.toString().replace('.', ',')}</div>
                  <Stars value={t.rating} size={13}/>
                  <div style={{ fontFamily: FA, fontSize: 11, color: OK.ink3, marginTop: 4 }}>{t.reviews} avis</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[5, 4, 3, 2, 1].map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontFamily: FA, fontSize: 10, color: OK.ink3, width: 8 }}>{s}</span>
                      <div style={{ flex: 1, height: 5, borderRadius: 5, background: OK.bg2, overflow: 'hidden' }}><div style={{ width: dist[i] + '%', height: '100%', background: OK.star }}/></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(t.reviewList || []).map(([nm, rt, tm, tx], i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 14, padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 999, background: OK.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FA, fontSize: 13, fontWeight: 800 }}>{nm[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: FA, fontSize: 13, fontWeight: 800, color: OK.ink }}>{nm}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Stars value={rt} size={10}/><span style={{ fontFamily: FA, fontSize: 10.5, color: OK.ink3 }}>{tm}</span></div>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontFamily: FA, fontSize: 12.5, lineHeight: 1.55, color: OK.ink2 }}>{tx}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'infos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 2 }}>
              <p style={{ margin: 0, fontFamily: FA, fontSize: 13.5, lineHeight: 1.65, color: OK.ink2 }}>{t.desc}</p>
              <div>
                <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 13, color: OK.ink, marginBottom: 9 }}>Services</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {t.tags.map(tg => (<span key={tg} style={{ fontFamily: FA, fontSize: 11.5, fontWeight: 700, color: OK.ink2, background: OK.bg2, border: `1px solid ${OK.line}`, padding: '6px 11px', borderRadius: 999 }}>{tg}</span>))}
                </div>
              </div>
              <ProfileLinks links={t.links || {}} phone={t.phone}/>
              <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 14, overflow: 'hidden' }}>
                {[
                  ['clock', 'Horaires', t.hours],
                  ['pin', 'Adresse', t.address || 'La Baie des Rois · Bord de mer, Libreville'],
                  t.zone && ['navigate', 'Zone / secteur', t.zone],
                  t.gps && ['pin', 'Position GPS', t.gps],
                  ['phone', 'Téléphone', t.phone],
                  t.email && ['message', 'E-mail', t.email],
                  t.manager && ['user', 'Responsable', t.manager],
                  t.collectionRef && ['check', 'Source', `${t.collectionRef} · collectée le ${t.collectedAt}`],
                ].filter(Boolean).map(([ic, l, v], i) => (
                  <div key={l} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 14px', borderTop: i ? `1px solid ${OK.line}` : 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(11,124,57,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={ic} size={17} color={OK.green} strokeWidth={2}/></div>
                    <div><div style={{ fontFamily: FA, fontSize: 10.5, fontWeight: 800, color: OK.ink3, letterSpacing: 0.3, textTransform: 'uppercase' }}>{l}</div><div style={{ fontFamily: FA, fontSize: 13, fontWeight: 600, color: OK.ink, marginTop: 1 }}>{v}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: 26 }}/>
        </div>
        </div>
      </div>
    </Screen>
  );
}

// ── LA BAIE DES ROIS — page complexe (style natif O'KABA) ──
function BaieHub({ params }) {
  const { back, navigate } = useNav();
  const e = (typeof ANNU_ENTITIES !== 'undefined' && ANNU_ENTITIES[params?.id]) || ANNU_ENTITIES['baie-des-rois'];
  const [tab, setTab] = useState('etab');
  const [grp, setGrp] = useState('Tout');
  const [following, setFollowing] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const tenants = e.tenants || [];
  const groupOrder = ['Restaurants', 'Bars & lounges', 'Services', 'Loisirs & famille', 'Shopping'];
  const groups = [...new Set(tenants.map(t => t.group))].sort((a, b) => {
    const ai = groupOrder.indexOf(a), bi = groupOrder.indexOf(b);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  const shown = grp === 'Tout' ? tenants : tenants.filter(t => t.group === grp);
  const events = BAIE_EVENTS.map(ev => ({ ...ev, when: `${ev.date} · ${ev.time}`, img: ev.poster }));
  const card = (t) => (
    <button key={t.id} onClick={() => navigate('tenant', { id: t.id })} style={{ textAlign: 'left', background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3' }}>
        <Img src={t.img} style={{ position: 'absolute', inset: 0, backgroundSize: t.imgFit || 'cover', backgroundPosition: t.imgPosition || 'center', backgroundColor: t.imgFit === 'contain' ? '#fff' : OK.bg2 }}/>
        {Number.isFinite(t.rating) ? (
          <span style={{ position: 'absolute', top: 8, left: 8, display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(0,0,0,0.66)', color: '#fff', fontFamily: FA, fontWeight: 800, fontSize: 10, padding: '3px 7px', borderRadius: 999 }}><Icon name="star" size={10} color={OK.gold}/> {t.rating.toString().replace('.', ',')}</span>
        ) : (
          <span style={{ position: 'absolute', top: 8, left: 8, background: OK.gold, color: '#3a2c00', fontFamily: FA, fontWeight: 800, fontSize: 9.5, padding: '4px 8px', borderRadius: 999 }}>Fiche terrain</span>
        )}
      </div>
      <div style={{ padding: '9px 11px 11px' }}>
        <div style={{ fontFamily: FA, fontSize: 13, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
        <div style={{ fontFamily: FA, fontSize: 11, color: OK.ink2, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.cat}</div>
      </div>
    </button>
  );

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar noScroll edgeTop>
      <div data-screen-label="La Baie des Rois" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <DetailOverlayHeader solid={headerSolid} title={e.name} onBack={back} onAction={() => notifyDemo('La Baie des Rois prête à être partagée')}/>
        <div data-screen-scroll="entity-baie" onScroll={event => setHeaderSolid(event.currentTarget.scrollTop > 80)} style={{ position: 'absolute', inset: '0 0 92px', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: 24 }}>
        {/* Cover */}
        <div style={{ position: 'relative', height: 170 }}>
          <Img src={e.cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.34) 0%, transparent 40%)"/>
        </div>

        {/* Identité */}
        <div style={{ padding: '0 18px', marginTop: -34 }}>
          <div style={{ width: 76, height: 76, borderRadius: 18, overflow: 'hidden', border: '3px solid #fff', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
            <Img src={e.logo || (e.photos && e.photos[1]) || e.cover} style={{ width: '100%', height: '100%' }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginTop: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h1 style={{ margin: 0, fontFamily: FA, fontWeight: 800, fontSize: 21, color: OK.ink, letterSpacing: -0.3 }}>{e.name}</h1>
                {e.verified && <Icon name="verified" size={17} color={OK.green} strokeWidth={2}/>}
              </div>
              <div style={{ fontFamily: FA, fontWeight: 700, fontSize: 12, color: OK.green, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.3 }}>{e.cat}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FA, fontSize: 12.5, fontWeight: 800, color: OK.ink }}><Icon name="star" size={13} color={OK.star}/> {e.rating.toString().replace('.', ',')}</span>
                <StatusPill open={true} time={e.hours.replace('Tous les jours · ', '')}/>
              </div>
            </div>
            <button onClick={() => setFollowing(f => !f)} style={{ flexShrink: 0, height: 38, padding: '0 18px', borderRadius: 10, cursor: 'pointer', border: following ? `1.5px solid ${OK.green}` : 'none', background: following ? '#fff' : OK.green, color: following ? OK.green : '#fff', fontFamily: FA, fontSize: 13.5, fontWeight: 800, boxShadow: following ? 'none' : '0 4px 12px rgba(11,124,57,0.3)' }}>{following ? 'Abonné' : 'Suivre'}</button>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
            <span style={{ fontFamily: FA, fontSize: 13, color: OK.ink }}><strong style={{ fontWeight: 800 }}>{e.followers}</strong> <span style={{ color: OK.ink2 }}>abonnés</span></span>
            <span style={{ fontFamily: FA, fontSize: 13, color: OK.ink }}><strong style={{ fontWeight: 800 }}>{tenants.length}</strong> <span style={{ color: OK.ink2 }}>établissements</span></span>
          </div>
          <p style={{ margin: '12px 0 0', fontFamily: FA, fontSize: 13, color: OK.ink2, lineHeight: 1.55 }}>{e.bio}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
            {[['pin', e.city], ['phone', e.phone]].map(([ic, v]) => (
              <div key={ic} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Icon name={ic} size={15} color={OK.green} strokeWidth={2}/>
                <span style={{ fontFamily: FA, fontSize: 12.5, color: OK.ink, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
            {[['navigate', OK.green], ['phone', OK.blue], ['globe', OK.green], ['whatsapp', OK.wa], ['fb', OK.fb]].map(([ic, bg], i) => (
              <button key={i} onClick={() => notifyDemo(['Itinéraire', 'Appel', 'Site web', 'WhatsApp', 'Facebook'][i])} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer', background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}><Icon name={ic} size={19} color="#fff" strokeWidth={2}/></button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, margin: '18px 18px 0', borderBottom: `1px solid ${OK.line}` }}>
          {[['etab', 'Établissements'], ['events', 'Événements'], ['infos', 'Infos']].map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '10px 0 12px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: FA, fontSize: 13.5, fontWeight: tab === id ? 800 : 600, color: tab === id ? OK.green : OK.ink3, borderBottom: tab === id ? `2.5px solid ${OK.green}` : '2.5px solid transparent', marginBottom: -1 }}>{l}</button>
          ))}
        </div>

        {/* Établissements */}
        {tab === 'etab' && (
          <div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 16px 4px' }}>
              <CatChip label="Tout" active={grp === 'Tout'} onClick={() => setGrp('Tout')}/>
              {groups.map(g => <CatChip key={g} label={g} active={grp === g} onClick={() => setGrp(g)}/>)}
            </div>
            {grp === 'Tout' ? groups.map(g => {
              const list = tenants.filter(t => t.group === g);
              if (!list.length) return null;
              return (
                <div key={g} style={{ padding: '8px 16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '8px 2px 10px' }}>
                    <span style={{ fontFamily: FA, fontWeight: 800, fontSize: 15, color: OK.green }}>{g}</span>
                    <span style={{ fontFamily: FA, fontSize: 11.5, color: OK.ink3 }}>{list.length} enseigne{list.length > 1 ? 's' : ''}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>{list.map(card)}</div>
                </div>
              );
            }) : (
              <div style={{ padding: '12px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>{shown.map(card)}</div>
            )}
            <div style={{ height: 16 }}/>
          </div>
        )}

        {/* Événements */}
        {tab === 'events' && (
          <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {events.map((ev, i) => (
              <button key={i} onClick={() => navigate('event', { event: { ...ev, place: 'La Baie des Rois · Libreville' } })} style={{ width: '100%', position: 'relative', height: 150, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}>
                <Img src={ev.img} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 30%' }} overlay="linear-gradient(180deg, rgba(7,40,20,0.1) 30%, rgba(7,40,20,0.82) 100%)"/>
                <div style={{ position: 'absolute', top: 12, right: 12, background: OK.gold, color: '#3a2c00', padding: '4px 10px', borderRadius: 999, fontFamily: FA, fontWeight: 800, fontSize: 10.5 }}>Événement</div>
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
                  <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 18, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>{ev.title}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, fontFamily: FA, fontWeight: 700, fontSize: 11.5, color: '#fff' }}><Icon name="calendar" size={13} color={OK.gold} strokeWidth={2.2}/>{ev.when}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Infos */}
        {tab === 'infos' && (
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 16, overflow: 'hidden' }}>
              {[['clock', 'Horaires', e.hours], ['pin', 'Adresse', e.city], ['car', 'Parking', 'Gratuit · 400 places'], ['telecom', 'Wi-Fi', 'Gratuit sur tout le site'], ['wallet', 'Paiement', 'Espèces · Mobile Money · Carte']].map(([ic, l, v], i) => (
                <div key={l} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 14px', borderTop: i ? `1px solid ${OK.line}` : 'none' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(11,124,57,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={ic} size={18} color={OK.green} strokeWidth={2}/></div>
                  <div style={{ flex: 1 }}><div style={{ fontFamily: FA, fontSize: 10.5, fontWeight: 800, color: OK.ink3, letterSpacing: 0.3, textTransform: 'uppercase' }}>{l}</div><div style={{ fontFamily: FA, fontSize: 13, fontWeight: 600, color: OK.ink, marginTop: 1 }}>{v}</div></div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 15, color: OK.green, margin: '18px 2px 10px' }}>En images</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {[...(e.photos || []), ...(e.gallery || []).map(id => bImg(id, 400))].map((src, i) => (<div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 10, overflow: 'hidden' }}><Img src={src} style={{ width: '100%', height: '100%' }}/></div>))}
            </div>
          </div>
        )}

        <div style={{ height: 30 }}/>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { AnnuaireScreen, AnnuaireSearchScreen, AnnuaireMapScreen, EntityScreen, TenantScreen, BaieHub });


// ===================== 09-tourisme =====================
// okaba-screens-tourisme.jsx — Tourisme : Découvrez le Gabon (style img1)
const FT = "'Manrope', system-ui, sans-serif";

const BAIE_PLACES = {
  restaurants: {
    title: 'Restaurants, cafés & bars',
    cover: 'assets/baie/c21-project-01.webp',
    places: [
      { id: 'promenade-gourmande', name: 'Promenade gourmande', subtitle: 'Kiosques & tables en plein air', image: 'assets/baie/c21-project-01.webp',
        description: 'Une succession de kiosques, de restaurants pop-up et de terrasses anime la Promenade Nord. Le parcours compose une expérience libre et vivante où la gastronomie accompagne chaque moment passé face à l’océan.',
        vision: 'Faire de la promenade la première destination culinaire à ciel ouvert de Libreville, avec une programmation renouvelée et une forte visibilité pour les enseignes.',
        highlights: ['Front de mer', 'Terrasses', 'Flux piéton'], gallery: ['assets/baie/c21-aerial-03.webp', 'assets/baie/c21-cover.webp'] },
      { id: 'morellis', name: 'Morellis Gelato Gabon', subtitle: 'Glacier & salon de thé', image: 'assets/baie/morellis-sundaes.jpg',
        description: 'Morellis apporte à la Baie des Rois une signature gourmande internationale pensée pour les familles, les rendez-vous et les pauses au coucher du soleil.',
        vision: 'Une enseigne locomotive capable d’installer des habitudes de visite et de renforcer le positionnement premium du front de mer.',
        highlights: ['Glacier', 'Salon de thé', 'Destination famille'], gallery: ['assets/baie/morellis-gelato.jpg', 'assets/baie/morellis-drinks.jpg', 'assets/baie/morellis-strawberry.jpg'] },
      { id: 'quartier-gastronomique', name: 'Quartier gastronomique', subtitle: 'Une destination culinaire signature', image: 'assets/baie/c21-cover.webp',
        description: 'Un ensemble cohérent de restaurants, cafés et concepts culinaires conçu comme une destination à part entière au cœur du nouveau quartier maritime.',
        vision: 'Réunir les meilleures signatures locales et internationales dans une adresse emblématique, active du petit-déjeuner jusqu’à la nuit.',
        highlights: ['Mix d’enseignes', 'Destination premium', 'Animation continue'], gallery: ['assets/baie/c21-project-01.webp', 'assets/baie/c21-aerial-03.webp'] },
      { id: 'terrasses-panoramiques', name: 'Terrasses panoramiques', subtitle: 'Dîner au-dessus de la baie', image: 'assets/baie/c21-aerial-02.webp',
        description: 'Des restaurants haut de gamme prolongés par de grandes terrasses ouvrent le quartier sur l’horizon et transforment chaque repas en expérience spectaculaire.',
        vision: 'Créer les vues les plus recherchées de Libreville et une offre de restauration capable d’attirer résidents, voyageurs et clientèle d’affaires.',
        highlights: ['Vue océan', 'Haute gastronomie', 'Hospitalité'], gallery: ['assets/baie/c21-cover.webp', 'assets/baie/c21-promenade-01.webp'] },
      { id: 'beach-bars', name: 'Beach-bars', subtitle: 'L’énergie du littoral', image: 'assets/baie/c21-aerial-03.webp',
        description: 'Des pavillons ouverts sur le rivage mêlent cocktails, musique, détente et petite restauration dans une identité architecturale légère et tropicale.',
        vision: 'Installer une scène lifestyle identifiable, capable d’animer le front de mer et de devenir une référence régionale.',
        highlights: ['Lifestyle', 'Musique', 'Coucher de soleil'], gallery: ['assets/baie/c21-site-01.webp', 'assets/baie/c21-aerial-02.webp'] },
    ],
  },
  hotels: {
    title: 'Hôtels',
    cover: 'assets/baie/hilton-hotel.webp',
    places: [
      { id: 'hilton-baie', name: 'Hilton Baie des Rois', subtitle: 'Projet hôtelier annoncé · ouverture à venir', image: 'assets/baie/hilton-hotel.webp',
        description: 'Porté par le partenariat entre Kasada, le FGIS et la FMCT, le complexe Hilton installe une nouvelle référence hôtelière internationale sur la zone nord de la Baie des Rois.',
        vision: 'Positionner Libreville sur la carte de l’hospitalité haut de gamme et créer une porte d’entrée privilégiée pour le tourisme d’affaires et de loisirs.',
        highlights: ['Hilton', 'Kasada · FGIS · FMCT', 'Zone nord'], gallery: ['assets/baie/fmct-chantier-01.jpg', 'assets/baie/fmct-chantier-03.jpg', 'assets/baie/c21-cover.webp'] },
      { id: 'pole-hospitalite', name: 'Pôle d’hospitalité', subtitle: 'Séjours, affaires & expériences', image: 'assets/baie/c21-aerial-05.webp',
        description: 'Autour de l’hôtel, un écosystème de services, de restauration et d’expériences compose un quartier capable d’accueillir voyageurs, événements et rencontres professionnelles.',
        vision: 'Allonger la durée des séjours, multiplier les usages du site et générer une activité économique continue sur le front de mer.',
        highlights: ['Tourisme d’affaires', 'Loisirs', 'Services premium'], gallery: ['assets/baie/c21-cover.webp', 'assets/baie/c21-aerial-02.webp'] },
      { id: 'architecture-durable', name: 'Architecture bas carbone', subtitle: 'Bois massif · EDGE · sobriété', image: 'assets/baie/c21-aerial-05.webp',
        description: 'Les bâtiments privilégient l’efficacité énergétique, les matériaux durables, le bois massif et une gestion exigeante de l’eau pour inscrire la destination dans une trajectoire responsable.',
        vision: 'Faire de la Baie des Rois une vitrine africaine de l’architecture tropicale bas carbone et de la performance environnementale.',
        highlights: ['Certification EDGE', 'Bois massif', 'Gestion de l’eau'], gallery: ['assets/baie/fgis-siege.jpg', 'assets/baie/economie-01.jpg'] },
      { id: 'siege-fgis', name: 'Siège du FGIS', subtitle: 'Une référence architecturale', image: 'assets/baie/fgis-siege.jpg',
        description: 'Le nouveau siège du FGIS incarne la philosophie constructive du quartier : une architecture contemporaine, ancrée dans les matériaux locaux et ouverte sur son environnement.',
        vision: 'Donner au site un repère institutionnel fort et démontrer la qualité architecturale attendue pour l’ensemble des investissements.',
        highlights: ['Repère institutionnel', 'Matériaux locaux', 'Design bioclimatique'], gallery: ['assets/baie/c21-aerial-05.webp', 'assets/baie/c21-promenade-02.webp'] },
    ],
  },
  loisirs: {
    title: 'Loisirs & divertissement',
    cover: 'assets/baie/c21-site-01.webp',
    places: [
      { id: 'promenade-nord', name: 'Promenade Nord', subtitle: '1,2 km au rythme de l’océan', image: 'assets/baie/c21-promenade-01.webp',
        description: 'Un grand ruban piéton relie les expériences du front de mer et offre à Libreville un espace privilégié pour marcher, courir, respirer et se retrouver.',
        vision: 'Devenir la promenade emblématique de la capitale et la colonne vertébrale des activités de la Baie des Rois.',
        highlights: ['1,2 km', 'Mobilité douce', 'Front de mer'], gallery: ['assets/baie/c21-cover.webp', 'assets/baie/c21-aerial-03.webp'] },
      { id: 'aires-familles', name: 'Jardins des familles', subtitle: 'Jeux, fraîcheur & découvertes', image: 'assets/baie/c21-site-02.webp',
        description: 'Des aires de jeux sécurisées et des jardins généreux composent un territoire d’exploration pour les enfants et un lieu de détente pour toutes les générations.',
        vision: 'Faire du front de mer la sortie familiale de référence, inclusive, sûre et active toute l’année.',
        highlights: ['Aires de jeux', 'Jardins', 'Intergénérationnel'], gallery: ['assets/baie/c21-aerial-04.webp', 'assets/baie/c21-cover.webp'] },
      { id: 'sport-glisse', name: 'Parc sports & glisse', subtitle: 'Bouger face à l’océan', image: 'assets/baie/c21-site-01.webp',
        description: 'Vélo, jogging, fitness et glisse urbaine se rencontrent dans un paysage continu, pensé pour le mouvement et les nouvelles pratiques sportives.',
        vision: 'Créer un équipement urbain fédérateur et une scène sportive visible au cœur de Libreville.',
        highlights: ['Vélo', 'Skate-park', 'Fitness'], gallery: ['assets/baie/c21-aerial-01.webp', 'assets/baie/c21-aerial-04.webp'] },
      { id: 'marche-producteurs', name: 'Marché des Producteurs', subtitle: 'Le Gabon en circuit court', image: 'assets/baie/c21-event-01.webp',
        description: 'Producteurs, artisans et visiteurs se rencontrent autour des saveurs locales et de produits issus des territoires gabonais.',
        vision: 'Offrir une vitrine régulière aux filières locales et transformer le marché en rendez-vous signature de la destination.',
        highlights: ['Circuits courts', 'Produits locaux', 'Savoir-faire'], gallery: ['assets/baie/c21-building-01.webp', 'assets/baie/c21-cover.webp'] },
      { id: 'black-friday', name: 'Black Friday', subtitle: 'Shopping & animations sur la baie', image: 'assets/baie/c21-building-01.webp',
        description: 'Une journée événementielle mêle offres commerciales, musique et animations pour créer un temps fort populaire sur la promenade.',
        vision: 'Fédérer les enseignes autour d’un rendez-vous à forte fréquentation et amplifier le rayonnement commercial du quartier.',
        highlights: ['Shopping', 'Animations', 'Temps fort mensuel'], gallery: ['assets/baie/c21-cover.webp', 'assets/baie/c21-event-01.webp'] },
      { id: 'particulier-particulier', name: 'Particulier à Particulier', subtitle: 'Le rendez-vous automobile du samedi', image: 'assets/baie/economie-03.jpg',
        description: 'Un espace de rencontre dédié à l’achat, la vente et la découverte de véhicules d’occasion dans un cadre organisé et accessible.',
        vision: 'Structurer un marché visible, rassurant et capable d’attirer chaque semaine une communauté d’acheteurs et de passionnés.',
        highlights: ['Automobile', 'Chaque samedi', 'Mise en relation'], gallery: ['assets/baie/economie-02.jpg', 'assets/baie/c21-cover.webp'] },
      { id: 'marina', name: 'Marina Baie des Rois', subtitle: 'Libreville tournée vers le large', image: 'assets/baie/c21-aerial-02.webp',
        description: 'Une marina contemporaine accueille plaisance, services nautiques et expériences sur l’eau dans le prolongement naturel de la promenade.',
        vision: 'Ouvrir une nouvelle économie maritime, connecter la destination aux itinéraires nautiques et enrichir l’offre touristique de Libreville.',
        highlights: ['Plaisance', 'Activités nautiques', 'Économie bleue'], gallery: ['assets/baie/c21-aerial-03.webp', 'assets/baie/c21-cover.webp'] },
      { id: 'district-culturel', name: 'District culturel', subtitle: 'Une scène ouverte sur l’Afrique', image: 'assets/baie/c21-building-01.webp',
        description: 'Une scène à ciel ouvert, des espaces d’exposition et une programmation artistique installent la création au cœur du front de mer.',
        vision: 'Faire émerger une adresse culturelle majeure capable d’accueillir artistes gabonais, événements internationaux et nouveaux publics.',
        highlights: ['Scène à ciel ouvert', 'Expositions', 'Création gabonaise'], gallery: ['assets/baie/c21-event-01.webp', 'assets/baie/c21-cover.webp'] },
      { id: 'centre-commercial', name: 'Galerie de la Baie', subtitle: 'Shopping, création & services', image: 'assets/baie/c21-cover.webp',
        description: 'Une destination commerciale contemporaine réunit enseignes, créateurs, services et expériences dans un parcours connecté à la promenade.',
        vision: 'Composer un pôle de shopping différenciant, donnant une place centrale aux marques gabonaises et aux nouveaux usages.',
        highlights: ['Retail', 'Créateurs gabonais', 'Expérience urbaine'], gallery: ['assets/baie/c21-project-01.webp', 'assets/baie/c21-aerial-05.webp'] },
    ],
  },
};

// La Baie des Rois est le lieu parent. Les restaurants affichés ici sont les
// enseignes du site, et non des zones ou concepts immobiliers présentés comme
// s'il s'agissait d'établissements.
BAIE_PLACES.restaurants = {
  title: 'Restaurants, cafés & bars',
  cover: 'assets/baie/paul-cover.jpg',
  places: BAIE_TENANTS
    .filter(t => ['Restaurants', 'Bars & lounges'].includes(t.group))
    .map(t => ({
      id: t.id,
      name: t.name,
      subtitle: t.tagline || t.cat,
      image: t.img,
      imageFit: t.imgFit || 'cover',
      imagePosition: t.imgPosition || 'center',
      description: t.desc,
      highlights: (t.tags || []).slice(0, 4),
      gallery: (t.gallery || []).map(src => baieMedia(src, 900)),
    })),
};

// Le Hilton est le projet hôtelier confirmé sur le site. Les autres éléments
// (siège FGIS, architecture, pôle d'hospitalité) restent des composantes du
// projet urbain et ne doivent pas apparaître comme des hôtels réservables.
BAIE_PLACES.hotels.places = BAIE_PLACES.hotels.places.filter(place => place.id === 'hilton-baie');

function TourismeScreen() {
  const { back, navigate } = useNav();
  return (
    <Screen bg="#F7F7F2" statusDark={true} tabBar>
      <div data-screen-label="Tourisme — Découvrez le Gabon">
        <div style={{ position: 'relative', height: 263, overflow: 'hidden', borderRadius: '0 0 25px 25px' }}>
          <Img src="assets/tour-plage.jpg" style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 52%' }}
            overlay="linear-gradient(180deg, rgba(3,28,13,0.26) 0%, rgba(3,28,13,0.04) 32%, rgba(3,28,13,0.76) 100%)"/>
          <div style={{ position: 'absolute', top: APP_HEADER_TOP, left: 16, zIndex: 3 }}>
            <button onClick={back} aria-label="Retour" style={{ width: 40, height: 40, borderRadius: 999, border: '1px solid rgba(255,255,255,.25)', background: 'rgba(4,35,17,.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color="#fff" strokeWidth={2.2}/></button>
          </div>
          <div style={{ position: 'absolute', left: 18, right: 20, bottom: 20 }}>
            <h1 style={{ margin: 0, maxWidth: 250, fontFamily: FT, fontSize: 34, lineHeight: .96, fontWeight: 900, letterSpacing: -.9, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.42)' }}>Découvrez le<br/>Gabon</h1>
            <p style={{ margin: '10px 0 0', maxWidth: 235, fontFamily: FT, fontSize: 12.5, lineHeight: 1.45, fontWeight: 650, color: 'rgba(255,255,255,.94)', textShadow: '0 1px 5px rgba(0,0,0,.35)' }}>Explorez des centaines de lieux<br/>d’exception</p>
          </div>
        </div>

        <div style={{ padding: '20px 16px 0' }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: FT, fontSize: 20, fontWeight: 900, color: OK.ink }}>Explorer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
            {TOURISM_CATS.map(cat => (
              <button key={cat.id} onClick={() => navigate('tourisme-spots', { cat: cat.id })} style={{ position: 'relative', height: 109, borderRadius: 16, overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 12px rgba(17,55,30,.12)' }}>
                <Img src={cat.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(3,30,14,.04) 25%, rgba(3,30,14,.78) 100%)"/>
                <span style={{ position: 'absolute', left: 12, right: 10, bottom: 10, fontFamily: FT, fontSize: 13, lineHeight: 1.15, fontWeight: 850, color: '#fff', textShadow: '0 1px 5px rgba(0,0,0,.4)' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 22 }}/>
      </div>
    </Screen>
  );
}

function TourismeSpotsScreen({ params }) {
  const { back, navigate } = useNav();
  const category = params?.cat || 'all';
  const cat = TOURISM_CATS.find(item => item.id === category);
  const spots = category === 'all' ? TOURISM_SPOTS : TOURISM_SPOTS.filter(spot => spot.catId === category);
  return (
    <Screen bg="#F7F7F2" statusDark={true} tabBar>
      <div data-screen-label={`Tourisme — ${cat?.label || 'Toutes les destinations'}`}>
        <GreenHeader title={cat?.label || 'Destinations'} onBack={back}/>
        {cat && <div style={{ margin: '15px 16px 0', height: 150, position: 'relative', overflow: 'hidden', borderRadius: 19, boxShadow: '0 6px 18px rgba(17,55,30,.14)' }}><Img src={cat.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(4,34,17,.05) 20%, rgba(4,34,17,.72) 100%)"/><div style={{ position: 'absolute', left: 15, right: 15, bottom: 13, fontFamily: FT, fontSize: 20, fontWeight: 900, color: '#fff' }}>{cat.label}</div></div>}
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {spots.map(spot => (
            <button key={spot.id} onClick={() => navigate('tourisme-place', { id: spot.id })} style={{ width: '100%', padding: 0, border: `1px solid ${OK.line}`, borderRadius: 17, overflow: 'hidden', background: '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', minHeight: 112, boxShadow: '0 4px 13px rgba(17,55,30,.07)' }}>
              <div style={{ width: 118, flexShrink: 0, position: 'relative' }}><Img src={spot.img} style={{ position: 'absolute', inset: 0 }}/></div>
              <div style={{ flex: 1, minWidth: 0, padding: '13px 12px' }}><div style={{ fontFamily: FT, fontSize: 15, lineHeight: 1.18, fontWeight: 850, color: OK.ink }}>{spot.name}</div><div style={{ marginTop: 5, fontFamily: FT, fontSize: 10.5, fontWeight: 700, color: OK.green }}>{spot.cat}</div><div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4, fontFamily: FT, fontSize: 10, color: OK.ink3 }}><Icon name="pin" size={11} color={OK.ink3}/>{spot.city}</div></div>
              <div style={{ alignSelf: 'center', marginRight: 10 }}><Icon name="chev-r" size={16} color={OK.green} strokeWidth={2.3}/></div>
            </button>
          ))}
          {!spots.length && <EmptyState icon="pin" title="Bientôt disponible" body="De nouvelles adresses seront ajoutées à cette rubrique dans une prochaine version."/>}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

function TourismePlaceScreen({ params }) {
  const { back } = useNav();
  const spot = TOURISM_SPOTS.find(item => item.id === params?.id) || TOURISM_SPOTS[0];
  return (
    <Screen bg="#F7F7F2" statusDark={true} edgeTop>
      <div data-screen-label={`Destination — ${spot.name}`}>
        <div style={{ position: 'relative', height: 330 }}><Img src={spot.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(3,28,13,.48) 0%, rgba(3,28,13,.04) 35%, rgba(3,28,13,.86) 100%)"/><button onClick={back} aria-label="Retour" style={{ position: 'absolute', top: APP_EDGE_TOP, left: 16, width: 40, height: 40, borderRadius: 999, border: '1px solid rgba(255,255,255,.28)', background: 'rgba(4,35,17,.48)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color="#fff" strokeWidth={2.2}/></button><div style={{ position: 'absolute', left: 18, right: 18, bottom: 20 }}><div style={{ fontFamily: FT, fontSize: 10.5, fontWeight: 850, color: OK.gold, textTransform: 'uppercase', letterSpacing: 1.1 }}>{spot.cat}</div><h1 style={{ margin: '7px 0 0', fontFamily: FT, fontSize: 29, lineHeight: 1.05, fontWeight: 900, color: '#fff' }}>{spot.name}</h1><div style={{ marginTop: 9, display: 'flex', alignItems: 'center', gap: 6, fontFamily: FT, fontSize: 11.5, fontWeight: 650, color: 'rgba(255,255,255,.9)' }}><Icon name="pin" size={13} color={OK.gold}/>{spot.city}</div></div></div>
        <div style={{ padding: '18px 16px 32px' }}><div style={{ padding: 16, borderRadius: 18, background: '#fff', border: `1px solid ${OK.line}`, boxShadow: '0 5px 16px rgba(17,55,30,.06)' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontFamily: FT, fontSize: 16, color: OK.green }}>À découvrir</strong><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FT, fontSize: 11.5, fontWeight: 850, color: OK.ink }}><Icon name="star" size={13} color={OK.star}/>{spot.rating.toString().replace('.', ',')}</span></div><p style={{ margin: '11px 0 0', fontFamily: FT, fontSize: 13, lineHeight: 1.62, color: OK.ink2 }}>{spot.description}</p></div><button onClick={() => notifyDemo(`Itinéraire vers ${spot.name} préparé`)} style={{ width: '100%', height: 50, marginTop: 14, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FT, fontSize: 13.5, fontWeight: 850, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 7px 18px rgba(11,124,57,.22)' }}><Icon name="pin" size={17} color="#fff"/>Préparer l’itinéraire</button></div>
      </div>
    </Screen>
  );
}

function EventsScreen() {
  const { back, navigate } = useNav();
  // L’agenda public privilégie les événements disposant d’une affiche locale
  // fidèle. Cela évite les visuels génériques ou incohérents hors connexion.
  const allEvents = [...BAIE_EVENTS, EVENTS[0]];
  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Événements et sorties">
        <GreenHeader title="Événements et sorties" onBack={back}/>
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
          {allEvents.map(event => (
            <button key={event.id} onClick={() => navigate('event', { event })} style={{ width: '100%', height: 190, position: 'relative', overflow: 'hidden', borderRadius: 18, border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', boxShadow: '0 6px 18px rgba(14,48,27,.13)' }}>
              <Img src={event.img || event.poster} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 25%' }} overlay="linear-gradient(180deg, rgba(3,25,12,.08) 22%, rgba(3,25,12,.88) 100%)"/>
              <span style={{ position: 'absolute', top: 11, right: 11, padding: '5px 9px', borderRadius: 999, background: OK.gold, color: '#3a2c00', fontFamily: FT, fontSize: 9.5, fontWeight: 900 }}>ÉVÉNEMENT</span>
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 13 }}><div style={{ fontFamily: FT, fontSize: 18, lineHeight: 1.12, fontWeight: 900, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.4)' }}>{event.title}</div><div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 5, fontFamily: FT, fontSize: 10.5, fontWeight: 700, color: OK.gold }}><Icon name="calendar" size={12} color={OK.gold}/>{event.date}{event.time ? ` · ${event.time}` : ''}</div><div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 5, fontFamily: FT, fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,.9)' }}><Icon name="pin" size={12} color="#fff"/>{event.place}</div></div>
            </button>
          ))}
        </div>
        <div style={{ height: 32 }}/>
      </div>
    </Screen>
  );
}

function BaieScreen() {
  const { back, navigate } = useNav();
  const e = (typeof ANNU_ENTITIES !== 'undefined' && ANNU_ENTITIES['baie-des-rois']) || {};
  const tenants = e.tenants || [];
  const baieEvents = BAIE_EVENTS;
  const [baieEventSlide, setBaieEventSlide] = useState(0);
  const [headerSolid, setHeaderSolid] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setBaieEventSlide(index => (index + 1) % baieEvents.length), 4200);
    return () => clearInterval(timer);
  }, [baieEvents.length]);
  const featuredBaieEvent = baieEvents[baieEventSlide] || baieEvents[0];
  const explore = [
    { label: 'Restaurants & Bars', guide: 'restaurants', img: BAIE_PLACES.restaurants.cover },
    { label: 'Hôtels', guide: 'hotels', img: BAIE_PLACES.hotels.cover },
    { label: 'Loisirs et divertissement', guide: 'loisirs', img: BAIE_PLACES.loisirs.cover },
    { label: 'Smart City', smart: true },
  ];
  const groupImg = g => (tenants.find(t => t.group === g) || {}).img;
  const featured = ['bdr-ocean', 'sakura', 'theone', 'club-plage', 'lamaia'].map(id => tenants.find(t => t.id === id)).filter(Boolean);
  const feat = featured.length ? featured : tenants.slice(0, 5);
  const [spotSlide, setSpotSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSpotSlide(index => (index + 1) % Math.max(feat.length, 1)), 4600);
    return () => clearInterval(timer);
  }, [feat.length]);
  const featuredSpot = feat[spotSlide] || feat[0];
  return (
    <Screen bg={OK.bg} statusDark={true} noScroll edgeTop>
      <div data-screen-label="La Baie des Rois" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <DetailOverlayHeader solid={headerSolid} title="La Baie des Rois" onBack={back} onAction={() => notifyDemo('La Baie des Rois prête à être partagée')}/>
        <div data-screen-scroll="baie" onScroll={event => setHeaderSolid(event.currentTarget.scrollTop > 100)} style={{ position: 'absolute', inset: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: 24 }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 300 }}>
          <Img src={e.cover || 'assets/baie-cover.png'}
            style={{ position: 'absolute', inset: 0 }}
            overlay="linear-gradient(180deg, rgba(4,20,10,0.5) 0%, rgba(4,20,10,0.05) 30%, rgba(4,20,10,0.35) 58%, rgba(4,20,10,0.9) 100%)"/>
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
              <span style={{ width: 22, height: 2, background: OK.gold, borderRadius: 2 }}/>
              <span style={{ fontFamily: FT, fontWeight: 800, fontSize: 10.5, letterSpacing: 2.2, color: OK.gold, textTransform: 'uppercase' }}>Projet urbain · Bord de mer</span>
            </div>
            <h1 style={{ margin: 0, fontFamily: FT, fontWeight: 800, fontSize: 33, lineHeight: 1.03, color: '#fff', letterSpacing: -0.6, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              La Baie des Rois
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, fontFamily: FT, color: '#fff' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700 }}>
                <span style={{ width: 7, height: 7, borderRadius: 7, background: '#3BD37E' }}/> Ouvert
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>· {tenants.length} établissements</span>
            </div>
          </div>
        </div>

        {/* Explorer */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ fontFamily: FT, fontWeight: 800, fontSize: 20, color: OK.ink, letterSpacing: -0.3, marginBottom: 12 }}>Explorer</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {explore.map(c => c.smart ? (
              <button key={c.label} onClick={() => navigate('smartcity')} style={{
                position: 'relative', height: 108, borderRadius: 16, overflow: 'hidden', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                <Img src={bImg('1477959858617-67f85cf4f1df', 500)} style={{ position: 'absolute', inset: 0 }}
                  overlay="linear-gradient(180deg, rgba(6,42,24,0.32) 20%, rgba(6,42,24,0.8) 100%)"/>
                <span style={{ position: 'absolute', top: 10, left: 12, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 7, background: '#3BD37E', boxShadow: '0 0 8px #3BD37E' }}/>
                  <span style={{ fontFamily: FT, fontWeight: 800, fontSize: 8, letterSpacing: 1.4, color: '#fff' }}>LIVE</span>
                </span>
                <span style={{ position: 'absolute', left: 12, right: 12, bottom: 10, fontFamily: FT, fontWeight: 800, fontSize: 14, color: '#fff', lineHeight: 1.15, textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{c.label}</span>
              </button>
            ) : (
              <button key={c.label} onClick={() => navigate('baie-spots', { cat: c.guide })} style={{
                position: 'relative', height: 108, borderRadius: 16, overflow: 'hidden', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                <Img src={c.img || groupImg(c.group)} style={{ position: 'absolute', inset: 0 }}
                  overlay="linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.62) 100%)"/>
                <span style={{ position: 'absolute', left: 12, right: 12, bottom: 10, fontFamily: FT, fontWeight: 800, fontSize: 14, color: '#fff', lineHeight: 1.15, textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Événements */}
        <div style={{ padding: '10px 0 0' }}>
          <div style={{ padding: '0 16px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: FT, fontWeight: 800, fontSize: 18, color: OK.green }}>Événements</span>
            <button onClick={() => navigate('entity', { id: 'baie-des-rois' })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FT, fontWeight: 700, fontSize: 13, color: OK.green }}>Voir tout</button>
          </div>
          <div style={{ position: 'relative', padding: '12px 14px 10px' }}>
              <button data-auto-carousel="baie-events" className="okaba-auto-card" key={featuredBaieEvent.id} onClick={() => navigate('event', { event: { ...featuredBaieEvent, place: 'La Baie des Rois · Libreville' } })} style={{ width: '100%', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 16, overflow: 'hidden', position: 'relative', height: 200, textAlign: 'left', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', background: '#0b1a10', display: 'block', animation: 'okabaCarouselIn .28s ease-out' }}>
                <img src={featuredBaieEvent.poster} alt={featuredBaieEvent.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}/>
              </button>
              <div style={{ position: 'absolute', right: 27, bottom: 20, display: 'flex', gap: 5, zIndex: 4 }}>
                {baieEvents.map((event, index) => <button key={event.id} onClick={() => setBaieEventSlide(index)} aria-label={`Afficher ${event.title}`} style={{ width: index === baieEventSlide ? 16 : 6, height: 6, borderRadius: 999, padding: 0, border: 'none', cursor: 'pointer', background: index === baieEventSlide ? OK.gold : 'rgba(255,255,255,.7)', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'width .25s ease' }}/>) }
              </div>
          </div>
        </div>

        {/* Incontournables */}
        <div style={{ padding: '20px 0 0' }}>
          <div style={{ padding: '0 16px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: FT, fontWeight: 800, fontSize: 18, color: OK.green }}>Incontournables</span>
            <button onClick={() => navigate('entity', { id: 'baie-des-rois' })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FT, fontWeight: 700, fontSize: 13, color: OK.green }}>Voir tout</button>
          </div>
          <div style={{ position: 'relative', padding: '12px 14px 10px' }}>
            {featuredSpot && <button data-auto-carousel="baie-spots" className="okaba-auto-card" key={featuredSpot.id} onClick={() => navigate('tenant', { id: featuredSpot.id })} style={{ width: '100%', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 16, overflow: 'hidden', position: 'relative', height: 176, textAlign: 'left', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'block', animation: 'okabaCarouselIn .28s ease-out' }}>
                <Img src={featuredSpot.img} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 30%' }} overlay="linear-gradient(90deg, rgba(7,40,20,0.86) 0%, rgba(7,40,20,0.55) 45%, rgba(7,40,20,0.15) 100%)"/>
                <div style={{ position: 'absolute', top: 12, right: 12, background: OK.gold, color: '#3a2c00', padding: '5px 11px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11 }}>{featuredSpot.group}</div>
                <div style={{ position: 'absolute', left: 16, right: 14, bottom: 14 }}>
                  <div style={{ fontFamily: FT, fontWeight: 800, fontSize: 20, color: '#fff', lineHeight: 1.12, textShadow: '0 1px 6px rgba(0,0,0,0.4)', maxWidth: 240 }}>{featuredSpot.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 9 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FT, fontWeight: 700, fontSize: 11.5, color: '#fff' }}><Icon name="star" size={13} color={OK.gold}/>{featuredSpot.rating.toString().replace('.', ',')}</span>
                    <span style={{ fontFamily: FT, fontWeight: 600, fontSize: 11.5, color: 'rgba(255,255,255,0.9)' }}>{featuredSpot.cat}</span>
                  </div>
                </div>
              </button>}
            <div style={{ position: 'absolute', right: 27, bottom: 20, display: 'flex', gap: 5, zIndex: 4 }}>
              {feat.map((spot, index) => <button key={spot.id} onClick={() => setSpotSlide(index)} aria-label={`Afficher ${spot.name}`} style={{ width: index === spotSlide ? 16 : 6, height: 6, borderRadius: 999, padding: 0, border: 'none', cursor: 'pointer', background: index === spotSlide ? OK.gold : 'rgba(255,255,255,.7)', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'width .25s ease' }}/>) }
            </div>
          </div>
        </div>
        <div style={{ height: 40 }}/>
        </div>
      </div>
    </Screen>
  );
}

// Galeries de lieux et projets de la Baie des Rois
function BaieSpotsScreen({ params }) {
  const { back, navigate } = useNav();
  const categoryId = BAIE_PLACES[params?.cat] ? params.cat : 'restaurants';
  const category = BAIE_PLACES[categoryId];
  return (
    <Screen bg="#F7F7F2" statusDark={true} tabBar>
      <div data-screen-label={`Baie — ${category.title}`}>
        <GreenHeader title={category.title} onBack={back}/>

        <div style={{ padding: '18px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FT, fontSize: 12, fontWeight: 750, color: OK.ink3 }}>{category.places.length} lieux et projets à découvrir</div>
          <div style={{ width: 28, height: 2, borderRadius: 2, background: OK.gold }}/>
        </div>

        <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
          {category.places.map((place) => (
            <button key={place.id} onClick={() => navigate('baie-place', { cat: categoryId, id: place.id })} style={{
              width: '100%', border: `1px solid ${OK.line}`, borderRadius: 18, overflow: 'hidden', padding: 0,
              cursor: 'pointer', textAlign: 'left', background: '#fff', boxShadow: '0 6px 18px rgba(5,45,21,0.08)' }}>
              <div style={{ position: 'relative', width: '100%', height: 174, overflow: 'hidden', background: place.imageFit === 'contain' ? '#fff' : OK.bg2 }}>
                <Img src={place.image} alt={place.name} style={{ position: 'absolute', inset: 0, backgroundPosition: place.imagePosition || 'center', backgroundSize: place.imageFit }}/>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px 14px' }}>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: FT, fontSize: 17, lineHeight: 1.15, fontWeight: 800, color: OK.ink }}>{place.name}</span>
                  <span style={{ display: 'block', marginTop: 4, fontFamily: FT, fontSize: 11.5, lineHeight: 1.3, fontWeight: 650, color: OK.ink2 }}>{place.subtitle}</span>
                </span>
                <Icon name="chev-r" size={17} color={OK.green} strokeWidth={2.4}/>
              </span>
            </button>
          ))}
        </div>
        <div style={{ height: 38 }}/>
      </div>
    </Screen>
  );
}

const BAIE_RESTAURANT_DETAILS = {
  'promenade-gourmande': { rating: 4.7, reviews: 284, hours: 'Tous les jours · 11:00 – 00:00', cta: 'Réserver une table',
    menu: [{ t: 'À partager', items: [['Planche de la promenade', 'Sélection de bouchées locales', 8500], ['Assiette découverte', 'Trois saveurs au choix', 6500]] }, { t: 'Boissons', items: [['Cocktail signature', 'Fruits tropicaux', 4500], ['Jus frais', 'Selon arrivage', 2500]] }] },
  morellis: { rating: 4.8, reviews: 196, hours: 'Tous les jours · 10:00 – 22:30', cta: 'Commander',
    menu: [{ t: 'Gelato', items: [['Coupe 2 parfums', 'Sélection artisanale', 3500], ['Coupe 3 parfums', 'Sélection artisanale', 4500], ['Affogato', 'Gelato vanille et espresso', 4000]] }, { t: 'Salon de thé', items: [['Thé gourmand', 'Thé et mignardises', 5000], ['Café latte', '', 2500]] }] },
  'quartier-gastronomique': { rating: 4.6, reviews: 128, hours: 'Tous les jours · 12:00 – 23:30', cta: 'Choisir une table' },
  'terrasses-panoramiques': { rating: 4.9, reviews: 87, hours: 'Mar. – Dim. · 18:00 – 00:00', cta: 'Réserver une table' },
  'beach-bars': { rating: 4.7, reviews: 241, hours: 'Jeu. – Dim. · 16:00 – 02:00', cta: 'Réserver un espace' },
};

const BAIE_HOTEL_DETAILS = {
  'hilton-baie': { rating: 4.9, reviews: 124, cta: 'Réserver une chambre',
    rooms: [['Chambre Deluxe Océan', 'Lit king · 2 voyageurs · vue mer', 145000, 'assets/baie-2.png'], ['Suite Executive', 'Salon privé · accès lounge · vue panoramique', 235000, 'assets/baie-cover.png']],
    amenities: ['Piscine', 'Spa & bien-être', 'Restaurant', 'Business center', 'Wi-Fi', 'Transfert aéroport'] },
  'pole-hospitalite': { rating: 4.7, reviews: 73, cta: 'Voir les disponibilités' },
  'architecture-durable': { rating: 4.8, reviews: 52, cta: 'Planifier une visite' },
  'siege-fgis': { rating: 4.8, reviews: 41, cta: 'Demander une visite' },
};

const BAIE_LEISURE_DETAILS = {
  'promenade-nord': { date: 'Tous les jours', time: '06:00 – 23:00', cta: 'Réserver une activité', tickets: [['Accès promenade', 'Accès libre toute la journée', 0], ['Session découverte', 'Parcours guidé · 1 h 30', 5000]] },
  'aires-familles': { date: 'Mer. – Dim.', time: '09:00 – 19:00', cta: 'Réserver une place', tickets: [['Pass enfant', 'Accès aux jeux · 2 h', 3000], ['Pass famille', '2 adultes + 2 enfants', 8000]] },
  'sport-glisse': { date: 'Tous les jours', time: '07:00 – 21:00', cta: 'Réserver un créneau', tickets: [['Accès libre', 'Piste et espaces sportifs', 0], ['Initiation glisse', 'Matériel inclus · 1 h', 6000]] },
  'marche-producteurs': { date: 'Un samedi sur deux', time: '09:00 – 18:00', cta: 'Réserver un stand', tickets: [['Entrée visiteur', 'Accès au marché', 0], ['Stand producteur', 'Emplacement pour la journée', 15000]] },
  'black-friday': { date: 'Dernier vendredi du mois', time: '10:00 – 22:00', cta: 'Obtenir mon pass', tickets: [['Pass shopping', 'Accès aux offres et animations', 0], ['Pass privilège', 'File dédiée et avantages partenaires', 5000]] },
  'particulier-particulier': { date: 'Chaque samedi', time: '08:00 – 17:00', cta: 'Réserver un emplacement', tickets: [['Accès visiteur', 'Entrée libre', 0], ['Emplacement véhicule', 'Exposition pour la journée', 10000]] },
  marina: { date: 'Sur réservation', time: '09:00 – 18:00', cta: 'Réserver une sortie', tickets: [['Découverte de la baie', 'Sortie nautique · 45 min', 15000], ['Balade coucher de soleil', 'Sortie nautique · 1 h 30', 30000]] },
  'district-culturel': { date: 'Selon programmation', time: '18:00 – 23:00', cta: 'Acheter un billet', tickets: [['Entrée exposition', 'Accès aux espaces culturels', 5000], ['Concert plein air', 'Placement libre', 10000]] },
  'centre-commercial': { date: 'Tous les jours', time: '10:00 – 21:00', cta: 'Voir les événements', tickets: [['Accès galerie', 'Entrée libre', 0], ['Atelier créateur', 'Session de 90 minutes', 7500]] },
};

const BAIE_DEFAULT_MENU = [{ t: 'Sélection', items: [['Expérience signature', 'Une création inspirée par le front de mer', 12000], ['Menu découverte', 'Entrée, plat et dessert', 18000]] }, { t: 'Boissons', items: [['Cocktail de la Baie', '', 4500], ['Jus frais', '', 2500]] }];
const BAIE_DEFAULT_ROOMS = [['Chambre vue baie', 'Lit king · 2 voyageurs · petit-déjeuner', 125000, 'assets/baie-2.png'], ['Suite panoramique', 'Salon privé · vue océan', 195000, 'assets/baie-cover.png']];
const BAIE_DEFAULT_AMENITIES = ['Vue océan', 'Restaurant', 'Wi-Fi', 'Conciergerie', 'Espaces de réunion', 'Parking'];

function BaieServiceHero({ place, label, back }) {
  return (
    <div data-baie-service-hero style={{ position: 'relative', zIndex: 0, height: 292, flexShrink: 0, background: place.imageFit === 'contain' ? '#fff' : OK.bg2 }}>
      <Img src={place.image} alt={place.name} style={{ position: 'absolute', inset: 0, backgroundSize: place.imageFit || 'cover', backgroundPosition: place.imagePosition || 'center', backgroundColor: place.imageFit === 'contain' ? '#fff' : OK.bg2 }} overlay="linear-gradient(180deg, rgba(3,18,10,0.34) 0%, transparent 35%, rgba(3,18,10,0.74) 100%)"/>
      <div style={{ position: 'absolute', top: APP_EDGE_TOP, left: 15, right: 15, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={back} aria-label="Retour" style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/></button>
        <button onClick={() => notifyDemo(`${place.name} prêt à être partagé`)} aria-label="Partager" style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(4,25,12,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" size={17} color="#fff" strokeWidth={2}/></button>
      </div>
      <div style={{ position: 'absolute', left: 17, right: 17, bottom: 17 }}>
        <span style={{ display: 'inline-block', padding: '4px 9px', borderRadius: 999, background: OK.gold, color: '#3A2C00', fontFamily: FT, fontWeight: 850, fontSize: 9.5 }}>{label}</span>
        <h1 style={{ margin: '8px 0 0', fontFamily: FT, fontWeight: 850, fontSize: 27, lineHeight: 1.04, letterSpacing: -0.5, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>{place.name}</h1>
        <div style={{ marginTop: 5, fontFamily: FT, fontSize: 12, fontWeight: 650, color: 'rgba(255,255,255,0.9)' }}>{place.subtitle}</div>
      </div>
    </div>
  );
}

function BaieTabs({ tabs, active, onChange }) {
  return <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 17px 2px' }}>{tabs.map(([id, label]) => <button key={id} onClick={() => onChange(id)} style={{ flexShrink: 0, height: 34, padding: '0 15px', borderRadius: 999, cursor: 'pointer', border: active === id ? 'none' : `1px solid ${OK.line}`, background: active === id ? OK.green : '#fff', color: active === id ? '#fff' : OK.ink2, fontFamily: FT, fontSize: 12, fontWeight: 750 }}>{label}</button>)}</div>;
}

function BaiePhotos({ place }) {
  const photos = [...new Set([place.image, ...(place.gallery || [])].filter(Boolean))];
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 7 }}>{photos.map((src, i) => <Img key={src} src={src} alt={`${place.name} — photo ${i + 1}`} style={{ width: '100%', height: i === 0 ? 190 : 128, gridColumn: i === 0 ? '1 / -1' : 'auto', borderRadius: 12 }}/>)}</div>;
}

function BaieBottomAction({ label, place }) {
  return <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, padding: `11px 16px ${APP_DETAIL_BOTTOM_PADDING}`, background: '#fff', borderTop: `1px solid ${OK.line}`, boxShadow: '0 -6px 20px rgba(0,0,0,0.07)' }}><button onClick={() => notifyDemo(`${label} · ${place.name}`)} style={{ width: '100%', height: 51, border: 'none', borderRadius: 13, cursor: 'pointer', background: OK.green, color: '#fff', fontFamily: FT, fontWeight: 850, fontSize: 14.5, boxShadow: '0 8px 20px rgba(11,124,57,0.26)' }}>{label}</button></div>;
}

function BaieRestaurantScreen({ place }) {
  const { back } = useNav();
  const [tab, setTab] = useState('infos');
  const tenant = BAIE_TENANTS_MAP[place.id];
  const d = {
    rating: 4.7,
    reviews: 96,
    hours: 'Tous les jours · horaires sur place',
    cta: 'Réserver une table',
    ...(tenant || {}),
    ...(BAIE_RESTAURANT_DETAILS[place.id] || {}),
  };
  const menu = d.menu || BAIE_DEFAULT_MENU;
  const reviews = tenant?.reviewList || [['Mélissa A.', 5, 'Il y a 3 jours', 'Très beau cadre et service attentionné. La vue sur la baie fait vraiment la différence.'], ['Joël M.', 4, 'Il y a 1 semaine', 'Une belle adresse pour sortir à Libreville, avec une ambiance soignée.']];
  return <Screen bg={OK.bg} statusDark={false} footerPad={92} edgeTop footer={<BaieBottomAction label={d.cta} place={place}/>}><div data-screen-label={`Restaurant — ${place.name}`}>
    <BaieServiceHero place={place} label="Restaurant & bar" back={back}/>
    <div style={{ padding: '14px 17px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: FT, fontSize: 12.5, fontWeight: 750, color: OK.ink }}><Icon name="star" size={14} color={OK.star}/>{d.rating.toString().replace('.', ',')} <span style={{ color: OK.ink3, fontWeight: 600 }}>({d.reviews} avis)</span><span>·</span><span style={{ color: OK.green }}>{d.hours}</span></div>
      <p style={{ margin: '13px 0 0', fontFamily: FT, fontSize: 13.5, lineHeight: 1.62, color: OK.ink2 }}>{place.description}</p>
    </div>
    <BaieTabs tabs={[["infos", "Infos"], ["avis", "Avis"], ["menu", "Menu"], ["photos", "Photos"]]} active={tab} onChange={setTab}/>
    <div style={{ padding: '11px 17px 24px' }}>
      {tab === 'menu' && menu.map(sec => <section key={sec.t} style={{ marginBottom: 16 }}><h2 style={{ margin: '0 0 4px', fontFamily: FT, fontSize: 11.5, letterSpacing: .7, textTransform: 'uppercase', color: OK.green }}>{sec.t}</h2>{sec.items.map(([name, desc, price]) => <div key={name} style={{ display: 'flex', gap: 10, padding: '11px 0', borderBottom: `1px solid ${OK.line}` }}><div style={{ flex: 1 }}><div style={{ fontFamily: FT, fontSize: 13.5, fontWeight: 750, color: OK.ink }}>{name}</div>{desc && <div style={{ marginTop: 2, fontFamily: FT, fontSize: 11.5, lineHeight: 1.4, color: OK.ink3 }}>{desc}</div>}</div>{price > 0 && <div style={{ fontFamily: FT, fontSize: 13, fontWeight: 850, color: OK.green }}>{fcfa(price)}</div>}</div>)}</section>)}
      {tab === 'avis' && <div><div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 13 }}><strong style={{ fontFamily: FT, fontSize: 36, color: OK.ink }}>{d.rating.toString().replace('.', ',')}</strong><span style={{ fontFamily: FT, fontSize: 12, color: OK.ink3 }}>{d.reviews} avis</span></div>{reviews.map(([name, rating, time, text]) => <div key={name} style={{ marginBottom: 10, padding: 13, borderRadius: 13, background: '#fff', border: `1px solid ${OK.line}` }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontFamily: FT, fontSize: 12.5 }}>{name}</strong><span style={{ color: OK.star, fontSize: 12 }}>{'★'.repeat(rating)}</span></div><div style={{ marginTop: 2, fontFamily: FT, fontSize: 10.5, color: OK.ink3 }}>{time}</div><p style={{ margin: '7px 0 0', fontFamily: FT, fontSize: 12.5, lineHeight: 1.5, color: OK.ink2 }}>{text}</p></div>)}</div>}
      {tab === 'photos' && <BaiePhotos place={place}/>} 
      {tab === 'infos' && <div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{place.highlights.map(v => <span key={v} style={{ padding: '7px 10px', borderRadius: 999, background: '#fff', border: `1px solid ${OK.line}`, fontFamily: FT, fontSize: 11, fontWeight: 700, color: OK.green }}>{v}</span>)}</div><div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}`, fontFamily: FT, fontSize: 12.5, lineHeight: 1.6, color: OK.ink2 }}><b>Adresse</b><br/>Promenade Nord · La Baie des Rois, Libreville<br/><br/><b>Horaires</b><br/>{d.hours}</div></div>}
    </div>
  </div></Screen>;
}

function BaieHotelScreen({ place }) {
  const { back } = useNav();
  const [tab, setTab] = useState('chambres');
  const d = BAIE_HOTEL_DETAILS[place.id] || { rating: 4.7, reviews: 58, cta: 'Voir les disponibilités' };
  const rooms = d.rooms || BAIE_DEFAULT_ROOMS;
  const amenities = d.amenities || BAIE_DEFAULT_AMENITIES;
  return <Screen bg={OK.bg} statusDark={false} footerPad={92} edgeTop footer={<BaieBottomAction label={d.cta} place={place}/>}><div data-screen-label={`Hôtel — ${place.name}`}>
    <BaieServiceHero place={place} label="Hôtel" back={back}/>
    <div style={{ padding: '14px 17px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: FT, fontSize: 12.5, fontWeight: 750 }}><Icon name="star" size={14} color={OK.star}/>{d.rating.toString().replace('.', ',')} <span style={{ color: OK.ink3, fontWeight: 600 }}>({d.reviews} avis)</span><span>·</span><span style={{ color: OK.green }}>Bord de mer</span></div>
      <p style={{ margin: '13px 0 0', fontFamily: FT, fontSize: 13.5, lineHeight: 1.62, color: OK.ink2 }}>{place.description}</p>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><button onClick={() => notifyDemo('Dates du séjour')} style={{ height: 48, borderRadius: 12, border: `1px solid ${OK.line}`, background: '#fff', textAlign: 'left', padding: '0 12px', fontFamily: FT, cursor: 'pointer' }}><small style={{ color: OK.ink3 }}>Dates</small><br/><b style={{ fontSize: 11.5 }}>25 – 27 juil.</b></button><button onClick={() => notifyDemo('Voyageurs')} style={{ height: 48, borderRadius: 12, border: `1px solid ${OK.line}`, background: '#fff', textAlign: 'left', padding: '0 12px', fontFamily: FT, cursor: 'pointer' }}><small style={{ color: OK.ink3 }}>Voyageurs</small><br/><b style={{ fontSize: 11.5 }}>2 adultes</b></button></div>
    </div>
    <BaieTabs tabs={[["chambres", "Chambres"], ["equipements", "Équipements"], ["photos", "Photos"], ["infos", "Infos"]]} active={tab} onChange={setTab}/>
    <div style={{ padding: '11px 17px 24px' }}>
      {tab === 'chambres' && <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>{rooms.map(([name, desc, price, image]) => <div key={name} style={{ display: 'flex', minHeight: 116, overflow: 'hidden', borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}` }}><Img src={image} style={{ width: 112, flexShrink: 0 }}/><div style={{ padding: 11, flex: 1 }}><div style={{ fontFamily: FT, fontSize: 13.5, fontWeight: 800, color: OK.ink }}>{name}</div><div style={{ marginTop: 4, fontFamily: FT, fontSize: 10.5, lineHeight: 1.4, color: OK.ink3 }}>{desc}</div><div style={{ marginTop: 10, fontFamily: FT, fontSize: 13, fontWeight: 850, color: OK.green }}>{fcfa(price)} <small style={{ fontWeight: 600, color: OK.ink3 }}>/ nuit</small></div></div></div>)}</div>}
      {tab === 'equipements' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>{amenities.map((item, i) => <div key={item} style={{ minHeight: 72, padding: 12, borderRadius: 13, background: '#fff', border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', gap: 9 }}><Icon name={['weather','sante','restaurant','briefcase','telecom','car'][i % 6]} size={18} color={OK.green}/><span style={{ fontFamily: FT, fontSize: 11.5, fontWeight: 750, color: OK.ink }}>{item}</span></div>)}</div>}
      {tab === 'photos' && <BaiePhotos place={place}/>} 
      {tab === 'infos' && <div style={{ padding: 15, borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}` }}><h2 style={{ margin: 0, fontFamily: FT, fontSize: 15, color: OK.green }}>À propos de l’hôtel</h2><p style={{ margin: '9px 0 0', fontFamily: FT, fontSize: 12.5, lineHeight: 1.6, color: OK.ink2 }}>{place.description}</p><p style={{ margin: '12px 0 0', fontFamily: FT, fontSize: 12.5, lineHeight: 1.6, color: OK.ink2 }}><b>Adresse</b><br/>Zone Nord · La Baie des Rois, Libreville</p></div>}
    </div>
  </div></Screen>;
}

function BaieLeisureScreen({ place }) {
  const { back } = useNav();
  const [tab, setTab] = useState('billets');
  const d = BAIE_LEISURE_DETAILS[place.id] || { date: 'Selon programmation', time: '10:00 – 20:00', cta: 'Réserver une place', tickets: [['Accès standard', 'Une personne', 5000]] };
  return <Screen bg={OK.bg} statusDark={false} footerPad={92} edgeTop footer={<BaieBottomAction label={d.cta} place={place}/>}><div data-screen-label={`Loisirs — ${place.name}`}>
    <BaieServiceHero place={place} label="Loisirs & événements" back={back}/>
    <div style={{ padding: '14px 17px 0' }}>
      <p style={{ margin: 0, fontFamily: FT, fontSize: 13.5, lineHeight: 1.62, color: OK.ink2 }}>{place.description}</p>
      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}><div style={{ flex: 1, padding: 11, borderRadius: 12, background: '#fff', border: `1px solid ${OK.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="calendar" size={15} color={OK.green}/><span style={{ fontFamily: FT, fontSize: 10, fontWeight: 800, color: OK.ink3 }}>DATE</span></div><div style={{ marginTop: 5, fontFamily: FT, fontSize: 11.5, fontWeight: 750 }}>{d.date}</div></div><div style={{ flex: 1, padding: 11, borderRadius: 12, background: '#fff', border: `1px solid ${OK.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={15} color={OK.green}/><span style={{ fontFamily: FT, fontSize: 10, fontWeight: 800, color: OK.ink3 }}>HORAIRE</span></div><div style={{ marginTop: 5, fontFamily: FT, fontSize: 11.5, fontWeight: 750 }}>{d.time}</div></div></div>
    </div>
    <BaieTabs tabs={[["billets", "Billets & tarifs"], ["programme", "Programme"], ["photos", "Photos"], ["infos", "Infos"]]} active={tab} onChange={setTab}/>
    <div style={{ padding: '11px 17px 24px' }}>
      {tab === 'billets' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{d.tickets.map(([name, desc, price]) => <button key={name} onClick={() => notifyDemo(`${name} sélectionné`)} style={{ padding: 14, borderRadius: 14, border: `1px solid ${OK.line}`, background: '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 10, alignItems: 'center' }}><div style={{ flex: 1 }}><div style={{ fontFamily: FT, fontSize: 13.5, fontWeight: 800, color: OK.ink }}>{name}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 11, color: OK.ink3 }}>{desc}</div></div><div style={{ fontFamily: FT, fontSize: 13, fontWeight: 850, color: OK.green }}>{price ? fcfa(price) : 'Gratuit'}</div><Icon name="chev-r" size={15} color={OK.green}/></button>)}</div>}
      {tab === 'programme' && <div style={{ paddingLeft: 8 }}>{[['Accueil des participants', d.time.split(' – ')[0]], ['Expérience principale', 'Selon le créneau choisi'], ['Temps libre sur la promenade', 'Après l’activité']].map(([name, time], i) => <div key={name} style={{ display: 'flex', gap: 12, paddingBottom: 18 }}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 10, background: i === 0 ? OK.gold : OK.green }}/>{i < 2 && <span style={{ width: 2, flex: 1, marginTop: 4, background: OK.line }}/>}</div><div><div style={{ fontFamily: FT, fontSize: 13, fontWeight: 800 }}>{name}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 11.5, color: OK.ink3 }}>{time}</div></div></div>)}</div>}
      {tab === 'photos' && <BaiePhotos place={place}/>} 
      {tab === 'infos' && <div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{place.highlights.map(v => <span key={v} style={{ padding: '7px 10px', borderRadius: 999, background: '#fff', border: `1px solid ${OK.line}`, fontFamily: FT, fontSize: 11, fontWeight: 700, color: OK.green }}>{v}</span>)}</div><div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}`, fontFamily: FT, fontSize: 12.5, lineHeight: 1.6, color: OK.ink2 }}><b>Lieu</b><br/>La Baie des Rois · Promenade Nord, Libreville<br/><br/><b>Accès</b><br/>Présentez votre réservation ou billet depuis O’KABA.</div></div>}
    </div>
  </div></Screen>;
}

function BaiePlaceScreen({ params }) {
  const categoryId = BAIE_PLACES[params?.cat] ? params.cat : 'restaurants';
  const category = BAIE_PLACES[categoryId];
  const place = category.places.find(item => item.id === params?.id) || category.places[0];
  if (categoryId === 'hotels') return <BaieHotelScreen place={place}/>;
  if (categoryId === 'loisirs') return <BaieLeisureScreen place={place}/>;
  return <BaieRestaurantScreen place={place}/>;
}

// ── SMART CITY — services connectés de la ville (style natif O'KABA) ──
function EventImmersiveScreen({ params }) {
  const { back, navigate } = useNav();
  const event = params?.event || EVENTS[0];
  const image = event.poster || event.img || 'assets/event-femoga.jpg';
  const media = [...new Set([image, ...(event.gallery || event.photos || [])].filter(Boolean))];
  const [mediaIndex, setMediaIndex] = useState(0);
  const currentImage = media[mediaIndex] || image;
  const knownEvent = [...BAIE_EVENTS, ...EVENTS].find(item => item.id === event.id || item.title === event.title);
  const offlineImage = event.fallbackImage || knownEvent?.poster || knownEvent?.img || 'assets/event-femoga.jpg';
  const displayImage = /^https?:\/\//i.test(currentImage) ? offlineImage : currentImage;
  const showPrevious = () => setMediaIndex(index => (index - 1 + media.length) % media.length);
  const showNext = () => setMediaIndex(index => (index + 1) % media.length);
  return <Screen bg="#041109" statusDark={true} noScroll edgeTop>
    <div data-screen-label={`Événement — ${event.title}`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#050505', color: '#fff' }}>
      <img src={displayImage} alt={`Affiche — ${event.title}`} onClick={media.length > 1 ? showNext : undefined} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = offlineImage; }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', cursor: media.length > 1 ? 'pointer' : 'default' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 58%, rgba(0,0,0,.78) 100%)' }}/>

      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, height: `calc(58px + ${APP_SAFE_TOP})`, padding: `calc(${APP_SAFE_TOP} + 6px) 12px 8px`, display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center' }}>
        <button onClick={back} aria-label="Fermer" style={{ width: 44, height: 44, padding: 0, border: 'none', borderRadius: 999, background: 'rgba(0,0,0,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="close" size={25} color="#fff" strokeWidth={2}/></button>
        {media.length > 1 && <strong data-event-counter style={{ justifySelf: 'center', fontFamily: FT, fontSize: 14, lineHeight: 1, fontWeight: 850, color: '#fff' }}>{mediaIndex + 1} sur {media.length}</strong>}
      </header>

      {media.length > 1 && <>
        <button onClick={showPrevious} aria-label="Affiche précédente" style={{ position: 'absolute', left: 7, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 38, height: 48, padding: 0, border: 'none', borderRadius: 999, background: 'rgba(0,0,0,.26)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="chev-l" size={23} color="#fff" strokeWidth={2.2}/></button>
        <button onClick={showNext} aria-label="Affiche suivante" style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 38, height: 48, padding: 0, border: 'none', borderRadius: 999, background: 'rgba(0,0,0,.26)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="chev-r" size={23} color="#fff" strokeWidth={2.2}/></button>
      </>}

      <footer data-event-footer style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 10, padding: `16px 16px calc(16px + env(safe-area-inset-bottom))` }}>
        <button onClick={() => navigate('event-ticket', { event })} style={{ width: '100%', height: 54, borderRadius: 16, border: 'none', background: `linear-gradient(135deg, ${OK.green} 0%, ${OK.greenDeep} 100%)`, color: '#fff', fontFamily: FX, fontSize: 15, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, cursor: 'pointer', boxShadow: '0 10px 26px rgba(0,0,0,.4)' }}><Icon name="ticket" size={19} color="#fff" strokeWidth={2}/>Réserver</button>
      </footer>
    </div>
  </Screen>;
}

function EventTicketScreen({ params }) {
  const { back, navigate } = useNav();
  const event = params?.event || EVENTS[0];
  const date = event.date || event.when || 'Date à venir';
  const place = event.place || event.venue || 'Libreville';
  const isFree = /libre|gratuit/i.test(event.price || '');
  const tiers = isFree ? [['standard', 'Entrée', 0]] : [['standard', 'Standard', 3000], ['vip', 'VIP', 8000]];
  const [tier, setTier] = useState(tiers[0][0]);
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('airtel');
  const [bookingCode] = useState(() => `OKT-${Date.now().toString().slice(-6)}`);
  const selectedTier = tiers.find(([id]) => id === tier) || tiers[0];
  const total = selectedTier[2] * qty;

  // Lien vers la page web des billets (téléchargeable en PDF) + QR code.
  // location.origin → fonctionne une fois l'app déployée (et en dev via l'URL réseau).
  const ticketUrl = `${window.location.origin}/billet.html?` + [
    ['event', event.title], ['date', `${date}${event.time ? ` · ${event.time}` : ''}`],
    ['place', place], ['tier', selectedTier[1]], ['qty', qty],
    ['code', bookingCode], ['total', total === 0 ? 'Gratuit' : fcfa(total)],
  ].map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  const [qrUrl, setQrUrl] = useState('');
  useEffect(() => {
    if (step !== 3) return;
    QRCode.toDataURL(ticketUrl, { margin: 1, width: 360, color: { dark: '#0A6A2F', light: '#ffffff' } })
      .then(setQrUrl).catch(() => {});
  }, [step, ticketUrl]);

  const payments = [
    { id: 'airtel', label: 'Airtel Money', color: '#E32636', logo: 'assets/payments/airtel.svg' },
    { id: 'moov', label: 'Moov Money', color: '#F36B21', logo: 'assets/payments/moov-money.png' },
    { id: 'card', label: 'Carte bancaire', color: '#2866B1', logos: ['assets/payments/visa.svg', 'assets/payments/mastercard.svg'] },
  ];
  const goToRecap = () => setStep(total === 0 ? 3 : 2);
  const confirm = () => setStep(3);
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Billetterie événement">
        <GreenHeader title={step === 3 ? 'Billet confirmé' : 'Réserver un billet'} onBack={back}/>
        {step < 3 && <div style={{ display: 'flex', gap: 6, padding: '14px 18px 0' }}>{[1, 2].map(item => <span key={item} style={{ flex: 1, height: 4, borderRadius: 999, background: item <= step ? OK.gold : '#D8E2DB', transition: 'background .2s ease' }}/>)}</div>}

        {step === 1 && <div style={{ padding: '14px 16px 32px' }}>
          <div style={{ padding: 14, borderRadius: 17, background: '#fff', border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(11,124,57,.1)', color: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="ticket" size={22} color={OK.green} strokeWidth={2}/></div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: FX, fontSize: 14, fontWeight: 850, color: OK.ink }}>{event.title}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 10.5, fontWeight: 650, color: OK.ink3 }}>{date}{event.time ? ` · ${event.time}` : ''} · {place}</div></div>
          </div>

          <div style={{ marginTop: 18, fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Catégorie de billet</div>
          <div style={{ display: 'grid', gridTemplateColumns: tiers.length > 1 ? '1fr 1fr' : '1fr', gap: 8, marginTop: 9 }}>
            {tiers.map(([id, label, price]) => <button key={id} onClick={() => setTier(id)} style={{ minHeight: 62, padding: '10px 12px', borderRadius: 14, border: tier === id ? `1.5px solid ${OK.green}` : `1px solid ${OK.line}`, background: tier === id ? 'rgba(11,124,57,.08)' : '#fff', cursor: 'pointer', textAlign: 'left' }}><div style={{ fontFamily: FX, fontSize: 12.5, fontWeight: 850, color: OK.ink }}>{label}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 10.5, fontWeight: 750, color: tier === id ? OK.green : OK.ink3 }}>{price ? fcfa(price) : 'Gratuit'}</div></button>)}
          </div>

          <div style={{ marginTop: 18, fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Nombre de billets</div>
          <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 14, border: `1px solid ${OK.line}`, background: '#fff' }}>
            <button onClick={() => setQty(value => Math.max(1, value - 1))} aria-label="Réduire" style={{ width: 38, height: 38, borderRadius: 999, border: `1px solid ${OK.line}`, background: OK.bg2, color: OK.green, fontFamily: FX, fontSize: 18, fontWeight: 900, cursor: 'pointer' }}>−</button>
            <strong style={{ fontFamily: FX, fontSize: 17, color: OK.ink }}>{qty}</strong>
            <button onClick={() => setQty(value => Math.min(8, value + 1))} aria-label="Ajouter" style={{ width: 38, height: 38, borderRadius: 999, border: `1px solid ${OK.line}`, background: OK.bg2, color: OK.green, fontFamily: FX, fontSize: 18, fontWeight: 900, cursor: 'pointer' }}>+</button>
          </div>

          <button onClick={goToRecap} style={{ width: '100%', height: 50, marginTop: 21, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', fontFamily: FX, fontSize: 13, fontWeight: 850, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>Continuer<Icon name="chev-r" size={16} color="#fff" strokeWidth={2.2}/></button>
        </div>}

        {step === 2 && <div style={{ padding: '14px 16px 32px' }}>
          <div style={{ padding: 15, borderRadius: 18, background: '#fff', border: `1px solid ${OK.line}` }}>
            <div style={{ fontFamily: FX, fontSize: 14, fontWeight: 850, color: OK.ink }}>Récapitulatif</div>
            {[
              ['Événement', event.title], ['Date', `${date}${event.time ? ` · ${event.time}` : ''}`],
              ['Catégorie', selectedTier[1]], ['Billets', String(qty)],
            ].map(([label, value], index) => <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderTop: index ? `1px solid ${OK.line}` : 'none', fontFamily: FT, fontSize: 11.5 }}><span style={{ color: OK.ink3 }}>{label}</span><strong style={{ color: OK.ink, textAlign: 'right' }}>{value}</strong></div>)}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 13, borderTop: `1px solid ${OK.line}` }}><span style={{ fontFamily: FX, fontSize: 13, fontWeight: 850, color: OK.ink }}>Total</span><strong style={{ fontFamily: FX, fontSize: 21, fontWeight: 900, color: OK.green }}>{fcfa(total)}</strong></div>
          </div>

          <div style={{ marginTop: 18, fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Moyen de paiement</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 9 }}>
            {payments.map(method => <button key={method.id} onClick={() => setPayment(method.id)} style={{ minHeight: 64, padding: '0 13px', borderRadius: 14, border: payment === method.id ? `1.5px solid ${method.color}` : `1px solid ${OK.line}`, background: payment === method.id ? `${method.color}10` : '#fff', display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer', textAlign: 'left' }}><span style={{ width: 58, height: 40, flexShrink: 0, padding: method.id === 'moov' ? 0 : 6, borderRadius: 10, overflow: 'hidden', background: method.id === 'moov' ? '#F36B21' : '#fff', border: '1px solid rgba(18,48,31,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, boxSizing: 'border-box' }}>{method.logo ? <img src={method.logo} alt={method.label} style={{ width: method.id === 'airtel' ? 35 : '100%', height: method.id === 'airtel' ? 35 : '100%', objectFit: 'contain', display: 'block' }}/> : method.logos.map((logo, index) => <img key={logo} src={logo} alt={index === 0 ? 'Visa' : 'Mastercard'} style={{ width: index === 0 ? 27 : 24, maxHeight: 24, objectFit: 'contain', display: 'block' }}/>)}</span><span style={{ flex: 1, fontFamily: FX, fontSize: 12.5, fontWeight: 800, color: OK.ink }}>{method.label}</span><span style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${payment === method.id ? method.color : '#BAC7BF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{payment === method.id && <span style={{ width: 8, height: 8, borderRadius: 999, background: method.color }}/>}</span></button>)}
          </div>

          <button onClick={confirm} style={{ width: '100%', height: 50, marginTop: 21, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', fontFamily: FX, fontSize: 13, fontWeight: 850, cursor: 'pointer' }}>Confirmer · {fcfa(total)}</button>
          <button onClick={() => setStep(1)} style={{ width: '100%', height: 42, marginTop: 7, border: 'none', background: 'transparent', color: OK.green, fontFamily: FT, fontSize: 11.5, fontWeight: 800, cursor: 'pointer' }}>Modifier la réservation</button>
        </div>}

        {step === 3 && <div style={{ padding: '24px 18px 34px', textAlign: 'center' }}>
          <div style={{ width: 76, height: 76, margin: '0 auto', borderRadius: 999, background: 'rgba(11,124,57,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(11,124,57,.05)' }}><Icon name="verified" size={38} color={OK.green} strokeWidth={2}/></div>
          <h1 style={{ margin: '20px 0 0', fontFamily: FX, fontSize: 23, fontWeight: 900, color: OK.ink }}>Votre billet est confirmé</h1>
          <p style={{ margin: '8px auto 0', maxWidth: 285, fontFamily: FT, fontSize: 12.5, lineHeight: 1.55, color: OK.ink3 }}>Présentez le code ci-dessous à l’entrée de « {event.title} ».</p>
          <div style={{ marginTop: 20, padding: '21px 15px', borderRadius: 20, background: '#fff', border: `1px solid ${OK.line}`, boxShadow: '0 8px 24px rgba(18,51,31,.08)' }}>
            {/* QR code — scannez pour ouvrir vos billets (PDF) dans le navigateur */}
            <div style={{ width: 168, height: 168, margin: '0 auto', padding: 10, borderRadius: 16, background: '#fff', border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {qrUrl
                ? <img src={qrUrl} alt="QR code des billets" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                : <Icon name="qr" size={64} color={OK.ink3} strokeWidth={1.6}/>}
            </div>
            <div style={{ marginTop: 12, fontFamily: FT, fontSize: 11.5, fontWeight: 700, color: OK.ink2, lineHeight: 1.5 }}>
              Scannez ce QR code pour ouvrir vos billets et les télécharger en PDF.
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${OK.line}` }}>
              <div style={{ fontFamily: FT, fontSize: 10, fontWeight: 750, letterSpacing: .7, color: OK.ink3 }}>CODE D’ACCÈS</div>
              <div style={{ marginTop: 5, fontFamily: FX, fontSize: 25, fontWeight: 900, letterSpacing: 2, color: OK.green }}>{bookingCode}</div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${OK.line}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}><div><div style={{ fontFamily: FT, fontSize: 9.5, color: OK.ink3 }}>Catégorie</div><strong style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink }}>{selectedTier[1]}</strong></div><div><div style={{ fontFamily: FT, fontSize: 9.5, color: OK.ink3 }}>Billets</div><strong style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink }}>{qty}</strong></div></div>
          </div>
          <button onClick={() => window.open(ticketUrl, '_blank')} style={{ width: '100%', height: 50, marginTop: 16, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', fontFamily: FX, fontSize: 13, fontWeight: 850, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg> Ouvrir mes billets (PDF)
          </button>
          <button onClick={() => navigate('events')} style={{ width: '100%', height: 46, marginTop: 8, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, fontFamily: FX, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Retour aux événements</button>
        </div>}
      </div>
    </Screen>
  );
}

const BAIE_NEWS = [
  {
    id: 'fmct-financement-2026',
    category: 'ACTUALITÉ',
    source: 'Direct Infos Gabon',
    date: '8 juin 2026',
    title: 'Baie des Rois : la FMCT devant la COSUMAF pour lever de nouveaux fonds',
    excerpt: 'La société porteuse du projet a déposé un dossier de financement dont la conformité doit être examinée par le régulateur régional.',
    image: 'assets/baie/economie-01.jpg',
    url: 'https://directinfosgabon.com/baie-des-rois-la-fmct-devant-la-cosumaf-le-29-juin-pour-lever-de-nouveaux-fonds/',
    body: [
      'La Façade Maritime du Champ Triomphal a engagé une nouvelle étape de financement pour poursuivre le développement de la Baie des Rois. Le dossier doit être étudié par la COSUMAF avant toute collecte auprès des investisseurs.',
      'Cette opération doit accompagner les prochaines phases du projet urbain : équipements, espaces publics, activités économiques et poursuite de l’aménagement du front de mer de Libreville.',
      'Cette fiche est une synthèse O’KABA. L’article complet et ses précisions sont disponibles sur le site de Direct Infos Gabon.',
    ],
  },
  {
    id: 'hilton-libreville-2025',
    category: 'TOURISME',
    source: 'Business & Finance International',
    date: '24 novembre 2025',
    title: 'Le groupe Hilton débarque à Libreville au Gabon',
    excerpt: 'La Baie des Rois accueillera un établissement Hilton, une première pour l’enseigne américaine au Gabon.',
    image: 'assets/baie/c21-building-01.webp',
    url: 'https://businessfinanceint.com/le-groupe-hilton-debarque-a-libreville-au-gabon/',
    body: [
      'Un hôtel Hilton est annoncé sur le site de la Baie des Rois à Libreville. L’arrivée de cette enseigne internationale renforce la dimension touristique et d’affaires du nouveau quartier.',
      'Le futur établissement doit compléter l’offre d’hospitalité du front de mer et accompagner le développement des activités commerciales, événementielles et de loisirs prévues dans la zone.',
      'Cette fiche est une synthèse O’KABA. Consultez Business & Finance International pour lire la publication originale.',
    ],
  },
  {
    id: 'emplois-chantier-2025',
    category: 'POLITIQUE',
    source: 'GabonReview',
    date: '11 mars 2025',
    title: 'La Baie des Rois pourrait générer 15 000 à 20 000 emplois',
    excerpt: 'Lors d’une visite du chantier, les autorités ont présenté les ambitions économiques, urbaines et écologiques du projet.',
    image: 'assets/baie/fmct-chantier-01.jpg',
    url: 'https://www.gabonreview.com/gabon-oligui-nguema-sur-le-chantier-de-la-baie-des-rois-devant-generer-15-a-20-000-emplois/',
    body: [
      'Le chantier de la Baie des Rois a reçu une visite officielle consacrée à son avancement et à ses retombées attendues. Le projet est présenté comme un nouveau pôle urbain mêlant logements, commerces, culture et espaces écologiques.',
      'Selon les projections relayées lors de cette visite, les différentes phases de construction et d’exploitation pourraient générer entre 15 000 et 20 000 emplois directs et indirects.',
      'Cette fiche est une synthèse O’KABA. Retrouvez les déclarations et le reportage complet sur GabonReview.',
    ],
  },
  {
    id: 'zis-attractivite-2024',
    category: 'ÉCONOMIE',
    source: 'Inside News 241',
    date: '26 juin 2024',
    title: 'La Baie des Rois, nouveau pôle d’attractivité économique au cœur de Libreville',
    excerpt: 'Le statut de Zone d’investissement spéciale marque une nouvelle étape pour l’attractivité du projet et l’accueil des investisseurs.',
    image: 'assets/baie/economie-02.jpg',
    url: 'https://insidenews241.com/la-baie-des-rois-nouveau-pole-dattractivite-economique-au-coeur-de-libreville/',
    body: [
      'La Baie des Rois a obtenu le statut de Zone d’investissement spéciale. Cette évolution vise à créer un cadre plus attractif pour les entreprises et les investisseurs appelés à s’installer dans le nouveau quartier.',
      'Le projet ambitionne de réunir des activités économiques, des services, des espaces de vie et une promenade maritime au centre de Libreville.',
      'Cette fiche est une synthèse O’KABA. L’analyse complète est à retrouver sur Inside News 241.',
    ],
  },
  {
    id: 'fgis-siege-2024',
    category: 'ÉCONOMIE',
    source: 'GabonReview',
    date: '6 juin 2024',
    title: 'Le FGIS s’installe dans son nouveau siège éco-responsable à la Baie des Rois',
    excerpt: 'Le bâtiment privilégie des matériaux bas carbone et du bois produit localement pour réduire son empreinte environnementale.',
    image: 'assets/baie/fgis-siege.jpg',
    url: 'https://www.gabonreview.com/le-fgis-sinstalle-dans-son-nouveau-siege-social-en-materiaux-eco-responsable-a-la-baie-des-rois/',
    body: [
      'Le Fonds gabonais d’investissements stratégiques a installé son siège social à la Baie des Rois. Le bâtiment traduit les engagements environnementaux annoncés pour l’ensemble du projet urbain.',
      'Sa conception met en avant l’efficacité énergétique, des matériaux éco-responsables et bas carbone ainsi que l’utilisation de bois produit au Gabon.',
      'Cette fiche est une synthèse O’KABA. Le détail du projet architectural est disponible dans l’article original de GabonReview.',
    ],
  },
];

const BAIE_NEWS_FAV_KEY = 'okaba-baie-news-favorites';

function useBaieNewsFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = window.localStorage.getItem(BAIE_NEWS_FAV_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try { window.localStorage.setItem(BAIE_NEWS_FAV_KEY, JSON.stringify(favorites)); } catch {}
  }, [favorites]);
  const toggleFavorite = useCallback((id) => {
    setFavorites(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]);
  }, []);
  return { favorites, toggleFavorite };
}

function BaieNewsBookmark({ active, onClick, dark = false, size = 38 }) {
  return <button onClick={(event) => { event.stopPropagation(); onClick(); }} aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'} style={{ width: size, height: size, borderRadius: 999, border: dark ? '1px solid rgba(255,255,255,0.28)' : `1px solid ${OK.line}`, background: dark ? 'rgba(5,35,18,0.58)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Icon name={active ? 'bookmark-f' : 'bookmark'} size={17} color={active ? OK.gold : (dark ? '#fff' : OK.green)} strokeWidth={2}/></button>;
}

function BaieNewsRow({ article, favorite, onToggle, onOpen }) {
  return <div role="button" tabIndex={0} onClick={onOpen} onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  }} style={{ width: '100%', boxSizing: 'border-box', borderBottom: `1px solid ${OK.line}`, background: '#fff', padding: '13px 16px', display: 'flex', alignItems: 'stretch', gap: 12, textAlign: 'left', cursor: 'pointer' }}>
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: FT, fontSize: 9, fontWeight: 850, letterSpacing: 0.55, color: OK.green }}>{article.category}</span>
      <div style={{ marginTop: 4, fontFamily: FX, fontSize: 13.2, fontWeight: 800, lineHeight: 1.27, color: OK.ink }}>{article.title}</div>
      <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontFamily: FT, fontSize: 9.5, color: OK.ink3 }}><span style={{ fontWeight: 750 }}>{article.source}</span><span>•</span><span>{article.date}</span></div>
    </div>
    <div style={{ width: 105, height: 82, borderRadius: 10, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <Img src={article.image} style={{ position: 'absolute', inset: 0 }}/>
      <div style={{ position: 'absolute', right: 5, bottom: 5 }}><BaieNewsBookmark active={favorite} onClick={onToggle} dark size={30}/></div>
    </div>
  </div>;
}

function BaieInformationScreen() {
  const { back, navigate } = useNav();
  const [tab, setTab] = useState('latest');
  const { favorites, toggleFavorite } = useBaieNewsFavorites();
  const featured = BAIE_NEWS[0];
  const articles = tab === 'favorites' ? BAIE_NEWS.filter(article => favorites.includes(article.id)) : BAIE_NEWS.slice(1);
  return <Screen bg="#fff" statusDark={true} lightStatus>
    <div data-screen-label="Informations — Baie des Rois">
      <div style={{ position: 'sticky', top: 0, zIndex: 30, padding: `${APP_HEADER_TOP_PLUS_2} 16px 10px`, display: 'flex', alignItems: 'center', gap: 11, background: '#fff', borderBottom: `1px solid ${OK.line}` }}>
        <button onClick={back} aria-label="Retour" style={{ width: 38, height: 38, borderRadius: 999, border: `1px solid ${OK.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="back" size={18} color={OK.ink} strokeWidth={2.2}/></button>
        <div style={{ flex: 1 }}><div style={{ fontFamily: FX, fontSize: 20, fontWeight: 850, color: OK.ink }}>Informations</div><div style={{ marginTop: 1, fontFamily: FT, fontSize: 10.5, color: OK.ink3 }}>La Baie des Rois • Presse gabonaise</div></div>
      </div>

      <div style={{ height: 45, display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', borderBottom: `1px solid ${OK.line}` }}>
        {[['latest', 'À la une'], ['favorites', `Favoris${favorites.length ? ` (${favorites.length})` : ''}`]].map(([id, label]) => <button key={id} onClick={() => setTab(id)} style={{ position: 'relative', border: 'none', background: 'transparent', fontFamily: FX, fontSize: 12.5, fontWeight: 800, color: tab === id ? OK.green : OK.ink3, cursor: 'pointer' }}>{label}{tab === id && <span style={{ position: 'absolute', left: '25%', right: '25%', bottom: 0, height: 3, borderRadius: '3px 3px 0 0', background: OK.gold }}/>}</button>)}
      </div>

      {tab === 'latest' && <>
        <div role="button" tabIndex={0} onClick={() => navigate('baie-article', { id: featured.id })} onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate('baie-article', { id: featured.id });
          }
        }} style={{ width: '100%', height: 225, padding: 0, position: 'relative', overflow: 'hidden', textAlign: 'left', cursor: 'pointer' }}>
          <Img src={featured.image} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(3,20,10,0.08) 20%, rgba(3,24,12,0.9) 100%)"/>
          <div style={{ position: 'absolute', top: 13, left: 14 }}><span style={{ display: 'inline-flex', padding: '5px 9px', borderRadius: 999, background: OK.gold, color: '#3c2d00', fontFamily: FT, fontSize: 9, fontWeight: 900, letterSpacing: 0.45 }}>{featured.category}</span></div>
          <div style={{ position: 'absolute', top: 12, right: 13 }}><BaieNewsBookmark active={favorites.includes(featured.id)} onClick={() => toggleFavorite(featured.id)} dark/></div>
          <div style={{ position: 'absolute', left: 15, right: 15, bottom: 15 }}>
            <div style={{ fontFamily: FX, fontSize: 20, fontWeight: 850, lineHeight: 1.15, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>{featured.title}</div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontFamily: FT, fontSize: 10.5, color: 'rgba(255,255,255,0.86)' }}><b>{featured.source}</b><span>•</span><span>{featured.date}</span></div>
          </div>
        </div>
        <div style={{ padding: '15px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontFamily: FX, fontSize: 15, fontWeight: 850, color: OK.ink }}>En ce moment</span><span style={{ width: 34, height: 3, borderRadius: 3, background: OK.gold }}/></div>
      </>}

      {tab === 'favorites' && articles.length === 0 && <div style={{ padding: '76px 35px', textAlign: 'center' }}><div style={{ width: 66, height: 66, margin: '0 auto', borderRadius: 999, background: 'rgba(11,124,57,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="bookmark" size={27} color={OK.green}/></div><div style={{ marginTop: 16, fontFamily: FX, fontSize: 16, fontWeight: 850, color: OK.ink }}>Aucun article favori</div><p style={{ margin: '7px 0 0', fontFamily: FT, fontSize: 12, lineHeight: 1.55, color: OK.ink3 }}>Touchez le marque-page d’un article pour le retrouver facilement ici.</p><button onClick={() => setTab('latest')} style={{ marginTop: 17, height: 40, padding: '0 17px', borderRadius: 999, border: 'none', background: OK.green, color: '#fff', fontFamily: FT, fontSize: 11.5, fontWeight: 800, cursor: 'pointer' }}>Voir les actualités</button></div>}

      {articles.length > 0 && <div>{articles.map(article => <BaieNewsRow key={article.id} article={article} favorite={favorites.includes(article.id)} onToggle={() => toggleFavorite(article.id)} onOpen={() => navigate('baie-article', { id: article.id })}/>)}</div>}
      <div style={{ height: 28 }}/>
    </div>
  </Screen>;
}

function BaieArticleScreen({ params }) {
  const { back } = useNav();
  const article = BAIE_NEWS.find(item => item.id === params?.id) || BAIE_NEWS[0];
  const { favorites, toggleFavorite } = useBaieNewsFavorites();
  const favorite = favorites.includes(article.id);
  const shareArticle = async () => {
    try {
      if (navigator.share) await navigator.share({ title: article.title, text: article.excerpt, url: article.url });
      else if (navigator.clipboard) { await navigator.clipboard.writeText(article.url); notifyDemo('Lien de l’article copié'); }
      else notifyDemo('Article prêt à être partagé');
    } catch {}
  };
  return <Screen bg="#fff" statusDark={false} edgeTop>
    <article data-screen-label={`Article — ${article.title}`}>
      <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
        <Img src={article.image} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(2,20,9,0.42) 0%, rgba(2,20,9,0.02) 48%, rgba(2,20,9,0.36) 100%)"/>
        <button onClick={back} aria-label="Retour" style={{ position: 'absolute', top: APP_EDGE_TOP, left: 14, width: 40, height: 40, borderRadius: 999, border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(4,25,12,0.58)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="back" size={18} color="#fff" strokeWidth={2.2}/></button>
        <div style={{ position: 'absolute', top: APP_EDGE_TOP, right: 14, display: 'flex', gap: 8 }}><button onClick={shareArticle} aria-label="Partager" style={{ width: 40, height: 40, borderRadius: 999, border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(4,25,12,0.58)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="share" size={17} color="#fff" strokeWidth={2}/></button><BaieNewsBookmark active={favorite} onClick={() => toggleFavorite(article.id)} dark size={40}/></div>
      </div>
      <div style={{ padding: '19px 18px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: FT, fontSize: 10, color: OK.ink3 }}><span style={{ color: OK.green, fontWeight: 900, letterSpacing: 0.55 }}>{article.category}</span><span>•</span><b>{article.source}</b><span>•</span><span>{article.date}</span></div>
        <h1 style={{ margin: '11px 0 0', fontFamily: FX, fontSize: 24, lineHeight: 1.18, letterSpacing: -0.55, color: OK.ink }}>{article.title}</h1>
        <p style={{ margin: '13px 0 0', paddingBottom: 16, borderBottom: `1px solid ${OK.line}`, fontFamily: FT, fontSize: 13.5, lineHeight: 1.6, fontWeight: 650, color: OK.ink2 }}>{article.excerpt}</p>
        <div style={{ marginTop: 17 }}>{article.body.map((paragraph, index) => <p key={index} style={{ margin: index ? '15px 0 0' : 0, fontFamily: FT, fontSize: 14, lineHeight: 1.72, color: OK.ink2 }}>{paragraph}</p>)}</div>
        <button onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')} style={{ width: '100%', height: 49, marginTop: 24, borderRadius: 13, border: 'none', background: OK.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: FT, fontSize: 12.5, fontWeight: 850, cursor: 'pointer' }}>Lire sur {article.source}<Icon name="chev-r" size={16} color="#fff" strokeWidth={2.2}/></button>
      </div>
    </article>
  </Screen>;
}

const TRAFFIC_FLUID_POINTS = [
  { x: 42, y: 17 }, { x: 46, y: 31 }, { x: 51, y: 48 },
  { x: 56, y: 66 }, { x: 62, y: 81 }, { x: 77, y: 54 },
];

const TRAFFIC_JAM_POINTS = Array.from({ length: 52 }, (_, index) => {
  const branch = index % 5;
  const progress = Math.floor(index / 5) / 10;
  const jitterX = ((index * 7) % 5) - 2;
  const jitterY = ((index * 11) % 7) - 3;
  const routes = [
    [38 + progress * 27, 10 + progress * 80],
    [45 + progress * 32, 20 + progress * 49],
    [31 + progress * 44, 42 + progress * 15],
    [57 + progress * 29, 69 - progress * 38],
    [49 + progress * 18, 78 - progress * 55],
  ];
  return {
    x: Math.max(8, Math.min(92, routes[branch][0] + jitterX * .65)),
    y: Math.max(7, Math.min(93, routes[branch][1] + jitterY * .48)),
    size: index % 9 === 0 ? 11 : index % 4 === 0 ? 9 : 7,
    delay: -(index % 12) * .18,
  };
});

function TrafficMapPoint({ point, congested }) {
  return <span className={`okaba-traffic-point ${congested ? 'is-jam' : 'is-fluid'}`} style={{ left: `${point.x}%`, top: `${point.y}%`, width: point.size || 9, height: point.size || 9, animationDelay: `${point.delay || 0}s` }}/>;
}

function TrafficCar3D() {
  return <span className="okaba-traffic-car"/>;
}

function Traffic3DScreen() {
  const { back } = useNav();
  const [mode, setMode] = useState(() => Math.random() < 0.5 ? 'fluid' : 'jam');
  const [zoom, setZoom] = useState(1);
  const congested = mode === 'jam';
  const trafficPoints = congested ? TRAFFIC_JAM_POINTS : TRAFFIC_FLUID_POINTS;
  const cars = trafficPoints;
  const roads = congested ? [
    ['Boulevard du Bord de mer', 'Saturé', '+18 min', OK.red],
    ['Entrée Nord', 'Dense', '+11 min', '#E58C22'],
    ['Giratoire central', 'Ralenti', '+7 min', '#E0B129'],
  ] : [
    ['Boulevard du Bord de mer', 'Fluide', '+3 min', '#2FBF71'],
    ['Entrée Nord', 'Fluide', '+2 min', '#2FBF71'],
    ['Giratoire central', 'Normal', '+1 min', '#65C77A'],
  ];
  return (
    <Screen bg="#EDF3EE" statusDark={true} tabBar>
      <style>{`
        @keyframes okabaTrafficUp {
          from { transform: translate3d(var(--car-x), 455px, 0) rotateZ(0deg); }
          to { transform: translate3d(var(--car-x), -42px, 0) rotateZ(0deg); }
        }
        @keyframes okabaTrafficDown {
          from { transform: translate3d(var(--car-x), -42px, 0) rotateZ(180deg); }
          to { transform: translate3d(var(--car-x), 455px, 0) rotateZ(180deg); }
        }
        @keyframes okabaTrafficCreep {
          0%, 70%, 100% { transform: translate3d(var(--car-x), var(--car-y), 0) rotateZ(var(--car-rotation)); }
          84% { transform: translate3d(var(--car-x), calc(var(--car-y) - 5px), 0) rotateZ(var(--car-rotation)); }
        }
        @keyframes okabaBrakePulse { 0%, 52%, 100% { opacity: .5; } 60%, 86% { opacity: 1; box-shadow: 0 0 4px rgba(255,35,31,.9); } }
        .okaba-map-road { position: absolute; left: 72px; top: -30px; width: 188px; height: 470px; transform: rotate(9deg); transform-origin: center; overflow: hidden; border-left: 5px solid rgba(219,215,200,.92); border-right: 5px solid rgba(219,215,200,.92); background: linear-gradient(90deg, rgba(26,30,31,.94), rgba(53,56,56,.96) 48%, rgba(29,32,33,.96)); box-shadow: 0 14px 30px rgba(0,0,0,.42), inset 0 0 20px rgba(0,0,0,.28); clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%); z-index: 4; }
        .okaba-map-road::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(180deg, transparent 0 30px, rgba(255,255,255,.54) 30px 51px, transparent 51px 81px); background-size: 2px 81px; background-position: 48px 0; opacity: .86; }
        .okaba-map-road::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; transform: translateX(-50%); background: linear-gradient(90deg, #E4B62F 0 32%, rgba(31,34,34,.9) 32% 68%, #E4B62F 68%); box-shadow: 0 0 0 1px rgba(0,0,0,.14); }
        .okaba-road-lane-right { position: absolute; left: 139px; top: 0; bottom: 0; width: 2px; z-index: 2; background: repeating-linear-gradient(180deg, transparent 0 30px, rgba(255,255,255,.58) 30px 51px, transparent 51px 81px); }
        .okaba-traffic-car { position: absolute; left: 0; top: 0; width: 12px; height: 25px; border-radius: 4px 4px 3px 3px; transform-origin: center; z-index: 9; filter: saturate(.86); }
        .okaba-traffic-car.is-suv { width: 13px; height: 27px; }
        .okaba-traffic-car.is-van { width: 14px; height: 30px; border-radius: 3px; }
        .okaba-traffic-car.is-fluid { animation-duration: var(--car-duration); animation-delay: var(--car-delay); animation-timing-function: linear; animation-iteration-count: infinite; }
        .okaba-traffic-car.is-up { animation-name: okabaTrafficUp; }
        .okaba-traffic-car.is-down { animation-name: okabaTrafficDown; }
        .okaba-traffic-car.is-congested { animation: okabaTrafficCreep 5.8s var(--car-delay) ease-in-out infinite; }
        .okaba-car-shadow { position: absolute; left: 2px; right: -3px; top: 3px; bottom: -4px; border-radius: 5px; background: rgba(0,0,0,.42); filter: blur(1.4px); }
        .okaba-car-body { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--vehicle-color), #000 18%), var(--vehicle-color) 25% 72%, color-mix(in srgb, var(--vehicle-color), #000 24%)); border: .7px solid rgba(0,0,0,.64); box-shadow: inset 0 1px 1px rgba(255,255,255,.5); }
        .okaba-car-cabin { position: absolute; left: 2px; right: 2px; top: 6px; bottom: 6px; border-radius: 2px; background: linear-gradient(90deg, #26373D, #91A9AD 45%, #26373D); border: .6px solid rgba(240,250,250,.5); }
        .okaba-car-glass { position: absolute; left: 2.5px; right: 2.5px; height: 3px; background: rgba(157,193,201,.74); z-index: 2; }
        .okaba-car-glass.front { top: 6px; border-radius: 2px 2px 0 0; } .okaba-car-glass.rear { bottom: 6px; border-radius: 0 0 2px 2px; }
        .okaba-car-headlight { position: absolute; top: .5px; width: 2.5px; height: 1.5px; border-radius: 2px; background: #FFF3B4; z-index: 3; }
        .okaba-car-headlight.left { left: 1.5px; } .okaba-car-headlight.right { right: 1.5px; }
        .okaba-car-tail { position: absolute; bottom: .8px; width: 2.5px; height: 1.6px; border-radius: 2px; background: #FF342E; z-index: 3; animation: okabaBrakePulse 2.8s infinite; }
        .okaba-car-tail.left { left: 1.5px; } .okaba-car-tail.right { right: 1.5px; }
        .okaba-car-taxi { position: absolute; left: 50%; top: 11px; width: 5px; height: 2px; transform: translateX(-50%); border-radius: 1px; background: #E8C947; border: .5px solid rgba(0,0,0,.48); z-index: 4; }
        @keyframes okabaTrafficPulse { 0%, 100% { transform: translate(-50%, -50%) scale(.82); opacity: .72; } 48% { transform: translate(-50%, -50%) scale(1.18); opacity: 1; } }
        .okaba-traffic-map { position: absolute; inset: 0; transform-origin: 57% 53%; transition: transform .25s ease; }
        .okaba-traffic-point { position: absolute; z-index: 12; transform: translate(-50%, -50%); border-radius: 999px; background: #E62D2D; border: 1.5px solid rgba(255,255,255,.94); box-shadow: 0 0 0 3px rgba(230,45,45,.18), 0 2px 5px rgba(94,0,0,.38); animation: okabaTrafficPulse 2.1s ease-in-out infinite; }
        .okaba-traffic-point.is-fluid { animation-duration: 3.2s; }
        .okaba-traffic-zoom { width: 36px; height: 34px; border: none; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; font-family: ${FX}; font-weight: 850; color: ${OK.ink2}; }
        .okaba-traffic-zoom:disabled { opacity: .35; cursor: default; }
      `}</style>
      <div data-screen-label="Trafic 3D — Baie des Rois">
        <GreenHeader title="Trafic en direct" onBack={back}/>
        <div style={{ padding: '14px 15px 34px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: congested ? OK.red : '#2FBF71', boxShadow: `0 0 8px ${congested ? OK.red : '#2FBF71'}` }}/>
                <span style={{ fontFamily: FX, fontSize: 10, fontWeight: 850, letterSpacing: .7, color: congested ? OK.red : OK.green }}>SIMULATION LOCALE</span>
              </div>
              <h1 style={{ margin: '5px 0 0', fontFamily: FX, fontSize: 22, lineHeight: 1.08, color: OK.ink }}>{congested ? 'Embouteillage détecté' : 'Circulation fluide'}</h1>
              <div style={{ marginTop: 4, fontFamily: FT, fontSize: 11.5, fontWeight: 650, color: OK.ink3 }}>Baie des Rois · mise à jour maintenant</div>
            </div>
            <div style={{ minWidth: 74, padding: '9px 10px', borderRadius: 13, background: '#fff', border: `1px solid ${OK.line}`, textAlign: 'center' }}>
              <div style={{ fontFamily: FX, fontSize: 17, fontWeight: 900, color: congested ? OK.red : OK.green }}>{congested ? '+18' : '+3'}</div>
              <div style={{ fontFamily: FT, fontSize: 9.5, fontWeight: 750, color: OK.ink3 }}>minutes</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 13, padding: 4, borderRadius: 14, background: '#DDE7DF' }}>
            {[['fluid', 'Trafic fluide'], ['jam', 'Embouteillage']].map(([id, label]) => (
              <button key={id} onClick={() => setMode(id)} style={{ height: 38, border: 'none', borderRadius: 11, cursor: 'pointer', background: mode === id ? '#fff' : 'transparent', color: mode === id ? (id === 'jam' ? OK.red : OK.green) : OK.ink3, boxShadow: mode === id ? '0 3px 9px rgba(0,0,0,.09)' : 'none', fontFamily: FT, fontSize: 11.5, fontWeight: 850 }}>{label}</button>
            ))}
          </div>

          <div className="okaba-real-traffic-map" style={{ position: 'relative', height: 430, marginTop: 12, borderRadius: 22, overflow: 'hidden', background: '#DDE7DD', boxShadow: '0 15px 34px rgba(5,37,21,.22)', isolation: 'isolate' }}>
            <div className="okaba-traffic-map" style={{ transform: `scale(${zoom})` }}>
              <svg viewBox="0 0 360 430" preserveAspectRatio="none" aria-label="Carte routière de la Baie des Rois" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <rect width="360" height="430" fill="#E9EEE7"/>
                <path d="M0 0H92C74 50 87 91 72 134C56 182 69 222 50 268C34 309 43 365 18 430H0Z" fill="#A8D8E6"/>
                <path d="M85 0C67 54 83 93 67 136C51 180 64 222 45 267C28 309 38 365 13 430" fill="none" stroke="#8FC6D5" strokeWidth="3"/>
                <g fill="#D4E3CF" opacity=".95">
                  <path d="M109 21h58v45h-58zM191 14h67v36h-67zM281 21h61v66h-61zM103 93h88v50h-88zM229 72h91v58h-91zM89 170h59v56H89zM179 160h76v43h-76zM278 153h64v61h-64zM103 254h80v57h-80zM213 231h105v62H213zM74 340h88v61H74zM195 326h72v74h-72zM287 309h58v88h-58z"/>
                </g>
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M126 -20C119 62 142 110 146 172C151 240 176 317 210 456" stroke="#CAD1C9" strokeWidth="19"/>
                  <path d="M126 -20C119 62 142 110 146 172C151 240 176 317 210 456" stroke="#FFFFFF" strokeWidth="13"/>
                  <path d="M126 -20C119 62 142 110 146 172C151 240 176 317 210 456" stroke={congested ? '#F5B1AD' : '#C9DEC9'} strokeWidth="5"/>
                  <path d="M75 187C135 174 190 181 250 166C290 155 325 133 373 124" stroke="#CDD3CB" strokeWidth="14"/>
                  <path d="M75 187C135 174 190 181 250 166C290 155 325 133 373 124" stroke="#FFFFFF" strokeWidth="9"/>
                  <path d="M89 315C142 288 193 266 239 233C276 206 313 194 370 205" stroke="#CDD3CB" strokeWidth="14"/>
                  <path d="M89 315C142 288 193 266 239 233C276 206 313 194 370 205" stroke="#FFFFFF" strokeWidth="9"/>
                  <path d="M169 390C185 337 215 300 246 266C279 230 301 189 300 103" stroke="#D2D7D0" strokeWidth="12"/>
                  <path d="M169 390C185 337 215 300 246 266C279 230 301 189 300 103" stroke="#FFFFFF" strokeWidth="7"/>
                  <path d="M144 101C192 80 228 73 283 79" stroke="#D2D7D0" strokeWidth="10"/>
                  <path d="M144 101C192 80 228 73 283 79" stroke="#FFFFFF" strokeWidth="6"/>
                  <path d="M151 231C112 243 80 259 48 284" stroke="#D2D7D0" strokeWidth="10"/>
                  <path d="M151 231C112 243 80 259 48 284" stroke="#FFFFFF" strokeWidth="6"/>
                </g>
                <g fill="#6D7C70" fontFamily="Manrope, sans-serif" fontWeight="800">
                  <text x="183" y="114" fontSize="9">ENTRÉE NORD</text>
                  <text x="207" y="188" fontSize="10">BAIE DES ROIS</text>
                  <text x="221" y="286" fontSize="8.5">PROMENADE</text>
                  <text x="92" y="370" fontSize="8.5">BORD DE MER</text>
                  <text x="12" y="212" fontSize="10" fill="#4E92A7" transform="rotate(-79 12 212)">ESTUAIRE DU GABON</text>
                </g>
                <circle cx="148" cy="177" r="10" fill="#FFFFFF" stroke="#C9D0C8" strokeWidth="4"/>
                <circle cx="148" cy="177" r="3" fill="#0B7C39"/>
              </svg>
              {trafficPoints.map((point, index) => <TrafficMapPoint key={`${mode}-${index}`} point={point} congested={congested}/>)}
            </div>

            <div style={{ position: 'absolute', left: 13, top: 13, zIndex: 20, display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 10, background: 'rgba(255,255,255,.95)', border: '1px solid rgba(11,124,57,.12)', color: OK.ink, fontFamily: FT, fontSize: 9.5, fontWeight: 850, letterSpacing: .25, boxShadow: '0 4px 14px rgba(20,48,29,.13)' }}><Icon name="map" size={13} color={OK.green}/> CARTE ROUTIÈRE · HORS LIGNE</div>

            <div style={{ position: 'absolute', right: 13, top: 13, zIndex: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 11, background: 'rgba(255,255,255,.96)', boxShadow: '0 5px 16px rgba(0,0,0,.16)' }}>
              <div style={{ width: 36, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(12,39,25,.1)', fontFamily: FX, fontSize: 10, fontWeight: 900, color: OK.green }}>N</div>
              <button className="okaba-traffic-zoom" aria-label="Zoom avant" disabled={zoom >= 1.3} onClick={() => setZoom(value => Math.min(1.3, +(value + .15).toFixed(2)))}>+</button>
              <button className="okaba-traffic-zoom" aria-label="Zoom arrière" disabled={zoom <= 1} onClick={() => setZoom(value => Math.max(1, +(value - .15).toFixed(2)))} style={{ borderTop: '1px solid rgba(12,39,25,.1)', fontSize: 20 }}>−</button>
            </div>

            <div style={{ position: 'absolute', left: 13, bottom: 13, zIndex: 20, padding: '9px 11px', borderRadius: 11, background: 'rgba(255,255,255,.96)', boxShadow: '0 5px 16px rgba(0,0,0,.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: FT, fontSize: 9.5, fontWeight: 850, color: OK.ink }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#E32626', boxShadow: '0 0 0 3px rgba(227,38,38,.15)' }}/>Point de ralentissement</div>
              <div style={{ marginTop: 4, fontFamily: FT, fontSize: 9, fontWeight: 650, color: OK.ink3 }}>{trafficPoints.length} points détectés sur la zone</div>
            </div>

            <div style={{ position: 'absolute', right: 13, bottom: 13, zIndex: 20, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderRadius: 10, background: congested ? 'rgba(227,38,38,.94)' : 'rgba(11,124,57,.94)', color: '#fff', fontFamily: FT, fontSize: 9.5, fontWeight: 850, boxShadow: '0 4px 12px rgba(0,0,0,.18)' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }}/>{congested ? 'Très dense' : 'Fluide'}</div>
          </div>

          <div style={{ display: 'none', position: 'relative', height: 408, marginTop: 12, borderRadius: 22, overflow: 'hidden', backgroundImage: 'url("assets/baie/c21-aerial-04.webp")', backgroundSize: 'cover', backgroundPosition: '51% center', boxShadow: '0 15px 34px rgba(5,37,21,.26)', isolation: 'isolate' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(1,19,12,.13), rgba(1,17,10,.02) 45%, rgba(1,16,9,.38)), linear-gradient(90deg, rgba(0,21,13,.08), transparent 48%, rgba(0,20,13,.06))', zIndex: 1 }}/>

            <div className="okaba-map-road">
              <span className="okaba-road-lane-right"/>
              <span style={{ position: 'absolute', left: 7, top: 18, bottom: 18, width: 3, borderRadius: 999, background: congested ? 'linear-gradient(180deg, #F15B54, #B82323)' : 'linear-gradient(180deg, #45D17B, #168D4A)', boxShadow: `0 0 8px ${congested ? 'rgba(241,91,84,.72)' : 'rgba(69,209,123,.68)'}`, zIndex: 4 }}/>
              {cars.map((car, index) => <TrafficCar3D key={`${mode}-${index}`} car={car} congested={congested}/>)}
            </div>

            <div style={{ position: 'absolute', left: 14, top: 14, zIndex: 20, display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 10, background: 'rgba(3,22,14,.82)', border: '1px solid rgba(255,255,255,.17)', color: '#fff', fontFamily: FT, fontSize: 9.5, fontWeight: 850, letterSpacing: .4, backdropFilter: 'blur(10px)' }}><Icon name="navigate" size={12} color={OK.gold}/> CARTE 3D · VUE DRONE</div>

            <div style={{ position: 'absolute', right: 13, top: 13, zIndex: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 11, background: 'rgba(255,255,255,.93)', boxShadow: '0 5px 16px rgba(0,0,0,.2)' }}>
              <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(12,39,25,.1)', fontFamily: FX, fontSize: 10, fontWeight: 900, color: OK.green }}>N</div>
              <div style={{ width: 34, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FX, fontSize: 18, fontWeight: 700, color: OK.ink2 }}>+</div>
              <div style={{ width: 34, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(12,39,25,.1)', fontFamily: FX, fontSize: 20, fontWeight: 600, color: OK.ink2 }}>−</div>
            </div>

            <div style={{ position: 'absolute', left: 16, top: 91, zIndex: 18, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 9px', borderRadius: 9, background: 'rgba(255,255,255,.92)', boxShadow: '0 4px 13px rgba(0,0,0,.19)', fontFamily: FT, fontSize: 9, fontWeight: 850, color: OK.ink }}><span style={{ width: 6, height: 6, borderRadius: 999, background: congested ? OK.red : '#2FBF71' }}/> Boulevard du Bord de mer</div>
            <div style={{ position: 'absolute', right: 55, top: 142, zIndex: 18, padding: '5px 8px', borderRadius: 8, background: 'rgba(4,27,17,.74)', color: '#fff', fontFamily: FT, fontSize: 8.5, fontWeight: 750, backdropFilter: 'blur(8px)' }}>Baie des Rois</div>

            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 116, background: 'linear-gradient(180deg, transparent, rgba(1,16,9,.72))', pointerEvents: 'none', zIndex: 15 }}/>
            <div style={{ position: 'absolute', left: 13, right: 13, bottom: 13, zIndex: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontFamily: FT, fontSize: 8.5, fontWeight: 750, letterSpacing: .55, color: 'rgba(255,255,255,.72)' }}>ANALYSE EN TEMPS RÉEL</div>
                <div style={{ marginTop: 3, fontFamily: FX, fontSize: 13, fontWeight: 900, color: '#fff' }}>{congested ? `${cars.length} véhicules · 12 km/h` : '8 véhicules · 42 km/h'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', borderRadius: 10, background: 'rgba(255,255,255,.94)', fontFamily: FT, fontSize: 9.5, fontWeight: 850, color: OK.ink, boxShadow: '0 4px 12px rgba(0,0,0,.18)' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: congested ? OK.red : '#2FBF71', boxShadow: `0 0 6px ${congested ? OK.red : '#2FBF71'}` }}/>{congested ? 'Très dense' : 'Fluide'}</div>
            </div>
          </div>

          <div style={{ marginTop: 15, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {roads.map(([name, status, delay, color]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 55, padding: '0 12px', borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}` }}>
                <span style={{ width: 9, height: 36, borderRadius: 999, background: color }}/>
                <div style={{ flex: 1 }}><div style={{ fontFamily: FT, fontSize: 12, fontWeight: 850, color: OK.ink }}>{name}</div><div style={{ marginTop: 2, fontFamily: FT, fontSize: 10.5, fontWeight: 700, color }}>{status}</div></div>
                <div style={{ fontFamily: FX, fontSize: 12, fontWeight: 900, color: OK.ink2 }}>{delay}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function TrafficAnimatedCar({ path, duration, begin = '0s', color = '#FFFFFF', size = 1 }) {
  return (
    <g className="okaba-map-car" transform={`scale(${size})`}>
      <animateMotion dur={duration} begin={begin} repeatCount="indefinite" rotate="auto" path={path}/>
      <ellipse cx="0" cy="3" rx="5.8" ry="2.5" fill="rgba(0,0,0,.2)"/>
      <rect x="-7" y="-4" width="14" height="8" rx="2.6" fill={color} stroke="#26322B" strokeWidth=".8"/>
      <rect x="-2.5" y="-3.2" width="6" height="6.4" rx="1.4" fill="#8CB5C1" stroke="rgba(255,255,255,.65)" strokeWidth=".6"/>
      <rect x="5" y="-2.6" width="2.2" height="1.7" rx=".6" fill="#FFF1A8"/>
      <rect x="5" y=".9" width="2.2" height="1.7" rx=".6" fill="#FFF1A8"/>
      <rect x="-7" y="-2.7" width="1.9" height="1.8" rx=".5" fill="#FF332E"/>
      <rect x="-7" y=".9" width="1.9" height="1.8" rx=".5" fill="#FF332E"/>
    </g>
  );
}

function TrafficMapScreen() {
  const { back } = useNav();
  const [congested] = useState(() => Math.random() < .5);
  const points = congested ? TRAFFIC_JAM_POINTS : TRAFFIC_FLUID_POINTS;
  const mainRoad = 'M126 -20 C119 62 142 110 146 172 C151 240 176 317 210 456';
  const crossRoad = 'M75 187 C135 174 190 181 250 166 C290 155 325 133 373 124';
  const southRoad = 'M89 315 C142 288 193 266 239 233 C276 206 313 194 370 205';
  const cars = congested ? [
    [mainRoad, '18s', '-1s', '#FFFFFF'], [mainRoad, '18s', '-4s', '#D5A832'],
    [mainRoad, '18s', '-7s', '#2E617A'], [mainRoad, '18s', '-10s', '#A83C36'],
    [mainRoad, '18s', '-13s', '#FFFFFF'], [crossRoad, '15s', '-3s', '#0B7C39'],
    [crossRoad, '15s', '-9s', '#E7E9E8'], [southRoad, '17s', '-7s', '#243139'],
  ] : [
    [mainRoad, '5.5s', '-1s', '#FFFFFF'],
    [crossRoad, '6.5s', '-4s', '#D5A832'],
    [southRoad, '7s', '-2s', '#2E617A'],
  ];

  return (
    <Screen bg="#E9EEE7" statusDark={false} noScroll>
      <div data-screen-label="Carte trafic animée" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 360 844" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect width="360" height="844" fill="#E9EEE7"/>
          <path d="M0 0H92C74 96 87 180 72 265C56 358 69 438 50 527C34 608 43 716 18 844H0Z" fill="#A8D8E6"/>
          <path d="M85 0C67 106 83 182 67 267C51 354 64 438 45 526C28 610 38 715 13 844" fill="none" stroke="#8FC6D5" strokeWidth="3"/>
          <g fill="#D4E3CF" opacity=".96">
            <path d="M109 42h58v88h-58zM191 28h67v70h-67zM281 42h61v130h-61zM103 183h88v98h-88zM229 142h91v114h-91zM89 333h59v110H89zM179 314h76v84h-76zM278 300h64v120h-64zM103 498h80v112h-80zM213 453h105v122H213zM74 667h88v120H74zM195 640h72v146h-72zM287 606h58v173h-58z"/>
          </g>
          <g transform="translate(0 95) scale(1 1.5)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={mainRoad} stroke="#C7CEC6" strokeWidth="21"/>
            <path d={mainRoad} stroke="#FFFFFF" strokeWidth="15"/>
            <path d={mainRoad} stroke={congested ? '#F3AAA5' : '#C6DEC8'} strokeWidth="5"/>
            <path d={crossRoad} stroke="#CDD3CB" strokeWidth="15"/>
            <path d={crossRoad} stroke="#FFFFFF" strokeWidth="10"/>
            <path d={southRoad} stroke="#CDD3CB" strokeWidth="15"/>
            <path d={southRoad} stroke="#FFFFFF" strokeWidth="10"/>
            <path d="M169 390C185 337 215 300 246 266C279 230 301 189 300 103" stroke="#D2D7D0" strokeWidth="12"/>
            <path d="M169 390C185 337 215 300 246 266C279 230 301 189 300 103" stroke="#FFFFFF" strokeWidth="7"/>
            <path d="M144 101C192 80 228 73 283 79" stroke="#D2D7D0" strokeWidth="10"/>
            <path d="M144 101C192 80 228 73 283 79" stroke="#FFFFFF" strokeWidth="6"/>
            <path d="M151 231C112 243 80 259 48 284" stroke="#D2D7D0" strokeWidth="10"/>
            <path d="M151 231C112 243 80 259 48 284" stroke="#FFFFFF" strokeWidth="6"/>
            <circle cx="148" cy="177" r="10" fill="#FFFFFF" stroke="#C9D0C8" strokeWidth="4"/>
            <circle cx="148" cy="177" r="3" fill="#0B7C39" stroke="none"/>
            {points.map((point, index) => (
              <g key={`${congested ? 'jam' : 'fluid'}-${index}`} transform={`translate(${point.x * 3.6} ${point.y * 4.3})`}>
                <circle r={(point.size || 9) / 2 + 3} fill="rgba(227,38,38,.16)"/>
                <circle r={(point.size || 9) / 2} fill="#E32626" stroke="#FFFFFF" strokeWidth="1.4">
                  <animate attributeName="r" values={`${(point.size || 9) / 2 - .6};${(point.size || 9) / 2 + 1.3};${(point.size || 9) / 2 - .6}`} dur={congested ? '1.8s' : '3s'} begin={`${point.delay || 0}s`} repeatCount="indefinite"/>
                </circle>
              </g>
            ))}
            {cars.map(([path, duration, begin, color], index) => <TrafficAnimatedCar key={index} path={path} duration={duration} begin={begin} color={color}/>)}
          </g>
        </svg>

        <button onClick={back} aria-label="Retour" style={{ position: 'absolute', top: 58, left: 14, zIndex: 70, width: 42, height: 42, borderRadius: 999, border: '1px solid rgba(11,124,57,.14)', background: 'rgba(255,255,255,.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 16px rgba(22,54,34,.18)', backdropFilter: 'blur(8px)' }}><Icon name="back" size={19} color={OK.green} strokeWidth={2.3}/></button>
        <div style={{ position: 'absolute', top: 59, right: 14, zIndex: 70, minHeight: 40, padding: '0 15px', borderRadius: 999, background: congested ? 'rgba(218,38,38,.95)' : 'rgba(11,124,57,.95)', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 5px 16px rgba(22,54,34,.2)', backdropFilter: 'blur(8px)', fontFamily: FT, fontSize: 12, fontWeight: 850 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff', boxShadow: '0 0 0 3px rgba(255,255,255,.2)' }}/>{congested ? 'Embouteillage' : 'Trafic fluide'}</div>
      </div>
    </Screen>
  );
}

const TRAFFIC_OSM_TILES = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 3 }, (_, col) => ({ x: 34484 + col, y: 32693 + row }))
).flat();

const TRAFFIC_REAL_FLUID_POINTS = [
  [167, 236], [233, 335], [304, 441], [374, 545], [211, 180], [66, 150],
];

const TRAFFIC_REAL_JAM_POINTS = [
  ...Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    return [140 + t * 300 + ((index * 5) % 5 - 2), 202 + t * 449 + ((index * 7) % 7 - 3)];
  }),
  ...Array.from({ length: 16 }, (_, index) => {
    const t = index / 15;
    return [120 + t * 290 + ((index * 3) % 5 - 2), 218 - t * 174 + ((index * 5) % 7 - 3)];
  }),
  ...Array.from({ length: 9 }, (_, index) => {
    const t = index / 8;
    return [-4 + t * 122 + ((index * 5) % 5 - 2), 108 + t * 88 + ((index * 3) % 7 - 3)];
  }),
];

function TrafficMapVehicle({ path, duration, begin, color }) {
  return (
    <g className="okaba-map-car">
      <animateMotion dur={duration} begin={begin} repeatCount="indefinite" rotate="auto" path={path}/>
      <ellipse cx="0" cy="2" rx="9" ry="6.5" fill="rgba(255,255,255,.92)" stroke="rgba(17,42,28,.16)" strokeWidth="1"/>
      <rect x="-6.5" y="-3.8" width="13" height="7.6" rx="2.7" fill={color} stroke="#FFFFFF" strokeWidth=".8"/>
      <rect x="-1.8" y="-3" width="4.7" height="6" rx="1.2" fill="#A9C8D0" opacity=".95"/>
      <path d="M-4.2-3.4v6.8M4.2-3.4v6.8" stroke="rgba(16,31,24,.36)" strokeWidth=".7"/>
    </g>
  );
}

function TrafficRealMapScreen() {
  const { back } = useNav();
  const [congested] = useState(() => Math.random() < .5);
  const points = congested ? TRAFFIC_REAL_JAM_POINTS : TRAFFIC_REAL_FLUID_POINTS;
  const mainRoute = 'M140 202 C173 248 200 288 227 328 C264 382 293 424 324 471 C363 527 403 581 452 651';
  const crossRoute = 'M120 218 C163 205 207 181 247 154 C293 123 339 91 430 43';
  const northRoute = 'M-20 103 C34 117 77 145 118 196';
  const vehicles = congested ? [
    [mainRoute, '19s', '-1s', '#263B31'], [mainRoute, '19s', '-4.5s', OK.green],
    [mainRoute, '19s', '-8s', '#A47B19'], [mainRoute, '19s', '-11.5s', '#364A68'],
    [mainRoute, '19s', '-15s', '#7D3030'], [crossRoute, '17s', '-3s', OK.green],
    [crossRoute, '17s', '-10s', '#293A33'], [northRoute, '15s', '-6s', '#A47B19'],
  ] : [
    [mainRoute, '7s', '-1s', OK.green], [crossRoute, '8s', '-4s', '#263B31'],
    [northRoute, '7.5s', '-6s', '#A47B19'],
  ];
  const trafficColor = congested ? '#D92D2D' : '#18864A';

  return (
    <Screen bg="#D9E1DD" statusDark={false} noScroll>
      <div data-screen-label="Carte trafic réelle" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#D9E1DD' }}>
        <div style={{ position: 'absolute', left: 'calc(50% - 420px)', top: 'calc(50% - 552px)', width: 768, height: 1280, display: 'grid', gridTemplateColumns: 'repeat(3, 256px)', gridTemplateRows: 'repeat(5, 256px)', filter: 'saturate(.76) contrast(.98) brightness(1.02)' }}>
          {TRAFFIC_OSM_TILES.map(({ x, y }) => <img key={`${x}-${y}`} src={`assets/maps/traffic/z16-${x}-${y}.png`} alt="" draggable={false} style={{ width: 256, height: 256, display: 'block', userSelect: 'none' }}/>) }
        </div>

        <svg viewBox="0 0 390 844" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <path d={mainRoute} fill="none" stroke={trafficColor} strokeOpacity={congested ? '.2' : '.12'} strokeWidth="14" strokeLinecap="round"/>
          <path d={mainRoute} fill="none" stroke={trafficColor} strokeOpacity={congested ? '.66' : '.48'} strokeWidth="5" strokeLinecap="round" strokeDasharray={congested ? '11 5' : '18 8'}/>
          <path d={crossRoute} fill="none" stroke={trafficColor} strokeOpacity={congested ? '.15' : '.09'} strokeWidth="11" strokeLinecap="round"/>
          <path d={crossRoute} fill="none" stroke={trafficColor} strokeOpacity={congested ? '.5' : '.34'} strokeWidth="4" strokeLinecap="round" strokeDasharray="10 7"/>
          <path d={northRoute} fill="none" stroke={trafficColor} strokeOpacity={congested ? '.15' : '.09'} strokeWidth="11" strokeLinecap="round"/>
          <path d={northRoute} fill="none" stroke={trafficColor} strokeOpacity={congested ? '.5' : '.34'} strokeWidth="4" strokeLinecap="round" strokeDasharray="10 7"/>
          {points.map(([x, y], index) => (
            <g key={`${congested ? 'jam' : 'fluid'}-${index}`} transform={`translate(${x} ${y})`}>
              <circle r={congested ? 7 : 6} fill="rgba(217,45,45,.16)"/>
              <circle r={congested ? 3.6 : 3.2} fill="#D92D2D" stroke="#FFFFFF" strokeWidth="1.4">
                <animate attributeName="opacity" values=".68;1;.68" dur={congested ? '1.8s' : '3s'} begin={`${-(index % 9) * .16}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          ))}
          {vehicles.map(([path, duration, begin, color], index) => <TrafficMapVehicle key={index} path={path} duration={duration} begin={begin} color={color}/>)}
        </svg>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 95px 55px -65px rgba(255,255,255,.76), inset 0 -80px 55px -65px rgba(11,39,24,.13)' }}/>
        <button onClick={back} aria-label="Retour" style={{ position: 'absolute', top: 58, left: 14, zIndex: 70, width: 42, height: 42, borderRadius: 999, border: '1px solid rgba(11,124,57,.14)', background: 'rgba(255,255,255,.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 18px rgba(22,54,34,.2)', backdropFilter: 'blur(10px)' }}><Icon name="back" size={19} color={OK.green} strokeWidth={2.3}/></button>
        <div style={{ position: 'absolute', top: 59, right: 14, zIndex: 70, minHeight: 40, padding: '0 15px', borderRadius: 999, background: congested ? 'rgba(199,37,37,.96)' : 'rgba(11,124,57,.96)', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 5px 18px rgba(22,54,34,.22)', backdropFilter: 'blur(10px)', fontFamily: FT, fontSize: 12, fontWeight: 850 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff', boxShadow: '0 0 0 3px rgba(255,255,255,.2)' }}/>{congested ? 'Embouteillage' : 'Trafic fluide'}</div>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" style={{ position: 'absolute', right: 8, bottom: 10, zIndex: 70, padding: '4px 7px', borderRadius: 5, background: 'rgba(255,255,255,.88)', color: '#42534A', fontFamily: FT, fontSize: 8.5, fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 8px rgba(20,45,30,.12)' }}>© OpenStreetMap contributors</a>
      </div>
    </Screen>
  );
}

function WeatherGlyph({ type = 'partly', size = 48 }) {
  const rain = type === 'rain';
  const sunny = type === 'sun';
  return (
    <svg width={size} height={size * .78} viewBox="0 0 64 50" aria-hidden="true" style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 5px 8px rgba(3,31,19,.2))' }}>
      {(sunny || type === 'partly') && <g>
        <circle cx={sunny ? 32 : 42} cy={sunny ? 24 : 17} r={sunny ? 11 : 10} fill="#F5B800"/>
        <g stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" opacity=".9">
          <path d={sunny ? 'M32 5v5M32 38v5M13 24h5M46 24h5M19 11l4 4M41 33l4 4M45 11l-4 4M23 33l-4 4' : 'M42 1v4M42 29v4M27 17h4M53 17h4M31 6l3 3M50 25l3 3M53 6l-3 3'}/>
        </g>
      </g>}
      {!sunny && <g>
        <ellipse cx="31" cy="37" rx="24" ry="10" fill="rgba(2,28,18,.14)"/>
        <path d="M13 35c0-7 5.5-12.5 12.5-12.5 2.1-7 8.1-11.5 15.3-11.5 9 0 16.2 7.1 16.2 16 0 .6 0 1.2-.1 1.8C61 30 64 33.8 64 38.2 64 44.7 58.7 50 52.2 50H15.5C7 50 0 43.4 0 35.2 0 27.7 5.8 21.5 13.2 20.8" transform="translate(0 -7) scale(.92)" fill="#F8FBFA"/>
        <path d="M17 29c3.6-4.8 8.3-7.1 14.2-7.1 8.1 0 13.5 4.5 16.2 10.4-5.8-2-10.9-.8-15.5 2.7-4.9-4.4-9.8-6.4-14.9-6" fill="rgba(205,220,217,.72)"/>
      </g>}
      {rain && <g stroke="#8ED0E1" strokeWidth="2.8" strokeLinecap="round">
        <path d="M18 43l-3 5M31 43l-3 5M44 43l-3 5"/>
      </g>}
    </svg>
  );
}

function WeatherScreen() {
  const { back } = useNav();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  const dateLabel = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', hour: '2-digit', minute: '2-digit' }).format(now);
  const forecast = [
    ['Auj.', 'partly', '29°', '24°'], ['Lun.', 'rain', '30°', '24°'],
    ['Mar.', 'cloud', '29°', '23°'], ['Mer.', 'sun', '30°', '24°'],
    ['Jeu.', 'rain', '29°', '23°'], ['Ven.', 'cloud', '30°', '24°'],
    ['Sam.', 'partly', '29°', '23°'],
  ];
  return (
    <Screen bg="#76BCE9" statusDark={true} noScroll>
      <div data-screen-label="Météo Libreville" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img src="assets/smartcity-meteo.jpg" alt="Ciel à Libreville" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.03)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,45,27,.05) 0%, rgba(5,42,27,.16) 46%, rgba(3,27,18,.58) 100%)' }}/>

        <button onClick={back} aria-label="Retour" style={{ position: 'absolute', top: 58, left: 14, zIndex: 70, width: 42, height: 42, borderRadius: 999, border: '1px solid rgba(255,255,255,.42)', background: 'rgba(8,70,41,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 6px 20px rgba(4,37,22,.2)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}><Icon name="back" size={19} color="#fff" strokeWidth={2.3}/></button>
        <div style={{ position: 'absolute', top: 62, left: 0, right: 0, textAlign: 'center', fontFamily: FX, fontSize: 13, fontWeight: 850, color: '#fff', textShadow: '0 2px 8px rgba(3,31,19,.35)' }}>Météo · Libreville</div>

        <section style={{ position: 'absolute', left: 15, right: 15, top: 118, bottom: 22, padding: '19px 17px 17px', borderRadius: 30, border: '1px solid rgba(255,255,255,.42)', background: 'linear-gradient(145deg, rgba(255,255,255,.3), rgba(225,241,236,.13))', boxShadow: '0 24px 55px rgba(2,35,21,.3), inset 0 1px 0 rgba(255,255,255,.45)', backdropFilter: 'blur(24px) saturate(1.08)', WebkitBackdropFilter: 'blur(24px) saturate(1.08)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 91, flexShrink: 0, display: 'flex', justifyContent: 'center' }}><WeatherGlyph type="partly" size={86}/></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: FT, fontSize: 11.5, fontWeight: 650, color: 'rgba(255,255,255,.8)', textTransform: 'capitalize' }}>{dateLabel}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 2 }}><span style={{ fontFamily: FX, fontSize: 45, lineHeight: .95, fontWeight: 900, letterSpacing: -2 }}>29</span><span style={{ marginTop: 4, fontFamily: FX, fontSize: 16, fontWeight: 850 }}>°C</span></div>
              <div style={{ marginTop: 4, fontFamily: FX, fontSize: 14, fontWeight: 850 }}>Partiellement nuageux</div>
              <div style={{ marginTop: 2, fontFamily: FT, fontSize: 11.5, fontWeight: 650, color: 'rgba(255,255,255,.78)' }}>Libreville · Estuaire, Gabon</div>
            </div>
          </div>

          <div style={{ marginTop: 16, minHeight: 55, padding: '0 13px', borderRadius: 18, background: 'rgba(4,55,34,.78)', border: '1px solid rgba(255,255,255,.12)', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 9, boxShadow: '0 8px 20px rgba(3,35,21,.16)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Icon name="weather" size={18} color={OK.gold}/><div><div style={{ fontFamily: FT, fontSize: 9.5, color: 'rgba(255,255,255,.65)' }}>Lever</div><div style={{ fontFamily: FX, fontSize: 12, fontWeight: 850 }}>06:21</div></div></div>
            <div style={{ fontFamily: FT, fontSize: 10.5, fontWeight: 750, color: 'rgba(255,255,255,.82)', whiteSpace: 'nowrap' }}>12 h 05</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}><div style={{ textAlign: 'right' }}><div style={{ fontFamily: FT, fontSize: 9.5, color: 'rgba(255,255,255,.65)' }}>Coucher</div><div style={{ fontFamily: FX, fontSize: 12, fontWeight: 850 }}>18:26</div></div><Icon name="weather" size={18} color="#DCE8E4"/></div>
          </div>

          <div style={{ marginTop: 12, minHeight: 43, borderRadius: 16, background: 'rgba(4,55,34,.72)', border: '1px solid rgba(255,255,255,.11)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: FT, fontSize: 12, color: 'rgba(255,255,255,.82)' }}><WeatherGlyph type="rain" size={25}/><span>Risque de pluie</span><strong style={{ fontFamily: FX, fontSize: 13.5, color: '#fff' }}>35 %</strong></div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            <div style={{ minHeight: 57, padding: '10px 13px', borderRadius: 17, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)' }}><div style={{ fontFamily: FT, fontSize: 10, color: 'rgba(255,255,255,.68)' }}>Humidité</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 17, fontWeight: 900 }}>78 %</div></div>
            <div style={{ minHeight: 57, padding: '10px 13px', borderRadius: 17, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)' }}><div style={{ fontFamily: FT, fontSize: 10, color: 'rgba(255,255,255,.68)' }}>Vent</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 17, fontWeight: 900 }}>12 <small style={{ fontSize: 10, fontWeight: 750 }}>km/h</small></div></div>
          </div>

          <div style={{ marginTop: 16, fontFamily: FX, fontSize: 11, fontWeight: 850, color: 'rgba(255,255,255,.84)' }}>Prévisions sur 7 jours</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 5, marginTop: 8, flex: 1, minHeight: 137 }}>
            {forecast.map(([day, type, high, low], index) => (
              <div key={day} style={{ minWidth: 0, padding: '10px 2px 9px', borderRadius: 18, background: index === 0 ? 'linear-gradient(180deg, rgba(245,184,0,.32), rgba(255,255,255,.15))' : 'rgba(255,255,255,.12)', border: index === 0 ? '1px solid rgba(245,184,0,.56)' : '1px solid rgba(255,255,255,.17)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FT, fontSize: 9, fontWeight: index === 0 ? 850 : 700, color: index === 0 ? '#fff' : 'rgba(255,255,255,.76)' }}>{day}</span>
                <WeatherGlyph type={type} size={31}/>
                <strong style={{ fontFamily: FX, fontSize: 12, color: '#fff' }}>{high}</strong>
                <span style={{ fontFamily: FX, fontSize: 10, color: 'rgba(255,255,255,.67)' }}>{low}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Screen>
  );
}

function ParkingScreen() {
  const { back, navigate } = useNav();
  const parkings = [
    { name: 'Parking Nord', img: bImg('1506521781263-d8422e82f27a', 700), free: 240, capacity: 320, distance: '4 min' },
    { name: 'Parking Sud', img: bImg('1470224114660-3f6686c562eb', 700), free: 68, capacity: 180, distance: '7 min' },
  ];
  const totalFree = parkings.reduce((sum, parking) => sum + parking.free, 0);
  const totalCapacity = parkings.reduce((sum, parking) => sum + parking.capacity, 0);
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Parkings Smart City">
        <GreenHeader title="Parking" onBack={back}/>
        <div style={{ padding: '15px 16px 0' }}>
          <div style={{ padding: '15px 16px', borderRadius: 18, background: `linear-gradient(135deg, ${OK.green} 0%, ${OK.greenDeep} 100%)`, color: '#fff', boxShadow: '0 9px 24px rgba(11,124,57,.24)', display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 47, height: 47, borderRadius: 15, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.17)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FX, fontSize: 24, fontWeight: 900 }}>P</div>
            <div style={{ flex: 1 }}><div style={{ fontFamily: FT, fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,.72)' }}>DISPONIBILITÉ GLOBALE</div><div style={{ marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 6 }}><strong style={{ fontFamily: FX, fontSize: 25, lineHeight: 1, fontWeight: 900 }}>{totalFree}</strong><span style={{ fontFamily: FT, fontSize: 12, fontWeight: 750 }}>places libres sur {totalCapacity}</span></div></div>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: '#4BE28B', boxShadow: '0 0 0 4px rgba(75,226,139,.16), 0 0 10px rgba(75,226,139,.7)' }}/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '13px 16px 30px' }}>
          {parkings.map(p => (
            <button key={p.name} onClick={() => navigate('parking-reservation', { parking: p })} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', padding: 0, borderRadius: 19, overflow: 'hidden', position: 'relative', height: 174, boxShadow: '0 5px 17px rgba(0,0,0,0.13)' }}>
              <Img src={p.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(90deg, rgba(7,42,21,0.9) 0%, rgba(7,42,21,0.58) 60%, rgba(7,42,21,0.24) 100%)"/>
              <div style={{ position: 'absolute', left: 16, top: 16, right: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FX, fontWeight: 750, fontSize: 10.5, color: '#fff', background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,.14)', padding: '5px 10px', borderRadius: 999 }}><Icon name="pin" size={12} color="#fff" strokeWidth={2}/> {p.name}</span><span style={{ padding: '5px 9px', borderRadius: 999, background: 'rgba(3,29,16,.55)', color: '#fff', fontFamily: FT, fontSize: 10, fontWeight: 800 }}><Icon name="navigate" size={11} color={OK.gold}/> {p.distance}</span></div>
              </div>
              <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}><span style={{ fontFamily: FX, fontWeight: 800, fontSize: 34, color: '#fff', lineHeight: 0.9 }}>{p.free}</span><span style={{ fontFamily: FX, fontWeight: 700, fontSize: 13, color: OK.gold, marginBottom: 3 }}>places libres</span></div>
                <div style={{ height: 5, marginTop: 9, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,.2)' }}><span style={{ display: 'block', width: `${(p.free / p.capacity) * 100}%`, height: '100%', borderRadius: 999, background: p.free / p.capacity > .5 ? '#4BE28B' : OK.gold }}/></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 7, fontFamily: FT, fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,.82)' }}><span>24 h/24 · Sécurisé · PMR</span><span>{p.capacity - p.free} occupées</span></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function ParkingReservationScreen({ params }) {
  const { back } = useNav();
  const parking = params?.parking || { name: 'Parking Nord', free: 240, capacity: 320, distance: '4 min' };
  const [step, setStep] = useState(1);
  const [arrival, setArrival] = useState('now');
  const [duration, setDuration] = useState(2);
  const [plate, setPlate] = useState('');
  const [payment, setPayment] = useState('airtel');
  const [bookingCode] = useState(() => `OKP-${Date.now().toString().slice(-6)}`);
  const timeAfter = (minutes) => new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(Date.now() + minutes * 60000));
  const arrivals = [
    ['now', 'Maintenant', timeAfter(0)], ['30', 'Dans 30 min', timeAfter(30)], ['60', 'Dans 1 heure', timeAfter(60)],
  ];
  const durations = [[1, '1 heure', 500], [2, '2 heures', 1000], [4, '4 heures', 2000], [8, 'Journée', 3000]];
  const selectedDuration = durations.find(([hours]) => hours === duration) || durations[1];
  const selectedArrival = arrivals.find(([id]) => id === arrival) || arrivals[0];
  const payments = [
    { id: 'airtel', label: 'Airtel Money', color: '#E32636', logo: 'assets/payments/airtel.svg' },
    { id: 'moov', label: 'Moov Money', color: '#F36B21', logo: 'assets/payments/moov-money.png' },
    { id: 'card', label: 'Carte bancaire', color: '#2866B1', logos: ['assets/payments/visa.svg', 'assets/payments/mastercard.svg'] },
  ];
  const canContinue = plate.trim().length >= 3;
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Réservation parking">
        <GreenHeader title={step === 3 ? 'Réservation confirmée' : 'Réserver une place'} onBack={back}/>
        {step < 3 && <div style={{ display: 'flex', gap: 6, padding: '14px 18px 0' }}>{[1, 2].map(item => <span key={item} style={{ flex: 1, height: 4, borderRadius: 999, background: item <= step ? OK.gold : '#D8E2DB', transition: 'background .2s ease' }}/>)}</div>}

        {step === 1 && <div style={{ padding: '14px 16px 32px' }}>
          <div style={{ padding: 14, borderRadius: 17, background: '#fff', border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(11,124,57,.1)', color: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FX, fontSize: 22, fontWeight: 900 }}>P</div>
            <div style={{ flex: 1 }}><div style={{ fontFamily: FX, fontSize: 14, fontWeight: 850, color: OK.ink }}>{parking.name}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 10.5, fontWeight: 650, color: OK.ink3 }}>{parking.free} places libres · à {parking.distance || 'quelques minutes'}</div></div>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#37C978', boxShadow: '0 0 0 4px rgba(55,201,120,.14)' }}/>
          </div>

          <div style={{ marginTop: 18, fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Heure d’arrivée</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7, marginTop: 9 }}>
            {arrivals.map(([id, label, time]) => <button key={id} onClick={() => setArrival(id)} style={{ minHeight: 67, padding: '9px 5px', borderRadius: 14, border: arrival === id ? `1.5px solid ${OK.green}` : `1px solid ${OK.line}`, background: arrival === id ? 'rgba(11,124,57,.08)' : '#fff', cursor: 'pointer' }}><div style={{ fontFamily: FT, fontSize: 9.5, fontWeight: 700, color: arrival === id ? OK.green : OK.ink3 }}>{label}</div><div style={{ marginTop: 4, fontFamily: FX, fontSize: 14, fontWeight: 900, color: OK.ink }}>{time}</div></button>)}
          </div>

          <div style={{ marginTop: 18, fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Durée</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 9 }}>
            {durations.map(([hours, label, price]) => <button key={hours} onClick={() => setDuration(hours)} style={{ minHeight: 62, padding: '10px 12px', borderRadius: 14, border: duration === hours ? `1.5px solid ${OK.green}` : `1px solid ${OK.line}`, background: duration === hours ? 'rgba(11,124,57,.08)' : '#fff', cursor: 'pointer', textAlign: 'left' }}><div style={{ fontFamily: FX, fontSize: 12.5, fontWeight: 850, color: OK.ink }}>{label}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 10.5, fontWeight: 750, color: duration === hours ? OK.green : OK.ink3 }}>{fcfa(price)}</div></button>)}
          </div>

          <label style={{ display: 'block', marginTop: 18 }}><span style={{ fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Immatriculation du véhicule</span><div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 50, marginTop: 9, padding: '0 13px', borderRadius: 14, border: `1px solid ${plate ? OK.green : OK.line}`, background: '#fff' }}><Icon name="car" size={18} color={OK.green}/><input value={plate} onChange={event => setPlate(event.target.value.toUpperCase())} maxLength={12} placeholder="Ex. GA 1234 AA" style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FX, fontSize: 14, fontWeight: 800, color: OK.ink, textTransform: 'uppercase' }}/></div></label>

          <button disabled={!canContinue} onClick={() => setStep(2)} style={{ width: '100%', height: 50, marginTop: 21, borderRadius: 14, border: 'none', background: canContinue ? OK.green : '#AABBB1', color: '#fff', fontFamily: FX, fontSize: 13, fontWeight: 850, cursor: canContinue ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>Continuer<Icon name="chev-r" size={16} color="#fff" strokeWidth={2.2}/></button>
        </div>}

        {step === 2 && <div style={{ padding: '14px 16px 32px' }}>
          <div style={{ padding: 15, borderRadius: 18, background: '#fff', border: `1px solid ${OK.line}` }}>
            <div style={{ fontFamily: FX, fontSize: 14, fontWeight: 850, color: OK.ink }}>Récapitulatif</div>
            {[
              ['Parking', parking.name], ['Arrivée', `${selectedArrival[1]} · ${selectedArrival[2]}`],
              ['Durée', selectedDuration[1]], ['Véhicule', plate],
            ].map(([label, value], index) => <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderTop: index ? `1px solid ${OK.line}` : 'none', fontFamily: FT, fontSize: 11.5 }}><span style={{ color: OK.ink3 }}>{label}</span><strong style={{ color: OK.ink, textAlign: 'right' }}>{value}</strong></div>)}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 13, borderTop: `1px solid ${OK.line}` }}><span style={{ fontFamily: FX, fontSize: 13, fontWeight: 850, color: OK.ink }}>Total</span><strong style={{ fontFamily: FX, fontSize: 21, fontWeight: 900, color: OK.green }}>{fcfa(selectedDuration[2])}</strong></div>
          </div>

          <div style={{ marginTop: 18, fontFamily: FX, fontSize: 13.5, fontWeight: 850, color: OK.ink }}>Moyen de paiement</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 9 }}>
            {payments.map(method => <button key={method.id} onClick={() => setPayment(method.id)} style={{ minHeight: 64, padding: '0 13px', borderRadius: 14, border: payment === method.id ? `1.5px solid ${method.color}` : `1px solid ${OK.line}`, background: payment === method.id ? `${method.color}10` : '#fff', display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer', textAlign: 'left' }}><span style={{ width: 58, height: 40, flexShrink: 0, padding: method.id === 'moov' ? 0 : 6, borderRadius: 10, overflow: 'hidden', background: method.id === 'moov' ? '#F36B21' : '#fff', border: '1px solid rgba(18,48,31,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, boxSizing: 'border-box' }}>{method.logo ? <img src={method.logo} alt={method.label} style={{ width: method.id === 'airtel' ? 35 : '100%', height: method.id === 'airtel' ? 35 : '100%', objectFit: 'contain', display: 'block' }}/> : method.logos.map((logo, index) => <img key={logo} src={logo} alt={index === 0 ? 'Visa' : 'Mastercard'} style={{ width: index === 0 ? 27 : 24, maxHeight: 24, objectFit: 'contain', display: 'block' }}/>)}</span><span style={{ flex: 1, fontFamily: FX, fontSize: 12.5, fontWeight: 800, color: OK.ink }}>{method.label}</span><span style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${payment === method.id ? method.color : '#BAC7BF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{payment === method.id && <span style={{ width: 8, height: 8, borderRadius: 999, background: method.color }}/>}</span></button>)}
          </div>

          <button onClick={() => setStep(3)} style={{ width: '100%', height: 50, marginTop: 21, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', fontFamily: FX, fontSize: 13, fontWeight: 850, cursor: 'pointer' }}>Confirmer · {fcfa(selectedDuration[2])}</button>
          <button onClick={() => setStep(1)} style={{ width: '100%', height: 42, marginTop: 7, border: 'none', background: 'transparent', color: OK.green, fontFamily: FT, fontSize: 11.5, fontWeight: 800, cursor: 'pointer' }}>Modifier la réservation</button>
        </div>}

        {step === 3 && <div style={{ padding: '24px 18px 34px', textAlign: 'center' }}>
          <div style={{ width: 76, height: 76, margin: '0 auto', borderRadius: 999, background: 'rgba(11,124,57,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(11,124,57,.05)' }}><Icon name="verified" size={38} color={OK.green} strokeWidth={2}/></div>
          <h1 style={{ margin: '20px 0 0', fontFamily: FX, fontSize: 23, fontWeight: 900, color: OK.ink }}>Votre place est réservée</h1>
          <p style={{ margin: '8px auto 0', maxWidth: 285, fontFamily: FT, fontSize: 12.5, lineHeight: 1.55, color: OK.ink3 }}>Présentez le code ci-dessous à l’entrée du {parking.name}.</p>
          <div style={{ marginTop: 20, padding: '21px 15px', borderRadius: 20, background: '#fff', border: `1px solid ${OK.line}`, boxShadow: '0 8px 24px rgba(18,51,31,.08)' }}>
            <div style={{ fontFamily: FT, fontSize: 10, fontWeight: 750, letterSpacing: .7, color: OK.ink3 }}>CODE D’ACCÈS</div>
            <div style={{ marginTop: 7, fontFamily: FX, fontSize: 29, fontWeight: 900, letterSpacing: 2, color: OK.green }}>{bookingCode}</div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${OK.line}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}><div><div style={{ fontFamily: FT, fontSize: 9.5, color: OK.ink3 }}>Arrivée</div><strong style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink }}>{selectedArrival[2]}</strong></div><div><div style={{ fontFamily: FT, fontSize: 9.5, color: OK.ink3 }}>Véhicule</div><strong style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink }}>{plate}</strong></div></div>
          </div>
          <button onClick={back} style={{ width: '100%', height: 50, marginTop: 22, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', fontFamily: FX, fontSize: 13, fontWeight: 850, cursor: 'pointer' }}>Retour aux parkings</button>
        </div>}
      </div>
    </Screen>
  );
}

const BAIE_PHARMACIES = [
  { id: 'sainte-marie', name: 'Pharmacie Sainte Marie', lat: .404486, lon: 9.4366837, distance: .52, address: '198, Boulevard Triomphal Omar Bongo Ondimba', hours: 'Lun–Sam 07:30–21:00 · Dim 08:00–20:00', schedule: { weekday: [450, 1260], sunday: [480, 1200] }, phone: '+24111740052', whatsapp: '+24160054426', delivery: true },
  { id: 'forestiers', name: 'Pharmacie Les Forestiers', lat: .4061787, lon: 9.437012, distance: .70, address: 'Boulevard Triomphal Omar Bongo Ondimba', hours: 'Lun–Sam 08:45–19:15', schedule: { weekday: [525, 1155], sunday: null }, phone: null },
  { id: 'orchidee', name: 'Pharmacie L’Orchidée', lat: .4074858, lon: 9.4313188, distance: .78, address: 'Avenue Joseph Deemin, Louis', hours: 'Ouverte 24 h/24', alwaysOpen: true, phone: '+24105190284' },
  { id: 'saint-esprit', name: 'Pharmacie du Saint-Esprit', lat: .4110222, lon: 9.4370681, distance: 1.19, address: 'Plaine Orety, 1er arrondissement', hours: 'Tous les jours 08:00–21:00', schedule: { weekday: [480, 1260], sunday: [480, 1260] }, phone: '+24107282772' },
  { id: 'orety', name: 'Pharmacie Orety', lat: .4136025, lon: 9.4329027, distance: 1.42, address: '1118, Avenue Joseph Deemin', hours: 'Tous les jours 08:00–21:00', schedule: { weekday: [480, 1260], sunday: [480, 1260] }, phone: null },
  { id: 'gabonaise', name: 'Pharmacie Gabonaise', lat: .3952432, lon: 9.4468756, distance: 1.60, address: 'Avenue Félix Éboué, Centre-ville', hours: 'Horaires à confirmer', schedule: null, phone: '+241743071' },
  { id: 'gare-routiere', name: 'Pharmacie de la Gare routière', lat: .4039179, lon: 9.4504872, distance: 1.90, address: 'Boulevard Monseigneur Jean-Rémi Bessieux', hours: 'Lun–Sam 07:00–20:30', schedule: { weekday: [420, 1230], sunday: null }, phone: '+24101761672' },
];

const PHARMACY_OSM_TILES = Array.from({ length: 3 }, (_, row) =>
  Array.from({ length: 3 }, (_, col) => ({ x: 17242 + col, y: 16346 + row }))
).flat();

function pharmacyOpenStatus(pharmacy, date = new Date()) {
  if (pharmacy.alwaysOpen) return 'open';
  if (!pharmacy.schedule) return 'unknown';
  const range = date.getDay() === 0 ? pharmacy.schedule.sunday : pharmacy.schedule.weekday;
  if (!range) return 'closed';
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= range[0] && minutes < range[1] ? 'open' : 'closed';
}

function pharmacyMapPoint(pharmacy) {
  const zoom = 15;
  const scale = 2 ** zoom;
  const x = (pharmacy.lon + 180) / 360 * scale;
  const latitude = pharmacy.lat * Math.PI / 180;
  const y = (1 - Math.asinh(Math.tan(latitude)) / Math.PI) / 2 * scale;
  return { x: (x - 17242) * 256, y: (y - 16346) * 256 };
}

function PharmacyStatus({ status }) {
  const config = status === 'open' ? ['Ouverte', '#168B4A'] : status === 'closed' ? ['Fermée', '#78877E'] : ['À confirmer', '#C28A17'];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FT, fontSize: 10, fontWeight: 850, color: config[1] }}><span style={{ width: 7, height: 7, borderRadius: 999, background: config[1], boxShadow: status === 'open' ? '0 0 0 3px rgba(22,139,74,.12)' : 'none' }}/>{config[0]}</span>;
}

function PharmaciesScreen() {
  const { back } = useNav();
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(BAIE_PHARMACIES[0].id);
  const normalized = query.trim().toLowerCase();
  const pharmacies = BAIE_PHARMACIES.filter(pharmacy => {
    const status = pharmacyOpenStatus(pharmacy);
    const matchesSearch = !normalized || `${pharmacy.name} ${pharmacy.address}`.toLowerCase().includes(normalized);
    const matchesFilter = filter === 'all' || (filter === 'open' && status === 'open') || (filter === '24h' && pharmacy.alwaysOpen) || (filter === 'delivery' && pharmacy.delivery);
    return matchesSearch && matchesFilter;
  });
  const selectedPharmacy = BAIE_PHARMACIES.find(pharmacy => pharmacy.id === selected) || pharmacies[0] || BAIE_PHARMACIES[0];
  const callPharmacy = (pharmacy) => pharmacy.phone ? window.open(`tel:${pharmacy.phone}`, '_self') : notifyDemo('Numéro à confirmer');
  const whatsappPharmacy = (pharmacy) => pharmacy.whatsapp ? window.open(`https://wa.me/${pharmacy.whatsapp.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer') : notifyDemo('WhatsApp indisponible');
  const routeToPharmacy = (pharmacy) => window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=0.4008782%2C9.4336470%3B${pharmacy.lat}%2C${pharmacy.lon}`, '_blank', 'noopener,noreferrer');
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Pharmacies Baie des Rois">
        <GreenHeader title="Pharmacies" onBack={back}/>
        <div style={{ padding: '13px 15px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 46, padding: '0 12px', borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}` }}><Icon name="search" size={17} color={OK.ink3}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher une pharmacie" style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FT, fontSize: 12.5, color: OK.ink }}/></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginTop: 10, padding: 4, borderRadius: 13, background: '#DCE6DF' }}>
            {[['list', 'Liste'], ['map', 'Carte']].map(([id, label]) => <button key={id} onClick={() => setView(id)} style={{ height: 36, border: 'none', borderRadius: 10, background: view === id ? '#fff' : 'transparent', color: view === id ? OK.green : OK.ink3, boxShadow: view === id ? '0 2px 8px rgba(20,51,31,.09)' : 'none', fontFamily: FX, fontSize: 11.5, fontWeight: 850, cursor: 'pointer' }}><Icon name={id === 'map' ? 'map' : 'list'} size={14} color={view === id ? OK.green : OK.ink3}/> {label}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', padding: '10px 0 2px', scrollbarWidth: 'none' }}>
            {[['all', 'Toutes'], ['open', 'Ouvertes'], ['24h', '24 h/24'], ['delivery', 'Livraison']].map(([id, label]) => <button key={id} onClick={() => setFilter(id)} style={{ flexShrink: 0, height: 32, padding: '0 12px', borderRadius: 999, border: filter === id ? 'none' : `1px solid ${OK.line}`, background: filter === id ? OK.green : '#fff', color: filter === id ? '#fff' : OK.ink2, fontFamily: FT, fontSize: 10.5, fontWeight: 800, cursor: 'pointer' }}>{label}</button>)}
          </div>
        </div>

        {view === 'list' && <div style={{ padding: '10px 15px 30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {pharmacies.map(pharmacy => {
              const status = pharmacyOpenStatus(pharmacy);
              return <article key={pharmacy.id} style={{ padding: 13, borderRadius: 17, background: '#fff', border: `1px solid ${OK.line}`, boxShadow: '0 4px 13px rgba(20,51,31,.05)' }}>
                <div style={{ display: 'flex', gap: 11 }}>
                  <div style={{ width: 48, height: 48, flexShrink: 0, padding: 3, borderRadius: 14, overflow: 'hidden', background: '#fff', border: '1px solid rgba(11,124,57,.13)', boxSizing: 'border-box' }}><img src="assets/pharmacy-default-logo.jpg" alt="Symbole de pharmacie" style={{ width: '100%', height: '100%', borderRadius: 10, objectFit: 'contain', display: 'block' }}/></div>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><h2 style={{ margin: 0, fontFamily: FX, fontSize: 13.5, lineHeight: 1.25, fontWeight: 850, color: OK.ink }}>{pharmacy.name}</h2><span style={{ flexShrink: 0, fontFamily: FX, fontSize: 11, fontWeight: 850, color: OK.green }}>{pharmacy.distance.toFixed(2).replace('.', ',')} km</span></div><div style={{ marginTop: 4 }}><PharmacyStatus status={status}/></div><div style={{ marginTop: 5, fontFamily: FT, fontSize: 10.5, lineHeight: 1.4, color: OK.ink3 }}>{pharmacy.address}</div></div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>{pharmacy.alwaysOpen && <span style={{ padding: '4px 8px', borderRadius: 999, background: 'rgba(245,184,0,.13)', color: '#9B6B00', fontFamily: FT, fontSize: 9, fontWeight: 800 }}>24 h/24</span>}{pharmacy.delivery && <span style={{ padding: '4px 8px', borderRadius: 999, background: 'rgba(11,124,57,.09)', color: OK.green, fontFamily: FT, fontSize: 9, fontWeight: 800 }}>Livraison</span>}<span style={{ padding: '4px 8px', borderRadius: 999, background: OK.bg2, color: OK.ink2, fontFamily: FT, fontSize: 9, fontWeight: 700 }}>{pharmacy.hours}</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: pharmacy.whatsapp ? '1fr 1fr 1fr' : '1fr 1fr', gap: 7, marginTop: 11 }}>
                  <button onClick={() => callPharmacy(pharmacy)} style={{ height: 36, borderRadius: 11, border: `1px solid ${OK.line}`, background: '#fff', color: OK.green, fontFamily: FT, fontSize: 10, fontWeight: 850, cursor: 'pointer' }}><Icon name="phone" size={13} color={OK.green}/> Appeler</button>
                  {pharmacy.whatsapp && <button onClick={() => whatsappPharmacy(pharmacy)} style={{ height: 36, borderRadius: 11, border: 'none', background: '#21B35B', color: '#fff', fontFamily: FT, fontSize: 10, fontWeight: 850, cursor: 'pointer' }}><Icon name="whatsapp" size={13} color="#fff"/> WhatsApp</button>}
                  <button onClick={() => routeToPharmacy(pharmacy)} style={{ height: 36, borderRadius: 11, border: 'none', background: OK.green, color: '#fff', fontFamily: FT, fontSize: 10, fontWeight: 850, cursor: 'pointer' }}><Icon name="navigate" size={13} color="#fff"/> Itinéraire</button>
                </div>
              </article>;
            })}
          </div>
          {!pharmacies.length && <div style={{ padding: '45px 20px', textAlign: 'center', fontFamily: FT, fontSize: 12, color: OK.ink3 }}>Aucune pharmacie ne correspond à ces filtres.</div>}
        </div>}

        {view === 'map' && <div style={{ position: 'relative', height: 590, margin: '10px 15px 28px', borderRadius: 20, overflow: 'hidden', background: '#D9E1DD', border: `1px solid ${OK.line}`, boxShadow: '0 8px 24px rgba(18,51,31,.12)' }}>
          <div style={{ position: 'absolute', left: 'calc(50% - 256px)', top: 0, width: 768, height: 768, display: 'grid', gridTemplateColumns: 'repeat(3, 256px)', gridTemplateRows: 'repeat(3, 256px)', transform: 'scale(.75)', transformOrigin: '0 0', filter: 'saturate(.78) contrast(.98)' }}>
            {PHARMACY_OSM_TILES.map(({ x, y }) => <img key={`${x}-${y}`} src={`assets/maps/pharmacies/z15-${x}-${y}.png`} alt="" draggable={false} style={{ width: 256, height: 256, display: 'block' }}/>) }
            {pharmacies.map(pharmacy => {
              const point = pharmacyMapPoint(pharmacy);
              const status = pharmacyOpenStatus(pharmacy);
              const active = selected === pharmacy.id;
              return <button key={pharmacy.id} onClick={() => setSelected(pharmacy.id)} aria-label={pharmacy.name} style={{ position: 'absolute', left: point.x, top: point.y, width: active ? 50 : 40, height: active ? 50 : 40, transform: 'translate(-50%, -50%)', borderRadius: 999, border: '3px solid #fff', background: status === 'open' ? OK.green : status === 'closed' ? '#78877E' : '#C28A17', color: '#fff', boxShadow: active ? '0 0 0 7px rgba(11,124,57,.16), 0 5px 14px rgba(14,46,28,.28)' : '0 3px 10px rgba(14,46,28,.24)', cursor: 'pointer', zIndex: active ? 10 : 5, transition: 'width .18s ease, height .18s ease' }}><span style={{ fontSize: active ? 22 : 18, fontWeight: 900, lineHeight: 1 }}>+</span></button>;
            })}
          </div>
          <div style={{ position: 'absolute', left: 11, right: 11, bottom: 11, padding: 12, borderRadius: 16, background: 'rgba(255,255,255,.96)', boxShadow: '0 7px 24px rgba(18,48,31,.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 9 }}><div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}><img src="assets/pharmacy-default-logo.jpg" alt="" style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, objectFit: 'contain', border: '1px solid rgba(11,124,57,.12)' }}/><div><div style={{ fontFamily: FX, fontSize: 12.5, fontWeight: 850, color: OK.ink }}>{selectedPharmacy.name}</div><div style={{ marginTop: 3 }}><PharmacyStatus status={pharmacyOpenStatus(selectedPharmacy)}/></div></div></div><strong style={{ flexShrink: 0, fontFamily: FX, fontSize: 11.5, color: OK.green }}>{selectedPharmacy.distance.toFixed(2).replace('.', ',')} km</strong></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 10 }}><button onClick={() => callPharmacy(selectedPharmacy)} style={{ height: 36, borderRadius: 11, border: `1px solid ${OK.line}`, background: '#fff', color: OK.green, fontFamily: FT, fontSize: 10, fontWeight: 850, cursor: 'pointer' }}>Appeler</button><button onClick={() => routeToPharmacy(selectedPharmacy)} style={{ height: 36, borderRadius: 11, border: 'none', background: OK.green, color: '#fff', fontFamily: FT, fontSize: 10, fontWeight: 850, cursor: 'pointer' }}>Itinéraire</button></div>
          </div>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" style={{ position: 'absolute', right: 7, top: 7, zIndex: 20, padding: '4px 6px', borderRadius: 5, background: 'rgba(255,255,255,.9)', color: '#42534A', fontFamily: FT, fontSize: 8, fontWeight: 700, textDecoration: 'none' }}>© OpenStreetMap</a>
        </div>}
      </div>
    </Screen>
  );
}

const FUEL_BRANDS = {
  engen: { label: 'Engen', logo: 'assets/fuel/engen.png', color: '#063B91', soft: '#EEF3FF' },
  ola: { label: 'OLA Energy', logo: 'assets/fuel/ola-energy.png', color: '#F47721', soft: '#FFF3EA' },
  petrogabon: { label: 'PetroGabon', logo: 'assets/fuel/petrogabon.png', color: '#008E43', soft: '#EAF8F0' },
};

const BAIE_FUEL_STATIONS = [
  { id: 'engen-arambo', name: 'Engen Arambo', brand: 'engen', lat: .4004346, lon: 9.4379585, distance: .48, address: 'Boulevard de l’Indépendance, Arambo' },
  { id: 'ola-mbolo', name: 'OLA Energy Mbolo', brand: 'ola', lat: .4054757, lon: 9.4369352, distance: .63, address: '277, Boulevard Triomphal Omar Bongo' },
  { id: 'engen-quaben', name: 'Engen Quaben', brand: 'engen', lat: .4165572, lon: 9.4335471, distance: 1.74, address: '828, Avenue Jean-Jacques Boucavel, Quaben' },
  { id: 'engen-atong-abe', name: 'Engen Atong Abè', brand: 'engen', lat: .4070527, lon: 9.4509579, distance: 2.04, address: 'Avenue Lubin Martial Ntoutoume Obame' },
  { id: 'engen-nombakele', name: 'Engen Nombakélé', brand: 'engen', lat: .3885619, lon: 9.4504019, distance: 2.31, address: '23, Rue Jacques Akiremy, Nombakélé' },
  { id: 'engen-likouala', name: 'Engen Likouala', brand: 'engen', lat: .3882797, lon: 9.4521468, distance: 2.49, address: 'Avenue Docteur Albert Schweitzer, Likouala' },
  { id: 'petrogabon-batavea', name: 'PetroGabon Batavéa 1', brand: 'petrogabon', lat: .3874515, lon: 9.4532727, distance: 2.64, address: 'Avenue Pierre-Marie Agondjo Okawe, Batavéa' },
  { id: 'ola-akebe-ville', name: 'OLA Energy Akébé-Ville', brand: 'ola', lat: .3935951, lon: 9.4582053, distance: 2.85, address: 'Avenue Docteur Albert Schweitzer, Akébé-Ville' },
];

const FUEL_OSM_TILES = Array.from({ length: 2 }, (_, row) =>
  Array.from({ length: 2 }, (_, col) => ({ x: 8621 + col, y: 8173 + row }))
).flat();

function fuelMapPoint(station) {
  const zoom = 14;
  const scale = 2 ** zoom;
  const x = (station.lon + 180) / 360 * scale;
  const latitude = station.lat * Math.PI / 180;
  const y = (1 - Math.asinh(Math.tan(latitude)) / Math.PI) / 2 * scale;
  return { x: (x - 8621) * 256, y: (y - 8173) * 256 };
}

function FuelBrandLogo({ brand, size = 50 }) {
  const config = FUEL_BRANDS[brand] || FUEL_BRANDS.engen;
  return <div style={{ width: size, height: size, flexShrink: 0, padding: brand === 'petrogabon' ? 4 : 5, borderRadius: 14, overflow: 'hidden', background: '#fff', border: `1px solid ${config.color}24`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={config.logo} alt={`Logo ${config.label}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}/></div>;
}

function FuelStationsScreen() {
  const { back } = useNav();
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(BAIE_FUEL_STATIONS[0].id);
  const normalized = query.trim().toLowerCase();
  const stations = BAIE_FUEL_STATIONS.filter(station => {
    const brand = FUEL_BRANDS[station.brand];
    const matchesSearch = !normalized || `${station.name} ${station.address} ${brand.label}`.toLowerCase().includes(normalized);
    return matchesSearch && (filter === 'all' || station.brand === filter);
  });
  const selectedStation = stations.find(station => station.id === selected) || stations[0] || BAIE_FUEL_STATIONS[0];
  const routeToStation = (station) => window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=0.4008782%2C9.4336470%3B${station.lat}%2C${station.lon}`, '_blank', 'noopener,noreferrer');
  const selectBrand = (brand) => {
    setFilter(brand);
    const first = BAIE_FUEL_STATIONS.find(station => brand === 'all' || station.brand === brand);
    if (first) setSelected(first.id);
  };
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Stations carburant Baie des Rois">
        <GreenHeader title="Carburant" onBack={back}/>
        <div style={{ padding: '13px 15px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 46, padding: '0 12px', borderRadius: 14, background: '#fff', border: `1px solid ${OK.line}` }}><Icon name="search" size={17} color={OK.ink3}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher une station ou une enseigne" style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FT, fontSize: 12, color: OK.ink }}/></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginTop: 10, padding: 4, borderRadius: 13, background: '#DCE6DF' }}>
            {[['list', 'Liste'], ['map', 'Carte']].map(([id, label]) => <button key={id} onClick={() => setView(id)} style={{ height: 36, border: 'none', borderRadius: 10, background: view === id ? '#fff' : 'transparent', color: view === id ? OK.green : OK.ink3, boxShadow: view === id ? '0 2px 8px rgba(20,51,31,.09)' : 'none', fontFamily: FX, fontSize: 11.5, fontWeight: 850, cursor: 'pointer' }}><Icon name={id === 'map' ? 'map' : 'list'} size={14} color={view === id ? OK.green : OK.ink3}/> {label}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', padding: '10px 0 2px', scrollbarWidth: 'none' }}>
            {[['all', 'Toutes'], ['engen', 'Engen'], ['ola', 'OLA Energy'], ['petrogabon', 'PetroGabon']].map(([id, label]) => <button key={id} onClick={() => selectBrand(id)} style={{ flexShrink: 0, height: 34, padding: '0 12px', borderRadius: 999, border: filter === id ? 'none' : `1px solid ${OK.line}`, background: filter === id ? (FUEL_BRANDS[id]?.color || OK.green) : '#fff', color: filter === id ? '#fff' : OK.ink2, fontFamily: FT, fontSize: 10.5, fontWeight: 850, cursor: 'pointer' }}>{label}</button>)}
          </div>
        </div>

        {view === 'list' && <div style={{ padding: '10px 15px 30px' }}>
          <div style={{ marginBottom: 9, fontFamily: FT, fontSize: 10.5, fontWeight: 700, color: OK.ink3 }}>{stations.length} station{stations.length > 1 ? 's' : ''} référencée{stations.length > 1 ? 's' : ''} à proximité</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {stations.map(station => {
              const brand = FUEL_BRANDS[station.brand];
              return <article key={station.id} style={{ padding: 13, borderRadius: 17, background: '#fff', border: `1px solid ${OK.line}`, boxShadow: '0 4px 13px rgba(20,51,31,.05)' }}>
                <div style={{ display: 'flex', gap: 11 }}>
                  <FuelBrandLogo brand={station.brand} size={52}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><h2 style={{ margin: 0, fontFamily: FX, fontSize: 13.5, lineHeight: 1.25, fontWeight: 850, color: OK.ink }}>{station.name}</h2><span style={{ flexShrink: 0, fontFamily: FX, fontSize: 11, fontWeight: 850, color: OK.green }}>{station.distance.toFixed(2).replace('.', ',')} km</span></div>
                    <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FT, fontSize: 9.5, fontWeight: 850, color: brand.color }}><span style={{ width: 6, height: 6, borderRadius: 999, background: brand.color }}/>{brand.label}</div>
                    <div style={{ marginTop: 5, fontFamily: FT, fontSize: 10.5, lineHeight: 1.4, color: OK.ink3 }}>{station.address}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 11, background: brand.soft, fontFamily: FT, fontSize: 9.5, lineHeight: 1.4, color: OK.ink2 }}>Prix, horaires et disponibilité à confirmer directement auprès de l’enseigne.</div>
                <button onClick={() => routeToStation(station)} style={{ width: '100%', height: 38, marginTop: 10, borderRadius: 11, border: 'none', background: OK.green, color: '#fff', fontFamily: FT, fontSize: 10.5, fontWeight: 850, cursor: 'pointer' }}><Icon name="navigate" size={13} color="#fff"/> Lancer l’itinéraire</button>
              </article>;
            })}
          </div>
          {!stations.length && <div style={{ padding: '45px 20px', textAlign: 'center', fontFamily: FT, fontSize: 12, color: OK.ink3 }}>Aucune station ne correspond à cette recherche.</div>}
        </div>}

        {view === 'map' && <div style={{ position: 'relative', height: 520, margin: '10px 15px 28px', borderRadius: 20, overflow: 'hidden', background: '#D9E1DD', border: `1px solid ${OK.line}`, boxShadow: '0 8px 24px rgba(18,51,31,.12)' }}>
          <div style={{ position: 'absolute', left: 'calc(50% - 206px)', top: 0, width: 512, height: 512, display: 'grid', gridTemplateColumns: 'repeat(2, 256px)', gridTemplateRows: 'repeat(2, 256px)', filter: 'saturate(.78) contrast(.98)' }}>
            {FUEL_OSM_TILES.map(({ x, y }) => <img key={`${x}-${y}`} src={`assets/maps/fuel/z14-${x}-${y}.png`} alt="" draggable={false} style={{ width: 256, height: 256, display: 'block' }}/>) }
            <span aria-label="Baie des Rois" style={{ position: 'absolute', left: 85.95, top: 193.39, width: 18, height: 18, transform: 'translate(-50%, -50%)', borderRadius: 999, background: '#2478E5', border: '4px solid #fff', boxShadow: '0 0 0 6px rgba(36,120,229,.18), 0 3px 9px rgba(0,42,100,.3)', zIndex: 7 }}/>
            {stations.map(station => {
              const point = fuelMapPoint(station);
              const brand = FUEL_BRANDS[station.brand];
              const active = selectedStation.id === station.id;
              return <button key={station.id} onClick={() => setSelected(station.id)} aria-label={station.name} style={{ position: 'absolute', left: point.x, top: point.y, width: active ? 48 : 39, height: active ? 48 : 39, transform: 'translate(-50%, -50%)', borderRadius: 999, border: '3px solid #fff', background: brand.color, color: '#fff', boxShadow: active ? `0 0 0 7px ${brand.color}28, 0 5px 14px rgba(14,46,28,.28)` : '0 3px 10px rgba(14,46,28,.24)', cursor: 'pointer', zIndex: active ? 10 : 8, transition: 'width .18s ease, height .18s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="fuel" size={active ? 21 : 17} color="#fff" strokeWidth={2}/></button>;
            })}
          </div>
          <div style={{ position: 'absolute', left: 11, right: 11, bottom: 11, padding: 12, borderRadius: 16, background: 'rgba(255,255,255,.96)', boxShadow: '0 7px 24px rgba(18,48,31,.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 9 }}><div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}><FuelBrandLogo brand={selectedStation.brand} size={40}/><div style={{ minWidth: 0 }}><div style={{ fontFamily: FX, fontSize: 12.5, fontWeight: 850, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedStation.name}</div><div style={{ marginTop: 3, fontFamily: FT, fontSize: 9.5, color: FUEL_BRANDS[selectedStation.brand].color, fontWeight: 800 }}>{FUEL_BRANDS[selectedStation.brand].label}</div></div></div><strong style={{ flexShrink: 0, fontFamily: FX, fontSize: 11.5, color: OK.green }}>{selectedStation.distance.toFixed(2).replace('.', ',')} km</strong></div>
            <div style={{ marginTop: 7, fontFamily: FT, fontSize: 9.5, lineHeight: 1.35, color: OK.ink3 }}>{selectedStation.address}</div>
            <button onClick={() => routeToStation(selectedStation)} style={{ width: '100%', height: 37, marginTop: 9, borderRadius: 11, border: 'none', background: OK.green, color: '#fff', fontFamily: FT, fontSize: 10.5, fontWeight: 850, cursor: 'pointer' }}><Icon name="navigate" size={13} color="#fff"/> Itinéraire</button>
          </div>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" style={{ position: 'absolute', right: 7, top: 7, zIndex: 20, padding: '4px 6px', borderRadius: 5, background: 'rgba(255,255,255,.9)', color: '#42534A', fontFamily: FT, fontSize: 8, fontWeight: 700, textDecoration: 'none' }}>© OpenStreetMap</a>
        </div>}
      </div>
    </Screen>
  );
}

function SmartCityScreen() {
  const { back, navigate } = useNav();
  const modules = [
    { id: 'info', title: 'Informations', img: 'assets/smartcity-information.jpg' },
    { id: 'trafic', title: 'Trafic', img: 'assets/smartcity-trafic.jpg' },
    { id: 'meteo', title: 'Météo', img: 'assets/smartcity-meteo.jpg' },
    { id: 'parking', title: 'Parking', img: 'assets/smartcity-parking.jpg' },
    { id: 'pharmacie', title: 'Pharmacie', img: 'assets/smartcity-pharmacie.png' },
    { id: 'carburant', title: 'Carburant', img: 'assets/smartcity-carburant.jpg' },
    { id: 'recharge', title: 'Borne de recharge', img: 'assets/smartcity-recharge.jpg' },
    { id: 'location', title: 'Location', img: bImg('1489824904134-891ab64532f1', 300) },
    { id: 'commerce', title: 'Commerce', img: bImg('1604719312566-8912e9227c6a', 300) },
  ];
  // Vrais événements « espaces de jeux » au Gabon
  const events = [
    { title: 'Festival Japanim Gabon', date: '10–12 juil.', venue: 'La Baie des Rois', tag: 'Manga · Jeux vidéo · Cosplay', img: bImg('1511882150382-421056c89033', 700) },
    { title: 'CAN Esport', date: 'Août 2026', venue: 'Libreville', tag: 'Tournoi panafricain', img: bImg('1489599849927-2ee91cede3ba', 700) },
    { title: 'Libreville Gaming', date: 'Sept. 2026', venue: 'Espace jeux · Baie des Rois', tag: 'FIFA · Mortal Kombat', img: bImg('1560859251-d563a49c5e4a', 700) },
  ];
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % (events.length + 1)), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Smart City">
        <GreenHeader title="Smart City" onBack={back}/>

        {/* Carte principale : slide météo+trafic → événements espaces de jeux */}
        <div style={{ padding: '14px 16px 0' }}>
          <div data-auto-carousel="smart-city" className="okaba-auto-card--smart" style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', height: 196, boxShadow: '0 10px 26px rgba(11,124,57,0.28)' }}>
            {/* Slide 0 : météo + trafic */}
            <div style={{ position: 'absolute', inset: 0, display: slide === 0 ? 'block' : 'none', animation: slide === 0 ? 'okabaCarouselIn .28s ease-out' : 'none', pointerEvents: slide === 0 ? 'auto' : 'none',
              background: 'linear-gradient(135deg, #0B7C39 0%, #074321 100%)' }}>
              <Img src="assets/baie-cover.png" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}/>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(9,66,33,0.8) 0%, rgba(7,42,21,0.92) 100%)' }}/>
              <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: FT, fontWeight: 800, fontSize: 34, letterSpacing: 1, color: 'rgba(255,255,255,0.1)', lineHeight: 0.9 }}>SMART<br/>CITY</span>
              <div style={{ position: 'relative', padding: 16, display: 'flex', gap: 12, height: '100%', boxSizing: 'border-box' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: FX, fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Libreville · maintenant</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 3, marginTop: 4 }}>
                    <span style={{ fontFamily: FX, fontWeight: 800, fontSize: 44, color: '#fff', lineHeight: 0.85, letterSpacing: -1.5 }}>29</span>
                    <span style={{ fontFamily: FX, fontWeight: 700, fontSize: 15, color: '#fff', marginTop: 4 }}>°C</span>
                    <Icon name="weather" size={28} color={OK.gold} strokeWidth={1.7} style={{ marginLeft: 6 }}/>
                  </div>
                  <div style={{ fontFamily: FX, fontWeight: 700, fontSize: 12, color: OK.gold, marginTop: 4 }}>Ensoleillé · humide</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                    {[['12h', '30°'], ['15h', '31°'], ['18h', '28°'], ['21h', '26°']].map(([h, t]) => (
                      <div key={h} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <span style={{ fontFamily: FX, fontWeight: 600, fontSize: 9.5, color: 'rgba(255,255,255,0.6)' }}>{h}</span>
                        <span style={{ width: 5, height: 5, borderRadius: 5, background: 'rgba(255,255,255,0.5)' }}/>
                        <span style={{ fontFamily: FX, fontWeight: 800, fontSize: 11, color: '#fff' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ width: 118, borderRadius: 15, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)', padding: '11px 12px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="car" size={15} color="#fff" strokeWidth={2}/><span style={{ fontFamily: FX, fontWeight: 700, fontSize: 10.5, color: 'rgba(255,255,255,0.85)' }}>Trafic</span></span>
                    <span style={{ width: 7, height: 7, borderRadius: 7, background: '#3BD37E', boxShadow: '0 0 7px #3BD37E' }}/>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
                    {[10, 16, 12, 22, 14, 9, 13, 18].map((h, i) => (
                      <span key={i} style={{ flex: 1, height: h, borderRadius: 2, background: i === 3 ? OK.gold : 'rgba(255,255,255,0.45)' }}/>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 14, color: '#fff' }}>Fluide</div>
                    <div style={{ fontFamily: FX, fontWeight: 600, fontSize: 9.5, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>Temps moyen +3 min</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slides événements espaces de jeux */}
            {events.map((ev, i) => (
              <button key={ev.title} onClick={() => navigate('event', { event: ev })} style={{ position: 'absolute', inset: 0, textAlign: 'left', border: 'none', padding: 0, cursor: 'pointer',
                display: slide === i + 1 ? 'block' : 'none', animation: slide === i + 1 ? 'okabaCarouselIn .28s ease-out' : 'none', pointerEvents: slide === i + 1 ? 'auto' : 'none' }}>
                <Img src={ev.img} style={{ position: 'absolute', inset: 0 }}
                  overlay="linear-gradient(90deg, rgba(7,42,21,0.9) 0%, rgba(7,42,21,0.5) 55%, rgba(7,42,21,0.2) 100%)"/>
                <div style={{ position: 'absolute', left: 16, top: 15 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FX, fontWeight: 800, fontSize: 9.5, letterSpacing: 0.4, color: '#3a2c00', background: OK.gold, padding: '4px 9px', borderRadius: 999 }}>
                    <Icon name="loisir" size={12} color="#3a2c00" strokeWidth={2}/> ESPACES DE JEUX
                  </span>
                </div>
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
                  <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: -0.3, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>{ev.title}</div>
                  <div style={{ fontFamily: FX, fontWeight: 600, fontSize: 11.5, color: 'rgba(255,255,255,0.86)', marginTop: 2 }}>{ev.tag}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FX, fontWeight: 700, fontSize: 11, color: OK.gold }}><Icon name="calendar" size={12} color={OK.gold} strokeWidth={2.2}/>{ev.date}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FX, fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}><Icon name="pin" size={12} color="rgba(255,255,255,0.85)" strokeWidth={2}/>{ev.venue}</span>
                  </div>
                </div>
              </button>
            ))}
            {/* Points de navigation */}
            <div style={{ position: 'absolute', right: 14, bottom: 14, display: 'flex', gap: 5, zIndex: 4 }}>
              {[0, 1, 2, 3].map(i => (
                <span key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 16 : 6, height: 6, borderRadius: 6, background: i === slide ? OK.gold : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'width .3s ease' }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Services (grille image, style accueil) */}
        <div style={{ padding: '10px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 18, columnGap: 10 }}>
          {modules.map(m => (
            <button key={m.id} onClick={() => m.id === 'info' ? navigate('baie-information') : m.id === 'trafic' ? navigate('traffic-3d') : m.id === 'meteo' ? navigate('weather') : m.id === 'parking' ? navigate('parking') : m.id === 'pharmacie' ? navigate('pharmacies') : m.id === 'carburant' ? navigate('fuel-stations') : notifyDemo(`${m.title} Smart City ouvert`)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 74, height: 74, borderRadius: 999, overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
                <Img src={m.img} style={{
                  width: '100%', height: '100%',
                  backgroundSize: m.id === 'info' ? 'contain' : 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: m.id === 'info' ? '#f1eadc' : OK.bg2,
                }}/>
              </div>
              <span style={{ fontFamily: FX, fontWeight: 700, fontSize: 12, color: OK.ink, textAlign: 'center', lineHeight: 1.15 }}>{m.title}</span>
            </button>
          ))}
        </div>

        {/* Cartes parking (image) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 0' }}>
          {[
            { name: 'Parking Nord', img: bImg('1506521781263-d8422e82f27a', 700), free: 240, capacity: 320, distance: '4 min' },
            { name: 'Parking Sud', img: bImg('1470224114660-3f6686c562eb', 700), free: 68, capacity: 180, distance: '7 min' },
          ].map(p => (
            <button key={p.name} onClick={() => navigate('parking-reservation', { parking: p })} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', padding: 0, borderRadius: 18, overflow: 'hidden', position: 'relative', height: 132, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
              <Img src={p.img} style={{ position: 'absolute', inset: 0 }}
                overlay="linear-gradient(90deg, rgba(7,42,21,0.86) 0%, rgba(7,42,21,0.45) 60%, rgba(7,42,21,0.2) 100%)"/>
              <div style={{ position: 'absolute', left: 16, top: 16, right: 16 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FX, fontWeight: 700, fontSize: 10.5, color: '#fff', background: 'rgba(255,255,255,0.16)', padding: '4px 10px', borderRadius: 999 }}>
                  <Icon name="pin" size={12} color="#fff" strokeWidth={2}/> {p.name}
                </span>
              </div>
              <div style={{ position: 'absolute', left: 16, bottom: 15 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
                  <span style={{ fontFamily: FX, fontWeight: 800, fontSize: 34, color: '#fff', lineHeight: 0.9 }}>{p.free}</span>
                  <span style={{ fontFamily: FX, fontWeight: 700, fontSize: 13, color: OK.gold, marginBottom: 3 }}>places libres</span>
                </div>
                <div style={{ fontFamily: FX, fontWeight: 600, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>Mis à jour à l'instant · Réserver une place</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { TourismeScreen, TourismeSpotsScreen, BaiePlaceScreen, EventImmersiveScreen, BaieInformationScreen, BaieArticleScreen, SmartCityScreen });


// ===================== 10-misc =====================
// okaba-screens-misc.jsx — Publier, Notifications, Messages, Chat, Compte, Favoris (thème VERT)
const FX = "'Manrope', system-ui, sans-serif";

// ── PUBLIER UNE ANNONCE (flow dynamique multi-étapes) ───────
// Config par catégorie : champs dynamiques, modes de prix, besoin de localisation
const LISTING_TYPES = {
  gabon: { needsLoc: false, priceModes: ['Prix fixe', 'Sur devis'], titlePh: 'Ex : Panier en raphia tressé main',
    fields: [
      { k: 'artisan', label: 'Type de produit', type: 'chips', opts: ['Artisanat', 'Mode & wax', 'Cosmétique', 'Alimentaire', 'Décoration'] },
      { k: 'origin', label: 'Provenance', type: 'text', ph: 'Ex : Woleu-Ntem' },
      { k: 'cond', label: 'Fabrication', type: 'chips', opts: ['Fait main', 'Petite série', 'Sur commande'] },
    ] },
  immo: { needsLoc: true, locLabel: 'Adresse du bien', locReq: true, priceModes: ['Prix fixe', 'Sur devis'],
    titlePh: 'Ex : Villa 4 pièces avec jardin',
    fields: [
      { k: 'transaction', label: 'Transaction', type: 'chips', opts: ['Vente', 'Location'] },
      { k: 'ptype', label: 'Type de bien', type: 'chips', opts: ['Appartement', 'Villa', 'Terrain', 'Bureau', 'Boutique'] },
      { k: 'surface', label: 'Surface (m²)', type: 'num', ph: 'Ex : 120' },
      { k: 'rooms', label: 'Pièces', type: 'chips', opts: ['Studio', '2', '3', '4', '5+'] },
    ] },
  auto: { needsLoc: false, priceModes: ['Prix fixe', 'Sur devis'], titlePh: 'Ex : Toyota RAV4 2019',
    fields: [
      { k: 'brand', label: 'Marque', type: 'text', ph: 'Ex : Toyota' },
      { k: 'model', label: 'Modèle', type: 'text', ph: 'Ex : RAV4' },
      { k: 'year', label: 'Année', type: 'num', ph: 'Ex : 2019' },
      { k: 'km', label: 'Kilométrage (km)', type: 'num', ph: 'Ex : 85 000' },
      { k: 'fuel', label: 'Carburant', type: 'chips', opts: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
      { k: 'gear', label: 'Boîte', type: 'chips', opts: ['Manuelle', 'Auto'] },
      { k: 'cond', label: 'État', type: 'chips', opts: ['Neuf', 'Occasion'] },
    ] },
  tech: { needsLoc: false, priceModes: ['Prix fixe', 'Sur devis', 'Gratuit'], titlePh: 'Ex : iPhone 14 Pro 256 Go',
    fields: [
      { k: 'brand', label: 'Marque', type: 'text', ph: 'Ex : Apple' },
      { k: 'model', label: 'Modèle', type: 'text', ph: 'Ex : iPhone 14 Pro' },
      { k: 'cond', label: 'État', type: 'chips', opts: ['Neuf', 'Très bon', 'Bon', 'Occasion'] },
      { k: 'warranty', label: 'Garantie', type: 'chips', opts: ['Aucune', '3 mois', '6 mois', '1 an+'] },
    ] },
  mode: { needsLoc: false, priceModes: ['Prix fixe', 'Sur devis'], titlePh: 'Ex : Robe en wax taille M',
    fields: [
      { k: 'article', label: 'Article', type: 'chips', opts: ['Vêtement', 'Chaussure', 'Accessoire'] },
      { k: 'size', label: 'Taille', type: 'sizeDyn' },
      { k: 'gender', label: 'Pour', type: 'chips', opts: ['Femme', 'Homme', 'Enfant', 'Mixte'] },
      { k: 'cond', label: 'État', type: 'chips', opts: ['Neuf', 'Très bon', 'Occasion'] },
    ] },
  maison: { needsLoc: false, priceModes: ['Prix fixe', 'Sur devis', 'Gratuit'], titlePh: 'Ex : Canapé d’angle 5 places',
    fields: [
      { k: 'mtype', label: 'Catégorie', type: 'chips', opts: ['Meuble', 'Électroménager', 'Déco', 'Cuisine', 'Jardin'] },
      { k: 'cond', label: 'État', type: 'chips', opts: ['Neuf', 'Très bon', 'Bon', 'Occasion'] },
    ] },
  services: { needsLoc: true, locLabel: 'Zone d’intervention', locReq: false, priceModes: ['Sur devis', 'Tarif horaire', 'Tarif fixe'],
    titlePh: 'Ex : Plomberie & dépannage express',
    fields: [
      { k: 'stype', label: 'Domaine', type: 'chips', opts: ['Bâtiment', 'Beauté', 'Cours', 'Événementiel', 'Transport', 'Autre'] },
      { k: 'mode', label: 'Prestation', type: 'chips', opts: ['À domicile', 'Sur place', 'En ligne'] },
      { k: 'avail', label: 'Disponibilité', type: 'text', ph: 'Ex : Lun–Sam, 8h–18h' },
    ] },
  events: { needsLoc: true, locLabel: 'Lieu de l’événement', locReq: true, priceModes: ['Payant', 'Gratuit'],
    titlePh: 'Ex : Concert live au bord de mer',
    fields: [
      { k: 'etype', label: 'Type', type: 'chips', opts: ['Concert', 'Soirée', 'Sport', 'Salon', 'Formation', 'Autre'] },
      { k: 'date', label: 'Date & heure', type: 'text', ph: 'Ex : Sam. 26 juil. · 21h00' },
    ] },
};

const SIZE_OPTS = { 'Chaussure': ['38', '39', '40', '41', '42', '43', '44', '45'], 'Vêtement': ['XS', 'S', 'M', 'L', 'XL', 'XXL'] };

function pubStepsFor(sel) {
  const needsLoc = sel && LISTING_TYPES[sel] && LISTING_TYPES[sel].needsLoc;
  return needsLoc ? ['Catégorie', 'Détails', 'Médias', 'Lieu', 'Offre'] : ['Catégorie', 'Détails', 'Médias', 'Offre'];
}

function PubStepper({ steps, step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 18px 4px' }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: 999, background: i <= step ? OK.green : '#fff', color: i <= step ? '#fff' : OK.ink3,
              border: i <= step ? 'none' : `1px solid ${OK.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FX, fontSize: 12, fontWeight: 800 }}>
              {i < step ? <Icon name="check" size={13} color="#fff" strokeWidth={3}/> : i + 1}
            </div>
            {i === step && <span style={{ fontFamily: FX, fontSize: 11, fontWeight: 800, color: OK.ink }}>{s}</span>}
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? OK.green : OK.line, borderRadius: 2 }}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

function PubBar({ label, onClick, disabled, icon = 'arrow-r' }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fff',
      borderTop: `1px solid ${OK.line}`, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`, boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
      <button onClick={onClick} disabled={disabled} style={{ width: '100%', height: 54, borderRadius: 14, border: 'none',
        background: disabled ? OK.bg2 : OK.green, color: disabled ? OK.ink3 : '#fff', cursor: disabled ? 'default' : 'pointer',
        fontFamily: FX, fontSize: 15.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: disabled ? 'none' : '0 8px 20px rgba(11,124,57,0.30)' }}>
        {label} <Icon name={icon} size={18} color={disabled ? OK.ink3 : '#fff'} strokeWidth={2.4}/>
      </button>
    </div>
  );
}

const PUB_FIELD = { width: '100%', height: 50, background: OK.bg2, border: '1.5px solid transparent', borderRadius: 13,
  padding: '0 14px', fontFamily: FX, fontSize: 14, fontWeight: 600, color: OK.ink, outline: 'none', boxSizing: 'border-box' };
const PUB_LABEL = { fontFamily: FX, fontSize: 11.5, fontWeight: 800, color: OK.ink3, display: 'block', margin: '0 2px 7px', letterSpacing: 0.2, textTransform: 'uppercase' };

function PubCard({ title, icon, children, style }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 18, padding: '16px 15px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          {icon && <span style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(11,124,57,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={16} color={OK.green} strokeWidth={2}/></span>}
          <span style={{ fontFamily: FX, fontSize: 14.5, fontWeight: 800, color: OK.ink }}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function ChipRow({ opts, value, onPick }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {opts.map(o => {
        const on = value === o;
        return (
          <button key={o} onClick={() => onPick(o)} style={{ height: 40, padding: '0 16px', borderRadius: 11, cursor: 'pointer',
            border: on ? `1.5px solid ${OK.green}` : `1.5px solid ${OK.line}`, background: on ? 'rgba(11,124,57,0.08)' : '#fff', color: on ? OK.green : OK.ink2,
            fontFamily: FX, fontSize: 13, fontWeight: on ? 800 : 600, transition: 'all .12s ease' }}>{o}</button>
        );
      })}
    </div>
  );
}

const PKG = [
  { id: 'free', name: 'Free', icon: 'user', price: 0, priceStr: 'Gratuit', tone: '#1F73C4', tag: 'Pour commencer',
    perks: ['2 annonces actives', 'En ligne 30 jours', 'Visibilité standard', 'Messagerie intégrée'] },
  { id: 'pro', name: 'Pro', icon: 'verified', price: 3500, priceStr: '3 500 F', per: '/ mois', tone: OK.green, popular: true, tag: 'Le plus choisi',
    perks: ['20 annonces actives', 'Badge Pro vérifié', '1 annonce en vedette / mois', 'Remontée automatique', 'Statistiques de vues'] },
  { id: 'business', name: 'Business', icon: 'shop', price: 12000, priceStr: '12 000 F', per: '/ mois', tone: '#B8860B', tag: 'Boutiques & pros',
    perks: ['Annonces illimitées', 'Boutique certifiée', 'Mises en vedette incluses', 'Éligible badge Made in Gabon', 'Support prioritaire'] },
];

// ── RÉFÉRENCER UN ÉTABLISSEMENT ────────────────────────────
// Synchronisé depuis Claude Design (révision du 28 juillet 2026).
const ETAB_TYPES = {
  resto: { label: 'Restaurant & bar', img: 'assets/etab-restaurant-gabon.jpg', rubriques: ['Restaurant', 'Bar & lounge', 'Fast-food', 'Pâtisserie'], namePh: 'Ex : Le Grill du Roi', fields: [
    { k: 'cuisine', label: 'Cuisine', type: 'chips', opts: ['Gabonaise', 'Africaine', 'Européenne', 'Asiatique', 'Libanaise', 'Grillades'] },
    { k: 'gamme', label: 'Gamme de prix', type: 'chips', opts: ['€', '€€', '€€€'] },
    { k: 'places', label: 'Nombre de places', type: 'num', ph: 'Ex : 60' },
    { k: 'services', label: 'Services', type: 'chips', opts: ['Terrasse', 'Livraison', 'À emporter', 'Climatisé'] },
  ] },
  hotel: { label: 'Hôtel', img: 'assets/etab-hotel-pointe-denis.jpg', rubriques: ['Hôtel', 'Résidence meublée', 'Auberge'], namePh: 'Ex : Résidence Bord de Mer', fields: [
    { k: 'standing', label: 'Standing', type: 'chips', opts: ['2 ★', '3 ★', '4 ★', '5 ★'] },
    { k: 'chambres', label: 'Chambres', type: 'num', ph: 'Ex : 40' },
    { k: 'nuit', label: 'Prix / nuit (FCFA)', type: 'num', ph: 'Ex : 45 000' },
    { k: 'equip', label: 'Équipements', type: 'chips', opts: ['Piscine', 'Restaurant', 'Salle de sport', 'Navette', 'Wi-Fi'] },
  ] },
  commerce: { label: 'Commerce', img: 'assets/etab-commerce-boutique-afrique.jpg', rubriques: ['Supermarché', 'Boutique', 'Mode', 'Électronique', 'Quincaillerie'], namePh: 'Ex : Galerie des Créateurs', fields: [
    { k: 'rayons', label: 'Rayons', type: 'chips', opts: ['Alimentation', 'Mode', 'Maison', 'Beauté', 'High-tech'] },
    { k: 'paiement', label: 'Paiement', type: 'chips', opts: ['Espèces', 'Mobile Money', 'Carte'] },
  ] },
  sante: { label: 'Santé', img: 'assets/etab-sante-afrique.jpg', rubriques: ['Pharmacie', 'Clinique', 'Cabinet médical', 'Laboratoire'], namePh: 'Ex : Pharmacie du Komo', fields: [
    { k: 'garde', label: 'Garde de nuit', type: 'chips', opts: ['Oui', 'Non'] },
    { k: 'conv', label: 'Conventionné CNAMGS', type: 'chips', opts: ['Oui', 'Non'] },
    { k: 'spec', label: 'Spécialités', type: 'text', ph: 'Ex : Pédiatrie, dentaire' },
  ] },
  service: { label: 'Services & artisan', img: 'assets/etab-service-artisan.jpg', rubriques: ['Bâtiment', 'Beauté', 'Transport', 'Événementiel', 'Réparation'], namePh: 'Ex : Atelier Bois du Gabon', fields: [
    { k: 'domaine', label: 'Domaine', type: 'chips', opts: ['Bâtiment', 'Beauté', 'Cours', 'Transport', 'Réparation'] },
    { k: 'mode', label: 'Prestation', type: 'chips', opts: ['À domicile', 'Sur place', 'En ligne'] },
    { k: 'zone', label: 'Zone d’intervention', type: 'text', ph: 'Ex : Libreville & Akanda' },
  ] },
  loisir: { label: 'Loisirs & divertissement', img: 'assets/etab-loisirs-afrique.jpg', rubriques: ['Cinéma', 'Salle de sport', 'Espace jeux', 'Club de plage'], namePh: 'Ex : Ciné Baie des Rois', fields: [
    { k: 'ltype', label: 'Type', type: 'chips', opts: ['Cinéma', 'Sport', 'Jeux', 'Plage', 'Parc'] },
    { k: 'public', label: 'Public', type: 'chips', opts: ['Famille', 'Enfants', 'Adultes'] },
  ] },
  instit: { label: 'Institution', img: 'assets/etab-institution-afrique.jpg', rubriques: ['Ministère', 'Mairie', 'Agence publique', 'Ambassade'], namePh: 'Ex : Mairie de Libreville', fields: [
    { k: 'itype', label: 'Nature', type: 'chips', opts: ['Ministère', 'Mairie', 'Agence', 'Ambassade'] },
    { k: 'tutelle', label: 'Tutelle', type: 'text', ph: 'Ex : Ministère de l’Intérieur' },
  ] },
  complexe: { label: 'Complexe', img: 'assets/etab-complexe-afrique.jpg', rubriques: ['Complexe de loisirs', 'Centre commercial', 'Marché'], namePh: 'Ex : La Baie des Rois', fields: [
    { k: 'univers', label: 'Univers présents', type: 'chips', opts: ['Restaurants', 'Bars', 'Loisirs', 'Shopping', 'Hôtel'] },
    { k: 'enseignes', label: 'Nombre d’enseignes', type: 'num', ph: 'Ex : 12' },
  ] },
};

const ETAB_STEPS_MINE = ['Type', 'Identité', 'Lieu', 'Détails', 'Médias', 'Forfait'];
const ETAB_STEPS_OTHER = ['Type', 'Identité', 'Lieu', 'Médias'];
const MY_ETABS = [
  { id: 'me1', name: 'Chez Mama Awa', rub: 'Restaurant · Nkembo', status: 'Référencé', tone: OK.green, img: 'assets/etab-restaurant.jpg' },
  { id: 'me2', name: 'Boutique Awa Mode', rub: 'Mode · Quartier Louis', status: 'Brouillon', tone: OK.gold, img: 'assets/etab-commerce.jpg' },
];
const ETAB_PKG = [
  { id: 'free', name: 'Free', priceStr: 'Gratuit', tone: '#1F73C4', tag: 'Fiche simple', perks: ['Fiche dans l’annuaire', 'Coordonnées & horaires', '3 photos', 'Messagerie intégrée'] },
  { id: 'pro', name: 'Pro', priceStr: '5 000 F', per: '/ mois', tone: OK.green, popular: true, tag: 'Le plus choisi', perks: ['Badge établissement vérifié', 'Galerie illimitée + vidéos', 'Statistiques de visites', 'Mise en avant dans sa rubrique', 'Publication d’actualités'] },
  { id: 'business', name: 'Business', priceStr: '18 000 F', per: '/ mois', tone: '#B8860B', tag: 'Groupes & complexes', perks: ['Plusieurs établissements', 'Fiche certifiée', 'Gestion des enseignes', 'Éligible badge Made in Gabon', 'Support prioritaire'] },
];

// Services de proximité : annuaire de personnes et de savoir-faire.
const PROXIMITY_FAMILIES = [
  { id: 'travaux', label: 'Bâtiment & travaux', img: 'assets/service-proximite-batiment-travaux.jpg', jobs: ['Maçon', 'Carreleur', 'Plombier', 'Électricien', 'Peintre', 'Menuisier', 'Soudeur / ferrailleur', 'Plaquiste', 'Vitrier', 'Couvreur', 'Puisatier', 'Terrassier'] },
  { id: 'maison', label: 'Maison & entretien', img: 'assets/service-proximite-maison-entretien.jpg', cardPosition: 'center 28%', jobs: ['Ménage', 'Repassage / blanchisserie', 'Jardinier', 'Débroussaillage', 'Vidange de fosse', 'Dératisation', 'Déménagement', 'Manutention'] },
  { id: 'technique', label: 'Froid & technique', img: 'assets/service-proximite-froid-technique.jpg', jobs: ['Climatisation', 'Frigoriste', 'Groupe électrogène', 'Antenne / parabole', 'Dépannage informatique', 'Réparation téléphone', 'Électroménager'] },
  { id: 'auto', label: 'Auto & moto', img: 'assets/service-proximite-auto-moto.jpg', jobs: ['Mécanicien', 'Tôlier-peintre', 'Électricien auto', 'Vulcanisateur', 'Lavage auto', 'Dépannage / remorquage'] },
  { id: 'aide', label: 'Garde & aide à la personne', img: 'assets/service-proximite-garde-aide-personne.jpg', cardPosition: 'center 22%', jobs: ['Nounou', 'Garde-malade', 'Aide aux personnes âgées', 'Cuisinière à domicile', 'Gardien / vigile'] },
  { id: 'beaute', label: 'Beauté & bien-être', img: 'assets/service-proximite-beaute-bien-etre.jpg', cardPosition: 'center 24%', jobs: ['Coiffeuse', 'Mèches', 'Barbier', 'Esthéticienne', 'Ongles', 'Maquillage', 'Massage', 'Couturière / styliste'] },
  { id: 'cours', label: 'Cours & soutien', img: 'assets/services/service-education.jpg', jobs: ['Répétiteur scolaire', 'Langues', 'Informatique', 'Musique', 'Sport / coaching', 'Code de la route'] },
  { id: 'event', label: 'Événementiel & transport', img: 'assets/service-proximite-evenementiel-transport.webp', jobs: ['Traiteur', 'Pâtissière', 'Décoration', 'DJ / sono', 'Photographe', 'Chauffeur', 'Coursier / livreur', 'Location chaises / bâches'] },
];
const PROXIMITY_JOBS = PROXIMITY_FAMILIES.flatMap(family => family.jobs);
const ProximityFamilyVisual = ({ item, selected }) => <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#17251c' }}>
  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${item.img}')`, backgroundSize: 'cover', backgroundPosition: item.cardPosition || 'center', backgroundRepeat: 'no-repeat' }}/>
  <div style={{ position: 'absolute', inset: 0, background: selected ? 'linear-gradient(180deg, rgba(11,124,57,.05), rgba(3,47,22,.76))' : 'linear-gradient(180deg, rgba(0,0,0,.03), rgba(0,0,0,.7))' }}/>
</div>;
const PROXIMITY_STORE_KEY = 'okaba:proximity-services';
const PROXIMITY_DEMOS = [
  { id: 'demo-plomberie', name: 'Junior Plomberie', family: 'travaux', jobs: ['Plombier'], bio: 'Installation, fuite d’eau et dépannage rapide à domicile.', experience: '6 ans', city: 'Nzeng-Ayong · Libreville', zone: 'Libreville', phone: '+241 06 00 00 18', whatsapp: '+241 06 00 00 18', priceLabel: 'Dès 10 000 FCFA', availability: 'Lun – Sam · 08:00 – 19:00', emergency: true, verified: true, rating: 4.8, cover: 'assets/etab-service-artisan.jpg', photos: 3 },
  { id: 'demo-nounou', name: 'Aïcha Garde d’enfants', family: 'aide', jobs: ['Nounou', 'Cuisinière à domicile'], bio: 'Garde d’enfants à domicile, ponctuelle ou régulière.', experience: '8 ans', city: 'Akanda · Libreville', zone: 'Akanda', phone: '+241 07 00 00 24', whatsapp: '+241 07 00 00 24', priceLabel: 'Sur devis', availability: 'Lun – Ven · 07:00 – 18:00', emergency: false, verified: true, rating: 4.7, cover: 'assets/services/service-education.jpg', photos: 2 },
];

// Dans l’application finale, ces données proviendront du profil actif renvoyé
// par le compte. La maquette les centralise ici pour éviter de les redemander
// pendant chaque publication de service.
const CONNECTED_SERVICE_PROFILE = {
  id: 'patricia-ondo',
  name: `${USER.firstName} ${USER.lastName}`,
  family: 'beaute',
  jobs: ['Couturière / styliste'],
  bio: 'Création sur mesure, retouches et confection de tenues en pagne pour toutes les occasions.',
  experience: '6 ans',
  phone: USER.phone,
  whatsapp: USER.phone,
  city: USER.city,
  verified: true,
  cover: 'assets/service-proximite-beaute-bien-etre.jpg',
};

function readProximityProviders() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PROXIMITY_STORE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) { return []; }
}

function saveProximityProvider(provider) {
  const current = readProximityProviders().filter(item => item.id !== provider.id);
  window.localStorage.setItem(PROXIMITY_STORE_KEY, JSON.stringify([provider, ...current]));
  return provider;
}

function proximityProviderById(id) {
  return [...readProximityProviders(), ...PROXIMITY_DEMOS].find(item => item.id === id);
}

function proximityDirectoryEntries() {
  return [...readProximityProviders(), ...PROXIMITY_DEMOS].map(provider => ({
    ...provider,
    type: 'proximity',
    service: 'proximite',
    cat: `${provider.jobs?.[0] || 'Service'} · Service de proximité`,
    logo: provider.cover || 'assets/proximite-artisan.jpg',
    cover: provider.cover || 'assets/proximite-artisan.jpg',
    followers: provider.rating ? `${String(provider.rating).replace('.', ',')} ★ · ${provider.priceLabel}` : `Nouveau · ${provider.priceLabel || 'Sur devis'}`,
    directoryMeta: provider.priceLabel || 'Sur devis',
    directoryPriority: provider.createdAt ? 420 : 330,
    directoryRoute: ['proximity-profile', { id: provider.id }],
  }));
}

function MultiChipRow({ opts, values, onChange, max }) {
  const toggle = value => {
    if (values.includes(value)) onChange(values.filter(item => item !== value));
    else if (!max || values.length < max) onChange([...values, value]);
  };
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{opts.map(option => {
    const on = values.includes(option);
    return <button key={option} type="button" onClick={() => toggle(option)} style={{ minHeight: 38, padding: '7px 13px', borderRadius: 11, cursor: 'pointer', border: on ? `1.5px solid ${OK.green}` : `1.5px solid ${OK.line}`, background: on ? 'rgba(11,124,57,.08)' : '#fff', color: on ? OK.green : OK.ink2, fontFamily: FX, fontSize: 12.5, fontWeight: on ? 800 : 600 }}>{on && '✓ '}{option}</button>;
  })}</div>;
}

function EtabProgress({ steps, step }) {
  return (
    <div style={{ padding: '16px 18px 6px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FX, fontSize: 15, fontWeight: 800, color: OK.ink }}>{steps[step]}</span>
        <span style={{ fontFamily: FX, fontSize: 11, fontWeight: 700, color: OK.ink3 }}>Étape {step + 1} sur {steps.length}</span>
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
        {steps.map((label, index) => <div key={label} style={{ flex: 1, height: 4, borderRadius: 4, background: index < step ? OK.green : index === step ? OK.gold : OK.line }}/>) }
      </div>
    </div>
  );
}

function EtabScreen() {
  const { back, navigate, canBack } = useNav();
  const [mode, setMode] = useState(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState(null);
  const [name, setName] = useState('');
  const [rubrique, setRubrique] = useState('');
  const [accroche, setAccroche] = useState('');
  const [desc, setDesc] = useState('');
  const [addr, setAddr] = useState('');
  const [quartier, setQuartier] = useState('');
  const [ville, setVille] = useState('Libreville');
  const [tel, setTel] = useState('');
  const [wa, setWa] = useState('');
  const [hours, setHours] = useState('');
  const [rythme, setRythme] = useState('Tous les jours');
  const [form, setForm] = useState({});
  const [docs, setDocs] = useState([]);
  const [media, setMedia] = useState([{ type: 'photo' }]);
  const [pkg, setPkg] = useState('free');
  const [preview, setPreview] = useState(false);

  const cfg = sel ? ETAB_TYPES[sel] : null;
  const isOther = mode === 'other';
  const steps = isOther ? ETAB_STEPS_OTHER : ETAB_STEPS_MINE;
  const successStep = steps.length;
  const iType = 0, iId = 1, iLoc = 2, iDet = isOther ? -1 : 3, iMedia = isOther ? 3 : 4, iPkg = isOther ? -1 : 5;
  const coverImg = cfg?.img || 'assets/etab-hero-complexe.jpg';
  const idValid = Boolean(name.trim() && rubrique);
  const locValid = Boolean(addr.trim() && ville.trim() && tel.trim());
  const setF = (key, value) => setForm(current => ({ ...current, [key]: value }));

  useEffect(() => {
    if (cfg) setRubrique(cfg.rubriques[0]);
  }, [cfg]);

  const goBack = () => {
    if (preview) { setPreview(false); return; }
    if (step > 0) { setStep(current => current - 1); return; }
    if (started || mode === 'other') { setStarted(false); setMode(mode === 'other' ? null : mode); return; }
    if (mode) { setMode(null); return; }
    if (canBack) back(); else navigate('home');
  };

  if (!mode) {
    const choices = [
      { id: 'mine', title: 'Mon établissement', sub: 'Je suis le propriétaire ou le gérant', img: 'assets/etab-entry-owner-africa.jpg' },
      { id: 'other', title: 'Un autre établissement', sub: 'Je signale un lieu que je connais', img: 'assets/etab-entry-place-gabon.jpg' },
    ];
    return (
      <Screen bg={OK.bg2} statusDark={false}>
        <div data-screen-label="Référencer un établissement">
          <div style={{ position: 'relative', minHeight: 300, padding: '52px 20px 34px', borderRadius: '0 0 26px 26px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Img src="assets/etab-entry-hero-gabon.jpg" style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(4,26,14,0.42) 0%, rgba(6,42,24,0.35) 42%, rgba(4,26,14,0.82) 100%)"/>
            <button onClick={() => canBack ? back() : navigate('home')} aria-label="Retour" style={{ position: 'relative', width: 38, height: 38, borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)', cursor: 'pointer', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="back" size={18} color="#fff" strokeWidth={2.2}/>
            </button>
            <h1 style={{ margin: 'auto 0 0', position: 'relative', fontFamily: FX, fontWeight: 800, fontSize: 28, lineHeight: 1.12, color: '#fff', letterSpacing: -0.5, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>Référencer un<br/>établissement</h1>
            <p style={{ margin: '10px 0 0', position: 'relative', fontFamily: FX, fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, maxWidth: 285 }}>Ajoutez un lieu à l’annuaire pour le rendre visible de tous les Gabonais.</p>
          </div>
          <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
            {choices.map(choice => (
              <button key={choice.id} onClick={() => { setMode(choice.id); if (choice.id === 'other') setStarted(true); }} style={{ textAlign: 'left', cursor: 'pointer', padding: 0, overflow: 'hidden', background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ position: 'relative', width: 106, flexShrink: 0 }}><Img src={choice.img} style={{ position: 'absolute', inset: 0 }}/></div>
                <div style={{ flex: 1, minWidth: 0, padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FX, fontSize: 15.5, fontWeight: 800, color: OK.ink }}>{choice.title}</div>
                    <div style={{ fontFamily: FX, fontSize: 12, color: OK.ink2, marginTop: 5, lineHeight: 1.4 }}>{choice.sub}</div>
                  </div>
                  <Icon name="chev-r" size={17} color={OK.ink3} strokeWidth={2.4}/>
                </div>
              </button>
            ))}
          </div>
          <div style={{ padding: '24px 16px 28px' }}>
            <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 18, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              {['Vous remplissez la fiche', 'Nous vérifions les informations', 'La fiche est publiée sous 24–48 h'].map((text, index) => (
                <div key={text} style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                  <span style={{ width: 20, height: 20, borderRadius: 999, background: 'rgba(11,124,57,0.1)', color: OK.green, fontFamily: FX, fontSize: 10.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{index + 1}</span>
                  <span style={{ fontFamily: FX, fontSize: 12.5, fontWeight: 600, color: OK.ink2 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  if (mode === 'mine' && !started) {
    return (
      <Screen bg={OK.bg2} statusDark footerPad={92} footer={<PubBar label="Référencer un nouvel établissement" onClick={() => setStarted(true)}/> }>
        <div data-screen-label="Mes établissements">
          <GreenHeader title="Mes établissements" onBack={() => setMode(null)}/>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {MY_ETABS.map(item => (
              <button key={item.id} onClick={() => setStarted(true)} style={{ textAlign: 'left', cursor: 'pointer', padding: 12, background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, overflow: 'hidden', flexShrink: 0 }}><Img src={item.img} style={{ width: '100%', height: '100%' }}/></div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FX, fontSize: 14.5, fontWeight: 800, color: OK.ink }}>{item.name}</div><div style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink2, marginTop: 2 }}>{item.rub}</div></div>
                <span style={{ fontFamily: FX, fontSize: 9.5, fontWeight: 800, color: item.tone === OK.gold ? '#8A6B00' : item.tone, background: item.tone + '18', padding: '4px 9px', borderRadius: 999 }}>{item.status}</span>
              </button>
            ))}
          </div>
        </div>
      </Screen>
    );
  }

  if (step === successStep) {
    return (
      <Screen bg={OK.bg2} statusDark>
        <div data-screen-label="Établissement soumis" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
          <div style={{ width: 96, height: 96, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(11,124,57,0.35)' }}><Icon name="check" size={48} color="#fff" strokeWidth={3}/></div>
          <h1 style={{ margin: '24px 0 0', fontFamily: FX, fontWeight: 800, fontSize: 25, color: OK.ink }}>{isOther ? 'Merci à vous !' : 'Demande envoyée'}</h1>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontFamily: FX, fontSize: 11.5, fontWeight: 800, color: '#8A6B00', background: 'rgba(197,150,0,0.16)', border: '1px solid rgba(197,150,0,0.4)', padding: '5px 12px', borderRadius: 999 }}><span style={{ width: 7, height: 7, borderRadius: 7, background: OK.gold }}/> En attente de validation</span>
          <p style={{ margin: '14px 0 0', fontFamily: FX, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, maxWidth: 285 }}><strong style={{ color: OK.ink }}>« {name || 'Votre établissement'} »</strong> {isOther ? 'a bien été signalé. Nos équipes vérifient les informations avant publication dans l’annuaire, sous' : 'est en cours de vérification par nos équipes. Sa fiche sera publiée dans l’annuaire sous'} <strong style={{ color: OK.ink }}>24 à 48 h</strong>.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 26, width: '100%' }}>
            <button onClick={() => navigate('annuaire')} style={{ height: 52, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FX, fontSize: 15, fontWeight: 800 }}>Voir l’annuaire</button>
            <button onClick={() => navigate('home')} style={{ height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, cursor: 'pointer', fontFamily: FX, fontSize: 15, fontWeight: 800 }}>Retour à l’accueil</button>
          </div>
        </div>
      </Screen>
    );
  }

  if (preview) {
    return (
      <Screen bg={OK.bg} statusDark footerPad={92} footer={
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`, borderTop: `1px solid ${OK.line}`, background: '#fff', display: 'flex', gap: 10 }}>
          <button onClick={() => setPreview(false)} style={{ flex: 1, height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, cursor: 'pointer', fontFamily: FX, fontWeight: 800 }}>Modifier</button>
          <button onClick={() => { setPreview(false); setStep(isOther ? successStep : iPkg); }} style={{ flex: 1.4, height: 52, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FX, fontWeight: 800 }}>{isOther ? 'Soumettre' : 'Continuer'}</button>
        </div>
      }>
        <div data-screen-label="Aperçu établissement">
          <div style={{ position: 'relative', height: 190 }}>
            <Img src={coverImg} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,.34), transparent 50%)"/>
            <button onClick={() => setPreview(false)} aria-label="Retour" style={{ position: 'absolute', top: 14, left: 14, width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink}/></button>
            <span style={{ position: 'absolute', top: 18, right: 14, fontFamily: FX, fontWeight: 800, fontSize: 11.5, color: '#fff', background: 'rgba(0,0,0,.42)', padding: '5px 11px', borderRadius: 999 }}>Aperçu</span>
          </div>
          <div style={{ padding: '0 18px 26px', marginTop: -34, position: 'relative' }}>
            <div style={{ width: 76, height: 76, borderRadius: 18, overflow: 'hidden', border: '3px solid #fff', background: '#fff' }}><Img src={coverImg} style={{ width: '100%', height: '100%' }}/></div>
            <h1 style={{ margin: '10px 0 0', fontFamily: FX, fontWeight: 800, fontSize: 21, color: OK.ink }}>{name || 'Nom de l’établissement'}</h1>
            <div style={{ fontFamily: FX, fontWeight: 700, fontSize: 12, color: OK.green, marginTop: 3, textTransform: 'uppercase' }}>{rubrique || cfg?.label}</div>
            {accroche && <div style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink2, marginTop: 6 }}>{accroche}</div>}
            <span style={{ display: 'inline-flex', marginTop: 12, fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: '#8A6B00', background: 'rgba(197,150,0,.16)', padding: '4px 10px', borderRadius: 999 }}>Fiche en attente de validation</span>
            {desc && <p style={{ margin: '14px 0 0', fontFamily: FX, fontSize: 13, color: OK.ink2, lineHeight: 1.6 }}>{desc}</p>}
            <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 16, overflow: 'hidden', marginTop: 18 }}>
              {[['pin', 'Adresse', [addr, quartier, ville].filter(Boolean).join(' · ') || 'Non renseignée'], ['clock', 'Horaires', hours ? `${rythme} · ${hours}` : rythme], ['phone', 'Téléphone', tel || 'Non renseigné']].map(([icon, label, value], index) => (
                <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 14px', borderTop: index ? `1px solid ${OK.line}` : 'none' }}><Icon name={icon} size={17} color={OK.green}/><div><div style={{ fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: OK.ink3, textTransform: 'uppercase' }}>{label}</div><div style={{ fontFamily: FX, fontSize: 13, fontWeight: 600, color: OK.ink }}>{value}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  let footer;
  if (step === iType) footer = <PubBar label="Continuer" disabled={!sel} onClick={() => sel && setStep(iId)}/>;
  else if (step === iId) footer = <PubBar label="Continuer" disabled={!idValid} onClick={() => idValid && setStep(iLoc)}/>;
  else if (step === iLoc) footer = <PubBar label="Continuer" disabled={!locValid} onClick={() => locValid && setStep(isOther ? iMedia : iDet)}/>;
  else if (step === iDet) footer = <PubBar label="Continuer" onClick={() => setStep(iMedia)}/>;
  else if (step === iMedia) footer = <PubBar label="Continuer" disabled={!media.length} onClick={() => media.length && setPreview(true)}/>;
  else footer = <PubBar label="Soumettre pour validation" icon="check" onClick={() => setStep(successStep)}/>;

  return (
    <Screen bg={OK.bg2} statusDark footerPad={92} footer={footer}>
      <div data-screen-label="Référencer un établissement">
        <GreenHeader title="Référencer un établissement" onBack={goBack}/>
        <EtabProgress steps={steps} step={step}/>

        {step === iType && <div>
          <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 18, color: OK.green, margin: '14px 18px 0' }}>Quel type d’établissement ?</div>
          <p style={{ margin: '4px 18px 0', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>La fiche sera référencée dans l’annuaire O’KABA.</p>
          <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {Object.entries(ETAB_TYPES).map(([id, type]) => <button key={id} onClick={() => setSel(id)} style={{ position: 'relative', height: 108, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', padding: 0, textAlign: 'left', border: sel === id ? `2.5px solid ${OK.green}` : 'none', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}><Img src={type.img} style={{ position: 'absolute', inset: 0, ...(id === 'loisir' ? { backgroundPosition: 'center 45%' } : {}) }} overlay="linear-gradient(180deg, rgba(0,0,0,.05) 28%, rgba(0,0,0,.68) 100%)"/>{sel === id && <span style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={14} color="#fff" strokeWidth={3}/></span>}<span style={{ position: 'absolute', left: 11, right: 11, bottom: 10, fontFamily: FX, fontWeight: 800, fontSize: 13.5, color: '#fff' }}>{type.label}</span></button>)}
          </div>
        </div>}

        {step === iId && cfg && <div style={{ padding: '14px 16px' }}><PubCard title="Identité" icon="shop"><div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><label style={PUB_LABEL}>Nom de l’établissement</label><input value={name} onChange={event => setName(event.target.value)} placeholder={cfg.namePh} style={PUB_FIELD}/></div>
          <div><label style={PUB_LABEL}>Rubrique annuaire</label><ChipRow opts={cfg.rubriques} value={rubrique} onPick={setRubrique}/></div>
          <div><label style={PUB_LABEL}>Accroche courte</label><input value={accroche} onChange={event => setAccroche(event.target.value)} placeholder="Ex : Cuisine gabonaise · vue mer" style={PUB_FIELD}/></div>
          <div><label style={PUB_LABEL}>Description</label><textarea value={desc} onChange={event => setDesc(event.target.value)} rows={4} placeholder="Présentez votre établissement, vos spécialités, ce qui vous distingue…" style={{ ...PUB_FIELD, height: 'auto', padding: '12px 14px', resize: 'none', lineHeight: 1.5 }}/></div>
        </div></PubCard></div>}

        {step === iLoc && <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PubCard title="Localisation" icon="pin"><div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div><label style={PUB_LABEL}>Adresse</label><input value={addr} onChange={event => setAddr(event.target.value)} placeholder="Ex : Bord de mer, Boulevard Triomphal" style={PUB_FIELD}/></div>
            <div style={{ display: 'flex', gap: 12 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Quartier</label><input value={quartier} onChange={event => setQuartier(event.target.value)} placeholder="Ex : Louis" style={PUB_FIELD}/></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>Ville</label><input value={ville} onChange={event => setVille(event.target.value)} placeholder="Ex : Libreville" style={PUB_FIELD}/></div></div>
            <div style={{ height: 140, borderRadius: 14, overflow: 'hidden', position: 'relative', border: `1px solid ${OK.line}` }}><Img src="assets/etab-carte.jpg" style={{ position: 'absolute', inset: 0 }} overlay="rgba(11,124,57,.18)"/><div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-100%)' }}><Icon name="pin" size={32} color={OK.green}/></div></div>
          </div></PubCard>
          <PubCard title="Contact & horaires" icon="phone"><div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 12 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Téléphone</label><input value={tel} onChange={event => setTel(event.target.value)} placeholder="+241 …" inputMode="tel" style={PUB_FIELD}/></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>WhatsApp</label><input value={wa} onChange={event => setWa(event.target.value)} placeholder="+241 …" inputMode="tel" style={PUB_FIELD}/></div></div>
            <div><label style={PUB_LABEL}>Rythme d’ouverture</label><ChipRow opts={['Tous les jours', 'Lun – Sam', 'Lun – Ven', '24/7']} value={rythme} onPick={setRythme}/></div>
            {rythme !== '24/7' && <div><label style={PUB_LABEL}>Horaires</label><input value={hours} onChange={event => setHours(event.target.value)} placeholder="Ex : 08:00 – 22:00" style={PUB_FIELD}/></div>}
          </div></PubCard>
        </div>}

        {step === iDet && cfg && <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PubCard title={`Détails · ${cfg.label}`} icon="edit"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>{cfg.fields.map(field => <div key={field.k} style={{ flex: field.type === 'chips' ? '1 1 100%' : '1 1 calc(50% - 7px)', minWidth: 0 }}><label style={PUB_LABEL}>{field.label}</label>{field.type === 'chips' ? <ChipRow opts={field.opts} value={form[field.k]} onPick={value => setF(field.k, value)}/> : <input value={form[field.k] || ''} onChange={event => setF(field.k, field.type === 'num' ? event.target.value.replace(/[^0-9]/g, '') : event.target.value)} placeholder={field.ph} inputMode={field.type === 'num' ? 'numeric' : 'text'} style={PUB_FIELD}/>}</div>)}</div></PubCard>
          <PubCard title="Justificatifs" icon="doc"><p style={{ margin: '0 0 12px', fontFamily: FX, fontSize: 12, color: OK.ink2, lineHeight: 1.5 }}>Facultatif, mais un RCCM ou NIF accélère la vérification et permet d’obtenir le badge <strong>établissement vérifié</strong>.</p><div style={{ display: 'flex', gap: 10 }}>{['RCCM', 'NIF'].map(doc => { const on = docs.includes(doc); return <button key={doc} onClick={() => setDocs(current => on ? current.filter(item => item !== doc) : [...current, doc])} style={{ flex: 1, height: 68, borderRadius: 13, border: on ? `1.5px solid ${OK.green}` : `1.5px dashed ${OK.line}`, background: on ? 'rgba(11,124,57,.06)' : '#fff', color: on ? OK.green : OK.ink2, fontWeight: 800 }}>{on ? `${doc} ajouté` : `Ajouter ${doc}`}</button>; })}</div></PubCard>
        </div>}

        {step === iMedia && <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PubCard title="Logo & couverture" icon="camera"><div style={{ display: 'flex', gap: 12 }}><button style={{ width: 92, height: 92, borderRadius: 16, border: `1.5px dashed ${OK.green}`, background: 'rgba(11,124,57,.06)', color: OK.green, fontWeight: 800 }}>Logo</button><button style={{ flex: 1, height: 92, borderRadius: 16, border: 0, padding: 0, position: 'relative', overflow: 'hidden' }}><Img src={coverImg} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, transparent, rgba(0,0,0,.5))"/><span style={{ position: 'absolute', left: 0, right: 0, bottom: 10, color: '#fff', fontWeight: 800 }}>Photo de couverture</span></button></div></PubCard>
          <PubCard title="Galerie" icon="camera"><div style={{ display: 'flex', gap: 10 }}><button onClick={() => setMedia(current => [...current, { type: 'photo' }])} style={{ flex: 1, height: 44, borderRadius: 12, border: `1.5px solid ${OK.green}`, background: 'rgba(11,124,57,.06)', color: OK.green, fontWeight: 800 }}>Photo</button><button onClick={() => setMedia(current => [...current, { type: 'video' }])} style={{ flex: 1, height: 44, borderRadius: 12, border: `1.5px solid ${OK.red}`, background: 'rgba(224,36,27,.05)', color: OK.red, fontWeight: 800 }}>Vidéo</button></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 12 }}>{media.map((item, index) => <div key={`${item.type}-${index}`} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}><Img src={coverImg} style={{ position: 'absolute', inset: 0 }}/>{item.type === 'video' && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.25)' }}><Icon name="video" size={22} color="#fff"/></span>}<button onClick={() => setMedia(current => current.filter((_, itemIndex) => itemIndex !== index))} aria-label="Supprimer" style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, borderRadius: 999, border: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={12} color="#fff"/></button></div>)}</div></PubCard>
        </div>}

        {step === iPkg && <div style={{ padding: '10px 16px 20px' }}><div style={{ fontFamily: FX, fontWeight: 800, fontSize: 18, color: OK.green }}>Choisissez votre forfait</div><p style={{ margin: '4px 0 14px', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>Référencez-vous gratuitement, ou passez Pro pour être vérifié et mis en avant.</p><div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>{ETAB_PKG.map(offer => { const on = pkg === offer.id; return <button key={offer.id} onClick={() => setPkg(offer.id)} style={{ textAlign: 'left', cursor: 'pointer', background: '#fff', borderRadius: 16, padding: '14px 15px', border: on ? `2px solid ${offer.tone}` : `1px solid ${OK.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ flex: 1 }}><div style={{ fontFamily: FX, fontSize: 16, fontWeight: 800, color: OK.ink }}>{offer.name}</div><div style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink3 }}>{offer.tag}</div></div><strong style={{ fontFamily: FX, fontSize: 20, color: OK.ink }}>{offer.priceStr}</strong>{offer.per && <span style={{ fontSize: 11, color: OK.ink3 }}>{offer.per}</span>}</div>{on && <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${OK.line}`, display: 'grid', gap: 7 }}>{offer.perks.map(perk => <span key={perk} style={{ fontFamily: FX, fontSize: 12, color: OK.ink2 }}>✓ {perk}</span>)}</div>}</button>; })}</div></div>}
      </div>
    </Screen>
  );
}

const PROXIMITY_PKG = [
  { id: 'free', name: 'Free', priceStr: 'Gratuit', tone: '#1F73C4', tag: 'Pour démarrer', perks: ['Fiche dans l’annuaire', 'Coordonnées et horaires', '3 photos', 'Demandes de devis'] },
  { id: 'pro', name: 'Pro', priceStr: '5 000 F', per: '/ mois', tone: OK.green, tag: 'Le plus choisi', perks: ['Priorité dans les résultats', 'Galerie illimitée', 'Statistiques de visites', 'Badge Pro après vérification'] },
  { id: 'business', name: 'Business', priceStr: '18 000 F', per: '/ mois', tone: '#B8860B', tag: 'Ateliers & équipes', perks: ['Plusieurs intervenants', 'Plusieurs zones d’intervention', 'Gestion des demandes', 'Support prioritaire'] },
];

function ProximityServicesScreen() {
  const { back, navigate } = useNav();
  const [query, setQuery] = useState('');
  const providers = [...readProximityProviders(), ...PROXIMITY_DEMOS];
  const filtered = query.trim() ? providers.filter(provider => `${provider.name} ${(provider.jobs || []).join(' ')} ${provider.city || ''}`.toLowerCase().includes(query.toLowerCase())) : providers;
  return (
    <Screen bg={OK.bg2} statusDark tabBar noScroll>
      <div data-screen-label="Services de proximité" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <GreenHeader title="Services de proximité" onBack={back}/>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: 112 }}>
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontFamily: FX, fontSize: 19, fontWeight: 800, color: OK.ink, lineHeight: 1.25 }}>De qui avez-vous besoin ?</div>
            <p style={{ margin: '4px 0 13px', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>Trouvez un savoir-faire disponible près de chez vous.</p>
            <div style={{ height: 50, borderRadius: 15, background: '#fff', border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <Icon name="search" size={17} color={OK.ink3}/>
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Plombier, nounou, carreleur…" style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', fontFamily: FX, fontSize: 13.5, color: OK.ink }}/>
              {query && <button onClick={() => setQuery('')} aria-label="Effacer" style={{ width: 28, height: 28, borderRadius: 999, border: 0, background: OK.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={13} color={OK.ink2}/></button>}
            </div>
          </div>

          <div style={{ padding: '20px 16px 0' }}>
            <div style={{ fontFamily: FX, fontSize: 15.5, fontWeight: 800, color: OK.ink }}>{query ? 'Résultats' : 'Prestataires près de vous'}</div>
            <div style={{ display: 'grid', gap: 11, marginTop: 10 }}>
              {filtered.map(provider => <button key={provider.id} onClick={() => navigate('proximity-profile', { id: provider.id })} style={{ width: '100%', minHeight: 108, padding: 11, borderRadius: 18, border: `1px solid ${OK.line}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', cursor: 'pointer', boxShadow: '0 3px 12px rgba(0,0,0,.055)' }}>
                <div style={{ width: 86, height: 86, flexShrink: 0, borderRadius: 17, overflow: 'hidden', background: OK.bg2 }}><Img src={provider.cover || 'assets/proximite-artisan.jpg'} style={{ width: '100%', height: '100%' }}/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: FX, fontSize: 11, fontWeight: 800, color: OK.green, textTransform: 'uppercase', letterSpacing: .25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{provider.jobs?.[0] || 'Service de proximité'}</div>
                  <div style={{ marginTop: 4, fontFamily: FX, fontSize: 15.5, fontWeight: 800, color: OK.ink, lineHeight: 1.25 }}>{provider.name}</div>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}><Icon name="pin" size={13} color={OK.ink3}/><span style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{provider.city}</span></div>
                </div>
                <span style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(11,124,57,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="chev-r" size={16} color={OK.green}/></span>
              </button>)}
              {!filtered.length && <div style={{ padding: '30px 20px', borderRadius: 18, background: '#fff', border: `1px solid ${OK.line}`, textAlign: 'center' }}><div style={{ fontFamily: FX, fontSize: 14, fontWeight: 800, color: OK.ink }}>Aucun prestataire trouvé</div><div style={{ marginTop: 4, fontFamily: FX, fontSize: 12, color: OK.ink2 }}>Essayez un autre métier ou un autre quartier.</div></div>}
            </div>
          </div>
          <div style={{ height: 30 }}/>
        </div>
      </div>
    </Screen>
  );
}

function ProximityVitrine({ provider, preview = false }) {
  const family = PROXIMITY_FAMILIES.find(item => item.id === provider.family);
  const photo = provider.cover || family?.img || 'assets/proximite-artisan.jpg';
  const cleanPhone = (provider.phone || '').replace(/[^+\d]/g, '');
  const whatsapp = (provider.whatsapp || provider.phone || '').replace(/\D/g, '');
  const action = callback => preview ? notifyDemo('Disponible après publication') : callback();
  return <div style={{ padding: '18px 16px 28px' }}>
    <div style={{ padding: '20px 16px 17px', borderRadius: 22, background: 'linear-gradient(145deg, #EAF6EE, #FFF8E1)', textAlign: 'center', border: '1px solid rgba(11,124,57,.12)' }}>
      <div style={{ width: 104, height: 104, margin: '0 auto', borderRadius: 999, overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 6px 18px rgba(0,0,0,.14)' }}><Img src={photo} style={{ width: '100%', height: '100%' }}/></div>
      <div style={{ marginTop: 12, fontFamily: FX, fontSize: 11, fontWeight: 800, color: OK.green, textTransform: 'uppercase', letterSpacing: .4 }}>{provider.jobs?.[0]}</div>
      <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><h1 style={{ margin: 0, fontFamily: FX, fontSize: 21, color: OK.ink }}>{provider.name}</h1>{provider.verified && <Icon name="verified" size={18} color={OK.green}/>}</div>
      <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}><Icon name="pin" size={13} color={OK.ink3}/><span style={{ fontFamily: FX, fontSize: 12, color: OK.ink2 }}>{provider.city}</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 17, paddingTop: 15, borderTop: '1px solid rgba(11,124,57,.13)' }}>
        {[[provider.rating ? String(provider.rating).replace('.', ',') : '—', 'Note'], [provider.experience || 'Nouveau', 'Expérience'], [provider.verified ? 'Vérifiée' : 'À vérifier', 'Identité']].map(([value, label], index) => <div key={label} style={{ borderLeft: index ? '1px solid rgba(11,124,57,.13)' : 'none' }}><div style={{ fontFamily: FX, fontSize: 13, fontWeight: 800, color: OK.ink }}>{value}</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 9.5, color: OK.ink3, textTransform: 'uppercase' }}>{label}</div></div>)}
      </div>
    </div>
    <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
      {cleanPhone && <button onClick={() => action(() => openProfileLink(`tel:${cleanPhone}`))} style={{ flex: 1, height: 48, border: 0, borderRadius: 14, background: OK.green, color: '#fff', fontFamily: FX, fontSize: 13.5, fontWeight: 800 }}>Appeler</button>}
      {whatsapp && <button onClick={() => action(() => openProfileLink(`https://wa.me/${whatsapp}`))} style={{ flex: 1, height: 48, border: 0, borderRadius: 14, background: OK.wa, color: '#fff', fontFamily: FX, fontSize: 13.5, fontWeight: 800 }}>WhatsApp</button>}
      <button onClick={() => action(() => notifyDemo(`Demande de devis envoyée à ${provider.name}`))} style={{ flex: 1, height: 48, border: `1.5px solid ${OK.green}`, borderRadius: 14, background: '#fff', color: OK.green, fontFamily: FX, fontSize: 13.5, fontWeight: 800 }}>Devis</button>
    </div>
    <div style={{ marginTop: 14, padding: 16, borderRadius: 18, background: '#fff', border: `1px solid ${OK.line}` }}><div style={{ fontFamily: FX, fontSize: 15, fontWeight: 800, color: OK.ink }}>À propos</div><p style={{ margin: '8px 0 0', fontFamily: FX, fontSize: 13, lineHeight: 1.6, color: OK.ink2 }}>{provider.bio}</p>{provider.jobs?.length > 1 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>{provider.jobs.map(job => <span key={job} style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(11,124,57,.08)', color: OK.green, fontFamily: FX, fontSize: 10.5, fontWeight: 800 }}>{job}</span>)}</div>}</div>
    <div style={{ marginTop: 12, padding: 16, borderRadius: 18, background: '#fff', border: `1px solid ${OK.line}` }}><div style={{ fontFamily: FX, fontSize: 15, fontWeight: 800, color: OK.ink }}>Disponibilité et tarif</div><div style={{ display: 'grid', gap: 13, marginTop: 13 }}>{[['clock', 'Disponibilité', provider.availability || 'Sur rendez-vous'], ['pin', 'Zone d’intervention', provider.zone || provider.city], ['wallet', 'Tarif indicatif', provider.priceLabel || 'Sur devis']].map(([icon, label, value]) => <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 11 }}><span style={{ width: 36, height: 36, borderRadius: 11, background: OK.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={16} color={OK.green}/></span><div><div style={{ fontFamily: FX, fontSize: 10, fontWeight: 800, color: OK.ink3, textTransform: 'uppercase' }}>{label}</div><div style={{ marginTop: 1, fontFamily: FX, fontSize: 12.5, fontWeight: 650, color: OK.ink }}>{value}</div></div></div>)}</div></div>
    <div style={{ marginTop: 15 }}><div style={{ fontFamily: FX, fontSize: 15, fontWeight: 800, color: OK.ink, marginBottom: 9 }}>Réalisations</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>{Array.from({ length: Math.max(1, Math.min(provider.photos || 1, 6)) }).map((_, index) => <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: 13, overflow: 'hidden' }}><Img src={photo} style={{ position: 'absolute', inset: 0, backgroundPosition: index % 2 ? 'center 35%' : 'center' }}/></div>)}</div></div>
  </div>;
}

function ProximityProviderScreen({ params }) {
  const { back } = useNav();
  const provider = proximityProviderById(params?.id);
  if (!provider) return <Screen bg={OK.bg2} statusDark><GreenHeader title="Profil introuvable" onBack={back}/></Screen>;
  return <Screen bg={OK.bg2} statusDark tabBar><div data-screen-label="Profil prestataire de proximité"><GreenHeader title="Profil du prestataire" onBack={back}/><ProximityVitrine provider={provider}/></div></Screen>;
}

function ProximityProfileScreen({ params }) {
  const { back } = useNav();
  const provider = proximityProviderById(params?.id);
  if (!provider) return <Screen bg={OK.bg2} statusDark><GreenHeader title="Fiche introuvable" onBack={back}/></Screen>;
  const family = PROXIMITY_FAMILIES.find(item => item.id === provider.family);
  const cleanPhone = (provider.phone || '').replace(/[^+\d]/g, '');
  const whatsapp = (provider.whatsapp || provider.phone || '').replace(/\D/g, '');
  return (
    <Screen bg={OK.bg2} statusDark tabBar>
      <div data-screen-label="Fiche service de proximité">
        <GreenHeader title="Service de proximité" onBack={back}/>
        <div style={{ position: 'relative', height: 190 }}>
          <Img src={provider.cover || family?.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.5))"/>
          {provider.emergency && <span style={{ position: 'absolute', left: 16, bottom: 14, background: '#C8302E', color: '#fff', borderRadius: 999, padding: '5px 11px', fontFamily: FX, fontSize: 10.5, fontWeight: 800 }}>Urgences 24/7</span>}
        </div>
        <div style={{ padding: '0 16px 28px', marginTop: -24, position: 'relative' }}>
          <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 18, padding: 16, boxShadow: '0 6px 20px rgba(0,0,0,.08)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 62, height: 62, borderRadius: 16, overflow: 'hidden', border: '3px solid #fff', background: OK.bg2, flexShrink: 0, marginTop: -36, boxShadow: '0 3px 12px rgba(0,0,0,.14)' }}><Img src={provider.cover || family?.img} style={{ width: '100%', height: '100%' }}/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><h1 style={{ margin: 0, fontFamily: FX, fontSize: 19, lineHeight: 1.2, color: OK.ink }}>{provider.name}</h1>{provider.verified && <Icon name="verified" size={17} color={OK.green}/>}</div>
                <div style={{ marginTop: 4, fontFamily: FX, fontSize: 11.5, fontWeight: 800, color: OK.green, textTransform: 'uppercase' }}>{provider.jobs?.join(' · ')}</div>
              </div>
            </div>
            <p style={{ margin: '13px 0 0', fontFamily: FX, fontSize: 13, lineHeight: 1.55, color: OK.ink2 }}>{provider.bio}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 13, flexWrap: 'wrap' }}>
              {provider.rating ? <span style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(245,184,0,.18)', color: '#715500', fontSize: 11, fontWeight: 800 }}>★ {String(provider.rating).replace('.', ',')}</span> : <span style={{ padding: '6px 10px', borderRadius: 999, background: OK.bg2, color: OK.ink2, fontSize: 11, fontWeight: 800 }}>Nouveau</span>}
              {provider.verified && <span style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(11,124,57,.09)', color: OK.green, fontSize: 11, fontWeight: 800 }}>Identité vérifiée</span>}
              {provider.experience && <span style={{ padding: '6px 10px', borderRadius: 999, background: OK.bg2, color: OK.ink2, fontSize: 11, fontWeight: 800 }}>{provider.experience} d’expérience</span>}
            </div>
            <div style={{ display: 'flex', gap: 9, marginTop: 15 }}>
              {cleanPhone && <button onClick={() => openProfileLink(`tel:${cleanPhone}`)} style={{ flex: 1, height: 44, border: 'none', borderRadius: 12, background: OK.green, color: '#fff', fontFamily: FX, fontWeight: 800, cursor: 'pointer' }}>Appeler</button>}
              {whatsapp && <button onClick={() => openProfileLink(`https://wa.me/${whatsapp}`)} style={{ flex: 1, height: 44, border: 'none', borderRadius: 12, background: OK.wa, color: '#fff', fontFamily: FX, fontWeight: 800, cursor: 'pointer' }}>WhatsApp</button>}
              <button onClick={() => notifyDemo(`Demande de devis envoyée à ${provider.name}`)} style={{ flex: 1.25, height: 44, border: `1.5px solid ${OK.green}`, borderRadius: 12, background: '#fff', color: OK.green, fontFamily: FX, fontWeight: 800, cursor: 'pointer' }}>Devis</button>
            </div>
          </div>

          <div style={{ marginTop: 12, background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 16, overflow: 'hidden' }}>
            {[
              ['pin', 'Zone d’intervention', provider.city || provider.zone],
              ['clock', 'Disponibilité', provider.availability || 'Sur rendez-vous'],
              ['wallet', 'Tarif', provider.priceLabel || 'Sur devis'],
              ['message', 'Langue de service', 'Français'],
            ].map(([icon, label, value], index) => <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 14px', borderTop: index ? `1px solid ${OK.line}` : 'none' }}><span style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(11,124,57,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={16} color={OK.green}/></span><div><div style={{ fontFamily: FX, fontSize: 10, fontWeight: 800, color: OK.ink3, textTransform: 'uppercase' }}>{label}</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 12.5, fontWeight: 650, color: OK.ink }}>{value}</div></div></div>)}
          </div>

          <div style={{ marginTop: 14 }}><div style={{ fontFamily: FX, fontSize: 15, fontWeight: 800, color: OK.ink, marginBottom: 9 }}>Réalisations</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>{Array.from({ length: Math.max(1, Math.min(provider.photos || 1, 6)) }).map((_, index) => <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}><Img src={provider.cover || family?.img} style={{ position: 'absolute', inset: 0, backgroundPosition: index % 2 ? 'center 35%' : 'center' }}/></div>)}</div></div>
        </div>
      </div>
    </Screen>
  );
}

function PublicationIntroScreen({ label, hero, heroPosition = 'center', title, subtitle, choices, steps, onBack }) {
  return (
    <Screen bg={OK.bg2} statusDark={false}>
      <div data-screen-label={label}>
        <div style={{ position: 'relative', minHeight: 300, padding: '52px 20px 34px', borderRadius: '0 0 26px 26px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Img src={hero} style={{ position: 'absolute', inset: 0, backgroundPosition: heroPosition }} overlay="linear-gradient(180deg, rgba(4,26,14,0.38) 0%, rgba(6,42,24,0.3) 42%, rgba(4,26,14,0.84) 100%)"/>
          <button onClick={onBack} aria-label="Retour" style={{ position: 'relative', width: 38, height: 38, borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)', cursor: 'pointer', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={18} color="#fff" strokeWidth={2.2}/>
          </button>
          <h1 style={{ margin: 'auto 0 0', position: 'relative', maxWidth: 285, fontFamily: FX, fontWeight: 800, fontSize: 28, lineHeight: 1.12, color: '#fff', letterSpacing: -0.5, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{title}</h1>
          <p style={{ margin: '10px 0 0', position: 'relative', fontFamily: FX, fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, maxWidth: 300 }}>{subtitle}</p>
        </div>

        <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
          {choices.map(choice => (
            <button key={choice.title} onClick={choice.onClick} style={{ minHeight: 76, textAlign: 'left', cursor: 'pointer', padding: 0, overflow: 'hidden', background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'stretch' }}>
              <div style={{ position: 'relative', width: 106, flexShrink: 0 }}><Img src={choice.img} style={{ position: 'absolute', inset: 0, backgroundPosition: choice.imgPosition || 'center' }}/></div>
              <div style={{ flex: 1, minWidth: 0, padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: FX, fontSize: 15.5, fontWeight: 800, color: OK.ink }}>{choice.title}</div>
                  <div style={{ fontFamily: FX, fontSize: 12, color: OK.ink2, marginTop: 5, lineHeight: 1.4 }}>{choice.sub}</div>
                </div>
                <Icon name="chev-r" size={17} color={OK.ink3} strokeWidth={2.4}/>
              </div>
            </button>
          ))}
        </div>

        <div style={{ padding: '24px 16px 28px' }}>
          <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 18, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
            {steps.map((text, index) => (
              <div key={text} style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <span style={{ width: 20, height: 20, flexShrink: 0, borderRadius: 999, background: 'rgba(11,124,57,0.1)', color: OK.green, fontFamily: FX, fontSize: 10.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{index + 1}</span>
                <span style={{ fontFamily: FX, fontSize: 12.5, fontWeight: 600, color: OK.ink2 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function LegacyProposerServiceScreen() {
  const { back, navigate, canBack } = useNav();
  const steps = ['Métier', 'Profil', 'Zone', 'Tarif', 'Confiance'];
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [jobPhase, setJobPhase] = useState('family');
  const [familyId, setFamilyId] = useState(null);
  const [jobSearch, setJobSearch] = useState('');
  const [mainJob, setMainJob] = useState('');
  const [secondaryJobs, setSecondaryJobs] = useState([]);
  const [customJob, setCustomJob] = useState('');
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const languages = ['Français'];
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('Libreville');
  const [quarter, setQuarter] = useState('');
  const [radius, setRadius] = useState('10 km');
  const [days, setDays] = useState(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']);
  const [hours, setHours] = useState('08:00 – 18:00');
  const [emergency, setEmergency] = useState(false);
  const [priceMode, setPriceMode] = useState('Sur devis');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [freeTravel, setFreeTravel] = useState(false);
  const [photos, setPhotos] = useState(1);
  const [identity, setIdentity] = useState(false);
  const [references, setReferences] = useState('');
  const [preview, setPreview] = useState(false);
  const [offer, setOffer] = useState(false);
  const [pkg, setPkg] = useState('free');
  const [submittedId, setSubmittedId] = useState(null);

  const family = PROXIMITY_FAMILIES.find(item => item.id === familyId);
  const cover = family?.img || 'assets/proximite-artisan.jpg';
  const searchedJobs = jobSearch.trim() ? PROXIMITY_JOBS.filter(job => job.toLowerCase().includes(jobSearch.toLowerCase())) : (family?.jobs || []);
  const amountSuffix = priceMode === 'À l’heure' ? 'FCFA / h' : priceMode === 'À la journée' ? 'FCFA / jour' : priceMode === 'Au m²' ? 'FCFA / m²' : 'FCFA';
  const priceLabel = priceMode === 'Sur devis' ? 'Sur devis' : priceMin && priceMax ? `${Number(priceMin).toLocaleString('fr-FR')} – ${Number(priceMax).toLocaleString('fr-FR')} ${amountSuffix}` : priceMin ? `Dès ${Number(priceMin).toLocaleString('fr-FR')} ${amountSuffix}` : priceMode;
  const valid = [Boolean(mainJob), Boolean(name.trim() && bio.trim() && phone.trim()), Boolean(city.trim() && days.length), Boolean(priceMode === 'Sur devis' || priceMin), Boolean(photos)][step];

  const pickFamily = id => {
    setFamilyId(id);
    setJobSearch('');
    if (mainJob && !PROXIMITY_FAMILIES.find(item => item.id === id)?.jobs.includes(mainJob)) {
      setMainJob('');
      setSecondaryJobs([]);
    }
  };
  const toggleSecondary = job => {
    if (job === mainJob) return;
    setSecondaryJobs(current => current.includes(job) ? current.filter(item => item !== job) : current.length < 2 ? [...current, job] : current);
  };
  const chooseMain = job => {
    setMainJob(job);
    setSecondaryJobs(current => current.filter(item => item !== job));
  };
  const goBack = () => {
    if (offer) { setOffer(false); setPreview(true); return; }
    if (preview) { setPreview(false); return; }
    if (step === 0 && jobPhase === 'jobs') { setJobPhase('family'); return; }
    if (step > 0) { setStep(current => current - 1); return; }
    if (started) { setStarted(false); return; }
    if (canBack) back(); else navigate('home');
  };
  const submit = () => {
    const id = `service-${Date.now()}`;
    saveProximityProvider({
      id, createdAt: Date.now(), name: name.trim(), family: familyId, jobs: [mainJob, ...secondaryJobs], bio: bio.trim(), experience: experience ? `${experience} an${experience === '1' ? '' : 's'}` : '', languages,
      phone, whatsapp, city: [quarter.trim(), city.trim()].filter(Boolean).join(' · '), zone: `${city.trim()} · rayon ${radius}`, availability: `${days.join(', ')} · ${hours}`, emergency,
      priceMode, priceLabel, freeTravel, photos, verified: identity, references: references.trim(), cover, pkg, rating: 0,
    });
    setSubmittedId(id);
  };

  if (!started) return <PublicationIntroScreen
    label="Introduction proposer un service"
    hero="assets/service-entry-hero-africa.jpg"
    heroPosition="center 46%"
    title="Proposer un service"
    subtitle="Mettez votre savoir-faire en avant et trouvez des clients près de chez vous."
    onBack={() => canBack ? back() : navigate('home')}
    choices={[
      { title: 'Créer mon profil', sub: 'Présentez votre métier, vos tarifs et vos réalisations', img: 'assets/service-entry-create-africa.jpg', imgPosition: 'center 42%', onClick: () => setStarted(true) },
    ]}
    steps={['Vous présentez votre métier', 'Vous complétez votre profil', 'Votre service devient visible']}
  />;

  if (submittedId) return <Screen bg={OK.bg2} statusDark><div data-screen-label="Service créé" style={{ position: 'absolute', inset: 0, padding: '0 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}><div style={{ width: 92, height: 92, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(11,124,57,.3)' }}><Icon name="check" size={46} color="#fff" strokeWidth={3}/></div><h1 style={{ margin: '22px 0 0', fontFamily: FX, fontSize: 24, color: OK.ink }}>Service créé</h1><p style={{ margin: '10px 0 0', fontFamily: FX, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55 }}>Votre profil <strong style={{ color: OK.ink }}>{name}</strong> apparaît maintenant dans les Services de proximité.</p>{identity && <span style={{ marginTop: 12, padding: '5px 11px', borderRadius: 999, background: 'rgba(245,184,0,.18)', color: '#745700', fontFamily: FX, fontSize: 10.5, fontWeight: 800 }}>Identité en cours de validation</span>}<div style={{ width: '100%', display: 'grid', gap: 10, marginTop: 24 }}><button onClick={() => navigate('proximity-profile', { id: submittedId })} style={{ height: 52, border: 0, borderRadius: 14, background: OK.green, color: '#fff', fontFamily: FX, fontSize: 14.5, fontWeight: 800 }}>Voir mon profil</button><button onClick={() => navigate('proximity-services')} style={{ height: 52, border: `1.5px solid ${OK.line}`, borderRadius: 14, background: '#fff', color: OK.ink, fontFamily: FX, fontSize: 14.5, fontWeight: 800 }}>Voir les services de proximité</button></div></div></Screen>;

  if (preview) return <Screen bg={OK.bg2} statusDark footerPad={92} footer={<div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, display: 'flex', gap: 10, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`, borderTop: `1px solid ${OK.line}`, background: '#fff' }}><button onClick={() => setPreview(false)} style={{ flex: 1, height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, fontFamily: FX, fontWeight: 800 }}>Modifier</button><button onClick={() => { setPreview(false); setOffer(true); }} style={{ flex: 1.35, height: 52, borderRadius: 14, border: 0, background: OK.green, color: '#fff', fontFamily: FX, fontWeight: 800 }}>Choisir mon forfait</button></div>}><div data-screen-label="Aperçu service"><GreenHeader title="Aperçu de la fiche" onBack={() => setPreview(false)}/><div style={{ position: 'relative', height: 190 }}><Img src={cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.5))"/></div><div style={{ padding: '0 16px 24px', marginTop: -26, position: 'relative' }}><PubCard><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 58, height: 58, borderRadius: 15, overflow: 'hidden', border: '3px solid #fff', marginTop: -34 }}><Img src={cover} style={{ width: '100%', height: '100%' }}/></div><div><div style={{ display: 'flex', gap: 5, alignItems: 'center' }}><strong style={{ fontFamily: FX, fontSize: 18, color: OK.ink }}>{name}</strong>{identity && <Icon name="verified" size={16} color={OK.green}/>}</div><div style={{ color: OK.green, fontFamily: FX, fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>{[mainJob, ...secondaryJobs].join(' · ')}</div></div></div><p style={{ fontFamily: FX, fontSize: 13, color: OK.ink2, lineHeight: 1.55 }}>{bio}</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{[priceLabel, `${quarter || city} · ${radius}`, emergency && 'Urgences 24/7'].filter(Boolean).map(item => <span key={item} style={{ padding: '6px 9px', borderRadius: 999, background: OK.bg2, fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: OK.ink2 }}>{item}</span>)}</div></PubCard><div style={{ marginTop: 12 }}><PubCard title="Disponibilités & contact" icon="clock"><div style={{ fontFamily: FX, fontSize: 12.5, lineHeight: 1.7, color: OK.ink2 }}>{days.join(', ')} · {hours}<br/>{phone}{whatsapp && whatsapp !== phone ? ` · WhatsApp ${whatsapp}` : ''}</div></PubCard></div><div style={{ marginTop: 12 }}><PubCard title="Portfolio" icon="camera"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>{Array.from({ length: photos }).slice(0, 6).map((_, index) => <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}><Img src={cover} style={{ position: 'absolute', inset: 0 }}/></div>)}</div></PubCard></div></div></div></Screen>;

  if (offer) return <Screen bg={OK.bg2} statusDark footerPad={92} footer={<PubBar label="Soumettre pour validation" icon="check" onClick={submit}/>}><div data-screen-label="Forfait service"><GreenHeader title="Votre forfait" onBack={goBack}/><div style={{ padding: '16px' }}><h2 style={{ margin: 0, fontFamily: FX, fontSize: 19, color: OK.green }}>Choisissez votre visibilité</h2><p style={{ margin: '5px 0 14px', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>Une fiche simple est gratuite. Vous pourrez changer de forfait plus tard.</p><div style={{ display: 'grid', gap: 11 }}>{PROXIMITY_PKG.map(item => { const on = pkg === item.id; return <button key={item.id} onClick={() => setPkg(item.id)} style={{ padding: '14px 15px', textAlign: 'left', borderRadius: 16, border: on ? `2px solid ${item.tone}` : `1px solid ${OK.line}`, background: '#fff', cursor: 'pointer' }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><strong style={{ flex: 1, fontFamily: FX, fontSize: 16, color: OK.ink }}>{item.name}</strong><strong style={{ fontFamily: FX, fontSize: 19, color: OK.ink }}>{item.priceStr}</strong>{item.per && <span style={{ fontFamily: FX, fontSize: 10.5, color: OK.ink3 }}>{item.per}</span>}</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 11, color: OK.ink3 }}>{item.tag}</div>{on && <div style={{ display: 'grid', gap: 6, marginTop: 11, paddingTop: 10, borderTop: `1px solid ${OK.line}` }}>{item.perks.map(perk => <span key={perk} style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink2 }}>✓ {perk}</span>)}</div>}</button>; })}</div></div></div></Screen>;

  if (step === 0) {
    const footer = jobPhase === 'family'
      ? <PubBar label="Choisir mon métier" disabled={!familyId} onClick={() => familyId && setJobPhase('jobs')}/>
      : <PubBar label="Continuer" disabled={!mainJob} onClick={() => mainJob && setStep(1)}/>;
    return (
      <Screen bg={OK.bg2} statusDark footerPad={92} footer={footer}>
        <div data-screen-label={jobPhase === 'family' ? 'Famille de service' : 'Choix du métier'}>
          <GreenHeader title="Proposer un service" onBack={goBack}/>
          <EtabProgress steps={steps} step={0}/>
          {jobPhase === 'family' ? <div>
            <div style={{ margin: '12px 18px 0', fontFamily: FX, fontSize: 18, fontWeight: 800, color: OK.green }}>Dans quel domaine ?</div>
            <p style={{ margin: '4px 18px 0', fontFamily: FX, fontSize: 12.5, lineHeight: 1.45, color: OK.ink2 }}>Choisissez la famille qui correspond le mieux à votre activité.</p>
            <div style={{ padding: '13px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 11 }}>
              {PROXIMITY_FAMILIES.map(item => <button key={item.id} onClick={() => pickFamily(item.id)} style={{ position: 'relative', height: 118, padding: 0, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: familyId === item.id ? `3px solid ${OK.green}` : `1px solid ${OK.line}`, textAlign: 'left', boxShadow: familyId === item.id ? '0 5px 15px rgba(11,124,57,.2)' : '0 2px 7px rgba(0,0,0,.07)' }}>
                <ProximityFamilyVisual item={item} selected={familyId === item.id}/>
                {familyId === item.id && <span style={{ position: 'absolute', top: 8, right: 8, width: 25, height: 25, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={14} color="#fff" strokeWidth={3}/></span>}
                <span style={{ position: 'absolute', left: 11, right: 9, bottom: 10, color: '#fff', fontFamily: FX, fontSize: 13, lineHeight: 1.2, fontWeight: 800 }}>{item.label}</span>
              </button>)}
            </div>
          </div> : <div>
            <div style={{ margin: '12px 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setJobPhase('family')} style={{ width: 42, height: 42, padding: 0, borderRadius: 11, overflow: 'hidden', border: `1px solid ${OK.line}`, position: 'relative', flexShrink: 0 }}><Img src={cover} style={{ position: 'absolute', inset: 0 }}/></button>
              <div><div style={{ fontFamily: FX, fontSize: 17, fontWeight: 800, color: OK.green }}>Choisissez votre métier</div><div style={{ marginTop: 1, fontFamily: FX, fontSize: 11.5, color: OK.ink2 }}>{family?.label}</div></div>
            </div>
            <div style={{ margin: '12px 16px 0', height: 46, background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 13, display: 'flex', alignItems: 'center', gap: 9, padding: '0 13px' }}><Icon name="search" size={16} color={OK.ink3}/><input value={jobSearch} onChange={event => setJobSearch(event.target.value)} placeholder="Rechercher un métier…" style={{ flex: 1, border: 0, outline: 0, fontFamily: FX, fontSize: 13.5, color: OK.ink }}/></div>
            <div style={{ padding: '12px 16px 0', display: 'grid', gap: 8 }}>
              {searchedJobs.map(job => { const primary = mainJob === job; const secondary = secondaryJobs.includes(job); return <div key={job} style={{ minHeight: 56, padding: '7px 8px 7px 14px', borderRadius: 14, border: primary || secondary ? `2px solid ${OK.green}` : `1px solid ${OK.line}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => chooseMain(job)} style={{ flex: 1, alignSelf: 'stretch', textAlign: 'left', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: FX, fontSize: 13.5, fontWeight: primary ? 800 : 650, color: primary ? OK.green : OK.ink }}>{job}{primary && <span style={{ display: 'block', marginTop: 2, fontSize: 9.5, color: OK.green }}>MÉTIER PRINCIPAL SÉLECTIONNÉ</span>}</button>
                {mainJob && !primary && <button onClick={() => toggleSecondary(job)} aria-label={`Ajouter ${job} comme métier secondaire`} style={{ minWidth: 38, height: 38, padding: '0 9px', borderRadius: 11, border: secondary ? 0 : `1px solid ${OK.line}`, background: secondary ? OK.green : OK.bg2, color: secondary ? '#fff' : OK.green, fontFamily: FX, fontWeight: 800, cursor: 'pointer' }}>{secondary ? '✓' : '+'}</button>}
              </div>; })}
              {searchedJobs.length === 0 && <PubCard><label style={PUB_LABEL}>Mon métier n’est pas dans la liste</label><div style={{ display: 'flex', gap: 8 }}><input value={customJob} onChange={event => setCustomJob(event.target.value)} placeholder="Saisissez votre métier" style={PUB_FIELD}/><button onClick={() => customJob.trim() && chooseMain(customJob.trim())} style={{ width: 86, border: 0, borderRadius: 12, background: OK.green, color: '#fff', fontWeight: 800 }}>Ajouter</button></div></PubCard>}
              <div style={{ fontFamily: FX, fontSize: 11, color: OK.ink3, lineHeight: 1.45 }}>Touchez d’abord votre métier principal. Vous pourrez ensuite ajouter jusqu’à 2 activités secondaires avec le bouton +.</div>
            </div>
          </div>}
          <div style={{ height: 24 }}/>
        </div>
      </Screen>
    );
  }

  const footer = <PubBar label={step === 4 ? 'Voir l’aperçu' : 'Continuer'} disabled={!valid} onClick={() => valid && (step === 4 ? setPreview(true) : setStep(current => current + 1))}/>;
  return (
    <Screen bg={OK.bg2} statusDark footerPad={92} footer={footer}>
      <div data-screen-label="Proposer un service">
        <GreenHeader title="Proposer un service" onBack={goBack}/>
        <EtabProgress steps={steps} step={step}/>

        {step === 0 && <div><div style={{ margin: '12px 18px 0', fontFamily: FX, fontSize: 18, fontWeight: 800, color: OK.green }}>Quel est votre métier ?</div><p style={{ margin: '4px 18px 0', fontFamily: FX, fontSize: 12.5, lineHeight: 1.45, color: OK.ink2 }}>Choisissez une famille, puis 1 métier principal et jusqu’à 2 métiers secondaires.</p><div style={{ margin: '13px 16px 0', height: 46, background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 13, display: 'flex', alignItems: 'center', gap: 9, padding: '0 13px' }}><Icon name="search" size={16} color={OK.ink3}/><input value={jobSearch} onChange={event => setJobSearch(event.target.value)} placeholder="Rechercher maçon, nounou, plombier…" style={{ flex: 1, border: 0, outline: 0, fontFamily: FX, fontSize: 13.5, color: OK.ink }}/></div>{!jobSearch && <div style={{ padding: '12px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 11 }}>{PROXIMITY_FAMILIES.map(item => <button key={item.id} onClick={() => pickFamily(item.id)} style={{ position: 'relative', height: 106, padding: 0, borderRadius: 15, overflow: 'hidden', cursor: 'pointer', border: familyId === item.id ? `2.5px solid ${OK.green}` : `1px solid ${OK.line}`, textAlign: 'left' }}><ProximityFamilyVisual item={item} selected={familyId === item.id}/>{familyId === item.id && <span style={{ position: 'absolute', top: 7, right: 7, width: 23, height: 23, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={13} color="#fff" strokeWidth={3}/></span>}<span style={{ position: 'absolute', left: 10, right: 9, bottom: 9, color: '#fff', fontFamily: FX, fontSize: 12.5, lineHeight: 1.2, fontWeight: 800 }}>{item.label}</span></button>)}</div>}{(family || jobSearch) && <div style={{ padding: '14px 16px 0' }}><div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}><strong style={{ fontFamily: FX, fontSize: 14, color: OK.ink }}>{jobSearch ? 'Résultats' : family.label}</strong><span style={{ fontFamily: FX, fontSize: 10.5, color: OK.ink3 }}>{secondaryJobs.length}/2 secondaires</span></div><div style={{ display: 'grid', gap: 7 }}>{searchedJobs.map(job => { const primary = mainJob === job; const secondary = secondaryJobs.includes(job); return <div key={job} style={{ minHeight: 50, padding: '7px 8px 7px 13px', borderRadius: 13, border: primary || secondary ? `1.5px solid ${OK.green}` : `1px solid ${OK.line}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><button onClick={() => chooseMain(job)} style={{ flex: 1, textAlign: 'left', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: FX, fontSize: 13, fontWeight: primary ? 800 : 650, color: primary ? OK.green : OK.ink }}>{job}{primary && <span style={{ display: 'block', marginTop: 1, fontSize: 9.5, color: OK.green }}>MÉTIER PRINCIPAL</span>}</button>{!primary && <button onClick={() => toggleSecondary(job)} aria-label={`Métier secondaire ${job}`} style={{ minWidth: 34, height: 34, padding: '0 9px', borderRadius: 10, border: secondary ? 0 : `1px solid ${OK.line}`, background: secondary ? OK.green : OK.bg2, color: secondary ? '#fff' : OK.green, fontFamily: FX, fontWeight: 800, cursor: 'pointer' }}>{secondary ? '✓' : '+'}</button>}</div>; })}{searchedJobs.length === 0 && <div style={{ padding: 12, background: '#fff', borderRadius: 13, border: `1px solid ${OK.line}` }}><label style={PUB_LABEL}>Mon métier n’est pas dans la liste</label><div style={{ display: 'flex', gap: 8 }}><input value={customJob} onChange={event => setCustomJob(event.target.value)} placeholder="Saisissez votre métier" style={PUB_FIELD}/><button onClick={() => customJob.trim() && chooseMain(customJob.trim())} style={{ width: 86, border: 0, borderRadius: 12, background: OK.green, color: '#fff', fontWeight: 800 }}>Ajouter</button></div></div>}</div></div>}</div>}

        {step === 1 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}><PubCard title="Votre profil" icon="user"><div style={{ display: 'grid', gap: 13 }}><div><label style={PUB_LABEL}>Nom ou atelier</label><input value={name} onChange={event => setName(event.target.value)} placeholder="Ex : Junior Plomberie" style={PUB_FIELD}/></div><div><label style={PUB_LABEL}>Années d’expérience</label><input value={experience} onChange={event => setExperience(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="Ex : 5" style={PUB_FIELD}/></div><div><label style={PUB_LABEL}>Présentation courte</label><textarea value={bio} onChange={event => setBio(event.target.value)} rows={4} placeholder="Présentez votre savoir-faire et les travaux que vous réalisez…" style={{ ...PUB_FIELD, height: 'auto', padding: '12px 14px', resize: 'none', lineHeight: 1.5 }}/></div><div><label style={PUB_LABEL}>Langue de service</label><div style={{ height: 46, padding: '0 14px', borderRadius: 12, border: `1px solid ${OK.line}`, background: OK.bg2, display: 'flex', alignItems: 'center', gap: 9, fontFamily: FX, fontSize: 13, fontWeight: 700, color: OK.ink2 }}><Icon name="message" size={16} color={OK.green}/> Français</div></div></div></PubCard><PubCard title="Contact" icon="phone"><div style={{ display: 'flex', gap: 10 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Téléphone</label><input value={phone} onChange={event => setPhone(event.target.value)} placeholder="+241…" inputMode="tel" style={PUB_FIELD}/></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>WhatsApp</label><input value={whatsapp} onChange={event => setWhatsapp(event.target.value)} placeholder="+241…" inputMode="tel" style={PUB_FIELD}/></div></div></PubCard></div>}

        {step === 2 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}><PubCard title="Zone d’intervention" icon="pin"><div style={{ display: 'grid', gap: 13 }}><div style={{ display: 'flex', gap: 10 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Ville</label><input value={city} onChange={event => setCity(event.target.value)} style={PUB_FIELD}/></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>Quartier de départ</label><input value={quarter} onChange={event => setQuarter(event.target.value)} placeholder="Ex : Nkembo" style={PUB_FIELD}/></div></div><div><label style={PUB_LABEL}>Rayon de déplacement</label><ChipRow opts={['5 km', '10 km', '25 km', 'Toute la ville', 'Hors ville']} value={radius} onPick={setRadius}/></div></div></PubCard><PubCard title="Disponibilité" icon="clock"><div style={{ display: 'grid', gap: 13 }}><div><label style={PUB_LABEL}>Jours</label><MultiChipRow opts={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']} values={days} onChange={setDays}/></div><div><label style={PUB_LABEL}>Créneaux</label><input value={hours} onChange={event => setHours(event.target.value)} placeholder="Ex : 08:00 – 18:00" style={PUB_FIELD}/></div><button onClick={() => setEmergency(value => !value)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 13, border: `1.5px solid ${emergency ? '#C8302E' : OK.line}`, background: emergency ? 'rgba(200,48,46,.06)' : '#fff', textAlign: 'left' }}><Toggle on={emergency}/><div><strong style={{ display: 'block', fontFamily: FX, fontSize: 13, color: OK.ink }}>Urgences 24/7</strong><span style={{ fontFamily: FX, fontSize: 11, color: OK.ink3 }}>À activer seulement si vous intervenez réellement à toute heure.</span></div></button></div></PubCard></div>}

        {step === 3 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}><PubCard title="Mode de tarification" icon="wallet"><ChipRow opts={['Sur devis', 'À l’heure', 'À la journée', 'Au m²', 'Forfait']} value={priceMode} onPick={setPriceMode}/>{priceMode !== 'Sur devis' && <div style={{ display: 'flex', gap: 10, marginTop: 14 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Prix minimum</label><input value={priceMin} onChange={event => setPriceMin(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" style={PUB_FIELD}/></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>Prix maximum</label><input value={priceMax} onChange={event => setPriceMax(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="Facultatif" style={PUB_FIELD}/></div></div>}<div style={{ marginTop: 13, padding: 12, borderRadius: 12, background: 'rgba(11,124,57,.07)', fontFamily: FX, fontSize: 12, lineHeight: 1.45, color: OK.ink2 }}>Tarif affiché : <strong style={{ color: OK.green }}>{priceLabel}</strong></div></PubCard><button onClick={() => setFreeTravel(value => !value)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 15, border: `1px solid ${OK.line}`, background: '#fff', textAlign: 'left' }}><Toggle on={freeTravel}/><div><strong style={{ display: 'block', fontFamily: FX, fontSize: 13.5, color: OK.ink }}>Déplacement gratuit</strong><span style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink3 }}>Dans la zone indiquée</span></div></button></div>}

        {step === 4 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}><PubCard title="Photos de réalisations" icon="camera"><p style={{ margin: '0 0 12px', fontFamily: FX, fontSize: 12, lineHeight: 1.5, color: OK.ink2 }}>Le portfolio est essentiel pour montrer la qualité de votre travail.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{Array.from({ length: photos }).map((_, index) => <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: 11, overflow: 'hidden' }}><Img src={cover} style={{ position: 'absolute', inset: 0 }}/>{photos > 1 && <button onClick={() => setPhotos(value => value - 1)} style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, border: 0, borderRadius: 999, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={11} color="#fff"/></button>}</div>)}{photos < 6 && <button onClick={() => setPhotos(value => value + 1)} style={{ aspectRatio: '1', borderRadius: 11, border: `1.5px dashed ${OK.green}`, background: 'rgba(11,124,57,.05)', color: OK.green, fontFamily: FX, fontSize: 11, fontWeight: 800 }}>+ Photo</button>}</div></PubCard><PubCard title="Confiance" icon="verified"><button onClick={() => setIdentity(value => !value)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: 12, borderRadius: 13, border: `1.5px solid ${identity ? OK.green : OK.line}`, background: identity ? 'rgba(11,124,57,.06)' : '#fff', textAlign: 'left' }}><Toggle on={identity}/><div><strong style={{ display: 'block', fontFamily: FX, fontSize: 13, color: OK.ink }}>Ajouter ma pièce d’identité</strong><span style={{ fontFamily: FX, fontSize: 11, lineHeight: 1.4, color: OK.ink3 }}>Facultatif · débloque le badge « Identité vérifiée » après contrôle.</span></div></button><div style={{ marginTop: 13 }}><label style={PUB_LABEL}>Référence ou recommandation</label><textarea value={references} onChange={event => setReferences(event.target.value)} rows={3} placeholder="Ex : contact d’un ancien client, chantier réalisé…" style={{ ...PUB_FIELD, height: 'auto', padding: '11px 13px', resize: 'none' }}/></div></PubCard></div>}
        <div style={{ height: 22 }}/>
      </div>
    </Screen>
  );
}

// Parcours allégé : les informations déjà connues du profil connecté sont
// réutilisées automatiquement. Seules les données propres à cette offre sont
// demandées ici.
function ProposerServiceScreen() {
  const { back, navigate, canBack } = useNav();
  const steps = ['Zone', 'Tarif', 'Réalisations'];
  const linked = CONNECTED_SERVICE_PROFILE;
  const family = PROXIMITY_FAMILIES.find(item => item.id === linked.family);
  const [step, setStep] = useState(0);
  const [quarter, setQuarter] = useState('');
  const [radius, setRadius] = useState('10 km');
  const [days, setDays] = useState(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']);
  const [hours, setHours] = useState('08:00 – 18:00');
  const [emergency, setEmergency] = useState(false);
  const [priceMode, setPriceMode] = useState('Sur devis');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [freeTravel, setFreeTravel] = useState(false);
  const [photos, setPhotos] = useState(1);
  const [references, setReferences] = useState('');
  const [preview, setPreview] = useState(false);
  const [offer, setOffer] = useState(false);
  const [pkg, setPkg] = useState('free');
  const [submittedId, setSubmittedId] = useState(null);

  const city = linked.city;
  const cover = linked.cover || family?.img || 'assets/proximite-artisan.jpg';
  const amountSuffix = priceMode === 'À l’heure' ? 'FCFA / h' : priceMode === 'À la journée' ? 'FCFA / jour' : priceMode === 'Au m²' ? 'FCFA / m²' : 'FCFA';
  const priceLabel = priceMode === 'Sur devis' ? 'Sur devis' : priceMin && priceMax ? `${Number(priceMin).toLocaleString('fr-FR')} – ${Number(priceMax).toLocaleString('fr-FR')} ${amountSuffix}` : priceMin ? `Dès ${Number(priceMin).toLocaleString('fr-FR')} ${amountSuffix}` : priceMode;
  const valid = [Boolean(city.trim() && days.length), Boolean(priceMode === 'Sur devis' || priceMin), Boolean(photos)][step];
  const goBack = () => {
    if (offer) { setOffer(false); setPreview(true); return; }
    if (preview) { setPreview(false); return; }
    if (step > 0) { setStep(current => current - 1); return; }
    if (canBack) back(); else navigate('home');
  };
  const draftProvider = {
    ...linked,
    city: [quarter.trim(), city.trim()].filter(Boolean).join(' · '),
    zone: `${city.trim()} · rayon ${radius}`,
    availability: `${days.join(', ')} · ${hours}`,
    emergency,
    priceMode,
    priceLabel,
    freeTravel,
    photos,
    references: references.trim(),
    pkg,
    rating: 0,
  };
  const submit = () => {
    const id = `service-${Date.now()}`;
    saveProximityProvider({ ...draftProvider, id, createdAt: Date.now() });
    setSubmittedId(id);
  };

  if (submittedId) return <Screen bg={OK.bg2} statusDark><div data-screen-label="Service créé" style={{ position: 'absolute', inset: 0, padding: '0 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}><div style={{ width: 92, height: 92, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(11,124,57,.3)' }}><Icon name="check" size={46} color="#fff" strokeWidth={3}/></div><h1 style={{ margin: '22px 0 0', fontFamily: FX, fontSize: 24, color: OK.ink }}>Service créé</h1><p style={{ margin: '10px 0 0', fontFamily: FX, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55 }}>Votre service lié au profil <strong style={{ color: OK.ink }}>{linked.name}</strong> apparaît maintenant dans les Services de proximité.</p><div style={{ width: '100%', display: 'grid', gap: 10, marginTop: 24 }}><button onClick={() => navigate('proximity-profile', { id: submittedId })} style={{ height: 52, border: 0, borderRadius: 14, background: OK.green, color: '#fff', fontFamily: FX, fontSize: 14.5, fontWeight: 800 }}>Voir ma vitrine</button><button onClick={() => navigate('proximity-services')} style={{ height: 52, border: `1.5px solid ${OK.line}`, borderRadius: 14, background: '#fff', color: OK.ink, fontFamily: FX, fontSize: 14.5, fontWeight: 800 }}>Voir les services de proximité</button></div></div></Screen>;

  if (preview) return <Screen bg={OK.bg2} statusDark footerPad={92} footer={<div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, display: 'flex', gap: 10, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`, borderTop: `1px solid ${OK.line}`, background: '#fff' }}><button onClick={() => setPreview(false)} style={{ flex: 1, height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, fontFamily: FX, fontWeight: 800 }}>Modifier</button><button onClick={() => { setPreview(false); setOffer(true); }} style={{ flex: 1.35, height: 52, borderRadius: 14, border: 0, background: OK.green, color: '#fff', fontFamily: FX, fontWeight: 800 }}>Choisir mon forfait</button></div>}><div data-screen-label="Aperçu de la vitrine"><GreenHeader title="Aperçu de la vitrine" onBack={() => setPreview(false)}/><ProximityVitrine provider={draftProvider} preview/></div></Screen>;

  if (offer) return <Screen bg={OK.bg2} statusDark footerPad={92} footer={<PubBar label="Publier mon service" icon="check" onClick={submit}/>}><div data-screen-label="Forfait service"><GreenHeader title="Votre forfait" onBack={goBack}/><div style={{ padding: '16px' }}><h2 style={{ margin: 0, fontFamily: FX, fontSize: 19, color: OK.green }}>Choisissez votre visibilité</h2><p style={{ margin: '5px 0 14px', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>Une vitrine simple est gratuite. Vous pourrez changer de forfait plus tard.</p><div style={{ display: 'grid', gap: 11 }}>{PROXIMITY_PKG.map(item => { const on = pkg === item.id; return <button key={item.id} onClick={() => setPkg(item.id)} style={{ padding: '14px 15px', textAlign: 'left', borderRadius: 16, border: on ? `2px solid ${item.tone}` : `1px solid ${OK.line}`, background: '#fff', cursor: 'pointer' }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><strong style={{ flex: 1, fontFamily: FX, fontSize: 16, color: OK.ink }}>{item.name}</strong><strong style={{ fontFamily: FX, fontSize: 19, color: OK.ink }}>{item.priceStr}</strong>{item.per && <span style={{ fontFamily: FX, fontSize: 10.5, color: OK.ink3 }}>{item.per}</span>}</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 11, color: OK.ink3 }}>{item.tag}</div>{on && <div style={{ display: 'grid', gap: 6, marginTop: 11, paddingTop: 10, borderTop: `1px solid ${OK.line}` }}>{item.perks.map(perk => <span key={perk} style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink2 }}>✓ {perk}</span>)}</div>}</button>; })}</div></div></div></Screen>;

  const footer = <PubBar label={step === 2 ? 'Voir l’aperçu' : 'Continuer'} disabled={!valid} onClick={() => valid && (step === 2 ? setPreview(true) : setStep(current => current + 1))}/>;
  return <Screen bg={OK.bg2} statusDark footerPad={92} footer={footer}><div data-screen-label="Proposer un service"><GreenHeader title="Proposer un service" onBack={goBack}/><EtabProgress steps={steps} step={step}/>
    {step === 0 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}>
      <div style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 11, borderRadius: 16, background: '#fff', border: `1px solid ${OK.line}` }}><div style={{ width: 48, height: 48, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}><Img src={linked.cover} style={{ width: '100%', height: '100%' }}/></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: OK.ink3, textTransform: 'uppercase' }}>Profil lié</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 15, fontWeight: 800, color: OK.ink }}>{linked.name}</div><div style={{ marginTop: 2, fontFamily: FX, fontSize: 11.5, color: OK.green }}>{linked.jobs.join(' · ')}</div></div><Icon name="verified" size={17} color={OK.green}/></div>
      <PubCard title="Zone d’intervention" icon="pin"><div style={{ display: 'grid', gap: 13 }}><div style={{ display: 'flex', gap: 10 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Ville</label><div style={{ ...PUB_FIELD, display: 'flex', alignItems: 'center', color: OK.ink2 }}>{city}</div></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>Quartier de départ</label><input value={quarter} onChange={event => setQuarter(event.target.value)} placeholder="Ex : Nkembo" style={PUB_FIELD}/></div></div><div><label style={PUB_LABEL}>Rayon de déplacement</label><ChipRow opts={['5 km', '10 km', '25 km', 'Toute la ville', 'Hors ville']} value={radius} onPick={setRadius}/></div></div></PubCard>
      <PubCard title="Disponibilité" icon="clock"><div style={{ display: 'grid', gap: 13 }}><div><label style={PUB_LABEL}>Jours</label><MultiChipRow opts={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']} values={days} onChange={setDays}/></div><div><label style={PUB_LABEL}>Créneaux</label><input value={hours} onChange={event => setHours(event.target.value)} placeholder="Ex : 08:00 – 18:00" style={PUB_FIELD}/></div><button onClick={() => setEmergency(value => !value)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 13, border: `1.5px solid ${emergency ? '#C8302E' : OK.line}`, background: emergency ? 'rgba(200,48,46,.06)' : '#fff', textAlign: 'left' }}><Toggle on={emergency}/><div><strong style={{ display: 'block', fontFamily: FX, fontSize: 13, color: OK.ink }}>Urgences 24/7</strong><span style={{ fontFamily: FX, fontSize: 11, color: OK.ink3 }}>À activer seulement si vous intervenez réellement à toute heure.</span></div></button></div></PubCard>
    </div>}
    {step === 1 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}><PubCard title="Mode de tarification" icon="wallet"><ChipRow opts={['Sur devis', 'À l’heure', 'À la journée', 'Au m²', 'Forfait']} value={priceMode} onPick={setPriceMode}/>{priceMode !== 'Sur devis' && <div style={{ display: 'flex', gap: 10, marginTop: 14 }}><div style={{ flex: 1 }}><label style={PUB_LABEL}>Prix minimum</label><input value={priceMin} onChange={event => setPriceMin(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" style={PUB_FIELD}/></div><div style={{ flex: 1 }}><label style={PUB_LABEL}>Prix maximum</label><input value={priceMax} onChange={event => setPriceMax(event.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="Facultatif" style={PUB_FIELD}/></div></div>}<div style={{ marginTop: 13, padding: 12, borderRadius: 12, background: 'rgba(11,124,57,.07)', fontFamily: FX, fontSize: 12, lineHeight: 1.45, color: OK.ink2 }}>Tarif affiché : <strong style={{ color: OK.green }}>{priceLabel}</strong></div></PubCard><button onClick={() => setFreeTravel(value => !value)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 15, border: `1px solid ${OK.line}`, background: '#fff', textAlign: 'left' }}><Toggle on={freeTravel}/><div><strong style={{ display: 'block', fontFamily: FX, fontSize: 13.5, color: OK.ink }}>Déplacement gratuit</strong><span style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink3 }}>Dans la zone indiquée</span></div></button></div>}
    {step === 2 && <div style={{ padding: '12px 16px', display: 'grid', gap: 12 }}><PubCard title="Photos de réalisations" icon="camera"><p style={{ margin: '0 0 12px', fontFamily: FX, fontSize: 12, lineHeight: 1.5, color: OK.ink2 }}>Le portfolio du profil est conservé et vous pouvez ajouter les réalisations de ce service.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{Array.from({ length: photos }).map((_, index) => <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: 11, overflow: 'hidden' }}><Img src={cover} style={{ position: 'absolute', inset: 0 }}/>{photos > 1 && <button onClick={() => setPhotos(value => value - 1)} aria-label="Supprimer la photo" style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, border: 0, borderRadius: 999, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={11} color="#fff"/></button>}</div>)}{photos < 6 && <button onClick={() => setPhotos(value => value + 1)} style={{ aspectRatio: '1', borderRadius: 11, border: `1.5px dashed ${OK.green}`, background: 'rgba(11,124,57,.05)', color: OK.green, fontFamily: FX, fontSize: 11, fontWeight: 800 }}>+ Photo</button>}</div></PubCard><PubCard title="Référence ou recommandation" icon="verified"><textarea value={references} onChange={event => setReferences(event.target.value)} rows={3} placeholder="Ex : contact d’un ancien client, chantier réalisé…" style={{ ...PUB_FIELD, height: 'auto', padding: '11px 13px', resize: 'none' }}/></PubCard></div>}
    <div style={{ height: 22 }}/>
  </div></Screen>;
}

function PublierScreen() {
  const { back, navigate, canBack } = useNav();
  const cats = MARKET_CATS.filter(c => !['all', 'gabon', 'services', 'events'].includes(c.id));
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState(null);
  const [media, setMedia] = useState([{ type: 'photo' }]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [form, setForm] = useState({});
  const [priceMode, setPriceMode] = useState('Prix fixe');
  const [price, setPrice] = useState('');
  const [nego, setNego] = useState(false);
  const [loc, setLoc] = useState('');
  const [pkg, setPkg] = useState('free');
  const [preview, setPreview] = useState(false);

  const PH_IMGS = [
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=700&q=80&auto=format&fit=crop',
  ];
  const coverImg = PH_IMGS[0];

  const cfg = sel ? LISTING_TYPES[sel] : null;
  const steps = pubStepsFor(sel);
  const needsLoc = cfg && cfg.needsLoc;
  const successStep = steps.length;
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  React.useEffect(() => { if (cfg) setPriceMode(cfg.priceModes[0]); }, [sel]);

  const goBack = () => { if (step === 0) { if (canBack) back(); else navigate('home'); } else setStep(s => s - 1); };


  const iCat = 0, iDet = 1, iMedia = 2, iLoc = needsLoc ? 3 : -1, iOffer = needsLoc ? 4 : 3;
  const priceNeeded = priceMode === 'Prix fixe' || priceMode === 'Payant' || priceMode === 'Tarif horaire' || priceMode === 'Tarif fixe';
  const detailValid = title.trim() && (!priceNeeded || price.trim());
  const locValid = !needsLoc || !cfg.locReq || loc.trim();
  const priceUnit = priceMode === 'Tarif horaire' ? ' F / h' : sel === 'immo' && form.transaction === 'Location' ? ' F / mois' : ' FCFA';
  const priceLabel = !priceNeeded ? (priceMode === 'Gratuit' ? 'Gratuit' : 'Sur devis') : (price ? Number(price).toLocaleString('fr-FR') + priceUnit : '—');

  if (preview) {
    return (
      <Screen bg={OK.bg} statusDark={true} footerPad={92} footer={
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, padding: `12px 16px ${APP_DETAIL_BOTTOM_PADDING}`, borderTop: `1px solid ${OK.line}`, background: '#fff', display: 'flex', gap: 10, boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
          <button onClick={() => setPreview(false)} style={{ flex: 1, height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, cursor: 'pointer', fontFamily: FX, fontSize: 14.5, fontWeight: 800 }}>Modifier</button>
          <button onClick={() => { setPreview(false); setStep(iOffer); }} style={{ flex: 1.4, height: 52, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FX, fontSize: 14.5, fontWeight: 800, boxShadow: '0 8px 20px rgba(11,124,57,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>Continuer <Icon name="arrow-r" size={18} color="#fff" strokeWidth={2.4}/></button>
        </div>
      }>
        <div data-screen-label="Aperçu de l'annonce">
          <div style={{ position: 'relative', height: 300 }}>
            <Img src={coverImg} style={{ position: 'absolute', inset: 0 }}/>
            <button onClick={() => setPreview(false)} style={{ position: 'absolute', top: APP_HEADER_TOP, left: 14, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/></button>
            <span style={{ position: 'absolute', top: APP_HEADER_TOP_PLUS_4, right: 14, fontFamily: FX, fontWeight: 800, fontSize: 11.5, color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '5px 11px', borderRadius: 999 }}>Aperçu</span>
            {media.length > 1 && <span style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', fontFamily: FX, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>1 / {media.length}</span>}
          </div>
          <div style={{ padding: '16px 18px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: FX, fontWeight: 800, fontSize: 26, color: OK.green }}>{priceLabel}</span>
              {nego && priceNeeded && <span style={{ fontFamily: FX, fontSize: 11, fontWeight: 800, color: '#8A6B00', background: 'rgba(197,150,0,0.16)', border: '1px solid rgba(197,150,0,0.4)', padding: '3px 9px', borderRadius: 999 }}>À débattre</span>}
            </div>
            <h1 style={{ margin: '8px 0 0', fontFamily: FX, fontWeight: 800, fontSize: 20, color: OK.ink, lineHeight: 1.25 }}>{title || 'Titre de votre annonce'}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>
              <Icon name="pin" size={14} color={OK.ink3} strokeWidth={2}/> {needsLoc && loc ? loc : 'Libreville'} · à l’instant
            </div>
            {Object.keys(form).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                {cfg && cfg.fields.filter(f => form[f.k]).map(f => (
                  <span key={f.k} style={{ fontFamily: FX, fontSize: 11.5, fontWeight: 700, color: OK.ink2, background: OK.bg2, border: `1px solid ${OK.line}`, padding: '6px 11px', borderRadius: 999 }}>{form[f.k]}</span>
                ))}
              </div>
            )}
            {desc && (<>
              <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 14, color: OK.ink, margin: '18px 0 6px' }}>Description</div>
              <p style={{ margin: 0, fontFamily: FX, fontSize: 13.5, lineHeight: 1.6, color: OK.ink2, whiteSpace: 'pre-wrap' }}>{desc}</p>
            </>)}
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '20px 0', padding: '13px 14px', background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 999, background: OK.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FX, fontWeight: 800, fontSize: 16 }}>V</div>
              <div style={{ flex: 1 }}><div style={{ fontFamily: FX, fontSize: 13.5, fontWeight: 800, color: OK.ink }}>Vous</div><div style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink2 }}>Vendeur · {(PKG.find(p => p.id === pkg) || {}).name}</div></div>
              <span style={{ fontFamily: FX, fontSize: 11.5, fontWeight: 700, color: OK.green }}>Voir profil</span>
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  if (step === successStep) {
    return (
      <Screen bg={OK.bg2} statusDark={true}>
        <div data-screen-label="Annonce publiée" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px', textAlign: 'center' }}>
          <div style={{ width: 96, height: 96, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(11,124,57,0.35)' }}>
            <Icon name="check" size={48} color="#fff" strokeWidth={3}/>
          </div>
          <h1 style={{ margin: '24px 0 0', fontFamily: FX, fontWeight: 800, fontSize: 26, color: OK.ink, letterSpacing: -0.4 }}>Annonce publiée ! 🎉</h1>
          <p style={{ margin: '12px 0 0', fontFamily: FX, fontSize: 14, color: OK.ink2, lineHeight: 1.55, maxWidth: 280 }}>
            Votre annonce <strong style={{ color: OK.ink }}>« {title || 'Sans titre'} »</strong> est en ligne dans <strong style={{ color: OK.ink }}>{(cats.find(c => c.id === sel) || {}).label}</strong> avec le forfait <strong style={{ color: OK.green }}>{(PKG.find(p => p.id === pkg) || {}).name}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28, width: '100%' }}>
            <button onClick={() => navigate('market', { cat: sel || 'all' })} style={{ height: 52, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FX, fontSize: 15, fontWeight: 800, boxShadow: '0 8px 20px rgba(11,124,57,0.3)' }}>
              Voir mon annonce
            </button>
            <button onClick={() => navigate('home')} style={{ height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, cursor: 'pointer', fontFamily: FX, fontSize: 15, fontWeight: 800 }}>
              Retour à l’accueil
            </button>
          </div>
        </div>
      </Screen>
    );
  }

  let footer;
  if (step === iCat) footer = <PubBar label="Continuer" disabled={!sel} onClick={() => sel && setStep(iDet)}/>;
  else if (step === iDet) footer = <PubBar label="Continuer" disabled={!detailValid} onClick={() => detailValid && setStep(iMedia)}/>;
  else if (step === iMedia) footer = <PubBar label="Continuer" disabled={media.length < 1} onClick={() => { if (needsLoc) setStep(iLoc); else setPreview(true); }}/>;
  else if (step === iLoc) footer = <PubBar label="Continuer" disabled={!locValid} onClick={() => locValid && setPreview(true)}/>;
  else footer = <PubBar label="Publier l’annonce" icon="check" onClick={() => setStep(successStep)}/>;

  return (
    <Screen bg={OK.bg2} statusDark={true} footerPad={92} footer={footer}>
      <div data-screen-label="Publier">
        <GreenHeader title="Publier une annonce" onBack={goBack}/>
        <PubStepper steps={steps} step={step}/>

        {step === iCat && (
          <div>
            <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 18, color: OK.green, margin: '14px 18px 0' }}>Dans quelle catégorie ?</div>
            <p style={{ margin: '4px 18px 0', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>Votre annonce sera publiée sur la marketplace.</p>
            <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {cats.map(c => {
                const cimg = { immo: '1580587771525-78b9dba3b914', auto: 'assets/cat-auto.jpg', tech: 'assets/cat-tech.jpg', mode: 'assets/cat-mode.jpg', maison: '1616486338812-3dadae4b4ace' }[c.id];
                const csrc = cimg.startsWith('assets/') ? cimg : bImg(cimg, 400);
                const cpos = { mode: 'center 22%', tech: 'center 40%', auto: 'center 55%' }[c.id] || 'center';
                return (
                <button key={c.id} onClick={() => setSel(c.id)} style={{ background: '#fff', cursor: 'pointer', textAlign: 'left', overflow: 'hidden',
                  border: sel === c.id ? `2px solid ${OK.green}` : `1px solid ${OK.line}`, borderRadius: 14, padding: 0,
                  display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: 92 }}>
                    <Img src={csrc} style={{ position: 'absolute', inset: 0, backgroundPosition: cpos }} overlay={sel === c.id ? 'linear-gradient(180deg, rgba(11,124,57,0.1), rgba(11,124,57,0.32))' : 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.28))'}/>
                    {sel === c.id && <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 999, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}><Icon name="check" size={14} color="#fff" strokeWidth={3}/></div>}
                  </div>
                  <span style={{ fontFamily: FX, fontSize: 14, fontWeight: 800, color: OK.ink, padding: '11px 14px' }}>{c.label}</span>
                </button>
                );
              })}
            </div>
          </div>
        )}

        {step === iDet && cfg && (
          <div style={{ padding: '10px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 19, color: OK.ink, letterSpacing: -0.3 }}>Décrivez votre {sel === 'services' ? 'service' : sel === 'events' ? 'événement' : 'article'}</div>
              <p style={{ margin: '3px 0 0', fontFamily: FX, fontSize: 12.5, color: OK.ink3 }}>Plus c’est précis, plus vous êtes contacté vite.</p>
            </div>

            <PubCard title="Informations" icon="edit">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={PUB_LABEL}>Titre</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder={cfg.titlePh} style={PUB_FIELD}/>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                  {cfg.fields.map(f => {
                    const full = f.type === 'chips' || f.type === 'sizeDyn';
                    const wrap = { flex: full ? '1 1 100%' : '1 1 calc(50% - 7px)', minWidth: 0 };
                    if (f.type === 'sizeDyn') {
                      const art = form.article;
                      const opts = SIZE_OPTS[art];
                      if (!opts) return null;
                      return (
                        <div key={f.k} style={wrap}>
                          <label style={PUB_LABEL}>{art === 'Chaussure' ? 'Pointure' : 'Taille'}</label>
                          <ChipRow opts={opts} value={form[f.k]} onPick={v => setF(f.k, v)}/>
                        </div>
                      );
                    }
                    return (
                      <div key={f.k} style={wrap}>
                        <label style={PUB_LABEL}>{f.label}</label>
                        {f.type === 'chips' ? (
                          <ChipRow opts={f.opts} value={form[f.k]} onPick={v => setF(f.k, v)}/>
                        ) : (
                          <input value={form[f.k] || ''} onChange={e => setF(f.k, f.type === 'num' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value)}
                            placeholder={f.ph} inputMode={f.type === 'num' ? 'numeric' : 'text'} style={PUB_FIELD}/>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <label style={PUB_LABEL}>Description</label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Décrivez les caractéristiques, l’état, les détails utiles…" rows={4}
                    style={{ ...PUB_FIELD, height: 'auto', padding: '12px 14px', resize: 'none', lineHeight: 1.5 }}/>
                </div>
              </div>
            </PubCard>

            <PubCard title="Prix" icon="wallet">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {cfg.priceModes.map(m => {
                  const on = priceMode === m;
                  return (
                    <button key={m} onClick={() => setPriceMode(m)} style={{ height: 38, padding: '0 15px', borderRadius: 999, cursor: 'pointer',
                      border: on ? `1.5px solid ${OK.green}` : `1.5px solid ${OK.line}`, background: on ? OK.green : '#fff', color: on ? '#fff' : OK.ink2,
                      fontFamily: FX, fontSize: 12.5, fontWeight: on ? 800 : 600, transition: 'all .12s ease' }}>{m}</button>
                  );
                })}
              </div>
              {priceNeeded ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 62, background: 'rgba(11,124,57,0.06)', border: `1.5px solid rgba(11,124,57,0.22)`, borderRadius: 14, padding: '0 16px' }}>
                    <input value={price} onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, ''))} placeholder="0" inputMode="numeric"
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FX, fontWeight: 800, fontSize: 28, color: OK.green, minWidth: 0 }}/>
                    {nego && <span style={{ fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: '#8A6B00', background: 'rgba(197,150,0,0.16)', border: '1px solid rgba(197,150,0,0.4)', padding: '4px 9px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0 }}>À débattre</span>}
                    <span style={{ fontFamily: FX, fontWeight: 800, fontSize: 15, color: OK.ink3, flexShrink: 0 }}>{priceMode === 'Tarif horaire' ? 'F / h' : sel === 'immo' && form.transaction === 'Location' ? 'F / mois' : 'FCFA'}</span>
                  </div>
                  <button onClick={() => setNego(v => !v)} style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 11, width: '100%', background: nego ? 'rgba(11,124,57,0.06)' : '#fff', border: `1.5px solid ${nego ? OK.green : OK.line}`, borderRadius: 13, padding: '12px 13px', cursor: 'pointer', textAlign: 'left', transition: 'all .12s ease' }}>
                    <span style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: nego ? OK.green : '#fff', border: nego ? 'none' : `1.5px solid ${OK.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {nego && <Icon name="check" size={14} color="#fff" strokeWidth={3}/>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: FX, fontSize: 13.5, fontWeight: 800, color: OK.ink }}>Prix à débattre</div>
                      <div style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink2, marginTop: 1 }}>Les acheteurs peuvent vous faire une offre</div>
                    </div>
                  </button>
                </div>
              ) : (
                <div style={{ background: 'rgba(11,124,57,0.06)', border: `1px dashed ${OK.green}`, borderRadius: 13, padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name="message" size={18} color={OK.green} strokeWidth={2}/>
                  <span style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink2, lineHeight: 1.45 }}>{priceMode === 'Gratuit' ? 'Article proposé gratuitement.' : 'Le prix sera discuté directement avec les acheteurs intéressés.'}</span>
                </div>
              )}
            </PubCard>
          </div>
        )}

        {step === iMedia && (
          <div style={{ padding: '14px 18px 0' }}>
            <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 18, color: OK.green }}>Photos & vidéos</div>
            <p style={{ margin: '6px 0 0', fontFamily: FX, fontSize: 12.5, color: OK.ink2, lineHeight: 1.5 }}>
              Une bonne photo attire 3× plus de contacts. Ajoutez jusqu’à 8 médias — photos ou vidéos.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => setMedia(m => [...m, { type: 'photo' }])} style={{ flex: 1, height: 46, borderRadius: 12, border: `1.5px solid ${OK.green}`, background: 'rgba(11,124,57,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: FX, fontSize: 13, fontWeight: 800, color: OK.green }}>
                <Icon name="camera" size={18} color={OK.green} strokeWidth={2}/> Photo
              </button>
              <button onClick={() => setMedia(m => [...m, { type: 'video' }])} style={{ flex: 1, height: 46, borderRadius: 12, border: `1.5px solid ${OK.red}`, background: 'rgba(224,36,27,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: FX, fontSize: 13, fontWeight: 800, color: OK.red }}>
                <Icon name="video" size={18} color={OK.red} strokeWidth={2}/> Vidéo
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
              {media.map((m, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 12, overflow: 'hidden' }}>
                  <Img src={[
                    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&q=80&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=300&q=80&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&q=80&auto=format&fit=crop',
                  ][i % 3]} style={{ position: 'absolute', inset: 0 }}/>
                  {m.type === 'video' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="video" size={17} color={OK.red} strokeWidth={2}/></div>
                    </div>
                  )}
                  {i === 0 && <span style={{ position: 'absolute', bottom: 5, left: 5, background: OK.green, color: '#fff', fontFamily: FX, fontSize: 8.5, fontWeight: 800, padding: '2px 6px', borderRadius: 6 }}>Couverture</span>}
                  <button onClick={() => setMedia(p => p.filter((_, j) => j !== i))} style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, borderRadius: 999, border: 'none', background: 'rgba(0,0,0,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="close" size={12} color="#fff" strokeWidth={2.4}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === iLoc && needsLoc && (
          <div style={{ padding: '14px 18px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 18, color: OK.green }}>{cfg.locLabel}</div>
            <p style={{ margin: 0, fontFamily: FX, fontSize: 12.5, color: OK.ink2, lineHeight: 1.5 }}>
              {cfg.locReq ? 'Cette annonce est liée à un lieu précis — indiquez-le pour aider les intéressés à le situer.' : 'Facultatif — précisez une zone si c’est utile pour ce service.'}
            </p>
            <div style={{ ...PUB_FIELD, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="pin" size={16} color={OK.green} strokeWidth={2}/>
              <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Ex : Quartier Louis · Libreville" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FX, fontSize: 14, color: OK.ink }}/>
            </div>
            <div style={{ height: 150, borderRadius: 14, overflow: 'hidden', position: 'relative', border: `1px solid ${OK.line}` }}>
              <Img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80&auto=format&fit=crop" style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(11,124,57,0.05), rgba(11,124,57,0.18))"/>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-100%)' }}><Icon name="pin" size={34} color={OK.green} strokeWidth={2.2}/></div>
            </div>
          </div>
        )}

        {step === iOffer && (
          <div style={{ padding: '14px 16px 0' }}>
            <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 18, color: OK.green, margin: '0 2px' }}>Choisissez votre forfait</div>
            <p style={{ margin: '4px 2px 0', fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>Publiez gratuitement, ou passez Pro pour plus de visibilité.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 }}>
              {PKG.map(p => {
                const on = pkg === p.id;
                return (
                  <div key={p.id} onClick={() => setPkg(p.id)} style={{ cursor: 'pointer', background: '#fff', borderRadius: 16, padding: '14px 15px',
                    border: on ? `2px solid ${p.tone}` : `1px solid ${OK.line}`,
                    boxShadow: on ? `0 8px 20px ${p.tone}1F` : '0 1px 3px rgba(0,0,0,0.04)', transition: 'border-color .15s ease, box-shadow .15s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ fontFamily: FX, fontSize: 16, fontWeight: 800, color: OK.ink }}>{p.name}</span>
                          {p.popular && <span style={{ fontFamily: FX, fontSize: 8.5, fontWeight: 800, color: p.tone, background: p.tone + '18', padding: '3px 8px', borderRadius: 999, letterSpacing: 0.4 }}>POPULAIRE</span>}
                        </div>
                        <div style={{ fontFamily: FX, fontSize: 11.5, color: OK.ink3, marginTop: 2 }}>{p.tag}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, flexShrink: 0 }}>
                        <span style={{ fontFamily: FX, fontSize: 22, fontWeight: 800, color: OK.ink, letterSpacing: -0.5, lineHeight: 1 }}>{p.priceStr}</span>
                        {p.per && <span style={{ fontFamily: FX, fontSize: 11, fontWeight: 600, color: OK.ink3 }}>{p.per}</span>}
                      </div>
                      <span style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, border: on ? 'none' : `2px solid ${OK.line}`, background: on ? p.tone : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {on && <Icon name="check" size={13} color="#fff" strokeWidth={3}/>}
                      </span>
                    </div>
                    {on && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${OK.line}` }}>
                        {p.perks.map(perk => (
                          <div key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                            <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name="check" size={14} color={p.tone} strokeWidth={2.8}/></span>
                            <span style={{ fontFamily: FX, fontSize: 12, color: OK.ink2, lineHeight: 1.35 }}>{perk}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ height: 20 }}/>
      </div>
    </Screen>
  );
}

function Toggle({ on, gold }) {
  const c = gold ? '#C8920C' : OK.green;
  return (
    <span style={{ width: 46, height: 27, borderRadius: 999, background: on ? c : '#D5D9D5', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 22 : 3, width: 21, height: 21, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left .2s' }}/>
    </span>
  );
}

// ── NOTIFICATIONS ───────────────────────────────────────────
function NotificationsScreen() {
  const { back } = useNav();
  const [readAll, setReadAll] = useState(false);
  return (
    <Screen bg={OK.bg} statusDark={true}>
      <div data-screen-label="Notifications">
        <GreenHeader title="Notifications" onBack={back}
          right={<button onClick={() => setReadAll(true)} style={{ height: 30, padding: '0 12px', borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', fontFamily: FX, fontSize: 12, fontWeight: 700 }}>{readAll ? 'Tout est lu' : 'Tout lire'}</button>}/>
        <div style={{ padding: '10px 14px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} style={{ display: 'flex', gap: 12, padding: '13px 12px', borderRadius: 14,
              background: n.unread && !readAll ? 'rgba(11,124,57,0.05)' : 'transparent', position: 'relative' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: n.tone + '1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={n.icon} size={20} color={n.tone} strokeWidth={2}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FX, fontSize: 13.5, fontWeight: 800, color: OK.ink, lineHeight: 1.25 }}>{n.title}</div>
                <div style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink2, lineHeight: 1.45, marginTop: 3 }}>{n.body}</div>
                <div style={{ fontFamily: FX, fontSize: 11, color: OK.ink3, marginTop: 5 }}>{n.time}</div>
              </div>
              {n.unread && !readAll && <span style={{ width: 8, height: 8, borderRadius: 8, background: OK.red, flexShrink: 0, marginTop: 6 }}/>} 
            </div>
          ))}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

// ── MESSAGES (liste) ────────────────────────────────────────
function MessagesScreen() {
  const { navigate } = useNav();
  const threads = Object.values(SHOPS).map((s, i) => ({
    shop: s,
    last: ['Bonjour, le savon karité est-il dispo ?', 'Oui le RAV4 est toujours disponible 👍', 'La villa est-elle libre en juillet ?', 'Merci pour votre achat !', 'Je vous envoie les tailles ce soir.'][i] || 'Bonjour 👋',
    time: ['12 min', '1 h', 'Hier', '2 j', '3 j'][i] || '1 sem',
    unread: i < 2,
  }));
  return (
    <Screen bg={OK.bg} statusDark={true} tabBar>
      <div data-screen-label="Messages">
        <GreenHeader title="Messages"/>
        <div style={{ padding: '6px 12px 0' }}>
          {threads.map((t, i) => (
            <button key={i} onClick={() => navigate('chat', { id: t.shop.id })} style={{ width: '100%', textAlign: 'left',
              display: 'flex', gap: 12, alignItems: 'center', padding: '12px 8px', border: 'none',
              background: 'transparent', cursor: 'pointer', borderBottom: `1px solid ${OK.line}` }}>
              <div style={{ position: 'relative' }}>
                <Avatar src={t.shop.avatar} size={52} radius={15}/>
                {t.shop.verified && <span style={{ position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="verified" size={16} color={OK.green} strokeWidth={2}/></span>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: FX, fontSize: 14.5, fontWeight: 800, color: OK.ink, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.shop.name}</span>
                  <span style={{ fontFamily: FX, fontSize: 11, color: t.unread ? OK.green : OK.ink3, fontWeight: t.unread ? 800 : 500 }}>{t.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                  <span style={{ flex: 1, fontFamily: FX, fontSize: 12.5, color: t.unread ? OK.ink : OK.ink3, fontWeight: t.unread ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.last}</span>
                  {t.unread && <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, background: OK.green, color: '#fff', fontFamily: FX, fontSize: 10.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

// ── CHAT (conversation) ─────────────────────────────────────
function ChatScreen({ params }) {
  const { back } = useNav();
  const shop = SHOPS[params?.id] || Object.values(SHOPS)[0];
  const msgs = [
    { me: false, t: 'Bonjour 👋 merci de votre intérêt pour cette annonce !' },
    { me: true, t: 'Bonjour, l’article est-il toujours disponible ?' },
    { me: false, t: 'Oui tout à fait, il est dispo immédiatement.' },
    { me: true, t: 'Parfait. Le prix est-il négociable ?' },
    { me: false, t: 'On peut s’arranger si vous passez aujourd’hui 😊' },
  ];
  const [draft, setDraft] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setSentMessages(messages => [...messages, { me: true, t: text }]);
    setDraft('');
  };
  return (
    <Screen bg={OK.bg2} statusDark={true} noScroll>
      <div data-screen-label="Conversation" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header vert */}
        <div style={{ padding: `${APP_HEADER_TOP} 14px 12px`, display: 'flex', alignItems: 'center', gap: 10, background: OK.green, boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <button onClick={back} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={18} color="#fff" strokeWidth={2.2}/>
          </button>
          <Avatar src={shop.avatar} size={40} radius={12}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontFamily: FX, fontSize: 14.5, fontWeight: 800, color: '#fff' }}>{shop.name}</span>
              {shop.verified && <Icon name="verified" size={13} color={OK.gold} strokeWidth={2}/>}
            </div>
            <div style={{ fontFamily: FX, fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>● En ligne</div>
          </div>
          <button onClick={() => notifyDemo(`Appel de ${shop.name}`)} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="phone" size={17} color="#fff" strokeWidth={2}/>
          </button>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ textAlign: 'center', margin: '4px 0 8px' }}>
            <span style={{ fontFamily: FX, fontSize: 10.5, color: OK.ink3, background: '#fff', padding: '4px 12px', borderRadius: 999, border: `1px solid ${OK.line}` }}>Aujourd’hui</span>
          </div>
          {[...msgs, ...sentMessages].map((m, i) => (
            <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
              <div style={{ padding: '10px 14px', borderRadius: m.me ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.me ? OK.green : '#fff', color: m.me ? '#fff' : OK.ink,
                border: m.me ? 'none' : `1px solid ${OK.line}`, fontFamily: FX, fontSize: 13.5, lineHeight: 1.45,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>{m.t}</div>
            </div>
          ))}
        </div>
        {/* Composer */}
        <div style={{ padding: '10px 14px 28px', borderTop: `1px solid ${OK.line}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => notifyDemo('Pièces jointes ouvertes')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: OK.bg2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="plus" size={20} color={OK.ink2} strokeWidth={2.2}/>
          </button>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            aria-label="Votre message" placeholder="Votre message…" style={{ flex: 1, minWidth: 0, height: 44, background: OK.bg2, borderRadius: 999, border: `1px solid ${OK.line}`, padding: '0 16px', outline: 'none', fontFamily: FX, fontSize: 13.5, color: OK.ink }}/>
          <button onClick={sendMessage} disabled={!draft.trim()} style={{ width: 44, height: 44, borderRadius: 999, border: 'none', background: draft.trim() ? OK.green : '#A9B9AF', cursor: draft.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: draft.trim() ? '0 4px 12px rgba(11,124,57,0.3)' : 'none' }}>
            <Icon name="send" size={19} color="#fff" strokeWidth={2.2}/>
          </button>
        </div>
      </div>
    </Screen>
  );
}

// ── FAVORIS ─────────────────────────────────────────────────
function FavorisScreen() {
  const { navigate } = useNav();
  const favs = [LISTINGS[0], LISTINGS[5], LISTINGS[7]];
  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Favoris">
        <GreenHeader title="Mes favoris"/>
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink2 }}>{favs.length} annonces enregistrées</div>
        </div>
        <div style={{ padding: '12px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {favs.map(item => <ListingCard key={item.id} item={item} fav onClick={() => navigate('listing', { id: item.id })}/>)}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

// ── COMPTE ──────────────────────────────────────────────────
function CompteScreen() {
  const { navigate, reset } = useNav();
  const rows = [
    ['tag', 'Mes annonces', '3 actives'], ['heart', 'Favoris', null], ['shop', 'Devenir vendeur Pro', 'Nouveau'],
    ['bell', 'Notifications', null], ['shield', 'Sécurité & confidentialité', null], ['help', 'Aide & support', null],
  ];
  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Compte">
        <GreenHeader title="Mon compte"/>
        {/* Profile card */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ background: `linear-gradient(135deg, ${OK.green} 0%, ${OK.greenDeep} 100%)`, borderRadius: 20, padding: 18,
            display: 'flex', alignItems: 'center', gap: 14, color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 26px rgba(11,124,57,0.26)' }}>
            <div aria-hidden style={{ position: 'absolute', right: -30, top: -40, width: 150, height: 150, borderRadius: 75, background: `radial-gradient(circle, ${OK.gold} 0%, transparent 70%)`, opacity: 0.45 }}/>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: `url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&auto=format&fit=crop') center/cover`, border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0 }}/>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ fontFamily: FX, fontWeight: 800, fontSize: 20, lineHeight: 1 }}>Patricia Ndong</div>
              <div style={{ fontFamily: FX, fontSize: 12, opacity: 0.85, marginTop: 4 }}>+241 06 77 12 34 · Libreville</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, background: 'rgba(245,184,0,0.22)', border: '1px solid rgba(245,184,0,0.5)', padding: '3px 9px', borderRadius: 999, fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: OK.gold }}>
                <Icon name="sparkle" size={11} color={OK.gold} strokeWidth={2}/> Membre O’KABA
              </span>
            </div>
          </div>
        </div>
        {/* Menu */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${OK.line}`, overflow: 'hidden' }}>
            {rows.map(([ic, l, badge], i) => (
              <button key={l} onClick={() => { if (l === 'Favoris') navigate('favoris'); else if (l === 'Notifications') navigate('notifications'); else if (l === 'Mes annonces') navigate('market', { cat: 'all' }); else if (l === 'Devenir vendeur Pro') navigate('shops'); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '14px 15px', border: 'none',
                  borderTop: i ? `1px solid ${OK.line}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(11,124,57,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={ic} size={18} color={OK.green} strokeWidth={2}/>
                </div>
                <span style={{ flex: 1, fontFamily: FX, fontSize: 14, fontWeight: 700, color: OK.ink }}>{l}</span>
                {badge && <span style={{ fontFamily: FX, fontSize: 10.5, fontWeight: 800, color: badge === 'Nouveau' ? '#8A6B00' : OK.ink3, background: badge === 'Nouveau' ? 'rgba(245,184,0,0.22)' : OK.bg2, padding: '3px 9px', borderRadius: 999 }}>{badge}</span>}
                <Icon name="chev-r" size={17} color={OK.ink3} strokeWidth={2}/>
              </button>
            ))}
          </div>
          <button onClick={() => { clearOkabaDemoSession(); reset('welcome'); }} style={{ width: '100%', marginTop: 14, height: 50, borderRadius: 13, border: `1.5px solid ${OK.line}`,
            background: '#fff', color: OK.red, cursor: 'pointer', fontFamily: FX, fontSize: 14, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icon name="logout" size={17} color={OK.red} strokeWidth={2}/> Se déconnecter
          </button>
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { PublierScreen, EtabScreen, ProposerServiceScreen, ProximityServicesScreen, ProximityProviderScreen, NotificationsScreen, MessagesScreen, ChatScreen, FavorisScreen, CompteScreen });


// ===================== 11-app =====================
// okaba-app.jsx — Shell : router → écrans, monté dans le bezel iPhone doré

function renderScreen(entry) {
  const { screen, params } = entry;
  switch (screen) {
    case 'splash':        return <SplashScreen/>;
    case 'welcome':       return <WelcomeScreen/>;
    case 'signup':        return <SignupScreen/>;
    case 'login':         return <LoginScreen/>;
    case 'home':          return <HomeScreen/>;
    case 'services':      return <ServicesScreen/>;
    case 'market':        return <MarketScreen params={params}/>;
    case 'search':        return <SearchScreen/>;
    case 'shops':         return <ShopsScreen/>;
    case 'shop':          return <ShopScreen params={params}/>;
    case 'listing':       return <ListingScreen params={params}/>;
    case 'annuaire':      return <AnnuaireScreen params={params}/>;
    case 'annuaire-search': return <AnnuaireSearchScreen/>;
    case 'annuaire-map':  return <AnnuaireMapScreen/>;
    case 'entity':        return (typeof ANNU_ENTITIES !== 'undefined' && ANNU_ENTITIES[params?.id] && ANNU_ENTITIES[params?.id].type === 'complexe') ? <BaieHub params={params}/> : <EntityScreen params={params}/>;
    case 'tenant':        return <TenantScreen params={params}/>;
    case 'tourisme':      return <TourismeScreen/>;
    case 'tourisme-spots':return <TourismeSpotsScreen params={params}/>;
    case 'tourisme-place':return <TourismePlaceScreen params={params}/>;
    case 'baie':          return <BaieScreen/>;
    case 'baie-spots':    return <BaieSpotsScreen params={params}/>;
    case 'baie-place':    return <BaiePlaceScreen params={params}/>;
    case 'events':        return <EventsScreen/>;
    case 'event':         return <EventImmersiveScreen params={params}/>;
    case 'event-ticket':  return <EventTicketScreen params={params}/>;
    case 'smartcity':     return <SmartCityScreen/>;
    case 'traffic-3d':    return <TrafficRealMapScreen/>;
    case 'weather':       return <WeatherScreen/>;
    case 'parking':       return <ParkingScreen/>;
    case 'parking-reservation': return <ParkingReservationScreen params={params}/>;
    case 'pharmacies':    return <PharmaciesScreen/>;
    case 'fuel-stations': return <FuelStationsScreen/>;
    case 'baie-information': return <BaieInformationScreen/>;
    case 'baie-article':  return <BaieArticleScreen params={params}/>;
    case 'publier':       return <PublierScreen/>;
    case 'etab':          return <EtabScreen/>;
    case 'proposer-service': return <ProposerServiceScreen/>;
    case 'proximity-services': return <ProximityServicesScreen/>;
    case 'proximity-profile': return <ProximityProviderScreen params={params}/>;
    case 'notifications': return <NotificationsScreen/>;
    case 'messages':      return <MessagesScreen/>;
    case 'chat':          return <ChatScreen params={params}/>;
    case 'favoris':       return <FavorisScreen/>;
    case 'compte':        return <CompteScreen/>;
    default:              return <HomeScreen/>;
  }
}
window.renderScreen = renderScreen;

function Router() {
  return <PhoneFrame render={renderScreen}/>;
}

function App() {
  // Pendant la conception de l'onboarding, on entre TOUJOURS sur l'écran de
  // bienvenue après l'intro (pour toujours voir le parcours, même si une
  // session démo traîne dans le navigateur).
  // TODO onboarding fini : remettre  hasOkabaDemoSession() ? 'home' : 'welcome'
  const initialScreen = 'welcome';
  return (
    <NavProvider initial={initialScreen}>
      <Router/>
    </NavProvider>
  );
}

window.OkabaApp = App;

export default App;

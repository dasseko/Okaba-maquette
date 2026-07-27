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
  { id: 'proximite',label: 'À proximité',   target: 'market',   param: 'services', img: 'assets/proximite-artisan.jpg' },
  { id: 'market',   label: 'Marketplace',   target: 'market',   param: 'all',  img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80&auto=format&fit=crop' },
  { id: 'annuaire', label: 'Annuaire',      target: 'annuaire', param: null,   img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&q=80&auto=format&fit=crop' },
  { id: 'jobs',     label: 'Emploi',        target: 'market',   param: 'services', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=240&q=80&auto=format&fit=crop' },
  { id: 'baie',     label: 'Baie des Rois', target: 'tourisme', param: null,   img: 'assets/baie-cover.png' },
  { id: 'divertir', label: 'Se divertir',   target: 'market',   param: 'all',  img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=240&q=80&auto=format&fit=crop' },
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
  { id: 'loango',  name: 'Parc national de Loango', cat: 'Parc et réserve', city: 'Ogooué-Maritime', rating: 4.9,
    img: 'assets/tour-parc.jpg' },
  { id: 'pointe-denis', name: 'Pointe Denis', cat: 'Plage', city: 'Estuaire · Libreville', rating: 4.7,
    img: 'assets/tour-plage.jpg' },
  { id: 'kongou',  name: 'Chutes de Kongou', cat: 'Cascade', city: 'Ogooué-Ivindo', rating: 4.8,
    img: 'assets/tour-riviere.jpg' },
];

// Évènements et sorties (affiches)
const EVENTS = [
  { id: 'ev1', title: 'FEMOGA 26 — Festival de la Mode', date: '29 juin – 05 juil. 2026', time: '18h00', place: 'Esplanade bord de mer · Libreville',
    img: 'assets/event-femoga.jpg' },
  { id: 'ev2', title: 'Awards de la Femme Gabonaise', date: '31 juillet 2026', time: '20h00', place: 'Radisson Blu · Libreville',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80&auto=format&fit=crop' },
  { id: 'ev3', title: 'Festival Gabao Hip-Hop', date: '12 – 14 août 2026', time: '19h30', place: 'IFG · Libreville',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80&auto=format&fit=crop' },
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
    avatar: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop',
    bio: 'Coopérative agricole familiale spécialisée dans la transformation de produits naturels locaux.',
    produits: 'Elle commercialise des savons naturels (beurre de karité, okoumé, charbon végétal), des infusions et des jus de fruits 100 % naturels, sans additifs ni conservateurs.',
    phone: '+241 74 06 67 64 / +241 66 61 09 81', email: 'cooperativemasetfamille@gmail.com',
    responseTime: 'Répond en ~2h', photosCount: 11, avisCount: 10,
  },
  'okaba-motors': {
    id: 'okaba-motors', name: 'Okaba Motors', handle: '@okabamotors',
    cat: 'Véhicules · Concession', city: 'Libreville · Glass',
    verified: true, pro: true, rating: 4.7, reviews: 128, followers: 3240, since: 2019,
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80&auto=format&fit=crop',
    bio: 'Vente de véhicules d\u2019occasion révisés et garantis. Reprise possible. Financement disponible.',
    phone: '+241 06 22 14 80', responseTime: 'Répond en ~1h',
  },
  'libreville-immo': {
    id: 'libreville-immo', name: 'Libreville Immo', handle: '@lbvimmo',
    cat: 'Immobilier · Agence', city: 'Libreville · Batterie IV',
    verified: true, pro: true, rating: 4.5, reviews: 86, followers: 2110, since: 2017,
    avatar: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop',
    bio: 'Location et vente d\u2019appartements, villas et terrains à Libreville et alentours. Visites accompagnées.',
    phone: '+241 01 73 09 22', responseTime: 'Répond en ~2h',
  },
  'gabon-tech': {
    id: 'gabon-tech', name: 'Gabon Tech Store', handle: '@gabontech',
    cat: 'Électronique · High-tech', city: 'Libreville · Mont-Bouët',
    verified: true, pro: true, rating: 4.8, reviews: 254, followers: 5680, since: 2020,
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80&auto=format&fit=crop',
    bio: 'Smartphones, ordinateurs et accessoires neufs et reconditionnés. Garantie 6 à 12 mois. Livraison Libreville.',
    phone: '+241 07 45 11 03', responseTime: 'Répond en ~30 min',
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
};

// Annonces (listings) ──────────────────────────────────────
// prix en FCFA. ref = numéro de référence (consigne sécurité PDF BETA).
const LISTINGS = [
  {
    id: 'savon-karite', cat: 'maison', shop: 'mas-famille',
    title: 'Savon naturel au beurre de karité',
    price: 2500, negotiable: false, condition: 'Neuf',
    city: 'Libreville · London', posted: 'Il y a 2 jours', ref: 'OKB-MA-90011',
    featured: true,
    images: ['https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=800&q=80&auto=format&fit=crop'],
    specs: [['Type', 'Karité'], ['Poids', '120 g'], ['Naturel', '100 %'], ['Additifs', 'Aucun']],
    desc: 'Savon artisanal au beurre de karité pur, fabriqué localement. Sans additifs ni conservateurs. Nourrit et hydrate la peau en profondeur.',
  },
  {
    id: 'infusion-bio', cat: 'maison', shop: 'mas-famille',
    title: 'Infusion naturelle aux plantes locales',
    price: 3000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · London', posted: 'Il y a 4 jours', ref: 'OKB-MA-90012',
    featured: false,
    images: ['https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&q=80&auto=format&fit=crop'],
    specs: [['Format', 'Sachet 50 g'], ['Origine', 'Gabon'], ['Bio', 'Oui'], ['Conservateurs', 'Non']],
    desc: 'Infusion 100 % naturelle préparée à partir de plantes gabonaises. Sans conservateurs. Idéale pour la détente et la digestion.',
  },
  {
    id: 'jus-fruits', cat: 'maison', shop: 'mas-famille',
    title: 'Jus de fruits naturel — bissap',
    price: 1500, negotiable: false, condition: 'Neuf',
    city: 'Libreville · London', posted: 'Hier', ref: 'OKB-MA-90013',
    featured: false,
    images: ['https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80&auto=format&fit=crop'],
    specs: [['Volume', '1 L'], ['Goût', 'Bissap'], ['Sucre', 'Naturel'], ['Conservateurs', 'Non']],
    desc: 'Jus de bissap 100 % naturel, sans additifs ni conservateurs. Pressé localement par la coopérative.',
  },
  {
    id: 'savon-charbon', cat: 'maison', shop: 'mas-famille',
    title: 'Savon au charbon végétal',
    price: 2800, negotiable: false, condition: 'Neuf',
    city: 'Libreville · London', posted: 'Il y a 1 semaine', ref: 'OKB-MA-90014',
    featured: false,
    images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80&auto=format&fit=crop'],
    specs: [['Type', 'Charbon'], ['Poids', '120 g'], ['Peaux', 'Mixtes'], ['Naturel', '100 %']],
    desc: 'Savon purifiant au charbon végétal, parfait pour les peaux mixtes à grasses. Fabrication artisanale gabonaise.',
  },
  {
    id: 'savon-okoume', cat: 'maison', shop: 'mas-famille',
    title: 'Savon à l’huile d’okoumé',
    price: 3200, negotiable: false, condition: 'Neuf',
    city: 'Libreville · London', posted: 'Il y a 1 semaine', ref: 'OKB-MA-90015',
    featured: false,
    images: ['https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80&auto=format&fit=crop'],
    specs: [['Type', 'Okoumé'], ['Poids', '120 g'], ['Naturel', '100 %'], ['Origine', 'Gabon']],
    desc: 'Savon enrichi à l’huile d’okoumé, essence emblématique du Gabon. Sans additifs ni conservateurs.',
  },
  {
    id: 'toyota-rav4', cat: 'auto', shop: 'okaba-motors',
    title: 'Toyota RAV4 2019 — Full options',
    price: 14500000, negotiable: true, condition: 'Occasion',
    city: 'Libreville · Glass', posted: 'Il y a 2 jours', ref: 'OKB-AU-48217',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Année', '2019'], ['Kilométrage', '62 000 km'], ['Carburant', 'Essence'], ['Boîte', 'Automatique']],
    desc: 'RAV4 2019 en excellent état, entretien à jour, climatisation, caméra de recul, jantes alu. Première main, papiers en règle. Reprise possible.',
  },
  {
    id: 'villa-batterie', cat: 'immo', shop: 'libreville-immo',
    title: 'Villa 4 chambres avec piscine — Batterie IV',
    price: 850000, unit: '/ mois', negotiable: false, condition: 'À louer',
    city: 'Libreville · Batterie IV', posted: 'Il y a 5 jours', ref: 'OKB-IM-30945',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Chambres', '4'], ['Surface', '220 m²'], ['Salles d\u2019eau', '3'], ['Garage', 'Oui']],
    desc: 'Magnifique villa meublée avec piscine et jardin clôturé dans un quartier calme et sécurisé. Cuisine équipée, groupe électrogène, forage. Idéale pour famille ou expatrié.',
  },
  {
    id: 'iphone-14', cat: 'tech', shop: 'gabon-tech',
    title: 'iPhone 14 Pro 256 Go — Reconditionné',
    price: 520000, negotiable: true, condition: 'Reconditionné',
    city: 'Libreville · Mont-Bouët', posted: 'Hier', ref: 'OKB-TE-77120',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Stockage', '256 Go'], ['État', 'Très bon'], ['Batterie', '92 %'], ['Garantie', '6 mois']],
    desc: 'iPhone 14 Pro reconditionné grade A, débloqué tous opérateurs. Livré avec chargeur et coque. Garantie boutique 6 mois. Possibilité de livraison à Libreville.',
  },
  {
    id: 'ensemble-wax', cat: 'mode', shop: 'mama-style',
    title: 'Ensemble pagne wax sur mesure — Femme',
    price: 45000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Nombakélé', posted: 'Il y a 3 jours', ref: 'OKB-MO-19884',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Tissu', 'Wax premium'], ['Tailles', '36 à 46'], ['Délai', '5 jours'], ['Sur mesure', 'Oui']],
    desc: 'Ensemble deux pièces en wax authentique, confectionné sur mesure. Choix du tissu et des finitions. Retouches offertes. Livraison Libreville sous 5 jours.',
  },
  {
    id: 'macbook-air', cat: 'tech', shop: 'gabon-tech',
    title: 'MacBook Air M2 — Neuf scellé',
    price: 980000, negotiable: false, condition: 'Neuf',
    city: 'Libreville · Mont-Bouët', posted: 'Il y a 4 jours', ref: 'OKB-TE-66301',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Puce', 'Apple M2'], ['RAM', '8 Go'], ['SSD', '256 Go'], ['Garantie', '12 mois']],
    desc: 'MacBook Air M2 neuf sous blister, garantie internationale 12 mois. Clavier AZERTY. Facture fournie. Livraison gratuite Libreville.',
  },
  {
    id: 'terrain-akanda', cat: 'immo', shop: 'libreville-immo',
    title: 'Terrain titré 600 m² — Akanda',
    price: 25000000, negotiable: true, condition: 'À vendre',
    city: 'Libreville · Akanda', posted: 'Il y a 1 semaine', ref: 'OKB-IM-51002',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Surface', '600 m²'], ['Titre', 'Foncier'], ['Viabilisé', 'Oui'], ['Accès', 'Bitumé']],
    desc: 'Terrain plat et titré dans une zone résidentielle en plein essor à Akanda. Eau et électricité à proximité. Idéal construction villa.',
  },
  {
    id: 'pickup-hilux', cat: 'auto', shop: 'okaba-motors',
    title: 'Toyota Hilux 2020 — Double cabine',
    price: 22000000, negotiable: true, condition: 'Occasion',
    city: 'Libreville · Glass', posted: 'Il y a 6 jours', ref: 'OKB-AU-40558',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Année', '2020'], ['Kilométrage', '48 000 km'], ['Carburant', 'Diesel'], ['Boîte', 'Manuelle']],
    desc: 'Hilux double cabine 4x4, parfait pour chantier ou usage familial. Pneus neufs, révision complète effectuée. Très robuste.',
  },
  {
    id: 'canape-cuir', cat: 'maison', shop: 'mama-style',
    title: 'Canapé d\u2019angle cuir — 6 places',
    price: 380000, negotiable: true, condition: 'Neuf',
    city: 'Libreville · Owendo', posted: 'Il y a 2 jours', ref: 'OKB-MA-22719',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80&auto=format&fit=crop',
    ],
    specs: [['Places', '6'], ['Matière', 'Cuir PU'], ['Couleur', 'Marron'], ['Livraison', 'Oui']],
    desc: 'Canapé d\u2019angle moderne en cuir, confortable et élégant. Livraison et installation à domicile sur Libreville. Stock limité.',
  },
];

// ── ANNUAIRE — entités gabonaises (réseau social) ───────────
const ANNU_ENTITIES = {
  'seeg': {
    id: 'seeg', name: 'SEEG', cat: 'Eau & Électricité · Service public', service: 'industries', featured: true, verified: true,
    logo: 'assets/seeg-logo.webp', cover: 'assets/seeg-building.jpg', geo: { x: 40, y: 46 },
    followers: '76,4 K', city: 'Boulevard du Bord de Mer · Libreville', phone: '+241 01 79 59 59',
    bio: 'Société d’Énergie et d’Eau du Gabon. Distribution d’eau potable et d’électricité sur l’ensemble du territoire national.',
  },
  'sobraga': {
    id: 'sobraga', name: 'SOBRAGA', cat: 'Industrie · Boissons du Gabon', service: 'industries', featured: true, verified: true,
    logo: 'assets/sobraga-logo.jpg', cover: 'assets/sobraga-building.jpg', geo: { x: 62, y: 64 },
    followers: '102 K', city: 'Oloumi · Libreville', phone: '+241 01 70 24 00',
    bio: 'Société des Brasseries du Gabon. Régab, eau Andza et boissons fabriquées au Gabon depuis 1966.',
  },
  'mairie-lbv': {
    id: 'mairie-lbv', name: 'Mairie de Libreville', cat: 'Administration · Commune', service: 'admin', featured: true, verified: true,
    logo: 'assets/mairie-lbv-logo.gif', cover: 'assets/mairie-lbv-building.jpg', geo: { x: 38, y: 42 },
    followers: '48,2 K', city: 'Hôtel de Ville · Libreville', phone: '+241 01 72 04 04',
    bio: 'Compte officiel de la Mairie de Libreville. Services municipaux, état civil, voirie et grands projets de la capitale gabonaise.',
  },
  'min-tourisme': {
    id: 'min-tourisme', name: 'Ministère du Tourisme Durable', cat: 'Ministère · Tourisme & Artisanat', service: 'ministeres', featured: true, verified: true,
    logo: 'assets/mintourisme-logo.webp', cover: 'assets/mintourisme-cover.jpeg', geo: { x: 48, y: 30 },
    followers: '31,5 K', city: 'Boulevard Triomphal · Libreville', phone: '+241 01 76 00 00',
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
    bio: 'Opérateur télécom national. Internet fibre, mobile et solutions entreprises partout au Gabon.',
  },
  'chu-libreville': {
    id: 'chu-libreville', name: 'CHU de Libreville', cat: 'Santé · Hôpital public', service: 'sante', verified: true,
    logo: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop', geo: { x: 55, y: 48 },
    followers: '22,7 K', city: 'Avenue Jean-Paul II · Libreville', phone: '+241 01 76 17 31',
    bio: 'Centre Hospitalier Universitaire de Libreville. Soins, urgences et spécialités médicales.',
  },
  'bgfi': {
    id: 'bgfi', name: 'BGFIBank Gabon', cat: 'Banque · Finance', service: 'banques', verified: true,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop', geo: { x: 44, y: 70 },
    followers: '54,1 K', city: 'Boulevard de l’Indépendance · Libreville', phone: '+241 01 79 20 20',
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
const BAIE_TENANTS = [
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
const BAIE_TENANTS_MAP = Object.fromEntries(BAIE_TENANTS.map(t => [t.id, t]));
ANNU_ENTITIES['baie-des-rois'] = {
  id: 'baie-des-rois', name: 'La Baie des Rois', type: 'complexe',
  cat: 'Complexe front de mer · Sorties', service: 'restaurants', featured: true, verified: true,
  logo: 'assets/ev-d.jpeg',
  cover: 'assets/baie-cover.png',
  photos: ['assets/baie-cover.png', 'assets/baie-2.png'],
  geo: { x: 36, y: 52 }, followers: '27,3 K', city: 'Bord de mer · Libreville', phone: '+241 06 00 12 00',
  tagline: 'Le rendez-vous du bord de mer', rating: 4.7, reviewsTotal: '3 200', priceLevel: '€€', hours: 'Tous les jours · 10:00 – 00:00',
  bio: 'La Baie des Rois, projet d’aménagement urbain conçu pour dynamiser un nouveau quartier à Libreville.',
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
  { id: 'r4', entity: 'gabon-telecom', views: '9,1 K', img: 'https://images.unsplash.com/photo-1551703599-6b3e6379f6f4?w=400&q=80&auto=format&fit=crop', title: 'La fibre arrive à Akanda' },
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

  // expose une API globale pour l'export PPTX (navigation directe)
  useEffect(() => {
    window.__okabaNav = { navigate, back, goTab, reset };
  }, [navigate, back, goTab, reset]);

  return (
    <NavCtx.Provider value={{ navigate, back, goTab, reset, top, canBack, tab, setTab, dir, depth: stack.length, pubSheet, setPubSheet }}>
      {children}
    </NavCtx.Provider>
  );
}

// ── Status bar ──────────────────────────────────────────────
const StatusBar = ({ dark = false, time = '9:41' }) => {
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

// ── Action sheet « Publier » (cf. capture) ──────────────────
const PUB_ACTIONS = [
  { id: 'annonce',    label: 'Publier une annonce',         icon: 'edit',      tone: '#0B7C39', screen: 'publier', primary: true },
  { id: 'reel',       label: 'Diffuser une capsule vidéo (Reel)', icon: 'video', tone: '#C8302E' },
  { id: 'etab',       label: 'Créer un établissement',      icon: 'shop',      tone: '#E0A400' },
  { id: 'event',      label: 'Créer un événement',          icon: 'calendar',  tone: '#5C6B7A' },
  { id: 'cv',         label: 'Soumettre mon CV / offre d’emploi', icon: 'doc',  tone: '#5C6B7A' },
  { id: 'service',    label: 'Proposer un service',         icon: 'handshake', tone: '#0B7C39' },
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
      background: G, paddingBottom: 20, paddingTop: 10,
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
function Screen({ children, bg = OKABA.bg, statusDark = false, tabBar = false, noScroll = false, scrollRef, footer, footerPad = 0 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: bg,
      fontFamily: FONT_UI, color: OKABA.ink, WebkitFontSmoothing: 'antialiased',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60 }}>
        <StatusBar dark={statusDark}/>
      </div>
      <div ref={scrollRef} style={{
        position: 'absolute', inset: 0,
        overflowY: noScroll ? 'hidden' : 'auto',
        paddingBottom: tabBar ? 132 : footerPad,
      }}>
        {children}
      </div>
      {footer}
      {tabBar && <TabBar/>}
    </div>
  );
}

// ── Gold iPhone bezel + render active screen ────────────────
function PhoneFrame({ render }) {
  const { top, dir, depth, pubSheet, setPubSheet } = useNav();
  // Each navigation remounts the wrapper (via key) so the CSS entrance
  // animation plays exactly once. fill-mode is forwards and the base state
  // is visible (opacity:1), so content can never be stranded invisible.
  return (
    <div id="okaba-phone" style={{
      position: 'relative', width: 390 + 28, height: 844 + 28,
    }}>
      {/* Gold titanium bezel */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 68,
        background: 'linear-gradient(135deg, #F4DCA0 0%, #E8BE6E 16%, #C8923C 40%, #9C6A22 55%, #D9AE5E 74%, #F6E2B0 100%)',
        boxShadow: '0 40px 90px -20px rgba(60,40,10,0.55), 0 10px 30px rgba(0,0,0,0.25), inset 0 0 2px rgba(255,255,255,0.6)',
        padding: 14,
      }}>
        {/* Inner black rim */}
        <div style={{
          position: 'absolute', inset: 9, borderRadius: 61,
          background: '#1a1208',
        }}/>
        {/* Screen */}
        <div style={{
          position: 'absolute', inset: 14, borderRadius: 56, overflow: 'hidden',
          background: OKABA.bg,
        }}>
          <div key={depth + ':' + top.screen} style={{ position: 'absolute', inset: 0 }}>
            {render(top)}
          </div>
          {/* Action sheet Publier — dans l'écran pour rester dans le cadre */}
          <PublishSheet open={pubSheet} onClose={() => setPubSheet(false)}/>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 116, height: 33, borderRadius: 20, background: '#0a0a0a', zIndex: 70,
          }}/>
          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.28)', zIndex: 70,
            pointerEvents: 'none',
          }}/>
        </div>
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
      position: transparent ? 'absolute' : 'relative',
      top: 0, left: 0, right: 0, zIndex: 40,
      padding: '54px 14px 10px',
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
    backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundPosition: 'center',
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
const ListingCard = ({ item, onClick, fav, onFav }) => {
  const shop = SHOPS[item.shop];
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', background: '#fff', borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3' }}>
        <Img src={item.images[0]} style={{ position: 'absolute', inset: 0 }}/>
        {item.featured && <div style={{ position: 'absolute', top: 8, left: 8 }}><FeaturedTag/></div>}
        <button onClick={(e) => { e.stopPropagation(); onFav && onFav(); }} style={{
          position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 999,
          border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
        }}>
          <Icon name={fav ? 'heart-f' : 'heart'} size={15} color={fav ? OK.red : OK.ink2} strokeWidth={2}/>
        </button>
        <span style={{
          position: 'absolute', bottom: 8, left: 8, padding: '3px 8px', borderRadius: 8,
          background: 'rgba(0,0,0,0.72)', color: '#fff', fontSize: 9.5, fontWeight: 700,
        }}>{item.condition}</span>
      </div>
      <div style={{ padding: '10px 11px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Price value={item.price} unit={item.unit}/>
        <div style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: OK.ink, lineHeight: 1.25,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 32 }}>
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
    </button>
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
    padding: '50px 14px 12px', display: 'flex', alignItems: 'center', gap: 10,
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

// Pilule statut ouvert/fermé
const StatusPill = ({ open, time }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: F, fontSize: 11.5, fontWeight: 700, color: open ? OK.green : OK.ink3 }}>
    <span style={{ width: 6, height: 6, borderRadius: 6, background: open ? OK.green : '#A8A299' }}/>
    {open ? 'Ouvert' : 'Fermé'}{time && <span style={{ color: OK.ink3, fontWeight: 500 }}>· {time}</span>}
  </span>
);

Object.assign(window, {
  Img, Avatar, Stars, Badge, FeaturedTag, SectionHead, Price,
  ListingCard, ListingRow, ShopRow, CatChip, EmptyState, GreenHeader, StatusPill,
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
function HomeScreen() {
  const { navigate } = useNav();
  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Accueil">
        {/* Header vert */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: OK.green,
          padding: '50px 16px 12px', display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <button aria-label="Menu" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><Wordmark size={27}/></div>
          <button aria-label="Notifications" onClick={() => navigate('notifications')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
            <span style={{ position: 'absolute', top: 3, right: 3, width: 8, height: 8, borderRadius: 8, background: OK.gold, border: '1.5px solid ' + OK.green }}/>
          </button>
        </div>

        {/* Bannière OKABA */}
        <div style={{ padding: '14px 14px 0' }}>
          <button onClick={() => {}} style={{ width: '100%', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 16, overflow: 'hidden',
            display: 'block', position: 'relative', aspectRatio: '1672 / 941', textAlign: 'left',
            boxShadow: '0 6px 18px rgba(0,0,0,0.16)' }}>
            <img src="assets/okaba-banner.png" alt="O'KABA — Rejoignez la plateforme de partage"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
          </button>
        </div>

        {/* Services O'KABA */}
        <div style={{ padding: '10px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button onClick={() => navigate('market', { cat: 'all' })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: 6, background: OK.green }}/>)}
          </button>
        </div>
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

        {/* Évènements et sorties */}
        <div style={{ padding: '10px 16px 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: FONT_UI, fontWeight: 800, fontSize: 16, color: OK.green }}>Évènements et sorties</span>
          <button onClick={() => navigate('market', { cat: 'events' })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FONT_UI, fontWeight: 700, fontSize: 13, color: OK.green }}>Voir plus</button>
        </div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '12px 14px 10px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollPaddingLeft: 14 }}>
          {EVENTS.map(ev => (
            <button key={ev.id} onClick={() => {}} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', border: 'none', cursor: 'pointer', padding: 0,
              borderRadius: 16, overflow: 'hidden', position: 'relative', height: 176, textAlign: 'left',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'block' }}>
              <Img src={ev.img} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 22%' }}
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
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ev.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 9, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FONT_UI, fontWeight: 700, fontSize: 11.5, color: '#fff' }}>
                    <Icon name="calendar" size={13} color={OK.gold} strokeWidth={2.2}/>{ev.date} · {ev.time}
                  </span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 5, fontFamily: FONT_UI, fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.9)' }}>
                  <Icon name="pin" size={12} color="rgba(255,255,255,0.9)" strokeWidth={2}/>{ev.place}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ height: 16 }}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { Wordmark, SplashScreen, HomeScreen });


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
function WelcomeScreen() {
  const { navigate } = useNav();
  return (
    <Screen statusDark={true} bg={OK.greenDeep} noScroll>
      <div data-screen-label="Bienvenue" style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 38%, #15924b 0%, #0c7338 36%, #075028 64%, ${OK.greenDeep} 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 26px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div aria-hidden style={{ position: 'absolute', width: 250, height: 250, borderRadius: 999, marginTop: -40,
            background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 68%)' }}/>
          <img src="assets/okaba-mark-white.png" alt="O'KABA" style={{ width: 132, height: 132, objectFit: 'contain',
            filter: 'drop-shadow(0 10px 26px rgba(0,0,0,0.4))', position: 'relative' }}/>
          <div style={{ marginTop: 22, fontFamily: FAU, fontWeight: 800, fontSize: 24, color: '#fff', textAlign: 'center', letterSpacing: -0.3 }}>
            Bienvenue sur O’KABA
          </div>
          <p style={{ margin: '10px 0 0', fontFamily: FAU, fontSize: 13.5, color: 'rgba(255,255,255,0.88)', textAlign: 'center', lineHeight: 1.55, maxWidth: 280 }}>
            La marketplace et l’annuaire du Gabon. Achetez, vendez et découvrez le pays autrement.
          </p>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 44 }}>
          <button onClick={() => navigate('signup')} style={{ width: '100%', height: 54, borderRadius: 14, border: 'none',
            background: OK.gold, color: '#3a2c00', cursor: 'pointer', fontFamily: FAU, fontSize: 15.5, fontWeight: 800,
            boxShadow: '0 10px 26px rgba(245,184,0,0.36)' }}>
            Créer un compte
          </button>
          <button onClick={() => navigate('login')} style={{ width: '100%', height: 54, borderRadius: 14,
            border: '1.5px solid rgba(255,255,255,0.6)', background: 'transparent', color: '#fff', cursor: 'pointer',
            fontFamily: FAU, fontSize: 15.5, fontWeight: 800 }}>
            J’ai déjà un compte
          </button>
        </div>
      </div>
    </Screen>
  );
}

// En-tête clair (retour) pour les écrans de formulaire auth
function AuHeader({ onBack }) {
  return (
    <div style={{ padding: '50px 14px 6px', display: 'flex', alignItems: 'center' }}>
      <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${OK.line}`,
        background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
      </button>
    </div>
  );
}

// ── INSCRIPTION (3 étapes : tél → OTP → infos) ──────────────
function SignupScreen() {
  const { back, reset } = useNav();
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(['', '', '', '', '']);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [ville, setVille] = useState('');
  const [quartier, setQuartier] = useState('');

  const goBack = () => { if (step === 0) reset('home'); else setStep(s => s - 1); };
  const phoneOk = phone.replace(/\D/g, '').length >= 8;
  const codeOk = code.every(c => c !== '');
  const infosOk = nom.trim() && prenom.trim() && ville.trim();

  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    setCode(c => { const n = [...c]; n[i] = d; return n; });
    if (d && i < 4) { const nx = document.getElementById('otp-' + (i + 1)); nx && nx.focus(); }
  };

  return (
    <Screen bg="#fff" statusDark={true} noScroll={false}>
      <div data-screen-label={`Inscription ${step + 1}`}>
        <AuHeader onBack={goBack}/>
        <div style={{ padding: '8px 22px 0' }}>
          {/* progression points */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 26 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? OK.green : OK.line }}/>
            ))}
          </div>

          {step === 0 && (
            <div>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 25, color: OK.ink, letterSpacing: -0.4 }}>Quel est votre numéro&nbsp;?</h1>
              <p style={{ margin: '10px 0 28px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55 }}>
                Nous vous enverrons un code de confirmation par SMS.
              </p>
              <label style={AU_LABEL}>Numéro de téléphone</label>
              <div style={{ ...AU_FIELD, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FAU, fontWeight: 800, fontSize: 14.5, color: OK.ink, paddingRight: 10, borderRight: `1px solid ${OK.line}` }}>
                  🇬🇦 +241
                </span>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9 ]/g, ''))} placeholder="06 00 00 00" inputMode="numeric"
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FAU, fontSize: 15, fontWeight: 600, color: OK.ink }}/>
              </div>
              <div style={{ marginTop: 28 }}><AuBtn label="Recevoir le code" icon="arrow-r" disabled={!phoneOk} onClick={() => phoneOk && setStep(1)}/></div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 25, color: OK.ink, letterSpacing: -0.4 }}>Code de confirmation</h1>
              <p style={{ margin: '10px 0 28px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55 }}>
                Saisissez le code à 5 chiffres envoyé au <strong style={{ color: OK.ink }}>+241 {phone || '06 00 00 00'}</strong>.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                {code.map((c, i) => (
                  <input key={i} id={'otp-' + i} value={c} onChange={e => setDigit(i, e.target.value)} inputMode="numeric" maxLength={1}
                    style={{ width: 54, height: 62, textAlign: 'center', borderRadius: 13, border: `1.5px solid ${c ? OK.green : OK.line}`,
                      background: c ? 'rgba(11,124,57,0.05)' : '#fff', fontFamily: FAU, fontWeight: 800, fontSize: 26, color: OK.ink, outline: 'none' }}/>
                ))}
              </div>
              <div style={{ marginTop: 22, fontFamily: FAU, fontSize: 12.5, color: OK.ink2, textAlign: 'center' }}>
                Pas reçu&nbsp;? <span style={{ color: OK.green, fontWeight: 800 }}>Renvoyer le code</span>
              </div>
              <div style={{ marginTop: 26 }}><AuBtn label="Valider" icon="check" disabled={!codeOk} onClick={() => codeOk && setStep(2)}/></div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 style={{ margin: 0, fontFamily: FAU, fontWeight: 800, fontSize: 25, color: OK.ink, letterSpacing: -0.4 }}>Vos informations</h1>
              <p style={{ margin: '10px 0 24px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55 }}>
                Ces informations apparaîtront sur votre profil O’KABA.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={AU_LABEL}>Prénom</label>
                    <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Patricia" style={AU_FIELD}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={AU_LABEL}>Nom</label>
                    <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Ndong" style={AU_FIELD}/>
                  </div>
                </div>
                <div>
                  <label style={AU_LABEL}>Ville</label>
                  <input value={ville} onChange={e => setVille(e.target.value)} placeholder="Libreville" style={AU_FIELD}/>
                </div>
                <div>
                  <label style={AU_LABEL}>Quartier</label>
                  <input value={quartier} onChange={e => setQuartier(e.target.value)} placeholder="Glass, Batterie IV…" style={AU_FIELD}/>
                </div>
                <div>
                  <label style={AU_LABEL}>Mot de passe</label>
                  <input type="password" placeholder="••••••••" style={AU_FIELD}/>
                </div>
              </div>
              <div style={{ margin: '26px 0 30px' }}><AuBtn label="Créer mon compte" icon="check" disabled={!infosOk} onClick={() => infosOk && reset('home')}/></div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}

// ── CONNEXION (tél + mot de passe) ──────────────────────────
function LoginScreen() {
  const { back, navigate, reset } = useNav();
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const ok = phone.replace(/\D/g, '').length >= 8 && pwd.length >= 4;
  return (
    <Screen bg="#fff" statusDark={true}>
      <div data-screen-label="Connexion">
        <AuHeader onBack={back}/>
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <Wordmark size={34} onLight/>
          </div>
          <h1 style={{ margin: '18px 0 0', fontFamily: FAU, fontWeight: 800, fontSize: 25, color: OK.ink, letterSpacing: -0.4, textAlign: 'center' }}>Connexion</h1>
          <p style={{ margin: '10px 0 28px', fontFamily: FAU, fontSize: 13.5, color: OK.ink2, lineHeight: 1.55, textAlign: 'center' }}>
            Heureux de vous revoir sur O’KABA.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={AU_LABEL}>Numéro de téléphone</label>
              <div style={{ ...AU_FIELD, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FAU, fontWeight: 800, fontSize: 14.5, color: OK.ink, paddingRight: 10, borderRight: `1px solid ${OK.line}` }}>
                  🇬🇦 +241
                </span>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9 ]/g, ''))} placeholder="06 00 00 00" inputMode="numeric"
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FAU, fontSize: 15, fontWeight: 600, color: OK.ink }}/>
              </div>
            </div>
            <div>
              <label style={AU_LABEL}>Mot de passe</label>
              <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" style={AU_FIELD}/>
              <div style={{ marginTop: 8, textAlign: 'right', fontFamily: FAU, fontSize: 12.5, fontWeight: 700, color: OK.green }}>Mot de passe oublié&nbsp;?</div>
            </div>
          </div>
          <div style={{ marginTop: 26 }}><AuBtn label="Se connecter" disabled={!ok} onClick={() => ok && reset('home')}/></div>
          <div style={{ marginTop: 22, textAlign: 'center', fontFamily: FAU, fontSize: 13, color: OK.ink2 }}>
            Pas encore de compte&nbsp;? <span onClick={() => navigate('signup')} style={{ color: OK.green, fontWeight: 800, cursor: 'pointer' }}>S’inscrire</span>
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
  const items = cat === 'all' ? LISTINGS : LISTINGS.filter(l => l.cat === cat);

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Marketplace">
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
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 34, padding: '0 12px',
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

        {/* Results */}
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
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: OK.green, padding: '50px 14px 14px', display: 'flex', alignItems: 'center', gap: 10,
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
  const similar = LISTINGS.filter(l => l.cat === item.cat && l.id !== item.id).slice(0, 4);
  const sref = useRef(null);

  return (
    <Screen bg={OK.bg} statusDark={true} scrollRef={sref} footerPad={92} footer={
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#fff', borderTop: `1px solid ${OK.line}`, padding: '12px 16px 26px',
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
      <div data-screen-label="Détail annonce">
        {/* Gallery */}
        <div style={{ position: 'relative', height: 320 }}>
          <Img src={item.images[img]} style={{ position: 'absolute', inset: 0 }}
            overlay="linear-gradient(180deg, rgba(0,0,0,0.32) 0%, transparent 24%)"/>
          <div style={{ position: 'absolute', top: 52, left: 14, right: 14, display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
            <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
            </button>
            <div style={{ flex: 1 }}/>
            {['share', 'dots'].map(ic => (
              <button key={ic} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={ic} size={17} color={OK.ink} strokeWidth={2}/>
              </button>
            ))}
          </div>
          {item.featured && <div style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 4 }}><FeaturedTag/></div>}
          {item.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 6, zIndex: 4 }}>
              {item.images.map((_, i) => (
                <button key={i} onClick={() => setImg(i)} style={{ width: i === img ? 22 : 7, height: 7, borderRadius: 99,
                  background: i === img ? '#fff' : 'rgba(255,255,255,0.55)', border: 'none', cursor: 'pointer', transition: 'all .2s' }}/>
              ))}
            </div>
          )}
        </div>

        {/* Body card */}
        <div style={{ position: 'relative', marginTop: -22, background: OK.bg, borderRadius: '26px 26px 0 0', padding: '22px 20px 0' }}>
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
  const listings = LISTINGS.filter(l => l.shop === shop.id);
  const photosCount = shop.photosCount || listings.reduce((n, l) => n + l.images.length, 0);
  const avisCount = shop.avisCount || shop.reviews || 0;
  const photoPool = listings.flatMap(l => l.images).concat(shop.cover, shop.avatar);
  const shopReviews = [
    { name: 'Jean-Pierre M.', rating: 5, time: 'Il y a 3 j', text: 'Produits naturels de grande qualité, savon au karité excellent. Je recommande vivement !' },
    { name: 'Aline N.', rating: 4, time: 'Il y a 1 sem', text: 'Très bon contact, livraison rapide. Les infusions sont délicieuses.' },
    { name: 'Cédric O.', rating: 5, time: 'Il y a 2 sem', text: 'Coopérative sérieuse, prix corrects. Merci O’KABA de les mettre en avant !' },
  ];

  const TABS_SHOP = [
    ['apropos', 'À propos'],
    ['annonces', `Annonces (${listings.length})`],
    ['photos', `Photos (${photosCount})`],
    ['avis', `Avis (${avisCount})`],
  ];

  // ligne de contacts sociaux (bas de page)
  const SOCIALS = [
    { ic: 'phone', bg: OK.green }, { ic: 'mail', bg: OK.blue }, { ic: 'globe', bg: OK.green },
    { ic: 'pin', bg: OK.blue }, { ic: 'whatsapp', bg: OK.wa }, { ic: 'fb', bg: OK.fb },
    { ic: 'ig', bg: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)' },
  ];

  return (
    <Screen bg={OK.bg} statusDark={true}>
      <div data-screen-label="Profil boutique">
        {/* Cover (épinglée en arrière-plan) */}
        <div style={{ position: 'sticky', top: 0, zIndex: 0, height: 230 }}>
          <Img src={shop.cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 30%)"/>
          <div style={{ position: 'absolute', top: 50, left: 14, right: 14, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <button onClick={back} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="back" size={20} color={OK.ink} strokeWidth={2.4}/>
            </button>
            <button style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: '#3a3a3a', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="share" size={18} color="#fff" strokeWidth={2}/>
            </button>
          </div>
          {/* avatar logo coopérative */}
          <div style={{ position: 'absolute', left: 18, bottom: 14, width: 92, height: 92, borderRadius: 16, overflow: 'hidden',
            border: '3px solid #fff', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.22)' }}>
            <Img src={shop.avatar} style={{ width: '100%', height: '100%' }}/>
          </div>
          {/* heart */}
          <button onClick={() => setFav(f => !f)} style={{ position: 'absolute', right: 16, bottom: 14, width: 44, height: 44, borderRadius: 999,
            border: 'none', cursor: 'pointer', background: '#3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.22)' }}>
            <Icon name={fav ? 'heart-f' : 'heart'} size={20} color={fav ? '#fff' : '#fff'} strokeWidth={2}/>
          </button>
        </div>

        {/* Feuille de contenu qui remonte par-dessus la couverture */}
        <div style={{ position: 'relative', zIndex: 1, background: OK.bg, marginTop: -20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
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
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 18px 4px' }}>
          {TABS_SHOP.map(([id, l]) => {
            const on = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{ flexShrink: 0, height: 34, padding: '0 14px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
                border: on ? 'none' : `1px solid ${OK.line}`, background: on ? OK.green : OK.bg2, color: on ? '#fff' : OK.ink2,
                fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700 }}>{l}</button>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {listings.map(item => <ListingCard key={item.id} item={item} onClick={() => navigate('listing', { id: item.id })}/>)}
            </div>
          )}
          {tab === 'photos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {photoPool.slice(0, photosCount).map((src, i) => (
                <div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 10, overflow: 'hidden' }}>
                  <Img src={src} style={{ width: '100%', height: '100%' }}/>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: 9, padding: '22px 14px 0', flexWrap: 'nowrap' }}>
          {SOCIALS.map((s, i) => (
            <button key={i} onClick={() => s.ic === 'message' && navigate('chat', { id: shop.id })}
              style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer', background: s.bg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
              <Icon name={s.ic} size={20} color="#fff" strokeWidth={2}/>
            </button>
          ))}
        </div>

        <div style={{ height: 36 }}/>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { ListingScreen, ShopScreen });


// ===================== 08-annuaire =====================
// okaba-screens-annuaire.jsx — Annuaire (répertoire d'entités) + Profil entité (réseau social)
const FA = "'Manrope', system-ui, sans-serif";

const entityList = () => Object.values(ANNU_ENTITIES);
// rubrique (ALL_CATEGORIES) correspondant au service d'une entité
const SVC2RUB = { industries: 'industries', admin: 'admin', ministeres: 'tourisme', restaurants: 'restaurants', telecoms: 'telecom', sante: 'sante', banques: 'banques' };

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
        <img src={e.logo} alt={e.name} style={{ maxWidth: '78%', maxHeight: '78%', objectFit: 'contain' }}/>
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
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.city.split('·').pop().trim()}</span>
          </span>
          {e.followers && <span style={{ fontFamily: FA, fontSize: 11, fontWeight: 700, color: OK.green, whiteSpace: 'nowrap' }}>· {e.followers}</span>}
        </div>
      </div>
      <Icon name="chev-r" size={18} color={OK.ink3} strokeWidth={2}/>
    </button>
  );
}

// ── ANNUAIRE (style marketplace : header + recherche + rubriques + fiches) ──
function AnnuaireScreen() {
  const { back, navigate } = useNav();
  const [cat, setCat] = useState('tout');
  let items = entityList();
  if (cat !== 'tout') items = items.filter(e => SVC2RUB[e.service] === cat);
  if (items.length === 0) items = entityList();
  // tri : à la une d'abord
  items = [...items].sort((a, b) => (a.id === 'baie-des-rois' ? -1 : b.id === 'baie-des-rois' ? 1 : 0) || ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Annuaire">
        <GreenHeader title="Annuaire" onBack={back}
          right={<button onClick={() => navigate('annuaire-map')} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="pin" size={18} color="#fff" strokeWidth={2}/>
          </button>}/>

        {/* Search bar */}
        <div style={{ padding: '14px 16px 0' }}>
          <button onClick={() => navigate('annuaire-search')} style={{ width: '100%', height: 48, background: '#fff', borderRadius: 12, border: `1px solid ${OK.line}`,
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', textAlign: 'left' }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <span style={{ flex: 1, fontFamily: FA, fontSize: 13, color: OK.ink3 }}>Mairie, ministère, entreprise…</span>
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

        {/* Compteur */}
        <div style={{ padding: '8px 18px 4px', fontFamily: FA, fontSize: 12.5, color: OK.ink2, fontWeight: 600 }}>
          <strong style={{ color: OK.ink }}>{items.length}</strong> établissement{items.length > 1 ? 's' : ''}
          {cat !== 'tout' && <span style={{ color: OK.ink3 }}> · {(ALL_CATEGORIES.find(c => c.id === cat) || {}).name}</span>}
        </div>

        {/* Liste des fiches — lignes horizontales */}
        <div style={{ padding: '8px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(e => <AnnuaireRow key={e.id} e={e} onClick={() => navigate('entity', { id: e.id })}/>)}
        </div>
        <div style={{ height: 40 }}/>
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
          <Img src={e.logo} style={{ width: '100%', height: '100%' }}/>
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingBottom: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: FA, fontSize: 14.5, fontWeight: 800, color: OK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.name}</span>
            {e.verified && <Icon name="verified" size={14} color={OK.green} strokeWidth={2}/>}
          </div>
          <div style={{ fontFamily: FA, fontSize: 11.5, color: OK.ink2, marginTop: 1 }}>{e.cat}</div>
        </div>
        <span style={{ fontFamily: FA, fontSize: 11, fontWeight: 700, color: OK.ink3, paddingBottom: 3, whiteSpace: 'nowrap' }}>{e.followers} abonnés</span>
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
  const res = q.trim() ? entityList().filter(e => (e.name + ' ' + e.cat).toLowerCase().includes(q.toLowerCase())) : entityList();
  return (
    <Screen bg={OK.bg2} statusDark={true}>
      <div data-screen-label="Annuaire recherche">
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: OK.green, padding: '50px 14px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
          <button onClick={back} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={18} color="#fff" strokeWidth={2.2}/>
          </button>
          <div style={{ flex: 1, height: 44, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 9 }}>
            <Icon name="search" size={17} color={OK.ink2} strokeWidth={2}/>
            <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher une institution…"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FA, fontSize: 14, color: OK.ink }}/>
          </div>
        </div>
        <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {res.map(e => <EntityCard key={e.id} e={e} onClick={() => navigate('entity', { id: e.id })}/>)}
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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '50px 14px 0', display: 'flex', alignItems: 'center', gap: 10, zIndex: 30 }}>
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
  const e = ANNU_ENTITIES[params?.id] || entityList()[0];
  const [tab, setTab] = useState(e.tenants ? 'etablissements' : 'publications');
  const [following, setFollowing] = useState(false);
  const posts = ANNU_POSTS.filter(p => p.entity === e.id);
  const reels = ANNU_REELS.filter(r => r.entity === e.id);
  const allReels = ANNU_REELS; // pour remplir l'onglet réels

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Profil entité">
        {/* Cover bâtiment */}
        <div style={{ position: 'relative', height: 170 }}>
          <Img src={e.cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 36%)"/>
          <button onClick={back} style={{ position: 'absolute', top: 50, left: 14, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/>
          </button>
          <button style={{ position: 'absolute', top: 50, right: 14, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: '#3a3a3a', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="share" size={17} color="#fff" strokeWidth={2}/>
          </button>
        </div>

        {/* Identité */}
        <div style={{ padding: '0 18px', marginTop: -34 }}>
          <div style={{ width: 76, height: 76, borderRadius: 18, overflow: 'hidden', border: '3px solid #fff', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
            <Img src={e.logo} style={{ width: '100%', height: '100%' }}/>
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
            <span style={{ fontFamily: FA, fontSize: 13, color: OK.ink }}><strong style={{ fontWeight: 800 }}>{e.followers}</strong> <span style={{ color: OK.ink2 }}>abonnés</span></span>
            <span style={{ fontFamily: FA, fontSize: 13, color: OK.ink }}><strong style={{ fontWeight: 800 }}>{posts.length}</strong> <span style={{ color: OK.ink2 }}>publications</span></span>
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
          {/* actions sociales */}
          <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
            {[['phone', OK.green], ['mail', OK.blue], ['globe', OK.green], ['whatsapp', OK.wa], ['fb', OK.fb]].map(([ic, bg], i) => (
              <button key={i} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer', background: bg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                <Icon name={ic} size={19} color="#fff" strokeWidth={2}/>
              </button>
            ))}
          </div>
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
                {[['pin', 'Adresse', e.city], ['phone', 'Téléphone', e.phone], ['verified', 'Statut', 'Compte officiel vérifié O’KABA']].map(([ic, l, v]) => (
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
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <Icon name="message" size={19} color={OK.ink2} strokeWidth={2}/>
          <span style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 700, color: OK.ink2 }}>{post.comments}</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
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
  const [tab, setTab] = useState('menu');
  const [fav, setFav] = useState(false);
  if (!t) return (<Screen bg={OK.bg2} statusDark={true}><div data-screen-label="Établissement"><GreenHeader title="Établissement" onBack={back}/></div></Screen>);
  const gallery = (t.gallery || []).map(id => bImg(id, 600));
  const TABS_E = [['menu', t.menuLabel || 'Menu'], ['photos', 'Photos'], ['avis', 'Avis'], ['infos', 'Infos']];
  const dist = [58, 62, 24, 8, 4];
  return (
    <Screen bg={OK.bg} statusDark={true} footerPad={92} footer={
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fff', borderTop: `1px solid ${OK.line}`, padding: '12px 16px 26px', display: 'flex', gap: 10, boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
        <button onClick={() => setFav(f => !f)} style={{ width: 52, height: 52, borderRadius: 13, border: `1.5px solid ${OK.line}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={fav ? 'heart-f' : 'heart'} size={21} color={fav ? OK.red : OK.ink2} strokeWidth={2}/></button>
        <button style={{ width: 52, height: 52, borderRadius: 13, border: `1.5px solid ${OK.green}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="message" size={20} color={OK.green} strokeWidth={2}/></button>
        <button style={{ flex: 1, height: 52, borderRadius: 13, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FA, fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(11,124,57,0.32)' }}>{t.cta || 'Réserver'}</button>
      </div>
    }>
      <div data-screen-label="Vitrine établissement">
        {/* Hero */}
        <div style={{ position: 'relative', height: 250 }}>
          <Img src={t.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.34) 0%, transparent 30%, rgba(0,0,0,0.52) 100%)"/>
          <div style={{ position: 'absolute', top: 52, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/></button>
            <button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: '#3a3a3a', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" size={17} color="#fff" strokeWidth={2}/></button>
          </div>
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
            <span style={{ display: 'inline-block', background: OK.gold, color: '#3a2c00', fontFamily: FA, fontWeight: 800, fontSize: 10, padding: '3px 9px', borderRadius: 999, marginBottom: 8 }}>{t.group}</span>
            <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 25, color: '#fff', letterSpacing: -0.4, textShadow: '0 1px 6px rgba(0,0,0,0.45)' }}>{t.name}</div>
            <div style={{ fontFamily: FA, fontWeight: 600, fontSize: 12.5, color: 'rgba(255,255,255,0.92)', marginTop: 3, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{t.tagline}</div>
          </div>
        </div>

        {/* Identity */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FA, fontSize: 13, fontWeight: 800, color: OK.ink }}><Icon name="star" size={14} color={OK.star}/> {t.rating.toString().replace('.', ',')} <span style={{ color: OK.ink2, fontWeight: 600 }}>({t.reviews} avis)</span></span>
            {t.priceLevel ? <span style={{ width: 3, height: 3, borderRadius: 3, background: OK.ink3 }}/> : null}
            {t.priceLevel ? <span style={{ fontFamily: FA, fontSize: 12.5, color: OK.ink2, fontWeight: 700 }}>{t.priceLevel}</span> : null}
            <span style={{ width: 3, height: 3, borderRadius: 3, background: OK.ink3 }}/>
            <StatusPill open={t.open} time={t.hours}/>
          </div>
          {/* lien complexe */}
          <button onClick={() => navigate('entity', { id: 'baie-des-rois' })} style={{ marginTop: 13, width: '100%', textAlign: 'left', background: 'rgba(11,124,57,0.055)', border: `1px solid rgba(11,124,57,0.18)`, borderRadius: 14, padding: '11px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: OK.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="shop" size={17} color="#fff" strokeWidth={2}/></div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FA, fontSize: 12.5, fontWeight: 800, color: OK.green }}>La Baie des Rois</div><div style={{ fontFamily: FA, fontSize: 11, color: OK.ink2, marginTop: 1 }}>Enseigne du complexe · Bord de mer, Libreville</div></div>
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
              {t.menu.map(sec => (
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
                <div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 10, overflow: 'hidden' }}><Img src={src} style={{ width: '100%', height: '100%' }}/></div>
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
                {t.reviewList.map(([nm, rt, tm, tx], i) => (
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
              <div style={{ background: '#fff', border: `1px solid ${OK.line}`, borderRadius: 14, overflow: 'hidden' }}>
                {[['clock', 'Horaires', t.hours], ['pin', 'Adresse', 'La Baie des Rois · Bord de mer, Libreville'], ['phone', 'Téléphone', t.phone]].map(([ic, l, v], i) => (
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
  const tenants = e.tenants || [];
  const groups = ['Restaurants', 'Bars & lounges', 'Loisirs & famille', 'Shopping'];
  const shown = grp === 'Tout' ? tenants : tenants.filter(t => t.group === grp);
  const events = [
    { title: 'Nuit du Bord de Mer', when: 'Ven. 18 juil. · 20h00', img: 'assets/event-femoga.jpg' },
    { title: 'Concert live — Régab Sessions', when: 'Sam. 26 juil. · 21h00', img: bImg('1470229722913-7c0e2dbbafd3', 700) },
    { title: 'Marché des créateurs', when: 'Dim. 3 août · 10h00', img: bImg('1601924994987-69e26d50dc26', 700) },
  ];
  const card = (t) => (
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
  );

  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="La Baie des Rois">
        {/* Cover */}
        <div style={{ position: 'relative', height: 170 }}>
          <Img src={e.cover} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, rgba(0,0,0,0.34) 0%, transparent 40%)"/>
          <button onClick={back} style={{ position: 'absolute', top: 50, left: 14, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/></button>
          <button style={{ position: 'absolute', top: 50, right: 14, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: '#3a3a3a', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" size={17} color="#fff" strokeWidth={2}/></button>
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
              <button key={i} style={{ width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer', background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}><Icon name={ic} size={19} color="#fff" strokeWidth={2}/></button>
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
              <div key={i} style={{ position: 'relative', height: 150, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
                <Img src={ev.img} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 30%' }} overlay="linear-gradient(180deg, rgba(7,40,20,0.1) 30%, rgba(7,40,20,0.82) 100%)"/>
                <div style={{ position: 'absolute', top: 12, right: 12, background: OK.gold, color: '#3a2c00', padding: '4px 10px', borderRadius: 999, fontFamily: FA, fontWeight: 800, fontSize: 10.5 }}>Événement</div>
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
                  <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 18, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>{ev.title}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, fontFamily: FA, fontWeight: 700, fontSize: 11.5, color: '#fff' }}><Icon name="calendar" size={13} color={OK.gold} strokeWidth={2.2}/>{ev.when}</div>
                </div>
              </div>
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
    </Screen>
  );
}

Object.assign(window, { AnnuaireScreen, AnnuaireSearchScreen, AnnuaireMapScreen, EntityScreen, TenantScreen, BaieHub });


// ===================== 09-tourisme =====================
// okaba-screens-tourisme.jsx — Tourisme : Découvrez le Gabon (style img1)
const FT = "'Manrope', system-ui, sans-serif";

function TourismeScreen() {
  const { back, navigate } = useNav();
  const e = (typeof ANNU_ENTITIES !== 'undefined' && ANNU_ENTITIES['baie-des-rois']) || {};
  const tenants = e.tenants || [];
  const groups = ['Restaurants', 'Bars & lounges', 'Loisirs & famille', 'Shopping'];
  const baieEvents = [
    { title: 'Le Ngori des Vacances', date: '18 juil.', poster: 'assets/ev-a.jpeg' },
    { title: 'Fête de la Musique', date: '20–21 juin 2026', poster: 'assets/ev-c.jpeg' },
    { title: 'Camp de Noël', date: '20 déc. – 3 jan.', poster: 'assets/ev-b.jpeg' },
  ];
  const explore = [
    { label: 'Restaurants & Bars', group: 'Restaurants' },
    { label: 'Hôtels', group: 'Loisirs & famille', img: 'assets/tour-plage.jpg' },
    { label: 'Loisirs et divertissement', group: 'Loisirs & famille', img: bImg('1489599849927-2ee91cede3ba', 500) },
    { label: 'Smart City', smart: true },
  ];
  const groupImg = g => (tenants.find(t => t.group === g) || {}).img;
  const featured = ['bdr-ocean', 'sakura', 'theone', 'club-plage', 'lamaia'].map(id => tenants.find(t => t.id === id)).filter(Boolean);
  const feat = featured.length ? featured : tenants.slice(0, 5);
  return (
    <Screen bg={OK.bg} statusDark={true}>
      <div data-screen-label="La Baie des Rois">
        {/* Hero */}
        <div style={{ position: 'relative', height: 300 }}>
          <Img src={e.cover || 'assets/baie-cover.png'}
            style={{ position: 'absolute', inset: 0 }}
            overlay="linear-gradient(180deg, rgba(4,20,10,0.5) 0%, rgba(4,20,10,0.05) 30%, rgba(4,20,10,0.35) 58%, rgba(4,20,10,0.9) 100%)"/>
          <div style={{ position: 'absolute', top: 50, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
            <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="back" size={19} color="#fff" strokeWidth={2.2}/>
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="share" size={17} color="#fff" strokeWidth={2}/>
            </button>
          </div>
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
              <span style={{ width: 22, height: 2, background: OK.gold, borderRadius: 2 }}/>
              <span style={{ fontFamily: FT, fontWeight: 800, fontSize: 10.5, letterSpacing: 2.2, color: OK.gold, textTransform: 'uppercase' }}>Complexe · Bord de mer</span>
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
              <button key={c.label} onClick={() => navigate('tourisme-spots', { cat: c.group })} style={{
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
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '12px 14px 10px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollPaddingLeft: 14 }}>
            {baieEvents.map(ev => (
              <button key={ev.title} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 16, overflow: 'hidden', position: 'relative', height: 200, textAlign: 'left', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', background: '#0b1a10', display: 'block' }}>
                <img src={ev.poster} alt={ev.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}/>
              </button>
            ))}
          </div>
        </div>

        {/* Incontournables */}
        <div style={{ padding: '20px 0 0' }}>
          <div style={{ padding: '0 16px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: FT, fontWeight: 800, fontSize: 18, color: OK.green }}>Incontournables</span>
            <button onClick={() => navigate('entity', { id: 'baie-des-rois' })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FT, fontWeight: 700, fontSize: 13, color: OK.green }}>Voir tout</button>
          </div>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '12px 14px 10px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollPaddingLeft: 14 }}>
            {feat.map(s => (
              <button key={s.id} onClick={() => navigate('tenant', { id: s.id })} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 16, overflow: 'hidden', position: 'relative', height: 176, textAlign: 'left', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', display: 'block' }}>
                <Img src={s.img} style={{ position: 'absolute', inset: 0, backgroundPosition: 'center 30%' }} overlay="linear-gradient(90deg, rgba(7,40,20,0.86) 0%, rgba(7,40,20,0.55) 45%, rgba(7,40,20,0.15) 100%)"/>
                <div style={{ position: 'absolute', top: 12, right: 12, background: OK.gold, color: '#3a2c00', padding: '5px 11px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11 }}>{s.group}</div>
                <div style={{ position: 'absolute', left: 16, right: 14, bottom: 14 }}>
                  <div style={{ fontFamily: FT, fontWeight: 800, fontSize: 20, color: '#fff', lineHeight: 1.12, textShadow: '0 1px 6px rgba(0,0,0,0.4)', maxWidth: 240 }}>{s.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 9 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FT, fontWeight: 700, fontSize: 11.5, color: '#fff' }}><Icon name="star" size={13} color={OK.gold}/>{s.rating.toString().replace('.', ',')}</span>
                    <span style={{ fontFamily: FT, fontWeight: 600, fontSize: 11.5, color: 'rgba(255,255,255,0.9)' }}>{s.cat}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 40 }}/>
      </div>
    </Screen>
  );
}

// Liste des enseignes d'un groupe de la Baie des Rois
function TourismeSpotsScreen({ params }) {
  const { back, navigate } = useNav();
  const e = (typeof ANNU_ENTITIES !== 'undefined' && ANNU_ENTITIES['baie-des-rois']) || {};
  const tenants = e.tenants || [];
  const group = params?.cat || 'Restaurants';
  const spots = tenants.filter(t => t.group === group);
  return (
    <Screen bg={OK.bg2} statusDark={true} tabBar>
      <div data-screen-label="Baie — groupe">
        <GreenHeader title={group} onBack={back}/>
        <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {spots.map(s => (
            <button key={s.id} onClick={() => navigate('tenant', { id: s.id })} style={{ textAlign: 'left', border: `1px solid ${OK.line}`, cursor: 'pointer', padding: 0, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'relative', height: 150 }}>
                <Img src={s.img} style={{ position: 'absolute', inset: 0 }} overlay="linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)"/>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 11 }}>
                  <div style={{ fontFamily: FT, fontWeight: 800, fontSize: 17, color: '#fff', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{s.name}</div>
                  <div style={{ fontFamily: FT, fontWeight: 600, fontSize: 11.5, color: 'rgba(255,255,255,0.9)', marginTop: 2 }}>{s.cat}</div>
                </div>
                <span style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(255,255,255,0.94)', color: OK.ink, fontFamily: FT, fontWeight: 800, fontSize: 11.5, padding: '4px 9px', borderRadius: 999 }}>
                  <Icon name="star" size={12} color={OK.star}/> {s.rating.toString().replace('.', ',')}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 30 }}/>
      </div>
    </Screen>
  );
}

// ── SMART CITY — services connectés de la ville (style natif O'KABA) ──
function SmartCityScreen() {
  const { back } = useNav();
  const modules = [
    { id: 'info', title: 'Informations', img: 'assets/mairie-lbv-building.jpg' },
    { id: 'trafic', title: 'Trafic', img: bImg('1544620347-c4fd4a3d5957', 300) },
    { id: 'meteo', title: 'Météo', img: bImg('1504608524841-42fe6f032b4b', 300) },
    { id: 'parking', title: 'Parking', img: bImg('1470224114660-3f6686c562eb', 300) },
    { id: 'pharmacie', title: 'Pharmacie', img: bImg('1631549916768-4119b2e5f926', 300) },
    { id: 'carburant', title: 'Carburant', img: bImg('1516357231954-91487b459602', 300) },
    { id: 'recharge', title: 'Borne de recharge', img: bImg('1593941707882-a5bba14938c7', 300) },
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
          <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', height: 196, boxShadow: '0 10px 26px rgba(11,124,57,0.28)' }}>
            {/* Slide 0 : météo + trafic */}
            <div style={{ position: 'absolute', inset: 0, opacity: slide === 0 ? 1 : 0, transform: slide === 0 ? 'scale(1)' : 'scale(1.03)', transition: 'opacity .55s ease, transform .55s ease', pointerEvents: slide === 0 ? 'auto' : 'none',
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
              <button key={ev.title} style={{ position: 'absolute', inset: 0, textAlign: 'left', border: 'none', padding: 0, cursor: 'pointer',
                opacity: slide === i + 1 ? 1 : 0, transform: slide === i + 1 ? 'scale(1)' : 'scale(1.03)', transition: 'opacity .55s ease, transform .55s ease', pointerEvents: slide === i + 1 ? 'auto' : 'none' }}>
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
            <button key={m.id} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 74, height: 74, borderRadius: 999, overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
                <Img src={m.img} style={{ width: '100%', height: '100%' }}/>
              </div>
              <span style={{ fontFamily: FX, fontWeight: 700, fontSize: 12, color: OK.ink, textAlign: 'center', lineHeight: 1.15 }}>{m.title}</span>
            </button>
          ))}
        </div>

        {/* Cartes parking (image) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 0' }}>
          {[
            { name: 'Parking Nord', img: bImg('1506521781263-d8422e82f27a', 700), free: 240 },
            { name: 'Parking Sud', img: bImg('1470224114660-3f6686c562eb', 700), free: 68 },
          ].map(p => (
            <button key={p.name} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', padding: 0, borderRadius: 18, overflow: 'hidden', position: 'relative', height: 132, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
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

Object.assign(window, { TourismeScreen, TourismeSpotsScreen, SmartCityScreen });


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
      borderTop: `1px solid ${OK.line}`, padding: '12px 16px 26px', boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
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

  const goBack = () => { if (step === 0) { canBack ? back() : navigate('home'); } else setStep(s => s - 1); };


  const iCat = 0, iDet = 1, iMedia = 2, iLoc = needsLoc ? 3 : -1, iOffer = needsLoc ? 4 : 3;
  const priceNeeded = priceMode === 'Prix fixe' || priceMode === 'Payant' || priceMode === 'Tarif horaire' || priceMode === 'Tarif fixe';
  const detailValid = title.trim() && (!priceNeeded || price.trim());
  const locValid = !needsLoc || !cfg.locReq || loc.trim();
  const priceUnit = priceMode === 'Tarif horaire' ? ' F / h' : sel === 'immo' && form.transaction === 'Location' ? ' F / mois' : ' FCFA';
  const priceLabel = !priceNeeded ? (priceMode === 'Gratuit' ? 'Gratuit' : 'Sur devis') : (price ? Number(price).toLocaleString('fr-FR') + priceUnit : '—');

  if (preview) {
    return (
      <Screen bg={OK.bg} statusDark={true} footerPad={92} footer={
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 16px 26px', borderTop: `1px solid ${OK.line}`, background: '#fff', display: 'flex', gap: 10, boxShadow: '0 -6px 22px rgba(0,0,0,0.07)' }}>
          <button onClick={() => setPreview(false)} style={{ flex: 1, height: 52, borderRadius: 14, border: `1.5px solid ${OK.line}`, background: '#fff', color: OK.ink, cursor: 'pointer', fontFamily: FX, fontSize: 14.5, fontWeight: 800 }}>Modifier</button>
          <button onClick={() => { setPreview(false); setStep(iOffer); }} style={{ flex: 1.4, height: 52, borderRadius: 14, border: 'none', background: OK.green, color: '#fff', cursor: 'pointer', fontFamily: FX, fontSize: 14.5, fontWeight: 800, boxShadow: '0 8px 20px rgba(11,124,57,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>Continuer <Icon name="arrow-r" size={18} color="#fff" strokeWidth={2.4}/></button>
        </div>
      }>
        <div data-screen-label="Aperçu de l'annonce">
          <div style={{ position: 'relative', height: 300 }}>
            <Img src={coverImg} style={{ position: 'absolute', inset: 0 }}/>
            <button onClick={() => setPreview(false)} style={{ position: 'absolute', top: 50, left: 14, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="back" size={19} color={OK.ink} strokeWidth={2.2}/></button>
            <span style={{ position: 'absolute', top: 54, right: 14, fontFamily: FX, fontWeight: 800, fontSize: 11.5, color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '5px 11px', borderRadius: 999 }}>Aperçu</span>
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
  return (
    <Screen bg={OK.bg} statusDark={true}>
      <div data-screen-label="Notifications">
        <GreenHeader title="Notifications" onBack={back}
          right={<button style={{ height: 30, padding: '0 12px', borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', fontFamily: FX, fontSize: 12, fontWeight: 700 }}>Tout lire</button>}/>
        <div style={{ padding: '10px 14px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} style={{ display: 'flex', gap: 12, padding: '13px 12px', borderRadius: 14,
              background: n.unread ? 'rgba(11,124,57,0.05)' : 'transparent', position: 'relative' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: n.tone + '1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={n.icon} size={20} color={n.tone} strokeWidth={2}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FX, fontSize: 13.5, fontWeight: 800, color: OK.ink, lineHeight: 1.25 }}>{n.title}</div>
                <div style={{ fontFamily: FX, fontSize: 12.5, color: OK.ink2, lineHeight: 1.45, marginTop: 3 }}>{n.body}</div>
                <div style={{ fontFamily: FX, fontSize: 11, color: OK.ink3, marginTop: 5 }}>{n.time}</div>
              </div>
              {n.unread && <span style={{ width: 8, height: 8, borderRadius: 8, background: OK.red, flexShrink: 0, marginTop: 6 }}/>}
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
  return (
    <Screen bg={OK.bg2} statusDark={true} noScroll>
      <div data-screen-label="Conversation" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header vert */}
        <div style={{ padding: '50px 14px 12px', display: 'flex', alignItems: 'center', gap: 10, background: OK.green, boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
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
          <button style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="phone" size={17} color="#fff" strokeWidth={2}/>
          </button>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ textAlign: 'center', margin: '4px 0 8px' }}>
            <span style={{ fontFamily: FX, fontSize: 10.5, color: OK.ink3, background: '#fff', padding: '4px 12px', borderRadius: 999, border: `1px solid ${OK.line}` }}>Aujourd’hui</span>
          </div>
          {msgs.map((m, i) => (
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
          <button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: OK.bg2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="plus" size={20} color={OK.ink2} strokeWidth={2.2}/>
          </button>
          <div style={{ flex: 1, height: 44, background: OK.bg2, borderRadius: 999, border: `1px solid ${OK.line}`, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <span style={{ fontFamily: FX, fontSize: 13.5, color: OK.ink3 }}>Votre message…</span>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 999, border: 'none', background: OK.green, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(11,124,57,0.3)' }}>
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
          <button onClick={() => reset('splash')} style={{ width: '100%', marginTop: 14, height: 50, borderRadius: 13, border: `1.5px solid ${OK.line}`,
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

Object.assign(window, { PublierScreen, NotificationsScreen, MessagesScreen, ChatScreen, FavorisScreen, CompteScreen });


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
    case 'market':        return <MarketScreen params={params}/>;
    case 'search':        return <SearchScreen/>;
    case 'shops':         return <ShopsScreen/>;
    case 'shop':          return <ShopScreen params={params}/>;
    case 'listing':       return <ListingScreen params={params}/>;
    case 'annuaire':      return <AnnuaireScreen/>;
    case 'annuaire-search': return <AnnuaireSearchScreen/>;
    case 'annuaire-map':  return <AnnuaireMapScreen/>;
    case 'entity':        return (typeof ANNU_ENTITIES !== 'undefined' && ANNU_ENTITIES[params?.id] && ANNU_ENTITIES[params?.id].type === 'complexe') ? <BaieHub params={params}/> : <EntityScreen params={params}/>;
    case 'tenant':        return <TenantScreen params={params}/>;
    case 'tourisme':      return <TourismeScreen/>;
    case 'tourisme-spots':return <TourismeSpotsScreen params={params}/>;
    case 'smartcity':     return <SmartCityScreen/>;
    case 'publier':       return <PublierScreen/>;
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
  return (
    <NavProvider initial="splash">
      <Router/>
    </NavProvider>
  );
}

window.OkabaApp = App;


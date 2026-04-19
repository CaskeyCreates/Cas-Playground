// Refined editorial dark theme — inspired by Open iOS.
// Pure black, generous whitespace, typography as the hero,
// accent reserved for earned moments.

export const colors = {
  // pure-black canvas (Open uses #000, not off-black)
  bg: '#000000',
  bgLift: 'rgba(255,255,255,0.03)',      // very subtle card lift
  bgLiftHi: 'rgba(255,255,255,0.05)',

  // hairlines — thin 1px lines between sections
  hairline: 'rgba(255,255,255,0.08)',
  hairlineDim: 'rgba(255,255,255,0.05)',
  border: 'rgba(255,255,255,0.08)',

  // text scale — pure white → dim → ghost, nothing in between
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.75)',
  textDim: 'rgba(255,255,255,0.55)',
  textFaint: 'rgba(255,255,255,0.40)',
  textGhost: 'rgba(255,255,255,0.25)',
  textPlaceholder: 'rgba(255,255,255,0.15)',

  // lime accent — reserved for earned moments only
  accent: '#e8ff47',
  accentDim: '#9abf00',
  accentBg: 'rgba(232,255,71,0.06)',
  accentBorder: 'rgba(232,255,71,0.15)',

  // functional colors
  gold: '#ffd93d',
  red: '#ef4444',
  redMuted: 'rgba(239,68,68,0.75)',
  orange: '#fb923c',
  amber: '#f59e0b',
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  gray: '#6b7280',

  // warm editorial accents (Open's bronze/rust vibe)
  warmBronze: '#b7814f',
  warmRust: '#7a3f22',

  // macro colors (for data viz — used sparingly)
  macroProtein: '#ff6b6b',
  macroCarbs: '#ffd93d',
  macroFat: '#6bcb77',

  // set tags
  tagWarmup: '#3b82f6',
  tagWarmupBg: 'rgba(59,130,246,0.15)',
  tagDrop: '#a855f7',
  tagDropBg: 'rgba(168,85,247,0.15)',
  tagFailure: '#ef4444',
  tagFailureBg: 'rgba(239,68,68,0.15)',

  // Inverse palette — used on white "focal" cards.
  // Black-on-white sections for dramatic section alternation.
  invBg: '#ffffff',
  invText: '#000000',
  invTextMuted: 'rgba(0,0,0,0.65)',
  invTextDim: 'rgba(0,0,0,0.45)',
  invTextFaint: 'rgba(0,0,0,0.30)',
  invTextGhost: 'rgba(0,0,0,0.18)',
  invHairline: 'rgba(0,0,0,0.10)',

  // legacy aliases — kept for screens not yet rewritten.
  // Remove these once all tabs adopt the new editorial system.
  bgSurface: 'rgba(255,255,255,0.02)',
  bgSurfaceHi: 'rgba(255,255,255,0.04)',
  borderHi: 'rgba(255,255,255,0.06)',
  borderHover: 'rgba(255,255,255,0.08)',
  accentBgHi: 'rgba(232,255,71,0.08)',
  accentBorderHi: 'rgba(232,255,71,0.25)',
  textFade: 'rgba(255,255,255,0.15)',
} as const;

export const rankColors = {
  'E-RANK': '#9ca3af',
  'D-RANK': '#10b981',
  'C-RANK': '#3b82f6',
  'B-RANK': '#8b5cf6',
  'A-RANK': '#f59e0b',
  'S-RANK': '#e8ff47',
  MONARCH: '#ef4444',
} as const;

// Typography stack
// - Fraunces: serif display for editorial moments (daily quote, hero numbers)
// - Archivo: sans for everything else — tight-tracked big type + wide-tracked micro labels
// - IBMPlexMono: precision data (timers, weights, counters)
export const fonts = {
  serif: 'Fraunces_500Medium',
  serifBold: 'Fraunces_700Bold',

  sans: 'Archivo_500Medium',
  sansBold: 'Archivo_700Bold',
  sansBlack: 'Archivo_900Black',

  mono: 'IBMPlexMono_600SemiBold',
  monoBold: 'IBMPlexMono_700Bold',

  // legacy aliases kept for existing screens until rewrite
  display: 'Archivo_700Bold',
  displayBlack: 'Archivo_900Black',
  body: 'Archivo_500Medium',
  bodyBold: 'Archivo_700Bold',
} as const;

// Type scale — pairs with line-heights and tracking
export const type = {
  // hero display — huge, tight
  hero: { fontSize: 44, lineHeight: 48, letterSpacing: -1.5 },
  display: { fontSize: 32, lineHeight: 36, letterSpacing: -1 },
  title: { fontSize: 24, lineHeight: 28, letterSpacing: -0.4 },
  heading: { fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },

  // body
  body: { fontSize: 15, lineHeight: 22, letterSpacing: 0 },
  bodySm: { fontSize: 13, lineHeight: 18, letterSpacing: 0 },

  // micro — tiny uppercase labels with wide tracking
  eyebrow: { fontSize: 11, lineHeight: 14, letterSpacing: 2 },
  micro: { fontSize: 10, lineHeight: 13, letterSpacing: 1.5 },
  nano: { fontSize: 9, lineHeight: 12, letterSpacing: 1 },
} as const;

export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
  section: 56,
} as const;

export const shadow = {
  glow: (color: string, opacity = 0.3) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity,
    shadowRadius: 30,
    elevation: 8,
  }),
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;

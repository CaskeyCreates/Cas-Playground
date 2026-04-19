export const colors = {
  bg: '#060609',
  bgSurface: 'rgba(255,255,255,0.02)',
  bgSurfaceHi: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.04)',
  borderHi: 'rgba(255,255,255,0.06)',
  borderHover: 'rgba(255,255,255,0.08)',

  text: '#e4e4e8',
  textMuted: '#aaa',
  textDim: '#888',
  textFaint: '#666',
  textGhost: '#555',
  textPlaceholder: '#444',
  textFade: '#333',

  accent: '#e8ff47',
  accentDim: '#9abf00',
  accentBg: 'rgba(232,255,71,0.04)',
  accentBgHi: 'rgba(232,255,71,0.08)',
  accentBorder: 'rgba(232,255,71,0.1)',
  accentBorderHi: 'rgba(232,255,71,0.25)',

  gold: '#ffd93d',
  red: '#ef4444',
  redMuted: '#ef9999',
  orange: '#fb923c',
  amber: '#f59e0b',
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  gray: '#6b7280',

  macroProtein: '#ff6b6b',
  macroCarbs: '#ffd93d',
  macroFat: '#6bcb77',

  tagWarmup: '#3b82f6',
  tagWarmupBg: 'rgba(59,130,246,0.15)',
  tagDrop: '#a855f7',
  tagDropBg: 'rgba(168,85,247,0.15)',
  tagFailure: '#ef4444',
  tagFailureBg: 'rgba(239,68,68,0.15)',
} as const;

export const rankColors = {
  'E-RANK': '#6b7280',
  'D-RANK': '#10b981',
  'C-RANK': '#3b82f6',
  'B-RANK': '#8b5cf6',
  'A-RANK': '#f59e0b',
  'S-RANK': '#e8ff47',
  MONARCH: '#ef4444',
} as const;

export const fonts = {
  display: 'Archivo_700Bold',
  displayBlack: 'Archivo_900Black',
  body: 'Archivo_500Medium',
  bodyBold: 'Archivo_700Bold',
  mono: 'IBMPlexMono_600SemiBold',
  monoBold: 'IBMPlexMono_700Bold',
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 16,
  xxl: 20,
  pill: 999,
} as const;

export const space = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
  xxl: 16,
  xxxl: 20,
} as const;

export const shadow = {
  glow: (color: string, opacity = 0.3) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity,
    shadowRadius: 30,
    elevation: 8,
  }),
} as const;

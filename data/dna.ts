export type DnaSection = {
  id: string;
  t: string;
  i: string;
  c: string;
  body: string;
};

export const DNA_SECTIONS: DnaSection[] = [
  {
    id: 'infl',
    t: 'Inflammation',
    i: '🔥',
    c: '#e74c3c',
    body: 'CRP (GA), IL-1A, IL-1RN (CT), TNFA (AG) — heightened inflammatory response. Critical for your training recovery.\n\nPriority: Omega 3, Curcumin+pepper, Probiotics. Daily. No exceptions.',
  },
  {
    id: 'food',
    t: 'Food Sensitivities',
    i: '🍽️',
    c: '#f39c12',
    body: 'Lactose Intolerant — oat/almond milk only.\nGluten Intolerant — rice, GF oats, sweet potato, quinoa.\nPUFA Impaired — omega 3 from fish, not plants.',
  },
  {
    id: 'vit',
    t: 'Vitamin Metabolism',
    i: '💊',
    c: '#27ae60',
    body: 'Vit A — sweet potato, carrots, multi.\nB12 — Methylcobalamin only.\nD3 — 1000IU + sun. Critical for testosterone, recovery, mood.',
  },
  {
    id: 'dopa',
    t: 'Dopamine System',
    i: '🧠',
    c: '#8e44ad',
    body: 'COMT GG — fast breakdown, lower baseline. Tyrosine foods, structured rewards, novelty in training every 4-6 weeks.\nDRD1 TT, DRD2 TC — reward seeking. Gamify everything.',
  },
  {
    id: 'sero',
    t: 'Serotonin & Mood',
    i: '😌',
    c: '#2980b9',
    body: 'HTR1A GG — reduced signalling. 7-9hrs sleep, morning sun, tryptophan dinners, daily probiotic.',
  },
  {
    id: 'neuro',
    t: 'Neuroprotection',
    i: '🧬',
    c: '#16a085',
    body: 'APOE E3/E3 neutral. BDNF CC normal. Exercise = best BDNF boost. FKBP5 CC = good stress response.',
  },
];

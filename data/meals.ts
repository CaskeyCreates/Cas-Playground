export type Meal = {
  meal: 'Breakfast' | 'Snack' | 'Lunch' | 'Pre-WO' | 'Dinner';
  time: string;
  n: string;
  cal: number;
  p: number;
  c: number;
  f: number;
  ing: string[];
  steps: string[];
  tags: string[];
};

export const MEALS: Meal[] = [
  {
    meal: 'Breakfast',
    time: '7:00',
    n: 'Power Eggs & Avocado',
    cal: 520,
    p: 38,
    c: 28,
    f: 28,
    ing: [
      '3 whole eggs',
      '100g turkey mince',
      '½ avocado',
      '1 slice GF toast',
      '½ tsp turmeric',
      '1 cup spinach',
    ],
    steps: [
      'Cook turkey 5min in coconut oil.',
      'Add eggs, scramble.',
      'Wilt spinach + turmeric 1min.',
      'Serve with avocado on toast.',
    ],
    tags: ['dopamine', 'anti-inflammatory'],
  },
  {
    meal: 'Snack',
    time: '10:00',
    n: 'Berry Protein Smoothie',
    cal: 320,
    p: 32,
    c: 35,
    f: 6,
    ing: [
      '1 scoop whey',
      '1 cup berries',
      '1 banana',
      '200ml oat milk',
      '1 tbsp chia',
    ],
    steps: ['Blend everything until smooth.', 'Drink immediately.'],
    tags: ['protein', 'antioxidant'],
  },
  {
    meal: 'Lunch',
    time: '13:00',
    n: 'Salmon Power Bowl',
    cal: 580,
    p: 42,
    c: 55,
    f: 18,
    ing: [
      '180g salmon',
      '¾ cup basmati rice',
      '1 cup broccoli',
      '½ sweet potato',
      '1 tbsp olive oil',
      'lemon',
    ],
    steps: [
      'Cook rice. Roast sweet potato 200°C 20min.',
      'Pan-sear salmon 4min skin-down, 3min flip.',
      'Steam broccoli.',
      'Bowl up + drizzle.',
    ],
    tags: ['omega-3', 'anti-inflammatory'],
  },
  {
    meal: 'Pre-WO',
    time: '16:30',
    n: 'Rice Cakes + Banana',
    cal: 220,
    p: 8,
    c: 42,
    f: 4,
    ing: [
      '2 GF rice cakes',
      '1 tbsp almond butter',
      '1 banana',
      'honey drizzle',
    ],
    steps: ['Spread almond butter.', 'Top with banana + honey.'],
    tags: ['pre-workout'],
  },
  {
    meal: 'Dinner',
    time: '19:30',
    n: 'Lean Chicken Stir-Fry',
    cal: 560,
    p: 48,
    c: 50,
    f: 14,
    ing: [
      '220g chicken breast',
      '100g rice noodles',
      '2 cups mixed veg',
      '1 tbsp ginger',
      '1 tsp turmeric',
      '2 tbsp coconut aminos',
    ],
    steps: [
      'Cook noodles.',
      'Stir-fry chicken 6min.',
      'Add aromatics 30sec.',
      'Add veg 3min.',
      'Combine + sauce.',
    ],
    tags: ['high-protein'],
  },
];

export const GROCERY_BASE: Record<string, string[]> = {
  '🥩 Protein': [
    'Chicken breast — 1.2kg',
    'Salmon fillets — 600g',
    'Turkey mince — 400g',
    'Eggs — 24',
    'Whey protein — 1 tub',
    'Lean beef — 400g',
  ],
  '🥬 Vegetables': [
    'Spinach — 300g',
    'Broccoli — 400g',
    'Bell peppers — 4',
    'Mushrooms — 200g',
    'Sweet potato — 5',
    'Onion — 3',
    'Garlic',
    'Mixed greens',
  ],
  '🍚 Smart Carbs': [
    'Basmati rice — 1kg',
    'GF oats — 500g',
    'Rice noodles — 200g',
    'GF rice cakes',
    'Bananas — 8',
  ],
  '🫐 Fruits': [
    'Mixed berries — 750g',
    'Lemons — 6',
    'Avocado — 5',
    'Apples — 6',
  ],
  '🥜 Nuts & Seeds': [
    'Almonds — 150g',
    'Walnuts — 100g',
    'Pumpkin seeds — 100g',
    'Almond butter — 1 jar',
    'Chia seeds',
  ],
  '🫙 Pantry': [
    'Olive oil',
    'Coconut oil',
    'Coconut aminos',
    'Honey',
    'GF tamari',
    'Coconut cream',
  ],
  '🌿 Spices': [
    'Turmeric',
    'Fresh ginger',
    'Cumin',
    'Cinnamon',
    'Black pepper',
  ],
  '🥛 Dairy-Free': ['Oat milk — 3L', 'Almond milk'],
};

export const GROCERY_MULTIPLIERS = {
  weekly: 1,
  biweekly: 2,
  monthly: 4,
} as const;

export type GroceryCycle = keyof typeof GROCERY_MULTIPLIERS;

export type Supplement = {
  n: string;
  t: string;
  p: 'critical' | 'training' | 'secondary';
  icon: string;
  why: string;
};

export const SUPPS: Supplement[] = [
  { n: 'Omega 3', t: 'Breakfast & Dinner', p: 'critical', icon: '🐟', why: 'Inflammation (CRP, TNFA)' },
  { n: 'Probiotic', t: 'Morning empty stomach', p: 'critical', icon: '🦠', why: 'Lactose + gluten intolerance' },
  { n: 'Curcumin + Pepper', t: 'With dinner', p: 'critical', icon: '🟡', why: 'TNFA AG anti-inflammatory' },
  { n: 'Vit D3 1000IU', t: 'Morning with fat', p: 'critical', icon: '☀️', why: 'D3 metabolism support' },
  { n: 'B12 Methylcobalamin', t: 'Morning', p: 'critical', icon: '💊', why: 'B12 metabolism' },
  { n: 'Creatine 5g', t: 'Any time', p: 'training', icon: '⚡', why: 'Hypertrophy + strength' },
  { n: 'Zinc', t: 'Before bed', p: 'secondary', icon: '🌙', why: 'Inflammation support' },
];

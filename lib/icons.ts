// Map quest IDs and supplement names to Lucide icons.
// Keeps data layer free of UI concerns.

import {
  Ban,
  Beef,
  Bone,
  Dumbbell,
  Droplet,
  Fish,
  Flame,
  Flower2,
  Footprints,
  Leaf,
  Moon,
  Pill,
  Sprout,
  Sun,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';

export const questIcons: Record<string, LucideIcon> = {
  steps: Footprints,
  protein: Beef,
  water: Droplet,
  sleep: Moon,
  train: Dumbbell,
  supps: Pill,
  noprocessed: Ban,
  mobility: Flower2,
};

// Short monograms for supplement chips — editorial over emoji.
export const supplementMonograms: Record<string, string> = {
  'Omega 3': 'Ω3',
  Probiotic: 'PRO',
  'Curcumin + Pepper': 'CUR',
  'Vit D3 1000IU': 'D3',
  'B12 Methylcobalamin': 'B12',
  'Creatine 5g': 'CRE',
  Zinc: 'ZN',
};

export const supplementIcons: Record<string, LucideIcon> = {
  'Omega 3': Fish,
  Probiotic: Sprout,
  'Curcumin + Pepper': Leaf,
  'Vit D3 1000IU': Sun,
  'B12 Methylcobalamin': Pill,
  'Creatine 5g': Zap,
  Zinc: Bone,
};

// Greeting icon based on hour-of-day. Matches the "good morning ☀️"
// pattern the user asked to keep.
import { Sunrise, Sunset } from 'lucide-react-native';
export const getGreetingIcon = (hour: number): LucideIcon => {
  if (hour < 5) return Moon;
  if (hour < 8) return Sunrise;
  if (hour < 17) return Sun;
  if (hour < 21) return Sunset;
  return Moon;
};

// Kept for future program/event imagery — not currently used.
export { Flame };

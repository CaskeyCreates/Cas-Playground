export type DailyQuest = {
  id: string;
  n: string;
  xp: number;
  icon: string;
  type: 'input' | 'check';
  unit?: string;
  target?: number;
  desc: string;
};

export const DAILY_QUESTS: DailyQuest[] = [
  { id: 'steps', n: 'Complete Daily Steps', xp: 50, icon: '👟', type: 'input', unit: 'steps', target: 10000, desc: 'Walking burns fat directly. Hit your step target.' },
  { id: 'protein', n: 'Hit Protein Target', xp: 75, icon: '🥩', type: 'input', unit: 'g', target: 160, desc: '160g protein protects muscle during fat loss.' },
  { id: 'water', n: 'Drink 3L Water', xp: 25, icon: '💧', type: 'input', unit: 'L', target: 3, desc: 'Hydration = performance. Track your litres.' },
  { id: 'sleep', n: '7+ Hours Sleep', xp: 50, icon: '😴', type: 'input', unit: 'hrs', target: 7, desc: 'HTR1A GG = reduced serotonin. Sleep is non-negotiable.' },
  { id: 'train', n: 'Complete Training', xp: 100, icon: '🏋️', type: 'check', desc: 'Auto-completes when you finish a session.' },
  { id: 'supps', n: 'Take All Supplements', xp: 30, icon: '💊', type: 'check', desc: 'Your DNA profile demands these daily.' },
  { id: 'noprocessed', n: 'No Processed Food', xp: 40, icon: '🚫', type: 'check', desc: 'Gluten + lactose intolerant. Eat clean.' },
  { id: 'mobility', n: '10min Mobility/Stretch', xp: 25, icon: '🧘', type: 'check', desc: 'TNFA AG = higher inflammation. Mobility aids recovery.' },
];

export type RankName = 'E-RANK' | 'D-RANK' | 'C-RANK' | 'B-RANK' | 'A-RANK' | 'S-RANK' | 'MONARCH';

export type RankDef = {
  rank: RankName;
  lvl: string;
  xpNeeded: string;
  color: string;
  prereqs: string[];
  unlocks: string[];
};

export const RANK_PREREQS: RankDef[] = [
  {
    rank: 'E-RANK',
    lvl: '1-4',
    xpNeeded: '0-1,500',
    color: '#6b7280',
    prereqs: ['Start your journey', 'Log first workout', 'Complete first check-in'],
    unlocks: ['Basic quest system', 'Training log', 'Meal tracking'],
  },
  {
    rank: 'D-RANK',
    lvl: '5-9',
    xpNeeded: '1,600-8,000',
    color: '#10b981',
    prereqs: ['7-day streak', 'Bench press 60kg+', 'Squat 80kg+', 'Log body stats'],
    unlocks: ['Weekly progress reports', 'Exercise swap library', 'Grocery cycle toggle'],
  },
  {
    rank: 'C-RANK',
    lvl: '10-14',
    xpNeeded: '8,100-19,500',
    color: '#3b82f6',
    prereqs: ['21-day streak', 'Bench 80kg+', 'Squat 100kg+', 'Body fat below 18%', 'Complete 30 sessions'],
    unlocks: ['AI readiness scoring', 'Event recommendations', 'PR animation upgrades'],
  },
  {
    rank: 'B-RANK',
    lvl: '15-19',
    xpNeeded: '19,600-35,900',
    color: '#8b5cf6',
    prereqs: ['45-day streak', 'Bench 100kg+', 'Squat 120kg+', 'Body fat below 15%', 'Run 5km under 30min'],
    unlocks: ['Advanced periodization', 'Race simulation mode', 'Custom event creation'],
  },
  {
    rank: 'A-RANK',
    lvl: '20-29',
    xpNeeded: '36,000-84,000',
    color: '#f59e0b',
    prereqs: ['90-day streak', 'Bench 1.2x BW', 'Squat 1.5x BW', 'Body fat below 13%', 'Complete first endurance event'],
    unlocks: ['Elite programming', 'Nutrition AI upgrades', 'Title display'],
  },
  {
    rank: 'S-RANK',
    lvl: '30-49',
    xpNeeded: '84,100-240,000',
    color: '#e8ff47',
    prereqs: ['180-day streak', 'Body fat below 11%', '2+ events completed', 'All supplement protocol consistent 90 days'],
    unlocks: ['Monarch pathway revealed', 'Legacy stats unlocked', 'Full system mastery'],
  },
  {
    rank: 'MONARCH',
    lvl: '50+',
    xpNeeded: '240,100+',
    color: '#ef4444',
    prereqs: ['365-day streak', 'Target physique achieved', '3+ events completed', 'Comrades or equivalent S-rank boss defeated'],
    unlocks: ["You've ascended. The system bows to you."],
  },
];

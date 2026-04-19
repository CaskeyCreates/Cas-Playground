import type { RankName } from '../data/quests';

type RankTier = { min: number; max: number; name: RankName; color: string };

const RANKS: RankTier[] = [
  { min: 1, max: 4, name: 'E-RANK', color: '#6b7280' },
  { min: 5, max: 9, name: 'D-RANK', color: '#10b981' },
  { min: 10, max: 14, name: 'C-RANK', color: '#3b82f6' },
  { min: 15, max: 19, name: 'B-RANK', color: '#8b5cf6' },
  { min: 20, max: 29, name: 'A-RANK', color: '#f59e0b' },
  { min: 30, max: 49, name: 'S-RANK', color: '#e8ff47' },
  { min: 50, max: 9999, name: 'MONARCH', color: '#ef4444' },
];

export const getLevel = (xp: number): { level: number; xp: number } => ({
  level: Math.floor(Math.sqrt(xp / 100)) + 1,
  xp,
});

export const getRank = (level: number): RankTier =>
  RANKS.find((r) => level >= r.min && level <= r.max) ?? RANKS[0];

export const xpForLevel = (level: number): number => (level - 1) * (level - 1) * 100;

export const levelProgress = (totalXP: number): number => {
  const { level } = getLevel(totalXP);
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  if (next === cur) return 100;
  return Math.max(0, Math.min(100, ((totalXP - cur) / (next - cur)) * 100));
};

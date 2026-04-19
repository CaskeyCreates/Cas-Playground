import type { FitnessEvent } from '../data/events';
import { PROFILE } from '../data/profile';
import { daysBetween } from './dates';

type UserLogs = Record<string, { sets: { w: string | number }[] }[]>;

export type UserData = {
  sessions?: { totalSets?: number }[];
  logs?: UserLogs;
  body?: { weight?: number; bf?: number };
};

export type Readiness = {
  total: number;
  timeScore: number;
  consistencyScore: number;
  fitnessScore: number;
  strengthScore: number;
  weeksAvailable: number;
  verdict: string;
  color: string;
  recommendation: string;
};

export const calculateReadiness = (event: FitnessEvent, userData: UserData): Readiness => {
  const today = new Date();
  const eventDate = new Date(event.date);
  const weeksAvailable = Math.floor(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  const timeRatio = weeksAvailable / event.prepWeeks;
  const timeScore = Math.min(100, Math.max(0, timeRatio * 100));

  const totalWorkouts = (userData.sessions ?? []).length;
  const consistencyScore = Math.min(100, totalWorkouts * 5);

  const currentWeight = userData.body?.weight ?? PROFILE.startWeight;
  const fitnessProxy = userData.body?.bf
    ? Math.max(0, 100 - userData.body.bf * 3)
    : 50;

  const logs = userData.logs ?? {};
  const allPRs = Object.values(logs).flatMap((l) =>
    l.flatMap((s) => s.sets.map((set) => Number(set.w) || 0))
  );
  const maxLift = allPRs.length ? Math.max(...allPRs) : 0;
  const strengthScore =
    currentWeight > 0 ? Math.min(100, (maxLift / currentWeight) * 50) : 0;

  const total = Math.round(
    timeScore * 0.4 + consistencyScore * 0.3 + fitnessProxy * 0.15 + strengthScore * 0.15
  );

  let verdict: string;
  let color: string;
  let recommendation: string;

  if (weeksAvailable < event.minPrepWeeks) {
    verdict = 'NOT ENOUGH TIME';
    color = '#ef4444';
    recommendation = `You need at least ${event.minPrepWeeks} weeks. You have ${weeksAvailable}. Skip this one or risk injury.`;
  } else if (total >= 75) {
    verdict = 'READY TO BATTLE';
    color = '#e8ff47';
    recommendation = 'Your stats line up well. Lock in the prep program and commit.';
  } else if (total >= 50) {
    verdict = 'POSSIBLE — GRIND';
    color = '#f59e0b';
    recommendation = "It's doable but you need to grind. Stay consistent.";
  } else if (total >= 25) {
    verdict = 'RISKY ATTEMPT';
    color = '#fb923c';
    recommendation = "You're underprepared. Consider an easier event first or commit hard.";
  } else {
    verdict = 'LEVEL UP FIRST';
    color = '#6b7280';
    recommendation = 'Build base fitness before challenging this boss. Try an easier event first.';
  }

  return {
    total,
    timeScore: Math.round(timeScore),
    consistencyScore: Math.round(consistencyScore),
    fitnessScore: Math.round(fitnessProxy),
    strengthScore: Math.round(strengthScore),
    weeksAvailable,
    verdict,
    color,
    recommendation,
  };
};

export const getConflicts = (
  targetEvent: FitnessEvent,
  allEvents: FitnessEvent[]
): FitnessEvent[] => {
  const targetDate = new Date(targetEvent.date);
  return allEvents.filter((e) => {
    if (e.id === targetEvent.id) return false;
    const eDate = new Date(e.date);
    const daysDiff = Math.abs((targetDate.getTime() - eDate.getTime()) / (1000 * 60 * 60 * 24));
    return (
      daysDiff < 56 &&
      ((targetEvent.type.includes('Marathon') && e.type.includes('Marathon')) ||
        (targetEvent.tags.includes('ultra') && e.tags.includes('ultra')))
    );
  });
};

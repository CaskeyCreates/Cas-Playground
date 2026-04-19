import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEY } from '../data/profile';

export type SetLog = {
  w: string;
  r: string;
  tag?: 'W' | 'D' | 'F' | null;
  rpe?: number | null;
};

export type ExerciseLogEntry = {
  d: string;
  sets: SetLog[];
  dur?: number;
};

export type SessionRecord = {
  timestamp: number;
  day: string;
  focus: string;
  exercises: { id: string; sets: SetLog[] }[];
  totalSets: number;
  duration: number;
};

export type BodyStats = Partial<{
  weight: number;
  bf: number;
  chest: number;
  waist: number;
  arms: number;
  legs: number;
  shoulders: number;
  neck: number;
}>;

export type MealEntry = { name: string; cal: number; p: number; c: number; f: number };

export type QuestState = { val: string; done: boolean };

type DayMap<T> = Record<string, T>;

export type AppState = {
  // user data
  body: BodyStats;
  logs: Record<string, ExerciseLogEntry[]>;
  sessions: SessionRecord[];
  meals: DayMap<MealEntry[]>;
  supps: DayMap<Record<number, boolean>>;
  ci: DayMap<{ ts: number }>;
  xp: DayMap<number>;
  quests: DayMap<Record<string, QuestState>>;
  activeEvent: string | null;
  grocChk: Record<string, boolean>;
  grocCycle: 'weekly' | 'biweekly' | 'monthly';

  // actions
  setBody: (k: keyof BodyStats, v: number) => void;
  toggleSupp: (dateKey: string, idx: number) => void;
  logCheckIn: (dateKey: string) => void;
  setActiveEvent: (id: string | null) => void;
  logMeal: (dateKey: string, meal: MealEntry) => void;
  removeMeal: (dateKey: string, idx: number) => void;
  setQuest: (dateKey: string, q: string, state: QuestState, xpDelta: number) => void;
  setGrocChk: (key: string, val: boolean) => void;
  setGrocCycle: (cycle: AppState['grocCycle']) => void;
  addSession: (s: SessionRecord) => void;
  addExerciseLog: (exId: string, entry: ExerciseLogEntry) => void;
  addXP: (dateKey: string, amount: number) => void;
  reset: () => void;
};

const initial: Pick<
  AppState,
  'body' | 'logs' | 'sessions' | 'meals' | 'supps' | 'ci' | 'xp' | 'quests' | 'activeEvent' | 'grocChk' | 'grocCycle'
> = {
  body: {},
  logs: {},
  sessions: [],
  meals: {},
  supps: {},
  ci: {},
  xp: {},
  quests: {},
  activeEvent: null,
  grocChk: {},
  grocCycle: 'weekly',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initial,
      setBody: (k, v) => set((s) => ({ body: { ...s.body, [k]: v } })),
      toggleSupp: (dateKey, idx) =>
        set((s) => ({
          supps: {
            ...s.supps,
            [dateKey]: { ...s.supps[dateKey], [idx]: !s.supps[dateKey]?.[idx] },
          },
        })),
      logCheckIn: (dateKey) =>
        set((s) => {
          if (s.ci[dateKey]) return {};
          return {
            ci: { ...s.ci, [dateKey]: { ts: Date.now() } },
            xp: { ...s.xp, [dateKey]: (s.xp[dateKey] ?? 0) + 25 },
          };
        }),
      setActiveEvent: (id) => set({ activeEvent: id }),
      logMeal: (dateKey, meal) =>
        set((s) => ({
          meals: { ...s.meals, [dateKey]: [...(s.meals[dateKey] ?? []), meal] },
        })),
      removeMeal: (dateKey, idx) =>
        set((s) => ({
          meals: {
            ...s.meals,
            [dateKey]: (s.meals[dateKey] ?? []).filter((_, i) => i !== idx),
          },
        })),
      setQuest: (dateKey, qId, state, xpDelta) =>
        set((s) => ({
          quests: {
            ...s.quests,
            [dateKey]: { ...(s.quests[dateKey] ?? {}), [qId]: state },
          },
          xp: { ...s.xp, [dateKey]: Math.max(0, (s.xp[dateKey] ?? 0) + xpDelta) },
        })),
      setGrocChk: (key, val) => set((s) => ({ grocChk: { ...s.grocChk, [key]: val } })),
      setGrocCycle: (cycle) => set({ grocCycle: cycle }),
      addSession: (sessionRec) =>
        set((s) => {
          const dateKey = new Date(sessionRec.timestamp).toISOString().split('T')[0];
          return {
            sessions: [...s.sessions, sessionRec],
            xp: { ...s.xp, [dateKey]: (s.xp[dateKey] ?? 0) + 100 },
          };
        }),
      addExerciseLog: (exId, entry) =>
        set((s) => ({
          logs: { ...s.logs, [exId]: [...(s.logs[exId] ?? []), entry] },
        })),
      addXP: (dateKey, amount) =>
        set((s) => ({ xp: { ...s.xp, [dateKey]: (s.xp[dateKey] ?? 0) + amount } })),
      reset: () => set(initial),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const selectTotalXP = (s: AppState): number =>
  Object.values(s.xp).reduce((a, v) => a + v, 0);

export type DayType = 'lift' | 'cardio' | 'rest';

export type ProgramExercise = {
  id: string;
  s: number;
  r: string;
  rest: number;
  rpe: number;
};

export type ProgramDay = {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  full: string;
  focus: string;
  icon: string;
  type: DayType;
  exIds: ProgramExercise[];
};

export const PROGRAM: ProgramDay[] = [
  {
    day: 'Mon',
    full: 'Monday',
    focus: 'Upper Power',
    icon: '💪',
    type: 'lift',
    exIds: [
      { id: 'bp', s: 4, r: '6-8', rest: 120, rpe: 8 },
      { id: 'row', s: 4, r: '6-8', rest: 120, rpe: 8 },
      { id: 'ohp', s: 3, r: '8-10', rest: 90, rpe: 8 },
      { id: 'pu', s: 4, r: '6-8', rest: 90, rpe: 8 },
      { id: 'dip', s: 3, r: '8-12', rest: 75, rpe: 8 },
      { id: 'fp', s: 3, r: '15-20', rest: 60, rpe: 7 },
    ],
  },
  {
    day: 'Tue',
    full: 'Tuesday',
    focus: 'Conditioning',
    icon: '🏃',
    type: 'cardio',
    exIds: [
      { id: 'run1', s: 1, r: '1km', rest: 60, rpe: 7 },
      { id: 'ski', s: 1, r: '1000m', rest: 60, rpe: 7 },
      { id: 'run1', s: 1, r: '1km', rest: 60, rpe: 7 },
      { id: 'sled', s: 4, r: '20m', rest: 90, rpe: 8 },
      { id: 'burp', s: 4, r: '10', rest: 60, rpe: 8 },
    ],
  },
  {
    day: 'Wed',
    full: 'Wednesday',
    focus: 'Lower Power',
    icon: '🦵',
    type: 'lift',
    exIds: [
      { id: 'sq', s: 4, r: '5-7', rest: 150, rpe: 8 },
      { id: 'rdl', s: 4, r: '8-10', rest: 90, rpe: 8 },
      { id: 'lp', s: 3, r: '10-12', rest: 90, rpe: 8 },
      { id: 'lunge', s: 3, r: '12ea', rest: 75, rpe: 8 },
      { id: 'calf', s: 4, r: '12-15', rest: 60, rpe: 9 },
      { id: 'core', s: 3, r: '10-15', rest: 60, rpe: 8 },
    ],
  },
  {
    day: 'Thu',
    full: 'Thursday',
    focus: 'Push Hyper',
    icon: '🏋️',
    type: 'lift',
    exIds: [
      { id: 'bp', s: 4, r: '8-10', rest: 90, rpe: 8 },
      { id: 'ohp', s: 3, r: '10-12', rest: 75, rpe: 7 },
      { id: 'dip', s: 4, r: '10-12', rest: 60, rpe: 8 },
      { id: 'fp', s: 4, r: '15-20', rest: 60, rpe: 7 },
    ],
  },
  {
    day: 'Fri',
    full: 'Friday',
    focus: 'Pull Hyper',
    icon: '🧲',
    type: 'lift',
    exIds: [
      { id: 'pu', s: 4, r: '6-8', rest: 90, rpe: 8 },
      { id: 'row', s: 4, r: '10-12', rest: 75, rpe: 8 },
      { id: 'bc', s: 4, r: '10-12', rest: 60, rpe: 8 },
      { id: 'fp', s: 3, r: '15-20', rest: 60, rpe: 7 },
    ],
  },
  {
    day: 'Sat',
    full: 'Saturday',
    focus: 'Long Session',
    icon: '🔥',
    type: 'cardio',
    exIds: [
      { id: 'run1', s: 5, r: '1km', rest: 60, rpe: 7 },
      { id: 'sled', s: 4, r: '20m', rest: 90, rpe: 8 },
      { id: 'burp', s: 4, r: '10', rest: 60, rpe: 8 },
    ],
  },
  {
    day: 'Sun',
    full: 'Sunday',
    focus: 'Active Recovery',
    icon: '🚶',
    type: 'rest',
    exIds: [],
  },
];

const DOWS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const getTodayProgram = (date = new Date()): ProgramDay => {
  const dow = DOWS[date.getDay()];
  return PROGRAM.find((p) => p.day === dow) ?? PROGRAM[6];
};

export const getProgramByDay = (day: ProgramDay['day']): ProgramDay =>
  PROGRAM.find((p) => p.day === day) ?? PROGRAM[0];

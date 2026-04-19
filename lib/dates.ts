export const todayKey = (d = new Date()): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const daysBetween = (d1: Date | string, d2: Date | string): number => {
  const a = typeof d1 === 'string' ? new Date(d1) : d1;
  const b = typeof d2 === 'string' ? new Date(d2) : d2;
  return Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
};

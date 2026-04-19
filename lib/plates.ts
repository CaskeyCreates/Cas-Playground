const PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];
const BAR = 20;

export type PlateCalc = { bar: number; perSide: number[] };

export const calcPlates = (total: number): PlateCalc => {
  if (total <= BAR) return { bar: BAR, perSide: [] };
  let rem = (total - BAR) / 2;
  const perSide: number[] = [];
  for (const p of PLATES) {
    while (rem >= p) {
      perSide.push(p);
      rem -= p;
    }
  }
  return { bar: BAR, perSide };
};

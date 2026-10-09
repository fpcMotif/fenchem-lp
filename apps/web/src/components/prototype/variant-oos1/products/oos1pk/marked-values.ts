export type Range = readonly [number, number];

export const toTerms = (query: string) => query.trim().toLowerCase().split(/\s+/).filter(Boolean);

export const findRanges = (text: string, terms: string[]): Range[] => {
  if (terms.length === 0) return [];
  const lower = text.toLowerCase();
  const found: [number, number][] = [];
  for (const term of terms) {
    let at = lower.indexOf(term);
    while (at !== -1) {
      found.push([at, at + term.length]);
      at = lower.indexOf(term, at + term.length);
    }
  }
  found.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [start, end] of found) {
    const last = merged.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
};

export function getPercentages<R extends string>(
  scores: Record<R, number>,
  keys: readonly R[],
): Record<R, number> {
  const sum = keys.reduce((acc, k) => acc + (scores[k] ?? 0), 0);
  if (sum === 0) {
    const even = Math.round(1000 / keys.length) / 10;
    return Object.fromEntries(keys.map((k) => [k, even])) as Record<R, number>;
  }
  return Object.fromEntries(
    keys.map((k) => [k, Math.round(((scores[k] ?? 0) / sum) * 1000) / 10]),
  ) as Record<R, number>;
}

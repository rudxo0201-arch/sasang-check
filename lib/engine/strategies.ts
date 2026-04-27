import { EngineQuestion, EngineResult, ScoringStrategy } from './types';

export function singleMaxSumStrategy<R extends string>(
  resultKeys: readonly R[],
): ScoringStrategy<R, unknown> {
  return {
    kind: 'single-max-sum',
    compute(answers, _profile, questions): EngineResult<R> {
      const scores = Object.fromEntries(resultKeys.map((k) => [k, 0])) as Record<R, number>;

      for (const q of questions) {
        const chosen = answers[q.id];
        if (chosen === undefined) continue;
        const option = q.options[chosen];
        if (!option) continue;
        for (const k of resultKeys) {
          scores[k] += option.weights[k] ?? 0;
        }
      }

      const primary = resultKeys.reduce((a, b) => (scores[a] >= scores[b] ? a : b));
      return { primary, scores };
    },
  };
}

export function topNStrategy<R extends string>(
  resultKeys: readonly R[],
  n: number,
): ScoringStrategy<R, unknown> {
  return {
    kind: 'top-n',
    compute(answers, _profile, questions): EngineResult<R> {
      const scores = Object.fromEntries(resultKeys.map((k) => [k, 0])) as Record<R, number>;

      for (const q of questions) {
        const chosen = answers[q.id];
        if (chosen === undefined) continue;
        const option = q.options[chosen];
        if (!option) continue;
        for (const k of resultKeys) {
          scores[k] += option.weights[k] ?? 0;
        }
      }

      const sorted = [...resultKeys].sort((a, b) => scores[b] - scores[a]);
      const primary = sorted[0];
      return { primary, scores, extra: { top: sorted.slice(0, n) } };
    },
  };
}

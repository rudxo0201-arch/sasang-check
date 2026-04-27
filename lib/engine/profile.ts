import { ProfilePredicate, EngineQuestion } from './types';

export interface UserProfile {
  gender: 'male' | 'female' | 'other';
  ageGroup: '20s' | '30s' | '40s' | '50s' | '60s' | '70s' | '80plus';
  married: boolean;
  hasChildren: boolean;
}

export function matchesProfile(p: ProfilePredicate, profile: UserProfile): boolean {
  if (p.gender !== undefined) {
    const allowed = Array.isArray(p.gender) ? p.gender : [p.gender];
    if (!allowed.includes(profile.gender)) return false;
  }
  if (p.ageGroup !== undefined) {
    const allowed = Array.isArray(p.ageGroup) ? p.ageGroup : [p.ageGroup];
    if (!allowed.includes(profile.ageGroup)) return false;
  }
  if (p.married !== undefined && profile.married !== p.married) return false;
  if (p.hasChildren !== undefined && profile.hasChildren !== p.hasChildren) return false;
  return true;
}

export function filterEngineQuestions<R extends string>(
  questions: EngineQuestion<R>[],
  profile: UserProfile,
): EngineQuestion<R>[] {
  return questions
    .filter((q) => !q.showIf || matchesProfile(q.showIf, profile))
    .map((q) => {
      if (!q.promptVariants) return q;
      const variant = q.promptVariants.find((v) => matchesProfile(v.when, profile));
      if (!variant) return q;
      return { ...q, prompt: variant.prompt, options: variant.options ?? q.options };
    });
}

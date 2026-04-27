export interface ProfilePredicate {
  gender?: string | string[];
  ageGroup?: string | string[];
  married?: boolean;
  hasChildren?: boolean;
}

export interface PromptVariant<R extends string> {
  when: ProfilePredicate;
  prompt: string;
  options?: { label: string; weights: Partial<Record<R, number>> }[];
}

export interface EngineQuestion<R extends string> {
  id: string;
  prompt: string;
  options: { label: string; weights: Partial<Record<R, number>> }[];
  axis?: string;
  showIf?: ProfilePredicate;
  promptVariants?: PromptVariant<R>[];
  meta?: Record<string, unknown>;
}

export interface EngineResult<R extends string> {
  primary: R;
  scores: Record<R, number>;
  extra?: Record<string, unknown>;
}

export interface ScoringStrategy<R extends string, P> {
  kind: 'single-max-sum' | 'axis-decomposed-max' | 'top-n';
  compute(
    answers: Record<string, number>,
    profile: P,
    questions: EngineQuestion<R>[],
  ): EngineResult<R>;
}

export interface BaseResultContent {
  key: string;
  name: string;
  hanja?: string;
  oneLiner: string;
  hex: string;
  lifeTask?: string;
  classicQuote?: string;
  foods?: { good: string[]; avoid: string[] };
  exercises?: string[];
  warnings?: string[];
}

export interface SourceNote {
  category: string;
  references?: { work: string; chapter?: string }[];
  disclaimer?: string;
}

export interface CheckDefinition<
  R extends string,
  C extends BaseResultContent,
  P = Record<string, unknown>,
> {
  id: string;
  slug: string;
  hubCard: {
    title: string;
    hanja?: string;
    subtitle: string;
    status: 'live' | 'soon';
    estimatedMinutes: number;
  };
  meta: { title: string; description: string };
  source: SourceNote;
  resultKeys: readonly R[];
  questions: EngineQuestion<R>[];
  filterQuestions: (questions: EngineQuestion<R>[], profile: P) => EngineQuestion<R>[];
  strategy: ScoringStrategy<R, P>;
  content: Record<R, C>;
  renderResult: 'sasang' | 'generic';
}

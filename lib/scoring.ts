import { ConstitutionKey } from './constitutions';
import { Question, UserProfile, filterQuestions } from './questions';

const KEY_ORDER: ConstitutionKey[] = ['taeyang', 'soyang', 'taeeum', 'soeum'];

function emptyScores(): Record<ConstitutionKey, number> {
  return { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 };
}

export function calculateResult(
  answers: Record<string, number>,
  profile: UserProfile
): { result: ConstitutionKey; scores: Record<ConstitutionKey, number> } {
  const activeQuestions = filterQuestions(profile);

  const scores: Record<ConstitutionKey, number> = {
    taeyang: 0,
    soyang: 0,
    taeeum: 0,
    soeum: 0,
  };

  for (const q of activeQuestions) {
    const chosen = answers[q.id];
    if (chosen === undefined) continue;
    const option = q.options[chosen];
    if (!option) continue;
    for (const key of Object.keys(option.weights) as ConstitutionKey[]) {
      scores[key] += option.weights[key];
    }
  }

  const result = (Object.keys(scores) as ConstitutionKey[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );

  return { result, scores };
}

export function getTopTwo(scores: Record<ConstitutionKey, number>): [ConstitutionKey, ConstitutionKey] {
  const sorted = (Object.keys(scores) as ConstitutionKey[]).sort((a, b) => scores[b] - scores[a]);
  return [sorted[0], sorted[1]];
}

// ── 性/情 분리 점수 및 다양성 유틸 ──────────────────────────────

export interface AxisScores {
  nature: Record<ConstitutionKey, number>;
  emotion: Record<ConstitutionKey, number>;
  total: Record<ConstitutionKey, number>;
  natureCount: number;
  emotionCount: number;
}

export type AxisWinner =
  | { type: ConstitutionKey; tied: false }
  | { type: ConstitutionKey; tied: true; tiedWith: ConstitutionKey };

export type StrengthTier = 'typical' | 'leaning' | 'mixed';

export function calculateAxisScores(
  answers: Record<string, number>,
  profile: UserProfile,
): AxisScores {
  const activeQuestions = filterQuestions(profile);
  const nature = emptyScores();
  const emotion = emptyScores();
  const total = emptyScores();
  let natureCount = 0;
  let emotionCount = 0;

  for (const q of activeQuestions) {
    const chosen = answers[q.id];
    if (chosen === undefined) continue;
    const option = q.options[chosen];
    if (!option) continue;
    const target = q.axis === 'nature' ? nature : emotion;
    if (q.axis === 'nature') { natureCount++; } else { emotionCount++; }
    for (const key of KEY_ORDER) {
      const w = option.weights[key] ?? 0;
      target[key] += w;
      total[key] += w;
    }
  }

  return { nature, emotion, total, natureCount, emotionCount };
}

export function getAxisWinner(
  scores: Record<ConstitutionKey, number>,
  axisCount: number,
): AxisWinner | null {
  if (axisCount === 0) return null;
  let best: ConstitutionKey = KEY_ORDER[0];
  for (const key of KEY_ORDER) {
    if (scores[key] > scores[best]) best = key;
  }
  const tiedWith = KEY_ORDER.find((k) => k !== best && scores[k] === scores[best]);
  if (tiedWith) return { type: best, tied: true, tiedWith };
  return { type: best, tied: false };
}

// axisCount가 양수인데 모든 점수가 0 → 사용자가 "평정" 옵션만 골랐다는 뜻
export function isAxisEquanimous(
  scores: Record<ConstitutionKey, number>,
  axisCount: number,
): boolean {
  if (axisCount === 0) return false;
  return KEY_ORDER.every((k) => scores[k] === 0);
}

export function getStrengthTier(scores: Record<ConstitutionKey, number>): {
  tier: StrengthTier;
  topShare: number;
  primary: ConstitutionKey;
  secondary: ConstitutionKey;
} {
  const sum = KEY_ORDER.reduce((acc, k) => acc + scores[k], 0);
  const sorted = [...KEY_ORDER].sort((a, b) => scores[b] - scores[a]);
  const primary = sorted[0];
  const secondary = sorted[1];
  const topShare = sum > 0 ? scores[primary] / sum : 0.25;
  const margin = sum > 0 ? (scores[primary] - scores[secondary]) / sum : 0;

  let tier: StrengthTier;
  if (topShare >= 0.42) {
    tier = 'typical';
  } else if (topShare >= 0.34 && margin >= 0.10) {
    tier = 'leaning';
  } else {
    tier = 'mixed';
  }

  return { tier, topShare, primary, secondary };
}

export function getPercentages(
  scores: Record<ConstitutionKey, number>,
): Record<ConstitutionKey, number> {
  const sum = KEY_ORDER.reduce((acc, k) => acc + scores[k], 0);
  if (sum === 0) return { taeyang: 25, soyang: 25, taeeum: 25, soeum: 25 };
  const result = emptyScores();
  for (const key of KEY_ORDER) {
    result[key] = Math.round((scores[key] / sum) * 1000) / 10;
  }
  return result;
}

// 性/情 결과 서술에서 ~다 종결어미를 관형형으로 변환한 매핑
const NATURE_PARTICIPLE: Record<ConstitutionKey, string> = {
  taeyang: '세상을 향해 멀리 흩어지는',
  soyang: '의기가 크게 펼쳐지는',
  taeeum: '기쁨이 넓게 펼쳐지는',
  soeum: '평온함이 깊고 확실한',
};

const EMOTION_PARTICIPLE: Record<ConstitutionKey, string> = {
  taeyang: '분노가 갑자기 폭발하는',
  soyang: '슬픔이 갑자기 폭발하는',
  taeeum: '탐닉이 갑자기 폭발하는',
  soeum: '기쁨이 갑자기 폭발하는',
};

export function axisNarrative(
  natureType: ConstitutionKey,
  emotionType: ConstitutionKey,
  natureName: string,
  emotionName: string,
  emotionLifeTask: string,
): string {
  if (natureType === emotionType) {
    return `평소(性)와 자극받았을 때(情)가 모두 ${natureName}입니다. 성정이 일치하는 타입으로, 평소엔 ${NATURE_PARTICIPLE[natureType]} 자연스러움이 있고 자극을 받으면 ${EMOTION_PARTICIPLE[natureType]} 패턴이 같은 결로 이어집니다. ${natureName}의 평생 과제 "${emotionLifeTask}"가 더욱 선명하게 다가옵니다.`;
  }
  return `평소엔 ${natureName}처럼 ${NATURE_PARTICIPLE[natureType]} 분이지만, 자극을 받으면 ${emotionName}처럼 ${EMOTION_PARTICIPLE[emotionType]} 모습이 드러나는 타입입니다. 평소의 강점은 ${natureName}의 결을 따르되, 흔들리는 순간엔 ${emotionName}의 약점("${emotionLifeTask}")을 함께 살펴보면 좋습니다.`;
}

export function axisEquanimousNarrative(
  natureType: ConstitutionKey,
  natureName: string,
): string {
  return `평소엔 ${natureName}처럼 ${NATURE_PARTICIPLE[natureType]} 분이지만, 자극을 받아도 크게 동요하지 않는 평정 상태를 유지하시는 타입입니다. 외부 자극이 내 중심을 쉽게 흔들지 못하는 — 이미 情이 잘 다스려진 상태입니다. ${natureName}의 결을 자연스럽게 따르되, 그 평정함이 "무관심"이 아닌 "중심을 지키는 힘"으로 이어지면 좋겠습니다.`;
}

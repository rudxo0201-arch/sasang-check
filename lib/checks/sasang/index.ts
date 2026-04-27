import { CheckDefinition } from '@/lib/engine/types';
import { UserProfile, filterEngineQuestions } from '@/lib/engine/profile';
import { ConstitutionKey, sasangQuestions, filterSasangQuestions } from './questions';
import { ConstitutionContent, constitutions } from './content';
import { sasangAxisStrategy } from './strategy';

export type { ConstitutionKey, ConstitutionContent };
export { constitutions };

const sasangCheck: CheckDefinition<ConstitutionKey, ConstitutionContent, UserProfile> = {
  id: 'sasang',
  slug: 'sasang',
  hubCard: {
    title: '사상체질',
    hanja: '四象體質',
    subtitle: '나는 어떤 결의 사람인가 — MBTI처럼, 정답이 아니라 경향입니다',
    status: 'live',
    estimatedMinutes: 5,
  },
  meta: {
    title: '사상체질 건강체크',
    description: '이제마의 사상체질론을 바탕으로, 태양·소양·태음·소음인 중 나와 가장 가까운 경향을 알아봅니다.',
  },
  source: {
    category: '체질변증',
    references: [
      { work: '동의수세보원(東醫壽世保元)', chapter: '성명론(性命論)' },
    ],
    disclaimer: 'MBTI처럼, 정답이 아니라 경향입니다. 진료를 대체하지 않아요.',
  },
  resultKeys: ['taeyang', 'soyang', 'taeeum', 'soeum'] as const,
  questions: sasangQuestions,
  filterQuestions: filterSasangQuestions,
  strategy: sasangAxisStrategy(),
  content: constitutions,
  renderResult: 'sasang',
};

export default sasangCheck;

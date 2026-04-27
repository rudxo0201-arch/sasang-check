import { CheckDefinition } from '@/lib/engine/types';
import { filterEngineQuestions } from '@/lib/engine/profile';
import { singleMaxSumStrategy } from '@/lib/engine/strategies';
import { HanyeolKey, HanyeolContent, hanyeolContent } from './content';
import { hanyeolQuestions } from './questions';

export type { HanyeolKey, HanyeolContent };

const hanyeolCheck: CheckDefinition<HanyeolKey, HanyeolContent> = {
  id: 'hanyeol',
  slug: 'hanyeol',
  hubCard: {
    title: '한열변증',
    hanja: '寒熱辨證',
    subtitle: '내 몸은 차가운가, 따뜻한가 — 한의학 한열 체질 경향을 알아봅니다',
    status: 'live',
    estimatedMinutes: 3,
  },
  meta: {
    title: '한열변증 건강체크',
    description: '한의학의 한열변증을 바탕으로, 내 몸이 한증(寒證)과 열증(熱證) 중 어느 경향인지 알아봅니다.',
  },
  source: {
    category: '한열변증',
    references: [
      { work: '황제내경 소문(黃帝內經 素問)', chapter: '음양응상대론(陰陽應象大論)' },
      { work: '동의보감(東醫寶鑑)', chapter: '잡병편 한(寒)·열(熱)' },
    ],
    disclaimer: 'MBTI처럼, 정답이 아니라 경향입니다. 진료를 대체하지 않아요.',
  },
  resultKeys: ['han', 'yeol'] as const,
  questions: hanyeolQuestions,
  filterQuestions: (questions) => questions,
  strategy: singleMaxSumStrategy<HanyeolKey>(['han', 'yeol']),
  content: hanyeolContent,
  renderResult: 'generic',
};

export default hanyeolCheck;

import { EngineQuestion } from '@/lib/engine/types';
import { HanyeolKey } from './content';

export const hanyeolQuestions: EngineQuestion<HanyeolKey>[] = [
  {
    id: 'hy1',
    prompt: '평소 손발 온도는 어떤가요?',
    options: [
      {
        label: '항상 차가운 편이에요 — 손발을 자주 비비거나 주머니에 넣게 됩니다',
        weights: { han: 3, yeol: 0 },
      },
      {
        label: '따뜻하거나 뜨거운 편이에요 — 여름엔 손발이 특히 뜨겁습니다',
        weights: { han: 0, yeol: 3 },
      },
      {
        label: '계절·상황에 따라 다릅니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },

  {
    id: 'hy2',
    prompt: '찬 음식과 따뜻한 음식 중 어느 쪽이 더 끌리나요?',
    options: [
      {
        label: '따뜻한 음식이 훨씬 편해요 — 차가운 음식을 먹으면 속이 불편합니다',
        weights: { han: 3, yeol: 0 },
      },
      {
        label: '찬 음식·음료가 당겨요 — 특히 더울 때 시원한 것이 먼저 생각납니다',
        weights: { han: 0, yeol: 3 },
      },
      {
        label: '둘 다 비슷하게 좋습니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },

  {
    id: 'hy3',
    prompt: '더위와 추위 중 어느 쪽을 더 힘들어하나요?',
    options: [
      {
        label: '추위를 많이 탑니다 — 다른 사람들이 괜찮다 할 때도 저는 춥습니다',
        weights: { han: 3, yeol: 0 },
      },
      {
        label: '더위를 많이 탑니다 — 조금만 더워도 금방 힘들어집니다',
        weights: { han: 0, yeol: 3 },
      },
      {
        label: '둘 다 그리 심하진 않습니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },

  {
    id: 'hy4',
    prompt: '땀이 나는 편인가요?',
    options: [
      {
        label: '땀이 잘 안 납니다 — 운동해도 별로 안 나는 편이에요',
        weights: { han: 2, yeol: 0 },
      },
      {
        label: '땀이 잘 납니다 — 조금만 움직여도, 자다가도 땀이 납니다',
        weights: { han: 0, yeol: 2 },
      },
      {
        label: '보통입니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },

  {
    id: 'hy5',
    prompt: '얼굴색이나 피부에 대해 평소 어떤 말을 자주 듣나요?',
    options: [
      {
        label: '"창백해 보여", "혈색이 없어 보여" — 하얗거나 푸르스름한 편입니다',
        weights: { han: 3, yeol: 0 },
      },
      {
        label: '"얼굴이 붉어", "열이 많아 보여" — 붉은 기가 있거나 상기되는 편입니다',
        weights: { han: 0, yeol: 3 },
      },
      {
        label: '특별히 없습니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },

  {
    id: 'hy6',
    prompt: '갈증이나 입 마름은 자주 느끼나요?',
    options: [
      {
        label: '별로 목이 마르지 않습니다 — 물을 많이 안 마셔도 괜찮습니다',
        weights: { han: 2, yeol: 0 },
      },
      {
        label: '입이 자주 마릅니다 — 물을 많이 마셔도 갈증이 남는 편입니다',
        weights: { han: 0, yeol: 2 },
      },
      {
        label: '보통 수준입니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },

  {
    id: 'hy7',
    prompt: '소화 상태는 어떤 편인가요?',
    options: [
      {
        label: '소화가 느리고, 배가 자주 차게 느껴집니다. 따뜻한 음식이 속 편합니다',
        weights: { han: 3, yeol: 0 },
      },
      {
        label: '소화는 잘 되지만 변비나 변이 굵고 건조한 편입니다',
        weights: { han: 0, yeol: 2 },
      },
      {
        label: '특별한 증상 없이 보통입니다',
        weights: { han: 1, yeol: 1 },
      },
    ],
  },
];

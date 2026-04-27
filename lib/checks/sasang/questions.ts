import { EngineQuestion } from '@/lib/engine/types';
import { UserProfile } from '@/lib/engine/profile';

export type ConstitutionKey = 'taeyang' | 'soyang' | 'taeeum' | 'soeum';

export const sasangQuestions: EngineQuestion<ConstitutionKey>[] = [
  // ── 性 질문 (평소 에너지 발산 방향) ──────────────────────────────

  {
    id: 'n1',
    axis: 'nature',
    prompt: '주말 오후, 아무 약속 없는 자유 시간입니다. 가장 끌리는 것은?',
    options: [
      {
        label: '밀린 뉴스나 책을 보며 세상 돌아가는 걸 파악한다',
        weights: { taeyang: 3, soyang: 1, taeeum: 1, soeum: 0 },
      },
      {
        label: '친구나 가족에게 연락해서 만남을 만든다',
        weights: { taeyang: 0, soyang: 3, taeeum: 1, soeum: 1 },
      },
      {
        label: '좋아하는 것(요리·취미·드라마 등)에 푹 빠져든다',
        weights: { taeyang: 0, soyang: 1, taeeum: 3, soeum: 1 },
      },
      {
        label: '익숙한 공간에서 조용히 쉬며 재충전한다',
        weights: { taeyang: 1, soyang: 0, taeeum: 1, soeum: 3 },
      },
    ],
  },

  {
    id: 'n2',
    axis: 'nature',
    prompt: '모임에서 당신이 자연스럽게 맡게 되는 역할은?',
    options: [
      {
        label: '방향을 제시하거나 불합리한 것을 지적하는 역할',
        weights: { taeyang: 3, soyang: 2, taeeum: 0, soeum: 0 },
      },
      {
        label: '분위기를 띄우고 사람들을 연결하는 역할',
        weights: { taeyang: 0, soyang: 3, taeeum: 1, soeum: 1 },
      },
      {
        label: '실무를 묵묵히 챙기고 결과를 만드는 역할',
        weights: { taeyang: 1, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '분위기를 살피고 갈등을 부드럽게 조율하는 역할',
        weights: { taeyang: 0, soyang: 1, taeeum: 1, soeum: 3 },
      },
    ],
  },

  {
    id: 'n3',
    axis: 'nature',
    prompt: '마음이 편안해지는 순간은?',
    options: [
      {
        label: '옳은 것을 말하고 행동했다는 느낌이 올 때',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 1 },
      },
      {
        label: '주변 사람들이 활기차고 나도 그 에너지 속에 있을 때',
        weights: { taeyang: 0, soyang: 3, taeeum: 1, soeum: 0 },
      },
      {
        label: '무언가를 쌓거나 이루어가고 있다는 느낌이 올 때',
        weights: { taeyang: 1, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '오래된 사람과 익숙한 공간에서 조용히 있을 때',
        weights: { taeyang: 0, soyang: 1, taeeum: 1, soeum: 3 },
      },
    ],
  },

  {
    id: 'n4',
    axis: 'nature',
    prompt: '스트레스가 쌓였을 때 나도 모르게 하는 행동은?',
    options: [
      {
        label: '잘못된 것을 찾아 지적하거나 바로잡으려 한다',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 0 },
      },
      {
        label: '밖으로 나가거나 사람을 만나 에너지를 발산한다',
        weights: { taeyang: 1, soyang: 3, taeeum: 0, soeum: 0 },
      },
      {
        label: '맛있는 것을 먹거나 좋아하는 것에 더 몰두한다',
        weights: { taeyang: 0, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '혼자 조용히 있으면서 마음이 가라앉기를 기다린다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
    ],
  },

  {
    id: 'n5',
    axis: 'nature',
    prompt: '오래 알고 지낸 친구가 "너는 항상…"이라고 말한다면?',
    options: [
      {
        label: '"옳고 그름이 분명해" — 맞다, 불의는 못 참는다',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 0 },
      },
      {
        label: '"에너지가 넘쳐" — 맞다, 가만히 있으면 답답하다',
        weights: { taeyang: 0, soyang: 3, taeeum: 1, soeum: 0 },
      },
      {
        label: '"한 번 빠지면 끝이 없어" — 맞다, 좋아하면 다 해야 한다',
        weights: { taeyang: 0, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '"걱정이 많아" — 맞다, 미리 대비하지 않으면 불안하다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
    ],
  },

  // ── 情 질문 (자극받았을 때 반응) ──────────────────────────────

  {
    id: 'e1',
    axis: 'emotion',
    prompt: '운전 중 차선을 지키고 있는데 옆 차가 갑자기 끼어들었습니다. 순간 입에서 나오는 것은?',
    options: [
      {
        label: '욕이나 격한 말이 먼저 나온다',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 0 },
      },
      {
        label: '창문 내리고 항의하거나 경적을 길게 누른다',
        weights: { taeyang: 1, soyang: 3, taeeum: 0, soeum: 0 },
      },
      {
        label: '크게 경적 한 번 울리고 속으로 삭힌다',
        weights: { taeyang: 0, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '놀라서 심장이 쿵 내려앉고 한동안 긴장이 풀리지 않는다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
      {
        label: '별로 신경 안 쓰고 "급했나보다" 하고 넘긴다',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e2',
    axis: 'emotion',
    prompt: '모임에서 내 이야기를 하는 중 누군가 끊고 다른 주제로 넘어갔습니다. 당신은?',
    options: [
      {
        label: '즉시 "잠깐, 내 말이 끝나지 않았어요"라고 말한다',
        weights: { taeyang: 3, soyang: 2, taeeum: 0, soeum: 0 },
      },
      {
        label: '기분은 나쁘지만 크게 내색하지 않고 분위기에 맞춘다',
        weights: { taeyang: 0, soyang: 1, taeeum: 2, soeum: 1 },
      },
      {
        label: '속으로 많이 상하고 집에 와서도 생각난다',
        weights: { taeyang: 1, soyang: 1, taeeum: 1, soeum: 3 },
      },
      {
        label: '억울한 마음에 눈물이 날 것 같다',
        weights: { taeyang: 0, soyang: 3, taeeum: 0, soeum: 1 },
      },
      {
        label: '별로 개의치 않는다 — 그럴 수 있는 일',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e3',
    axis: 'emotion',
    prompt: '오랜 친구가 약속을 또 어겼습니다. 이번이 세 번째입니다. 당신의 첫 반응은?',
    options: [
      {
        label: '바로 전화해서 "이건 아니잖아"라고 따진다',
        weights: { taeyang: 3, soyang: 2, taeeum: 0, soeum: 0 },
      },
      {
        label: '서러운 마음이 먼저 올라온다 — "나를 이렇게 대하나"',
        weights: { taeyang: 0, soyang: 3, taeeum: 0, soeum: 1 },
      },
      {
        label: '속으로 쌓아두다가 한참 뒤에 한꺼번에 터뜨린다',
        weights: { taeyang: 1, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '"혹시 내가 잘못한 게 있나" 먼저 돌아본다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
      {
        label: '그냥 그런가보다 한다 — 내 할 일 하면 된다',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e4',
    axis: 'emotion',
    prompt: '직장 후배가 내 앞에서 예의 없이 굴었습니다. 어떻게 합니까?',
    promptVariants: [
      {
        when: { ageGroup: ['20s', '30s'] },
        prompt: '동료나 친구·지인이 당신 앞에서 예의 없이 굴었습니다. 어떻게 합니까?',
      },
    ],
    options: [
      {
        label: '그 자리에서 바로 "그건 예의가 아니에요"라고 말한다',
        weights: { taeyang: 3, soyang: 2, taeeum: 0, soeum: 0 },
      },
      {
        label: '나중에 기회를 봐서 따로 얘기한다',
        weights: { taeyang: 1, soyang: 1, taeeum: 2, soeum: 1 },
      },
      {
        label: '말은 못 하고 며칠 동안 마음속에 남는다',
        weights: { taeyang: 0, soyang: 1, taeeum: 2, soeum: 3 },
      },
      {
        label: '기분 나쁜 감정이 올라오지만 금방 털고 넘긴다',
        weights: { taeyang: 0, soyang: 2, taeeum: 2, soeum: 0 },
      },
      {
        label: '별로 동요하지 않고 그냥 지나간다',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e5',
    axis: 'emotion',
    showIf: { hasChildren: true },
    prompt: '자녀가 진로 결정을 당신과 상의도 없이 혼자 내렸습니다. 첫 감정은?',
    options: [
      {
        label: '그 결정이 옳은지 그른지 바로 따진다',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 0 },
      },
      {
        label: '"나를 믿지 않는 건가" 서러움이 먼저 온다',
        weights: { taeyang: 0, soyang: 3, taeeum: 0, soeum: 1 },
      },
      {
        label: '속으로는 걱정되지만 일단 지켜본다',
        weights: { taeyang: 0, soyang: 0, taeeum: 3, soeum: 2 },
      },
      {
        label: '"잘 될까" 불안하고 온갖 걱정이 밀려온다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
      {
        label: '특별한 감정 없이 "그러려니" 한다 — 자녀의 선택은 자녀의 것',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e6',
    axis: 'emotion',
    showIf: { married: true },
    prompt: '배우자가 중요한 결정을 혼자 내리고 나중에 얘기했습니다. 당신은?',
    options: [
      {
        label: '"왜 나한테 먼저 말 안 했어?" 즉시 따진다',
        weights: { taeyang: 3, soyang: 2, taeeum: 0, soeum: 0 },
      },
      {
        label: '억울하고 서운해서 말문이 막힌다',
        weights: { taeyang: 0, soyang: 3, taeeum: 0, soeum: 1 },
      },
      {
        label: '일단 받아들이되 며칠 뒤에 서운함을 꺼낸다',
        weights: { taeyang: 1, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '말은 못 하고 혼자 마음이 상해 끙끙 앓는다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
      {
        label: '딱히 신경 쓰지 않고 자연스럽게 받아들인다',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e7',
    axis: 'emotion',
    prompt: '오랜만에 만난 친척이 자녀 자랑을 늘어놓을 때 당신 마음은?',
    promptVariants: [
      {
        when: { ageGroup: ['20s', '30s'] },
        prompt: '오랜만에 만난 친구나 지인이 결혼·연봉·승진을 자랑할 때 당신 마음은?',
      },
    ],
    options: [
      {
        label: '"자랑도 좋지만 그게 전부는 아니잖아요" 속으로 반박한다',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 0 },
      },
      {
        label: '지지 않으려고 나도 내 얘기를 꺼낸다',
        weights: { taeyang: 1, soyang: 3, taeeum: 1, soeum: 0 },
      },
      {
        label: '듣고 있으면서 속으로 "나도 뭔가 있어야 하는데…" 자꾸 쌓인다',
        weights: { taeyang: 0, soyang: 0, taeeum: 3, soeum: 1 },
      },
      {
        label: '"혹시 우리 얘기 안 좋게 보는 건 아닐까" 걱정된다',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
      {
        label: '별 감흥 없이 그냥 듣는다 — 자기 일은 자기 일',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e8',
    axis: 'emotion',
    prompt: '열심히 준비한 일이 결국 잘 안 됐습니다. 그 순간 가장 먼저 드는 감정은?',
    options: [
      {
        label: '분통이 터진다 — "이건 내 탓이 아니야"',
        weights: { taeyang: 3, soyang: 1, taeeum: 0, soeum: 0 },
      },
      {
        label: '억울하고 서럽다 — "이렇게까지 했는데"',
        weights: { taeyang: 0, soyang: 3, taeeum: 0, soeum: 1 },
      },
      {
        label: '모든 걸 다시 처음부터 쌓아올리겠다는 오기가 생긴다',
        weights: { taeyang: 1, soyang: 0, taeeum: 3, soeum: 0 },
      },
      {
        label: '자책이 밀려온다 — "내가 뭘 잘못한 걸까"',
        weights: { taeyang: 0, soyang: 0, taeeum: 1, soeum: 3 },
      },
      {
        label: '큰 동요 없이 "어쩔 수 없지" 하고 다음을 본다',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },

  {
    id: 'e9',
    axis: 'emotion',
    prompt: '잠들기 직전, 오늘 하루가 떠오를 때 가장 자주 드는 생각은?',
    options: [
      {
        label: '"내가 오늘 옳은 일을 했나, 잘못 말한 건 없나"',
        weights: { taeyang: 2, soyang: 1, taeeum: 0, soeum: 1 },
      },
      {
        label: '"오늘 사람들과 잘 어울렸나, 내가 너무 튀진 않았나"',
        weights: { taeyang: 0, soyang: 3, taeeum: 0, soeum: 1 },
      },
      {
        label: '"오늘 뭘 이뤘나, 내일은 뭘 더 해야 하나"',
        weights: { taeyang: 1, soyang: 0, taeeum: 3, soeum: 0 },
      },
      {
        label: '"혹시 오늘 내가 누군가에게 실수하거나 상처 준 건 아닐까"',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 3 },
      },
      {
        label: '특별한 생각 없이 그냥 잠이 든다',
        weights: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      },
    ],
  },
];

export function filterSasangQuestions(
  questions: EngineQuestion<ConstitutionKey>[],
  profile: UserProfile,
): EngineQuestion<ConstitutionKey>[] {
  return questions
    .filter((q) => {
      if (!q.showIf) return true;
      const p = q.showIf;
      if (p.married !== undefined && profile.married !== p.married) return false;
      if (p.hasChildren !== undefined && profile.hasChildren !== p.hasChildren) return false;
      return true;
    })
    .map((q) => {
      if (!q.promptVariants) return q;
      const variant = q.promptVariants.find((v) => {
        const allowed = Array.isArray(v.when.ageGroup) ? v.when.ageGroup : [v.when.ageGroup];
        return allowed.includes(profile.ageGroup);
      });
      if (!variant) return q;
      return { ...q, prompt: variant.prompt, options: variant.options ?? q.options };
    });
}

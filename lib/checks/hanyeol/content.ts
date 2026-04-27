import { BaseResultContent } from '@/lib/engine/types';

export type HanyeolKey = 'han' | 'yeol';

export interface HanyeolContent extends BaseResultContent {
  key: HanyeolKey;
  bodySignals: string[];
  seasonalTips: string[];
}

export const hanyeolContent: Record<HanyeolKey, HanyeolContent> = {
  han: {
    key: 'han',
    name: '한증 경향',
    hanja: '寒證',
    hex: '#1e40af',
    oneLiner: '몸이 차고 따뜻함을 찾는 체질 — 양기를 보충하고 냉기를 피하면 좋아집니다',
    lifeTask: '양기 보충과 냉기 차단',
    classicQuote: '寒者熱之 — 찬 것은 따뜻하게 한다',
    foods: {
      good: ['생강', '계피', '마늘', '파', '닭고기', '양고기', '찹쌀', '인삼'],
      avoid: ['차가운 음료', '생식·날것', '수박·참외', '보리·메밀', '돼지고기'],
    },
    exercises: ['가벼운 유산소 (몸 데우기 위주)', '반신욕·족욕', '스트레칭', '햇볕 쬐는 산책'],
    warnings: ['냉방이 강한 환경 장기간 노출', '차가운 음식·음료 과다', '피로 누적'],
    bodySignals: [
      '손발이 자주 차고, 덥혀야 편합니다',
      '추위를 많이 타고, 여름에도 찬 바람이 싫습니다',
      '소화가 느리고, 배가 자주 차게 느껴집니다',
      '소변이 맑고 양이 많거나, 대변이 무른 편입니다',
    ],
    seasonalTips: [
      '겨울·환절기에 복부와 발을 따뜻하게 유지하세요',
      '아침에 따뜻한 물 한 잔으로 하루를 시작하세요',
      '냉방이 강한 공간에선 얇은 겉옷을 챙기세요',
    ],
  },

  yeol: {
    key: 'yeol',
    name: '열증 경향',
    hanja: '熱證',
    hex: '#b91c1c',
    oneLiner: '몸이 뜨겁고 열이 위로 오르는 체질 — 열을 식히고 수분을 보충하면 좋아집니다',
    lifeTask: '열 내리기와 수분 보충',
    classicQuote: '熱者寒之 — 뜨거운 것은 차게 한다',
    foods: {
      good: ['녹두', '보리', '오이', '수박', '배', '미나리', '돼지고기', '오리고기'],
      avoid: ['인삼', '홍삼', '꿀', '마늘 과다', '맵고 자극적인 음식', '술'],
    },
    exercises: ['수영', '서늘한 아침·저녁 산책', '요가·명상 (열 과잉 방지)', '냉수마찰'],
    warnings: ['과로·수면 부족 (열 상승)', '맵고 뜨거운 음식 과다', '여름철 직사광선 장시간 노출'],
    bodySignals: [
      '얼굴이 쉽게 붉어지고, 상체·머리로 열감이 옵니다',
      '더위를 많이 타고, 찬 음료·음식이 당깁니다',
      '입이 잘 마르고, 갈증을 자주 느낍니다',
      '소변이 진하거나 양이 적고, 변비 경향이 있습니다',
    ],
    seasonalTips: [
      '여름·열대야엔 수분을 충분히 보충하고 과로를 피하세요',
      '늦은 밤 과식·음주는 다음날 열감을 높입니다',
      '화가 나거나 흥분했을 때 심호흡으로 열을 내리세요',
    ],
  },
};

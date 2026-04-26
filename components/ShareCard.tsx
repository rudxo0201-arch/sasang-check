'use client';

import { forwardRef } from 'react';
import { ConstitutionContent } from '@/lib/constitutions';

/* ResultClient와 동일한 모노크롬 팔레트 */
const GRADIENTS: Record<string, string> = {
  soeum:   'linear-gradient(135deg, #d8d8d6 0%, #b8b8b5 50%, #989895 100%)',
  soyang:  'linear-gradient(135deg, #909090 0%, #707070 50%, #545454 100%)',
  taeeum:  'linear-gradient(135deg, #484644 0%, #2e2c2a 50%, #1a1918 100%)',
  taeyang: 'linear-gradient(135deg, #1c1b1a 0%, #0e0d0c 50%, #060810 100%)',
};

const TEXT_ON: Record<string, string> = {
  soeum:  '#111110',
  soyang: '#ffffff',
  taeeum: 'rgba(255,255,255,0.92)',
  taeyang:'rgba(255,255,255,0.92)',
};

const TEXT_SUB: Record<string, string> = {
  soeum:  'rgba(0,0,0,0.50)',
  soyang: 'rgba(255,255,255,0.60)',
  taeeum: 'rgba(255,255,255,0.55)',
  taeyang:'rgba(255,255,255,0.55)',
};

const ShareCard = forwardRef<HTMLDivElement, { constitution: ConstitutionContent }>(
  ({ constitution: c }, ref) => {
    const gradient = GRADIENTS[c.key] ?? `linear-gradient(135deg, ${c.hex} 0%, ${c.hex}cc 100%)`;
    const textMain = TEXT_ON[c.key] ?? '#fff';
    const textSub  = TEXT_SUB[c.key] ?? 'rgba(255,255,255,0.60)';
    const divider  = c.key === 'soeum' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.20)';

    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          borderRadius: '24px',
          overflow: 'hidden',
          background: gradient,
          padding: '40px 32px',
          fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        }}
      >
        {/* 상단 레이블 */}
        <p style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px', color: textSub }}>
          사상체질 건강체크
        </p>

        {/* 체질명 */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', marginBottom: '4px', color: textSub }}>{c.hanja}</p>
          <p style={{ fontSize: '52px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: textMain }}>{c.name}</p>
        </div>

        {/* 한 줄 정의 */}
        <p style={{ fontSize: '16px', lineHeight: 1.65, marginBottom: '28px', color: textSub }}>
          {c.oneLiner}
        </p>

        {/* 구분선 */}
        <div style={{ borderTop: `1px solid ${divider}`, marginBottom: '24px' }} />

        {/* 평생 과제 */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px', color: textSub }}>
            평생 과제
          </p>
          <p style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, color: textMain }}>
            &ldquo;{c.lifeTask}&rdquo;를 다스리는 것
          </p>
        </div>

        {/* 원문 */}
        <p style={{ marginTop: '28px', fontSize: '11px', lineHeight: 1.6, color: textSub }}>
          {c.classicQuote} — 이제마 『동의수세보원』
        </p>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
export default ShareCard;

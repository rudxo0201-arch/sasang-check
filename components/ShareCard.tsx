'use client';

import { forwardRef } from 'react';
import { ConstitutionContent } from '@/lib/constitutions';

/* ResultClient와 동일한 파스텔 그라데이션 */
const GRADIENTS: Record<string, string> = {
  taeyang: 'linear-gradient(135deg, #2d5f9e 0%, #5d97c8 50%, #a8cce4 100%)',
  soyang:  'linear-gradient(135deg, #b86d2e 0%, #d9954e 50%, #f0c07a 100%)',
  taeeum:  'linear-gradient(135deg, #2a2724 0%, #56504a 50%, #9c9288 100%)',
  soeum:   'linear-gradient(135deg, #18542f 0%, #2e7d50 50%, #52a876 100%)',
};

const ShareCard = forwardRef<HTMLDivElement, { constitution: ConstitutionContent }>(
  ({ constitution: c }, ref) => {
    const gradient = GRADIENTS[c.key] ?? `linear-gradient(135deg, ${c.hex} 0%, ${c.hex}cc 100%)`;

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
          color: '#fff',
          fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        }}
      >
        {/* 상단 레이블 */}
        <p style={{ fontSize: '12px', opacity: 0.65, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
          사상체질 건강체크
        </p>

        {/* 체질명 */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '4px' }}>{c.hanja}</p>
          <p style={{ fontSize: '52px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{c.name}</p>
        </div>

        {/* 한 줄 정의 */}
        <p style={{ fontSize: '16px', opacity: 0.88, lineHeight: 1.65, marginBottom: '28px' }}>
          {c.oneLiner}
        </p>

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', marginBottom: '24px' }} />

        {/* 평생 과제 */}
        <div>
          <p style={{ fontSize: '11px', opacity: 0.65, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>
            평생 과제
          </p>
          <p style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3 }}>
            &ldquo;{c.lifeTask}&rdquo;를 다스리는 것
          </p>
        </div>

        {/* 원문 */}
        <p style={{ marginTop: '28px', fontSize: '11px', opacity: 0.45, lineHeight: 1.6 }}>
          {c.classicQuote} — 이제마 『동의수세보원』
        </p>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
export default ShareCard;

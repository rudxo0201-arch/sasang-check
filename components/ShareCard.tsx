'use client';

import { forwardRef } from 'react';
import { ConstitutionContent } from '@/lib/constitutions';

const ShareCard = forwardRef<HTMLDivElement, { constitution: ConstitutionContent }>(
  ({ constitution: c }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: c.hex,
          padding: '40px 32px',
          color: '#fff',
          fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        }}
      >
        {/* 상단 레이블 */}
        <p style={{ fontSize: '13px', opacity: 0.7, letterSpacing: '0.15em', marginBottom: '16px' }}>
          사상체질 건강체크
        </p>

        {/* 체질명 */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', opacity: 0.75, marginBottom: '4px' }}>{c.hanja}</p>
          <p style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1.1 }}>{c.name}</p>
        </div>

        {/* 한 줄 정의 */}
        <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: 1.6, marginBottom: '28px' }}>
          {c.oneLiner}
        </p>

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', marginBottom: '24px' }} />

        {/* 평생 과제 */}
        <div>
          <p style={{ fontSize: '13px', opacity: 0.7, letterSpacing: '0.15em', marginBottom: '8px' }}>
            평생 과제
          </p>
          <p style={{ fontSize: '26px', fontWeight: 800 }}>
            &ldquo;{c.lifeTask}&rdquo;를 다스리는 것
          </p>
        </div>

        {/* 원문 */}
        <p style={{ marginTop: '28px', fontSize: '12px', opacity: 0.5, lineHeight: 1.6 }}>
          {c.classicQuote} — 이제마 『동의수세보원』
        </p>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
export default ShareCard;

'use client';

import { forwardRef } from 'react';
import { BaseResultContent } from '@/lib/engine/types';

const GRADIENTS: Record<string, string> = {
  soeum:   '#bdbdbb',
  soyang:  '#6e6e6e',
  taeeum:  '#2a2826',
  taeyang: '#0e0d0c',
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

const ShareCard = forwardRef<HTMLDivElement, { constitution: BaseResultContent }>(
  ({ constitution: c }, ref) => {
    const gradient = GRADIENTS[c.key] ?? c.hex;
    const textMain = TEXT_ON[c.key] ?? '#ffffff';
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
          backgroundColor: gradient,
          padding: '40px 32px',
          fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        }}
      >
        <p style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px', color: textSub }}>
          건강 셀프체크
        </p>

        <div style={{ marginBottom: '20px' }}>
          {c.hanja && <p style={{ fontSize: '13px', marginBottom: '4px', color: textSub }}>{c.hanja}</p>}
          <p style={{ fontSize: '52px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: textMain }}>{c.name}</p>
        </div>

        <p style={{ fontSize: '16px', lineHeight: 1.65, marginBottom: '28px', color: textSub }}>
          {c.oneLiner}
        </p>

        <div style={{ borderTop: `1px solid ${divider}`, marginBottom: '24px' }} />

        {c.lifeTask && (
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px', color: textSub }}>
              평생 과제
            </p>
            <p style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, color: textMain }}>
              &ldquo;{c.lifeTask}&rdquo;를 다스리는 것
            </p>
          </div>
        )}

        {c.classicQuote && (
          <p style={{ marginTop: '28px', fontSize: '11px', lineHeight: 1.6, color: textSub }}>
            {c.classicQuote}
          </p>
        )}

        <p style={{ marginTop: '16px', fontSize: '11px', color: textSub }}>
          MBTI처럼, 정답이 아니라 경향입니다.
        </p>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
export default ShareCard;

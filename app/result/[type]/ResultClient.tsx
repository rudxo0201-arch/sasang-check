'use client';

import { ConstitutionContent, constitutions, ConstitutionKey } from '@/lib/constitutions';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ShareCard from '@/components/ShareCard';
import DownloadButton from '@/components/DownloadButton';
import { useAppStore } from '@/lib/store';
import {
  getAxisWinner, getStrengthTier, getPercentages,
  axisNarrative, axisEquanimousNarrative,
  isAxisEquanimous, StrengthTier,
} from '@/lib/scoring';

/* ── 디자인 상수 (모노크롬 — 흰→연회→진회→검정) ── */
/* 소음=흰, 소양=연회, 태음=진회, 태양=검정 */
const GRADIENTS: Record<ConstitutionKey, string> = {
  soeum:   '#bdbdbb',
  soyang:  '#6e6e6e',
  taeeum:  '#2a2826',
  taeyang: '#0e0d0c',
};

/* 분포 바 / 단색 참조 */
const SOLID: Record<ConstitutionKey, string> = {
  soeum:  '#b0b0ae',
  soyang: '#707070',
  taeeum: '#484644',
  taeyang:'#1c1b1a',
};

/* 카드 배경 밝기에 따른 텍스트 색상 */
const TEXT_ON: Record<ConstitutionKey, { main: string; sub: string }> = {
  soeum:   { main: '#111110',             sub: 'rgba(0,0,0,0.50)'   },
  soyang:  { main: '#1a1918',             sub: 'rgba(0,0,0,0.50)'   },
  taeeum:  { main: 'rgba(255,255,255,0.92)', sub: 'rgba(255,255,255,0.55)' },
  taeyang: { main: 'rgba(255,255,255,0.92)', sub: 'rgba(255,255,255,0.55)' },
};

/* 체질 카드 glow (절반 이하, 컬러 없음) */
const GLOWS: Record<ConstitutionKey, string> = {
  soeum:   '0 0 20px 4px rgba(255,255,255,0.10), 0 0 40px 8px rgba(255,255,255,0.04)',
  soyang:  '0 0 16px 3px rgba(200,200,200,0.07), 0 0 32px 6px rgba(200,200,200,0.03)',
  taeeum:  '0 0 14px 3px rgba(100,100,100,0.06), 0 0 28px 5px rgba(100,100,100,0.03)',
  taeyang: '0 0 14px 3px rgba(255,255,255,0.05), 0 0 28px 5px rgba(255,255,255,0.02)',
};
const OTHER: Record<ConstitutionKey, ConstitutionKey[]> = {
  taeyang: ['soyang','taeeum','soeum'], soyang: ['taeyang','taeeum','soeum'],
  taeeum:  ['taeyang','soyang','soeum'], soeum: ['taeyang','soyang','taeeum'],
};

function tierLabel(tier: StrengthTier, p: string, s: string) {
  if (tier === 'typical') return `전형적인 ${p}`;
  if (tier === 'leaning') return `${p} 성향이 강함`;
  return `${p} · ${s} 혼합형`;
}

/* ── 메인 ── */
export default function ResultClient({ constitution: c }: { constitution: ConstitutionContent }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scores        = useAppStore((s) => s.scores);
  const natureScores  = useAppStore((s) => s.natureScores);
  const emotionScores = useAppStore((s) => s.emotionScores);
  const natureCount   = useAppStore((s) => s.natureCount);
  const emotionCount  = useAppStore((s) => s.emotionCount);
  const has = mounted && scores !== null && natureScores !== null && emotionScores !== null;

  const tier     = has ? getStrengthTier(scores!) : null;
  const natEq    = has ? isAxisEquanimous(natureScores!, natureCount) : false;
  const emoEq    = has ? isAxisEquanimous(emotionScores!, emotionCount) : false;
  const natW     = has && !natEq ? getAxisWinner(natureScores!, natureCount) : null;
  const emoW     = has && !emoEq ? getAxisWinner(emotionScores!, emotionCount) : null;
  const pcts     = has ? getPercentages(scores!) : null;

  const grad   = GRADIENTS[c.key];
  const glow   = GLOWS[c.key];
  const solid  = SOLID[c.key];
  const textOn = TEXT_ON[c.key];

  return (
    <main className="flex-1 flex flex-col items-center px-5 sm:px-8 py-10 max-w-4xl mx-auto w-full gap-3">

      {/* 1. 히어로 — 흰 카드 */}
      <div
        className="w-full rounded-[1rem] p-8"
        style={{ background: '#ffffff', boxShadow: '0 0 40px 8px rgba(255,255,255,0.12)' }}
      >
        <div>
          <p className="text-eyebrow mb-5" style={{ color: 'rgba(0,0,0,0.45)' }}>당신의 사상체질은</p>
          <p style={{ fontSize: '1.0625rem', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 400, color: 'rgba(0,0,0,0.45)' }}>{c.hanja}</p>
          <p className="text-display mb-4" style={{ color: '#111111' }}>{c.name}</p>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'rgba(0,0,0,0.60)' }}>{c.oneLiner}</p>
          {tier && (
            <p className="mt-4 text-eyebrow" style={{ color: 'rgba(0,0,0,0.40)' }}>
              {tierLabel(tier.tier, c.name, constitutions[tier.secondary].name)}
            </p>
          )}
        </div>
      </div>

      {/* 2. 분포 + 性情 */}
      {pcts && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FBlock>
            <Label>체질 분포</Label>
            <SegBar pcts={pcts} primary={c.key} />
            <div className="mt-4 space-y-2">
              {(Object.keys(pcts) as ConstitutionKey[]).sort((a, b) => pcts[b] - pcts[a]).map((key) => {
                const ip = key === c.key;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ip ? '#ffffff' : 'rgba(255,255,255,0.45)' }} />
                    <span className="flex-1" style={{ fontSize: '1rem', color: ip ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.70)', fontWeight: ip ? 600 : 400 }}>
                      {constitutions[key].name}
                    </span>
                    <span className="font-mono tabular-nums" style={{ fontSize: '1rem', color: ip ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.65)' }}>
                      {pcts[key].toFixed(1)}%
                    </span>
                    <div className="w-24 flex-shrink-0 rounded-full overflow-hidden" style={{ height: '6px', background: 'rgba(255,255,255,0.12)' }}>
                      <div style={{ width: `${pcts[key]}%`, height: '100%', background: ip ? '#ffffff' : 'rgba(255,255,255,0.40)', borderRadius: '999px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </FBlock>
          {natW ? (
            <FBlock>
              <Label>당신의 性과 情</Label>
              <div className="mt-3 space-y-2">
                <AxisCard label="平素 · 性" type={natW.type} />
                {emoEq ? (
                  <div className="rounded-[0.75rem] p-4" style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'transparent' }}>
                    <p className="text-eyebrow mb-1">刺戟 · 情</p>
                    <p className="font-medium" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}>평정 (平靜)</p>
                    <p className="text-caption mt-1">자극에 크게 동요하지 않습니다</p>
                  </div>
                ) : emoW ? <AxisCard label="刺戟 · 情" type={emoW.type} /> : null}
              </div>
              {natW && (emoW || emoEq) && (
                <p className="text-caption mt-4 leading-relaxed">
                  {emoEq
                    ? axisEquanimousNarrative(natW.type, constitutions[natW.type].name)
                    : emoW ? axisNarrative(natW.type, emoW.type, constitutions[natW.type].name, constitutions[emoW.type].name, constitutions[emoW.type].lifeTask)
                    : ''}
                </p>
              )}
            </FBlock>
          ) : (
            <FBlock>
              <Label>타고난 몸의 특징</Label>
              <p className="font-medium mt-2 mb-3" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}>{c.organBalance.korean}</p>
              <ul className="space-y-2">
                {c.bodyFeatures.map((f, i) => (
                  <li key={i} className="flex gap-2 text-caption"><span style={{ color: solid }}>·</span>{f}</li>
                ))}
              </ul>
            </FBlock>
          )}
        </div>
      )}

      {/* 3. 핵심 감정 2×1 (통합) */}
      <div className="w-full grid grid-cols-2 gap-3">
        <FBlock>
          <Label>平素 · 性</Label>
          <span className="inline-block mt-2 mb-2 px-4 py-1.5 rounded-full text-base font-semibold" style={{ border: '1.5px solid rgba(255,255,255,0.70)', color: 'rgba(255,255,255,0.92)' }}>{c.preferredEmotion.name}</span>
          <p className="font-medium mb-1" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.60)' }}>{c.nature.korean}</p>
          <p className="text-caption leading-relaxed">{c.nature.explanation}</p>
        </FBlock>
        <FBlock>
          <Label>刺戟 · 情</Label>
          <span className="inline-block mt-2 mb-2 px-4 py-1.5 rounded-full text-base font-semibold" style={{ border: '1.5px solid rgba(255,255,255,0.70)', color: 'rgba(255,255,255,0.92)' }}>{c.difficultEmotion.name}</span>
          <p className="font-medium mb-1" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.60)' }}>{c.emotion.korean}</p>
          <p className="text-caption leading-relaxed">{c.emotion.explanation}</p>
        </FBlock>
      </div>

      {/* 4. 평생 과제 */}
      <div className="w-full rounded-[1rem] p-8 text-center" style={{ backgroundColor: grad, boxShadow: glow, border: '1px solid rgba(255,255,255,0.10)' }}>
        <div>
          <p className="text-eyebrow mb-5" style={{ color: textOn.sub }}>이제마 선생이 말씀하시길</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '1rem', color: textOn.main }}>&ldquo;{c.lifeTask}&rdquo;</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: textOn.sub }}>{c.lifeTaskDesc}</p>
        </div>
      </div>

      {/* 5. 건강 2×2 */}
      <div className="w-full grid grid-cols-2 gap-3">
        <FBlock><Label>잘 맞는 음식</Label><Tags items={c.foods.good} /></FBlock>
        <FBlock><Label>조심할 음식</Label><Tags items={c.foods.avoid} /></FBlock>
        <FBlock><Label>맞는 운동</Label><ul className="mt-2 space-y-1">{c.exercises.map((e) => <li key={e} className="text-caption leading-relaxed" style={{ paddingLeft: '1em', textIndent: '-1em' }}>· {e}</li>)}</ul></FBlock>
        <FBlock>
          <Label>주의 신체 신호</Label>
          <ul className="mt-2 space-y-1.5">
            {c.vulnerableConditions.map((v, i) => (
              <li key={i} className="flex gap-2 text-caption"><span style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>{v}</li>
            ))}
          </ul>
        </FBlock>
      </div>

      {/* 6. 경계 2×2 */}
      <div className="w-full grid grid-cols-2 gap-3">
        <FBlock>
          <Label>특히 조심하세요</Label>
          <ul className="mt-2 space-y-2">{c.warningEmotions.map((w, i) => <li key={i} className="flex gap-2 text-caption"><span style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>{w}</li>)}</ul>
        </FBlock>
        <FBlock><Label>강점이 과해지면</Label><p className="text-caption mt-2 leading-relaxed">{c.perils}</p></FBlock>
        <FBlock><Label>다스리면</Label><p className="text-caption mt-2 leading-relaxed">{c.ifMastered}</p></FBlock>
        <FBlock><Label>무시하면</Label><p className="text-caption mt-2 leading-relaxed">{c.ifNeglected}</p></FBlock>
      </div>

      {/* 7. 실천 + 일상 */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FBlock>
          <Label>오늘부터 할 수 있는 것</Label>
          <ol className="mt-3 space-y-4">
            {c.emotionPractices.map((p, i) => (
              <li key={i}>
                <p className="text-eyebrow mb-1">0{i + 1}</p>
                <p className="font-medium mb-1" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}>{p.title}</p>
                <p className="text-caption leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ol>
        </FBlock>
        <FBlock>
          <Label>이런 적 있지 않으셨나요?</Label>
          <ul className="mt-3 space-y-3">
            {c.dailyBehaviors.map((b, i) => (
              <li key={i} className="flex gap-2 text-caption leading-relaxed">
                <span style={{ color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}>·</span>{b}
              </li>
            ))}
          </ul>
        </FBlock>
      </div>

      {/* 8. 공유 */}
      <div className="w-full">
        <ShareCard ref={cardRef} constitution={c} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <DownloadButton cardRef={cardRef} constitutionName={c.name} gradient={grad} />
          <button
            onClick={() => {
              if (navigator.share) { navigator.share({ title: `나는 ${c.name}`, text: c.oneLiner, url: window.location.href }); }
              else { navigator.clipboard.writeText(window.location.href); alert('링크가 복사되었습니다!'); }
            }}
            className="pill-block justify-center"
            style={{ width: '100%' }}
          >
            링크 공유
          </button>
        </div>
      </div>

      {/* 9. 다른 체질 */}
      <div className="w-full pt-2">
        <p className="text-eyebrow text-center mb-3">배우자·가족도 해보세요</p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {OTHER[c.key].map((key) => (
            <Link key={key} href={`/result/${key}`} className="rounded-[0.75rem] p-4 text-center floating-block transition-opacity hover:opacity-80">
              <p className="text-eyebrow mb-1">{constitutions[key].hanja}</p>
              <p className="font-medium" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>{constitutions[key].name}</p>
            </Link>
          ))}
        </div>
        <Link href="/onboarding" className="pill-block w-full justify-center">처음부터 다시 하기</Link>
      </div>

      {/* 출처 */}
      <p className="text-center py-4" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>
        {c.classicQuoteKorean}<br />이 결과는 의학적 진단이 아닌 자가 참고용 분석입니다.
      </p>
    </main>
  );
}

/* ── 공통 UI ── */
function FBlock({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`floating-block ${className}`}>{children}</div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '1rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      color: 'rgba(255,255,255,0.88)',
      marginBottom: '0.875rem',
    }}>
      {children}
    </p>
  );
}

function Tags({ items, color }: { items: string[]; color?: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1 rounded-full"
          style={{
            fontSize: '1rem',
            border: '1px solid rgba(255,255,255,0.40)',
            color: color ?? 'rgba(255,255,255,0.80)',
            background: 'transparent',
            fontWeight: 500,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function AxisCard({ label, type }: { label: string; type: ConstitutionKey }) {
  return (
    <div className="rounded-[0.75rem] p-4" style={{ backgroundColor: GRADIENTS[type], border: '1px solid rgba(255,255,255,0.10)' }}>
      <div>
        <p className="text-eyebrow mb-1" style={{ color: 'rgba(255,255,255,0.70)' }}>{label}</p>
        <p className="font-semibold text-white" style={{ fontSize: '1rem' }}>{constitutions[type].name}</p>
        <p style={{ fontSize: '0.875rem', opacity: 0.80, marginTop: '0.25rem', color: '#fff' }}>
          {label.includes('性') ? constitutions[type].nature.korean : constitutions[type].emotion.korean}
        </p>
      </div>
    </div>
  );
}

function SegBar({ pcts, primary }: { pcts: Record<ConstitutionKey, number>; primary: ConstitutionKey }) {
  const sorted = (Object.keys(pcts) as ConstitutionKey[]).sort((a, b) => pcts[b] - pcts[a]);
  return (
    <div className="w-full flex rounded-full overflow-hidden gap-px mt-3" style={{ height: '4px' }}>
      {sorted.map((key) => (
        <div key={key} style={{ width: `${pcts[key]}%`, background: key === primary ? '#ffffff' : 'rgba(255,255,255,0.35)', opacity: key === primary ? 1 : 1, minWidth: pcts[key] > 0 ? '3px' : 0 }} />
      ))}
    </div>
  );
}

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

/* ── 디자인 상수 ── */
const GRADIENTS: Record<ConstitutionKey, string> = {
  taeyang: 'linear-gradient(135deg, #2d5f9e 0%, #5d97c8 50%, #a8cce4 100%)',
  soyang:  'linear-gradient(135deg, #b86d2e 0%, #d9954e 50%, #f0c07a 100%)',
  taeeum:  'linear-gradient(135deg, #2a2724 0%, #56504a 50%, #9c9288 100%)',
  soeum:   'linear-gradient(135deg, #18542f 0%, #2e7d50 50%, #52a876 100%)',
};
const GLOWS: Record<ConstitutionKey, string> = {
  taeyang: '0 0 40px 8px rgba(93,151,200,0.35), 0 0 80px 16px rgba(93,151,200,0.15)',
  soyang:  '0 0 40px 8px rgba(217,149,78,0.35),  0 0 80px 16px rgba(217,149,78,0.15)',
  taeeum:  '0 0 40px 8px rgba(156,146,136,0.25), 0 0 80px 16px rgba(156,146,136,0.10)',
  soeum:   '0 0 40px 8px rgba(82,168,118,0.35),  0 0 80px 16px rgba(82,168,118,0.15)',
};
const SOLID: Record<ConstitutionKey, string> = {
  taeyang: '#5d97c8', soyang: '#d9954e', taeeum: '#9c9288', soeum: '#52a876',
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

  const grad  = GRADIENTS[c.key];
  const glow  = GLOWS[c.key];
  const solid = SOLID[c.key];

  return (
    <main className="flex-1 flex flex-col items-center px-5 sm:px-8 py-10 max-w-4xl mx-auto w-full gap-3">

      {/* 1. 히어로 — 체질 그라데이션 + glow */}
      <div
        className="w-full rounded-[1rem] p-8 text-white relative overflow-hidden"
        style={{ background: grad, boxShadow: glow, border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p className="text-eyebrow mb-5" style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.6875rem' }}>당신의 사상체질은</p>
          <p style={{ fontSize: '1rem', opacity: 0.60, letterSpacing: '0.12em', marginBottom: '0.375rem', fontWeight: 400 }}>{c.hanja}</p>
          <p className="text-display mb-4">{c.name}</p>
          <p style={{ fontSize: '0.9375rem', opacity: 0.85, lineHeight: 1.65 }}>{c.oneLiner}</p>
          {tier && (
            <p className="mt-4 text-eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>
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
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ip ? grad : SOLID[key], opacity: ip ? 1 : 0.3 }} />
                    <span className="flex-1 text-sm" style={{ color: ip ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.35)', fontWeight: ip ? 500 : 400 }}>
                      {constitutions[key].name}
                    </span>
                    <span className="text-sm font-mono tabular-nums" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {pcts[key].toFixed(1)}%
                    </span>
                    <div className="w-16 h-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }}>
                      <div style={{ width: `${pcts[key]}%`, height: '100%', background: ip ? solid : SOLID[key], opacity: ip ? 0.9 : 0.25 }} />
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
                    <p className="font-medium text-sm" style={{ color: 'rgba(255,255,255,0.80)' }}>평정 (平靜)</p>
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
              <p className="font-medium text-sm mt-2 mb-3" style={{ color: 'rgba(255,255,255,0.80)' }}>{c.organBalance.korean}</p>
              <ul className="space-y-2">
                {c.bodyFeatures.map((f, i) => (
                  <li key={i} className="flex gap-2 text-caption"><span style={{ color: solid }}>·</span>{f}</li>
                ))}
              </ul>
            </FBlock>
          )}
        </div>
      )}

      {/* 3. 핵심 감정 2×2 */}
      <div className="w-full grid grid-cols-2 gap-3">
        <FBlock><Label>자연스러운 감정</Label><p className="text-lg font-semibold mt-2 mb-1" style={{ color: solid }}>{c.preferredEmotion.name}</p><p className="text-caption leading-relaxed">{c.preferredEmotion.description}</p></FBlock>
        <FBlock><Label>다스려야 할 감정</Label><p className="text-lg font-semibold mt-2 mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{c.difficultEmotion.name}</p><p className="text-caption leading-relaxed">{c.difficultEmotion.description}</p></FBlock>
        <FBlock><Label>平素 · 性</Label><p className="font-medium text-sm mt-2 mb-1" style={{ color: 'rgba(255,255,255,0.80)' }}>{c.nature.korean}</p><p className="text-caption leading-relaxed">{c.nature.explanation}</p></FBlock>
        <FBlock><Label>刺戟 · 情</Label><p className="font-medium text-sm mt-2 mb-1" style={{ color: 'rgba(255,255,255,0.80)' }}>{c.emotion.korean}</p><p className="text-caption leading-relaxed">{c.emotion.explanation}</p></FBlock>
      </div>

      {/* 4. 평생 과제 */}
      <div className="w-full rounded-[1rem] p-8 text-center relative overflow-hidden" style={{ background: grad, boxShadow: glow, border: '1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p className="text-eyebrow mb-5" style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.6875rem' }}>이제마 선생이 말씀하시길</p>
          <p style={{ fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '1rem', color: '#fff' }}>&ldquo;{c.lifeTask}&rdquo;</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.80, lineHeight: 1.7 }}>{c.lifeTaskDesc}</p>
        </div>
      </div>

      {/* 5. 건강 2×2 */}
      <div className="w-full grid grid-cols-2 gap-3">
        <FBlock><Label>잘 맞는 음식</Label><Tags items={c.foods.good} color={solid} /></FBlock>
        <FBlock><Label>조심할 음식</Label><Tags items={c.foods.avoid} /></FBlock>
        <FBlock><Label>맞는 운동</Label><Tags items={c.exercises} color={solid} /></FBlock>
        <FBlock>
          <Label>주의 신체 신호</Label>
          <ul className="mt-2 space-y-1.5">
            {c.vulnerableConditions.map((v, i) => (
              <li key={i} className="flex gap-2 text-caption"><span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>{v}</li>
            ))}
          </ul>
        </FBlock>
      </div>

      {/* 6. 경계 2×2 */}
      <div className="w-full grid grid-cols-2 gap-3">
        <FBlock>
          <Label>특히 조심하세요</Label>
          <ul className="mt-2 space-y-2">{c.warningEmotions.map((w, i) => <li key={i} className="flex gap-2 text-caption"><span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>{w}</li>)}</ul>
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
                <p className="font-medium text-sm mb-1" style={{ color: 'rgba(255,255,255,0.80)' }}>{p.title}</p>
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
                <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>·</span>{b}
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
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{constitutions[key].name}</p>
            </Link>
          ))}
        </div>
        <Link href="/onboarding" className="pill-block w-full justify-center">처음부터 다시 하기</Link>
      </div>

      {/* 출처 */}
      <p className="text-center py-4 text-caption" style={{ color: 'rgba(255,255,255,0.20)', fontSize: '0.6875rem' }}>
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
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      color: 'rgba(255,255,255,0.55)',
      marginBottom: '0.75rem',
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
          className="px-2.5 py-1 rounded-full"
          style={{
            fontSize: '0.6875rem',
            border: '1px solid rgba(255,255,255,0.12)',
            color: color ?? 'rgba(255,255,255,0.38)',
            background: 'transparent',
            fontWeight: 400,
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
    <div className="rounded-[0.75rem] p-4 relative overflow-hidden" style={{ background: GRADIENTS[type], border: '1px solid rgba(255,255,255,0.15)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15), transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <p className="text-eyebrow mb-1" style={{ color: 'rgba(255,255,255,0.50)' }}>{label}</p>
        <p className="font-semibold text-sm text-white">{constitutions[type].name}</p>
        <p style={{ fontSize: '0.6875rem', opacity: 0.65, marginTop: '0.25rem', color: '#fff' }}>
          {label.includes('性') ? constitutions[type].nature.korean : constitutions[type].emotion.korean}
        </p>
      </div>
    </div>
  );
}

function SegBar({ pcts, primary }: { pcts: Record<ConstitutionKey, number>; primary: ConstitutionKey }) {
  const sorted = (Object.keys(pcts) as ConstitutionKey[]).sort((a, b) => pcts[b] - pcts[a]);
  return (
    <div className="w-full flex rounded-full overflow-hidden gap-px mt-3" style={{ height: '2px' }}>
      {sorted.map((key) => (
        <div key={key} style={{ width: `${pcts[key]}%`, background: key === primary ? GRADIENTS[key] : SOLID[key], opacity: key === primary ? 1 : 0.25, minWidth: pcts[key] > 0 ? '2px' : 0 }} />
      ))}
    </div>
  );
}

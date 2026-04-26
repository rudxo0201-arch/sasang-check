'use client';

import { ConstitutionContent, constitutions, ConstitutionKey } from '@/lib/constitutions';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ShareCard from '@/components/ShareCard';
import DownloadButton from '@/components/DownloadButton';
import { useAppStore } from '@/lib/store';
import {
  getAxisWinner,
  getStrengthTier,
  getPercentages,
  axisNarrative,
  axisEquanimousNarrative,
  isAxisEquanimous,
  StrengthTier,
} from '@/lib/scoring';

const otherKeys: Record<ConstitutionKey, ConstitutionKey[]> = {
  taeyang: ['soyang', 'taeeum', 'soeum'],
  soyang: ['taeyang', 'taeeum', 'soeum'],
  taeeum: ['taeyang', 'soyang', 'soeum'],
  soeum: ['taeyang', 'soyang', 'taeeum'],
};

function tierLabel(tier: StrengthTier, primaryName: string, secondaryName: string): string {
  switch (tier) {
    case 'typical': return `전형적인 ${primaryName}`;
    case 'leaning': return `${primaryName} 성향이 강합니다`;
    case 'mixed':   return `${primaryName} · ${secondaryName} 혼합형`;
  }
}

export default function ResultClient({ constitution: c }: { constitution: ConstitutionContent }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scores = useAppStore((s) => s.scores);
  const natureScores = useAppStore((s) => s.natureScores);
  const emotionScores = useAppStore((s) => s.emotionScores);
  const natureCount = useAppStore((s) => s.natureCount);
  const emotionCount = useAppStore((s) => s.emotionCount);
  const hasStoreData = mounted && scores !== null && natureScores !== null && emotionScores !== null;

  const tier = hasStoreData ? getStrengthTier(scores!) : null;
  const natureEquanimous = hasStoreData ? isAxisEquanimous(natureScores!, natureCount) : false;
  const emotionEquanimous = hasStoreData ? isAxisEquanimous(emotionScores!, emotionCount) : false;
  const natureWinner = hasStoreData && !natureEquanimous ? getAxisWinner(natureScores!, natureCount) : null;
  const emotionWinner = hasStoreData && !emotionEquanimous ? getAxisWinner(emotionScores!, emotionCount) : null;
  const percentages = hasStoreData ? getPercentages(scores!) : null;
  const showAxisCard = hasStoreData && natureWinner && (emotionWinner || emotionEquanimous);

  return (
    <main className="flex-1 flex flex-col items-center px-5 py-10 max-w-2xl mx-auto w-full">

      {/* 체질 발표 */}
      <div className="w-full text-center mb-10">
        <p className="text-sm tracking-widest mb-4" style={{ color: 'var(--ink-muted)' }}>
          당신의 사상체질은
        </p>
        <div
          className="inline-block rounded-3xl px-8 py-6 text-white mb-4"
          style={{ backgroundColor: c.hex }}
        >
          <div className="text-base opacity-75 mb-1">{c.hanja}</div>
          <div className="text-4xl font-black">{c.name}</div>
        </div>
        <p className="text-xl font-semibold mt-2" style={{ color: 'var(--ink)' }}>
          {c.oneLiner}
        </p>
      </div>

      {/* 강도 등급 뱃지 */}
      {tier && (
        <div className="w-full text-center mb-10">
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--ink-muted)' }}>
            결과 강도
          </p>
          <div
            className="inline-block px-7 py-3 rounded-full"
            style={{
              backgroundColor: c.hex,
              color: '#fdf8f1',
              boxShadow: `0 4px 14px ${c.hex}55`,
            }}
          >
            <span className="text-lg font-black tracking-wide">
              {tierLabel(tier.tier, c.name, constitutions[tier.secondary].name)}
            </span>
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--ink-muted)' }}>
            {tier.tier === 'typical' && `${c.name} 성향이 매우 뚜렷합니다 (${(tier.topShare * 100).toFixed(0)}%)`}
            {tier.tier === 'leaning' && `${c.name} 쪽으로 분명히 기울어 있습니다 (${(tier.topShare * 100).toFixed(0)}%)`}
            {tier.tier === 'mixed' && `여러 체질의 결이 섞여 있습니다 (1위 ${(tier.topShare * 100).toFixed(0)}%)`}
          </p>
        </div>
      )}

      {/* 네 체질의 분포 */}
      {percentages && (
        <>
          <Divider />
          <Section>
            <SectionLabel>네 체질의 분포</SectionLabel>
            <p className="mb-5 text-base" style={{ color: 'var(--ink-soft)' }}>
              당신의 답변이 네 체질에 어떻게 분포되어 있는지 보여드립니다.
            </p>
            <div className="space-y-3">
              {(Object.keys(percentages) as ConstitutionKey[])
                .sort((a, b) => percentages[b] - percentages[a])
                .map((key) => {
                  const oc = constitutions[key];
                  const pct = percentages[key];
                  const isPrimary = key === c.key;
                  return (
                    <div key={key}>
                      <div className="flex items-baseline justify-between mb-1">
                        <span
                          className="text-sm font-bold"
                          style={{ color: isPrimary ? oc.hex : 'var(--ink-soft)' }}
                        >
                          {oc.name}{isPrimary && ' ★'}
                        </span>
                        <span className="text-sm font-mono" style={{ color: 'var(--ink-muted)' }}>
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                      <div
                        className="w-full h-3 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--border)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            minWidth: '4px',
                            backgroundColor: oc.hex,
                            opacity: isPrimary ? 1 : 0.55,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </Section>
        </>
      )}

      <Divider />

      {/* 장부 대소 */}
      <Section>
        <SectionLabel>타고난 몸의 특징</SectionLabel>
        <p className="text-xl font-bold mb-3">
          {c.organBalance.korean} 체질입니다.
        </p>
        <p className="mb-5" style={{ color: 'var(--ink-soft)' }}>
          이것은 태어날 때부터 정해진 것입니다. 이 차이가 어떤 감정에 끌리고, 어떤 감정 앞에서 흔들리는지를 결정합니다.
        </p>
        <ul className="space-y-2">
          {c.bodyFeatures.map((f, i) => (
            <li key={i} className="flex gap-2" style={{ color: 'var(--ink-soft)' }}>
              <span>→</span><span>{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      {/* 끌리는 감정 vs 견디기 어려운 감정 */}
      <Section>
        <SectionLabel>두 가지 감정</SectionLabel>
        <div className="space-y-3">
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#f0ebe0' }}>
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--ink-muted)' }}>
              평소에 자연스럽게 나오는 감정
            </p>
            <p className="text-xl font-black mb-2">{c.preferredEmotion.name}</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {c.preferredEmotion.description}
            </p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#fce7e0' }}>
            <p className="text-xs font-bold mb-2" style={{ color: '#b91c1c' }}>
              이 감정 앞에서 흔들립니다
            </p>
            <p className="text-xl font-black mb-2">{c.difficultEmotion.name}</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {c.difficultEmotion.description}
            </p>
          </div>
        </div>
      </Section>

      {/* 당신의 性과 情 */}
      {showAxisCard && natureWinner && (
        <>
          <Divider />
          <Section>
            <SectionLabel>당신의 性과 情</SectionLabel>
            <p className="mb-5 text-base" style={{ color: 'var(--ink-soft)' }}>
              평소(性)와 자극받았을 때(情)의 당신은 같은 체질일 수도, 다른 체질일 수도 있습니다.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div
                className="rounded-2xl p-5 text-white"
                style={{ backgroundColor: constitutions[natureWinner.type].hex }}
              >
                <p className="text-xs font-bold tracking-widest opacity-75 mb-2">평소의 나 · 性</p>
                <p className="text-2xl font-black mb-1">{constitutions[natureWinner.type].name}</p>
                <p className="text-xs opacity-80">{constitutions[natureWinner.type].nature.korean}</p>
                {natureWinner.tied && (
                  <p className="text-xs opacity-60 mt-2">
                    {constitutions[natureWinner.type].name}와 {constitutions[natureWinner.tiedWith].name}이 거의 같은 비중입니다
                  </p>
                )}
              </div>
              {emotionEquanimous ? (
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: '#6b7c6e', color: '#fdf8f1' }}
                >
                  <p className="text-xs font-bold tracking-widest opacity-75 mb-2">자극받았을 때의 나 · 情</p>
                  <p className="text-2xl font-black mb-1">평정 (平靜)</p>
                  <p className="text-xs opacity-80">자극에 크게 동요하지 않습니다</p>
                </div>
              ) : emotionWinner ? (
                <div
                  className="rounded-2xl p-5 text-white"
                  style={{ backgroundColor: constitutions[emotionWinner.type].hex }}
                >
                  <p className="text-xs font-bold tracking-widest opacity-75 mb-2">자극받았을 때의 나 · 情</p>
                  <p className="text-2xl font-black mb-1">{constitutions[emotionWinner.type].name}</p>
                  <p className="text-xs opacity-80">{constitutions[emotionWinner.type].emotion.korean}</p>
                  {emotionWinner.tied && (
                    <p className="text-xs opacity-60 mt-2">
                      {constitutions[emotionWinner.type].name}와 {constitutions[emotionWinner.tiedWith].name}이 거의 같은 비중입니다
                    </p>
                  )}
                </div>
              ) : null}
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#f0ebe0' }}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                {emotionEquanimous
                  ? axisEquanimousNarrative(
                      natureWinner.type,
                      constitutions[natureWinner.type].name,
                    )
                  : emotionWinner
                  ? axisNarrative(
                      natureWinner.type,
                      emotionWinner.type,
                      constitutions[natureWinner.type].name,
                      constitutions[emotionWinner.type].name,
                      constitutions[emotionWinner.type].lifeTask,
                    )
                  : ''}
              </p>
            </div>
          </Section>
        </>
      )}

      <Divider />

      {/* 인지 스타일 + 이미지 */}
      <Section>
        <SectionLabel>당신이 사람을 볼 때</SectionLabel>
        <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
          {c.cognitionStyle}
        </p>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {c.naturalImage}
        </p>
      </Section>

      <Divider />

      {/* 성정 */}
      <Section>
        <SectionLabel>평소와 자극받았을 때</SectionLabel>
        <div className="space-y-4">
          <div>
            <span
              className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: '#f0ebe0', color: 'var(--ink-soft)' }}
            >
              평소의 당신
            </span>
            <p className="font-bold text-lg mb-1">{c.nature.korean}</p>
            <p style={{ color: 'var(--ink-soft)' }}>{c.nature.explanation}</p>
          </div>
          <div>
            <span
              className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: '#fce7e0', color: '#b91c1c' }}
            >
              자극받았을 때의 당신
            </span>
            <p className="font-bold text-lg mb-1">{c.emotion.korean}</p>
            <p style={{ color: 'var(--ink-soft)' }}>{c.emotion.explanation}</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* "맞아맞아" 일상 묘사 */}
      <Section>
        <SectionLabel>이런 적 있지 않으셨나요?</SectionLabel>
        <ul className="space-y-4">
          {c.dailyBehaviors.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 text-lg flex-shrink-0">→</span>
              <p style={{ color: 'var(--ink-soft)' }}>{b}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      {/* 평생 과제 — 임팩트 최대 */}
      <Section>
        <SectionLabel>당신의 평생 과제</SectionLabel>
        <div
          className="rounded-3xl p-8 text-center"
          style={{ backgroundColor: 'var(--ink)', color: '#fdf8f1' }}
        >
          <p className="text-sm opacity-60 mb-3 tracking-widest">이제마 선생이 말씀하시길</p>
          <p className="text-2xl font-black mb-4">
            &ldquo;{c.lifeTask}&rdquo;
          </p>
          <p className="text-base opacity-80 leading-relaxed">{c.lifeTaskDesc}</p>
        </div>
      </Section>

      <Divider />

      {/* 경계해야 할 감정 */}
      <Section>
        <SectionLabel>특히 조심하세요</SectionLabel>
        <div className="space-y-3">
          {c.warningEmotions.map((w, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: '#fff8f0', border: '1px solid #fde8d0' }}>
              <p style={{ color: 'var(--ink-soft)' }}>{w}</p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* 빠지기 쉬운 함정 */}
      <Section>
        <SectionLabel>당신의 강점이 과해지면</SectionLabel>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {c.perils}
        </p>
      </Section>

      <Divider />

      {/* 다스리면 / 놓치면 */}
      <Section>
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ border: '2px solid var(--border)' }}>
            <div className="font-bold mb-2">✦ 다스리면</div>
            <p style={{ color: 'var(--ink-soft)' }}>{c.ifMastered}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#fff8f0' }}>
            <div className="font-bold mb-2">몸의 신호를 무시하면</div>
            <p style={{ color: 'var(--ink-soft)' }}>{c.ifNeglected}</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* 성정 관리법 */}
      <Section>
        <SectionLabel>오늘부터 할 수 있는 것</SectionLabel>
        <div className="space-y-4">
          {c.emotionPractices.map((p, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ border: '2px solid var(--border)' }}>
              <div className="font-bold text-lg mb-2">
                {i + 1}. {p.title}
              </div>
              <p style={{ color: 'var(--ink-soft)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* 건강 관리법 */}
      <Section>
        <SectionLabel>이것이 곧 건강 관리법입니다</SectionLabel>
        <div className="space-y-5">
          <div>
            <h3 className="mb-3">주의해야 할 신체 신호</h3>
            <ul className="space-y-2" style={{ color: 'var(--ink-soft)' }}>
              {c.vulnerableConditions.map((v, i) => (
                <li key={i} className="flex gap-2"><span>·</span><span>{v}</span></li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#f0ebe0' }}>
              <h3 className="mb-2">잘 맞는 음식</h3>
              <p className="text-base" style={{ color: 'var(--ink-soft)' }}>{c.foods.good.join(', ')}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#fce7e0' }}>
              <h3 className="mb-2">조심할 음식</h3>
              <p className="text-base" style={{ color: 'var(--ink-soft)' }}>{c.foods.avoid.join(', ')}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2">맞는 운동</h3>
            <p style={{ color: 'var(--ink-soft)' }}>{c.exercises.join(' · ')}</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* 공유 카드 */}
      <Section>
        <SectionLabel>결과 카드 저장·공유</SectionLabel>
        <ShareCard ref={cardRef} constitution={c} />
        <div className="mt-5 space-y-3">
          <DownloadButton cardRef={cardRef} constitutionName={c.name} />
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `나는 ${c.name} — 사상체질 건강체크`,
                  text: `${c.oneLiner} | 평생 과제: ${c.lifeTask}`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }
            }}
            className="w-full rounded-2xl py-4 text-lg font-bold border-2 transition-colors hover:bg-black/5"
            style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}
          >
            링크 공유하기
          </button>
        </div>
      </Section>

      {/* 다른 체질 미니 카드 */}
      <Divider />
      <Section>
        <SectionLabel>배우자·가족도 해보세요</SectionLabel>
        <p className="mb-5" style={{ color: 'var(--ink-soft)' }}>
          두 사람의 체질이 만나면 어떤 케미가 펼쳐질지 궁금하지 않으신가요?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {otherKeys[c.key].map((key) => {
            const oc = constitutions[key];
            return (
              <Link
                key={key}
                href={`/result/${key}`}
                className="rounded-2xl p-3 text-white text-center transition-opacity hover:opacity-90"
                style={{ backgroundColor: oc.hex }}
              >
                <div className="text-xs opacity-70">{oc.hanja}</div>
                <div className="font-bold">{oc.name}</div>
              </Link>
            );
          })}
        </div>
        <Link
          href="/onboarding"
          className="mt-5 w-full flex items-center justify-center rounded-2xl py-4 text-lg font-bold border-2 transition-colors hover:bg-black/5"
          style={{ borderColor: 'var(--border)', color: 'var(--ink-soft)' }}
        >
          처음부터 다시 하기
        </Link>
      </Section>

      {/* 출처 */}
      <Divider />
      <div className="w-full text-center text-sm space-y-2" style={{ color: 'var(--ink-muted)' }}>
        <p className="italic">{c.classicQuoteKorean}</p>
        <p className="text-xs mt-4">
          이 결과는 의학적 진단이 아닌 자가 참고용 분석입니다.
          정확한 체질 판별과 치료는 한의사 진료가 필요합니다.
        </p>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="w-full mb-2">{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold tracking-widest mb-4" style={{ color: 'var(--ink-muted)' }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div className="w-full border-t my-8" style={{ borderColor: 'var(--border)' }} />;
}

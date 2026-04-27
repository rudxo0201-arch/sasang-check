'use client';

import { BaseResultContent, SourceNote } from '@/lib/engine/types';
import Link from 'next/link';
import { useRef } from 'react';
import ShareCard from '@/components/ShareCard';
import DownloadButton from '@/components/DownloadButton';

interface Props {
  content: BaseResultContent;
  checkId: string;
  checkTitle: string;
  disclaimer?: string;
  references?: SourceNote['references'];
  resultKey: string;
  otherResults: { key: string; content: BaseResultContent }[];
}

export default function GenericResultClient({
  content: c,
  checkId,
  checkTitle,
  disclaimer,
  references,
  resultKey,
  otherResults,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex-1 flex flex-col items-center px-5 sm:px-8 py-10 max-w-2xl mx-auto w-full gap-3">

      {/* 히어로 */}
      <div className="w-full rounded-[1rem] p-8" style={{ background: '#ffffff', boxShadow: '0 0 40px 8px rgba(255,255,255,0.12)' }}>
        <p className="text-eyebrow mb-5" style={{ color: 'rgba(0,0,0,0.45)' }}>{checkTitle} — 나의 경향은</p>
        {c.hanja && (
          <p style={{ fontSize: '1.0625rem', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 400, color: 'rgba(0,0,0,0.45)' }}>{c.hanja}</p>
        )}
        <p className="text-display mb-4" style={{ color: '#111111' }}>{c.name}</p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'rgba(0,0,0,0.60)' }}>{c.oneLiner}</p>
      </div>

      {/* 음식 + 운동 */}
      {(c.foods || c.exercises) && (
        <div className="w-full grid grid-cols-2 gap-3">
          {c.foods && (
            <>
              <FBlock>
                <Label>도움이 되는 음식</Label>
                <Tags items={c.foods.good} />
              </FBlock>
              <FBlock>
                <Label>조심할 음식</Label>
                <Tags items={c.foods.avoid} />
              </FBlock>
            </>
          )}
          {c.exercises && (
            <FBlock className="col-span-2">
              <Label>권장 운동</Label>
              <ul className="mt-2 space-y-1">
                {c.exercises.map((e) => (
                  <li key={e} className="text-caption leading-relaxed" style={{ paddingLeft: '1em', textIndent: '-1em' }}>· {e}</li>
                ))}
              </ul>
            </FBlock>
          )}
        </div>
      )}

      {/* 주의 */}
      {c.warnings && c.warnings.length > 0 && (
        <FBlock className="w-full">
          <Label>주의할 것들</Label>
          <ul className="mt-2 space-y-2">
            {c.warnings.map((w, i) => (
              <li key={i} className="flex gap-2 text-caption"><span style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>{w}</li>
            ))}
          </ul>
        </FBlock>
      )}

      {/* 인용 */}
      {c.classicQuote && (
        <FBlock className="w-full text-center">
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>&ldquo;{c.classicQuote}&rdquo;</p>
        </FBlock>
      )}

      {/* 공유 */}
      <div className="w-full">
        <ShareCard ref={cardRef} constitution={c} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <DownloadButton cardRef={cardRef} constitutionName={c.name} gradient={c.hex} />
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

      {/* 다른 결과 */}
      {otherResults.length > 0 && (
        <div className="w-full pt-2">
          <p className="text-eyebrow text-center mb-3">다른 결과도 확인해보세요</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {otherResults.map(({ key, content: oc }) => (
              <Link key={key} href={`/check/${checkId}/result/${key}`} className="rounded-[0.75rem] p-4 text-center floating-block transition-opacity hover:opacity-80">
                {oc.hanja && <p className="text-eyebrow mb-1">{oc.hanja}</p>}
                <p className="font-medium" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>{oc.name}</p>
              </Link>
            ))}
          </div>
          <Link href={`/check/${checkId}`} className="pill-block w-full justify-center">처음부터 다시 하기</Link>
        </div>
      )}

      <div className="w-full">
        <Link href="/" className="pill-block w-full justify-center">다른 건강체크도 해보기</Link>
      </div>

      {/* 출처 */}
      {(references || disclaimer) && (
        <p className="text-center py-4" style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.40)' }}>
          {references?.map((r) => r.work).join(' · ')}<br />
          {disclaimer}
        </p>
      )}
    </main>
  );
}

function FBlock({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`floating-block ${className}`}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.88)', marginBottom: '0.875rem' }}>
      {children}
    </p>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1 rounded-full"
          style={{ fontSize: '1rem', border: '1px solid rgba(255,255,255,0.40)', color: 'rgba(255,255,255,0.80)', background: 'transparent', fontWeight: 500 }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

import Link from 'next/link';
import { getLiveChecks } from '@/lib/checks';

export default function HubPage() {
  const checks = getLiveChecks();

  return (
    <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-14 py-14">

      {/* 히어로 */}
      <div className="mb-8 mt-16">
        <span style={{
          fontSize: '0.875rem',
          letterSpacing: '0.06em',
          fontWeight: 800,
          background: '#ffffff',
          color: '#111111',
          borderRadius: '999px',
          padding: '0.3em 0.9em',
          display: 'inline-block',
          marginBottom: '1rem',
        }}>한의 건강체크</span>
        <h1 className="text-display">
          건강 셀프체크
        </h1>
      </div>

      <div className="mb-14" style={{ maxWidth: '28rem' }}>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)' }}>
          MBTI처럼, 재미로 하되 의미는 있는 한의학 건강체크.
          꾸준히 쌓아가는 나만의 건강 기록.
        </p>
      </div>

      <div className="w-full mb-10" style={{ height: '1px', background: 'rgba(255,255,255,0.10)' }} />

      {/* 체크리스트 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {checks.map((check) => (
          <Link
            key={check.id}
            href={`/check/${check.id}`}
            className="floating-block group flex flex-col gap-3 transition-all hover:border-white/30"
            style={{ padding: '1.75rem' }}
          >
            <div>
              {check.hubCard.hanja && (
                <p style={{ fontSize: '0.875rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', marginBottom: '0.375rem' }}>
                  {check.hubCard.hanja}
                </p>
              )}
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: '0.5rem' }}>
                {check.hubCard.title}
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.52)' }}>
                {check.hubCard.subtitle}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
                약 {check.hubCard.estimatedMinutes}분 · {check.questions.length}문항
              </span>
              <span
                className="opacity-0 group-hover:opacity-60 transition-opacity"
                style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.70)' }}
              >
                시작 →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 하단 */}
      <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.38)' }}>
          MBTI처럼, 정답이 아니라 경향입니다. 진료를 대체하지 않아요.
        </p>
      </div>
    </main>
  );
}

import Link from 'next/link';

/* 소음=흰, 소양=연회, 태음=진회, 태양=검정 */
const CARDS = [
  { name: '소음인', hanja: '少陰人', task: '기쁨의 기복을 다스리는 사람',
    bg: '#484848', glow: '0 0 20px 4px rgba(255,255,255,0.05)',
    textMain: 'rgba(255,255,255,0.92)', textSub: 'rgba(255,255,255,0.52)' },
  { name: '소양인', hanja: '少陽人', task: '슬픔을 다스리는 사람',
    bg: '#333333', glow: '0 0 14px 3px rgba(200,200,200,0.04)',
    textMain: 'rgba(255,255,255,0.92)', textSub: 'rgba(255,255,255,0.52)' },
  { name: '태음인', hanja: '太陰人', task: '탐닉을 다스리는 사람',
    bg: '#222222', glow: '0 0 12px 2px rgba(100,100,100,0.04)',
    textMain: 'rgba(255,255,255,0.92)', textSub: 'rgba(255,255,255,0.52)' },
  { name: '태양인', hanja: '太陽人', task: '분노를 다스리는 사람',
    bg: '#080808', glow: '0 0 12px 2px rgba(255,255,255,0.03)',
    textMain: 'rgba(255,255,255,0.92)', textSub: 'rgba(255,255,255,0.52)' },
];

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-14 py-14">

      {/* 히어로 그룹 */}
      <div className="mb-10 mt-16">
        <span style={{
          fontSize: '0.875rem',
          letterSpacing: '0.06em',
          fontWeight: 800,
          background: '#ffffff',
          color: '#111111',
          borderRadius: '999px',
          padding: '0.3em 0.9em',
          display: 'inline-block',
          marginBottom: '0.75rem',
        }}>이제마의 사상의학</span>
        <h1 className="text-display whitespace-nowrap">
          사상체질 건강체크
        </h1>
      </div>

      {/* 서브텍스트 */}
      <div className="flex justify-start mb-16">
        <div style={{ maxWidth: '26rem' }} className="text-left">
          <p className="mb-4 leading-relaxed" style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
            사람마다 태어날 때부터 장부의 크고 작음이 다릅니다.
            이제마 선생은 이것을 다스리는 것이 평생의 수양이자 건강의 근본이라 했습니다.
          </p>
          <p style={{ fontSize: '1.125rem', letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.45)' }}>
            태양인 · 소양인 · 태음인 · 소음인
          </p>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full mb-10" style={{ height: '1px', background: 'rgba(255,255,255,0.10)' }} />

      {/* 체질 카드 — white-block 스타일 + 체질 컬러 배경 */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        {CARDS.map((c) => (
          <div
            key={c.name}
            className="rounded-[1rem] p-6 text-white relative overflow-hidden"
            style={{
              background: 'transparent',
              boxShadow: c.glow,
              border: '2px solid rgba(255,255,255,0.85)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                <p style={{ fontSize: '1rem', letterSpacing: '0.18em', textTransform: 'uppercase', position: 'relative', color: c.textSub, lineHeight: 1, marginBottom: '4px', transform: 'translateY(10px)' }}>
                  {c.hanja}
                </p>
                <p style={{ fontSize: '1.875rem', fontWeight: 700, position: 'relative', color: c.textMain }}>{c.name}</p>
              </div>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, position: 'relative', color: c.textSub }}>{c.task}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-end">
        <Link
          href="/onboarding"
          className="pill-block"
          style={{ color: 'rgba(255,255,255,0.80)' }}
        >
          나의 체질 알아보기
          <span style={{ fontSize: '1rem', opacity: 0.6 }}>→</span>
        </Link>
      </div>

      {/* 하단 */}
      <div className="mt-16 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
          * 이 결과는 의학적 진단이 아닌 자가 참고용 분석입니다. 정확한 체질 판별과 치료는 한의사 진료가 필요합니다.
        </p>
      </div>
    </main>
  );
}

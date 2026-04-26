import Link from 'next/link';

const CARDS = [
  { name: '태양인', hanja: '太陽人', task: '분노를 다스리는 사람', gradient: 'linear-gradient(135deg, #2d5f9e 0%, #5d97c8 50%, #a8cce4 100%)', glow: '0 0 40px 8px rgba(93,151,200,0.35), 0 0 80px 16px rgba(93,151,200,0.15)' },
  { name: '소양인', hanja: '少陽人', task: '슬픔을 다스리는 사람',  gradient: 'linear-gradient(135deg, #b86d2e 0%, #d9954e 50%, #f0c07a 100%)', glow: '0 0 40px 8px rgba(217,149,78,0.35),  0 0 80px 16px rgba(217,149,78,0.15)' },
  { name: '태음인', hanja: '太陰人', task: '탐닉을 다스리는 사람',  gradient: 'linear-gradient(135deg, #2a2724 0%, #56504a 50%, #9c9288 100%)', glow: '0 0 40px 8px rgba(156,146,136,0.28), 0 0 80px 16px rgba(156,146,136,0.10)' },
  { name: '소음인', hanja: '少陰人', task: '기쁨의 기복을 다스리는 사람', gradient: 'linear-gradient(135deg, #18542f 0%, #2e7d50 50%, #52a876 100%)', glow: '0 0 40px 8px rgba(82,168,118,0.35),  0 0 80px 16px rgba(82,168,118,0.15)' },
];

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-14 py-14">

      {/* eyebrow */}
      <div className="flex justify-between items-baseline mb-16">
        <p className="text-eyebrow">사상의학</p>
        <p className="text-eyebrow">이제마 성정론 기반</p>
      </div>

      {/* 히어로 */}
      <div className="mb-10">
        <h1 className="text-display">
          사상체질<br />건강체크
        </h1>
      </div>

      {/* 서브텍스트 — 우측 */}
      <div className="flex justify-end mb-16">
        <div style={{ maxWidth: '26rem' }} className="text-right">
          <p className="mb-4 leading-relaxed" style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
            사람마다 태어날 때부터 장부의 크고 작음이 다릅니다.
            이제마 선생은 이것을 다스리는 것이 평생의 수양이자 건강의 근본이라 했습니다.
          </p>
          <p style={{ fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.30)' }}>
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
              background: c.gradient,
              boxShadow: c.glow,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* inner highlight */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 55%)',
                pointerEvents: 'none',
              }}
            />
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.18em', opacity: 0.55, textTransform: 'uppercase', marginBottom: '0.75rem', position: 'relative' }}>
              {c.hanja}
            </p>
            <p style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.375rem', position: 'relative' }}>{c.name}</p>
            <p style={{ fontSize: '0.75rem', opacity: 0.70, lineHeight: 1.5, position: 'relative' }}>{c.task}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}>
          소요 시간 약 5분 · 광고 없음 · 회원가입 불필요
        </p>
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
        <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.02em' }}>
          이 결과는 의학적 진단이 아닌 자가 참고용 분석입니다. 정확한 체질 판별과 치료는 한의사 진료가 필요합니다.
        </p>
      </div>
    </main>
  );
}

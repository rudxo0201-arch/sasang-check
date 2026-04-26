import Link from 'next/link';

const constitutionCards = [
  { name: '태양인', hanja: '太陽人', bg: '#1d4ed8', task: '분노를 다스리는 사람' },
  { name: '소양인', hanja: '少陽人', bg: '#dc2626', task: '슬픔을 다스리는 사람' },
  { name: '태음인', hanja: '太陰人', bg: '#57534e', task: '탐닉을 다스리는 사람' },
  { name: '소음인', hanja: '少陰人', bg: '#047857', task: '기쁨의 기복을 다스리는 사람' },
];

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center px-5 py-12 max-w-2xl mx-auto w-full">

      {/* 상단 */}
      <div className="text-center mb-10">
        <p className="text-sm tracking-widest mb-3" style={{ color: 'var(--ink-muted)' }}>
          이제마 『동의수세보원』 성정론 기반
        </p>
        <h1 className="mb-4">
          사상체질<br />건강체크
        </h1>
        <p className="text-lg" style={{ color: 'var(--ink-soft)' }}>
          당신의 몸과 마음 사용 설명서
        </p>
      </div>

      <div className="w-12 border-t-2 mb-10" style={{ borderColor: 'var(--ink-muted)' }} />

      {/* 소개 문구 */}
      <div className="w-full space-y-5 mb-10 text-lg" style={{ color: 'var(--ink-soft)' }}>
        <p>
          사람마다 태어날 때부터{' '}
          <strong style={{ color: 'var(--ink)' }}>장부(臟腑)의 크고 작음</strong>이 다릅니다.
          그 차이가 어떤 감정에 끌리고, 어떤 감정 앞에서 무너지는지를 결정합니다.
        </p>
        <p>
          이제마 선생은 이것을 다스리는 것이{' '}
          <strong style={{ color: 'var(--ink)' }}>평생의 수양이자 건강의 근본</strong>이라 했습니다.
        </p>
        <p>
          단순한 성격 테스트가 아닙니다.{' '}
          <strong style={{ color: 'var(--ink)' }}>당신의 체질에 맞는 삶의 방식</strong>을 알려드립니다.
        </p>
      </div>

      {/* 체질 카드 4개 */}
      <div className="w-full grid grid-cols-2 gap-3 mb-10">
        {constitutionCards.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl p-4 text-white"
            style={{ backgroundColor: c.bg }}
          >
            <div className="text-xs opacity-70 mb-1">{c.hanja}</div>
            <div className="font-bold text-xl">{c.name}</div>
            <div className="text-sm opacity-90 mt-2 leading-snug">{c.task}</div>
          </div>
        ))}
      </div>

      {/* 시작 버튼 */}
      <Link
        href="/onboarding"
        className="w-full flex items-center justify-center rounded-2xl py-5 text-xl font-bold text-white transition-opacity hover:opacity-90 active:opacity-75"
        style={{ backgroundColor: 'var(--ink)' }}
      >
        나의 체질 알아보기
      </Link>

      <p className="mt-5 text-sm text-center" style={{ color: 'var(--ink-muted)' }}>
        소요 시간 약 5분 · 회원가입 불필요
      </p>

      {/* 주의사항 */}
      <p className="mt-12 text-xs text-center leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
        이 결과는 의학적 진단이 아닌 사상의학 성정론에 기반한 자가 참고용 분석입니다.
        정확한 체질 판별과 치료는 한의사 진료가 필요합니다.
      </p>
    </main>
  );
}

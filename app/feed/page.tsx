import Link from 'next/link';

export const metadata = {
  title: '건강 정보 — 건강 셀프체크',
  description: '한의학 기반 건강 정보를 가볍게 읽어보세요.',
};

const PLACEHOLDER_ARTICLES = [
  {
    slug: 'sasang-intro',
    title: '사상체질이란 무엇인가',
    subtitle: '이제마의 사상의학 — MBTI처럼 이해하기',
    date: '2026-04',
  },
];

export default function FeedPage() {
  return (
    <main className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-8 py-14">

      <div className="mb-10 mt-8">
        <p className="text-eyebrow mb-4">건강 정보</p>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
          꾸준히 올라오는 건강 이야기
        </h1>
      </div>

      <div className="space-y-3">
        {PLACEHOLDER_ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/feed/${a.slug}`}
            className="floating-block flex flex-col gap-2"
            style={{ padding: '1.5rem' }}
          >
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'rgba(255,255,255,0.90)' }}>{a.title}</p>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.52)' }}>{a.subtitle}</p>
            <p className="text-eyebrow">{a.date}</p>
          </Link>
        ))}

        <div
          className="floating-block flex flex-col gap-2 opacity-40"
          style={{ padding: '1.5rem' }}
        >
          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'rgba(255,255,255,0.90)' }}>한열변증 — 내 몸은 차가운가, 따뜻한가</p>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.52)' }}>준비 중</p>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/" className="pill-block" style={{ color: 'rgba(255,255,255,0.60)' }}>
          ← 건강체크 홈으로
        </Link>
      </div>
    </main>
  );
}

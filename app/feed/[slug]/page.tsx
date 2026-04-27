import { notFound } from 'next/navigation';
import Link from 'next/link';

const ARTICLES: Record<string, { title: string; content: string; date: string }> = {
  'sasang-intro': {
    title: '사상체질이란 무엇인가',
    date: '2026-04',
    content: `
# 사상체질이란 무엇인가

19세기 조선의 의학자 이제마(李濟馬)는 사람마다 **태어날 때부터 장부(臟腑)의 크고 작음이 다르다**는 사실을 발견했습니다. 이를 바탕으로 사람을 네 가지 체질 — 태양인(太陽人), 소양인(少陽人), 태음인(太陰人), 소음인(少陰人) — 으로 나눈 것이 바로 **사상의학(四象醫學)**입니다.

## MBTI와의 공통점

사상체질은 MBTI처럼 "나는 이 타입이니까 무조건 이래야 한다"는 규범이 아닙니다. **경향(傾向)**입니다.

같은 소양인이라도 살아온 환경, 나이, 건강 상태에 따라 다르게 나타납니다. 중요한 것은 자신의 강점과 약점을 이해하고, 그 방향으로 조화를 이루는 것입니다.

## 네 가지 체질

- **태양인(太陽人)**: 폐가 크고 간이 작습니다. 세상을 향해 뻗어나가는 에너지, 불의 앞에서 참지 못하는 분노.
- **소양인(少陽人)**: 비장이 크고 신장이 작습니다. 활기차게 앞에 나서는 에너지, 배신 앞에서 터지는 서러움.
- **태음인(太陰人)**: 간이 크고 폐가 작습니다. 묵묵히 쌓아가는 에너지, 좋아하는 것 앞에서 멈추지 못하는 탐닉.
- **소음인(少陰人)**: 신장이 크고 비장이 작습니다. 깊고 안정된 에너지, 좋은 일 앞에서 갑자기 들뜨는 기쁨.

이제마 선생은 이 네 가지 **평생 과제(情)를 다스리는 것**이 건강과 수양의 근본이라 했습니다.

---

*참고: 동의수세보원(東醫壽世保元), 이제마*
    `.trim(),
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const paragraphs = article.content.split('\n').filter(Boolean);

  return (
    <main className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-8 py-14">

      <div className="mb-10 mt-8">
        <p className="text-eyebrow mb-4">{article.date}</p>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)', lineHeight: 1.35 }}>
          {article.title}
        </h1>
      </div>

      <div className="space-y-4" style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.70)' }}>
        {paragraphs.map((p, i) => {
          if (p.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)', marginTop: '1.5rem' }}>{p.slice(3)}</h2>;
          if (p.startsWith('# ')) return <h1 key={i} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{p.slice(2)}</h1>;
          if (p.startsWith('---')) return <hr key={i} style={{ borderColor: 'rgba(255,255,255,0.12)', margin: '1.5rem 0' }} />;
          if (p.startsWith('*')) return <p key={i} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.40)', fontStyle: 'italic' }}>{p.slice(1, -1)}</p>;
          if (p.startsWith('- **')) {
            const match = p.match(/^- \*\*(.+?)\*\*: (.+)$/);
            if (match) return <p key={i}>· <strong style={{ color: 'rgba(255,255,255,0.88)' }}>{match[1]}</strong>: {match[2]}</p>;
          }
          return <p key={i}>{p}</p>;
        })}
      </div>

      <div className="mt-14 space-y-3">
        <Link href="/check/sasang" className="white-block inline-block px-8 py-3 font-semibold" style={{ fontSize: '1rem' }}>
          사상체질 체크해보기 →
        </Link>
        <div>
          <Link href="/feed" className="pill-block" style={{ color: 'rgba(255,255,255,0.60)' }}>
            ← 글 목록
          </Link>
        </div>
      </div>
    </main>
  );
}

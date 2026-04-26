import { ImageResponse } from 'next/og';
import { constitutions, ConstitutionKey } from '@/lib/constitutions';

export const runtime = 'edge';

const validKeys: ConstitutionKey[] = ['taeyang', 'soyang', 'taeeum', 'soeum'];

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  if (!validKeys.includes(type as ConstitutionKey)) {
    return new Response('Not found', { status: 404 });
  }

  const c = constitutions[type as ConstitutionKey];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: c.hex,
          padding: '60px 72px',
          color: '#fff',
        }}
      >
        {/* 상단 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 22, opacity: 0.65, letterSpacing: '0.15em', marginBottom: 20 }}>
            사상체질 건강체크
          </p>
          <p style={{ fontSize: 20, opacity: 0.7, marginBottom: 8 }}>{c.hanja}</p>
          <p style={{ fontSize: 88, fontWeight: 900, lineHeight: 1 }}>{c.name}</p>
        </div>

        {/* 중간 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 28, opacity: 0.85, lineHeight: 1.5, marginBottom: 32 }}>
            {c.oneLiner}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(255,255,255,0.35)',
              paddingTop: 28,
            }}
          >
            <p style={{ fontSize: 18, opacity: 0.65, letterSpacing: '0.15em', marginBottom: 12 }}>
              평생 과제
            </p>
            <p style={{ fontSize: 38, fontWeight: 800 }}>
              &ldquo;{c.lifeTask}&rdquo;를 다스리는 것
            </p>
          </div>
        </div>

        {/* 하단 */}
        <p style={{ fontSize: 16, opacity: 0.45 }}>
          {c.classicQuote} — 이제마 『동의수세보원』
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

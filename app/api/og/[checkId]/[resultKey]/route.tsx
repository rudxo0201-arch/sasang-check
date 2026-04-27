import { ImageResponse } from 'next/og';
import { getResultContent, getCheck } from '@/lib/checks';

export const runtime = 'edge';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ checkId: string; resultKey: string }> },
) {
  const { checkId, resultKey } = await params;

  const check = getCheck(checkId);
  const content = getResultContent(checkId, resultKey);

  if (!check || !content) {
    return new Response('Not found', { status: 404 });
  }

  const bgColor = content.hex ?? '#111111';
  const isLight = bgColor.startsWith('#b') || bgColor.startsWith('#c') || bgColor.startsWith('#d') || bgColor.startsWith('#e') || bgColor.startsWith('#f');
  const textColor = isLight ? '#111111' : '#ffffff';
  const subColor = isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.65)';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          padding: '60px 72px',
          color: textColor,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 22, opacity: 0.65, letterSpacing: '0.15em', marginBottom: 20, color: subColor }}>
            {check.meta.title}
          </p>
          {content.hanja && (
            <p style={{ fontSize: 20, opacity: 0.7, marginBottom: 8, color: subColor }}>{content.hanja}</p>
          )}
          <p style={{ fontSize: 88, fontWeight: 900, lineHeight: 1, color: textColor }}>{content.name}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 28, lineHeight: 1.5, marginBottom: 32, color: subColor }}>
            {content.oneLiner}
          </p>
          {content.lifeTask && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.35)'}`,
                paddingTop: 28,
              }}
            >
              <p style={{ fontSize: 18, opacity: 0.65, letterSpacing: '0.15em', marginBottom: 12, color: subColor }}>
                평생 과제
              </p>
              <p style={{ fontSize: 38, fontWeight: 800, color: textColor }}>
                &ldquo;{content.lifeTask}&rdquo;
              </p>
            </div>
          )}
        </div>

        <p style={{ fontSize: 16, opacity: 0.45, color: subColor }}>
          건강 셀프체크 · MBTI처럼, 정답이 아니라 경향입니다
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

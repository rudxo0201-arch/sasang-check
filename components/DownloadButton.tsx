'use client';

import { RefObject, useState } from 'react';

export default function DownloadButton({
  cardRef,
  constitutionName,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  constitutionName: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!cardRef.current) return;
    setLoading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `사상체질_${constitutionName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
      alert('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="w-full rounded-2xl py-4 text-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      {loading ? '이미지 생성 중...' : '카드 이미지 저장하기'}
    </button>
  );
}

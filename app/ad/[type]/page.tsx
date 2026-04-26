'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const COUNTDOWN = 5;

export default function AdPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  const [seconds, setSeconds] = useState(COUNTDOWN);

  useEffect(() => {
    if (seconds <= 0) {
      router.replace(`/result/${type}`);
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, router, type]);

  return (
    <main className="flex-1 flex flex-col items-center justify-between px-5 py-10 max-w-2xl mx-auto w-full">

      <div className="w-full text-center pt-4">
        <p className="text-sm tracking-widest mb-2" style={{ color: 'var(--ink-muted)' }}>
          결과를 준비하는 중
        </p>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>
          잠시 후 결과가 공개됩니다
        </h2>
      </div>

      {/* 광고 영역 — 여기에 애드센스/애드핏 코드를 삽입하세요 */}
      <div
        className="w-full flex items-center justify-center rounded-2xl my-8"
        style={{
          minHeight: '250px',
          border: '1.5px dashed var(--border)',
          backgroundColor: '#f9f6f0',
          color: 'var(--ink-muted)',
          fontSize: '13px',
        }}
      >
        {/* 아래 주석을 제거하고 실제 광고 코드를 넣으세요 */}
        {/* 카카오 애드핏 예시:
        <ins className="kakao_ad_area"
          data-ad-unit="DAN-YOUR-UNIT-ID"
          data-ad-width="320"
          data-ad-height="100" />
        */}
        광고 영역
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button
          onClick={() => router.replace(`/result/${type}`)}
          className="w-full rounded-2xl py-5 text-xl font-bold text-white transition-opacity hover:opacity-90 active:opacity-75"
          style={{ backgroundColor: 'var(--ink)' }}
        >
          결과 보기 ({seconds})
        </button>
        <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
          {seconds}초 후 자동으로 이동합니다
        </p>
      </div>

    </main>
  );
}

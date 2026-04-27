'use client';

import { RefObject, useState } from 'react';

async function renderButtonPng(text: string): Promise<string> {
  const { toPng } = await import('html-to-image');

  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    border-radius: 9999px;
    background: #ffffff;
    color: #111111;
    font-family: var(--font-pretendard), 'Apple SD Gothic Neo', sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
  `;
  el.textContent = text;
  document.body.appendChild(el);

  try {
    return await toPng(el, { pixelRatio: 2, cacheBust: true, backgroundColor: 'transparent' });
  } finally {
    document.body.removeChild(el);
  }
}

export default function ResultExportButtons({
  mainRef,
  constitutionName,
}: {
  mainRef: RefObject<HTMLElement | null>;
  constitutionName: string;
}) {
  const [imgLoading, setImgLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  async function handleImage() {
    if (!mainRef.current) return;
    setImgLoading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(mainRef.current, {
        pixelRatio: 2,
        backgroundColor: '#030303',
        cacheBust: true,
      });
      const a = document.createElement('a');
      a.download = `사상체질_${constitutionName}_전체결과.png`;
      a.href = dataUrl;
      a.click();
    } catch (e) {
      console.error(e);
      alert('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setImgLoading(false);
    }
  }

  async function handlePdf() {
    if (!mainRef.current) return;
    setPdfLoading(true);
    try {
      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const dataUrl = await toPng(mainRef.current, {
        pixelRatio: 2,
        backgroundColor: '#030303',
        cacheBust: true,
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((r) => { img.onload = () => r(); });

      const pageWidthMm = 210;
      const imgHeightMm = (img.height / img.width) * pageWidthMm;
      const ctaHeightMm = 28;
      const pageHeightMm = imgHeightMm + ctaHeightMm;

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [pageWidthMm, pageHeightMm] });

      pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidthMm, imgHeightMm);

      // CTA 영역 배경
      pdf.setFillColor(3, 3, 3);
      pdf.rect(0, imgHeightMm, pageWidthMm, ctaHeightMm, 'F');

      // 버튼 PNG 생성 (한글 렌더링을 위해 DOM 캡처 방식 사용)
      const btnDataUrl = await renderButtonPng('나도 해보기 →');
      const ctaUrl = `${window.location.origin}/onboarding`;

      const btnW = 70;
      const btnH = 14;
      const btnX = (pageWidthMm - btnW) / 2;
      const btnY = imgHeightMm + (ctaHeightMm - btnH) / 2;

      pdf.addImage(btnDataUrl, 'PNG', btnX, btnY, btnW, btnH);
      pdf.link(btnX, btnY, btnW, btnH, { url: ctaUrl });

      pdf.save(`사상체질_${constitutionName}_전체결과.pdf`);
    } catch (e) {
      console.error(e);
      alert('PDF 저장 중 오류가 발생했습니다.');
    } finally {
      setPdfLoading(false);
    }
  }

  const busy = imgLoading || pdfLoading;

  return (
    <>
      <button
        onClick={handleImage}
        disabled={busy}
        className="pill-block justify-center"
        style={{ width: '100%' }}
      >
        {imgLoading ? '저장 중…' : '이미지로 저장'}
      </button>
      <button
        onClick={handlePdf}
        disabled={busy}
        className="pill-block justify-center"
        style={{ width: '100%' }}
      >
        {pdfLoading ? '저장 중…' : 'PDF로 저장'}
      </button>
    </>
  );
}

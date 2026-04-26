import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '사상체질 건강체크 — 당신의 몸과 마음 사용 설명서',
  description: '이제마 『동의수세보원』의 성정론을 기반으로, 당신이 타고난 체질과 평생 다스려야 할 감정을 알려드립니다. 사상의학에 기반한 체질 건강 자가 체크.',
  openGraph: {
    title: '사상체질 건강체크',
    description: '당신의 평생 과제는 무엇입니까? — 이제마 성정론 기반 체질 건강체크',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`h-full ${pretendard.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

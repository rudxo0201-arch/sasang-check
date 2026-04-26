import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  weight: '45 920',
});

const gmarketSans = localFont({
  src: [
    {
      path: '../public/fonts/GmarketSansTTF/GmarketSansTTFBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/GmarketSansTTF/GmarketSansTTFMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/GmarketSansTTF/GmarketSansTTFLight.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-gmarket',
  display: 'swap',
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
    <html lang="ko" className={`h-full ${pretendard.variable} ${gmarketSans.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DZ5SFQWN9R" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DZ5SFQWN9R');
        `}</Script>
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

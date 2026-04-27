import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllChecks, getCheck } from '@/lib/checks';

export async function generateStaticParams() {
  return getAllChecks().map((c) => ({ checkId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ checkId: string }>;
}): Promise<Metadata> {
  const { checkId } = await params;
  const check = getCheck(checkId);
  if (!check) return {};
  return { title: check.meta.title, description: check.meta.description };
}

export default async function CheckLandingPage({
  params,
}: {
  params: Promise<{ checkId: string }>;
}) {
  const { checkId } = await params;
  const check = getCheck(checkId);
  if (!check) notFound();

  const needsOnboarding = check.id === 'sasang';
  const startHref = needsOnboarding
    ? `/check/${checkId}/onboarding`
    : `/check/${checkId}/run`;

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-8 py-20 max-w-xl mx-auto w-full">
      <div className="w-full text-center space-y-6">
        {check.hubCard.hanja && (
          <p style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)' }}>
            {check.hubCard.hanja}
          </p>
        )}
        <h1 className="text-display">{check.hubCard.title}</h1>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>
          {check.hubCard.subtitle}
        </p>
        <p className="text-eyebrow" style={{ color: 'rgba(255,255,255,0.35)' }}>
          약 {check.hubCard.estimatedMinutes}분 · {check.questions.length}문항
        </p>

        <Link
          href={startHref}
          className="white-block inline-block mt-4 px-10 py-4 font-semibold transition-all"
          style={{ fontSize: '1.0625rem' }}
        >
          시작하기
        </Link>

        <p className="text-caption pt-4">
          {check.source.disclaimer}
        </p>
      </div>
    </main>
  );
}

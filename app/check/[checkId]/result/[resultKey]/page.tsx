import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCheck, getAllChecks } from '@/lib/checks';
import ResultClient from './ResultClient';
import GenericResultClient from './GenericResultClient';
import { constitutions } from '@/lib/checks/sasang/content';
import { ConstitutionKey } from '@/lib/checks/sasang/questions';

export async function generateStaticParams() {
  const params: { checkId: string; resultKey: string }[] = [];
  for (const check of getAllChecks()) {
    for (const key of check.resultKeys) {
      params.push({ checkId: check.id, resultKey: key });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ checkId: string; resultKey: string }>;
}): Promise<Metadata> {
  const { checkId, resultKey } = await params;
  const check = getCheck(checkId);
  if (!check) return {};
  const content = check.content[resultKey];
  if (!content) return {};

  return {
    title: `${content.name} — ${check.meta.title}`,
    description: `${content.oneLiner}${content.lifeTask ? ` | ${content.lifeTask}` : ''}`,
    openGraph: {
      title: `나는 ${content.name} 경향 — ${content.oneLiner}`,
      description: content.oneLiner,
      images: [{ url: `/api/og/${checkId}/${resultKey}`, width: 1200, height: 630 }],
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ checkId: string; resultKey: string }>;
}) {
  const { checkId, resultKey } = await params;
  const check = getCheck(checkId);
  if (!check || !check.resultKeys.includes(resultKey)) notFound();

  if (check.renderResult === 'sasang') {
    const c = constitutions[resultKey as ConstitutionKey];
    if (!c) notFound();
    return <ResultClient constitution={c} />;
  }

  const content = check.content[resultKey];
  const otherResults = check.resultKeys
    .filter((k) => k !== resultKey)
    .map((k) => ({ key: k, content: check.content[k] }));

  return (
    <GenericResultClient
      content={content}
      checkId={check.id}
      checkTitle={check.hubCard.title}
      disclaimer={check.source.disclaimer}
      references={check.source.references}
      resultKey={resultKey}
      otherResults={otherResults}
    />
  );
}

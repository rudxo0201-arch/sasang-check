import { constitutions, ConstitutionKey } from '@/lib/constitutions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ResultClient from './ResultClient';

const validKeys: ConstitutionKey[] = ['taeyang', 'soyang', 'taeeum', 'soeum'];

export async function generateStaticParams() {
  return validKeys.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  if (!validKeys.includes(type as ConstitutionKey)) return {};
  const c = constitutions[type as ConstitutionKey];
  return {
    title: `${c.name}(${c.hanja}) — 사상체질 건강체크`,
    description: `${c.oneLiner} | 평생 과제: ${c.lifeTask} | 사상체질 건강체크`,
    openGraph: {
      title: `나는 ${c.name} — 당신의 평생 과제는 ${c.lifeTask}입니다`,
      description: c.oneLiner,
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!validKeys.includes(type as ConstitutionKey)) notFound();
  const c = constitutions[type as ConstitutionKey];
  return <ResultClient constitution={c} />;
}

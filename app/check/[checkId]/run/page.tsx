'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getCheck } from '@/lib/checks';
import { EngineQuestion } from '@/lib/engine/types';
import { UserProfile } from '@/lib/engine/profile';

export default function RunPage() {
  const router = useRouter();
  const { checkId } = useParams<{ checkId: string }>();

  const profile = useAppStore((s) => s.runs[checkId]?.profile ?? null);
  const answers = useAppStore((s) => s.runs[checkId]?.answers ?? {});
  const setAnswer = useAppStore((s) => s.setAnswer);
  const setResult = useAppStore((s) => s.setResult);

  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState<EngineQuestion<string>[]>([]);

  useEffect(() => {
    const check = getCheck(checkId);
    if (!check) { router.replace('/'); return; }

    if (!profile) {
      if (check.id === 'sasang') {
        router.replace(`/check/${checkId}/onboarding`);
      } else {
        const defaultProfile: UserProfile = {
          gender: 'other',
          ageGroup: '40s',
          married: false,
          hasChildren: false,
        };
        setQuestions(check.filterQuestions(check.questions, defaultProfile));
      }
      return;
    }
    setQuestions(check.filterQuestions(check.questions, profile as UserProfile));
  }, [checkId, profile, router, setAnswer]);

  if (!questions.length) return null;

  const check = getCheck(checkId)!;
  const q = questions[current];
  const total = questions.length;
  const progress = Math.round((current / total) * 100);

  function handleAnswer(idx: number) {
    setAnswer(checkId, q.id, idx);
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
    } else {
      const updatedAnswers = { ...answers, [q.id]: idx };
      const result = check.strategy.compute(updatedAnswers, profile ?? {}, questions);
      setResult(checkId, result);
      router.push(`/check/${checkId}/result/${result.primary}`);
    }
  }

  function handleBack() {
    if (current === 0) {
      router.push(check.id === 'sasang' ? `/check/${checkId}/onboarding` : `/check/${checkId}`);
      return;
    }
    setCurrent((c) => c - 1);
  }

  const axisLabel = q.axis === 'nature' ? '性 — 평소의 나' : q.axis === 'emotion' ? '情 — 자극받았을 때' : null;

  return (
    <main className="flex-1 flex flex-col w-full max-w-xl mx-auto px-8 py-14">

      <div className="flex justify-between items-center mb-4">
        {axisLabel
          ? <p className="text-eyebrow">{axisLabel}</p>
          : <p className="text-eyebrow">{check.hubCard.title}</p>
        }
        <p className="text-eyebrow">{current + 1} / {total}</p>
      </div>
      <div className="w-full mb-16" style={{ height: '1px', background: 'rgba(255,255,255,0.10)' }}>
        <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.55)' }} />
      </div>

      <h1 className="mb-12" style={{ fontSize: '1.125rem', lineHeight: 1.75 }}>{q.prompt}</h1>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const selected = answers[q.id] === idx;
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full text-left rounded-[1rem] flex justify-between items-center transition-all"
              style={{
                padding: '18px 24px',
                border: `1px solid ${selected ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.18)'}`,
                background: selected ? 'rgba(255,255,255,0.07)' : 'transparent',
                boxShadow: selected ? '0 0 24px 4px rgba(255,255,255,0.12)' : '0 0 8px 0 rgba(255,255,255,0.05)',
                color: selected ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.60)',
                fontWeight: selected ? 500 : 400,
                fontSize: '1.0625rem',
                lineHeight: 1.6,
              }}
            >
              <span>{opt.label}</span>
              {selected && <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.60)' }}>●</span>}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleBack}
        className="mt-14 text-eyebrow"
        style={{ color: 'rgba(255,255,255,0.28)', alignSelf: 'flex-start' }}
      >
        ← 이전
      </button>
    </main>
  );
}

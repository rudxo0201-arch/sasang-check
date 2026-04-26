'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { filterQuestions, Question } from '@/lib/questions';
import { calculateAxisScores } from '@/lib/scoring';

export default function TestPage() {
  const router = useRouter();
  const { profile, answers, setAnswer, setResult } = useAppStore();
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!profile) { router.replace('/onboarding'); return; }
    setQuestions(filterQuestions(profile));
  }, [profile, router]);

  if (!profile || questions.length === 0) return null;

  const q = questions[current];
  const total = questions.length;
  const progress = Math.round(((current) / total) * 100);

  function handleAnswer(idx: number) {
    setAnswer(q.id, idx);

    if (current + 1 < total) {
      setCurrent((c) => c + 1);
    } else {
      const updated = { ...answers, [q.id]: idx };
      const axis = calculateAxisScores(updated, profile!);
      const primary = (['taeyang', 'soyang', 'taeeum', 'soeum'] as const)
        .reduce((a, b) => axis.total[a] >= axis.total[b] ? a : b);
      setResult(primary, axis);
      router.push(`/result/${primary}`);
    }
  }

  function handleBack() {
    if (current === 0) { router.push('/onboarding'); return; }
    setCurrent((c) => c - 1);
  }

  return (
    <main className="flex-1 flex flex-col items-center px-5 py-10 max-w-2xl mx-auto w-full">

      {/* 진행률 */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--ink-muted)' }}>
          <span>
            <span className="font-bold" style={{ color: 'var(--ink)' }}>{current + 1}</span>
            {' '}/{' '}{total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: 'var(--ink)' }}
          />
        </div>
      </div>

      {/* 질문 축 배지 */}
      <div className="w-full mb-4">
        <span
          className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full"
          style={{
            backgroundColor: q.axis === 'nature' ? '#f0ebe0' : '#fce7e0',
            color: q.axis === 'nature' ? 'var(--ink-soft)' : '#b91c1c',
          }}
        >
          {q.axis === 'nature' ? '性 — 평소의 나' : '情 — 자극받았을 때의 나'}
        </span>
      </div>

      {/* 질문 */}
      <h2 className="w-full mb-8 leading-snug">{q.prompt}</h2>

      {/* 선택지 */}
      <div className="w-full space-y-3">
        {q.options.map((opt, idx) => {
          const selected = answers[q.id] === idx;
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full text-left rounded-2xl px-6 py-4 text-lg border-2 transition-all hover:shadow-sm active:scale-[0.99]"
              style={{
                borderColor: selected ? 'var(--ink)' : 'var(--border)',
                backgroundColor: selected ? '#f5f0e8' : 'transparent',
                color: 'var(--ink)',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* 뒤로가기 */}
      <button
        onClick={handleBack}
        className="mt-10 text-base"
        style={{ color: 'var(--ink-muted)' }}
      >
        ← 이전 질문
      </button>
    </main>
  );
}

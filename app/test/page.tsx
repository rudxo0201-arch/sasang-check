'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { filterQuestions, Question } from '@/lib/questions';
import { calculateAxisScores } from '@/lib/scoring';

export default function TestPage() {
  const router = useRouter();
  const { profile, answers, setAnswer, setResult } = useAppStore();
  const [current, setCurrent]   = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!profile) { router.replace('/onboarding'); return; }
    setQuestions(filterQuestions(profile));
  }, [profile, router]);

  if (!profile || questions.length === 0) return null;

  const q        = questions[current];
  const total    = questions.length;
  const progress = Math.round((current / total) * 100);

  function handleAnswer(idx: number) {
    setAnswer(q.id, idx);
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
    } else {
      const updated = { ...answers, [q.id]: idx };
      const axis    = calculateAxisScores(updated, profile!);
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
    <main className="flex-1 flex flex-col w-full max-w-xl mx-auto px-8 py-14">

      {/* 상단 */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-eyebrow">{q.axis === 'nature' ? '性 — 평소의 나' : '情 — 자극받았을 때'}</p>
        <p className="text-eyebrow">{current + 1} / {total}</p>
      </div>
      <div className="w-full mb-16" style={{ height: '1px', background: 'rgba(255,255,255,0.10)' }}>
        <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.55)' }} />
      </div>

      {/* 질문 */}
      <h1 className="mb-12">{q.prompt}</h1>

      {/* 선택지 */}
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
                fontSize: '0.9375rem',
              }}
            >
              <span>{opt.label}</span>
              {selected && <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.60)' }}>●</span>}
            </button>
          );
        })}
      </div>

      {/* 뒤로가기 */}
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserProfile } from '@/lib/questions';

type Step = 'gender' | 'age' | 'family';

export default function OnboardingPage() {
  const router = useRouter();
  const setProfile = useAppStore((s) => s.setProfile);
  const [step, setStep]         = useState<Step>('gender');
  const [gender, setGender]     = useState<UserProfile['gender'] | null>(null);
  const [ageGroup, setAgeGroup] = useState<UserProfile['ageGroup'] | null>(null);

  function handleGender(g: UserProfile['gender'])  { setGender(g); setStep('age'); }
  function handleAge(a: UserProfile['ageGroup'])    { setAgeGroup(a); setStep('family'); }
  function handleFamily(m: boolean, c: boolean) {
    setProfile({ gender: gender!, ageGroup: ageGroup!, married: m, hasChildren: c });
    router.push('/test');
  }

  const progress = step === 'gender' ? 33 : step === 'age' ? 66 : 100;

  return (
    <main className="flex-1 flex flex-col w-full max-w-xl mx-auto px-8 py-14">

      {/* 진행률 */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-eyebrow">기초 정보</p>
        <p className="text-eyebrow">{Math.round(progress)}%</p>
      </div>
      <div className="w-full mb-16" style={{ height: '1px', background: 'rgba(255,255,255,0.10)' }}>
        <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.55)' }} />
      </div>

      {step === 'gender' && (
        <Step label="01 / 03" question="성별을 알려주세요.">
          {['남성', '여성', '기타 / 답하지 않겠습니다'].map((label, i) => {
            const vals = ['male', 'female', 'other'] as const;
            return <Opt key={label} onClick={() => handleGender(vals[i])}>{label}</Opt>;
          })}
        </Step>
      )}

      {step === 'age' && (
        <Step label="02 / 03" question="연령대를 알려주세요.">
          {['40대', '50대', '60대', '70대 이상', '그 외 (30대 이하)'].map((label, i) => {
            const vals = ['40s', '50s', '60s', '70plus', 'other'] as const;
            return <Opt key={label} onClick={() => handleAge(vals[i])}>{label}</Opt>;
          })}
        </Step>
      )}

      {step === 'family' && (
        <Step label="03 / 03" question="결혼과 자녀 여부를 알려주세요.">
          {[
            { label: '기혼 · 자녀 있음', m: true,  c: true  },
            { label: '기혼 · 자녀 없음', m: true,  c: false },
            { label: '미혼 · 자녀 있음', m: false, c: true  },
            { label: '미혼 · 자녀 없음', m: false, c: false },
          ].map((opt) => (
            <Opt key={opt.label} onClick={() => handleFamily(opt.m, opt.c)}>{opt.label}</Opt>
          ))}
        </Step>
      )}
    </main>
  );
}

function Step({ label, question, children }: { label: string; question: string; children: React.ReactNode }) {
  return (
    <div className="w-full">
      <p className="text-eyebrow mb-8">{label}</p>
      <h1 className="mb-12">{question}</h1>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Opt({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="floating-block w-full text-left flex justify-between items-center group"
      style={{ padding: '18px 24px', color: 'rgba(255,255,255,0.70)', fontSize: '0.9375rem', fontWeight: 400 }}
    >
      <span>{children}</span>
      <span className="opacity-0 group-hover:opacity-60 transition-opacity" style={{ fontSize: '0.875rem' }}>→</span>
    </button>
  );
}

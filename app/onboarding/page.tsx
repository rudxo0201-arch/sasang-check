'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserProfile } from '@/lib/questions';

type Step = 'gender' | 'age' | 'family';

export default function OnboardingPage() {
  const router = useRouter();
  const setProfile = useAppStore((s) => s.setProfile);

  const [step, setStep] = useState<Step>('gender');
  const [gender, setGender] = useState<UserProfile['gender'] | null>(null);
  const [ageGroup, setAgeGroup] = useState<UserProfile['ageGroup'] | null>(null);
  const [married, setMarried] = useState<boolean | null>(null);
  const [hasChildren, setHasChildren] = useState<boolean | null>(null);

  function handleGender(g: UserProfile['gender']) {
    setGender(g);
    setStep('age');
  }

  function handleAge(a: UserProfile['ageGroup']) {
    setAgeGroup(a);
    setStep('family');
  }

  function handleFamily(m: boolean, c: boolean) {
    setMarried(m);
    setHasChildren(c);
    setProfile({
      gender: gender!,
      ageGroup: ageGroup!,
      married: m,
      hasChildren: c,
    });
    router.push('/test');
  }

  const progress = step === 'gender' ? 33 : step === 'age' ? 66 : 100;

  return (
    <main className="flex-1 flex flex-col items-center px-5 py-10 max-w-2xl mx-auto w-full">

      {/* 진행률 */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--ink-muted)' }}>
          <span>기초 정보 입력</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: 'var(--ink)' }}
          />
        </div>
      </div>

      {/* 성별 */}
      {step === 'gender' && (
        <StepCard
          label="01"
          question="성별을 알려주세요."
          sub="체질마다 성별에 따라 나타나는 양상이 다를 수 있습니다."
        >
          {[
            { label: '남성', value: 'male' as const },
            { label: '여성', value: 'female' as const },
            { label: '기타 / 답하지 않겠습니다', value: 'other' as const },
          ].map((opt) => (
            <OptionButton key={opt.value} onClick={() => handleGender(opt.value)}>
              {opt.label}
            </OptionButton>
          ))}
        </StepCard>
      )}

      {/* 연령대 */}
      {step === 'age' && (
        <StepCard
          label="02"
          question="연령대를 알려주세요."
          sub="연령대에 따라 공감도 높은 질문을 드립니다."
        >
          {[
            { label: '20대', value: '20s' as const },
            { label: '30대', value: '30s' as const },
            { label: '40대', value: '40s' as const },
            { label: '50대', value: '50s' as const },
            { label: '60대', value: '60s' as const },
            { label: '70대 이상', value: '70plus' as const },
            { label: '답하지 않음', value: 'other' as const },
          ].map((opt) => (
            <OptionButton key={opt.value} onClick={() => handleAge(opt.value)}>
              {opt.label}
            </OptionButton>
          ))}
        </StepCard>
      )}

      {/* 결혼·자녀 */}
      {step === 'family' && (
        <StepCard
          label="03"
          question="결혼과 자녀 여부를 알려주세요."
          sub="해당되는 상황에 맞는 질문을 드리기 위함입니다."
        >
          {[
            { label: '기혼 · 자녀 있음', married: true, hasChildren: true },
            { label: '기혼 · 자녀 없음', married: true, hasChildren: false },
            { label: '미혼 · 자녀 있음', married: false, hasChildren: true },
            { label: '미혼 · 자녀 없음', married: false, hasChildren: false },
          ].map((opt) => (
            <OptionButton key={opt.label} onClick={() => handleFamily(opt.married, opt.hasChildren)}>
              {opt.label}
            </OptionButton>
          ))}
        </StepCard>
      )}
    </main>
  );
}

function StepCard({
  label,
  question,
  sub,
  children,
}: {
  label: string;
  question: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="text-sm font-bold tracking-widest mb-3" style={{ color: 'var(--ink-muted)' }}>
        {label} / 03
      </div>
      <h2 className="mb-2">{question}</h2>
      <p className="mb-8" style={{ color: 'var(--ink-soft)' }}>{sub}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function OptionButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl px-6 py-4 text-lg font-medium border-2 transition-colors hover:border-current hover:bg-black/5 active:bg-black/10"
      style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}
    >
      {children}
    </button>
  );
}

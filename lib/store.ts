'use client';

import { create } from 'zustand';
import { UserProfile } from './questions';
import { ConstitutionKey } from './constitutions';
import { AxisScores } from './scoring';

interface AppState {
  profile: UserProfile | null;
  answers: Record<string, number>;
  result: ConstitutionKey | null;
  scores: Record<ConstitutionKey, number> | null;
  natureScores: Record<ConstitutionKey, number> | null;
  emotionScores: Record<ConstitutionKey, number> | null;
  natureCount: number;
  emotionCount: number;

  setProfile: (p: UserProfile) => void;
  setAnswer: (questionId: string, optionIndex: number) => void;
  setResult: (key: ConstitutionKey, axis: AxisScores) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  profile: null,
  answers: {},
  result: null,
  scores: null,
  natureScores: null,
  emotionScores: null,
  natureCount: 0,
  emotionCount: 0,

  setProfile: (p) => set({ profile: p }),
  setAnswer: (questionId, optionIndex) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: optionIndex } })),
  setResult: (key, axis) => set({
    result: key,
    scores: axis.total,
    natureScores: axis.nature,
    emotionScores: axis.emotion,
    natureCount: axis.natureCount,
    emotionCount: axis.emotionCount,
  }),
  reset: () => set({
    profile: null,
    answers: {},
    result: null,
    scores: null,
    natureScores: null,
    emotionScores: null,
    natureCount: 0,
    emotionCount: 0,
  }),
}));

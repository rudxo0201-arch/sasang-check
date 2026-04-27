'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from './engine/profile';
import { EngineResult } from './engine/types';

export interface RunState {
  checkId: string;
  profile: UserProfile | null;
  answers: Record<string, number>;
  result: EngineResult<string> | null;
}

interface AppState {
  runs: Record<string, RunState>;
  setProfile: (checkId: string, profile: UserProfile) => void;
  setAnswer: (checkId: string, questionId: string, optionIndex: number) => void;
  setResult: (checkId: string, result: EngineResult<string>) => void;
  resetRun: (checkId: string) => void;
  resetAll: () => void;
}

function emptyRun(checkId: string): RunState {
  return { checkId, profile: null, answers: {}, result: null };
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      runs: {},

      setProfile: (checkId, profile) =>
        set((state) => ({
          runs: {
            ...state.runs,
            [checkId]: { ...(state.runs[checkId] ?? emptyRun(checkId)), profile },
          },
        })),

      setAnswer: (checkId, questionId, optionIndex) =>
        set((state) => {
          const run = state.runs[checkId] ?? emptyRun(checkId);
          return {
            runs: {
              ...state.runs,
              [checkId]: { ...run, answers: { ...run.answers, [questionId]: optionIndex } },
            },
          };
        }),

      setResult: (checkId, result) =>
        set((state) => ({
          runs: {
            ...state.runs,
            [checkId]: { ...(state.runs[checkId] ?? emptyRun(checkId)), result },
          },
        })),

      resetRun: (checkId) =>
        set((state) => {
          const { [checkId]: _removed, ...rest } = state.runs;
          return { runs: rest };
        }),

      resetAll: () => set({ runs: {} }),
    }),
    {
      name: 'self-check-runs',
      version: 1,
      partialize: (state) => ({ runs: state.runs }),
    },
  ),
);

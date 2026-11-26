'use client';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type ResultKey = 'score' | 'savings' | 'networth' | 'profile';
type Ctx = {
  results: Record<ResultKey, string>;
  setResult: (k: ResultKey, text: string) => void;
};

const ResultsCtx = createContext<Ctx>({
  results: { score: '', savings: '', networth: '', profile: '' },
  setResult: () => {}
});

/** Los resultados viven solo en memoria: no se guarda nada en el navegador. */
export function ResultsProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Record<ResultKey, string>>({ score: '', savings: '', networth: '', profile: '' });
  const setResult = useCallback((k: ResultKey, text: string) => {
    setResults(prev => (prev[k] === text ? prev : { ...prev, [k]: text }));
  }, []);
  const value = useMemo(() => ({ results, setResult }), [results, setResult]);
  return <ResultsCtx.Provider value={value}>{children}</ResultsCtx.Provider>;
}
export const useResults = () => useContext(ResultsCtx);

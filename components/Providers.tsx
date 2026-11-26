'use client';
import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { ResultsProvider } from '@/lib/results';

/** reducedMotion="user": si la persona pidió menos movimiento, se desactivan las animaciones de transformación. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ResultsProvider>{children}</ResultsProvider>
    </MotionConfig>
  );
}

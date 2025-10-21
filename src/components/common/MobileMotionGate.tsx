import React, { useMemo } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MobileMotionGateProps {
  children: (options: {
    shouldSimplify: boolean;
    isMobile: boolean;
    prefersReducedMotion: boolean;
  }) => React.ReactNode;
}

export const MobileMotionGate: React.FC<MobileMotionGateProps> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersReducedMotion = useReducedMotion();

  const shouldSimplify = useMemo(
    () => isMobile || prefersReducedMotion,
    [isMobile, prefersReducedMotion]
  );

  return <>{children({ shouldSimplify, isMobile, prefersReducedMotion })}</>;
};

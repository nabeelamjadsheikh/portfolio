'use client';

import { ReactLenis } from 'lenis/react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// Wraps the app in Lenis smooth scrolling plus a global MotionConfig so every
// Framer animation honours the user's reduced-motion preference. When reduced
// motion is on, Lenis is skipped entirely and native scrolling is preserved.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.6,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}

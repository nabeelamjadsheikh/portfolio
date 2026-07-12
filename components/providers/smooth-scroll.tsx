'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Native scrolling (no smooth-scroll library) for snappy, low-overhead feel.
// A global MotionConfig makes every Framer animation honour reduced motion.
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

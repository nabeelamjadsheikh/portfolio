'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/motion';
import { profile } from '@/lib/content';

// First-load curtain: name fades in, a 0→100 counter runs, then the panel
// wipes upward to reveal the hero. Skipped entirely under reduced motion.
export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    document.body.style.overflow = 'hidden';

    const duration = 1200;
    let raf = 0;
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 2)) * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
          >
            <div className="eyebrow mb-4">Portfolio · 2026</div>
            <div className="font-display text-4xl md:text-6xl tracking-tight">
              {profile.name}
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-8 md:px-14">
            <span className="eyebrow">Loading experience</span>
            <span className="font-mono text-4xl md:text-6xl tabular-nums text-gradient">
              {count.toString().padStart(3, '0')}
            </span>
          </div>

          <motion.div
            className="absolute bottom-8 left-8 right-8 h-px origin-left md:left-14 md:right-14"
            style={{ background: 'var(--border-strong)' }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ background: 'var(--grad)', scaleX: count / 100 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

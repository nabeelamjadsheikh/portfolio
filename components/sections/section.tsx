'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, inView } from '@/lib/motion';

// Consistent section chrome: an id anchor, generous vertical rhythm, and an
// optional eyebrow that labels the section with something meaningful (not a
// decorative number).
export function Section({
  id,
  eyebrow,
  children,
  className = '',
}: {
  id: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-wrap scroll-mt-24 px-5 py-24 md:py-32 ${className}`}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mb-10 flex items-center gap-4"
        >
          <span className="h-px w-8" style={{ background: 'var(--grad)' }} />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
      )}
      {children}
    </section>
  );
}

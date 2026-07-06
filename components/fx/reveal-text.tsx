'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { createElement, type ElementType } from 'react';
import { ease, inView } from '@/lib/motion';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.72, ease } },
};

// Word-mask reveal: each word rises from behind a clipped line on scroll-in.
// Used for headings and lead lines. Falls back to a plain fade under reduced
// motion so screen space isn't jumpy.
export function RevealText({
  text,
  as = 'h2',
  className,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    return createElement(as, { className }, text);
  }

  return createElement(
    motion[as as keyof typeof motion] as ElementType,
    {
      className,
      variants: container,
      initial: 'hidden',
      whileInView: 'show',
      viewport: inView,
      transition: { delayChildren: delay },
    },
    <span key="sr" className="sr-only">
      {text}
    </span>,
    ...words.map((w, i) => (
      <span
        key={i}
        aria-hidden
        className="inline-flex overflow-hidden pb-[0.14em] align-bottom"
        style={{ marginRight: i < words.length - 1 ? '0.28em' : 0 }}
      >
        <motion.span variants={word} className="inline-block">
          {w}
        </motion.span>
      </span>
    ))
  );
}

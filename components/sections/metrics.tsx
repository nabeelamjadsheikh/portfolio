'use client';

import { motion } from 'framer-motion';
import { metrics, strengths } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { CountUp } from '@/components/fx/count-up';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function Metrics() {
  return (
    <Section id="impact" eyebrow="Impact / By the numbers">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid grid-cols-2 gap-y-12 rounded-3xl border border-[var(--border)] glass px-6 py-12 md:grid-cols-4 md:px-10"
      >
        {metrics.map((m) => (
          <motion.div key={m.label} variants={fadeUp} className="px-2 text-center">
            <div className="font-display text-5xl leading-none text-gradient md:text-6xl">
              <CountUp value={m.value} suffix={m.suffix} />
            </div>
            <p className="mx-auto mt-3 max-w-[14ch] text-xs leading-snug text-muted">
              {m.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-16 grid gap-8 md:grid-cols-3"
      >
        {strengths.map((s, i) => (
          <motion.div key={s.title} variants={fadeUp}>
            <span className="font-mono text-xs text-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-lg font-medium text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

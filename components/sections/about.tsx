'use client';

import { motion } from 'framer-motion';
import { about, stats } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { RevealText } from '@/components/fx/reveal-text';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function About() {
  return (
    <Section id="about" eyebrow="About / The short version">
      <div className="grid gap-14 md:grid-cols-12">
        {/* Large editorial statement */}
        <div className="md:col-span-8">
          <RevealText
            as="p"
            text={about.lead}
            className="font-display text-3xl leading-[1.15] tracking-tight sm:text-4xl md:text-[3.1rem] md:leading-[1.08]"
          />
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-8 max-w-2xl space-y-4"
          >
            {about.body.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="text-base leading-relaxed text-muted">
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Facts + stat rail */}
        <div className="md:col-span-4">
          <motion.dl
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] glass md:grid-cols-1"
          >
            {about.facts.map((f) => (
              <motion.div
                key={f.label}
                variants={fadeUp}
                className="flex flex-col gap-1 p-5"
              >
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-faint">
                  {f.label}
                </dt>
                <dd className="text-lg text-ink">{f.value}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-6 flex justify-between gap-4 px-1"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="flex flex-col">
                <span className="font-display text-3xl text-gradient">{s.value}</span>
                <span className="mt-1 text-xs leading-tight text-faint">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

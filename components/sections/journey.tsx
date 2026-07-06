'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { fadeUp, inView } from '@/lib/motion';

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="journey" eyebrow="Journey / 2019 — Now">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
          A steady climb from{' '}
          <span className="text-gradient">builder to lead</span>.
        </h2>
      </div>

      <div ref={ref} className="relative pl-8 md:pl-0">
        {/* rail */}
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          className="absolute left-[7px] top-2 w-px origin-top md:left-1/2 md:-translate-x-1/2"
          style={{ background: 'var(--grad)', scaleY, height: 'calc(100% - 0.5rem)' }}
        />

        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, i) => {
            const right = i % 2 === 1;
            return (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="relative md:grid md:grid-cols-2 md:gap-12"
              >
                {/* node */}
                <span
                  className="absolute left-[-27px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] md:left-1/2 md:-translate-x-1/2"
                  style={{ background: 'var(--grad)' }}
                />

                {/* year — opposite side on desktop */}
                <div
                  className={`hidden md:block ${
                    right ? 'md:order-2 md:pl-12 md:text-left' : 'md:order-1 md:pr-12 md:text-right'
                  }`}
                >
                  <span className="font-display text-6xl leading-none text-faint">
                    {exp.start}
                  </span>
                </div>

                {/* content */}
                <div
                  className={`${
                    right ? 'md:order-1 md:pr-12 md:text-right' : 'md:order-2 md:pl-12'
                  }`}
                >
                  <span className="font-mono text-xs text-faint md:hidden">{exp.period}</span>
                  <h3 className="mt-1 text-xl font-medium text-ink">{exp.title}</h3>
                  <p className="text-gradient text-sm font-medium">{exp.company}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:inline-block">
                    {exp.summary}
                  </p>
                  <p className="mt-2 hidden font-mono text-xs text-faint md:block">
                    {exp.period}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

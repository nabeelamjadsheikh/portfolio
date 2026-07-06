'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { experiences } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { ease, fadeUp, inView } from '@/lib/motion';

export function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="experience" eyebrow="Experience / In detail">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
          The work, <span className="text-gradient">unabbreviated</span>.
        </h2>
      </div>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {experiences.map((exp, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={exp.company}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-4 py-7 text-left"
              >
                <span className="font-mono text-xs text-faint">{exp.start}</span>
                <span className="flex-1">
                  <span className="block text-xl font-medium text-ink md:text-2xl">
                    {exp.title}
                  </span>
                  <span className="text-gradient text-sm font-medium">{exp.company}</span>
                </span>
                <span className="hidden font-mono text-xs text-faint sm:block">
                  {exp.period}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border)] text-ink transition-colors group-hover:bg-[var(--bg-glass-strong)]"
                >
                  <Plus size={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <ul className="grid gap-3 pb-8 md:grid-cols-2 md:pl-10">
                      {exp.points.map((p, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * j, duration: 0.4 }}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: 'var(--accent)' }}
                          />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

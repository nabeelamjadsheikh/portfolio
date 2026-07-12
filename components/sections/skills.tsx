'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillGroups } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { ease } from '@/lib/motion';

// A static constellation: the selected category's technologies sit around a
// core, each linked back to it. Switching categories re-forms the cluster with
// a quick one-time transition — no continuous motion. Readable as a list for AT.
export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  // Layout the active items on two interleaved rings.
  const nodes = useMemo(() => {
    const n = group.items.length;
    return group.items.map((label, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? 28 : 38;
      return { label, x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
    });
  }, [group]);

  return (
    <Section id="skills" eyebrow="Skills / The stack">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="max-w-md font-display text-4xl leading-tight tracking-tight md:text-5xl">
            Tools I reach for, grouped by <span className="text-gradient">how I think</span>.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Six years of production work across the stack — pick a cluster to explore it.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {skillGroups.map((g, i) => (
              <button
                key={g.category}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active === i
                    ? 'border-transparent text-white'
                    : 'border-[var(--border)] text-muted hover:text-ink'
                }`}
                style={active === i ? { background: 'var(--grad)' } : undefined}
              >
                {g.category}
              </button>
            ))}
          </div>

          <ul className="sr-only">
            {group.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Constellation (static) */}
        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          {/* connector lines */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--fuchsia)" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {nodes.map((node) => (
              <line
                key={`${group.category}-${node.label}`}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="url(#line-grad)"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* core */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-[var(--border-strong)] glass-strong text-center">
              <span className="px-1 font-mono text-[0.6rem] uppercase leading-tight tracking-wider text-ink">
                {group.category}
              </span>
            </div>
          </div>

          {/* nodes */}
          <AnimatePresence mode="popLayout">
            {nodes.map((node, i) => (
              <motion.div
                key={`${group.category}-${node.label}`}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, delay: i * 0.03, ease }}
              >
                <span className="block whitespace-nowrap rounded-full border border-[var(--border)] glass px-3 py-1.5 text-xs text-ink shadow-[var(--shadow-soft)] transition-transform hover:scale-105">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

'use client';

import { useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { skillGroups } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { ease } from '@/lib/motion';

// A living constellation: the selected category's technologies orbit a core,
// each linked back to it, drifting gently. Switching categories re-forms the
// cluster. Fully readable as a list for assistive tech.
export function Skills() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  // Layout the active items on two interleaved rings.
  const nodes = useMemo(() => {
    const n = group.items.length;
    return group.items.map((label, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? 28 : 38;
      return {
        label,
        x: 50 + r * Math.cos(angle),
        y: 50 + r * Math.sin(angle),
        depth: i % 3,
      };
    });
  }, [group]);

  // Group parallax toward the cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 18 });
  const spy = useSpring(py, { stiffness: 60, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

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
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
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

          {/* Accessible flat list of the active group */}
          <ul className="sr-only">
            {group.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Constellation */}
        <div
          onMouseMove={onMove}
          onMouseLeave={reset}
          className="relative mx-auto aspect-square w-full max-w-[30rem]"
        >
          <motion.div className="absolute inset-0" style={{ x: spx, y: spy }}>
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
              <AnimatePresence>
                {nodes.map((node) => (
                  <motion.line
                    key={`${group.category}-${node.label}`}
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke="url(#line-grad)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                  />
                ))}
              </AnimatePresence>
            </svg>

            {/* core */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div
                className="grid h-20 w-20 place-items-center rounded-full border border-[var(--border-strong)] glass-strong text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={group.category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="px-1 font-mono text-[0.6rem] uppercase leading-tight tracking-wider text-ink"
                  >
                    {group.category}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* nodes */}
            <AnimatePresence mode="popLayout">
              {nodes.map((node, i) => (
                <motion.div
                  key={`${group.category}-${node.label}`}
                  className="absolute z-20"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: '-50%',
                    y: reduce ? '-50%' : ['-50%', '-56%', '-50%'],
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    opacity: { duration: 0.4, delay: i * 0.04 },
                    scale: { duration: 0.4, delay: i * 0.04, ease },
                    y: reduce
                      ? undefined
                      : {
                          duration: 3 + node.depth,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.2,
                        },
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.12 }}
                    className="block whitespace-nowrap rounded-full border border-[var(--border)] glass px-3 py-1.5 text-xs text-ink shadow-[var(--shadow-soft)]"
                  >
                    {node.label}
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

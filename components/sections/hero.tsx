'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/lib/content';
import { StreamingText } from '@/components/fx/streaming-text';
import { ease } from '@/lib/motion';

// Small, one-time load stagger — no preloader sync, no long delays.
const BASE = 0.1;

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function Hero() {
  const reduce = useReducedMotion();

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24"
    >
      {/* static ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle at center, var(--glow-2), transparent 60%)' }}
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          {...fadeIn(BASE)}
          className="mb-7 flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-1.5 glass"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--fuchsia)]" />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
            {profile.role} · {profile.location}
          </span>
        </motion.div>

        <motion.h1
          {...fadeIn(BASE + 0.08)}
          className="font-display text-[15vw] leading-[0.92] tracking-[-0.03em] sm:text-[12vw] md:text-[9.5rem]"
        >
          {profile.firstName}
          <span className="block text-gradient">{profile.lastName}</span>
        </motion.h1>

        <motion.p
          {...fadeIn(BASE + 0.18)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-2 text-lg text-muted sm:text-2xl"
        >
          <span>I engineer</span>
          <StreamingText phrases={profile.streamPhrases} className="font-medium" />
        </motion.p>

        <motion.p
          {...fadeIn(BASE + 0.26)}
          className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          {...fadeIn(BASE + 0.34)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#work"
            onClick={scrollTo('work')}
            className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--grad)' }}
          >
            View selected work
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            onClick={scrollTo('contact')}
            className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-[var(--bg-glass-strong)]"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div {...fadeIn(BASE + 0.42)} className="mt-8 flex items-center gap-5 text-muted">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-ink"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-ink"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        onClick={scrollTo('about')}
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-faint transition-colors hover:text-ink"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.span>
      </a>
    </section>
  );
}

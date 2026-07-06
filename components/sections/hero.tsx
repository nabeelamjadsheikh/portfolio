'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/lib/content';
import { StreamingText } from '@/components/fx/streaming-text';
import { Magnetic } from '@/components/fx/magnetic';
import { ease } from '@/lib/motion';

// Load sequence roughly matches the preloader wipe so the hero "arrives"
// as the curtain lifts.
const INTRO_DELAY = 1.45;

function AnimatedName({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const chars = Array.from(name);

  if (reduce) {
    return <span>{name}</span>;
  }

  return (
    <span className="inline-block">
      <span className="sr-only">{name}</span>
      <span aria-hidden className="inline-block">
      {chars.map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease, delay: INTRO_DELAY + i * 0.045 }}
          >
            {c === ' ' ? ' ' : c}
          </motion.span>
        </span>
      ))}
      </span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer parallax for the ambient glow.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 60);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 60);
  };

  // Scroll-out parallax.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24"
    >
      {/* pointer-reactive glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          x: gx,
          y: gy,
          background:
            'radial-gradient(circle at center, var(--glow-2), transparent 60%)',
        }}
      />

      <motion.div
        style={{ y: reduce ? 0 : yContent, opacity: reduce ? 1 : opacity }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div
          {...fadeIn(INTRO_DELAY - 0.4)}
          className="mb-7 flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-1.5 glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--fuchsia)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--fuchsia)]" />
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
            {profile.role} · {profile.location}
          </span>
        </motion.div>

        <h1 className="font-display text-[15vw] leading-[0.92] tracking-[-0.03em] sm:text-[12vw] md:text-[9.5rem]">
          <AnimatedName name={profile.firstName} />
          <span className="block text-gradient">
            <AnimatedName name={profile.lastName} />
          </span>
        </h1>

        <motion.p
          {...fadeIn(INTRO_DELAY + 0.5)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-2 text-lg text-muted sm:text-2xl"
        >
          <span>I engineer</span>
          <StreamingText phrases={profile.streamPhrases} className="font-medium" />
        </motion.p>

        <motion.p
          {...fadeIn(INTRO_DELAY + 0.65)}
          className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          {...fadeIn(INTRO_DELAY + 0.8)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.3}>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
              style={{ background: 'var(--grad)' }}
            >
              View selected work
              <ArrowUpRight size={16} />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-[var(--bg-glass-strong)]"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          {...fadeIn(INTRO_DELAY + 0.95)}
          className="mt-8 flex items-center gap-5 text-muted"
        >
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
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY + 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-faint"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}

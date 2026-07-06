'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Download, Menu, X } from 'lucide-react';
import { nav, profile } from '@/lib/content';
import { useActiveSection } from '@/hooks/use-active-section';
import { ThemeToggle } from '@/components/theme-toggle';
import { Magnetic } from '@/components/fx/magnetic';
import { ease } from '@/lib/motion';

const ids = nav.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -8 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-wrap items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-5 ${
            scrolled ? 'glass-strong shadow-[var(--shadow-soft)]' : 'border border-transparent'
          }`}
        >
          <button
            onClick={() => go('top')}
            className="group flex items-center pl-1"
            aria-label={`${profile.firstName.toLowerCase()} — back to top`}
          >
            <span className="font-mono text-sm lowercase tracking-tight text-ink">
              {profile.firstName.toLowerCase()}
            </span>
            <span
              aria-hidden
              className="ml-[3px] inline-block h-[1.05em] w-[7px] rounded-[1px] align-middle"
              style={{ background: 'var(--grad)', animation: 'caret-blink 1.1s step-end infinite' }}
            />
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="relative rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--bg-glass-strong)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${active === item.id ? 'text-ink' : ''}`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic strength={0.25} className="hidden sm:block">
              <a
                href={profile.cvPath}
                download
                className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-transform"
                style={{ background: 'var(--grad)' }}
              >
                <Download size={15} />
                <span>CV</span>
              </a>
            </Magnetic>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-ink md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-2 md:hidden"
            style={{ background: 'var(--bg)' }}
          >
            {nav.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.05 }}
                onClick={() => go(item.id)}
                className="font-display text-4xl tracking-tight text-ink"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              href={profile.cvPath}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * nav.length + 0.05 }}
              className="mt-6 flex items-center gap-2 rounded-full px-6 py-3 text-white"
              style={{ background: 'var(--grad)' }}
            >
              <Download size={16} /> Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

// Accessible dark/light switch. Guards against hydration mismatch by only
// rendering the icon after mount.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? isDark
            ? 'Switch to light theme'
            : 'Switch to dark theme'
          : 'Toggle color theme'
      }
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-ink transition-colors hover:bg-[var(--bg-glass-strong)]"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}

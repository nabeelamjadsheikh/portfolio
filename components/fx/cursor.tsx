'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useFinePointer } from '@/hooks/use-fine-pointer';

// A two-part custom cursor: an instant dot and a lagging ring that swells over
// interactive targets. Only mounts on fine-pointer devices with motion allowed.
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest('a, button, [data-cursor], input, textarea, [role="button"]')
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" style={{ mixBlendMode: 'difference' }}>
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
    </div>
  );
}

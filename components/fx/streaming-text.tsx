'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Types each phrase out and deletes it, cycling — echoing the streaming LLM
// responses Nabeel builds. A blinking caret trails the text. Under reduced
// motion it just shows the first phrase, statically.
export function StreamingText({
  phrases,
  className,
}: {
  phrases: readonly string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (reduce) {
      setText(phrases[0]);
      return;
    }

    const full = phrases[index % phrases.length];
    let phase: 'typing' | 'holding' | 'deleting' = 'typing';
    let i = 0;

    const run = () => {
      if (phase === 'typing') {
        i++;
        setText(full.slice(0, i));
        if (i >= full.length) {
          phase = 'holding';
          timer.current = setTimeout(run, 1500);
          return;
        }
        // slight jitter for a natural token-stream cadence
        timer.current = setTimeout(run, 45 + Math.random() * 55);
      } else if (phase === 'holding') {
        phase = 'deleting';
        timer.current = setTimeout(run, 40);
      } else {
        i--;
        setText(full.slice(0, i));
        if (i <= 0) {
          setIndex((v) => v + 1);
          return;
        }
        timer.current = setTimeout(run, 26);
      }
    };

    timer.current = setTimeout(run, 260);
    return () => clearTimeout(timer.current);
  }, [index, phrases, reduce]);

  return (
    <span className={className}>
      <span className="text-gradient">{text}</span>
      {!reduce && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.12em] align-baseline"
          style={{ background: 'var(--accent)', animation: 'caret-blink 1s step-end infinite' }}
        />
      )}
    </span>
  );
}

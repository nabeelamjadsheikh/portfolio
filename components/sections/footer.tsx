'use client';

import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';
import { education, profile } from '@/lib/content';

export function Footer() {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mx-auto w-full max-w-wrap px-5 pb-12 pt-8">
      <div className="mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-[var(--border)]" />
        <button
          onClick={toTop}
          className="group flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs text-muted transition-colors hover:text-ink"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--grad)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
              {profile.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{profile.tagline}</p>
        </div>

        <div>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            Education
          </span>
          <p className="mt-2 text-sm text-ink">{education.degree}</p>
          <p className="text-sm text-muted">
            {education.school} · {education.period}
          </p>
        </div>

        <div className="md:text-right">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            Elsewhere
          </span>
          <div className="mt-2 flex gap-4 md:justify-end">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <p className="mt-12 text-xs text-faint">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind &amp; Framer Motion.
      </p>
    </footer>
  );
}

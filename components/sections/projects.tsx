'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { fadeUp, inView, stagger } from '@/lib/motion';

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const [a, b] = project.accent;
  const host = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <div className="relative">
      {/* accent glow peeking from behind the window */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 30% 20%, ${a}, transparent 70%), radial-gradient(60% 60% at 80% 90%, ${b}, transparent 70%)` }}
      />
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--border-strong)] glass-strong shadow-[var(--shadow-soft)]">
        {/* window chrome */}
        <div className="relative z-10 flex h-9 items-center gap-2 border-b border-[var(--border)] px-4">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
          </span>
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-[var(--bg-glass)] px-3 py-0.5 font-mono text-[0.62rem] text-muted">
            {host}
          </span>
          <span className="font-mono text-[0.6rem] text-faint">
            {String(index + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* screenshot */}
        <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} — product screenshot`}
            loading="lazy"
            decoding="async"
            className="absolute left-0 top-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
    >
      <motion.div variants={fadeUp} className={flip ? 'md:order-2' : ''}>
        <ProjectVisual project={project} index={index} />
      </motion.div>

      <motion.div variants={fadeUp} className={flip ? 'md:order-1' : ''}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          {project.role}
        </span>
        <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-1 text-gradient text-sm font-medium">{project.tagline}</p>

        <dl className="mt-6 space-y-4 border-l border-[var(--border)] pl-5">
          {[
            ['Challenge', project.challenge],
            ['Approach', project.solution],
            ['Result', project.result],
          ].map(([label, body]) => (
            <div key={label}>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
                {label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{body}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          <span className="border-b border-transparent transition-colors group-hover:border-[var(--accent)]">
            Visit {project.name.split(' ')[0]}
          </span>
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <Section id="work" eyebrow="Work / Selected case studies">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-xl font-display text-4xl leading-tight tracking-tight md:text-5xl">
          Products I&apos;ve helped design, build, and{' '}
          <span className="text-gradient">ship to real users</span>.
        </h2>
        <p className="max-w-xs text-sm text-muted">
          From an AI cybersecurity platform to a government event system — a few that
          stand out.
        </p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

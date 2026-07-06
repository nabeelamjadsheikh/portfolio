'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '@/lib/content';
import { Section } from '@/components/sections/section';
import { Magnetic } from '@/components/fx/magnetic';
import { RevealText } from '@/components/fx/reveal-text';
import { fadeUp, inView, stagger } from '@/lib/motion';

function Copyable({
  icon,
  label,
  value,
  copyText,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyText: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <motion.button
      variants={fadeUp}
      onClick={copy}
      className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] glass px-5 py-4 text-left transition-colors hover:border-[var(--border-strong)]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] text-ink">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
          {label}
        </span>
        <span className="block truncate text-sm text-ink">{value}</span>
      </span>
      <span className="text-faint transition-colors group-hover:text-ink">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'ok' : 'copy'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact / Let's talk">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <RevealText
            as="h2"
            text="Let's build something worth shipping."
            className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          />
          <p className="mt-6 max-w-md text-muted">
            I&apos;m open to select engineering roles and collaborations — especially
            where AI, scale, and clean systems meet. The fastest way to reach me is email.
          </p>

          <Magnetic strength={0.25} className="mt-8 inline-block">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
              style={{ background: 'var(--grad)' }}
            >
              <Mail size={16} />
              Email me
              <ArrowUpRight size={16} />
            </a>
          </Magnetic>
        </div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-3 self-center sm:grid-cols-2"
        >
          <Copyable
            icon={<Mail size={16} />}
            label="Email"
            value={profile.email}
            copyText={profile.email}
          />
          <Copyable
            icon={<Phone size={16} />}
            label="Phone"
            value={profile.phoneDisplay}
            copyText={profile.phone}
          />
          <motion.a
            variants={fadeUp}
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] glass px-5 py-4 transition-colors hover:border-[var(--border-strong)]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] text-ink">
              <Linkedin size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
                LinkedIn
              </span>
              <span className="block truncate text-sm text-ink">nabeelamjaddev</span>
            </span>
            <ArrowUpRight
              size={16}
              className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            />
          </motion.a>
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 rounded-2xl border border-[var(--border)] glass px-5 py-4"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] text-ink">
              <MapPin size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
                Location
              </span>
              <span className="block truncate text-sm text-ink">{profile.location}</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

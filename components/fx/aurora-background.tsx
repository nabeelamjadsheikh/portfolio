'use client';

// Ambient aurora: three large, blurred colour fields that drift slowly. Sits in
// a fixed layer behind all content. Colours come from theme tokens so it adapts
// to light/dark. Drift animation is paused automatically under reduced motion
// (see globals.css) — the blobs simply stay put.
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: 'var(--aurora-opacity)' }}
    >
      <div
        className="absolute left-[8%] top-[-12%] h-[52vmax] w-[52vmax] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle at center, var(--glow-1), transparent 62%)',
          animation: 'aurora-drift 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute right-[-10%] top-[18%] h-[46vmax] w-[46vmax] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle at center, var(--glow-2), transparent 60%)',
          animation: 'aurora-drift 28s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute bottom-[-18%] left-[26%] h-[48vmax] w-[48vmax] rounded-full blur-[130px]"
        style={{
          background: 'radial-gradient(circle at center, var(--glow-3), transparent 64%)',
          animation: 'aurora-drift 25s ease-in-out infinite',
        }}
      />
    </div>
  );
}

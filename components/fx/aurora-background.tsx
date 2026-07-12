// Static ambient glow — two soft colour fields, no animation. Fixed behind all
// content. Colours come from theme tokens so it adapts to light/dark.
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: 'var(--aurora-opacity)' }}
    >
      <div
        className="absolute left-[6%] top-[-14%] h-[46vmax] w-[46vmax] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle at center, var(--glow-1), transparent 62%)' }}
      />
      <div
        className="absolute bottom-[-18%] right-[-6%] h-[44vmax] w-[44vmax] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle at center, var(--glow-3), transparent 62%)' }}
      />
    </div>
  );
}

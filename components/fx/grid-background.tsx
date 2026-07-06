'use client';

// A faint, slowly-panning grid with a radial mask so it fades at the edges.
// Fixed layer just above the aurora. Grain sits on top for texture.
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 100%)',
          animation: 'grid-pan 14s linear infinite',
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}

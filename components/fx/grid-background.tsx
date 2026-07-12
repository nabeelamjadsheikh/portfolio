// A faint, static grid with a radial mask so it fades at the edges. No
// animation — purely a fixed backdrop texture.
export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 35%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 35%, black 40%, transparent 100%)',
      }}
    />
  );
}

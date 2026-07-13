/**
 * AuroraBackground — fixed full-screen animated aurora mesh.
 * Uses CSS animations defined in index.css. Respects prefers-reduced-motion.
 */
export function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-green" />
    </div>
  );
}

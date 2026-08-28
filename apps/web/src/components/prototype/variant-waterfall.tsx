/*
 * PROTOTYPE — Variant Waterfall / Fountain: Three.js interactive canvas variant.
 * In-progress exploration for fluid / particle simulation in botanical hero section.
 */
import { useEffect, useRef } from "react";

export function VariantWaterfall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Initial Three.js / WebGL canvas hook placeholder
  }, []);

  return (
    <div className="relative min-h-screen bg-paper font-body text-ink">
      <header className="px-6 py-4 border-b border-ink/10 flex items-center justify-between">
        <span className="font-display font-bold text-xl tracking-tight">FENCHEM</span>
        <span className="font-tech text-xs uppercase tracking-widest text-mute-600">Three.js Waterfall Exploration</span>
      </header>
      <main className="relative flex min-h-[80vh] items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <p className="font-tech text-xs uppercase tracking-[0.2em] text-brand-green-700 mb-4">
            Under Development
          </p>
          <h1 className="font-display text-4xl sm:text-6xl text-ink font-light leading-tight">
            Fluid Botanical Motion
          </h1>
          <p className="mt-4 text-mute-700 text-base leading-relaxed">
            Exploring interactive waterfall particle flow and real-time WebGL rendering.
          </p>
        </div>
      </main>
    </div>
  );
}

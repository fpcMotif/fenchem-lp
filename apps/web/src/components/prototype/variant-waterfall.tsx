/*
 * PROTOTYPE — Variant Waterfall: "The Botanical Fountain"
 * Real-time Three.js particle waterfall and basin fountain simulation.
 * Visualizing high-purity botanical extraction through fluid physics and WebGL.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, Droplets, RefreshCw, Sliders, Waves, Wind } from "lucide-react";
import {
  company,
  createInquiryHref,
  ingredients,
} from "@/components/landing/landing-content";
interface SimulationConfig {
  particleCount: number;
  flowSpeed: number;
  splashIntensity: number;
  mistDensity: number;
  gravity: number;
  hue: number;
}

export function VariantWaterfall() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [config, setConfig] = useState<SimulationConfig>({
    particleCount: 12000,
    flowSpeed: 1.2,
    splashIntensity: 1.0,
    mistDensity: 0.8,
    gravity: 9.8,
    hue: 155, // Emerald green botanical tint
  });

  const [preset, setPreset] = useState<"gentle" | "vibrant" | "torrential">("vibrant");
  const [stats, setStats] = useState({ fps: 60, activeParticles: 12000 });

  // Three.js Waterfall System
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061510, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 1, 0);

    // Renderer with headless / non-WebGL fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    // Particle Geometries
    const count = config.particleCount;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);
    const maxLifetimes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const topWidth = 8.0;
    const topDepth = 2.0;
    const topY = 9.0;
    const basinY = -5.0;

    const colorBase = new THREE.Color(`hsl(${config.hue}, 85%, 65%)`);
    const colorFoam = new THREE.Color(0xf0fdf4);
    const colorDeep = new THREE.Color(`hsl(${config.hue - 20}, 75%, 35%)`);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start in waterfall top shelf or fountain spray
      positions[i3] = (Math.random() - 0.5) * topWidth;
      positions[i3 + 1] = topY - Math.random() * 2.0;
      positions[i3 + 2] = (Math.random() - 0.5) * topDepth;

      velocities[i3] = (Math.random() - 0.5) * 0.4;
      velocities[i3 + 1] = -Math.random() * 2.0 - 1.0;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.4;

      lifetimes[i] = Math.random() * 3.0;
      maxLifetimes[i] = 2.5 + Math.random() * 1.5;

      const mix = Math.random();
      const col = mix > 0.8 ? colorFoam : mix > 0.3 ? colorBase : colorDeep;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 3.5 + 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Particle Shader Material
    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Basin Water Mirror Mesh
    const basinGeo = new THREE.CylinderGeometry(10, 10, 0.4, 32);
    const basinMat = new THREE.MeshBasicMaterial({
      color: 0x052e16,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const basinMesh = new THREE.Mesh(basinGeo, basinMat);
    basinMesh.position.y = basinY;
    scene.add(basinMesh);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xdcfce7, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x22c55e, 3, 30);
    pointLight.position.set(0, 2, 8);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 4;
      targetY = -y * 3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const animate = (time: number) => {
      animFrameId.current = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // FPS Calculation
      frameCount++;
      fpsTimer += delta;
      if (fpsTimer >= 0.5) {
        setStats({
          fps: Math.round(frameCount / fpsTimer),
          activeParticles: config.particleCount,
        });
        frameCount = 0;
        fpsTimer = 0;
      }

      // Smooth camera orbit on mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 2;
      camera.position.y = 4 + mouseY * 1.5;
      camera.lookAt(0, 0.5, 0);

      // Animate Basin
      basinMesh.rotation.y += 0.003;

      // Update Particles
      const pos = geometry.attributes.position.array as Float32Array;
      const vel = velocities;

      const grav = config.gravity * config.flowSpeed;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        lifetimes[i] += delta;

        // Apply physics
        vel[i3 + 1] -= grav * 0.4 * delta; // Gravity pull
        pos[i3] += vel[i3] * delta * 4.0;
        pos[i3 + 1] += vel[i3 + 1] * delta * 4.0;
        pos[i3 + 2] += vel[i3 + 2] * delta * 4.0;

        // Waterfall stream convergence & turbulence
        const progress = (topY - pos[i3 + 1]) / (topY - basinY);
        pos[i3] += (Math.sin(time * 0.003 + pos[i3 + 1] * 2.0) * 0.02 * (1 - progress));

        // Basin collision / Splash fountain
        if (pos[i3 + 1] <= basinY) {
          pos[i3 + 1] = basinY;

          // Rebound splash
          const angle = Math.random() * Math.PI * 2;
          const speed = (Math.random() * 2.5 + 1.0) * config.splashIntensity;
          vel[i3] = Math.cos(angle) * speed;
          vel[i3 + 1] = (Math.random() * 4.0 + 2.5) * config.splashIntensity;
          vel[i3 + 2] = Math.sin(angle) * speed;

          // Mist fade
          if (Math.random() > 0.8) {
            lifetimes[i] = maxLifetimes[i] * 0.9;
          }
        }

        // Reset dead particle back to top shelf
        if (lifetimes[i] >= maxLifetimes[i] || pos[i3 + 1] < basinY - 2) {
          lifetimes[i] = 0;
          positions[i3] = (Math.random() - 0.5) * topWidth;
          positions[i3 + 1] = topY + (Math.random() - 0.5) * 0.8;
          positions[i3 + 2] = (Math.random() - 0.5) * topDepth;

          vel[i3] = (Math.random() - 0.5) * 0.2;
          vel[i3 + 1] = -Math.random() * 1.5 - 0.5;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.2;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      basinGeo.dispose();
      basinMat.dispose();
      renderer.dispose();
    };
  }, [config]);

  const applyPreset = (name: "gentle" | "vibrant" | "torrential") => {
    setPreset(name);
    if (name === "gentle") {
      setConfig({
        particleCount: 8000,
        flowSpeed: 0.8,
        splashIntensity: 0.6,
        mistDensity: 0.5,
        gravity: 6.0,
        hue: 160,
      });
    } else if (name === "vibrant") {
      setConfig({
        particleCount: 14000,
        flowSpeed: 1.3,
        splashIntensity: 1.2,
        mistDensity: 0.9,
        gravity: 9.8,
        hue: 152,
      });
    } else {
      setConfig({
        particleCount: 22000,
        flowSpeed: 2.0,
        splashIntensity: 1.8,
        mistDensity: 1.4,
        gravity: 14.0,
        hue: 145,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030e09] font-body text-emerald-50 selection:bg-brand-green-400 selection:text-brand-green-950">
      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-emerald-900/40 bg-[#030e09]/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl font-semibold tracking-tight text-white">FENCHEM</span>
          <span className="rounded border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 font-tech text-[10px] uppercase tracking-widest text-emerald-300">
            WebGL Waterfall Fountain
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 font-tech text-xs text-emerald-400/80">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{stats.fps} FPS</span>
            <span className="text-emerald-700">|</span>
            <span>{stats.activeParticles.toLocaleString()} PARTICLES</span>
          </div>
          <a
            href={createInquiryHref("Botanical Waterfall Formulation Inquiry")}
            className="rounded-full bg-brand-green-500 px-5 py-2 text-xs font-bold text-brand-green-950 transition hover:bg-brand-green-400"
          >
            Inquire Specifications
          </a>
        </div>
      </header>

      {/* ── Hero Simulation Canvas ── */}
      <section ref={containerRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-auto" />

        {/* Ambient Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030e09] via-transparent to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,46,22,0.15)_0%,transparent_70%)]" />

        {/* Hero Narrative Overlay */}
        <div className="pointer-events-none relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-4 py-1.5 font-tech text-xs uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-sm">
            <Droplets className="size-3.5 text-brand-green-400" />
            Continuous Botanical Extraction Flow
          </div>

          <h1 className="mt-8 font-display text-5xl font-light leading-[1.08] tracking-tight text-white sm:text-7xl">
            Fluid Vitality, <br />
            <span className="italic text-emerald-300">Documented to the Lot.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-emerald-100/80">
            Real-time particle dynamics simulating active molecular dispersion — 30 years of botanical intelligence flowing to formulators across 40+ countries.
          </p>

          {/* Interactive Simulation Controls Bar */}
          <div className="pointer-events-auto mt-10 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-emerald-800/50 bg-emerald-950/90 p-2 shadow-2xl backdrop-blur-lg">
            <span className="flex items-center gap-1.5 px-3 py-1 font-tech text-xs uppercase tracking-wider text-emerald-400">
              <Sliders className="size-3.5" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => applyPreset("gentle")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                preset === "gentle"
                  ? "bg-brand-green-500 text-brand-green-950"
                  : "text-emerald-300 hover:bg-emerald-900/60"
              }`}
            >
              Gentle Spring
            </button>
            <button
              type="button"
              onClick={() => applyPreset("vibrant")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                preset === "vibrant"
                  ? "bg-brand-green-500 text-brand-green-950"
                  : "text-emerald-300 hover:bg-emerald-900/60"
              }`}
            >
              Vibrant Cascade
            </button>
            <button
              type="button"
              onClick={() => applyPreset("torrential")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                preset === "torrential"
                  ? "bg-brand-green-500 text-brand-green-950"
                  : "text-emerald-300 hover:bg-emerald-900/60"
              }`}
            >
              High-Velocity Torrent
            </button>
          </div>
        </div>
      </section>

      {/* ── Extraction & Molecular Purity Pillars ── */}
      <section className="relative z-10 border-t border-emerald-900/50 bg-[#030e09] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
              Extraction Architecture
            </span>
            <h2 className="mt-3 font-display text-3xl font-light text-white sm:text-4xl">
              From Raw Harvest to Purified Active
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-8 backdrop-blur">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-900/40 text-emerald-400">
                <Waves className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-xl text-white">Supercritical Fluid Purity</h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-200/70">
                CO2 and water-based counter-current separation preserving delicate thermolabile bioactive fractions without chemical residues.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-8 backdrop-blur">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-900/40 text-emerald-400">
                <Wind className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-xl text-white">Micro-Fluidic Dispersion</h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-200/70">
                Standardized beadlet and water-dispersible matrices delivering exceptional bioavailability in challenging finished dosage formats.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-8 backdrop-blur">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-900/40 text-emerald-400">
                <RefreshCw className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-xl text-white">Audited Lot Continuity</h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-200/70">
                Complete chromatographic and microbial certificates of analysis accompany every lot across our six global distribution bases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Active Stream Matrix ── */}
      <section className="relative z-10 border-t border-emerald-900/40 bg-emerald-950/20 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
                Standardized Active Compounds
              </span>
              <h2 className="mt-2 font-display text-3xl text-white">Featured Portfolio Stream</h2>
            </div>
            <a
              href="#inquire"
              className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
            >
              Request Full Index <ArrowRight className="size-3.5" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing) => (
              <div
                key={ing.code}
                className="group relative overflow-hidden rounded-xl border border-emerald-900/50 bg-emerald-950/40 p-6 transition hover:border-emerald-500/50 hover:bg-emerald-950/70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-tech text-xs text-emerald-400">{ing.code}</span>
                  <span className="rounded-full bg-emerald-900/50 px-2.5 py-0.5 font-tech text-[10px] text-emerald-300">
                    {ing.application}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-medium text-white group-hover:text-emerald-200">
                  {ing.name}
                </h3>
                <p className="font-display text-sm italic text-emerald-400/80">{ing.latin}</p>
                <div className="mt-6 flex items-center justify-between border-t border-emerald-900/40 pt-4 font-tech text-xs text-emerald-300/80">
                  <span>{ing.purity}</span>
                  <span>{ing.form}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Finale & Inquiry ── */}
      <footer id="inquire" className="relative z-10 border-t border-emerald-900/60 bg-[#020a06] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="font-tech text-xs uppercase tracking-[0.24em] text-brand-green-400">
            Partner with Fenchem
          </span>
          <h2 className="mt-4 font-display text-4xl text-white">
            Engineering your next formulation flow.
          </h2>
          <p className="mt-4 text-emerald-200/70">
            Share your purity target and delivery format — our technical team returns documentation and sample dossiers within 24 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={createInquiryHref("Botanical Fountain Partnership")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-8 py-4 font-semibold text-brand-green-950 transition hover:bg-brand-green-400"
            >
              Submit Formulation Target <ArrowRight className="size-4" />
            </a>
          </div>
          <p className="mt-12 font-tech text-xs text-emerald-700">
            © {new Date().getFullYear()} {company.name}. 30 Years of Botanical Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}

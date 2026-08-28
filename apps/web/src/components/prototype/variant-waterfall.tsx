/*
 * PROTOTYPE — Variant Waterfall: "The Botanical Fountain"
 * Complete B2B Production Landing Page powered by real-time Three.js WebGL fluid physics.
 * Features:
 *   1. Sticky Nav with Portfolio Dropdown & Mobile Menu
 *   2. Real-time Three.js Particle Waterfall & Fountain Hero
 *   3. Stat Strip (30+ Years, 6 Global Bases, ISO/GMP, 40+ Countries)
 *   4. Active Compound Marquee Ticker
 *   5. Three Application Domain Cards (Nutrition, Food & Beverage, Personal Care)
 *   6. Filterable Standardized Ingredient Matrix
 *   7. Deep Product Dossier (Analytical Panel & Format Chips)
 *   8. Live Interactive Formulation Presenter (Dynamic Spec Matcher)
 *   9. Quality Standards, Certifications & 6 Global Bases
 *  10. High-Converting Finale & Enterprise Footer
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Droplets,
  FileDown,
  Globe,
  Menu,
  Pause,
  Play,
  Search,
  Sliders,
  X,
} from "lucide-react";
import { EASE } from "@/components/prototype/motion-constants";
import {
  certifications,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  getIngredientsByApplication,
  industries,
  ingredients,
  pillars,
  regions,
  type DivisionKey,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Simulation Types ─────────────────────────────── */

interface SimulationConfig {
  particleCount: number;
  flowSpeed: number;
  splashIntensity: number;
  mistDensity: number;
  gravity: number;
  hue: number;
}

const STATS = [
  { value: "30+", unit: "Years", desc: "Botanical expertise since 1995" },
  { value: "6", unit: "Global Bases", desc: "R&D hubs across three continents" },
  { value: "ISO/GMP", unit: "Certified", desc: "Audited quality on every lot" },
  { value: "40+", unit: "Countries", desc: "Regulated markets supplied" },
] as const;

const DIVISION_DOT: Record<DivisionKey, string> = {
  nutrition: "bg-nutrition border border-brand-green-700/30",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  chem: "bg-chem",
  agro: "bg-agro",
  feed: "bg-feed",
};

const MENU_APPLICATIONS: readonly IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
] as const;



/* ─────────────────────────────── Navigation ─────────────────────────────── */

function PortfolioMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="portfolio-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-1.5 font-body text-sm text-emerald-200/80 transition-colors duration-200 hover:text-brand-green-400 focus-visible:outline-2"
      >
        Portfolio
        <ChevronDown
          aria-hidden
          className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="portfolio-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[640px] rounded-lg border border-emerald-900/60 bg-[#04140d]/95 p-1 shadow-2xl backdrop-blur-xl"
            style={{ x: "-50%" }}
          >
            <div className="grid grid-cols-3 gap-px bg-emerald-900/30 rounded-md overflow-hidden">
              {MENU_APPLICATIONS.map((application) => {
                const items = getIngredientsByApplication(application).slice(0, 4);
                const division = divisionForApplication(application);
                return (
                  <div key={application} className="bg-[#04140d] p-5">
                    <p className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.2em] text-emerald-400">
                      <span aria-hidden className={`size-2 rounded-full ${DIVISION_DOT[division]}`} />
                      {application}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {items.map((item) => (
                        <li key={item.code}>
                          <a
                            href="#matrix"
                            onClick={() => setOpen(false)}
                            className="font-body text-sm text-emerald-100 transition-colors duration-200 hover:text-brand-green-400 focus-visible:outline-2"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-emerald-900/50 px-5 py-3">
              <span className="font-tech text-xs text-emerald-400/80">{ingredients.length} active compounds</span>
              <a
                href="#formulation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-green-400 transition-colors duration-200 hover:text-brand-green-300"
              >
                Build formulation <ArrowRight aria-hidden className="size-3.5" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const links = [
    { label: "Industries", href: "#industries" },
    { label: "Portfolio", href: "#matrix" },
    { label: "Dossier", href: "#dossier" },
    { label: "Formulation", href: "#formulation" },
    { label: "Standards", href: "#standards" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded text-emerald-200 transition-colors hover:text-white"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={open ? "close" : "open"}
            className="inline-flex"
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.25 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </m.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute inset-x-0 top-full border-b border-emerald-900/60 bg-[#030e09]/95 px-6 py-4 shadow-xl backdrop-blur-xl"
          >
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-body text-base text-emerald-100 transition-colors hover:text-brand-green-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────── Three.js Waterfall Hero ─────────────────────────────── */

function WaterfallHeroCanvas({
  config,
  setStats,
  preset,
  applyPreset,
}: {
  config: SimulationConfig;
  setStats: (st: { fps: number; activeParticles: number }) => void;
  preset: "gentle" | "vibrant" | "torrential";
  applyPreset: (p: "gentle" | "vibrant" | "torrential") => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030e09, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 1, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return;
    }

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

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const animate = (time: number) => {
      animFrameId.current = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

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

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 2;
      camera.position.y = 4 + mouseY * 1.5;
      camera.lookAt(0, 0.5, 0);

      basinMesh.rotation.y += 0.003;

      const pos = geometry.attributes.position.array as Float32Array;
      const vel = velocities;
      const grav = config.gravity * config.flowSpeed;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        lifetimes[i] += delta;

        vel[i3 + 1] -= grav * 0.4 * delta;
        pos[i3] += vel[i3] * delta * 4.0;
        pos[i3 + 1] += vel[i3 + 1] * delta * 4.0;
        pos[i3 + 2] += vel[i3 + 2] * delta * 4.0;

        const progress = (topY - pos[i3 + 1]) / (topY - basinY);
        pos[i3] += Math.sin(time * 0.003 + pos[i3 + 1] * 2.0) * 0.02 * (1 - progress);

        if (pos[i3 + 1] <= basinY) {
          pos[i3 + 1] = basinY;
          const angle = Math.random() * Math.PI * 2;
          const speed = (Math.random() * 2.5 + 1.0) * config.splashIntensity;
          vel[i3] = Math.cos(angle) * speed;
          vel[i3 + 1] = (Math.random() * 4.0 + 2.5) * config.splashIntensity;
          vel[i3 + 2] = Math.sin(angle) * speed;

          if (Math.random() > 0.8) {
            lifetimes[i] = maxLifetimes[i] * 0.9;
          }
        }

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

  return (
    <section ref={containerRef} className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-auto" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030e09] via-transparent to-transparent opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,46,22,0.18)_0%,transparent_70%)]" />

      <div className="pointer-events-none relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-4 py-1.5 font-tech text-xs uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-sm">
          <Droplets className="size-3.5 text-brand-green-400" />
          Continuous Botanical Extraction Flow
        </div>

        <h1 className="mt-8 font-display text-5xl font-light leading-[1.06] tracking-tight text-white sm:text-7xl">
          Fluid Vitality, <br />
          <span className="italic text-emerald-300">Refined by Botanical Science.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-emerald-100/80">
          Fenchem converts raw botanical complexity into precisely specified, clinically validated actives — supplied at industrial scale to formulators in more than forty countries.
        </p>

        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#matrix"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-7 py-3.5 font-body text-sm font-bold text-brand-green-950 transition hover:bg-brand-green-400 focus-visible:outline-2"
          >
            Explore Portfolio
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#formulation"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-7 py-3.5 font-body text-sm font-semibold text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-900/60 focus-visible:outline-2"
          >
            Build Formulation
          </a>
        </div>

        {/* Preset Controls */}
        <div className="pointer-events-auto mt-10 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-emerald-800/50 bg-emerald-950/90 p-2 shadow-2xl backdrop-blur-lg">
          <span className="flex items-center gap-1.5 px-3 py-1 font-tech text-xs uppercase tracking-wider text-emerald-400">
            <Sliders className="size-3.5" /> Fluid Preset:
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
            High Torrent
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Marquee Ticker ─────────────────────────────── */

function TickerSection() {
  const [paused, setPaused] = useState(false);
  const featured = getFeaturedIngredients();

  return (
    <section aria-label="Featured compounds ticker" className="border-y border-emerald-900/40 bg-[#020a06] py-4">
      <div className="flex items-center gap-4 overflow-hidden">
        <button
          type="button"
          aria-label={paused ? "Resume marquee" : "Pause marquee"}
          onClick={() => setPaused((v) => !v)}
          className="ml-6 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-emerald-800/60 text-emerald-400 transition hover:bg-emerald-900/50"
        >
          {paused ? <Play className="size-3.5 ml-0.5" /> : <Pause className="size-3.5" />}
        </button>
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`flex shrink-0 items-center gap-8 ${paused ? "" : "animate-[marquee_40s_linear_infinite]"}`}
          >
            {featured.concat(featured).map((item, idx) => (
              <a
                key={`${item.code}-${idx}`}
                href="#matrix"
                className="inline-flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-emerald-300/80 transition hover:text-brand-green-400"
              >
                <span className="text-emerald-600">{item.code}</span>
                <span className="font-semibold text-white">{item.name}</span>
                <span className="italic text-emerald-400/60">({item.latin})</span>
                <span className="text-emerald-800">·</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Stat Band ─────────────────────────────── */

function StatBand() {
  return (
    <section aria-label="Key statistics" className="border-b border-emerald-900/40 bg-[#030e09] px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {STATS.map((st) => (
          <div key={st.unit} className="border-l-2 border-emerald-500/50 pl-5">
            <p className="font-display text-4xl font-light tracking-tight text-white sm:text-5xl">{st.value}</p>
            <p className="mt-1 font-tech text-xs uppercase tracking-widest text-emerald-400">{st.unit}</p>
            <p className="mt-1 text-xs text-emerald-200/60">{st.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section id="industries" className="bg-[#030e09] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
            01 — Application Domains
          </span>
          <h2 className="mt-3 font-display text-3xl font-light text-white sm:text-5xl">
            Built for Three Core Industries
          </h2>
          <p className="mt-4 max-w-2xl text-emerald-200/70 text-base leading-relaxed">
            Clinically supported bioactives standardized for potency, dose accuracy and clean-label formulation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {industries.map((ind, i) => (
            <a
              key={ind.title}
              href="#matrix"
              className="group relative overflow-hidden rounded-2xl border border-emerald-900/50 bg-[#051810]/60 p-6 transition-all duration-300 hover:border-emerald-500/50 hover:bg-[#051810]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-emerald-950">
                <img
                  src={ind.image.src}
                  alt={ind.image.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030e09] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#030e09]/80 px-3 py-1 font-tech text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                  0{i + 1} Division
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium text-white group-hover:text-emerald-300">
                {ind.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-200/70">{ind.copy}</p>
              <div className="mt-6 flex items-center gap-2 font-tech text-xs font-semibold uppercase tracking-wider text-brand-green-400">
                Explore Ingredients <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Matrix Table ─────────────────────────────── */

function MatrixSection() {
  const [filter, setFilter] = useState<"All" | IngredientApplication>("All");
  const [search, setSearch] = useState("");

  const filtered = ingredients.filter((item) => {
    const matchesTab = filter === "All" || item.application === filter;
    const matchesQuery =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.latin.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <section id="matrix" className="border-t border-emerald-900/50 bg-[#020a06] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
              02 — Active Compounds
            </span>
            <h2 className="mt-2 font-display text-3xl font-light text-white sm:text-4xl">
              Standardized Ingredient Matrix
            </h2>
          </div>
          <a
            href={createInquiryHref("Full Portfolio Spec Request")}
            className="inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-5 py-2.5 font-body text-xs font-bold text-brand-green-950 transition hover:bg-brand-green-400"
          >
            Request Full Index <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-900/60 bg-[#04140d] p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {(["All", "Nutrition", "Food & Beverage", "Personal Care"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-4 py-2 font-tech text-xs uppercase tracking-wider transition ${
                  filter === tab
                    ? "bg-brand-green-500 text-brand-green-950 font-bold"
                    : "text-emerald-300/80 hover:bg-emerald-900/50 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-500" />
            <input
              type="text"
              placeholder="Search active or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-emerald-800/60 bg-[#020a06] py-2 pl-9 pr-4 text-xs text-white placeholder-emerald-700 focus:border-brand-green-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-emerald-900/50 bg-[#030e09]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-emerald-900/60 bg-emerald-950/40 font-tech text-xs uppercase tracking-wider text-emerald-400">
              <tr>
                <th className="px-6 py-4">Compound</th>
                <th className="px-6 py-4">Botanical Source</th>
                <th className="px-6 py-4">Standardized Assay</th>
                <th className="px-6 py-4">Physical Form</th>
                <th className="px-6 py-4">Application</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/40 font-body">
              {filtered.map((item) => (
                <tr key={item.code} className="transition hover:bg-emerald-950/30">
                  <td className="px-6 py-4">
                    <span className="font-tech text-[10px] text-emerald-500 block">{item.code}</span>
                    <span className="font-semibold text-white">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 font-display italic text-emerald-300/80">{item.latin}</td>
                  <td className="px-6 py-4 font-tech text-xs text-emerald-200">{item.purity}</td>
                  <td className="px-6 py-4 text-xs text-emerald-300/70">{item.form}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-900/50 px-3 py-1 font-tech text-[10px] text-emerald-300">
                      {item.application}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={createInquiryHref(`Spec Request: ${item.name} (${item.code})`)}
                      className="inline-flex items-center gap-1 font-tech text-xs font-semibold text-brand-green-400 hover:text-brand-green-300"
                    >
                      Request Spec <ArrowUpRight className="size-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Product Dossier ─────────────────────────────── */

function DossierSection() {
  const ashwa = ingredients.find((i) => i.code === "FN-014") || ingredients[0];

  return (
    <section id="dossier" className="border-t border-emerald-900/50 bg-[#030e09] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
            03 — Analytical Dossier
          </span>
          <h2 className="mt-2 font-display text-3xl font-light text-white sm:text-4xl">
            One Active, Documented to the Lot
          </h2>
          <p className="mt-3 text-emerald-200/70 max-w-xl">
            Every compound in our matrix ships with exhaustive identity, chromatographic purity, and heavy metal testing panels.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-center rounded-2xl border border-emerald-900/60 bg-[#04140d] p-8 md:p-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-emerald-800/40">
              <img
                src={ashwa.image.src}
                alt={ashwa.image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 rounded bg-[#030e09]/80 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-brand-green-400 backdrop-blur">
                {ashwa.code} Analytical Reference
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand-green-500/20 px-3 py-1 font-tech text-xs text-brand-green-400">
                {ashwa.category}
              </span>
              <span className="font-tech text-xs text-emerald-500">{ashwa.application}</span>
            </div>

            <h3 className="mt-4 font-display text-3xl font-medium text-white">{ashwa.name}</h3>
            <p className="font-display text-lg italic text-emerald-300">{ashwa.latin}</p>

            <p className="mt-4 text-sm leading-relaxed text-emerald-200/80">
              A clinically studied, root-only adaptogenic extract standardized to ≥ 5% withanolides by HPLC. Certified Kosher, Halal, Non-GMO, and verified compliant with USP/EP monograph parameters.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-emerald-900/50 py-4 font-tech text-xs">
              <div>
                <span className="text-emerald-600 block uppercase tracking-wider">Assay / Purity</span>
                <span className="text-white font-semibold">{ashwa.purity}</span>
              </div>
              <div>
                <span className="text-emerald-600 block uppercase tracking-wider">Physical Form</span>
                <span className="text-white font-semibold">{ashwa.form}</span>
              </div>
              <div>
                <span className="text-emerald-600 block uppercase tracking-wider">Shelf Life</span>
                <span className="text-white font-semibold">24 Months Sealed</span>
              </div>
              <div>
                <span className="text-emerald-600 block uppercase tracking-wider">Origin Base</span>
                <span className="text-white font-semibold">Nanjing R&D Hub</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={createInquiryHref("Ashwagandha KSM-66 Technical Dossier")}
                className="inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-6 py-3 font-body text-xs font-bold text-brand-green-950 transition hover:bg-brand-green-400"
              >
                Request Spec Dossier <ArrowRight className="size-3.5" />
              </a>
              <a
                href={createInquiryHref("Ashwagandha KSM-66 Technical Data Sheet (TDS)")}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-700/60 px-6 py-3 font-body text-xs font-semibold text-emerald-200 transition hover:bg-emerald-900/40"
              >
                <FileDown className="size-3.5" /> Download TDS Summary
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Formulation Presenter ─────────────────────────────── */

function FormulationPresenter() {
  const [app, setApp] = useState<IngredientApplication>("Nutrition");
  const [format, setFormat] = useState("Beadlet");
  const [standard, setStandard] = useState("ISO 9001 + GMP");

  const matching = getIngredientsByApplication(app);

  return (
    <section id="formulation" className="border-t border-emerald-900/50 bg-[#020a06] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
            04 — Live Formulation Tool
          </span>
          <h2 className="mt-2 font-display text-3xl font-light text-white sm:text-4xl">
            Engineer Your Target Specification
          </h2>
          <p className="mt-3 text-emerald-200/70 max-w-xl">
            Select your product parameters — our lab matches active compounds and returns a validated proposal within one business day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls */}
          <div className="space-y-6 lg:col-span-6 rounded-2xl border border-emerald-900/60 bg-[#04140d] p-8">
            <div>
              <label className="block font-tech text-xs uppercase tracking-wider text-emerald-400 mb-3">
                1. Target Application
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MENU_APPLICATIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setApp(opt)}
                    className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                      app === opt
                        ? "bg-brand-green-500 text-brand-green-950"
                        : "border border-emerald-900 bg-[#020a06] text-emerald-300 hover:bg-emerald-950"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-tech text-xs uppercase tracking-wider text-emerald-400 mb-3">
                2. Delivery Format
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Powder", "Beadlet", "Oil Suspension", "Granular"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormat(opt)}
                    className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                      format === opt
                        ? "bg-brand-green-500 text-brand-green-950"
                        : "border border-emerald-900 bg-[#020a06] text-emerald-300 hover:bg-emerald-950"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-tech text-xs uppercase tracking-wider text-emerald-400 mb-3">
                3. Regulatory Certification
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["ISO 9001 + GMP", "FSSC 22000 + HACCP", "Kosher + Halal", "USP Monograph"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setStandard(opt)}
                    className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                      standard === opt
                        ? "bg-brand-green-500 text-brand-green-950"
                        : "border border-emerald-900 bg-[#020a06] text-emerald-300 hover:bg-emerald-950"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Brief */}
          <div className="lg:col-span-6 rounded-2xl border border-emerald-800/60 bg-[#051e12] p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-800/50 pb-4">
                <span className="font-tech text-xs uppercase tracking-widest text-emerald-400">
                  Live Formulation Brief
                </span>
                <span className="font-tech text-xs text-emerald-300/70">FN-SPEC-2026</span>
              </div>

              <div className="mt-6 space-y-3 font-tech text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-500">Domain:</span>
                  <span className="font-semibold text-white">{app}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-500">Format:</span>
                  <span className="font-semibold text-white">{format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-500">Standard:</span>
                  <span className="font-semibold text-white">{standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-500">Matching Actives:</span>
                  <span className="font-semibold text-brand-green-400">{matching.length} compounds</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#020a06]/80 p-4 border border-emerald-900/60">
                <span className="font-tech text-[10px] uppercase tracking-wider text-emerald-500 block mb-2">
                  Matching Portfolio Extractives:
                </span>
                <ul className="space-y-1.5 font-body text-xs text-emerald-200">
                  {matching.map((m) => (
                    <li key={m.code} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3 text-brand-green-400 shrink-0" />
                      <span>{m.name}</span>
                      <span className="font-display italic text-emerald-400/60">({m.purity})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={createInquiryHref(`Formulation Spec: ${app} | ${format} | ${standard}`)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green-500 py-3.5 font-body text-sm font-bold text-brand-green-950 transition hover:bg-brand-green-400"
              >
                Submit This Specification <ArrowRight className="size-4" />
              </a>
              <p className="mt-2 text-center font-tech text-[11px] text-emerald-500">
                Validated response & analytical certificate within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Origin & Standards ─────────────────────────────── */

function StandardsSection() {
  return (
    <section id="standards" className="border-t border-emerald-900/50 bg-[#030e09] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="font-tech text-xs uppercase tracking-[0.24em] text-emerald-400">
            05 — Quality & Compliance
          </span>
          <h2 className="mt-3 font-display text-3xl font-light text-white sm:text-5xl">
            Documented Science-Backed Standards
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-emerald-900/50 bg-[#04140d] p-8">
              <h3 className="font-display text-xl font-medium text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-200/70">{p.copy}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 rounded-2xl border border-emerald-900/60 bg-[#020a06] p-8 text-center">
          <span className="font-tech text-xs uppercase tracking-widest text-emerald-400">
            Audited Quality Management Certifications
          </span>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-emerald-800/60 bg-emerald-950/60 px-5 py-2 font-tech text-xs font-semibold text-emerald-200"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* 6 Global Bases */}
        <div className="mt-16">
          <span className="font-tech text-xs uppercase tracking-widest text-emerald-400 block mb-6 text-center">
            Six Global Operating Bases
          </span>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {regions.map((reg) => (
              <div
                key={reg.city}
                className="rounded-xl border border-emerald-900/50 bg-[#04140d] p-4 text-center"
              >
                <Globe className="size-4 mx-auto text-emerald-400 mb-2" />
                <h4 className="font-display text-base font-semibold text-white">{reg.city}</h4>
                <p className="text-xs text-emerald-400/80">{reg.country}</p>
                <span className="mt-2 block font-tech text-[10px] text-emerald-600">{reg.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale & Footer ─────────────────────────────── */

function FinaleSection() {
  return (
    <footer id="contact" className="relative border-t border-emerald-900/70 bg-[#020805] px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <span className="font-tech text-xs uppercase tracking-[0.24em] text-brand-green-400">
          Partner with Fenchem
        </span>
        <h2 className="mt-4 font-display text-4xl font-light text-white sm:text-5xl">
          Your Next Formulation, Engineered to Specification.
        </h2>
        <p className="mt-4 text-emerald-200/80 text-base leading-relaxed">
          Send a target specification — purity, delivery format, matrix, regulatory map — and our laboratory returns a validated proposal with complete documentation within one business day.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={createInquiryHref("Botanical Fountain Partnership Inquiry")}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-8 py-4 font-body text-base font-bold text-brand-green-950 transition hover:bg-brand-green-400"
          >
            Submit Specification Inquiry
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-16 border-t border-emerald-900/50 pt-10 flex flex-wrap items-center justify-between gap-4 font-tech text-xs text-emerald-600">
          <span>© {new Date().getFullYear()} {company.name}. 30 Years of Botanical Intelligence.</span>
          <div className="flex gap-6">
            <a href="#industries" className="hover:text-emerald-400">Industries</a>
            <a href="#matrix" className="hover:text-emerald-400">Portfolio</a>
            <a href="#standards" className="hover:text-emerald-400">Compliance</a>
            <a href="mailto:sales@fenchem.com" className="hover:text-emerald-400">sales@fenchem.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root Export ─────────────────────────────── */

export function VariantWaterfall() {
  const [config, setConfig] = useState<SimulationConfig>({
    particleCount: 14000,
    flowSpeed: 1.2,
    splashIntensity: 1.1,
    mistDensity: 0.8,
    gravity: 9.8,
    hue: 155,
  });

  const [preset, setPreset] = useState<"gentle" | "vibrant" | "torrential">("vibrant");
  const [stats, setStats] = useState({ fps: 60, activeParticles: 14000 });

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
        flowSpeed: 1.2,
        splashIntensity: 1.1,
        mistDensity: 0.8,
        gravity: 9.8,
        hue: 155,
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
    <LazyMotion features={domAnimation} strict>
      <div className="relative min-h-screen bg-[#030e09] font-body text-emerald-50 selection:bg-brand-green-400 selection:text-brand-green-950">
        {/* Sticky Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-emerald-900/40 bg-[#030e09]/85 px-6 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold tracking-tight text-white">FENCHEM</span>
              <span className="hidden sm:inline-block rounded border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 font-tech text-[10px] uppercase tracking-widest text-emerald-300">
                Since 1995
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <PortfolioMenu />
              <a href="#industries" className="text-sm text-emerald-200/80 transition hover:text-white">Industries</a>
              <a href="#matrix" className="text-sm text-emerald-200/80 transition hover:text-white">Portfolio</a>
              <a href="#dossier" className="text-sm text-emerald-200/80 transition hover:text-white">Dossier</a>
              <a href="#formulation" className="text-sm text-emerald-200/80 transition hover:text-white">Formulation</a>
              <a href="#standards" className="text-sm text-emerald-200/80 transition hover:text-white">Standards</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 font-tech text-xs text-emerald-400/80">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{stats.fps} FPS</span>
              <span className="text-emerald-700">|</span>
              <span>{stats.activeParticles.toLocaleString()} PARTICLES</span>
            </div>
            <a
              href="#contact"
              className="hidden sm:inline-flex rounded-full bg-brand-green-500 px-5 py-2 text-xs font-bold text-brand-green-950 transition hover:bg-brand-green-400"
            >
              Inquire Spec
            </a>
            <MobileNav />
          </div>
        </header>

        {/* Main Content Sections */}
        <main>
          <WaterfallHeroCanvas
            config={config}
            setStats={setStats}
            preset={preset}
            applyPreset={applyPreset}
          />
          <TickerSection />
          <StatBand />
          <IndustriesSection />
          <MatrixSection />
          <DossierSection />
          <FormulationPresenter />
          <StandardsSection />
          <FinaleSection />
        </main>
      </div>
    </LazyMotion>
  );
}

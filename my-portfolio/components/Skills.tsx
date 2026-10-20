'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMysql,
} from 'react-icons/si';

const CARAMEL = '#C4A47C';
const GOLD_GRADIENT = 'linear-gradient(120deg, #F6E8CF 0%, #D9BC93 40%, #C4A47C 70%, #9C7C4F 100%)';
const EASE = [0.16, 1, 0.3, 1] as const;

type Category = 'Front-end' | 'Back-end';

type Skill = {
  name: string;
  level: number;
  category: Category;
  desc: string;
  icon: React.ReactNode;
};

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 95, category: 'Front-end', icon: <SiHtml5 />, desc: 'Expert level knowledge of semantic HTML5 and modern CSS3 techniques' },
  { name: 'JavaScript', level: 85, category: 'Front-end', icon: <SiJavascript />, desc: 'Strong proficiency in ES6+, DOM manipulation, and modern frameworks' },
  { name: 'React', level: 80, category: 'Front-end', icon: <SiReact />, desc: 'Experience with React hooks, state management, and component architecture' },
  { name: 'Node.js', level: 75, category: 'Back-end', icon: <SiNodedotjs />, desc: 'Server-side JavaScript development with Express and REST APIs' },
  { name: 'Python', level: 70, category: 'Back-end', icon: <SiPython />, desc: 'Python development with Django and data analysis tools' },
  { name: 'SQL', level: 65, category: 'Back-end', icon: <SiMysql />, desc: 'Database design, optimization, and complex queries' },
];

const FILTERS = ['All', 'Front-end', 'Back-end'] as const;
type Filter = (typeof FILTERS)[number];

const proficiency = (v: number) =>
  v >= 90 ? 'Expert' : v >= 80 ? 'Advanced' : v >= 70 ? 'Proficient' : 'Intermediate';

/* ============ 3D Connected Particle Background ============ */
type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let particles: Particle[] = [];

    const BOUND = 420;
    const FOV = 900;
    const LINK = 190;

    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let angle = 0;

    const init = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(100, Math.max(40, (w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: (Math.random() * 2 - 1) * BOUND,
        y: (Math.random() * 2 - 1) * BOUND,
        z: (Math.random() * 2 - 1) * BOUND,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const proj = new Float32Array(0);
    let px = proj;
    let py = proj;
    let pz = proj;
    let ps = proj;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      smooth.x += (mouse.x - smooth.x) * 0.04;
      smooth.y += (mouse.y - smooth.y) * 0.04;
      if (!reduceMotion) angle += 0.0014;

      const ry = angle + smooth.x * 0.45;
      const rx = smooth.y * -0.3;
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);

      const n = particles.length;
      if (px.length !== n) {
        px = new Float32Array(n);
        py = new Float32Array(n);
        pz = new Float32Array(n);
        ps = new Float32Array(n);
      }

      ctx.clearRect(0, 0, w, h);

      const ox = w * 0.5;
      const oy = h * 0.5;

      for (let i = 0; i < n; i++) {
        const p = particles[i];
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.x > BOUND || p.x < -BOUND) p.vx *= -1;
          if (p.y > BOUND || p.y < -BOUND) p.vy *= -1;
          if (p.z > BOUND || p.z < -BOUND) p.vz *= -1;
        }

        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;

        const s = FOV / (FOV + z2 + BOUND);
        px[i] = ox + x1 * s;
        py[i] = oy + y2 * s;
        pz[i] = z2;
        ps[i] = s;
      }

      // መስመሮችን ማገናኘት
      ctx.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < LINK * LINK) {
            const d = Math.sqrt(d2);
            const depth = (ps[i] + ps[j]) / 2;
            const alpha = (1 - d / LINK) * 0.5 * Math.min(1, depth * 0.9);
            ctx.strokeStyle = `rgba(196,164,124,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
          }
        }
      }

      // ነጥቦችን መሳል
      const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => pz[b] - pz[a]);
      for (const i of order) {
        const r = Math.max(0.8, ps[i] * 2.1);
        const alpha = Math.min(1, 0.35 + ps[i] * 0.55);
        ctx.fillStyle = `rgba(214,184,142,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    init();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(init);
    ro.observe(canvas.parentElement!);
    window.addEventListener('mousemove', onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(196,164,124,0.10), transparent 70%)',
        }}
      />
    </div>
  );
};

/* ============ Cards view ============ */
const CardsView = ({
  list,
  active,
  onSelect,
}: {
  list: Skill[];
  active: string;
  onSelect: (n: string) => void;
}) => (
  <motion.div
    key="cards"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: EASE }}
    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
  >
    {list.map((s, i) => {
      const isActive = s.name === active;
      return (
        <motion.button
          key={s.name}
          layout
          type="button"
          onClick={() => onSelect(s.name)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
          whileHover={{ y: -6 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
          }}
          className="group relative overflow-hidden rounded-2xl p-6 text-left transition-colors duration-300 backdrop-blur-sm"
          style={{
            background: isActive ? 'rgba(196,164,124,0.12)' : 'rgba(20,20,20,0.4)',
            border: `1px solid ${isActive ? 'rgba(196,164,124,0.55)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: isActive ? '0 20px 50px -20px rgba(196,164,124,0.35)' : 'none',
          }}
        >
          {/* spotlight */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), rgba(196,164,124,0.16), transparent 70%)',
            }}
            aria-hidden
          />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{
                  color: CARAMEL,
                  background: 'rgba(196,164,124,0.1)',
                  border: '1px solid rgba(196,164,124,0.25)',
                }}
              >
                {s.icon}
              </span>
              <h4 className="mt-4 text-lg font-semibold text-white">{s.name}</h4>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                {s.category} · {proficiency(s.level)}
              </span>
            </div>
          </div>

          <p className="relative mt-5 text-xs leading-relaxed text-zinc-400">{s.desc}</p>
        </motion.button>
      );
    })}
  </motion.div>
);

/* ============ Main ============ */
const Skills = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState(skills[0].name);

  const list = useMemo(
    () => (filter === 'All' ? skills : skills.filter((s) => s.category === filter)),
    [filter]
  );

  // keep the active skill valid when the filter changes
  const safeActive = list.some((s) => s.name === active) ? active : list[0].name;

  return (
    <section id="skills" className="relative overflow-hidden py-16 space-y-12">
      
      {/* 3D የስተጀርባ ነጥቦች */}
      <ParticleField />

      {/* ይዘቱ ከስተጀርባው በላይ እንዲሆን 'relative z-10' ተጨምሯል */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: CARAMEL }} />
              <span className="text-sm font-medium uppercase tracking-[0.25em]" style={{ color: CARAMEL }}>
                Skills
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              My{' '}
              <span
                style={{
                  backgroundImage: GOLD_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Technical
              </span>{' '}
              Skills
            </h2>
            <p className="text-sm text-zinc-500">
              {list.length} technologies — pick a filter to explore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Category filter */}
            <div
              className="flex rounded-full p-1 backdrop-blur-sm"
              style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors"
                  style={{ color: filter === f ? '#000' : 'rgba(255,255,255,0.6)' }}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="skills-filter"
                      className="absolute inset-0 rounded-full"
                      style={{ background: CARAMEL }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <CardsView key={`cards-${filter}`} list={list} active={safeActive} onSelect={setActive} />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
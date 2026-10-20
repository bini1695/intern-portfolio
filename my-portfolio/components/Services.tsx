'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiShare2,
  FiArrowUpRight,
} from 'react-icons/fi';

const CARAMEL = '#C4A47C';

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

/* ============ Data ============ */
const services = [
  {
    id: '01',
    icon: <FiCode />,
    title: 'Web Development',
    desc: 'End-to-end development of responsive, fast, and accessible web applications — from pixel-perfect interfaces to robust backends.',
  },
  {
    id: '02',
    icon: <FiLayout />,
    title: 'UI/UX Design',
    desc: 'Clear user journeys and cohesive interfaces. Design systems that bridge design and production with consistency.',
  },
  {
    id: '03',
    icon: <FiSmartphone />,
    title: 'Mobile Applications',
    desc: 'Cross-platform mobile apps built with React Native — smooth, purposeful experiences on every screen.',
  },
  {
    id: '04',
    icon: <FiShare2 />,
    title: 'API Integration',
    desc: 'Secure, dependable integrations that connect the tools your business relies on — with clean, well-documented APIs.',
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden py-24 space-y-14">
      
      {/* 3D የስተጀርባ ነጥቦች */}
      <ParticleField />

      {/* ይዘቱ ከስተጀርባው በላይ እንዲሆን 'relative z-10' ተጨምሯል */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* ===== Centered Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: CARAMEL }} />
            <span
              className="text-sm uppercase tracking-[0.25em] font-medium"
              style={{ color: CARAMEL }}
            >
              Services
            </span>
            <span className="w-8 h-px" style={{ background: CARAMEL }} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Services
          </h2>

          <p className="text-lg text-zinc-400 leading-relaxed">
            Delivering high-quality digital solutions tailored to your needs.
          </p>
        </motion.div>

        {/* ===== Services Grid ===== */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              // 'backdrop-blur-md' ተጨምሯል ስተጀርባው እየታየ ካርዱ ግልጽ እንዲሆን
              className="group relative rounded-2xl p-8 overflow-hidden transition-all duration-500 backdrop-blur-md"
              style={{
                background: 'rgba(20,20,20,0.6)',
                border: '1px solid rgba(196,164,124,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(196,164,124,0.5)';
                e.currentTarget.style.boxShadow =
                  '0 20px 50px -20px rgba(196,164,124,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(196,164,124,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Corner caramel glow */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle, rgba(196,164,124,0.35), transparent 70%)',
                }}
              />

              {/* Ghost number */}
              <span
                className="pointer-events-none absolute top-5 right-6 font-mono text-5xl font-black select-none transition-colors duration-700"
                style={{ color: 'rgba(255,255,255,0.03)' }}
              >
                {service.id}
              </span>

              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: 'rgba(196,164,124,0.10)',
                    border: '1px solid rgba(196,164,124,0.30)',
                    color: CARAMEL,
                  }}
                >
                  {service.icon}
                </div>
              </div>

              <h3 className="relative text-xl md:text-2xl font-bold mb-3 text-white transition-colors duration-300 group-hover:text-[#C4A47C]">
                {service.title}
              </h3>

              <p className="relative text-zinc-400 leading-relaxed mb-6">
                {service.desc}
              </p>

              <a
                href="#contact"
                className="relative inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                style={{ color: CARAMEL }}
              >
                Learn more
                <FiArrowUpRight className="transition-transform duration-300" />
              </a>

              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: CARAMEL }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
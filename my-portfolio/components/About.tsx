'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBookOpen, FiGlobe } from 'react-icons/fi';

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

/* ============ Data ============ */
const stats = [
  { value: '3+', label: 'Projects Completed' },
  { value: '2+', label: 'Years Experience' },
  { value: '70%', label: 'Client Satisfaction' },
];

const facts = [
  { icon: <FiBriefcase />, label: 'Specialization', value: 'Web Development' },
  { icon: <FiUser />, label: 'Experience Level', value: 'Junior Professional' },
  { icon: <FiBookOpen />, label: 'Education', value: 'Software Engineering' },
  { icon: <FiGlobe />, label: 'Languages', value: 'English, Amharic' },
];

const counters = [
  { label: 'Happy Clients', value: 3 },
  { label: 'Projects', value: 3 },
  { label: 'Hours Of Support', value: 20 },
  { label: 'Hard Workers', value: 1 },
];

const About = () => {
  return (
    // 'relative' እና 'overflow-hidden' ተጨምረዋል ስተጀርባው በዚህ ክፍል ውስጥ ብቻ እንዲታይ
    <section id="about" className="relative overflow-hidden py-16 space-y-16">
      
      {/* 3D የስተጀርባ ነጥቦች */}
      <ParticleField />

      {/* ይዘቱ ከስተጀርባው በላይ እንዲሆን 'relative z-10' ተጨምሯል */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* ምስሉ መጠኑ አልተቀየረም (aspect-[4/5]) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden aspect-[4/5]"
            style={{
              border: '1px solid rgba(196,164,124,0.20)',
              boxShadow: '0 30px 60px -20px rgba(196,164,124,0.25)',
            }}
          >
            <Image src="/assets/images/bana.jpg" alt="Biniyam" fill className="object-cover object-top" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-px" style={{ background: CARAMEL }} />
              <span className="text-sm uppercase tracking-[0.25em] font-medium" style={{ color: CARAMEL }}>
                Get to Know Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Passionate About Creating <span style={{ color: CARAMEL }}>Digital Experiences</span>
            </h2>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold" style={{ color: CARAMEL }}>
                    {s.value}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-start gap-3 p-4 rounded-xl backdrop-blur-sm"
                  style={{
                    background: 'rgba(20,20,20,0.4)',
                    border: '1px solid rgba(196,164,124,0.12)',
                  }}
                >
                  <div style={{ color: CARAMEL }} className="text-lg pt-0.5">{f.icon}</div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500">{f.label}</div>
                    <div className="text-sm font-medium text-zinc-100 mt-0.5">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'rgba(20,20,20,0.4)',
                border: '1px solid rgba(196,164,124,0.12)',
              }}
            >
              <div className="text-3xl font-bold" style={{ color: CARAMEL }}>
                {c.value}+
              </div>
              <div className="text-sm text-zinc-400 mt-1">{c.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
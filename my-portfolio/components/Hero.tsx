'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowDown } from 'react-icons/fi';
import { SiBehance, SiDribbble, SiWhatsapp } from 'react-icons/si';

const CARAMEL = '#C4A47C';
const EASE = [0.16, 1, 0.3, 1] as const;

/* ============ Typing Animation ============ */
const ROLES = [
  'Software Engineer',
  'Full-stack Web Developer',
  'React & Next.js Specialist',
  'Problem Solver',
];

const useTyping = (words: string[]) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? 40 : 90
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words]);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((b) => !b), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  return { text: words[index].substring(0, subIndex), blink };
};

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

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let particles: Particle[] = [];

    const BOUND = 420; // half-size of the 3D cube
    const FOV = 900;
    const LINK = 190; // max 3D distance for a connection

    // smoothed mouse / rotation state
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

      const count = Math.round(Math.min(130, Math.max(55, (w * h) / 14000)));
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
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
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

      // anchor the cloud slightly right on wide screens so text stays readable
      const ox = w * (w > 1024 ? 0.62 : 0.5);
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

        // rotate around Y then X
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

      // connections
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

      // nodes (far → near for correct overlap)
      const order = Array.from({ length: n }, (_, i) => i).sort(
        (a, b) => pz[b] - pz[a]
      );
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

    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* soft glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 65% 50%, rgba(196,164,124,0.10), transparent 70%)',
        }}
      />
      {/* vignette keeps text legible and edges clean */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.4) 100%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
};

/* ============ Socials ============ */
const socials = [
  { href: '#', icon: <SiDribbble />, label: 'Dribbble' },
  { href: '#', icon: <SiBehance />, label: 'Behance' },
  {
    href: 'https://github.com/bini1695',
    icon: <FiGithub />,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/biniyam-tegegne-12m16/',
    icon: <FiLinkedin />,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/biniyam.tegegne/',
    icon: <FiInstagram />,
    label: 'Instagram',
  },
  {
    href: 'https://wa.me/251918448553',
    icon: <SiWhatsapp />,
    label: 'WhatsApp',
  },
];

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Delivered' },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: EASE },
});

/* ============ Hero ============ */
const Hero = () => {
  const { text, blink } = useTyping(ROLES);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-5rem)] items-center py-20"
    >
      <ParticleField />

      <div className="relative z-10 max-w-3xl space-y-7">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.05)} className="inline-flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: CARAMEL }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: CARAMEL }}
            />
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: CARAMEL }}
          >
            Hello, I&apos;m
          </span>
          <span
            className="block h-px w-14"
            style={{
              background: `linear-gradient(90deg, ${CARAMEL}, transparent)`,
            }}
          />
        </motion.div>

        {/* 
          ማስተካከያ: በሞባይል ላይ 'text-5xl' የነበረው ወደ 'text-4xl' ተቀይሯል።
          በ md (ታብሌት) እና lg (ዴስክቶፕ) ላይ ግን እንደቀድሞው ትልቅ ሆኖ ይቀጥላል።
        */}
        <motion.h1
          {...fadeUp(0.15)}
          className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-7xl"
        >
          Biniyam Tegegne
        </motion.h1>

        <motion.p
          {...fadeUp(0.25)}
          className="min-h-[2.5rem] text-xl font-medium text-zinc-200 md:text-3xl"
        >
          I&apos;m a{' '}
          <span className="relative font-bold" style={{ color: CARAMEL }}>
            {text}
            <span
              className="ml-1 inline-block h-[1.2em] w-[3px] align-middle transition-opacity"
              style={{ background: CARAMEL, opacity: blink ? 1 : 0 }}
            />
          </span>
        </motion.p>

        <motion.p
          {...fadeUp(0.35)}
          className="max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          I build fast, reliable and scalable digital products — websites and
          apps that pair thoughtful design with clean, production-ready code.
          Let me help turn your idea into reality.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#projects"
            className="btn-swap-fill inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-swap-outline inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Stats + Socials */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-col gap-8 pt-6 sm:flex-row sm:items-center sm:gap-10"
        >
          <div className="flex items-center gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {s.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <span className="h-10 w-px bg-white/10" aria-hidden />
                )}
              </div>
            ))}
          </div>

          <span className="hidden h-10 w-px bg-white/10 sm:block" aria-hidden />

          <div className="flex flex-wrap items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3 }}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = CARAMEL;
                  e.currentTarget.style.borderColor = 'rgba(196,164,124,0.5)';
                  e.currentTarget.style.background = 'rgba(196,164,124,0.08)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px rgba(196,164,124,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="text-lg">{s.icon}</span>

                <span
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: CARAMEL,
                    color: '#000',
                    boxShadow: '0 6px 16px rgba(196,164,124,0.35)',
                  }}
                >
                  {s.label}
                  <span
                    className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                    style={{ background: CARAMEL }}
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="group absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors group-hover:text-[#C4A47C]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown style={{ color: CARAMEL }} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
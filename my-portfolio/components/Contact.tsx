'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

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

      // ማዕከላዊ ነጥብ
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
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(196,164,124,0.08), transparent 70%)',
        }}
      />
      {/* ጽሁፉ በግልጽ እንዲታይ የሚያደርግ ጥቁር ቀለም */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(9,9,11,0.4) 0%, transparent 40%, transparent 60%, rgba(9,9,11,0.7) 100%)',
        }}
      />
    </div>
  );
};

/* ============ Main Contact ============ */
const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 'relative' እና 'overflow-hidden' ተጨምረዋል ስተጀርባው በዚህ ክፍል ውስጥ ብቻ እንዲታይ
    <section id="contact" className="relative overflow-hidden space-y-12 py-12">
      
      {/* 3D የስተጀርባ ነጥቦች */}
      <ParticleField />

      {/* ይዘቱ ከስተጀርባው በላይ እንዲሆን 'relative z-10' ተጨምሯል */}
      <div className="relative z-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: CARAMEL }} />
            <span className="text-sm uppercase tracking-[0.25em] font-medium" style={{ color: CARAMEL }}>
              Contact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Let's Work Together</h2>
          <p className="text-lg text-zinc-400">
            Interested in working together? Reach out and let's start a conversation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg" style={{ background: 'rgba(196,164,124,0.08)', border: '1px solid rgba(196,164,124,0.25)', color: CARAMEL }}>
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-zinc-500 mb-1">MY LOCATION</div>
                <div className="text-lg font-medium text-white">Injibara, Ethiopia</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg" style={{ background: 'rgba(196,164,124,0.08)', border: '1px solid rgba(196,164,124,0.25)', color: CARAMEL }}>
                <FiPhone className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-zinc-500 mb-1">PHONE</div>
                <a href="tel:+251918448553" className="text-lg font-medium text-white hover:text-[#C4A47C] transition-colors">
                  +251 91 844 8553
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg" style={{ background: 'rgba(196,164,124,0.08)', border: '1px solid rgba(196,164,124,0.25)', color: CARAMEL }}>
                <FiMail className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-zinc-500 mb-1">EMAIL</div>
                <a href="mailto:biniyamtegegne21@gmail.com" className="text-lg font-medium text-white hover:text-[#C4A47C] transition-colors break-all">
                  biniyamtegegne21@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* ፎርሙ ላይ 'backdrop-blur-md' ተጨምሯል ስተጀርባው እየታየ ጽሁፉ ግልጽ እንዲሆን */}
          <div className="rounded-3xl p-8 backdrop-blur-md" style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(196,164,124,0.20)' }}>
            <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="from_name" required placeholder="Your name" className="w-full rounded-lg px-4 py-3 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4A47C] transition-colors" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
                <input type="email" name="from_email" required placeholder="you@example.com" className="w-full rounded-lg px-4 py-3 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4A47C] transition-colors" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
              </div>
              <input type="text" name="subject" required placeholder="Subject" className="w-full rounded-lg px-4 py-3 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4A47C] transition-colors" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
              <textarea rows={4} name="message" required placeholder="Your message" className="w-full rounded-lg px-4 py-3 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4A47C] transition-colors resize-none" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
              <button type="submit" disabled={isLoading} className="w-full py-4 font-semibold rounded-lg text-black disabled:opacity-60 transition-transform active:scale-[0.98]" style={{ background: CARAMEL, boxShadow: '0 10px 30px rgba(196,164,124,0.35)' }}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 justify-center text-sm pt-2" style={{ color: CARAMEL }}>
                  <FiCheckCircle /> Your message has been sent. Thank you!
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 justify-center text-red-500 text-sm pt-2">
                  <FiAlertCircle /> Something went wrong. Try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
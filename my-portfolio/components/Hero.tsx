'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowDown } from 'react-icons/fi';
import { SiBehance, SiDribbble, SiWhatsapp } from 'react-icons/si';

const CARAMEL = '#C4A47C';
const CARAMEL_DEEP = '#B08F62';

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

/* ============ Floating Badge ============ */
const FloatingBadge = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className="px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2"
      style={{
        background: 'rgba(20,20,20,0.9)',
        border: '1px solid rgba(196,164,124,0.35)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

/* ============ Decorative "Hello, I'm" ============ */
const GreetingBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative inline-flex items-center gap-3"
    >
      {/* LEFT DECORATIVE ELEMENTS */}
      <div className="flex items-center gap-2">
        <motion.span
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="block w-2 h-2"
          style={{
            background: CARAMEL,
            clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          }}
        />
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="block w-8 h-px origin-left"
          style={{ background: CARAMEL }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="block w-6 h-px"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${CARAMEL} 0, ${CARAMEL} 3px, transparent 3px, transparent 6px)`,
          }}
        />
      </div>

      {/* THE TEXT with shine sweep */}
      <span className="relative overflow-hidden inline-block px-2">
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.15em' }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-[1.75rem] font-semibold tracking-wider inline-block"
          style={{ color: CARAMEL }}
        >
          hello i'm
        </motion.span>
        <motion.span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.65) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-100% 0'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
          aria-hidden
        />
      </span>

      {/* RIGHT DECORATIVE ELEMENTS */}
      <div className="flex items-center gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="block w-6 h-px"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${CARAMEL} 0, ${CARAMEL} 3px, transparent 3px, transparent 6px)`,
          }}
        />
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="block w-8 h-px origin-right"
          style={{ background: CARAMEL }}
        />
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-2 h-2 rounded-full"
          style={{ background: CARAMEL }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-30"
        style={{ background: 'rgba(196,164,124,0.3)' }}
        aria-hidden
      />
    </motion.div>
  );
};

/* ============ Socials (with Instagram + WhatsApp) ============ */
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
    href: 'https://www.instagram.com/biniyam.tegegne/', // ← Replace with your Instagram handle
    icon: <FiInstagram />,
    label: 'Instagram',
  },
  {
    href: 'https://wa.me/251918448553', // ← Replace with your WhatsApp number (no + or spaces)
    icon: <SiWhatsapp />,
    label: 'WhatsApp',
  },
];

/* ============ Hero ============ */
const Hero = () => {
  const { text, blink } = useTyping(ROLES);

  return (
    <section
      id="home"
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
    >
      {/* LEFT: Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6 relative z-10"
      >
        <GreetingBanner />

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-[2.75rem] font-bold text-white leading-tight"
        >
          Biniyam Tegegne
        </motion.h1>

        {/* Typing animation */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-[1.75rem] text-zinc-200 font-medium min-h-[2.5rem]"
        >
          I'm a{' '}
          <span className="relative font-bold" style={{ color: CARAMEL }}>
            {text}
            <span
              className="inline-block w-[3px] h-[1.4em] ml-1 align-middle transition-opacity"
              style={{
                background: CARAMEL,
                opacity: blink ? 1 : 0,
              }}
            />
            <span
              className="absolute left-0 -bottom-1 h-[2px] w-full"
              style={{ background: CARAMEL, opacity: 0.35 }}
            />
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg leading-relaxed text-zinc-300 max-w-xl"
        >
          I'm excited about creating big, effective, and lasting digital
          products (like websites or apps) that combine new and creative ideas
          with practical and working code. Let me help make your ideas a
          reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 pt-3"
        >
          <a
            href="#projects"
            className="btn-swap-fill inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-swap-outline inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center gap-3 pt-6"
        >
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -3 }}
              className="group relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
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

              {/* Tooltip */}
              <span
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: CARAMEL,
                  color: '#000',
                  boxShadow: '0 6px 16px rgba(196,164,124,0.35)',
                }}
              >
                {s.label}
                <span
                  className="absolute left-1/2 -bottom-1 w-2 h-2 -translate-x-1/2 rotate-45"
                  style={{ background: CARAMEL }}
                />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT: Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex justify-center lg:justify-end"
      >
        <div className="relative w-[320px] h-[400px] sm:w-[360px] sm:h-[450px] lg:w-[380px] lg:h-[475px]">
          <div
            className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-50"
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(196,164,124,0.35), transparent 70%)',
            }}
          />

          <div
            className="relative w-full h-full rounded-[2rem] overflow-hidden"
            style={{
              border: '1px solid rgba(196,164,124,0.20)',
              boxShadow:
                '0 30px 80px -20px rgba(196,164,124,0.30), 0 20px 40px -20px rgba(0,0,0,0.5)',
            }}
          >
            <Image
              src="/assets/images/bana.jpg"
              alt="Biniyam Tegegne"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          <FloatingBadge delay={0.9} className="-bottom-4 -left-6">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black text-black"
              style={{ background: CARAMEL }}
            >
              5+
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">
                Years
              </div>
              <div className="text-[10px] text-zinc-400 tracking-wider mt-0.5">
                EXPERIENCE
              </div>
            </div>
          </FloatingBadge>

          <FloatingBadge delay={1.1} className="-top-4 -right-6">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: CARAMEL }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: CARAMEL }}
              />
            </span>
            <div>
              <div className="text-sm font-bold text-white leading-none">
                15+
              </div>
              <div className="text-[10px] text-zinc-400 tracking-wider mt-0.5">
                PROJECTS
              </div>
            </div>
          </FloatingBadge>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 flex-col items-center gap-2 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 group-hover:text-[#C4A47C] transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown
            className="group-hover:text-[#C4A47C] transition-colors"
            style={{ color: CARAMEL }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
'use client';

import { useState, useEffect } from 'react';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';

const CARAMEL = '#C4A47C';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 transition-colors duration-300"
      style={{ borderBottom: '1px solid rgba(196,164,124,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* ===== PROFESSIONAL LOGO ===== */}
        <a href="#home" className="group flex items-center gap-3">
          {/* Monogram mark */}
          <div className="relative">
            {/* Outer glow on hover */}
            <div
              className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"
              style={{ background: 'rgba(196,164,124,0.7)' }}
            />

            {/* The frame with gradient border */}
            <div
              className="relative w-10 h-10 rounded-xl p-[1.5px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
              style={{
                background:
                  'linear-gradient(135deg, #C4A47C 0%, #E5D0A8 50%, #C4A47C 100%)',
              }}
            >
              {/* Inner dark surface */}
              <div className="relative w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden bg-zinc-950 dark:bg-zinc-950">
                {/* Caramel-filled monogram */}
                <span
                  className="relative z-10 font-black text-[15px] tracking-tighter text-black"
                  style={{
                    background:
                      'linear-gradient(135deg, #E5D0A8 0%, #C4A47C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  bt
                </span>

                {/* Shine sweep */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(120deg, transparent 30%, rgba(196,164,124,0.5) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    animation: 'logoShine 1.5s ease-in-out',
                  }}
                />
              </div>
            </div>

            {/* Dot accent (bottom-right) */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black transition-transform duration-500 group-hover:scale-125"
              style={{ background: CARAMEL }}
            />
          </div>

          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[15px] tracking-tight text-zinc-900 dark:text-zinc-50 transition-colors">
              Biniyam
            </span>
            <span
              className="text-[10px] font-medium tracking-[0.2em] uppercase mt-0.5 transition-colors duration-300 group-hover:text-[#C4A47C]"
              style={{ color: 'rgba(196,164,124,0.75)' }}
            >
              Tegegne
            </span>
          </div>
        </a>

        {/* ===== Desktop Nav ===== */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#C4A47C] dark:hover:text-[#C4A47C] transition-colors group"
            >
              {link.label}
              {/* Underline that grows on hover */}
              <span
                className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"
                style={{ background: CARAMEL }}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* ===== Theme Toggle ===== */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-[#C4A47C] dark:hover:text-[#C4A47C] transition-colors bg-zinc-100 dark:bg-[#13131a]"
            style={{ border: '1px solid rgba(196,164,124,0.25)' }}
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : isDark ? (
              <FiSun />
            ) : (
              <FiMoon />
            )}
          </button>

          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg text-black transition-all hover:-translate-y-0.5"
            style={{
              background: CARAMEL,
              boxShadow: '0 6px 18px rgba(196,164,124,0.35)',
            }}
          >
            Hire Me ↗
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-[#13131a]"
            style={{ border: '1px solid rgba(196,164,124,0.25)' }}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* ===== Mobile Dropdown ===== */}
      {menuOpen && (
        <div
          className="md:hidden bg-white dark:bg-black px-6 py-4 space-y-1 transition-colors"
          style={{ borderTop: '1px solid rgba(196,164,124,0.15)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-medium text-zinc-700 dark:text-zinc-300 hover:text-[#C4A47C] dark:hover:text-[#C4A47C]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Keyframes for the logo shine */}
      <style jsx>{`
        @keyframes logoShine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
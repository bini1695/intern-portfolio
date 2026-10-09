'use client';

import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-blue-400 flex items-center justify-center font-bold text-sm">
            BT.
          </div>
          <span className="font-semibold text-lg tracking-tight">Biniyam Tegegne</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          <a href="#home" className="text-white hover:text-brand-purple transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#resume" className="hover:text-white transition-colors">Resume</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-full bg-dark-card border border-dark-border hover:border-brand-purple transition-colors"
          >
            {isDark ? <FiSun className="text-text-muted" /> : <FiMoon className="text-text-muted" />}
          </button>
          <a href="#contact" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-light text-white text-sm font-medium rounded-lg transition-all">
            Hire Me ↗
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
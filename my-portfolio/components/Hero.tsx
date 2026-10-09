'use client';

import Image from 'next/image';
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10">
      {/* Left Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-text-muted">
          <span className="text-xl">👋</span> Hello, I'm
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-blue-400">Biniyam </span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-text-muted">
          Full-Stack Developer.
        </h2>
        
        <p className="text-lg text-text-muted max-w-lg leading-relaxed">
          I turn ambitious ideas into thoughtful digital products — from the first interface to the last API.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a href="#projects" className="flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-light text-white font-medium rounded-lg transition-all">
            View Projects <FiArrowUpRight />
          </a>
          <a href="#" className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border hover:border-brand-purple text-white font-medium rounded-lg transition-all">
            Download CV <FiDownload />
          </a>
        </div>

        <div className="flex gap-6 pt-4 text-text-muted text-xl">
          <a href="https://github.com/bini1695" className="hover:text-brand-purple transition-colors"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/biniyam-tegegne-12m16/" className="hover:text-brand-purple transition-colors"><FiLinkedin /></a>
          <a href="" className="hover:text-brand-purple transition-colors"><FiTwitter /></a>
          <a href="#" className="hover:text-brand-purple transition-colors"><FiGlobe /></a>
        </div>
      </motion.div>

      {/* Right Content - Image with Arch */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex justify-center lg:justify-end"
      >
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-purple to-blue-400 rounded-t-full rounded-b-3xl opacity-20 blur-2xl"></div>
          
          <div className="relative rounded-t-full rounded-b-3xl overflow-hidden border border-dark-border bg-dark-card aspect-[4/5]">
            <Image 
              src="/assets/images/bini2.jpg" 
              alt="Biniyam T" 
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="absolute top-10 -left-6 md:-left-12 bg-dark-card/90 backdrop-blur-sm border border-dark-border px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium">Available for work</span>
          </div>

          <div className="absolute bottom-10 -right-4 md:-right-8 bg-dark-card/90 backdrop-blur-sm border border-dark-border p-4 rounded-2xl">
            <div className="text-2xl font-bold">5+ yrs experience</div>
            <div className="text-sm text-text-muted">building with purpose</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
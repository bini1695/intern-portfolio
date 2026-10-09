'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative space-y-16">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -right-32 w-[420px] h-[420px] bg-brand-purple/15 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-32 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-[120px]" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* Glow behind photo */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-brand-purple/40 via-purple-500/20 to-blue-500/30 rounded-[3rem] blur-3xl" />

            {/* Dashed decorative ring */}
            <div className="absolute -inset-3 rounded-[3rem] border border-dashed border-dark-border/70" />

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-brand-purple rounded-tl-2xl" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-brand-purple rounded-br-2xl" />

            {/* Photo frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-dark-card border border-dark-border aspect-square shadow-2xl shadow-black/50">
              <Image
                src="/assets/images/bini2.jpg"
                alt="Biniyam T"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Floating tag */}
            <div className="hidden md:flex absolute -left-6 top-1/3 bg-dark-card/95 backdrop-blur-md border border-dark-border px-3.5 py-2 rounded-xl items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
              <span className="text-xs font-medium">Based in Addis</span>
            </div>
          </div>

          <p className="absolute -bottom-8 text-sm text-text-muted italic">
            A little curiosity. A lot of craft.
          </p>
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div className="text-brand-purple font-medium text-sm tracking-wider uppercase">
            01 / About Me
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-blue-400">Me</span>
          </h2>

          <p className="text-lg text-text-muted">
            A developer who cares about the details.
          </p>

          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              I build fast, accessible web experiences and the reliable systems behind them. My sweet spot is where clean engineering meets intuitive design — making complex problems feel simple.
            </p>
            <p>
              From a product's first prototype to its next chapter of growth, I bring curiosity, clear communication, and a pragmatic approach. I enjoy collaborating with people who believe good software can make everyday life better.
            </p>
          </div>

          <div className="pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              My Everyday Toolkit
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Figma'].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm text-center hover:border-brand-purple hover:-translate-y-0.5 transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
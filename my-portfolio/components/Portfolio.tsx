'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CARAMEL = '#C4A47C';
const CARAMEL_DEEP = '#B08F62';

/* 
  ========================
  ✏️ EDIT YOUR LINKS HERE
  ========================
  Replace 'demo' with your live site URL and 'github' with your repo URL.
  Leave them as '#' if you don't have a link yet (the button will be dimmed).
*/
const projects = [
  {
    id: 1,
    category: 'Web Application',
    title: 'Veterinary Management System',
    desc: 'A complete clinic management system with patient records, appointment scheduling, inventory tracking, and role-based access.',
    tags: ['React', 'Express.js', 'MySQL'],
    image:
      'https://media.istockphoto.com/id/1008617634/photo/veterinarians-with-baby-goat.webp?s=1024x1024&w=is&k=20&c=OA44l8666YR8DJmYNr7kGU30l0JUHTglkcVJcITuk0o=',
    demo: 'https://dejeneanimalclinic.vercel.app/',
    github: 'https://github.com/bini1695/VMS-FULLSTACK', // ← replace with real repo
  },
  {
    id: 2,
    category: 'Web Application',
    title: 'Apple Website Clone',
    desc: "A pixel-perfect recreation of Apple's product pages with smooth scroll animations and responsive layouts.",
    tags: ['React', 'CSS3', 'Framer Motion'],
    image:
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop',
    demo: 'https://example.com',
    github: 'https://github.com/bini1695/apple-website-clone', // ← replace with real repo
  },
  {
    id: 3,
    category: 'Web Application',
    title: 'E-commerce Store',
    desc: 'A modern online store with product browsing, cart management, secure checkout, and order tracking.',
    tags: ['Next.js', 'Nest.js'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    demo: 'https://example.com',
    github: 'https://github.com/bini1695/ECS', // ← replace with real repo
  },
  {
    id: 4,
    category: 'Web Application',
    title: 'Netflix Clone',
    desc: 'A streaming platform clone with cinematic hero banner, browsable categories, and responsive grid.',
    tags: ['React', 'Next.js', 'Tailwind'],
    image:
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    demo: 'https://example.com',
    github: 'https://github.com/bini1695/Netflix-clone-2026', // ← replace with real repo
  },
  {
    id: 5,
    category: 'Web Application',
    title: 'Weather Forecast App',
    desc: 'A real-time weather app with location-based forecasts and animated weather icons.',
    tags: ['Next js', 'Nest js'],
    image:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop',
    demo: 'https://example.com',
    github: 'https://github.com/bini1695/WEATHER-FORCAST', // already set ✓
  },
  {
    id: 6,
    category: 'Web Application',
    title: 'Fieldnotes Explorer',
    desc: 'An editorial travel experience for discovering hidden gems and planning unique journeys.',
    tags: ['Next.js', 'Sanity', 'Tailwind'],
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
    demo: 'https://example.com',
    github: 'https://github.com/bini1695/fieldnotes-explorer', // ← replace with real repo
  },
];

const categories = ['All', 'Web', 'Mobile', 'UI/UX'];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category.includes(activeFilter);
  });

  const visible = showAll ? filtered : filtered.slice(0, 3);

  const hasLink = (url: string) => url && url !== '#' && url.trim() !== '';

  return (
    <section id="projects" className="space-y-12">
      {/* ===== Header ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px" style={{ background: CARAMEL }} />
          <span
            className="text-sm uppercase tracking-[0.25em] font-medium"
            style={{ color: CARAMEL }}
          >
            Portfolio
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          My Recent Work
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl">
          A curated selection of projects I've designed and built.
        </p>
      </div>

      {/* ===== Filters ===== */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveFilter(cat);
              setShowAll(false);
            }}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              color: activeFilter === cat ? '#000' : 'rgba(255,255,255,0.7)',
              background: activeFilter === cat ? CARAMEL : 'transparent',
              border:
                activeFilter === cat
                  ? '1px solid transparent'
                  : '1px solid rgba(196,164,124,0.25)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== Grid ===== */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={cardVariants}
              exit="exit"
              className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'rgba(20,20,20,0.7)',
                border: '1px solid rgba(196,164,124,0.15)',
              }}
            >
              {/* ===== Image on top ===== */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

                {project.id === 1 && (
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-black z-10"
                    style={{
                      background: CARAMEL,
                      boxShadow: '0 4px 12px rgba(196,164,124,0.35)',
                    }}
                  >
                    FEATURED
                  </span>
                )}

                {/* Hover icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {hasLink(project.demo) ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live demo"
                      title="View Live Demo"
                      className="w-11 h-11 rounded-full flex items-center justify-center text-black transition-transform duration-300 hover:scale-110"
                      style={{
                        background: CARAMEL,
                        boxShadow: '0 8px 20px rgba(196,164,124,0.5)',
                      }}
                    >
                      <FiExternalLink />
                    </a>
                  ) : (
                    <span
                      className="w-11 h-11 rounded-full flex items-center justify-center text-black opacity-40 cursor-not-allowed"
                      style={{ background: CARAMEL }}
                    >
                      <FiExternalLink />
                    </span>
                  )}

                  {hasLink(project.github) ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="View Source Code"
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110"
                      style={{
                        background: 'rgba(0,0,0,0.75)',
                        border: '1px solid rgba(196,164,124,0.4)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <FiGithub />
                    </a>
                  ) : (
                    <span
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white opacity-40 cursor-not-allowed"
                      style={{
                        background: 'rgba(0,0,0,0.75)',
                        border: '1px solid rgba(196,164,124,0.4)',
                      }}
                    >
                      <FiGithub />
                    </span>
                  )}
                </div>
              </div>

              {/* ===== Content ===== */}
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <span
                  className="text-xs uppercase tracking-[0.2em] font-semibold"
                  style={{ color: CARAMEL }}
                >
                  {project.category}
                </span>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] text-zinc-400"
                      style={{
                        background: 'rgba(196,164,124,0.06)',
                        border: '1px solid rgba(196,164,124,0.15)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ===== LIVE DEMO BUTTON (always visible) ===== */}
                <div className="pt-4 mt-auto">
                  {hasLink(project.demo) ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-black transition-all duration-300"
                      style={{
                        background: CARAMEL,
                        boxShadow: '0 8px 20px rgba(196,164,124,0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = CARAMEL_DEEP;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = CARAMEL;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      View Live Demo
                      <FiArrowUpRight className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-zinc-500 cursor-not-allowed"
                      style={{
                        background: 'rgba(196,164,124,0.08)',
                        border: '1px solid rgba(196,164,124,0.15)',
                      }}
                    >
                      Live Demo Coming Soon
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom accent underline */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: CARAMEL }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ===== View All / Show Less ===== */}
      {filtered.length > 3 && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 rounded-full font-medium text-white flex items-center gap-2 transition-all duration-300 hover:bg-[#C4A47C]/10"
            style={{ border: '1px solid rgba(196,164,124,0.25)' }}
          >
            {showAll ? 'Show Less' : 'View All Projects'}
            <FiArrowUpRight style={{ color: CARAMEL }} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
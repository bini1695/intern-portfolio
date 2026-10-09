'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiArrowUpRight, FiGithub, FiCommand } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  category: string;
  featured?: boolean;
  title: string;
  desc: string;
  tags: string[];
  image: string;
  demo: string;
  github: string;
}

const projects: Project[] = [
 {
    id: 1,
    category: 'Web Application',
    featured: true,
    title: 'Veternery managment system.',
    desc: 'A calm command center for growing teams. Turning scattered business data into clear, actionable decisions.',
    tags: ['Reactjs', 'expressjs', 'Mysql'],
    image: 'https://media.istockphoto.com/id/1008617634/photo/veterinarians-with-baby-goat.webp?s=1024x1024&w=is&k=20&c=OA44l8666YR8DJmYNr7kGU30l0JUHTglkcVJcITuk0o=',
    demo: '#',
    github: 'https://github.com/bini1695/WEATHER-FORCAST'
  },
  {
    id: 2,
    category: 'Web Application',
    title: 'Apple website clone',
    desc: 'A flexible project hub that brings tasks, documents, and teams into one focused space.',
    tags: ['React', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 3,
    category: 'Web Application',
    title: 'E-commerce Website',
    desc: 'A modern online store with product browsing, cart, checkout, and order tracking — built for a smooth shopping experience.',
    tags: ['React', 'Next.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    demo: '#',
    github: '#'
  },
   {
    id: 4,
    category: 'Web Application',
    title: 'Netflix Clone',
    desc: 'A streaming platform clone with a hero banner, browsable categories, and a responsive movie grid — built to mimic Netflix\'s look and feel.',
    tags: ['React', 'Next.js', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 5,
    category: 'Web Application',
    title: 'Fieldnotes explorer',
    desc: 'An editorial travel experience for finding hidden gems and planning unique journeys.',
    tags: ['Next.js', 'Sanity', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 6,
    category: 'Mobile Application',
    title: 'Momentum — real progress.',
    desc: 'A habit-building companion with thoughtful reminders, gentle insights, and a little encouragement.',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop',
    demo: '#',
    github: '#'
  }
];

const categories = ['All', 'Web', 'Mobile', 'UI/UX'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Web') return project.category.includes('Web');
    if (activeFilter === 'Mobile') return project.category.includes('Mobile');
    if (activeFilter === 'UI/UX') return project.category.includes('UI/UX');
    return true;
  });

  return (
    <section id="projects" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Featured Work</h2>
        <p className="text-lg text-text-muted">A selection of ideas made real. Built with care, from concept to code.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === cat 
                ? 'bg-brand-purple text-white' 
                : 'bg-dark-card border border-dark-border text-text-muted hover:text-white hover:border-brand-purple'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`bg-dark-card border border-dark-border rounded-3xl overflow-hidden flex flex-col ${project.featured ? 'lg:col-span-2 lg:flex-row' : ''}`}
            >
              <div className={`relative bg-gradient-to-br from-brand-purple/20 to-blue-500/20 p-8 flex items-center justify-center ${project.featured ? 'lg:w-1/2' : 'h-64'}`}>
                <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              </div>

              <div className={`p-8 flex flex-col justify-center ${project.featured ? 'lg:w-1/2' : ''}`}>
                <div className="text-xs text-brand-purple tracking-wider uppercase mb-3">{project.category} {project.featured && '• Featured'}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-text-muted mb-6">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-xs text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <a href={project.demo} className="flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-light text-white text-sm font-medium rounded-lg transition-all">
                    Live Demo <FiArrowUpRight />
                  </a>
                  <a href={project.github} className="flex items-center gap-2 px-5 py-2.5 bg-dark-bg border border-dark-border hover:border-brand-purple text-white text-sm font-medium rounded-lg transition-all">
                    GitHub <FiCommand />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center pt-8">
        <button className="px-8 py-3 bg-dark-card border border-dark-border hover:border-brand-purple text-white font-medium rounded-lg transition-all flex items-center gap-2">
          View All Projects <FiArrowUpRight />
        </button>
      </div>
    </section>
  );
};

export default Projects;
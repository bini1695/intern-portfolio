'use client';

import { motion } from 'framer-motion';
import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiShare2,
  FiArrowUpRight,
  FiDownload,
} from 'react-icons/fi';

const CARAMEL = '#C4A47C';
const CARAMEL_DEEP = '#B08F62';

const services = [
  {
    id: '01',
    icon: <FiCode />,
    title: 'Web Development',
    desc: 'End-to-end development of responsive, fast, and accessible web applications — from pixel-perfect interfaces to robust backends.',
  },
  {
    id: '02',
    icon: <FiLayout />,
    title: 'UI/UX Design',
    desc: 'Clear user journeys and cohesive interfaces. Design systems that bridge design and production with consistency.',
  },
  {
    id: '03',
    icon: <FiSmartphone />,
    title: 'Mobile Applications',
    desc: 'Cross-platform mobile apps built with React Native — smooth, purposeful experiences on every screen.',
  },
  {
    id: '04',
    icon: <FiShare2 />,
    title: 'API Integration',
    desc: 'Secure, dependable integrations that connect the tools your business relies on — with clean, well-documented APIs.',
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Services = () => {
  return (
    <section id="services" className="space-y-14">
      {/* ===== Centered Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-px" style={{ background: CARAMEL }} />
          <span
            className="text-sm uppercase tracking-[0.25em] font-medium"
            style={{ color: CARAMEL }}
          >
            Services
          </span>
          <span className="w-8 h-px" style={{ background: CARAMEL }} />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          My Services
        </h2>

        <p className="text-lg text-zinc-400 leading-relaxed">
          Comprehensive full-stack services covering the entire spectrum of web
          application development — ensuring a seamless and cohesive product
          from concept to launch. As a full-stack developer, I combine creative
          Front-End expertise (HTML, CSS, and React) to build engaging,
          responsive user interfaces with robust Back-End proficiency (Node.js,
          Python, and SQL) to manage server logic, databases, and secure API
          integrations.
        </p>
      </motion.div>

      {/* ===== Services Grid ===== */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative rounded-2xl p-8 overflow-hidden transition-all duration-500"
            style={{
              background: 'rgba(20,20,20,0.7)',
              border: '1px solid rgba(196,164,124,0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(196,164,124,0.5)';
              e.currentTarget.style.boxShadow =
                '0 20px 50px -20px rgba(196,164,124,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(196,164,124,0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Corner caramel glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(196,164,124,0.35), transparent 70%)',
              }}
            />

            {/* Ghost number */}
            <span
              className="pointer-events-none absolute top-5 right-6 font-mono text-5xl font-black select-none transition-colors duration-700"
              style={{ color: 'rgba(255,255,255,0.03)' }}
            >
              {service.id}
            </span>

            {/* Icon */}
            <div className="relative mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110"
                style={{
                  background: 'rgba(196,164,124,0.10)',
                  border: '1px solid rgba(196,164,124,0.30)',
                  color: CARAMEL,
                }}
              >
                {service.icon}
              </div>
            </div>

            <h3 className="relative text-xl md:text-2xl font-bold mb-3 text-white transition-colors duration-300 group-hover:text-[#C4A47C]">
              {service.title}
            </h3>

            <p className="relative text-zinc-400 leading-relaxed mb-6">
              {service.desc}
            </p>

            <a
              href="#contact"
              className="relative inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
              style={{ color: CARAMEL }}
            >
              Learn more
              <FiArrowUpRight className="transition-transform duration-300" />
            </a>

            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: CARAMEL }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Download Resume Button ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-4 pt-6"
      >
        

       
      </motion.div>
    </section>
  );
};

export default Services;
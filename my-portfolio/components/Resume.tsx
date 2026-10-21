'use client';

import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

const CARAMEL = '#C4A47C';

const Resume = () => {
  return (
    <section id="Resume" className="relative py-20 flex flex-col items-center justify-center text-center space-y-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Want to know more about my experience?
        </h2>
        <p className="text-zinc-400">
          Download my full resume to see my complete education, work history, and skills.
        </p>
      </motion.div>

           {/* Download Button */}
      <motion.a
        href="/resume.pdf" // 👈 ማስተካከያው እዚህ ነው
        download="Biniyam-Tegegne-CV.pdf"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black transition-shadow duration-300"
        style={{
          background: CARAMEL,
          boxShadow: '0 10px 30px -10px rgba(196,164,124,0.5)',
        }}
      >
        <FiDownload className="text-xl" />
        Download Resume
      </motion.a>

    </section>
  );
};

export default Resume;
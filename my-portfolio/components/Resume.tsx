'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiPhone, FiMapPin, FiLinkedin } from 'react-icons/fi';

const CARAMEL = '#C4A47C';

const Resume = () => {
  return (
    <section id="resume" className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: CARAMEL }} />
            <span className="text-sm uppercase tracking-[0.25em] font-medium" style={{ color: CARAMEL }}>
              Resume
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Resume</h2>
        </div>
        <a
          href="/resume.pdf"
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black transition-all"
          // style={{ background: CARAMEL, boxShadow: '0 8px 20px rgba(196,164,124,0.35)' }}
        >
          {/* Download Resume <FiDownload /> */}
        </a>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(196,164,124,0.04)',
          border: '1px solid rgba(196,164,124,0.12)',
        }}
      >
        <p className="text-zinc-300 leading-relaxed">
          Highly motivated and detail-oriented full-stack web developer with 2+ years of
          experience in designing, developing, and deploying scalable, efficient, and
          user-friendly web applications. Proficient in JavaScript, Python, HTML/CSS, with
          expertise in React, Node.js, and Django. Skilled in database management, API
          integration, and version control systems like Git.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Professional Summary</h3>
            <p className="text-zinc-400 leading-relaxed">
              Driven software developer with expertise in developing scalable,
              high-performance enterprise solutions.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-center gap-3">
                <FiMapPin style={{ color: CARAMEL }} /> Ethiopia, Injibara
              </li>
              <li className="flex items-center gap-3">
                <FiMail style={{ color: CARAMEL }} />
                <a href="mailto:biniyamtegegne21@gmail.com" className="hover:opacity-80">
                  biniyamtegegne21@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone style={{ color: CARAMEL }} />
                <a href="tel:+251918448553" className="hover:opacity-80">+251 91 844 8553</a>
              </li>
              <li className="flex items-center gap-3">
                <FiLinkedin style={{ color: CARAMEL }} />
                <a href="https://www.linkedin.com/in/biniyam-tegegne-12m16/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 break-all">
                  linkedin.com/in/biniyam-tegegne-12m16
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-white">Professional Experience</h3>
          <div className="relative pl-6 border-l" style={{ borderColor: 'rgba(196,164,124,0.3)' }}>
            <div
              className="absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5"
              style={{ background: CARAMEL, boxShadow: '0 0 0 4px rgba(196,164,124,0.15)' }}
            />
            <h4 className="text-lg font-semibold text-white">Bachelor of Science in Software Engineering</h4>
            <div className="text-sm font-medium mt-1" style={{ color: CARAMEL }}>2023 — 2028</div>
            <div className="text-zinc-400 text-sm mt-0.5">MIT</div>
            <p className="text-zinc-400 mt-3 leading-relaxed">
              Studying core computer science fundamentals, software architecture, and full-stack development.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Certifications</h3>
            <p className="text-zinc-400">Add your certifications here (freeCodeCamp, Coursera, Udemy).</p>
          </div>
        </div>
      </div>

      <a
          href="../assets/Biniyam_Tegegne_Resume.pdf"
          download
          className="btn-swap-fill inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold"
        >
          <FiDownload className="text-lg" />
          Download Resume
        </a>
        

        
    </section>
  );
};

export default Resume;
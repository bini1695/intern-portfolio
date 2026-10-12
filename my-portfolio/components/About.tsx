'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBookOpen, FiGlobe } from 'react-icons/fi';

const CARAMEL = '#C4A47C';

const stats = [
  { value: '10+', label: 'Projects Completed' },
  { value: '2+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
];

const facts = [
  { icon: <FiBriefcase />, label: 'Specialization', value: 'Web Development' },
  { icon: <FiUser />, label: 'Experience Level', value: 'Junior Professional' },
  { icon: <FiBookOpen />, label: 'Education', value: 'Software Engineering' },
  { icon: <FiGlobe />, label: 'Languages', value: 'English, Amharic' },
];

const counters = [
  { label: 'Happy Clients', value: 15 },
  { label: 'Projects', value: 10 },
  { label: 'Hours Of Support', value: 500 },
  { label: 'Hard Workers', value: 5 },
];

const About = () => {
  return (
    <section id="about" className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] overflow-hidden aspect-[4/5]"
          style={{
            border: '1px solid rgba(196,164,124,0.20)',
            boxShadow: '0 30px 60px -20px rgba(196,164,124,0.25)',
          }}
        >
          <Image src="/assets/images/bini2.jpg" alt="Biniyam" fill className="object-cover object-top" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: CARAMEL }} />
            <span className="text-sm uppercase tracking-[0.25em] font-medium" style={{ color: CARAMEL }}>
              Get to Know Me
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Passionate About Creating <span style={{ color: CARAMEL }}>Digital Experiences</span>
          </h2>

          <div className="grid grid-cols-3 gap-6 pt-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold" style={{ color: CARAMEL }}>
                  {s.value}
                </div>
                <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: 'rgba(196,164,124,0.04)',
                  border: '1px solid rgba(196,164,124,0.12)',
                }}
              >
                <div style={{ color: CARAMEL }} className="text-lg pt-0.5">{f.icon}</div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-zinc-500">{f.label}</div>
                  <div className="text-sm font-medium text-zinc-100 mt-0.5">{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl"
            style={{
              background: 'rgba(196,164,124,0.04)',
              border: '1px solid rgba(196,164,124,0.12)',
            }}
          >
            <div className="text-3xl font-bold" style={{ color: CARAMEL }}>
              {c.value}+
            </div>
            <div className="text-sm text-zinc-400 mt-1">{c.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
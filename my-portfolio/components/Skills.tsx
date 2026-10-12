'use client';

import { motion } from 'framer-motion';

const CARAMEL = '#C4A47C';

const skills = [
  { name: 'HTML/CSS', level: 95, category: 'Front-end', desc: 'Expert level knowledge of semantic HTML5 and modern CSS3 techniques' },
  { name: 'JavaScript', level: 85, category: 'Front-end', desc: 'Strong proficiency in ES6+, DOM manipulation, and modern frameworks' },
  { name: 'React', level: 80, category: 'Front-end', desc: 'Experience with React hooks, state management, and component architecture' },
  { name: 'Node.js', level: 75, category: 'Back-end', desc: 'Server-side JavaScript development with Express and REST APIs' },
  { name: 'Python', level: 70, category: 'Back-end', desc: 'Python development with Django and data analysis tools' },
  { name: 'SQL', level: 65, category: 'Back-end', desc: 'Database design, optimization, and complex queries' },
];

const Skills = () => {
  return (
    <section id="skills" className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px" style={{ background: CARAMEL }} />
          <span className="text-sm uppercase tracking-[0.25em] font-medium" style={{ color: CARAMEL }}>
            Skills
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white">My Technical Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {['Front-end', 'Back-end'].map((category) => (
          <div key={category} className="space-y-8">
            <h3 className="text-xl font-semibold tracking-wide" style={{ color: CARAMEL }}>
              {category} Development
            </h3>
            {skills
              .filter((s) => s.category === category)
              .map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-zinc-100">{skill.name}</span>
                    <span style={{ color: CARAMEL }}>{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${CARAMEL}, #E5D0A8)` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 pt-1">{skill.desc}</p>
                </motion.div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
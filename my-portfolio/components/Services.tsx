'use client';

import { FiCode, FiLayout, FiSmartphone, FiShare2, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Service {
  icon: ReactNode;
  title: string;
  desc: string;
  tag: string;
}

const services: Service[] = [
  {
    icon: <FiCode className="text-2xl text-brand-purple" />,
    title: "Full-stack development",
    desc: "From responsive interfaces to robust backends. Fast, accessible products built to grow.",
    tag: "END-TO-END ENGINEERING"
  },
  {
    icon: <FiLayout className="text-2xl text-brand-purple" />,
    title: "UI/UX & design systems",
    desc: "Clear journeys and cohesive interfaces. Design systems that bridge pixels and production.",
    tag: "DESIGN THAT WORKS"
  },
  {
    icon: <FiSmartphone className="text-2xl text-brand-purple" />,
    title: "Mobile experiences",
    desc: "Cross-platform apps that feel right at home. Smooth, purposeful experiences on every screen.",
    tag: "BUILT FOR EVERYDAY"
  },
  {
    icon: <FiShare2 className="text-2xl text-brand-purple" />,
    title: "APIs & integrations",
    desc: "Connect the tools your business depends on. Secure APIs, dependable data, fewer moving parts.",
    tag: "CONNECTED BY DESIGN"
  }
];

const Services = () => {
  return (
    <section id="services" className="space-y-12">
      <div className="space-y-4">
        <div className="text-brand-purple font-medium text-sm tracking-wider uppercase">02 / What I Do</div>
        <h2 className="text-4xl md:text-5xl font-bold">What I Do</h2>
        <p className="text-lg text-text-muted">Thoughtful solutions, from the interface to the infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-dark-card border border-dark-border rounded-2xl hover:border-brand-purple/50 transition-colors group"
          >
            <div className="mb-6 p-3 bg-dark-bg rounded-lg w-fit border border-dark-border group-hover:border-brand-purple/30 transition-colors">
              {service.icon}
            </div>
            <div className="text-xs text-text-muted tracking-wider uppercase mb-2">{service.tag}</div>
            <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
            <p className="text-text-muted mb-6">{service.desc}</p>
            <a href="#" className="inline-flex items-center gap-1 text-brand-purple font-medium hover:text-brand-light transition-colors">
              Learn more <FiArrowUpRight />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
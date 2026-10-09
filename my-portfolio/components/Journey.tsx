import { FiDownload } from 'react-icons/fi';

interface ExperienceItemProps {
  date: string;
  title: string;
  company: string;
  points: string[];
}

const ExperienceItem = ({ date, title, company, points }: ExperienceItemProps) => (
  <div className="relative pl-6 pb-12 border-l border-dark-border last:border-0 last:pb-0">
    <div className="absolute w-3 h-3 bg-brand-purple rounded-full -left-[6.5px] top-1.5 ring-4 ring-dark-bg"></div>
    <div className="text-sm text-brand-purple font-medium mb-1">{date}</div>
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <div className="text-text-muted mb-4">{company}</div>
    <ul className="space-y-2 text-text-muted list-disc list-inside">
      {points.map((point, i) => <li key={i}>{point}</li>)}
    </ul>
  </div>
);

interface EducationItemProps {
  title: string;
  institution: string;
  date: string;
}

const EducationItem = ({ title, institution, date }: EducationItemProps) => (
  <div className="p-6 bg-dark-card border border-dark-border rounded-2xl mb-4">
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <div className="text-text-muted mb-2">{institution}</div>
    <div className="text-sm text-text-muted/70">{date}</div>
  </div>
);

const Journey = () => {
  return (
    <section id="resume" className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="text-brand-purple font-medium text-sm tracking-wider uppercase">04 / The Journey So Far</div>
          <h2 className="text-4xl md:text-5xl font-bold">The Journey So Far</h2>
          <p className="text-lg text-text-muted">Experience grounded in building, learning, and collaboration.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border hover:border-brand-purple text-white font-medium rounded-lg transition-all w-fit">
          Download Resume <FiDownload />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-semibold mb-8">Experience</h3>
          <div className="space-y-2">
            <ExperienceItem 
              date="2023 — Present"
              title="Full-Stack Developer"
              company="Independent practice"
              points={[
                "Build accessible web applications with React, Next.js, and TypeScript.",
                "Design REST APIs, relational data models, and automated deployment workflows.",
                "Collaborate with founders on product discovery, delivery, and ongoing maintenance."
              ]}
            />
            <ExperienceItem 
              date="2021 — 2023"
              title="Software Engineer"
              company="Northline Studio · Sample company"
              points={[
                "Developed reusable UI components and documented a shared design system.",
                "Implemented authentication, payment integrations, and automated test coverage.",
                "Partnered with designers to improve responsive layouts and keyboard accessibility."
              ]}
            />
            {/* <ExperienceItem 
              date="2020 — 2021"
              title="Junior Web Developer"
              company="Openframe Labs · Sample company"
              points={[
                "Delivered responsive marketing sites and content management integrations.",
                "Maintained application features through code review and structured testing."
              ]}
            /> */}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-8">Education & certifications</h3>
          <div className="space-y-4">
            <EducationItem 
              title="BSc, Software Engineering"
              institution="Injibara University"
              date="2023 — 2028 · Sample education"
            />
            <EducationItem 
              title="Cloud Architecture Foundations"
              institution="Professional learning program"
              date="2024 · Sample certification"
            />
            <EducationItem 
              title="Accessible Web Development"
              institution="Continuing education course"
              date="2023 · Sample certification"
            />
            
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl mt-8">
              <p className="text-xl font-serif italic text-text-muted leading-relaxed">
                "The best code makes room for the people who use it."
              </p>
              <p className="text-sm text-text-muted/70 mt-4">A guiding principle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
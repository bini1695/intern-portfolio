import { FiArrowUp, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-dark-border bg-dark-bg pt-16 pb-8 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-blue-400 flex items-center justify-center font-bold text-sm">
                dt.
              </div>
              <span className="font-semibold text-lg tracking-tight">Biniyam Tegegne</span>
            </div>
            <p className="text-text-muted">Thoughtful code. Meaningful experiences.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-text-muted">
              <li><a href="#home" className="hover:text-brand-purple transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-brand-purple transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-brand-purple transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-brand-purple transition-colors">Projects</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-text-muted">
              <li><a href="#resume" className="hover:text-brand-purple transition-colors">Resume</a></li>
              <li><a href="#contact" className="hover:text-brand-purple transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">© 2026 Biniyam Tegegne. Crafted with intention.</p>
          <a href="#home" className="flex items-center gap-2 text-sm text-brand-purple hover:text-brand-light transition-colors">
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
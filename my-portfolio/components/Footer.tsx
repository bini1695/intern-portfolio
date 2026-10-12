import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const CARAMEL = '#C4A47C';

const Footer = () => {
  return (
    <footer className="mt-32 pt-16 pb-8" style={{ borderTop: '1px solid rgba(196,164,124,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #C4A47C, #E5D0A8)' }}
              >
                bt.
              </div>
              <span className="font-semibold text-lg text-zinc-50">Biniyam Tegegne</span>
            </div>
            <p className="text-zinc-400">Full-stack web developer building purposeful digital products.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#home" className="hover:text-[#C4A47C]">Home</a></li>
              <li><a href="#about" className="hover:text-[#C4A47C]">About</a></li>
              <li><a href="#projects" className="hover:text-[#C4A47C]">Portfolio</a></li>
              <li><a href="#services" className="hover:text-[#C4A47C]">Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/bini1695', icon: <FiGithub /> },
                { href: 'https://www.linkedin.com/in/biniyam-tegegne-12m16/', icon: <FiLinkedin /> },
                { href: '#', icon: <FiTwitter /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,164,124,0.25)', color: 'rgba(255,255,255,0.7)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(196,164,124,0.15)' }}>
          <p className="text-sm text-zinc-500">© 2026 Biniyam Tegegne. Crafted with intention.</p>
          <a href="#home" className="flex items-center gap-2 text-sm hover:text-[#C4A47C] transition-colors" style={{ color: CARAMEL }}>
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Resume from '@/components/Resume';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24">
        <main className="space-y-32 pb-24">
          <Hero />
          <About />
          <Skills />
          <Resume />
          <Portfolio />
          <Services />
          <Contact />
        </main>
      </div>

      <Footer />
    </div>
  );
}
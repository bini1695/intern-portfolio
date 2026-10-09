import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24 space-y-32">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
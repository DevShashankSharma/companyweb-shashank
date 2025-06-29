import { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

import Header from './components/Header'
import CompanyOverview from './components/CompanyOverview'
import FoundersTeam from './components/FoundersTeam'
import OurServices from './components/OurServices'
import FoundationStory from './components/FoundationStory'
import MediaPress from './components/MediaPress'
import Projects from './components/Projects'
import ClientPartners from './components/ClientPartners'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionIds = ['overview', 'services', 'story', 'partners', 'media', 'contact'];
  const observerRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })
  }, [])

  useEffect(() => {
    // Delay to ensure all sections are mounted
    const timeout = setTimeout(() => {
      const handleScroll = () => {
        const offsets = sectionIds.map(id => {
          const el = document.getElementById(id);
          if (!el) return { id, offset: Infinity };
          const rect = el.getBoundingClientRect();
          return { id, offset: Math.abs(rect.top) };
        });
        // Only consider sections that are at or above the top of the viewport
        const above = offsets.filter(o => {
          const el = document.getElementById(o.id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.5;
        });
        if (above.length > 0) {
          // Pick the one closest to the top
          const closest = above.reduce((a, b) => (a.offset < b.offset ? a : b));
          setActiveSection(closest.id);
        } else {
          // If none are above, pick the first section
          setActiveSection(sectionIds[0]);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      return () => window.removeEventListener('scroll', handleScroll);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Header activeSection={activeSection} />

      <main>
        <CompanyOverview />
        { <FoundersTeam /> }
        <OurServices />
        <FoundationStory />
        <ClientPartners />
        <MediaPress />
        <Projects />
        <ContactUs />
      </main>

      <Footer />
    </div>
  )
}

export default App

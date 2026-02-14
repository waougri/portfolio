import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Terminal } from './components/Terminal.tsx';
import { StatsSection } from './components/StatsSection.tsx';
import { Projects } from './components/Projects.tsx';
import { Experience } from './components/Experience.tsx';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(id);
    }
  };

  return (
    <div className="bg-ctp-base min-h-screen text-ctp-text selection:bg-ctp-blue/30 relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      
      <Navbar currentSection={currentSection} onNavigate={scrollToSection} />
      
      <main className="relative z-10 pb-32">
        <Hero />
        <Terminal />
        <StatsSection />
        <Projects />
        <Experience />
      </main>

      <footer className="py-8 text-center text-ctp-overlay1 text-sm">
        <p>© 2025 Ayman Ougri. Built with coffee & vim.</p>
      </footer>
    </div>
  );
};

export default App;
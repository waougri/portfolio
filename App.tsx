
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Terminal, User, Code, Layout, Send, Zap, ChevronRight, BarChart3, Globe, Cpu, Briefcase } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ExperienceSection } from './components/ExperienceSection';
import { StatsSection } from './components/StatsSection';
import { PortfolioAssistant } from './components/PortfolioAssistant';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-950 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-purple-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-emerald-600/10 blur-[120px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'home' && (
                <>
                  <Hero />
                  <StatsSection />
                  <ExperienceSection />
                  <Projects limit={3} />
                </>
              )}
              {activeTab === 'experience' && <ExperienceSection />}
              {activeTab === 'projects' && <Projects />}
              {activeTab === 'stats' && <StatsSection fullView />}
              {activeTab === 'assistant' && <PortfolioAssistant />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      {/* Persistent Floating Chat Trigger */}
      <button 
        onClick={() => setActiveTab('assistant')}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/25 transition-all hover:scale-110 z-50 group"
      >
        <Terminal className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask Ayman's AI
        </span>
      </button>
    </div>
  );
};

export default App;

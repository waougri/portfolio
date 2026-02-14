
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, Code, Layout, BarChart3, MessageSquare, Briefcase } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Layout },
    { id: 'experience', label: 'Work', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="glass px-2 py-1.5 rounded-2xl flex items-center space-x-1 shadow-2xl">
        <div className="flex items-center px-4 mr-4 border-r border-gray-800">
          <Terminal className="w-5 h-5 text-blue-500 mr-2" />
          <span className="font-bold text-sm tracking-tighter mono uppercase">Ayman.O</span>
        </div>
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : ''}`} />
              <span className="hidden lg:inline">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}

        <div className="flex items-center px-4 ml-2 border-l border-gray-800 space-x-3">
          <a href="https://github.com/waougri" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

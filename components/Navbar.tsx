import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Cpu, Activity } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const items = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'stats', icon: Activity, label: 'Stats' },
    { id: 'projects', icon: Cpu, label: 'Projects' },
    { id: 'work', icon: Briefcase, label: 'Work' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 px-3 py-3 rounded-full bg-ctp-base/80 backdrop-blur-xl border border-ctp-surface0/30 shadow-2xl shadow-black/50"
      >
        {items.map((item) => {
          const isActive = currentSection === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-4 py-3 rounded-full transition-all duration-300 group flex flex-col items-center justify-center ${
                isActive ? 'text-ctp-base' : 'text-ctp-subtext0 hover:text-ctp-text'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-ctp-blue rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center">
                <Icon size={20} strokeWidth={2.5} />
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};
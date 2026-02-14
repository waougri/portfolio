import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-mocha-surface0">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="w-12 h-12 bg-mocha-blue rounded-[1.2rem] flex items-center justify-center mr-4 font-black text-mocha-base text-xl shadow-xl shadow-mocha-blue/10">A</div>
            <span className="text-2xl font-bold tracking-tighter text-mocha-text uppercase">Ayman Ougri</span>
          </div>
          <p className="text-mocha-overlay1 text-sm max-w-xs font-medium leading-relaxed">
            Engineering distributed systems and hardware-accelerated software for next-gen computation.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="flex space-x-8 mb-8">
            <a href="https://github.com/waougri" target="_blank" className="text-mocha-overlay1 hover:text-mocha-blue transition-all transform hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/iustusae" target="_blank" className="text-mocha-overlay1 hover:text-mocha-blue transition-all transform hover:scale-110">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="mailto:waougri@gmail.com" className="text-mocha-overlay1 hover:text-mocha-blue transition-all transform hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-mocha-overlay1 text-[10px] font-black uppercase tracking-[0.4em] flex items-center">
            Handcrafted with <Heart className="w-3 h-3 mx-2 text-mocha-red fill-mocha-red/20" /> Ayman Ougri &copy; 2024
          </p>
        </div>
      </div>
    </footer>
  );
};
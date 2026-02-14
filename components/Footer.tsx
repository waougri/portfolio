
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gray-900/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 font-bold">A</div>
            <span className="text-xl font-bold tracking-tighter">Ayman Ougri</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">
            Designing and engineering systems for the next generation of computation.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="flex space-x-6 mb-4">
            <a href="https://github.com/waougri" target="_blank" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/iustusae" target="_blank" className="text-gray-500 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:ayman@ougri.com" className="text-gray-500 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-500 text-xs flex items-center">
            Built with <Heart className="w-3 h-3 mx-1 text-red-500 fill-red-500" /> by Ayman Ougri © 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

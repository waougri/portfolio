
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe, Github, Terminal, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Architecting Low-Level Systems</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Ayman Ougri. <br />
            <span className="text-blue-500">Engineering</span> at Scale.
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            Systems developer focused on high-performance infrastructure. Author of <span className="text-blue-400 font-semibold">httpxx</span> and <span className="text-blue-400 font-semibold">dsxx</span>. Bridging the gap between hardware and software.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 flex items-center group">
              Explore Tech Stack
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://github.com/waougri" 
              target="_blank" 
              className="px-8 py-3 glass hover:bg-white/10 text-white rounded-xl font-semibold transition-all flex items-center"
            >
              <Github className="mr-2 w-5 h-5" />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 aspect-square rounded-3xl overflow-hidden glass p-4 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative h-full w-full bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800 flex items-center justify-center">
               <div className="text-center p-8 w-full">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                      <Cpu className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  <div className="mono text-[10px] md:text-xs text-blue-400/80 leading-relaxed text-left">
                    <p className="mb-2 flex items-center font-bold text-gray-300"><span className="text-green-500 mr-2">➜</span> <span className="text-white">~/waougri/portfolio</span> <span className="text-gray-500 ml-2">master*</span></p>
                    <div className="space-y-1 text-gray-400 font-medium">
                      <p><span className="text-blue-500">primary_lang:</span> C++20</p>
                      <p><span className="text-blue-500">frameworks:</span> SFML, Asio, Rust-Std</p>
                      <p><span className="text-blue-500">featured:</span> httpxx, dsxx, graphxx</p>
                      <p><span className="text-blue-500">leet_stats:</span> solved: 106+, world: Top 1.3M</p>
                      <p><span className="text-blue-500">current:</span> JIT Compiler Dev</p>
                    </div>
                    <div className="mt-4 flex items-center space-x-1">
                      <div className="w-1.5 h-3 bg-blue-500 animate-pulse"></div>
                      <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Awaiting Command</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/15 rounded-full blur-[90px]"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-600/15 rounded-full blur-[90px]"></div>
        </motion.div>
      </div>
    </section>
  );
};

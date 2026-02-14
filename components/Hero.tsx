import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin, Code } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-ctp-blue/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-ctp-mauve/5 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 bg-ctp-blue/10 rounded-lg border border-ctp-blue/20">
              <Code className="w-5 h-5 text-ctp-blue" />
            </div>
            <span className="text-ctp-blue font-mono text-sm tracking-widest uppercase font-bold">Systems Engineer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight text-ctp-text"
          >
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-[length:200%_auto] animate-gradient">fast systems</span> <br />
            that actually scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ctp-subtext0 max-w-2xl mb-12 leading-relaxed font-light"
          >
            Obsessed with low-level optimization, distributed architecture, and clean code. 
            Currently crafting high-performance solutions in <span className="text-ctp-text font-medium">Rust</span> and <span className="text-ctp-text font-medium">C++</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projects" className="group relative px-8 py-4 bg-ctp-text text-ctp-base font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-ctp-text/10">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Explore Work <ArrowRight size={18} />
              </span>
            </a>

            <div className="flex items-center gap-4 ml-4">
              {[
                { icon: Github, href: "https://github.com/waougri" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Linkedin, href: "https://linkedin.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="p-3 rounded-full bg-ctp-surface0/50 border border-ctp-surface1 text-ctp-subtext0 hover:text-ctp-blue hover:border-ctp-blue transition-all hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
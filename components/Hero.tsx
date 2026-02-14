import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-ctp-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-ctp-mauve/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="h-[1px] w-12 bg-ctp-blue" />
            <span className="text-ctp-blue font-mono text-sm tracking-widest uppercase">Systems Engineer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold leading-tight mb-8"
          >
            Hey, I'm Ayman. <br />
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-[length:200%_auto] animate-gradient">
              fast systems
            </span> <br />
            that scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-ctp-subtext0 max-w-2xl mb-12 leading-relaxed"
          >
            I'm a software engineer who loves digging into low-level code. Whether it's optimizing C++ servers or designing distributed architecture, I care about performance, clean code, and building things that actually work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projects" className="group relative px-8 py-4 bg-ctp-blue text-ctp-base font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Check out my work <ArrowRight size={18} />
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
                  className="p-3 rounded-full border border-ctp-surface1 text-ctp-subtext0 hover:text-ctp-blue hover:border-ctp-blue transition-all hover:scale-110"
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
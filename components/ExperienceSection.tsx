import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Circle } from 'lucide-react';
import { EXPERIENCES } from '../constants.tsx';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-3 text-mocha-text">Trajectory</h2>
        <p className="text-mocha-subtext0 font-medium">A timeline of system engineering and technical contribution.</p>
      </div>

      <div className="space-y-16 relative before:absolute before:left-0 md:before:left-12 before:top-4 before:bottom-0 before:w-[2px] before:bg-mocha-surface0">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative pl-10 md:pl-28 group"
          >
            <div className="absolute left-[-5px] md:left-[43px] top-1.5 w-[12px] h-[12px] bg-mocha-blue rounded-full group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(137,180,250,0.4)] border-4 border-mocha-base"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-mocha-text group-hover:text-mocha-blue transition-colors mb-1">{exp.role}</h3>
                <div className="text-mocha-sapphire font-mono text-sm font-black uppercase tracking-widest">{exp.company}</div>
              </div>
              <div className="flex flex-col md:items-end mt-4 md:mt-0 space-y-2">
                <div className="flex items-center text-mocha-overlay1 text-[11px] font-mono font-bold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-mocha-blue" />
                  {exp.period}
                </div>
                <div className="flex items-center text-mocha-overlay1 text-[11px] font-mono font-bold uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-mocha-mauve" />
                  {exp.location}
                </div>
              </div>
            </div>

            <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start text-mocha-subtext0 text-[14px] leading-relaxed glass p-4 rounded-2xl border border-mocha-surface0 hover:border-mocha-blue/20 transition-all">
                  <div className="w-1.5 h-1.5 mt-2 mr-4 bg-mocha-blue/40 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Circle } from 'lucide-react';
import { EXPERIENCES } from '../constants';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Professional Experience</h2>
        <p className="text-gray-400">Chronological journey through engineering and development.</p>
      </div>

      <div className="space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12 border-l border-gray-800 group"
          >
            <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-blue-500 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                <div className="text-blue-500 font-mono text-sm font-semibold">{exp.company}</div>
              </div>
              <div className="flex flex-col md:items-end mt-2 md:mt-0 space-y-1">
                <div className="flex items-center text-gray-400 text-xs">
                  <Calendar className="w-3 h-3 mr-2" />
                  {exp.period}
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <MapPin className="w-3 h-3 mr-2" />
                  {exp.location}
                </div>
              </div>
            </div>

            <ul className="space-y-2">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start text-gray-400 text-sm leading-relaxed">
                  <Circle className="w-1.5 h-1.5 mt-2 mr-3 text-blue-500/50 flex-shrink-0" />
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

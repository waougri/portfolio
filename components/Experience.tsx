import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, SKILLS } from '../utils/data.ts';

export const Experience: React.FC = () => {
  return (
    <section id="work" className="py-24 container mx-auto px-6">
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-ctp-blue">03.</span> Experience
          </h2>
          
          <div className="space-y-12 relative before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-[2px] before:bg-ctp-surface0">
            {EXPERIENCE.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-ctp-base border-[3px] border-ctp-blue" />
                
                <h3 className="text-xl font-bold text-ctp-text">{job.role}</h3>
                <div className="text-ctp-mauve font-mono text-sm mb-2">
                  {job.company} • {job.period}
                </div>
                <p className="text-ctp-subtext0 mb-4 leading-relaxed">
                  {job.desc}
                </p>
                <div className="flex gap-2">
                  {job.tech.map(t => (
                    <span key={t} className="text-xs font-mono text-ctp-overlay1 bg-ctp-surface0/30 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8">Technical Proficiency</h2>
          <div className="space-y-6">
            {SKILLS.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-mono text-ctp-text">{skill.name}</span>
                  <span className="text-ctp-overlay1">{skill.level}%</span>
                </div>
                <div className="h-2 bg-ctp-surface0 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-ctp-blue rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

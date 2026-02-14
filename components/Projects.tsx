import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../utils/data.ts';

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full bg-ctp-mantle border border-ctp-surface0 rounded-2xl overflow-hidden group shadow-xl"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-ctp-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{ transform: "translateZ(50px)" }}
        />
        
        <div className="h-48 overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-ctp-base/50" />
        </div>

        <div className="p-8 relative" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-ctp-text group-hover:text-ctp-blue transition-colors">{project.title}</h3>
            <div className="flex gap-3">
              <a href={project.link} target="_blank" className="text-ctp-subtext0 hover:text-ctp-blue transition-colors">
                <Github size={20} />
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" className="text-ctp-subtext0 hover:text-ctp-blue transition-colors">
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-ctp-subtext0 mb-6 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-ctp-surface0/50 text-ctp-mauve text-xs font-mono rounded-full border border-ctp-surface1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-ctp-base/50 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <span className="text-ctp-blue">02.</span> Selected Works
          </h2>
          <p className="text-ctp-subtext0">Engineered for performance and scalability.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

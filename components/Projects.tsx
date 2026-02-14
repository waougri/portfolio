
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
  limit?: number;
}

export const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const displayProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Selected Works</h2>
          <p className="text-gray-400">Hand-picked projects from my GitHub ecosystem.</p>
        </div>
        {limit && (
          <button className="hidden md:flex items-center text-blue-500 hover:text-blue-400 font-medium group">
            View all projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative glass rounded-3xl overflow-hidden h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-6 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href={project.github} 
              target="_blank" 
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 mr-2" />
              Source
            </a>
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

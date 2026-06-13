import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Projects = () => {
  const { projectsData } = usePortfolioData();
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">Featured Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              className="glass-card group overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-dark-bg">
                <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(typeof project.technologies === 'string'
                    ? project.technologies.split(',').map(t => t.trim())
                    : (project.technologies || [])
                  ).map((tech, tIndex) => (
                    <span 
                      key={tIndex} 
                      className="px-3 py-1 text-xs font-medium text-brand-purple bg-brand-purple/10 border border-brand-purple/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-dark-border/50">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-brand-cyan transition-colors"
                  >
                    <FaGithub /> Source
                  </a>
                  <a 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-brand-blue transition-colors ml-auto"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

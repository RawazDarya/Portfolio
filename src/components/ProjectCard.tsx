import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  isEven: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEven, index }) => {
  return (
    <motion.div
      className={`mb-24 grid grid-cols-1 ${isEven ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'} gap-8`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      {/* Project Image or Code Preview */}
      <motion.div
        className={`${isEven ? 'md:order-2' : 'md:order-1'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {project.image ? (
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-colors duration-300">
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ) : (
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-colors p-4 font-mono text-sm text-primary-text dark:text-dark-primary-text">
            <pre className="whitespace-pre-wrap">{project.codePreview}</pre>
          </div>
        )}
      </motion.div>

      {/* Project Info */}
      <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.h3
          className="text-2xl font-bold mb-3 text-primary-text dark:text-dark-primary-text"
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {project.title}
        </motion.h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <motion.span 
              key={tagIndex} 
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-secondary-text dark:text-dark-secondary-text rounded-full text-xs font-medium"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + tagIndex * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <motion.p
          className="text-secondary-text dark:text-dark-secondary-text mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {project.description}
        </motion.p>
        
        {/* Links */}
        <div className="flex gap-4">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            <span>View Github</span>
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white dark:text-dark-primary-text rounded hover:bg-accent-hover transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View project</span>
            <ArrowUpRight size={18} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
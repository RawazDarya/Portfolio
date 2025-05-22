import React from 'react';
// import { Project } from '../types'; // Original import, we'll use ProjectFromSupabase directly or from types later
import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the interface consistent with data from Supabase
// This can be moved to a central types file (e.g., src/types.ts) and imported
interface ProjectFromSupabase {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[] | null;
  live_link: string | null;
  demo_link: string | null;
  is_visible: boolean;
  // codePreview?: string; // Add if you plan to have this field in Supabase or pass it some other way
}

interface ProjectCardProps {
  project: ProjectFromSupabase; // Use the Supabase-aligned interface
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
        {project.image_url ? (
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-colors duration-300">
            <motion.img 
              src={project.image_url} // Use image_url
              alt={project.title} 
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ) : (
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-colors p-4 font-mono text-sm text-primary-text dark:text-dark-primary-text">
            {/* Fallback if no image_url, perhaps show description or a placeholder */}
            <pre className="whitespace-pre-wrap">{project.description || 'No preview available'}</pre>
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
        
        {/* Tech Stack (formerly Tags) */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.map((tech, tagIndex) => (
              <motion.span 
                key={tagIndex} 
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-secondary-text dark:text-dark-secondary-text rounded-full text-xs font-medium"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + tagIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
        
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
          {project.demo_link && (
            <motion.a
              href={project.demo_link} // Use demo_link for GitHub/Code
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              <span>View Code</span> 
            </motion.a>
          )}
          {project.live_link && (
            <motion.a
              href={project.live_link} // Use live_link for Live URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white dark:text-dark-primary-text rounded hover:bg-accent-hover transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View project</span>
              <ArrowUpRight size={18} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
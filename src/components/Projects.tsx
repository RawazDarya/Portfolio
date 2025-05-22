import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface ProjectsProps {
  setActiveSection: (sectionId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveSection }) => {
  const projectsRef = useIntersectionObserver(setActiveSection, 'projects', { threshold: 0.1 });

  return (
    <section 
      ref={projectsRef} 
      id="projects" 
      className="py-20 md:py-28 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-headings font-bold mb-16 text-center relative text-primary-text dark:text-dark-primary-text"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          My Work & Projects
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-accent"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          ></motion.div>
        </motion.h2>

        <div className="mt-12 space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isEven={index % 2 === 0}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
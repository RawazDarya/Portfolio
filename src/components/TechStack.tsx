import React from 'react';
import { FileSymlink as Html5, FileCode2, Hexagon, TerminalSquare, Github, GitBranch, CircleEqual } from 'lucide-react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface TechStackProps {
  setActiveSection: (sectionId: string) => void;
}

const TechStack: React.FC<TechStackProps> = ({ setActiveSection }) => {
  const techStackRef = useIntersectionObserver(setActiveSection, 'techstack', { threshold: 0.3 });

  const technologies = [
    { name: 'HTML5', icon: <Html5 size={28} /> },
    { name: 'CSS', icon: <FileCode2 size={28} /> },
    { name: 'JavaScript', icon: <Hexagon size={28} /> },
    { name: 'Node.js', icon: <TerminalSquare size={28} /> },
    { name: 'React', icon: <CircleEqual size={28} /> },
    { name: 'Git', icon: <GitBranch size={28} /> },
    { name: 'Github', icon: <Github size={28} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section 
      ref={techStackRef} 
      id="techstack" 
      className="py-12 md:py-16 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-2xl md:text-3xl font-headings font-semibold text-center mb-10 md:mb-12 text-primary-text dark:text-dark-primary-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Technologies I Work With
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center gap-2 text-secondary-text dark:text-dark-secondary-text hover:text-accent dark:hover:text-accent transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {React.cloneElement(tech.icon, { className: "h-7 w-7 md:h-8 md:w-8"})}
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechStack;
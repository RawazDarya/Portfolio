import React from 'react';
import { FileSymlink as Html5, FileCode2, Hexagon, TerminalSquare, Github, GitBranch, CircleEqual } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = [
    { name: 'HTML5', icon: <Html5 size={24} /> },
    { name: 'CSS', icon: <FileCode2 size={24} /> },
    { name: 'JavaScript', icon: <Hexagon size={24} /> },
    { name: 'Node.js', icon: <TerminalSquare size={24} /> },
    { name: 'React', icon: <CircleEqual size={24} /> },
    { name: 'Git', icon: <GitBranch size={24} /> },
    { name: 'Github', icon: <Github size={24} /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-10 bg-slate-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.1, color: "#f43f5e" }}
              className="flex flex-col items-center gap-2 transition-colors duration-300"
            >
              {tech.icon}
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
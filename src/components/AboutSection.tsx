import React from 'react';
import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  CircleStackIcon,
  ServerIcon,
  CubeTransparentIcon,
  UsersIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const skills = {
  frontend: [
    { name: 'HTML5', icon: CodeBracketIcon },
    { name: 'CSS3 & Tailwind', icon: CodeBracketIcon },
    { name: 'JavaScript (ES6+)', icon: CodeBracketIcon },
    { name: 'TypeScript', icon: CodeBracketIcon },
    { name: 'React & Next.js', icon: CodeBracketIcon },
    { name: 'Vue.js', icon: CodeBracketIcon },
  ],
  backend: [
    { name: 'Node.js & Express', icon: ServerIcon },
    { name: 'Python (Flask/Django)', icon: ServerIcon }, // Added example
    { name: 'RESTful APIs', icon: ServerIcon },
    { name: 'GraphQL', icon: ServerIcon },
  ],
  databases: [
    { name: 'MongoDB', icon: CircleStackIcon },
    { name: 'PostgreSQL', icon: CircleStackIcon },
    { name: 'MySQL', icon: CircleStackIcon },
  ],
  toolsAndOthers: [
    { name: 'Git & GitHub', icon: CubeTransparentIcon },
    { name: 'Docker', icon: CubeTransparentIcon },
    { name: 'CI/CD', icon: BoltIcon },
    { name: 'Agile Methodologies', icon: UsersIcon }, // Changed icon to UsersIcon
  ],
};

const experiences = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2022 - Present',
    description: 'Lead development of complex web applications using React, Node.js, and microservices architecture. Mentored junior developers and contributed to system design.',
    icon: BriefcaseIcon,
  },
  {
    role: 'Software Engineer',
    company: 'Innovatech Ltd.',
    duration: 'Jun 2019 - Dec 2021',
    description: 'Developed and maintained features for a SaaS platform, focusing on frontend performance and API integrations.',
    icon: BriefcaseIcon,
  },
];

const education = [
  {
    degree: 'M.Sc. in Computer Science',
    institution: 'University of Advanced Technology',
    duration: '2017 - 2019',
    description: 'Specialized in software engineering and distributed systems.',
    icon: AcademicCapIcon,
  },
  {
    degree: 'B.Sc. in Software Development',
    institution: 'State University Program',
    duration: '2013 - 2017',
    description: 'Focused on web development fundamentals and database management.',
    icon: AcademicCapIcon,
  },
];

const AboutSection: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="py-16 md:py-24 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl sm:text-4xl font-headings font-bold text-center mb-12 text-primary-text dark:text-dark-primary-text"
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        {/* Narrative */}
        <motion.div className="max-w-3xl mx-auto mb-16" variants={itemVariants}>
          <p className="text-lg text-secondary-text dark:text-dark-secondary-text leading-relaxed mb-4">
            Hello! I'm Rawaz Darya, a dedicated Full-Stack Developer with a passion for building elegant, efficient, and user-centric web solutions. My journey in tech has been driven by a curiosity to understand how things work and a desire to create meaningful digital experiences that solve real-world problems.
          </p>
          <p className="text-lg text-secondary-text dark:text-dark-secondary-text leading-relaxed mb-4">
            I thrive in collaborative environments and enjoy the process of turning complex ideas into tangible products. From conceptualization and design to development and deployment, I'm committed to quality and continuous improvement. I'm always eager to learn new technologies and methodologies to stay at the forefront of web development.
          </p>
          <p className="text-lg text-secondary-text dark:text-dark-secondary-text leading-relaxed">
            When I'm not coding, you might find me exploring new tech trends, contributing to open-source projects, or enjoying a good cup of coffee while planning my next creative endeavor.
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h3 className="text-2xl sm:text-3xl font-headings font-semibold text-center mb-10 text-primary-text dark:text-dark-primary-text">My Skillset</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([categoryKey, skillList]) => {
              const categoryName = categoryKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <motion.div key={categoryKey} className="bg-primary-bg dark:bg-dark-primary-bg p-6 rounded-lg shadow-lg" variants={itemVariants}>
                  <h4 className="text-xl font-headings font-semibold text-accent mb-4">{categoryName}</h4>
                  <ul className="space-y-3">
                    {skillList.map((skill) => (
                      <li key={skill.name} className="flex items-center">
                        <skill.icon className="h-5 w-5 mr-3 text-accent" />
                        <span className="text-secondary-text dark:text-dark-secondary-text">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Experience Section - Placeholder Content */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h3 className="text-2xl sm:text-3xl font-headings font-semibold text-center mb-10 text-primary-text dark:text-dark-primary-text">Experience</h3>
          <div className="relative border-l-2 border-accent pl-6 space-y-10">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="relative p-6 bg-primary-bg dark:bg-dark-primary-bg rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="absolute -left-[34px] top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full border-4 border-secondary-bg dark:border-dark-secondary-bg"></div>
                <exp.icon className="absolute -left-[46px] top-1/2 -translate-y-1/2 h-8 w-8 text-accent bg-secondary-bg dark:bg-dark-secondary-bg p-1 rounded-full" />
                <h4 className="text-xl font-headings font-semibold text-accent mb-1">{exp.role}</h4>
                <p className="text-md text-gray-400 dark:text-dark-secondary-text mb-1">{exp.company} | {exp.duration}</p>
                <p className="text-sm text-secondary-text dark:text-dark-secondary-text leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section - Placeholder Content */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl sm:text-3xl font-headings font-semibold text-center mb-10 text-primary-text dark:text-dark-primary-text">Education</h3>
          <div className="relative border-l-2 border-accent pl-6 space-y-10">
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                className="relative p-6 bg-primary-bg dark:bg-dark-primary-bg rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="absolute -left-[34px] top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full border-4 border-secondary-bg dark:border-dark-secondary-bg"></div>
                <edu.icon className="absolute -left-[46px] top-1/2 -translate-y-1/2 h-8 w-8 text-accent bg-secondary-bg dark:bg-dark-secondary-bg p-1 rounded-full" />
                <h4 className="text-xl font-headings font-semibold text-accent mb-1">{edu.degree}</h4>
                <p className="text-md text-gray-400 dark:text-dark-secondary-text mb-1">{edu.institution} | {edu.duration}</p>
                <p className="text-sm text-secondary-text dark:text-dark-secondary-text leading-relaxed">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default AboutSection; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    XMarkIcon as XIcon,
    ArrowTopRightOnSquareIcon as ExternalLinkIcon,
    CodeBracketIcon as GithubIcon
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

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
  detailedDescription?: string; // For modal
  keyFeatures?: string[]; // For modal
  myRole?: string; // For modal
}

// Placeholder Project Data - Replace with your actual projects
const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with admin panel and payment gateway integration.',
    imageUrl: '/images/project-placeholder.png', // Replace with actual image path
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    liveLink: '#',
    sourceLink: '#',
    detailedDescription: 'This was a comprehensive e-commerce solution built from scratch, focusing on scalability and user experience. It includes features like product management, order tracking, user authentication, and a secure payment system.',
    keyFeatures: ['Product catalog & search', 'Shopping cart & checkout', 'User accounts & order history', 'Admin dashboard for managing products/orders'],
    myRole: 'Lead Full-Stack Developer'
  },
  {
    id: 2,
    title: 'Project Management Tool',
    description: 'A collaborative tool for teams to manage tasks, track progress, and communicate effectively.',
    imageUrl: '/images/project-placeholder.png', // Replace with actual image path
    tags: ['Vue.js', 'Firebase', 'Vuetify', 'TypeScript'],
    liveLink: '#',
    sourceLink: '#',
    detailedDescription: 'A Kanban-style project management application designed for small to medium-sized teams. It allows users to create projects, assign tasks, set deadlines, and visualize workflow.',
    keyFeatures: ['Kanban board interface', 'Task creation and assignment', 'Real-time collaboration', 'Progress tracking & reporting'],
    myRole: 'Frontend Developer & UI Designer'
  },
  {
    id: 3,
    title: 'Portfolio Website V1',
    description: 'My previous personal portfolio website showcasing earlier projects and skills.',
    imageUrl: '/images/project-placeholder.png', // Replace with actual image path
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    liveLink: '#',
    detailedDescription: 'The first iteration of my personal brand online. Focused on clean design and animations to highlight my capabilities at the time.',
    keyFeatures: ['Responsive design', 'Animated hero section', 'Interactive project gallery'],
    myRole: 'Designer & Developer'
  },
  // Add more projects as needed
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-24 md:h-32 lg:h-40 bg-secondary-bg dark:bg-dark-secondary-bg"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)' }}
      ></div>
      <motion.section
        id="projects"
        className="py-24 md:py-32 bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            className="text-3xl sm:text-4xl font-headings font-bold text-center mb-12 md:mb-16 text-primary-text dark:text-dark-primary-text"
            variants={itemVariants}
          >
            Featured Work
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={sectionVariants} // Use sectionVariants for staggered children effect on cards
          >
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                className="bg-secondary-bg dark:bg-dark-secondary-bg rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transform hover:scale-105 hover:shadow-accent/30 dark:hover:shadow-accent/50 transition-all duration-300 ease-in-out"
                variants={itemVariants} // Each card animates in
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl lg:text-2xl font-headings font-semibold text-primary-text dark:text-dark-primary-text mb-2">{project.title}</h3>
                  <p className="text-sm text-secondary-text dark:text-dark-secondary-text mb-4 flex-grow">{project.description}</p>
                  <div className="mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 text-accent text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-start space-x-3">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent modal open when clicking link
                        className="text-accent hover:text-accent-hover transition-colors duration-200 flex items-center text-sm"
                      >
                        <ExternalLinkIcon className="h-4 w-4 mr-1" /> View Live
                      </a>
                    )}
                    {project.sourceLink && (
                      <a 
                        href={project.sourceLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent modal open when clicking link
                        className="text-accent hover:text-accent-hover transition-colors duration-200 flex items-center text-sm"
                      >
                        <GithubIcon className="h-4 w-4 mr-1" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal for Project Details */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)} // Close on backdrop click
          >
            <motion.div
              className="bg-secondary-bg dark:bg-dark-secondary-bg p-6 md:p-8 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-primary-text dark:hover:text-dark-primary-text transition-colors z-10"
              >
                <XIcon className="h-7 w-7" />
              </button>
              
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-64 object-cover rounded-lg mb-6"/>
              <h2 className="text-3xl font-headings font-bold text-primary-text dark:text-dark-primary-text mb-3">{selectedProject.title}</h2>
              
              {selectedProject.myRole && (
                  <p className="text-md text-accent mb-4"><strong>My Role:</strong> {selectedProject.myRole}</p>
              )}
              
              <p className="text-secondary-text dark:text-dark-secondary-text leading-relaxed mb-6 whitespace-pre-line">{selectedProject.detailedDescription}</p>
              
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xl font-headings font-semibold text-primary-text dark:text-dark-primary-text mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-secondary-text dark:text-dark-secondary-text space-y-1">
                    {selectedProject.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-xl font-headings font-semibold text-primary-text dark:text-dark-primary-text mb-2">Technologies Used:</h4>
                <div>
                  {selectedProject.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 text-accent text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex justify-start space-x-4 mt-8">
                {selectedProject.liveLink && (
                  <a 
                    href={selectedProject.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-accent text-primary-text rounded-md hover:bg-accent-hover transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                  >
                    <ExternalLinkIcon className="h-5 w-5" /> View Live Site
                  </a>
                )}
                {selectedProject.sourceLink && (
                  <a 
                    href={selectedProject.sourceLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gray-700 text-primary-text dark:text-dark-primary-text rounded-md hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                  >
                    <GithubIcon className="h-5 w-5" /> View Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default ProjectsSection; 
import React from 'react';
// import { Project } from '../types'; // Original import, we'll use ProjectFromSupabase directly or from types later
import { ArrowUpRight, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
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
  viewMode?: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEven, index, viewMode = 'grid' }) => {
  // Generate unique colors based on project ID for background patterns
  const getProjectColor = () => {
    const colors = [
      { 
        primary: '#EC4899', 
        secondary: '#DB2777', 
        light: '#FCE7F3',
        darkLight: '#4C1D95' // Dark mode compatible background
      }, // Magenta
      { 
        primary: '#F97316', 
        secondary: '#EA580C', 
        light: '#FED7AA',
        darkLight: '#7C2D12'
      }, // Orange
      { 
        primary: '#14B8A6', 
        secondary: '#0F766E', 
        light: '#CCFBF1',
        darkLight: '#134E4A'
      }, // Teal
      { 
        primary: '#84CC16', 
        secondary: '#65A30D', 
        light: '#ECFCCB',
        darkLight: '#365314'
      }, // Lime
      { 
        primary: '#6366F1', 
        secondary: '#4F46E5', 
        light: '#E0E7FF',
        darkLight: '#312E81'
      }, // Indigo
      { 
        primary: '#F43F5E', 
        secondary: '#E11D48', 
        light: '#FFE4E6',
        darkLight: '#881337'
      }, // Rose
    ];
    const hash = project.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const projectColor = getProjectColor();

  if (viewMode === 'list') {
    return (
      <motion.div
        className="group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-accent/30">
          {/* Background Pattern for List View */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(45deg, ${projectColor.primary} 25%, transparent 25%), linear-gradient(-45deg, ${projectColor.primary} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${projectColor.primary} 75%), linear-gradient(-45deg, transparent 75%, ${projectColor.primary} 75%)`,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            ></div>
          </div>

          <div className="relative p-6">
            <div className="flex items-start space-x-6">
              {/* Project Image */}
              <div className="flex-shrink-0 w-24 h-24">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover rounded-xl border-2 border-white/20 shadow-lg"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${projectColor.primary}, ${projectColor.secondary})` }}
                  >
                    {project.title.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.slice(0, 4).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                        +{project.tech_stack.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3">
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-sm"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -8, rotateY: 5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-accent/30 h-full flex flex-col">
        {/* Unique Project-themed Background Patterns */}
        <div className="absolute inset-0">
          {/* Base gradient with project color */}
          <div 
            className="absolute inset-0 opacity-90"
            style={{ 
              background: `linear-gradient(135deg, ${projectColor.light} 0%, white 50%, ${projectColor.light} 100%)` 
            }}
          ></div>
          
          {/* Dark mode gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 dark:opacity-90"
            style={{ 
              background: `linear-gradient(135deg, ${projectColor.darkLight} 0%, rgb(31 41 55) 50%, ${projectColor.darkLight} 100%)` 
            }}
          ></div>
          
          {/* Hexagonal pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`hex-${project.id}`} x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                  <polygon 
                    points="25,2 45,12 45,32 25,42 5,32 5,12" 
                    fill="none" 
                    stroke={projectColor.primary} 
                    strokeWidth="1" 
                    opacity="0.3"
                  />
                  <circle cx="25" cy="22" r="3" fill={projectColor.primary} opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#hex-${project.id})`}/>
            </svg>
          </div>
          
          {/* Floating elements based on project theme */}
          <div 
            className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: projectColor.primary }}
          ></div>
          <div 
            className="absolute bottom-6 left-6 w-12 h-12 rounded-full opacity-15 blur-lg"
            style={{ backgroundColor: projectColor.secondary }}
          ></div>
        </div>

        {/* Hover gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: `linear-gradient(135deg, ${projectColor.primary}10, transparent, ${projectColor.secondary}10)` 
          }}
        ></div>

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          {project.image_url ? (
            <motion.img 
              src={project.image_url} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-white font-bold text-2xl relative"
              style={{ background: `linear-gradient(135deg, ${projectColor.primary}, ${projectColor.secondary})` }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <span className="relative z-10">{project.title.substring(0, 2).toUpperCase()}</span>
              
              {/* Geometric shapes overlay */}
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="absolute top-6 left-6 w-8 h-8 rotate-45 border-2 border-white"
                ></div>
                <div 
                  className="absolute bottom-6 right-6 w-6 h-6 rounded-full border-2 border-white"
                ></div>
                <div 
                  className="absolute top-1/2 right-8 w-4 h-4 bg-white transform -translate-y-1/2 rotate-45"
                ></div>
              </div>
            </div>
          )}
          
          {/* Project Category Badge */}
          <div className="absolute top-4 left-4">
            <span 
              className="px-3 py-1 rounded-full text-white text-xs font-medium backdrop-blur-sm"
              style={{ backgroundColor: `${projectColor.primary}CC` }}
            >
              <Tag className="inline h-3 w-3 mr-1" />
              Project
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="relative p-6 flex-1 flex flex-col">
          {/* Project Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech_stack.slice(0, 3).map((tech, techIndex) => (
                <motion.span 
                  key={techIndex} 
                  className="px-2 py-1 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium border border-gray-200/50 dark:border-gray-600/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech_stack.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                  +{project.tech_stack.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            {project.demo_link && (
              <motion.a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 text-sm font-medium border border-gray-200/50 dark:border-gray-600/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={16} />
                Code
              </motion.a>
            )}
            {project.live_link && (
              <motion.a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${projectColor.primary}, ${projectColor.secondary})` 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                Live Demo
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>
            )}
          </div>

          {/* Creation Date */}
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(project.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
              })}
            </span>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-30"
          style={{ background: `linear-gradient(225deg, ${projectColor.primary}40, transparent)` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
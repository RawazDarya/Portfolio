import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ExternalLink, Github, ArrowRight } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

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
  is_featured?: boolean;
}

interface ProjectsProps {
  setActiveSection: (sectionId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveSection }) => {
  const projectsRef = useIntersectionObserver(setActiveSection, 'projects', { threshold: 0.1 });
  const [projects, setProjects] = useState<ProjectFromSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .eq('is_visible', true)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }
        setProjects(data || []);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || 'Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Generate unique colors for project cards
  const getProjectColor = (index: number) => {
    const colors = [
      { primary: '#EC4899', secondary: '#DB2777' }, // Magenta
      { primary: '#F97316', secondary: '#EA580C' }, // Orange
      { primary: '#14B8A6', secondary: '#0F766E' }, // Teal
      { primary: '#84CC16', secondary: '#65A30D' }, // Lime
      { primary: '#6366F1', secondary: '#4F46E5' }, // Indigo
      { primary: '#F43F5E', secondary: '#E11D48' }, // Rose
    ];
    return colors[index % colors.length];
  };

  // Separate featured and remaining projects
  const featuredProjects = projects.filter(project => project.is_featured === true);
  const remainingProjects = projects.filter(project => project.is_featured !== true);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  if (loading) {
    return (
      <section 
        ref={projectsRef} 
        id="projects" 
        className="py-12 md:py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="flex items-center justify-center space-x-2">
            <Folder className="h-6 w-6 animate-pulse text-accent" />
            <p className="text-secondary-text dark:text-dark-secondary-text">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        ref={projectsRef} 
        id="projects" 
        className="py-12 md:py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <p className="text-red-500">Error loading projects: {error}</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section 
        ref={projectsRef} 
        id="projects" 
        className="py-12 md:py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <Folder className="h-12 w-12 mx-auto mb-4 text-secondary-text dark:text-dark-secondary-text opacity-50" />
          <p className="text-secondary-text dark:text-dark-secondary-text">No projects to display at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={projectsRef} 
      id="projects" 
      className="py-12 md:py-16 relative overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Folder className="h-8 w-8 md:h-10 md:w-10 text-accent mr-3" />
            <h2 className="text-2xl md:text-3xl font-headings font-semibold text-primary-text dark:text-dark-primary-text">
              Featured Projects
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto">
            A showcase of my top projects and creative solutions. Here are my most impactful works.
          </p>
        </motion.div>

        {/* Featured Projects Grid (First 3) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.length > 0 ? (
            featuredProjects.slice(0, 3).map((project, index) => {
              const projectColor = getProjectColor(index);
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className="group"
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 h-full">
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
                          <span className="relative z-10">{project.title.substring(0, 2).toUpperCase()}</span>
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Featured badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Project Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
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
                              +{project.tech_stack.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.demo_link && (
                          <motion.a
                            href={project.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-sm font-medium"
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
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                            style={{ 
                              background: `linear-gradient(135deg, ${projectColor.primary}, ${projectColor.secondary})` 
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink size={16} />
                            View Project
                          </motion.a>
                        )}
                      </div>

                      {/* Creation Date */}
                      <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(project.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            // Fallback when no featured projects exist
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Folder className="h-12 w-12 mx-auto mb-2" />
                <p className="text-lg font-semibold">No Featured Projects</p>
                <p className="text-sm">Mark some projects as featured in the Studio to display them here</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* View All Projects Link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            <span>{showAllProjects ? 'Show Less' : 'View All Projects'}</span>
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAllProjects ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </motion.button>
        </motion.div>

        {/* Expanded All Projects Section */}
        <AnimatePresence>
          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-12 overflow-hidden"
            >
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  More Projects ({remainingProjects.length})
                </h3>
              </motion.div>

              {/* All Projects Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {remainingProjects.map((project, index) => {
                  const projectColor = getProjectColor(index);
                  return (
                    <motion.div
                      key={project.id}
                      variants={{
                        hidden: { opacity: 0, y: 30, scale: 0.9 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: { 
                            duration: 0.5, 
                            ease: "easeOut" 
                          } 
                        },
                      }}
                      className="group"
                    >
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 h-full">
                        {/* Project Image */}
                        <div className="relative h-40 overflow-hidden">
                          {project.image_url ? (
                            <motion.img 
                              src={project.image_url} 
                              alt={project.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
                              style={{ background: `linear-gradient(135deg, ${projectColor.primary}, ${projectColor.secondary})` }}
                            >
                              {project.title.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          {/* Project Title */}
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1">
                            {project.title}
                          </h4>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          {project.tech_stack && project.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.tech_stack.slice(0, 3).map((tech, techIndex) => (
                                <span 
                                  key={techIndex} 
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.tech_stack.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                                  +{project.tech_stack.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            {project.demo_link && (
                              <motion.a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-xs font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Github size={14} />
                                Code
                              </motion.a>
                            )}
                            {project.live_link && (
                              <motion.a
                                href={project.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-white rounded-lg transition-all duration-300 text-xs font-medium"
                                style={{ 
                                  background: `linear-gradient(135deg, ${projectColor.primary}, ${projectColor.secondary})` 
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <ExternalLink size={14} />
                                Live Demo
                              </motion.a>
                            )}
                          </div>

                          {/* Creation Date */}
                          <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(project.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
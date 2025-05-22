import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
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
}

interface ProjectsProps {
  setActiveSection: (sectionId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveSection }) => {
  const projectsRef = useIntersectionObserver(setActiveSection, 'projects', { threshold: 0.1 });
  const [projects, setProjects] = useState<ProjectFromSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <section id="projects" className="py-20 md:py-28 text-center">
        <p>Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 md:py-28 text-center">
        <p className="text-red-500">Error loading projects: {error}</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 md:py-28 text-center">
        <p>No projects to display at the moment. Check back soon!</p>
      </section>
    );
  }

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
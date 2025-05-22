import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming TechStack.tsx is in src/components/
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
// Lucide icons might still be useful for fallbacks or if some items don't have icons from DB
// import { FileSymlink as Html5, FileCode2, Hexagon, TerminalSquare, Github, GitBranch, CircleEqual } from 'lucide-react';

interface TechStackItemFromSupabase {
  id: string;
  name: string;
  icon_url_or_svg: string | null;
  category: string | null;
  is_visible: boolean;
}

interface TechStackProps {
  setActiveSection: (sectionId: string) => void;
}

const TechStack: React.FC<TechStackProps> = ({ setActiveSection }) => {
  const techStackRef = useIntersectionObserver(setActiveSection, 'techstack', { threshold: 0.3 });
  const [techItems, setTechItems] = useState<TechStackItemFromSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('tech_stack_items')
          .select('*')
          .eq('is_visible', true)
          .order('name', { ascending: true }); // Or by category, then name

        if (fetchError) {
          throw fetchError;
        }
        setTechItems(data || []);
      } catch (err: any) {
        console.error("Error fetching tech stack:", err);
        setError(err.message || 'Failed to load tech stack.');
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Adjusted for potentially more items
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Adjusted duration
  };
  
  if (loading) {
    return (
      <motion.section id="techstack" className="py-12 md:py-16 text-center">
        <p>Loading tech stack...</p>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section id="techstack" className="py-12 md:py-16 text-center">
        <p className="text-red-500">Error: {error}</p>
      </motion.section>
    );
  }

  if (techItems.length === 0) {
    return (
      <motion.section id="techstack" className="py-12 md:py-16 text-center">
        <p>Tech stack coming soon!</p>
      </motion.section>
    );
  }

  return (
    <motion.section 
      ref={techStackRef} 
      id="techstack" 
      className="py-12 md:py-16 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text"
      variants={containerVariants}
      initial="hidden"
      // Animate to visible when techItems are loaded to ensure content is ready for animation
      animate={techItems.length > 0 ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-2xl md:text-3xl font-headings font-semibold text-center mb-10 md:mb-12 text-primary-text dark:text-dark-primary-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }} // Could also use whileInView here
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Technologies I Work With
        </motion.h2>
        <motion.div
          variants={containerVariants} // Re-apply variants if you want nested staggering on this div itself
          // initial="hidden" // Not needed if parent section handles initial animation
          // animate="visible" // Not needed if parent section handles initial animation
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8"
        >
          {techItems.map((tech) => (
            <motion.div
              key={tech.id}
              variants={itemVariants}
              className="flex flex-col items-center gap-2 text-secondary-text dark:text-dark-secondary-text hover:text-accent dark:hover:text-accent transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {tech.icon_url_or_svg ? (
                tech.icon_url_or_svg.trim().startsWith('<svg') ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: tech.icon_url_or_svg }} 
                    className="h-7 w-7 md:h-8 md:w-8 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                  />
                ) : (
                  <img 
                    src={tech.icon_url_or_svg} 
                    alt={`${tech.name} icon`} 
                    className="h-7 w-7 md:h-8 md:w-8 object-contain"
                    loading="lazy"
                  />
                )
              ) : (
                // Fallback icon if none provided from DB (optional)
                <span className="h-7 w-7 md:h-8 md:w-8 text-gray-400">?</span> 
              )}
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechStack;
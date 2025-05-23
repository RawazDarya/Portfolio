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
          .order('name', { ascending: true });

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

  // Inject CSS animation styles
  useEffect(() => {
    const styleId = 'tech-stack-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes scroll-tech {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll-tech {
          animation: scroll-tech 30s linear infinite;
          will-change: transform;
        }
        
        .animate-scroll-tech:hover {
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (loading) {
    return (
      <section id="techstack" className="py-12 md:py-16 text-center">
        <p>Loading tech stack...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="techstack" className="py-12 md:py-16 text-center">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  if (techItems.length === 0) {
    return (
      <section id="techstack" className="py-12 md:py-16 text-center">
        <p>Tech stack coming soon!</p>
      </section>
    );
  }

  // Duplicate items for seamless infinite scrolling
  const duplicatedItems = [...techItems, ...techItems, ...techItems];

  return (
    <section 
      ref={techStackRef} 
      id="techstack" 
      className="py-12 md:py-16 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.h2 
          className="text-2xl md:text-3xl font-headings font-semibold text-center mb-10 md:mb-12 text-primary-text dark:text-dark-primary-text"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Technologies I Work With
        </motion.h2>
        
        {/* Tech Stack Animation Start */}
        <div className="relative w-full overflow-hidden">
          {/* Scrolling Container */}
          <div 
            className="flex gap-x-8 md:gap-x-12 animate-scroll-tech hover:[animation-play-state:paused]"
            style={{
              width: `${duplicatedItems.length * 120}px`,
            }}
          >
            {duplicatedItems.map((tech, index) => (
              <div
                key={`${tech.id}-${index}`}
                className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
              >
                {/* Tech Icon */}
                <div className="relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {tech.icon_url_or_svg ? (
                    tech.icon_url_or_svg.trim().startsWith('<svg') ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: tech.icon_url_or_svg }} 
                        className="h-12 w-12 md:h-16 md:w-16 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full text-secondary-text dark:text-dark-secondary-text group-hover:text-accent dark:group-hover:text-accent transition-colors duration-300"
                      />
                    ) : (
                      <img 
                        src={tech.icon_url_or_svg} 
                        alt={`${tech.name} icon`} 
                        className="h-12 w-12 md:h-16 md:w-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="h-12 w-12 md:h-16 md:w-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">?</span>
                    </div>
                  )}
                </div>
                
                {/* Tech Name */}
                <span className="text-xs md:text-sm font-medium text-secondary-text dark:text-dark-secondary-text group-hover:text-accent dark:group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-secondary-bg dark:from-dark-secondary-bg to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-secondary-bg dark:from-dark-secondary-bg to-transparent pointer-events-none z-10"></div>
        </div>
        
        {/* Optional: Small description */}
        <motion.p
          className="text-center mt-8 text-sm text-secondary-text dark:text-dark-secondary-text opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hover over any technology to see it in action ✨
        </motion.p>
      </div>
    </section>
  );
};

export default TechStack;
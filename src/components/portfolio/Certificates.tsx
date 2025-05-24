import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import { Award, Building2 } from 'lucide-react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

// Interface for Certificate data from Supabase
interface CertificateFromSupabase {
  id: string;
  created_at: string;
  title: string;
  organization: string | null;
  image_url: string | null;
  is_visible: boolean;
}

interface CertificatesProps {
  setActiveSection?: (sectionId: string) => void;
}

const Certificates: React.FC<CertificatesProps> = ({ setActiveSection }) => {
  const certificatesRef = useIntersectionObserver(
    setActiveSection || (() => {}), 
    'certificates', 
    { threshold: 0.3 }
  );
  const [certificates, setCertificates] = useState<CertificateFromSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select('*')
          .eq('is_visible', true)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }
        setCertificates(data || []);
      } catch (err: any) {
        console.error("Error fetching certificates:", err);
        setError(err.message || 'Failed to load certificates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
  },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
        ref={certificatesRef} 
        id="certificates" 
        className="py-16 md:py-20 bg-primary-bg dark:bg-dark-primary-bg"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Award className="h-6 w-6 animate-pulse text-accent" />
            <p className="text-secondary-text dark:text-dark-secondary-text">Loading certificates...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        ref={certificatesRef} 
        id="certificates" 
        className="py-16 md:py-20 bg-primary-bg dark:bg-dark-primary-bg"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (certificates.length === 0) {
    return (
      <section 
        ref={certificatesRef} 
        id="certificates" 
        className="py-16 md:py-20 bg-primary-bg dark:bg-dark-primary-bg"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-secondary-text dark:text-dark-secondary-text opacity-50" />
          <p className="text-secondary-text dark:text-dark-secondary-text">No certificates to display at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={certificatesRef} 
      id="certificates" 
      className="py-16 md:py-20 bg-primary-bg dark:bg-dark-primary-bg"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 md:h-10 md:w-10 text-accent mr-3" />
            <h2 className="text-2xl md:text-3xl font-headings font-semibold text-primary-text dark:text-dark-primary-text">
              Certifications & Achievements
            </h2>
          </div>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              className="group"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-accent/30 dark:hover:border-accent/30 hover:-translate-y-2">
                {/* Background Texture Patterns */}
                <div className="absolute inset-0">
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"></div>
                  
                  {/* Dotted pattern */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, ${cert.id.includes('1') ? '#3B82F6' : cert.id.includes('2') ? '#8B5CF6' : cert.id.includes('3') ? '#06B6D4' : cert.id.includes('4') ? '#10B981' : cert.id.includes('5') ? '#F59E0B' : '#EF4444'} 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  {/* Geometric pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${cert.id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                          <path d="M30 0l30 30-30 30L0 30z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                          <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.2"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${cert.id})`} className="text-accent"/>
                    </svg>
                  </div>
                  
                  {/* Gradient mesh overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-accent/5 dark:from-transparent dark:via-gray-500/5 dark:to-accent/10"></div>
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card Content */}
                <div className="relative p-8">
                  {/* Certificate Header */}
                  <div className="flex items-start space-x-4">
                    {/* Certificate Icon */}
                    <div className="relative">
                      {cert.image_url ? (
                        <div className="w-16 h-16 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-3 shadow-lg border border-white/20">
                          <img 
                            src={cert.image_url} 
                            alt={`${cert.title} certificate`} 
                            className="w-full h-full object-contain" 
                            loading="lazy" 
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/40 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                          <Award className="h-8 w-8 text-accent" />
                        </div>
                      )}
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-accent/20 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
                    </div>
                    
                    {/* Certificate Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                        {cert.title}
                      </h3>
                      
                      {/* Organization */}
                      {cert.organization && (
                        <div className="flex items-center text-gray-700 dark:text-gray-200">
                          <Building2 className="h-5 w-5 mr-3 text-accent/70" />
                          <span className="text-base font-medium">{cert.organization}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-full opacity-40"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates; 
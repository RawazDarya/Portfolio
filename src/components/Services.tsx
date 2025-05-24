import React, { useState } from 'react';
import { Globe, Server, Layers, Code, Database, Smartphone, Zap, CheckCircle, Clock, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface ServicesProps {
  setActiveSection: (sectionId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ setActiveSection }) => {
  const servicesRef = useIntersectionObserver(setActiveSection, 'services', { threshold: 0.2 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Handle service button click - scroll to contact section
  const handleServiceClick = (serviceName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Store selected service in localStorage for contact form
      localStorage.setItem('selectedService', serviceName);
      
      // Trigger a custom event to notify contact form
      window.dispatchEvent(new CustomEvent('serviceSelected', { 
        detail: { serviceName } 
      }));
    }
  };

  const services = [
    {
      icon: <Globe size={32} className="text-white" />,
      title: 'Frontend Development',
      description: 'Creating stunning, responsive user interfaces with modern frameworks like React, Vue, and Angular.',
      features: ['Responsive Design', 'Component Libraries', 'Performance Optimization', 'Cross-browser Compatibility'],
      timeline: '2-4 weeks',
      complexity: 'Medium',
      color: { 
        primary: '#EC4899', 
        secondary: '#DB2777', 
        light: '#FCE7F3',
        darkLight: '#4C1D95'
      }, // Magenta
      pattern: 'frontend'
    },
    {
      icon: <Server size={32} className="text-white" />,
      title: 'Backend Development',
      description: 'Building robust server-side applications, APIs, and database solutions that scale with your business.',
      features: ['RESTful APIs', 'Database Design', 'Authentication', 'Server Architecture'],
      timeline: '3-6 weeks',
      complexity: 'High',
      color: { 
        primary: '#F97316', 
        secondary: '#EA580C', 
        light: '#FED7AA',
        darkLight: '#7C2D12'
      }, // Orange
      pattern: 'backend'
    },
    {
      icon: <Layers size={32} className="text-white" />,
      title: 'Full-Stack Solutions',
      description: 'Complete end-to-end web applications with seamless integration between frontend and backend.',
      features: ['Complete Web Apps', 'CI/CD Pipeline', 'Cloud Deployment', 'Maintenance & Support'],
      timeline: '6-12 weeks',
      complexity: 'Expert',
      color: { 
        primary: '#14B8A6', 
        secondary: '#0F766E', 
        light: '#CCFBF1',
        darkLight: '#134E4A'
      }, // Teal
      pattern: 'fullstack'
    },
    {
      icon: <Code size={32} className="text-white" />,
      title: 'Code Review & Optimization',
      description: 'Professional code auditing, performance optimization, and best practices implementation.',
      features: ['Code Quality Analysis', 'Performance Tuning', 'Security Audit', 'Documentation'],
      timeline: '1-2 weeks',
      complexity: 'Medium',
      color: { 
        primary: '#84CC16', 
        secondary: '#65A30D', 
        light: '#ECFCCB',
        darkLight: '#365314'
      }, // Lime
      pattern: 'optimization'
    },
    {
      icon: <Database size={32} className="text-white" />,
      title: 'Database Solutions',
      description: 'Designing and implementing efficient database structures and data management systems.',
      features: ['Database Design', 'Query Optimization', 'Data Migration', 'Backup Solutions'],
      timeline: '2-4 weeks',
      complexity: 'High',
      color: { 
        primary: '#6366F1', 
        secondary: '#4F46E5', 
        light: '#E0E7FF',
        darkLight: '#312E81'
      }, // Indigo
      pattern: 'database'
    },
    {
      icon: <Smartphone size={32} className="text-white" />,
      title: 'Mobile-First Design',
      description: 'Creating mobile-optimized applications that provide excellent user experience across all devices.',
      features: ['Responsive Design', 'Touch Optimization', 'Progressive Web Apps', 'Mobile Performance'],
      timeline: '2-5 weeks',
      complexity: 'Medium',
      color: { 
        primary: '#F43F5E', 
        secondary: '#E11D48', 
        light: '#FFE4E6',
        darkLight: '#881337'
      }, // Rose
      pattern: 'mobile'
    },
  ];

  const getPatternElement = (pattern: string, color: any) => {
    switch (pattern) {
      case 'frontend':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="frontend-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect x="5" y="5" width="8" height="8" fill={color.primary} opacity="0.3"/>
                <rect x="20" y="5" width="8" height="8" fill={color.primary} opacity="0.2"/>
                <rect x="5" y="20" width="8" height="8" fill={color.primary} opacity="0.4"/>
                <rect x="20" y="20" width="8" height="8" fill={color.primary} opacity="0.25"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#frontend-pattern)"/>
          </svg>
        );
      case 'backend':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="backend-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="2" fill={color.primary} opacity="0.3"/>
                <circle cx="5" cy="5" r="1.5" fill={color.primary} opacity="0.4"/>
                <circle cx="25" cy="5" r="1.5" fill={color.primary} opacity="0.2"/>
                <circle cx="5" cy="25" r="1.5" fill={color.primary} opacity="0.25"/>
                <circle cx="25" cy="25" r="1.5" fill={color.primary} opacity="0.35"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#backend-pattern)"/>
          </svg>
        );
      case 'fullstack':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fullstack-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <polygon points="25,5 45,20 25,35 5,20" fill="none" stroke={color.primary} strokeWidth="1" opacity="0.3"/>
                <circle cx="25" cy="20" r="3" fill={color.primary} opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fullstack-pattern)"/>
          </svg>
        );
      default:
        return (
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${color.primary} 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        );
    }
  };

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  return (
    <section 
      ref={servicesRef} 
      id="services" 
      className="py-8 md:py-12 relative overflow-hidden"
    >
      {/* Enhanced Background with Service-themed Patterns */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
        
        {/* Service workflow pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-workflow" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="3" fill="#3B82F6" opacity="0.6"/>
                <circle cx="50" cy="20" r="3" fill="#10B981" opacity="0.6"/>
                <circle cx="80" cy="20" r="3" fill="#8B5CF6" opacity="0.6"/>
                <line x1="23" y1="20" x2="47" y2="20" stroke="#6B7280" strokeWidth="1" opacity="0.4"/>
                <line x1="53" y1="20" x2="77" y2="20" stroke="#6B7280" strokeWidth="1" opacity="0.4"/>
                <path d="M20 25 Q35 40 50 25 Q65 40 80 25" fill="none" stroke="#6B7280" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-workflow)"/>
          </svg>
        </div>
        
        {/* Floating service icons */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 md:h-10 md:w-10 text-accent mr-3" />
            <h2 className="text-2xl md:text-3xl font-headings font-semibold text-primary-text dark:text-dark-primary-text">
              Services & Solutions
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto">
            Comprehensive development services tailored to bring your digital ideas to life with cutting-edge technology and best practices.
          </p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group h-full"
              onHoverStart={() => setHoveredService(index)}
              onHoverEnd={() => setHoveredService(null)}
            >
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 h-full">
                {/* Service Background Pattern */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 opacity-40"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color.light} 0%, transparent 50%, ${service.color.light} 100%)` 
                    }}
                  ></div>
                  
                  <div 
                    className="absolute inset-0 opacity-0 dark:opacity-40"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color.darkLight} 0%, transparent 50%, ${service.color.darkLight} 100%)` 
                    }}
                  ></div>
                </div>

                {/* Card Content */}
                <div className="relative p-6 text-center">
                  {/* Service Icon */}
              <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color.primary}, ${service.color.secondary})` 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 } 
                    }}
              >
                    {service.icon}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {service.description.split('.')[0]}.
                  </p>

                  {/* Timeline & Complexity */}
                  <div className="flex justify-between items-center mb-4 text-xs">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                      {service.timeline}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: service.color.primary }}
                >
                      {service.complexity}
                    </span>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full px-4 py-3 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg group/btn"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color.primary}, ${service.color.secondary})` 
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleServiceClick(service.title)}
                  >
                    <span className="flex items-center justify-center">
                      <span>Discuss Project</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
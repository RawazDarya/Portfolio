import React from 'react';
import { Globe, Server, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface ServicesProps {
  setActiveSection: (sectionId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ setActiveSection }) => {
  const servicesRef = useIntersectionObserver(setActiveSection, 'services', { threshold: 0.2 });

  const services = [
    {
      icon: <Globe size={28} className="text-white" />,
      title: 'Website Development',
      description: 'Creating responsive, fast, and user-friendly websites using modern technologies and frameworks.',
    },
    {
      icon: <Server size={28} className="text-white" />,
      title: 'Backend & API Development',
      description: 'Building robust server-side logic, RESTful APIs, and database integrations for web applications.',
    },
    {
      icon: <Layers size={28} className="text-white" />,
      title: 'Full-Stack Web Applications',
      description: 'Developing complete end-to-end web solutions, from front-end UIs to back-end systems and deployment.',
    },
  ];

  return (
    <section 
      ref={servicesRef} 
      id="services" 
      className="py-20 md:py-28 bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-headings font-bold text-center mb-12 md:mb-16 text-primary-text dark:text-dark-primary-text"
          initial={{ opacity: 0, y: -30}}
          whileInView={{ opacity: 1, y: 0}}
          transition={{ duration: 0.6, ease: "easeOut"}}
          viewport={{ once: true, amount: 0.3 }}
        >
          What I Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col p-6 bg-secondary-bg dark:bg-dark-secondary-bg rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-accent/30 transition-all duration-300 h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 mb-5 rounded-full bg-accent flex items-center justify-center shadow-md flex-shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5, repeat: Infinity} }}
              >
                {React.cloneElement(service.icon, { size: 32 })}
              </motion.div>
              <div className="flex flex-col flex-grow">
                <motion.h3
                  className="text-xl lg:text-2xl font-headings font-semibold mb-3 text-primary-text dark:text-dark-primary-text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-secondary-text dark:text-dark-secondary-text text-sm leading-relaxed flex-grow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {service.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
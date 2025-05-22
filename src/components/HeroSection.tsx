import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowDownTrayIcon as DocumentDownloadIcon } from '@heroicons/react/24/outline'; // Updated to v2 imports and aliased DocumentDownloadIcon

const HeroSection: React.FC = () => {
  const headline = "Hi, I'm Rawaz Darya.";
  const subHeadlinePart1 = "A Full-Stack Developer Crafting Seamless Digital Experiences.";
  const subHeadlinePart2 = "I transform ideas into high-quality, scalable, and user-friendly web applications. Let's build something amazing together.";

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Faster stagger for a quicker typing effect
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2, // Delay slightly after header
      },
    },
  };

  const ctaButtonClasses = "px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-bg";
  const primaryCtaClasses = `${ctaButtonClasses} bg-accent text-primary-text hover:bg-accent-hover hover:scale-105 focus:ring-accent`;
  const secondaryCtaClasses = `${ctaButtonClasses} bg-secondary-bg text-primary-text hover:bg-gray-700 hover:scale-105 focus:ring-gray-600 border border-gray-600 dark:bg-dark-secondary-bg dark:text-dark-primary-text dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:border-gray-500`;

  return (
    <motion.section
      id="home" // For navigation
      className="min-h-screen flex items-center justify-center bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text py-28 md:py-36"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content Area */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1
              className="font-headings text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-primary-text dark:text-dark-primary-text"
              variants={headlineVariants}
              initial="hidden"
              animate="visible"
            >
              {headline.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="font-headings text-2xl sm:text-3xl lg:text-4xl text-secondary-text dark:text-dark-secondary-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: headline.length * 0.03 + 0.5 }} // Delay after headline animation
            >
              {subHeadlinePart1}
            </motion.p>
            <motion.p
              className="font-sans text-lg text-gray-300 dark:text-gray-300 mb-8 leading-relaxed" // gray-300 works for both, or use dark:text-dark-secondary-text if more contrast needed in light
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: headline.length * 0.03 + 0.8 }}
            >
              {subHeadlinePart2}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: headline.length * 0.03 + 1.1 }}
            >
              <a
                href="#projects"
                className={`${primaryCtaClasses} flex items-center justify-center gap-2`}
              >
                <ArrowRightIcon className="h-5 w-5" />
                View My Projects
              </a>
              <a
                href="/RawazDarya_Resume.pdf" // Assuming resume is in public folder
                target="_blank"
                rel="noopener noreferrer"
                className={`${secondaryCtaClasses} flex items-center justify-center gap-2`}
              >
                <DocumentDownloadIcon className="h-5 w-5" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Image Placeholder Area */}
          <motion.div
            className="hidden md:flex justify-center items-center" // Hidden on small screens, centered on medium+
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-80 h-80 lg:w-96 lg:h-96 bg-secondary-bg dark:bg-dark-secondary-bg rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/images/profile-photo.jpg" 
                alt="Rawaz Darya" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 
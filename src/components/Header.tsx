import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'techstack', label: 'Tech' }, // Assuming 'techstack' is the ID for TechStack section
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }, // Assuming 'contact' is the ID
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-secondary-bg/90 dark:bg-dark-secondary-bg/90 shadow-lg backdrop-blur-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-xl font-bold text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rawaz Darya
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-6"> {/* Adjusted spacing */}
            {navLinks.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative text-sm lg:text-base text-primary-text dark:text-dark-primary-text hover:text-accent dark:hover:text-accent transition-colors duration-200 ${
                  activeSection === item.id ? 'text-accent dark:text-accent font-semibold' : ''
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    layoutId="activeNavUnderline"
                  />
                )}
              </motion.a>
            ))}
            <ThemeToggleButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            <motion.button
              className="ml-3 text-primary-text dark:text-dark-primary-text focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-2 bg-secondary-bg dark:bg-dark-secondary-bg rounded-lg shadow-lg flex flex-col space-y-1"
          >
            {navLinks.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`block py-2 px-4 text-primary-text dark:text-dark-primary-text hover:bg-primary-bg dark:hover:bg-dark-primary-bg hover:text-accent dark:hover:text-accent transition-colors duration-200 rounded-md ${
                  activeSection === item.id ? 'bg-primary-bg dark:bg-dark-primary-bg text-accent font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
import React from 'react';
import useTheme from '../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ThemeToggleButton: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-dark-primary-bg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-primary-text dark:text-dark-primary-text" />
      ) : (
        <SunIcon className="h-6 w-6 text-primary-text dark:text-dark-primary-text" />
      )}
    </motion.button>
  );
};

export default ThemeToggleButton; 
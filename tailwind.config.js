/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // For theme switcher
  theme: {
    extend: {
      colors: {
        // Light theme (default)
        'primary-bg': '#F9FAFB',        // gray-50
        'secondary-bg': '#FFFFFF',      // white
        'primary-text': '#111827',      // gray-900
        'secondary-text': '#6B7280',    // gray-500

        // Dark theme specific (to be used with dark: prefix like dark:bg-dark-primary-bg)
        'dark-primary-bg': '#111827',    // Original primary-bg (gray-900)
        'dark-secondary-bg': '#1F2937',  // Original secondary-bg (gray-800)
        'dark-primary-text': '#F3F4F6',  // Original primary-text (gray-100)
        'dark-secondary-text': '#9CA3AF',// Original secondary-text (gray-400)

        'accent': '#3B82F6',             // blue-500 (remains the same for both themes)
        'accent-hover': '#2563EB',       // blue-600 (remains the same for both themes)
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        headings: ['Poppins', ...defaultTheme.fontFamily.sans], // Or use Poppins directly on heading elements
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
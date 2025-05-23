import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Code, 
  Download, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Play,
  MapPin
} from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface HeroProps {
  setActiveSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const heroRef = useIntersectionObserver(setActiveSection, 'home', { threshold: 0.3 });
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    'Full-Stack Developer',
    'Software Engineer', 
    'Problem Solver',
    'Tech Enthusiast'
  ];

  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      href: 'https://github.com/rawaz', 
      label: 'GitHub',
      color: '#333'
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: 'https://linkedin.com/in/rawaz', 
      label: 'LinkedIn',
      color: '#0077B5'
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: 'mailto:rawazd.akram@gmail.com', 
      label: 'Email',
      color: '#EA4335'
    }
  ];

  const achievements = [
    { value: '3+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Done' },
    { value: '100+', label: 'Happy Clients' },
    { value: '24/7', label: 'Support' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef} 
      id="home" 
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* Enhanced Background with Hero-themed Patterns */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30"></div>
        
        {/* Animated geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.5"/>
                <circle cx="0" cy="0" r="2" fill="#3B82F6" opacity="0.6"/>
                <circle cx="100" cy="0" r="2" fill="#10B981" opacity="0.6"/>
                <circle cx="0" cy="100" r="2" fill="#8B5CF6" opacity="0.6"/>
                <circle cx="100" cy="100" r="2" fill="#F59E0B" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)"/>
          </svg>
        </div>
        
        {/* Floating code elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 text-2xl text-blue-500/20 font-mono"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-xl text-emerald-500/20 font-mono"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            {'{}'}
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-20 text-lg text-purple-500/20 font-mono"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 3, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          >
            {'()'}
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-xl text-amber-500/20 font-mono"
            animate={{ 
              y: [0, 25, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
          >
            {'[]'}
          </motion.div>
        </div>
        
        {/* Dynamic gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20">
          {/* Content Section */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Hello, I'm{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Rawaz
                </motion.span>
                <motion.span
                  className="text-accent"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  .
                </motion.span>
              </h1>
            </motion.div>

            {/* Dynamic Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-16 flex items-center justify-center lg:justify-start"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    {roles[currentRole]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="text-accent ml-1"
                  animate={{ opacity: isTyping ? [0, 1, 0] : 1 }}
                  transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0 }}
                >
                  |
                </motion.span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Passionate about crafting exceptional digital experiences with modern technologies. 
              I transform ideas into reality through clean code and innovative solutions.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:rawazd.akram@gmail.com" 
                  className="hover:text-accent transition-colors"
                >
                  rawazd.akram@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a 
                  href="tel:+9647712177926" 
                  className="hover:text-accent transition-colors"
                >
                  +964 771 217 7926
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mars</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
                Let's Work Together
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              
              <motion.a
                href="/RawazDarya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-5 w-5" />
                Download Resume
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 group"
                  style={{ 
                    '--hover-color': social.color 
                  } as React.CSSProperties}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: social.color,
                    borderColor: social.color 
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Profile Image */}
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-blue-500 to-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner container */}
              <div className="absolute inset-2 rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
                <img
                  src="/Rawaz.jpg"
                  alt="Rawaz Darya - Full Stack Developer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-transparent opacity-0 flex items-end justify-center pb-8"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white text-center">
                    <Code className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Building the future</p>
                  </div>
                </motion.div>
              </div>

              {/* Floating achievement badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Available
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                animate={{ 
                  y: [0, 5, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              >
                3+ Years
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-md">
              {achievements.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="text-lg font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToProjects}
        >
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-400 mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
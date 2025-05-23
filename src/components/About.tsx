import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  User, 
  MapPin, 
  Calendar, 
  Coffee, 
  Monitor, 
  Server, 
  Database, 
  Globe, 
  Award,
  BookOpen,
  Heart,
  Zap,
  Target,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AboutProps {
  setActiveSection: (sectionId: string) => void;
}

const About: React.FC<AboutProps> = ({ setActiveSection }) => {
  const aboutRef = useIntersectionObserver(setActiveSection, 'about', { threshold: 0.2 });
  const [activeTab, setActiveTab] = useState<'story' | 'skills' | 'journey'>('story');
  const [skillProgress, setSkillProgress] = useState<{[key: string]: number}>({});

  const skills = [
    { name: 'React & TypeScript', level: 95, icon: <Monitor className="h-4 w-4" />, color: '#61DAFB' },
    { name: 'Laravel & PHP', level: 90, icon: <Server className="h-4 w-4" />, color: '#FF2D20' },
    { name: 'Database Design', level: 85, icon: <Database className="h-4 w-4" />, color: '#336791' },
    { name: 'Node.js & APIs', level: 87, icon: <Code2 className="h-4 w-4" />, color: '#68A063' },
    { name: 'Cloud & DevOps', level: 82, icon: <Zap className="h-4 w-4" />, color: '#FF9500' },
  ];

  const journey = [
    {
      year: '2023',
      title: 'Full-Stack Engineer',
      company: 'Tech Innovation',
      description: 'Leading development of enterprise web applications with modern tech stack.',
      icon: <Award className="h-5 w-5" />,
      color: '#8B5CF6'
    },
    {
      year: '2022',
      title: 'Computer Engineering Graduate',
      company: 'University',
      description: 'Completed Computer Engineering degree with focus on software development.',
      icon: <BookOpen className="h-5 w-5" />,
      color: '#10B981'
    },
    {
      year: '2021',
      title: 'Web Developer',
      company: 'Freelance',
      description: 'Started freelancing and building web applications for various clients.',
      icon: <Code2 className="h-5 w-5" />,
      color: '#3B82F6'
    },
  ];

  const personalStats = [
    { icon: <Coffee className="h-5 w-5" />, label: 'Cups of Coffee', value: '2,847', color: '#8B4513' },
    { icon: <Code2 className="h-5 w-5" />, label: 'Lines of Code', value: '50K+', color: '#10B981' },
    { icon: <Target className="h-5 w-5" />, label: 'Projects Completed', value: '25+', color: '#3B82F6' },
    { icon: <Heart className="h-5 w-5" />, label: 'Happy Clients', value: '100%', color: '#EF4444' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newProgress: {[key: string]: number} = {};
      skills.forEach(skill => {
        newProgress[skill.name] = skill.level;
      });
      setSkillProgress(newProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <section 
      ref={aboutRef} 
      id="about" 
      className="py-16 md:py-20 relative overflow-hidden"
    >
      {/* Enhanced Background with Personal-themed Patterns */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
        
        {/* Personal journey timeline pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="journey-pattern" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="40" r="4" fill="#F59E0B" opacity="0.6"/>
                <circle cx="60" cy="40" r="4" fill="#10B981" opacity="0.6"/>
                <circle cx="100" cy="40" r="4" fill="#3B82F6" opacity="0.6"/>
                <line x1="24" y1="40" x2="56" y2="40" stroke="#6B7280" strokeWidth="2" opacity="0.4"/>
                <line x1="64" y1="40" x2="96" y2="40" stroke="#6B7280" strokeWidth="2" opacity="0.4"/>
                <path d="M20 45 Q40 60 60 45 Q80 60 100 45" fill="none" stroke="#6B7280" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#journey-pattern)"/>
          </svg>
        </div>
        
        {/* Code-inspired brain pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #F59E0B 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #10B981 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, #3B82F6 1.5px, transparent 1.5px)
              `,
              backgroundSize: '40px 40px, 60px 60px, 80px 80px'
            }}
          ></div>
        </div>
        
        {/* Floating personal elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <User className="h-8 w-8 md:h-10 md:w-10 text-accent mr-3" />
            <h2 className="text-2xl md:text-3xl font-headings font-semibold text-primary-text dark:text-dark-primary-text">
              About Me
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with modern technologies and creative solutions.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
            {[
              { id: 'story', label: 'My Story', icon: <User className="h-4 w-4" /> },
              { id: 'skills', label: 'Skills', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'journey', label: 'Journey', icon: <MapPin className="h-4 w-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {activeTab === 'story' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Story Content */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Code2 className="h-6 w-6 mr-2 text-accent" />
                      Hello, I'm Rawaz
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      I'm a full-stack developer and computer engineer passionate about crafting seamless digital experiences that make a difference. My journey in technology began with curiosity and has evolved into a deep commitment to excellence.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      I specialize in building modern, responsive web applications using React, Laravel, TypeScript, and the latest web technologies. Every project is an opportunity to solve complex problems with elegant solutions.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      With a strong foundation in both front-end and back-end development, I focus on writing clean, scalable code that stands the test of time. I believe in the power of continuous learning and staying current with industry trends.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Mars
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Available for projects
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Personal Stats */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  {personalStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center group hover:shadow-lg transition-all duration-300"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-white"
                        style={{ backgroundColor: stat.color }}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Technical Expertise
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Constantly evolving skills in modern web development
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 group hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: skill.color }}
                          >
                            {skill.icon}
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skillProgress[skill.name] || 0}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'journey' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Professional Journey
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Key milestones in my development career
                  </p>
                </div>

                <div className="space-y-8">
                  {journey.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative group"
                    >
                      <div className="flex items-start gap-6">
                        {/* Timeline Icon */}
                        <div className="flex-shrink-0 relative">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.icon}
                          </div>
                          {index !== journey.length - 1 && (
                            <div className="absolute top-12 left-6 w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 flex-1 group-hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <span 
                              className="px-3 py-1 rounded-full text-white text-sm font-medium"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.year}
                            </span>
                          </div>
                          <p className="text-accent font-semibold mb-2">{item.company}</p>
                          <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                          
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-2 group-hover:text-accent transition-all duration-300 mt-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AboutProps {
  setActiveSection: (sectionId: string) => void;
}

const About: React.FC<AboutProps> = ({ setActiveSection }) => {
  const aboutRef = useIntersectionObserver(setActiveSection, 'about', { threshold: 0.2 });

  return (
    <section 
      ref={aboutRef} 
      id="about" 
      className="py-20 md:py-28 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          <motion.div
            className="md:w-2/3 lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-bold mb-6 relative inline-block text-primary-text dark:text-dark-primary-text">
              About me
              <motion.div
                className="absolute -bottom-2 left-0 h-1 w-12 bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.6, delay: 0.1}}
                viewport={{ once: true, amount: 0.2 }}
              ></motion.div>
            </h2>
            <motion.p
              className="text-secondary-text dark:text-dark-secondary-text leading-relaxed mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then this has led me to software development as it fulfills my love for learning and building things.
            </motion.p>
            <motion.p
              className="text-secondary-text dark:text-dark-secondary-text leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              With a passion for clean code and intuitive user experiences, I create applications that not only work well but feel great to use. Let's work together to bring your vision to life!
            </motion.p>
          </motion.div>
          <motion.div 
            className="md:w-1/3 lg:w-2/5 flex justify-center items-center p-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.02, 1, 1.02, 1],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Code2 className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-accent opacity-70 dark:opacity-60" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute -left-10 top-1/3 text-rose-500/20 text-[200px] font-bold select-none"
      >
        &lt;
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute -right-10 bottom-1/3 text-rose-500/20 text-[200px] font-bold select-none"
      >
        &gt;
      </motion.div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 md:pr-8 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Hello<span className="text-rose-500">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-light mb-2"
            >
              I'm Rawaz Darya
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-400 mb-1"
            >
              rawazd.akram@gmail.com
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-400 mb-4"
            >
              +9647712177926
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
                Software Developer
              </h2>
              <div className="absolute -bottom-2 left-0 h-1 w-12 bg-rose-500 md:left-0 mx-auto md:mx-0"></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-4 mt-8 justify-center md:justify-start"
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Got a project?
              </motion.a>
              <motion.a
                href="#"
                className="px-6 py-3 border border-gray-600 rounded hover:border-rose-500 hover:text-rose-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                My resume
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-blue-700 animate-pulse-slow"></div>
              <div className="absolute inset-1 rounded-full overflow-hidden bg-slate-800">
                <img
                  src="/Rawaz.jpg"
                  alt="Portrait of Rawaz Darya"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
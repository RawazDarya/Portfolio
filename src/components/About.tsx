import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { value: 120, label: 'Completed Projects', suffix: '+' },
    { value: 95, label: 'Client satisfaction', suffix: '%' },
    { value: 10, label: 'Years of experience', suffix: '+' },
  ];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              About me
              <motion.div
                className="absolute -bottom-2 left-0 h-1 w-12 bg-rose-500"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              ></motion.div>
            </h2>
            <motion.p
              className="text-gray-300 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then this has led me to software development as it fulfills my love for learning and building things.
            </motion.p>
            <motion.p
              className="text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              With a passion for clean code and intuitive user experiences, I create applications that not only work well but feel great to use. Let's work together to bring your vision to life!
            </motion.p>
          </motion.div>
          <div className="md:w-1/2" ref={ref}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/50 p-6 rounded-lg text-center hover:bg-slate-800 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-rose-500 text-4xl font-bold flex justify-center items-end">
                    {inView ? (
                      <CountUp end={stat.value} duration={2} />
                    ) : (
                      <span>0</span>
                    )}
                    <span className="text-2xl ml-1">{stat.suffix}</span>
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
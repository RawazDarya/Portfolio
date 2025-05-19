import React from 'react';
import { Globe, Smartphone, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const services = [
    {
      icon: <Globe size={28} className="text-rose-500" />,
      title: 'Website Development',
      description: 'Creating responsive, fast, and user-friendly websites using modern technologies.',
    },
    {
      icon: <Smartphone size={28} className="text-rose-500" />,
      title: 'App Development',
      description: 'Building native and cross-platform mobile applications for iOS and Android.',
    },
    {
      icon: <Server size={28} className="text-rose-500" />,
      title: 'Website Hosting',
      description: 'Secure and reliable hosting solutions with maintenance and support.',
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 md:py-28 bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8" ref={ref}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex-1 relative pl-16 pr-4 py-6 border-l-2 border-rose-500/20 hover:border-rose-500 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute left-0 top-6 translate-x-[-50%] w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 360 }}
              >
                {service.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-bold mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
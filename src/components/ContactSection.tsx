import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CodeBracketIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // UserCircleIcon for LinkedIn, CodeBracketIcon for GitHub placeholder

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission (replace with actual API call)
    console.log('Form data submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // Example: Replace with actual submission logic to Formspree, Netlify, or custom backend
    // For now, we'll just simulate success.
    const success = true; // Math.random() > 0.3; // Simulate random success/failure

    if (success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const inputClasses = "w-full p-3 bg-primary-bg dark:bg-dark-primary-bg border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-primary-text dark:text-dark-primary-text placeholder-gray-500 dark:placeholder-gray-400";

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-24 md:h-32 lg:h-40 bg-primary-bg dark:bg-dark-primary-bg"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)' }}
      ></div>
      <motion.section
        id="contacts" // Corrected ID for navigation
        className="py-24 md:py-32 bg-secondary-bg dark:bg-dark-secondary-bg text-primary-text dark:text-dark-primary-text relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            className="text-3xl sm:text-4xl font-headings font-bold text-center mb-8 text-primary-text dark:text-dark-primary-text"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-lg text-center text-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something exciting. If you have a question, a proposal, or just want to say hi, please don't hesitate to reach out!
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6 bg-primary-bg dark:bg-dark-primary-bg p-8 rounded-lg shadow-xl"
              variants={itemVariants}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-text dark:text-dark-secondary-text mb-1">Your Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-text dark:text-dark-secondary-text mb-1">Your Email</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-text dark:text-dark-secondary-text mb-1">Your Message</label>
                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className={inputClasses} placeholder="Hi Rawaz, let's connect!" />
              </div>
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-accent text-primary-text dark:text-dark-primary-text rounded-md hover:bg-accent-hover focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-bg dark:focus:ring-offset-dark-primary-bg transition-all duration-300 ease-in-out font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-sm text-green-400 text-center">Message sent successfully! Thanks for reaching out.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-red-400 text-center">Something went wrong. Please try again or use direct links.</p>
              )}
            </motion.form>

            {/* Direct Contact Info */}
            <motion.div 
              className="space-y-8 mt-8 md:mt-0"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-headings font-semibold text-primary-text dark:text-dark-primary-text mb-6">Or reach me directly:</h3>
              <a href="mailto:rawazd.akram@gmail.com" className="flex items-center p-4 bg-primary-bg dark:bg-dark-primary-bg rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                <EnvelopeIcon className="h-8 w-8 text-accent mr-4 group-hover:scale-110 transition-transform"/>
                <div>
                  <h4 className="font-semibold text-lg text-primary-text dark:text-dark-primary-text">Email</h4>
                  <p className="text-secondary-text dark:text-dark-secondary-text group-hover:text-accent-hover transition-colors">rawazd.akram@gmail.com</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/rawaz-darya-259253221/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-primary-bg dark:bg-dark-primary-bg rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                <UserCircleIcon className="h-8 w-8 text-accent mr-4 group-hover:scale-110 transition-transform"/> {/* Placeholder for LinkedIn */} 
                <div>
                  <h4 className="font-semibold text-lg text-primary-text dark:text-dark-primary-text">LinkedIn</h4>
                  <p className="text-secondary-text dark:text-dark-secondary-text group-hover:text-accent-hover transition-colors">linkedin.com/in/rawaz-darya</p>
                </div>
              </a>
              <a href="https://github.com/RawazDarya" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-primary-bg dark:bg-dark-primary-bg rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                <CodeBracketIcon className="h-8 w-8 text-accent mr-4 group-hover:scale-110 transition-transform"/> {/* Placeholder for GitHub */} 
                <div>
                  <h4 className="font-semibold text-lg text-primary-text dark:text-dark-primary-text">GitHub</h4>
                  <p className="text-secondary-text dark:text-dark-secondary-text group-hover:text-accent-hover transition-colors">github.com/RawazDarya</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactSection; 
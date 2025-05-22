import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactProps {
  setActiveSection: (sectionId: string) => void;
}

const Contact: React.FC<ContactProps> = ({ setActiveSection }) => {
  const contactRef = useIntersectionObserver(setActiveSection, 'contact', { threshold: 0.3 });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Replace "YOUR_FORMSPREE_ENDPOINT_OR_OTHER_API" with your actual endpoint
      const response = await fetch("YOUR_FORMSPREE_ENDPOINT_OR_OTHER_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json().catch(() => ({})); // Try to parse error, default to empty object
        setSubmitError(errorData.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setSubmitError("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses = "w-full bg-secondary-bg dark:bg-dark-secondary-bg border rounded p-3 focus:outline-none focus:ring-2 placeholder-gray-500 dark:placeholder-gray-400 text-primary-text dark:text-dark-primary-text";
  const inputNormalBorder = "border-gray-300 dark:border-gray-600 focus:ring-accent dark:focus:ring-accent";
  const inputErrorBorder = "border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400";

  return (
    <section 
      ref={contactRef} 
      id="contact" 
      className="py-20 md:py-28 bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-bold mb-4 text-primary-text dark:text-dark-primary-text">
              Have a project?<br />Let's talk!
            </h2>
            <p className="text-secondary-text dark:text-dark-secondary-text mb-6 leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </motion.div>
          
          <motion.div
            className="md:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-secondary-bg dark:bg-dark-secondary-bg p-6 md:p-8 rounded-lg shadow-xl"
            >
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-green-600 dark:text-green-400 p-4 rounded bg-green-500/10 dark:bg-green-400/10 mb-4 text-center"
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-red-600 dark:text-red-400 p-4 rounded bg-red-500/10 dark:bg-red-400/10 mb-4 text-center"
                >
                  {submitError}
                </motion.div>
              )}
              
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-secondary-text dark:text-dark-secondary-text">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${errors.name ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-red-500 dark:text-red-400 text-xs">
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-secondary-text dark:text-dark-secondary-text">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${errors.email ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-red-500 dark:text-red-400 text-xs">
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div
                className="mb-6" // Increased margin for button spacing
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-secondary-text dark:text-dark-secondary-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${errors.message ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.message && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-red-500 dark:text-red-400 text-xs">
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-accent text-white dark:text-dark-primary-text rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent-hover focus:ring-offset-2 dark:focus:ring-offset-dark-secondary-bg transition-all duration-300 ease-in-out font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
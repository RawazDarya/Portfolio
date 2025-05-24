import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  User, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Github,
  Linkedin,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}

interface ContactProps {
  setActiveSection: (sectionId: string) => void;
}

const Contact: React.FC<ContactProps> = ({ setActiveSection }) => {
  const contactRef = useIntersectionObserver(setActiveSection, 'contact', { threshold: 0.3 });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const budgetOptions = [
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'Let\'s discuss'
  ];

  const timelineOptions = [
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3+ months',
    'Flexible'
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: 'Email',
      value: 'rawazd.akram@gmail.com',
      href: 'mailto:rawazd.akram@gmail.com',
      color: '#EA4335'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: 'Phone',
      value: '+964 771 217 7926',
      href: 'tel:+9647712177926',
      color: '#10B981'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: 'Location',
      value: 'Mars',
      href: '#',
      color: '#3B82F6'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: '#',
      color: '#F59E0B'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/RawazDarya',
      label: 'GitHub',
      color: '#333'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://www.linkedin.com/in/rawaz-darya-259253221/',
      label: 'LinkedIn',
      color: '#0077B5'
    }
  ];

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        to_email: 'rawazd.akram@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', budget: '', timeline: '' });
      setTimeout(() => setIsSubmitted(false), 8000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(
        error instanceof Error && error.message.includes('EmailJS configuration') 
          ? error.message 
          : "Failed to send message. Please try again or contact me directly at rawazd.akram@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

  useEffect(() => {
    // Listen for service selection events
    const handleServiceSelection = (event: CustomEvent) => {
      const serviceName = event.detail.serviceName;
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about ${serviceName}`
      }));
    };

    // Also check localStorage on component mount
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about ${selectedService}`
      }));
      // Clear the stored service after using it
      localStorage.removeItem('selectedService');
    }

    window.addEventListener('serviceSelected', handleServiceSelection as EventListener);
    
    return () => {
      window.removeEventListener('serviceSelected', handleServiceSelection as EventListener);
    };
  }, []);

  return (
    <section 
      ref={contactRef} 
      id="contact" 
      className="py-16 md:py-20 relative overflow-hidden"
    >
      {/* Enhanced Background with Communication-themed Patterns */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20"></div>
        
        {/* Communication network pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="communication-network" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="4" fill="#8B5CF6" opacity="0.8"/>
                <circle cx="150" cy="50" r="4" fill="#EC4899" opacity="0.8"/>
                <circle cx="100" cy="150" r="4" fill="#06B6D4" opacity="0.8"/>
                <circle cx="50" cy="150" r="3" fill="#10B981" opacity="0.6"/>
                <circle cx="150" cy="150" r="3" fill="#F59E0B" opacity="0.6"/>
                <line x1="50" y1="50" x2="150" y2="50" stroke="#8B5CF6" strokeWidth="1" opacity="0.4"/>
                <line x1="150" y1="50" x2="100" y2="150" stroke="#EC4899" strokeWidth="1" opacity="0.4"/>
                <line x1="100" y1="150" x2="50" y2="50" stroke="#06B6D4" strokeWidth="1" opacity="0.4"/>
                <line x1="50" y1="150" x2="150" y2="150" stroke="#10B981" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#communication-network)"/>
          </svg>
        </div>
        
        {/* Message bubble pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.3) 20px, transparent 20px),
                radial-gradient(ellipse at 80% 40%, rgba(236, 72, 153, 0.2) 15px, transparent 15px),
                radial-gradient(ellipse at 40% 80%, rgba(6, 182, 212, 0.25) 18px, transparent 18px)
              `,
              backgroundSize: '150px 150px, 120px 120px, 180px 180px'
            }}
          ></div>
        </div>
        
        {/* Floating communication elements */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
        />
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
            <MessageCircle className="h-8 w-8 md:h-10 md:w-10 text-accent mr-3" />
            <h2 className="text-2xl md:text-3xl font-headings font-semibold text-primary-text dark:text-dark-primary-text">
              Let's Work Together
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-accent" />
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ready to bring your ideas to life? I'm here to help you create exceptional digital experiences. 
                Whether it's a new project or just a friendly chat about technology, don't hesitate to reach out.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {info.label}
                      </div>
                      <div className="text-gray-900 dark:text-white font-semibold">
                        {info.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
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
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 dark:border-emerald-700/50 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-emerald-700 dark:text-emerald-300 font-semibold">
                    Available for Projects
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-sm">
                    Currently accepting new client work
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-emerald-700 dark:text-emerald-300 text-center"
                    >
                      <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm">I'll get back to you within 24 hours.</p>
                    </motion.div>
                  )}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-300 text-center"
                    >
                      <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                      <p>{submitError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                          : focusedField === 'name'
                            ? 'border-accent bg-accent/5 dark:bg-accent/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50'
                      } focus:outline-none focus:ring-2 focus:ring-accent/50`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-red-500 text-xs"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                          : focusedField === 'email'
                            ? 'border-accent bg-accent/5 dark:bg-accent/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50'
                      } focus:outline-none focus:ring-2 focus:ring-accent/50`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-red-500 text-xs"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      errors.subject 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : focusedField === 'subject'
                          ? 'border-accent bg-accent/5 dark:bg-accent/10'
                          : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50'
                    } focus:outline-none focus:ring-2 focus:ring-accent/50`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-500 text-xs"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                {/* Budget and Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                {/* Message Field */}
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MessageCircle className="inline h-4 w-4 mr-1" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : focusedField === 'message'
                          ? 'border-accent bg-accent/5 dark:bg-accent/10'
                          : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50'
                    } focus:outline-none focus:ring-2 focus:ring-accent/50`}
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-500 text-xs"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
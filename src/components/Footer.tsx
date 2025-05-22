import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary-bg dark:bg-dark-secondary-bg text-secondary-text dark:text-dark-secondary-text p-8 text-center">
      <p>&copy; {currentYear} Rawaz Darya. All rights reserved.</p>
      {/* Optional: Add social links here */}
    </footer>
  );
};

export default Footer;
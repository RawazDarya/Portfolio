import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Certificates from './components/portfolio/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Studio from './components/Studio/Studio';

const PortfolioLayout = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg dark:bg-dark-primary-bg">
      <Header activeSection={activeSection} />
      <main className="flex-grow">
        <Hero setActiveSection={setActiveSection} />
        <TechStack setActiveSection={setActiveSection} />
        <About setActiveSection={setActiveSection} />
        <Services setActiveSection={setActiveSection} />
        <Projects setActiveSection={setActiveSection} />
        <Certificates setActiveSection={setActiveSection} />
        <Contact setActiveSection={setActiveSection} />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioLayout />} />
      <Route path="/studio/*" element={<Studio />} />
      <Route path="*" element={<div><h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p> <a href="/">Go Home</a></div>} />
    </Routes>
  );
}

export default App;
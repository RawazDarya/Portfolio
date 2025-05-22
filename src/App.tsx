import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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
        <Contact setActiveSection={setActiveSection} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
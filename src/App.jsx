import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Loader from './components/Loader';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [fadeOut, setFadeOut] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Start fade-out after 1.8 s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    // Remove loader from DOM after fade completes (0.6 s transition)
    const removeTimer = setTimeout(() => setShowLoader(false), 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <>
          {showLoader && <Loader fadeOut={fadeOut} />}
          <MainLayout>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Education />
            <Achievements />
            <Resume />
            <Contact />
          </MainLayout>
        </>
      } />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;


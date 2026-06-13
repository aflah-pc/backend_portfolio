import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import resumePdf from '../assets/74e2556158bc9328aa0e5153f22a5298080b390cd75b39f7559c16a5a86f0978 (1).pdf';

const Hero = () => {
  const { personalInfo } = usePortfolioData();
  const roleWords = personalInfo.role 
    ? personalInfo.role.split('|').map(w => w.trim()) 
    : ['Cyber Security Student', 'Security Research Enthusiast', 'Ethical Hacking Learner'];
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-brand-cyan font-semibold tracking-widest uppercase mb-4">
            {personalInfo.department}
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 h-16">
            <Typewriter
              words={roleWords}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </div>
          
          <p className="max-w-2xl mx-auto text-gray-400 mb-10 text-lg">
            {personalInfo.tagline}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href={resumePdf}
              download="Aflah_Muneer_Resume.pdf"
              target="_blank"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

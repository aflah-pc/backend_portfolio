import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Resume = () => {
  const { personalInfo } = usePortfolioData();
  const titleRole = personalInfo.role ? personalInfo.role.split('|')[0].trim() : 'Cyber Security Specialist';
  return (
    <section id="resume" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-display font-bold mb-8">
          <span className="gradient-text">Resume</span>
        </h2>
        
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Want a deeper dive into my experience, projects, and skills? Download my complete resume below to see how my qualifications align with your cyber security needs.
        </p>

        <div className="glass-card p-12 relative overflow-hidden group">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/10 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-brand-purple/10 transition-colors duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-dark-bg border border-dark-border rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <FaFileAlt className="text-4xl text-brand-cyan" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h3>
            <p className="text-brand-purple font-medium mb-8">{titleRole}</p>
            
            <motion.a
              href={personalInfo.resumeUrl || '#'}
              download="Aflah_Muneer_Resume.pdf"
              target="_blank"
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download PDF Resume
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;

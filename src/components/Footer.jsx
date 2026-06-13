import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Footer = () => {
  const { personalInfo } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border/50 bg-dark-bg/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-start text-center md:text-left">
          {/* Brand/Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold gradient-text">{personalInfo.name}</h2>
            <p className="text-gray-400 max-w-sm mx-auto md:mx-0">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <a href="#about" className="text-gray-400 hover:text-brand-cyan transition-colors">About</a>
            <a href="#skills" className="text-gray-400 hover:text-brand-cyan transition-colors">Skills</a>
            <a href="#projects" className="text-gray-400 hover:text-brand-cyan transition-colors">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-brand-cyan transition-colors">Contact</a>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href={personalInfo.github} aria-label="GitHub Profile" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaGithub size={24} />
              </a>
              <a href={personalInfo.linkedin} aria-label="LinkedIn Profile" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-blue hover:-translate-y-1 transition-all duration-300">
                <FaLinkedin size={24} />
              </a>
              <a href={personalInfo.instagram || '#'} aria-label="Instagram Profile" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 hover:-translate-y-1 transition-all duration-300">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border/30 mt-12 pt-8 text-center text-gray-500">
          <p>© {currentYear} {personalInfo.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

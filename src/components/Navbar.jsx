import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useTheme } from '../context/ThemeContext';
import resumePdf from '../assets/74e2556158bc9328aa0e5153f22a5298080b390cd75b39f7559c16a5a86f0978 (1).pdf';

const Navbar = () => {
  const { personalInfo } = usePortfolioData();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { id: 1, link: 'home' },
    { id: 2, link: 'about' },
    { id: 3, link: 'skills' },
    { id: 4, link: 'projects' },
    { id: 5, link: 'certifications' },
    { id: 6, link: 'education' },
    { id: 7, link: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="flex justify-between items-center w-full h-full px-4 md:px-16">

        {/* Brand Name */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-display font-bold gradient-text cursor-pointer">
            <Link to="home" smooth duration={500}>{personalInfo.name.split(' ')[0]}</Link>
          </h1>
        </div>

        {/* Desktop Menu - Right aligned */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map(({ id, link }) => (
              <li key={id} className="cursor-pointer capitalize font-medium text-gray-300 hover:text-brand-cyan hover:scale-105 duration-200">
                <Link to={link} smooth duration={500} spy={true} activeClass="text-brand-cyan font-bold" offset={-80}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-gray-300 hover:text-brand-cyan hover:bg-gray-100/10 transition-all duration-200 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <a href={resumePdf} download="Aflah_Muneer_Resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-sm">
            Resume
          </a>
        </div>

        {/* Mobile Menu Icon & Theme Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-gray-300 hover:text-brand-cyan hover:bg-gray-100/10 transition-all duration-200 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <div onClick={() => setNav(!nav)} className="cursor-pointer text-gray-300 hover:text-brand-cyan transition-colors z-10">
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>

        {/* Mobile Menu */}
        <ul className={`lg:hidden flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-dark-bg/95 backdrop-blur-xl transition-transform duration-300 ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
          {links.map(({ id, link }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-2xl text-gray-300 hover:text-brand-cyan duration-200">
              <Link onClick={() => setNav(!nav)} to={link} smooth duration={500} spy={true} offset={-80}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

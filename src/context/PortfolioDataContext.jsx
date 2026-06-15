import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FaShieldAlt,
  FaNetworkWired,
  FaSearch,
  FaCode,
  FaLock,
  FaBug,
  FaJsSquare,
  FaPython,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { SiC, SiGnubash, SiTailwindcss, SiWireshark, SiKalilinux, SiMetasploit } from 'react-icons/si';

import {
  personalInfo as staticPersonalInfo,
  skillsData as staticSkillsData,
  projectsData as staticProjectsData,
  certificationsData as staticCertificationsData,
  educationData as staticEducationData,
  achievementsData as staticAchievementsData
} from '../data/portfolioData';

const PortfolioDataContext = createContext();

const iconMap = {
  // Category Icons (with colors)
  'Cyber Security': <FaShieldAlt className="text-brand-blue" />,
  'Programming': <FaCode className="text-brand-cyan" />,
  'Web Technologies': <FaReact className="text-brand-purple" />,
  'Tools & OS': <FaBug className="text-brand-blue" />,

  // Skill Icons
  'FaJsSquare': <FaJsSquare />,
  'FaPython': <FaPython />,
  'SiC': <SiC />,
  'SiGnubash': <SiGnubash />,
  'FaReact': <FaReact />,
  'SiTailwindcss': <SiTailwindcss />,
  'FaHtml5': <FaHtml5 />,
  'FaCss3Alt': <FaCss3Alt />,
  'FaNodeJs': <FaNodeJs />,
  'SiWireshark': <SiWireshark />,
  'SiMetasploit': <SiMetasploit />,
  'SiKalilinux': <SiKalilinux />,
  'FaGithub': <FaGithub />,

  // Achievement Icons
  'FaCode': <FaCode />,
  'FaLock': <FaLock />,
  'FaSearch': <FaSearch />,
  'FaNetworkWired': <FaNetworkWired />,
  'FaShieldAlt': <FaShieldAlt />,
  'FaBug': <FaBug />
};

export const PortfolioDataProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState(staticPersonalInfo);
  const [skillsData, setSkillsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [certificationsData, setCertificationsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio');
      if (!response.ok) {
        throw new Error('API server returned error code ' + response.status);
      }
      const json = await response.json();
      if (json.status === 'success') {
        const { personalInfo: apiInfo, skills, projects, certifications, education, achievements } = json.data;

        // 1. Process personalInfo (ensure we merge default/static ones in case some keys are missing)
        const processedPersonalInfo = { ...staticPersonalInfo, ...apiInfo };
        if (apiInfo.resumeUrl) {
          processedPersonalInfo.resumeUrl = apiInfo.resumeUrl.startsWith('http') || apiInfo.resumeUrl.startsWith('/') || apiInfo.resumeUrl.startsWith('data:')
            ? apiInfo.resumeUrl
            : new URL(`../assets/${apiInfo.resumeUrl}`, import.meta.url).href;
        }
        setPersonalInfo(processedPersonalInfo);

        // 2. Process skills: Group by category and resolve icons
        const groupedSkills = {};
        skills.forEach(skill => {
          if (!groupedSkills[skill.category]) {
            groupedSkills[skill.category] = {
              category: skill.category,
              icon: iconMap[skill.category] || <FaShieldAlt className="text-brand-blue" />,
              skills: []
            };
          }
          groupedSkills[skill.category].skills.push({
            id: skill.id,
            name: skill.name,
            percentage: skill.percentage,
            icon: iconMap[skill.icon] || null
          });
        });
        setSkillsData(Object.values(groupedSkills));

        // 3. Process projects
        setProjectsData(projects.map(proj => ({
          ...proj,
          // If the image is a local filename, resolve it or keep it as is
          // In standard React projects, local relative paths inside public/ or dist/ work.
          // For assets imported via bundler, we'll keep the static fallback images or let them provide URL.
          image: proj.image.startsWith('http') || proj.image.startsWith('/')
            ? proj.image 
            : new URL(`../assets/${proj.image}`, import.meta.url).href
        })));

        // 4. Process certifications
        setCertificationsData(certifications);

        // 5. Process education
        setEducationData(education);

        // 6. Process achievements: Resolve icons
        setAchievementsData(achievements.map(ach => ({
          ...ach,
          icon: iconMap[ach.icon] || <FaCode />
        })));

        setError(null);
      } else {
        throw new Error(json.message || 'Unknown API status');
      }
    } catch (err) {
      console.warn('[!] Backend unreachable, falling back to static data:', err.message);
      setError(err.message);
      // Fallback states mapping icons from the static JSX directly
      setPersonalInfo(staticPersonalInfo);
      setSkillsData(staticSkillsData);
      setProjectsData(staticProjectsData);
      setCertificationsData(staticCertificationsData);
      setEducationData(staticEducationData);
      setAchievementsData(staticAchievementsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioDataContext.Provider value={{
      personalInfo,
      skillsData,
      projectsData,
      certificationsData,
      educationData,
      achievementsData,
      loading,
      error,
      fetchData
    }}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};

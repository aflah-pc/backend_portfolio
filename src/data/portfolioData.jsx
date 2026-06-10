import React from 'react';
import secureLoginImg from '../assets/secure_login.png';
import passwordAnalyzerImg from '../assets/password_analyzer.png';
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

export const personalInfo = {
  name: "Aflah Muneer PC",
  role: "Cyber Security Student | Security Research Enthusiast | Ethical Hacking Learner",
  tagline: "Securing the Digital Future Through Cyber Security Innovation",
  department: "Cyber Security",
  location: "Kerala, India",
  email: "aflahpc7@gmail.com",
  phone: "+91 62829 66549",
  linkedin: "https://www.linkedin.com/in/aflah-muneer-p-c-53aa51349",
  github: "https://github.com/placeholder",
  instagram: "https://instagram.com/aflah__pc",
  mission: "Passionate Cyber Security student focused on ethical hacking, network security, and digital forensics. Dedicated to continuous learning and developing innovative solutions to protect digital assets against emerging cyber threats."
};

export const skillsData = [
  {
    category: "Cyber Security",
    icon: <FaShieldAlt className="text-brand-blue" />,
    skills: [
      { name: "Ethical Hacking", percentage: 85 },
      { name: "Penetration Testing", percentage: 80 },
      { name: "Network Security", percentage: 90 },
      { name: "Vulnerability Assessment", percentage: 85 },
      { name: "Digital Forensics", percentage: 75 },
      { name: "Security Analysis", percentage: 80 }
    ]
  },
  {
    category: "Programming",
    icon: <FaCode className="text-brand-cyan" />,
    skills: [
      { name: "JavaScript", icon: <FaJsSquare />, percentage: 85 },
      { name: "Python", icon: <FaPython />, percentage: 90 },
      { name: "C", icon: <SiC />, percentage: 70 },
      { name: "Bash", icon: <SiGnubash />, percentage: 80 }
    ]
  },
  {
    category: "Web Technologies",
    icon: <FaReact className="text-brand-purple" />,
    skills: [
      { name: "React.js", icon: <FaReact />, percentage: 85 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, percentage: 90 },
      { name: "HTML5", icon: <FaHtml5 />, percentage: 95 },
      { name: "CSS3", icon: <FaCss3Alt />, percentage: 90 },
      { name: "Node.js", icon: <FaNodeJs />, percentage: 75 }
    ]
  },
  {
    category: "Tools & OS",
    icon: <FaBug className="text-brand-blue" />,
    skills: [
      { name: "Wireshark", icon: <SiWireshark />, percentage: 85 },
      { name: "Burp Suite", percentage: 80 },
      { name: "Nmap", percentage: 90 },
      { name: "Metasploit", icon: <SiMetasploit />, percentage: 75 },
      { name: "Linux (Kali/Ubuntu)", icon: <SiKalilinux />, percentage: 95 },
      { name: "Git", icon: <FaGithub />, percentage: 85 }
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Network Vulnerability Scanner",
    description: "A comprehensive tool to scan internal networks for known vulnerabilities, misconfigurations, and outdated software.",
    technologies: ["Python", "Nmap", "Bash"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "#",
    liveDemo: "#"
  },
  {
    id: 2,
    title: "Secure Login Authentication System",
    description: "Implemented a robust authentication system featuring MFA, JWT tokens, and rate limiting to prevent brute force attacks.",
    technologies: ["React.js", "Node.js", "MongoDB", "JWT"],
    image: secureLoginImg,
    github: "#",
    liveDemo: "#"
  },
  {
    id: 3,
    title: "Cyber Threat Detection Dashboard",
    description: "A real-time dashboard visualizing network traffic anomalies using machine learning algorithms for threat detection.",
    technologies: ["Python", "React", "D3.js", "Scikit-Learn"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "#",
    liveDemo: "#"
  },
  {
    id: 4,
    title: "Password Strength Analyzer",
    description: "A web-based utility that evaluates password complexity and checks against known breached databases via the Pwned Passwords API.",
    technologies: ["JavaScript", "HTML/CSS", "API Integration"],
    image: passwordAnalyzerImg,
    github: "#",
    liveDemo: "#"
  },
  {
    id: 5,
    title: "Security Monitoring Tool",
    description: "Custom SIEM solution designed for small networks to monitor logs, aggregate data, and trigger alerts on suspicious activities.",
    technologies: ["Python", "Elasticsearch", "Kibana"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "#",
    liveDemo: "#"
  },
  {
    id: 6,
    title: "Digital Forensics Investigation Platform",
    description: "Platform for safely acquiring, analyzing, and reporting digital evidence from compromised machines in isolated environments.",
    technologies: ["C", "Bash", "Linux Forensics Tools"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "#",
    liveDemo: "#"
  }
];

export const certificationsData = [
  {
    id: 1,
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "Anticipated 2026",
    status: "In Progress",
    link: "#"
  },
  {
    id: 2,
    title: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    date: "Aug 2025",
    status: "Completed",
    link: "#"
  },
  {
    id: 3,
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "Dec 2025",
    status: "Learning",
    link: "#"
  },
  {
    id: 4,
    title: "Cisco Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Jan 2025",
    status: "Completed",
    link: "#"
  }
];

export const educationData = [
  {
    id: 1,
    degree: "Bachelor Degree in Cyber Security",
    institution: "Institution Name Placeholder",
    year: "2023 - 2027",
    cgpa: "CGPA Placeholder",
    description: "Focusing on advanced network security, digital forensics, ethical hacking, and cryptography. Actively participating in security research and CTF competitions."
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "School Name Placeholder",
    year: "2021 - 2023",
    cgpa: "Percentage Placeholder",
    description: "Computer Science major with a strong foundation in mathematics and programming principles."
  }
];

export const achievementsData = [
  {
    id: 1,
    title: "Hackathon Participation",
    description: "Participated in National Cyber Security Hackathon, building a real-time threat detection system.",
    icon: <FaCode />
  },
  {
    id: 2,
    title: "CTF Challenges",
    description: "Consistently ranked in the top 10% in various Capture The Flag (CTF) challenges on HackTheBox and TryHackMe.",
    icon: <FaLock />
  },
  {
    id: 3,
    title: "Security Research",
    description: "Discovered and reported mild vulnerabilities in open-source projects, contributing to responsible disclosure programs.",
    icon: <FaSearch />
  },
  {
    id: 4,
    title: "Technical Workshops",
    description: "Conducted workshops on basic networking and ethical hacking for junior college students.",
    icon: <FaNetworkWired />
  }
];

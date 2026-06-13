import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.sqlite');

let db = null;

export async function getDbConnection() {
  if (db) return db;
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  return db;
}

export async function initializeDatabase() {
  const connection = await getDbConnection();

  // 1. Settings / Personal Info table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  // 2. Skills table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      name TEXT,
      percentage INTEGER,
      icon TEXT
    )
  `);

  // 3. Projects table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      technologies TEXT,
      image TEXT,
      github TEXT,
      liveDemo TEXT
    )
  `);

  // 4. Certifications table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      issuer TEXT,
      date TEXT,
      status TEXT,
      link TEXT
    )
  `);

  // 5. Education table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      degree TEXT,
      institution TEXT,
      year TEXT,
      cgpa TEXT,
      description TEXT
    )
  `);

  // 6. Achievements table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      icon TEXT
    )
  `);

  // 7. Messages table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'unread'
    )
  `);

  // 8. Users table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT
    )
  `);

  // Seed Admin user if empty
  const adminCheck = await connection.get('SELECT * FROM users LIMIT 1');
  if (!adminCheck) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await connection.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [adminUsername, passwordHash]
    );
    console.log(`Admin user seeded with username: ${adminUsername}`);
  }

  // Seed default data if settings table is empty
  const settingsCheck = await connection.get('SELECT * FROM settings LIMIT 1');
  if (!settingsCheck) {
    await seedDefaultData(connection);
  }
}

async function seedDefaultData(connection) {
  console.log('Seeding default portfolio data...');

  // Seed settings (personalInfo)
  const personalInfo = {
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

  for (const [key, value] of Object.entries(personalInfo)) {
    await connection.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
  }

  // Seed skills
  const defaultSkills = [
    // Cyber Security
    { category: "Cyber Security", name: "Ethical Hacking", percentage: 85, icon: "FaShieldAlt" },
    { category: "Cyber Security", name: "Penetration Testing", percentage: 80, icon: "FaShieldAlt" },
    { category: "Cyber Security", name: "Network Security", percentage: 90, icon: "FaShieldAlt" },
    { category: "Cyber Security", name: "Vulnerability Assessment", percentage: 85, icon: "FaShieldAlt" },
    { category: "Cyber Security", name: "Digital Forensics", percentage: 75, icon: "FaShieldAlt" },
    { category: "Cyber Security", name: "Security Analysis", percentage: 80, icon: "FaShieldAlt" },
    // Programming
    { category: "Programming", name: "JavaScript", percentage: 85, icon: "FaJsSquare" },
    { category: "Programming", name: "Python", percentage: 90, icon: "FaPython" },
    { category: "Programming", name: "C", percentage: 70, icon: "SiC" },
    { category: "Programming", name: "Bash", percentage: 80, icon: "SiGnubash" },
    // Web Technologies
    { category: "Web Technologies", name: "React.js", percentage: 85, icon: "FaReact" },
    { category: "Web Technologies", name: "Tailwind CSS", percentage: 90, icon: "SiTailwindcss" },
    { category: "Web Technologies", name: "HTML5", percentage: 95, icon: "FaHtml5" },
    { category: "Web Technologies", name: "CSS3", percentage: 90, icon: "FaCss3Alt" },
    { category: "Web Technologies", name: "Node.js", percentage: 75, icon: "FaNodeJs" },
    // Tools & OS
    { category: "Tools & OS", name: "Wireshark", percentage: 85, icon: "SiWireshark" },
    { category: "Tools & OS", name: "Burp Suite", percentage: 80, icon: "" },
    { category: "Tools & OS", name: "Nmap", percentage: 90, icon: "" },
    { category: "Tools & OS", name: "Metasploit", percentage: 75, icon: "SiMetasploit" },
    { category: "Tools & OS", name: "Linux (Kali/Ubuntu)", percentage: 95, icon: "SiKalilinux" },
    { category: "Tools & OS", name: "Git", percentage: 85, icon: "FaGithub" }
  ];

  for (const s of defaultSkills) {
    await connection.run(
      'INSERT INTO skills (category, name, percentage, icon) VALUES (?, ?, ?, ?)',
      [s.category, s.name, s.percentage, s.icon]
    );
  }

  // Seed projects
  const defaultProjects = [
    {
      title: "Network Vulnerability Scanner",
      description: "A comprehensive tool to scan internal networks for known vulnerabilities, misconfigurations, and outdated software.",
      technologies: "Python, Nmap, Bash",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      github: "#",
      liveDemo: "#"
    },
    {
      title: "Secure Login Authentication System",
      description: "Implemented a robust authentication system featuring MFA, JWT tokens, and rate limiting to prevent brute force attacks.",
      technologies: "React.js, Node.js, MongoDB, JWT",
      image: "secure_login.png", // Just storage file names or URLs
      github: "#",
      liveDemo: "#"
    },
    {
      title: "Cyber Threat Detection Dashboard",
      description: "A real-time dashboard visualizing network traffic anomalies using machine learning algorithms for threat detection.",
      technologies: "Python, React, D3.js, Scikit-Learn",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      github: "#",
      liveDemo: "#"
    },
    {
      title: "Password Strength Analyzer",
      description: "A web-based utility that evaluates password complexity and checks against known breached databases via the Pwned Passwords API.",
      technologies: "JavaScript, HTML/CSS, API Integration",
      image: "password_analyzer.png",
      github: "#",
      liveDemo: "#"
    },
    {
      title: "Security Monitoring Tool",
      description: "Custom SIEM solution designed for small networks to monitor logs, aggregate data, and trigger alerts on suspicious activities.",
      technologies: "Python, Elasticsearch, Kibana",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      github: "#",
      liveDemo: "#"
    },
    {
      title: "Digital Forensics Investigation Platform",
      description: "Platform for safely acquiring, analyzing, and reporting digital evidence from compromised machines in isolated environments.",
      technologies: "C, Bash, Linux Forensics Tools",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      github: "#",
      liveDemo: "#"
    }
  ];

  for (const p of defaultProjects) {
    await connection.run(
      'INSERT INTO projects (title, description, technologies, image, github, liveDemo) VALUES (?, ?, ?, ?, ?, ?)',
      [p.title, p.description, p.technologies, p.image, p.github, p.liveDemo]
    );
  }

  // Seed certifications
  const defaultCertifications = [
    { title: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", date: "Anticipated 2026", status: "In Progress", link: "#" },
    { title: "Google Cybersecurity Certificate", issuer: "Google / Coursera", date: "Aug 2025", status: "Completed", link: "#" },
    { title: "CompTIA Security+", issuer: "CompTIA", date: "Dec 2025", status: "Learning", link: "#" },
    { title: "Cisco Networking Basics", issuer: "Cisco Networking Academy", date: "Jan 2025", status: "Completed", link: "#" }
  ];

  for (const c of defaultCertifications) {
    await connection.run(
      'INSERT INTO certifications (title, issuer, date, status, link) VALUES (?, ?, ?, ?, ?)',
      [c.title, c.issuer, c.date, c.status, c.link]
    );
  }

  // Seed education
  const defaultEducation = [
    {
      degree: "Bachelor Degree in Cyber Security",
      institution: "Institution Name Placeholder",
      year: "2023 - 2027",
      cgpa: "CGPA Placeholder",
      description: "Focusing on advanced network security, digital forensics, ethical hacking, and cryptography. Actively participating in security research and CTF competitions."
    },
    {
      degree: "Higher Secondary Education",
      institution: "School Name Placeholder",
      year: "2021 - 2023",
      cgpa: "Percentage Placeholder",
      description: "Computer Science major with a strong foundation in mathematics and programming principles."
    }
  ];

  for (const e of defaultEducation) {
    await connection.run(
      'INSERT INTO education (degree, institution, year, cgpa, description) VALUES (?, ?, ?, ?, ?)',
      [e.degree, e.institution, e.year, e.cgpa, e.description]
    );
  }

  // Seed achievements
  const defaultAchievements = [
    { title: "Hackathon Participation", description: "Participated in National Cyber Security Hackathon, building a real-time threat detection system.", icon: "FaCode" },
    { title: "CTF Challenges", description: "Consistently ranked in the top 10% in various Capture The Flag (CTF) challenges on HackTheBox and TryHackMe.", icon: "FaLock" },
    { title: "Security Research", description: "Discovered and reported mild vulnerabilities in open-source projects, contributing to responsible disclosure programs.", icon: "FaSearch" },
    { title: "Technical Workshops", description: "Conducted workshops on basic networking and ethical hacking for junior college students.", icon: "FaNetworkWired" }
  ];

  for (const a of defaultAchievements) {
    await connection.run(
      'INSERT INTO achievements (title, description, icon) VALUES (?, ?, ?)',
      [a.title, a.description, a.icon]
    );
  }

  console.log('Database seeded successfully!');
}

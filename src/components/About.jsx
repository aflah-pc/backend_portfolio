import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/Screenshot 2026-06-08 230721.png';

const About = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">About Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center glass-card p-8 md:p-12">
          {/* Image Placeholder */}
          <div className="relative group mx-auto md:mx-0 max-w-sm w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-[4/5] bg-dark-bg rounded-2xl overflow-hidden border border-dark-border flex items-center justify-center">
              <img 
                src={profileImg} 
                alt={personalInfo.name} 
                className="w-full h-full transition-transform duration-500 hover:scale-105" 
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Bio */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              Securing the Future, One System at a Time.
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              I am a dedicated <span className="text-brand-cyan">Cyber Security student</span> with a profound passion for Ethical Hacking, Network Security, and Digital Forensics. 
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              {personalInfo.mission}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dark-border/50">
              <div>
                <p className="text-brand-purple font-bold">Location</p>
                <p className="text-gray-300">{personalInfo.location}</p>
              </div>
              <div>
                <p className="text-brand-purple font-bold">Email</p>
                <p className="text-gray-300">{personalInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

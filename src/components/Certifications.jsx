import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { certificationsData } from '../data/portfolioData';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">Licenses & Certifications</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <motion.div 
              key={cert.id}
              className="glass-card p-6 flex flex-col justify-between group hover:border-brand-purple/50 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div>
                <div className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  <FaAward className="text-2xl text-brand-purple" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {cert.issuer}
                </p>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-500 font-medium bg-dark-bg px-2 py-1 rounded">
                    {cert.date}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    cert.status === 'Completed' ? 'text-green-400 bg-green-400/10' :
                    cert.status === 'In Progress' ? 'text-blue-400 bg-blue-400/10' :
                    'text-yellow-400 bg-yellow-400/10'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 text-sm text-brand-cyan border border-brand-cyan/30 rounded-lg hover:bg-brand-cyan hover:text-white transition-all duration-300"
                >
                  <FaExternalLinkAlt size={12} /> View Credential
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;

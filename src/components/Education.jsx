import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { educationData } from '../data/portfolioData';

const Education = () => {
  return (
    <section id="education" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">Academic Journey</span>
        </h2>

        <div className="max-w-3xl mx-auto relative border-l-2 border-brand-blue/30 pl-8 ml-4 md:ml-auto">
          {educationData.map((edu, index) => (
            <motion.div 
              key={edu.id}
              className="mb-12 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-dark-bg border-4 border-brand-cyan rounded-full z-10"></div>
              
              <div className="glass-card p-6 md:p-8 hover:border-brand-cyan/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <FaGraduationCap className="text-brand-cyan" />
                    {edu.degree}
                  </h3>
                  <span className="text-brand-purple font-semibold mt-2 md:mt-0 bg-brand-purple/10 px-3 py-1 rounded-full text-sm inline-block w-max">
                    {edu.year}
                  </span>
                </div>
                
                <h4 className="text-lg text-gray-300 font-medium mb-2">
                  {edu.institution}
                </h4>
                
                <p className="text-brand-blue font-medium mb-4 text-sm">
                  {edu.cgpa}
                </p>
                
                <p className="text-gray-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;

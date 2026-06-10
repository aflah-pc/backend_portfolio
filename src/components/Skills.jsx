import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">Technical Arsenal</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <motion.div 
              key={index}
              className="glass-card p-8 group hover:border-brand-blue/50 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-dark-bg rounded-lg text-2xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.category}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        {skill.icon && <span className="text-brand-cyan">{skill.icon}</span>}
                        {skill.name}
                      </span>
                      <span className="text-brand-purple font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2.5 border border-dark-border/50">
                      <motion.div 
                        className="bg-gradient-to-r from-brand-blue to-brand-cyan h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: sIndex * 0.1 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

const Achievements = () => {
  const { achievementsData } = usePortfolioData();
  return (
    <section id="achievements" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">Achievements & Activities</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {achievementsData.map((item, index) => (
            <motion.div 
              key={item.id}
              className="glass-card p-6 flex gap-6 items-start group hover:bg-dark-card/80 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 10 }}
            >
              <div className="p-4 bg-brand-blue/10 rounded-xl text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;

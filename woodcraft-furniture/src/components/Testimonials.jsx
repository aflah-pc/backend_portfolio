"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonialsList = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    rating: 5,
    quote: "The Nordic Oak Dining Table is an absolute masterpiece. The natural wood grain is gorgeous, and the table is incredibly sturdy. You can feel the quality of the premium timber instantly.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "David Miller",
    role: "Architect",
    rating: 5,
    quote: "The delivery crew carried our Chesterfield sofa up three flights of stairs and assembled it with perfect care. The velvet fabric feels luxurious, and the support is supportive yet comfortable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Designer",
    rating: 5,
    quote: "WoodCraft custom modified the Japanese Credenza to fit my media components perfectly. Their customer support team guided me through drawing approvals and cabinet layouts. Simply superb!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-brand-cream/35 dark:bg-brand-walnut-dark/15 relative overflow-hidden">
      {/* Background wood logs/lines decor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-accent/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-accent/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
            Client Words
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Card Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col justify-between border border-brand-accent/15 hover:shadow-xl hover:shadow-brand-accent/5 hover:-translate-y-1.5 transition-all group"
            >
              
              {/* Quote Symbol and Review */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  {/* Stars */}
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <Quote size={28} className="text-brand-accent/20 group-hover:text-brand-accent/40 transition-colors" />
                </div>
                
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed mb-6 font-light">
                  "{t.quote}"
                </p>
              </div>

              {/* User Avatar Info */}
              <div className="flex items-center gap-4 border-t border-brand-accent/15 pt-6 mt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-accent/30 shadow-md">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-brand-walnut dark:text-white">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-brand-accent uppercase tracking-wider font-semibold">
                    {t.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

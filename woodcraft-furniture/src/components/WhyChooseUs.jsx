"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Truck, RotateCcw, ShieldCheck, Headphones, Settings 
} from 'lucide-react';

const benefits = [
  {
    icon: <Award className="w-8 h-8 text-brand-accent" />,
    title: "Premium Quality",
    desc: "Every item is crafted from selected solid hardwoods like walnut, oak, and cherry wood, dried to perfection and finished by hand."
  },
  {
    icon: <Truck className="w-8 h-8 text-brand-accent" />,
    title: "Free Delivery",
    desc: "Enjoy free premium white-glove shipping on orders over $1500. We will set up your new furniture in the room of your choice."
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-brand-accent" />,
    title: "Easy Returns",
    desc: "We stand behind our craftsmanship. If you are not fully satisfied, return your furniture within 30 days for a hassle-free refund."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />,
    title: "Secure Payments",
    desc: "Your transaction details are fully encrypted. We support major cards, wire transfers, and flexible interest-free financing."
  },
  {
    icon: <Headphones className="w-8 h-8 text-brand-accent" />,
    title: "24/7 Support",
    desc: "Our interior consultants and service team are always available to help answer product, delivery, or configuration questions."
  },
  {
    icon: <Settings className="w-8 h-8 text-brand-accent" />,
    title: "Custom Furniture Options",
    desc: "Need custom dimensions, wood finishes, or premium upholstery? Work directly with our design consultants to create your bespoke piece."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white dark:bg-brand-walnut-dark relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
            Our Commitment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
            Why Choose WoodCraft?
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, index) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 hover:shadow-xl hover:shadow-brand-accent/5 border border-brand-accent/15 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-brand-cream/80 dark:bg-brand-walnut-dark/80 flex items-center justify-center mb-6 shadow-md border border-brand-accent/10 group-hover:scale-110 transition-transform duration-300">
                {b.icon}
              </div>
              
              {/* Text info */}
              <h3 className="text-xl font-serif font-bold text-brand-walnut dark:text-white mb-3 group-hover:text-brand-accent transition-colors">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;

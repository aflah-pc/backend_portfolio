"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative h-[calc(100vh-80px)] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-walnut-dark/80 via-brand-walnut-dark/40 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="max-w-2xl text-white">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/40 bg-brand-walnut-dark/60 text-brand-beige text-xs tracking-widest uppercase mb-6 font-semibold backdrop-blur-md">
              Handcrafted Woodwork & Furnishings
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight mb-6"
          >
            Transform Your Home with <span className="gradient-gold-text">Timeless Furniture</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-brand-beige-light/90 mb-10 leading-relaxed font-light"
          >
            Discover premium sofas, dining sets, beds, office furniture, and home décor crafted for modern living. Tailored walnut & oak finishes built for comfort.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="shop" 
              smooth={true} 
              duration={500} 
              offset={-80}
              className="cursor-pointer bg-brand-accent hover:bg-brand-accent/90 text-brand-walnut-dark font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-accent/30 transition-all hover:-translate-y-0.5"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            
            <Link 
              to="categories" 
              smooth={true} 
              duration={500} 
              offset={-80}
              className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <Link to="categories" smooth={true} duration={500} offset={-80} className="cursor-pointer flex flex-col items-center">
          <span className="text-brand-beige-light/75 text-[10px] tracking-[0.35em] uppercase mb-2">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full border border-brand-accent/30 flex items-center justify-center bg-brand-walnut-dark/30 backdrop-blur-md text-brand-accent"
          >
            <ChevronDown size={18} />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

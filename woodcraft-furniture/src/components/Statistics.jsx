"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statsData = [
  {
    target: 10000,
    prefix: "",
    suffix: "+",
    label: "Happy Customers"
  },
  {
    target: 500,
    prefix: "",
    suffix: "+",
    label: "Furniture Designs"
  },
  {
    target: 15,
    prefix: "",
    suffix: " Years",
    label: "Experience"
  },
  {
    target: 50,
    prefix: "",
    suffix: "+",
    label: "Cities Served"
  }
];

// Single counter logic
const Counter = ({ target, prefix, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const duration = 2000; // ms
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        const nextValue = Math.floor(easeProgress * end);
        
        setCount(nextValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center p-6 glass-card border border-brand-accent/10">
      <h3 className="text-4xl sm:text-5xl font-serif font-black tracking-tight gradient-gold-text mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </h3>
      <p className="text-xs sm:text-sm font-mono text-brand-walnut-light dark:text-brand-beige uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};

const Statistics = () => {
  return (
    <section className="py-20 bg-white dark:bg-brand-walnut-dark relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-brand-accent/5 hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-brand-accent/5 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, i) => (
            <Counter 
              key={i} 
              target={stat.target} 
              prefix={stat.prefix} 
              suffix={stat.suffix} 
              label={stat.label} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

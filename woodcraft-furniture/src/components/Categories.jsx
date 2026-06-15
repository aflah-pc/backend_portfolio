"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowUpRight } from 'lucide-react';

const categoriesList = [
  {
    name: "Sofas",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Luxury lounge seating and tufted sectionals"
  },
  {
    name: "Beds",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Premium solid wood frames & master suite beds"
  },
  {
    name: "Dining Sets",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Handcrafted oak tables and dining chairs"
  },
  {
    name: "Office Furniture",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Executive desks, credentials, & study chairs"
  },
  {
    name: "Chairs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Premium accent chairs and ergonomic loungers"
  },
  {
    name: "Storage",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Zen credenzas, sideboards, & bookshelves"
  },
  {
    name: "Outdoor Furniture",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    desc: "Plantation teak loungers and weather-proof sets"
  }
];

const Categories = () => {
  const { setFilters } = useApp();

  const handleCategorySelect = (categoryName) => {
    setFilters(prev => ({ ...prev, category: categoryName }));
  };

  return (
    <section id="categories" className="py-24 bg-white/20 dark:bg-brand-walnut-dark/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
            Handcrafted Collections
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Masonry-styled Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesList.map((cat, index) => {
            // Give specific cards a larger span for an organic masonry feel
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative group overflow-hidden rounded-2xl h-80 ${isLarge ? 'md:col-span-2 sm:h-96 lg:col-span-1' : 'h-80'} cursor-pointer shadow-lg hover:shadow-2xl transition-all`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                
                {/* Glass/Color overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-walnut-dark/95 via-brand-walnut-dark/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                  <span className="text-xs text-brand-accent tracking-wider uppercase font-semibold mb-1">
                    WoodCraft Collection
                  </span>
                  <h3 className="text-2xl font-serif font-bold mb-2 text-brand-beige-light group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-brand-beige/85 mb-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
                    {cat.desc}
                  </p>
                  
                  <Link
                    to="shop"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => handleCategorySelect(cat.name)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white transition-colors mt-2"
                  >
                    Explore Collection <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Categories;

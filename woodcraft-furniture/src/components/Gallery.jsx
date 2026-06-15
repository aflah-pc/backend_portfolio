"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    tag: "Living Room",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Walnut Chesterfield Styling",
    colSpan: "lg:col-span-2"
  },
  {
    id: 2,
    tag: "Bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Rustic Oak Slat Headboard",
    colSpan: ""
  },
  {
    id: 3,
    tag: "Dining Area",
    image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Minimalist Oak Dining Setting",
    colSpan: ""
  },
  {
    id: 4,
    tag: "Office Space",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Double Pedestal Oak Suite",
    colSpan: "lg:col-span-2"
  },
  {
    id: 5,
    tag: "Living Room",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Sunlit Loft Credenza",
    colSpan: ""
  },
  {
    id: 6,
    tag: "Bedroom",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Mid-Century Nightstands",
    colSpan: ""
  },
  {
    id: 7,
    tag: "Office Space",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Oak Floating Study Alcove",
    colSpan: "lg:col-span-2"
  }
];

const Gallery = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const tags = ["All", "Living Room", "Bedroom", "Dining Area", "Office Space"];

  const filteredItems = activeTag === "All"
    ? galleryItems
    : galleryItems.filter(item => item.tag === activeTag);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => prev === filteredItems.length - 1 ? 0 : prev + 1);
  };

  return (
    <section className="py-24 bg-white dark:bg-brand-walnut-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
            Creative Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
            Interior Inspiration
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 max-w-md mx-auto">
            Browse styled spaces showcasing our handcrafted premium collections in real-world settings.
          </p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold border ${
                activeTag === tag 
                  ? 'bg-brand-walnut dark:bg-brand-accent border-transparent text-white dark:text-brand-walnut-dark shadow-md' 
                  : 'border-brand-accent/20 hover:border-brand-accent text-brand-walnut dark:text-brand-beige-light bg-transparent'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(index)}
                className={`relative group overflow-hidden rounded-2xl h-80 ${item.colSpan} cursor-zoom-in shadow-md hover:shadow-xl transition-shadow`}
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-walnut-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] text-brand-accent font-semibold uppercase tracking-wider mb-1">{item.tag}</span>
                  <h4 className="text-lg font-serif font-bold flex items-center justify-between">
                    {item.title}
                    <ZoomIn size={18} className="text-brand-accent" />
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Backdrop Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
              aria-label="Close Lightbox"
            >
              <X size={28} />
            </button>

            {/* Slider Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors z-20"
              aria-label="Previous Lightbox Image"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors z-20"
              aria-label="Next Lightbox Image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image viewport container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center select-none"
            >
              <img 
                src={filteredItems[lightboxIndex].image} 
                alt={filteredItems[lightboxIndex].title} 
                className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl border border-white/10" 
              />
              <div className="text-center mt-4 text-white">
                <span className="text-[10px] text-brand-accent uppercase font-bold tracking-widest">{filteredItems[lightboxIndex].tag}</span>
                <h4 className="text-lg font-serif font-semibold mt-1">{filteredItems[lightboxIndex].title}</h4>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

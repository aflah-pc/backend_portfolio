"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const BestSellers = () => {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct, products } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter products for trending/best sellers
  const bestSellers = products.filter(p => 
    p.badge === "Best Seller" || p.badge === "Trending" || p.badge === "Exclusive"
  );

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === bestSellers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? bestSellers.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-24 bg-brand-cream/10 dark:bg-brand-walnut-dark/25 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center sm:text-left">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
              Most Coveted Pieces
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
              Our Best Sellers
            </h2>
            <div className="w-24 h-1 bg-brand-accent mt-4 rounded-full mx-auto sm:mx-0" />
          </div>

          {/* Nav Controls */}
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-brand-accent/30 flex items-center justify-center bg-white dark:bg-brand-walnut-dark text-brand-walnut dark:text-brand-beige hover:bg-brand-accent hover:text-brand-walnut-dark transition-all shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-brand-accent/30 flex items-center justify-center bg-white dark:bg-brand-walnut-dark text-brand-walnut dark:text-brand-beige hover:bg-brand-accent hover:text-brand-walnut-dark transition-all shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / bestSellers.length)}%)`,
                width: `${bestSellers.length * 100}%`
              }}
            >
              {bestSellers.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                
                return (
                  <div 
                    key={product.id}
                    style={{ width: `${100 / bestSellers.length}%` }}
                    className="flex-shrink-0 px-2 max-w-[400px]"
                  >
                    <div className="glass-card overflow-hidden group flex flex-col h-full border border-brand-accent/15 hover:shadow-xl hover:shadow-brand-accent/5 hover:-translate-y-1.5 transition-all">
                      
                      {/* Image Frame */}
                      <div className="relative h-64 overflow-hidden bg-brand-cream/40 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Status badge */}
                        <span className="absolute top-4 left-4 bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md z-10">
                          {product.badge || "Best Seller"}
                        </span>

                        {/* Wishlist toggle */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-4 right-4 bg-white/70 dark:bg-brand-walnut-dark/70 hover:bg-white dark:hover:bg-brand-walnut-dark text-brand-walnut dark:text-white hover:text-brand-accent p-2 rounded-full backdrop-blur-md shadow-md z-10"
                        >
                          <Heart size={16} className={isWishlisted ? "fill-brand-accent text-brand-accent" : ""} />
                        </button>

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-brand-walnut-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="bg-white hover:bg-brand-accent text-brand-walnut-dark hover:text-white p-3.5 rounded-full shadow-lg transition-colors hover:scale-110"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-white hover:bg-brand-accent text-brand-walnut-dark hover:text-white p-3.5 rounded-full shadow-lg transition-colors hover:scale-110"
                          >
                            <ShoppingBag size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Info Details */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-brand-accent tracking-widest uppercase font-semibold block mb-1">
                            {product.category}
                          </span>
                          <h3 className="text-base font-serif font-bold text-brand-walnut dark:text-white group-hover:text-brand-accent transition-colors line-clamp-1 mb-2">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < Math.floor(product.rating) ? "fill-current" : "opacity-30"} 
                                />
                              ))}
                            </div>
                            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                              ({product.rating})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-brand-accent/10 mt-auto">
                          <span className="text-lg font-bold text-brand-walnut dark:text-brand-beige">
                            ${product.price}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="text-xs font-bold bg-brand-walnut hover:bg-brand-accent text-white hover:text-brand-walnut-dark px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag size={14} /> Add
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BestSellers;

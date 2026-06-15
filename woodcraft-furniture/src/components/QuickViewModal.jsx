"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShoppingBag, Heart, Star, Plus, Minus, Ruler, ShieldCheck, Truck 
} from 'lucide-react';

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity to 1 when product changes
  useEffect(() => {
    setQuantity(1);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-brand-cream dark:bg-brand-walnut-dark rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none border border-brand-accent/20"
        >
          
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 bg-white/70 dark:bg-brand-walnut-dark/70 hover:bg-white dark:hover:bg-brand-walnut-dark text-brand-walnut dark:text-white p-2 rounded-full backdrop-blur-md shadow-md z-20"
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>

          {/* Left: Image Showcase */}
          <div className="w-full md:w-1/2 h-64 md:h-[520px] bg-brand-cream/40 overflow-hidden relative">
            <img 
              src={quickViewProduct.image} 
              alt={quickViewProduct.name} 
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md z-10">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Right: Detailed Specification Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[520px]">
            
            {/* Upper Details */}
            <div>
              <span className="text-[10px] text-brand-accent tracking-widest uppercase font-semibold block mb-1">
                {quickViewProduct.category}
              </span>
              <h2 className="text-2xl font-serif font-black text-brand-walnut dark:text-white mb-2 leading-tight">
                {quickViewProduct.name}
              </h2>
              
              {/* Rating & Price Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(quickViewProduct.rating) ? "fill-current" : "opacity-30"} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    ({quickViewProduct.rating})
                  </span>
                </div>
                <span className="text-xl font-bold text-brand-walnut dark:text-brand-beige">
                  ${quickViewProduct.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specs & Dimensions */}
              <div className="space-y-3 mb-6 bg-white/30 dark:bg-white/5 p-4 rounded-xl border border-brand-accent/10">
                <div className="flex items-center text-xs text-brand-walnut dark:text-brand-beige">
                  <Ruler size={14} className="mr-2 text-brand-accent" />
                  <span className="font-semibold mr-1.5">Dimensions:</span> {quickViewProduct.dimensions}
                </div>
                <div className="flex items-center text-xs text-brand-walnut dark:text-brand-beige">
                  <ShieldCheck size={14} className="mr-2 text-brand-accent" />
                  <span className="font-semibold mr-1.5">Warranty:</span> 10 Years Structural Guarantee
                </div>
                <div className="flex items-center text-xs text-brand-walnut dark:text-brand-beige">
                  <Truck size={14} className="mr-2 text-brand-accent" />
                  <span className="font-semibold mr-1.5">Delivery:</span> White Glove Room of Choice Setup
                </div>
              </div>
            </div>

            {/* Lower Interactions */}
            <div className="border-t border-brand-accent/10 pt-6 mt-auto">
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Quantity adjustments */}
                <div className="flex items-center space-x-3 border border-brand-accent/20 rounded-xl bg-white dark:bg-brand-walnut-dark px-3 py-2">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="text-brand-walnut dark:text-brand-beige p-1 hover:text-brand-accent"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="text-brand-walnut dark:text-brand-beige p-1 hover:text-brand-accent"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-grow bg-brand-walnut dark:bg-brand-accent hover:opacity-90 text-white dark:text-brand-walnut-dark font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="bg-white/70 dark:bg-brand-walnut-dark/70 hover:bg-white dark:hover:bg-brand-walnut-dark text-brand-walnut dark:text-white hover:text-brand-accent p-3 rounded-xl shadow-md border border-brand-accent/10"
                  aria-label="Wishlist Toggle"
                >
                  <Heart size={18} className={isWishlisted ? "fill-brand-accent text-brand-accent" : ""} />
                </button>

              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;

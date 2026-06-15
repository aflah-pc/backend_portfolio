"use client";

import React from 'react';
import { useApp, productsData } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Eye, Star, SlidersHorizontal, RotateCcw, ChevronDown 
} from 'lucide-react';

const Products = () => {
  const { 
    searchQuery, setSearchQuery, filters, setFilters, resetFilters,
    addToCart, wishlist, toggleWishlist, setQuickViewProduct 
  } = useApp();

  const categories = ["All", "Sofas", "Beds", "Dining Sets", "Office Furniture", "Chairs", "Storage", "Outdoor Furniture"];

  // Filter and sort products
  const filteredProducts = productsData.filter(product => {
    // 1. Category Filter
    const matchesCategory = filters.category === "All" || product.category === filters.category;
    
    // 2. Price Filter
    const matchesPrice = product.price <= filters.maxPrice;
    
    // 3. Search Query Filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    // Sorting logic
    if (filters.sortBy === "price-asc") return a.price - b.price;
    if (filters.sortBy === "price-desc") return b.price - a.price;
    if (filters.sortBy === "rating") return b.rating - a.rating;
    return a.id - b.id; // Default / Featured
  });

  return (
    <section id="shop" className="py-24 bg-brand-cream/35 dark:bg-brand-walnut-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
            Premium Showroom
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
            Explore Our Collection
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Controls Panel */}
        <div className="glass-card p-6 mb-12 border border-brand-accent/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                    filters.category === cat 
                      ? 'bg-brand-walnut dark:bg-brand-accent border-transparent text-white dark:text-brand-walnut-dark shadow-md' 
                      : 'border-brand-accent/20 hover:border-brand-accent text-brand-walnut dark:text-brand-beige-light bg-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right: Price & Sort Control */}
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Price Range Slider */}
              <div className="flex-grow sm:flex-grow-0 min-w-[200px]">
                <div className="flex justify-between text-xs font-semibold text-brand-walnut dark:text-brand-beige mb-2">
                  <span>Max Price:</span>
                  <span className="text-brand-accent">${filters.maxPrice}</span>
                </div>
                <input 
                  type="range"
                  min="300"
                  max="2000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                  className="w-full h-1 bg-brand-beige rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="appearance-none bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/20 hover:border-brand-accent text-brand-walnut dark:text-brand-beige-light pl-4 pr-10 py-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Sort by: Rating</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-brand-accent pointer-events-none" />
              </div>

              {/* Reset Filters Toggle */}
              {(filters.category !== "All" || filters.maxPrice < 2000 || filters.sortBy !== "featured" || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-semibold transition-colors"
                >
                  <RotateCcw size={14} /> Clear
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <RotateCcw size={48} className="text-brand-accent mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-serif font-bold text-brand-walnut dark:text-brand-beige">No products match your filters.</h3>
              <p className="text-sm text-gray-500 mt-2">Try searching for another keyword or clearing filters.</p>
              <button 
                onClick={resetFilters} 
                className="mt-6 bg-brand-accent text-brand-walnut-dark font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card overflow-hidden group flex flex-col h-full hover:shadow-xl hover:shadow-brand-accent/5 hover:-translate-y-1.5 transition-all"
                  >
                    {/* Image Container with Badges */}
                    <div className="relative h-64 overflow-hidden bg-brand-cream/40 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Product Status Badges */}
                      {product.badge && (
                        <span className="absolute top-4 left-4 bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md z-10">
                          {product.badge}
                        </span>
                      )}

                      {/* Wishlist Toggle Overlay */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 bg-white/70 dark:bg-brand-walnut-dark/70 hover:bg-white dark:hover:bg-brand-walnut-dark text-brand-walnut dark:text-white hover:text-brand-accent p-2 rounded-full backdrop-blur-md shadow-md z-10"
                        aria-label="Wishlist Toggle"
                      >
                        <Heart size={16} className={isWishlisted ? "fill-brand-accent text-brand-accent" : ""} />
                      </button>

                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-brand-walnut-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="bg-white hover:bg-brand-accent text-brand-walnut-dark hover:text-white p-3.5 rounded-full shadow-lg transition-colors hover:scale-110"
                          title="Quick View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-white hover:bg-brand-accent text-brand-walnut-dark hover:text-white p-3.5 rounded-full shadow-lg transition-colors hover:scale-110"
                          title="Add to Cart"
                        >
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Product Card Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-brand-accent tracking-widest uppercase font-semibold block mb-1">
                          {product.category}
                        </span>
                        <h3 className="text-base font-serif font-bold text-brand-walnut dark:text-white group-hover:text-brand-accent transition-colors line-clamp-1 mb-2">
                          {product.name}
                        </h3>
                        
                        {/* Star Rating */}
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

                      {/* Price & Cart button row */}
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

                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Products;

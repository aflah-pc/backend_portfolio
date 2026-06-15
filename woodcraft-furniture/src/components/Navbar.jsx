"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, Sun, Moon, Menu, X, Plus, Minus, Trash2, ArrowRight, Settings 
} from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const { 
    darkMode, toggleTheme, searchQuery, setSearchQuery, 
    cart, removeFromCart, updateCartQuantity, 
    wishlist, toggleWishlist, addToCart,
    products, submitOrder, setIsAdminOpen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Products lookup helper to get details for wishlist items



  const navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'Shop', target: 'shop' },
    { name: 'Categories', target: 'categories' },
    { name: 'Testimonials', target: 'testimonials' },
    { name: 'Contact', target: 'contact' }
  ];

  // Calculate cart counts and totals
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = cartSubtotal > 1000 ? 0 : 99;
  const estimatedTax = Math.round(cartSubtotal * 0.08);
  const totalBalance = cartSubtotal + shippingFee + estimatedTax;

  // Resolve products currently in wishlist
  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  return (
    <>
      <header className="sticky top-0 w-full z-40 glass-nav transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="home" smooth={true} duration={500} className="cursor-pointer">
              <h1 className="text-sm sm:text-base md:text-lg font-serif font-black tracking-wide text-brand-walnut dark:text-brand-beige uppercase">
                PC RUBCO & <span className="text-brand-accent">INTERIOR WORKS</span>
              </h1>
              <p className="text-[9px] tracking-[0.15em] uppercase text-brand-accent dark:text-brand-beige-light">PREMIUM DESIGN SHOWROOM</p>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.target}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-brand-accent font-semibold"
                offset={-80}
                className="text-brand-walnut hover:text-brand-accent dark:text-brand-beige-light dark:hover:text-brand-accent cursor-pointer font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Controls */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Search Input Toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchVisible && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mr-2 px-3 py-1.5 text-xs rounded-full bg-brand-cream/60 dark:bg-brand-walnut-dark/80 border border-brand-accent/30 text-brand-walnut dark:text-white focus:outline-none focus:border-brand-accent"
                  />
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent dark:hover:text-brand-accent p-1"
                aria-label="Search Toggle"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme} 
              className="text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent dark:hover:text-brand-accent p-1"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent dark:hover:text-brand-accent p-1"
              aria-label="Open Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent dark:hover:text-brand-accent p-1"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-walnut dark:bg-brand-accent text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Admin Toggle */}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent dark:hover:text-brand-accent p-1 cursor-pointer"
              title="Open Admin Dashboard"
              aria-label="Open Admin Dashboard"
            >
              <Settings size={20} />
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent"
              aria-label="Toggle Theme Mobile"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent"
              aria-label="Open Cart Mobile"
            >
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent"
              title="Open Admin Dashboard"
              aria-label="Open Admin Dashboard Mobile"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent"
              aria-label="Menu Toggle Mobile"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-nav border-t border-brand-accent/10 px-4 py-6"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.target}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-brand-walnut dark:text-brand-beige-light text-base font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Search in Mobile Menu */}
                <div className="pt-4 flex items-center border-t border-brand-accent/20">
                  <Search size={18} className="text-brand-accent mr-2" />
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-brand-walnut dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-brand-accent/20">
                  <button 
                    onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }}
                    className="flex items-center text-sm text-brand-walnut dark:text-brand-beige-light hover:text-brand-accent"
                  >
                    <Heart size={18} className="mr-2" />
                    Wishlist ({wishlist.length})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Slide-out Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ translateX: '100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-brand-cream dark:bg-brand-walnut-dark shadow-2xl z-50 p-6 flex flex-col h-screen border-l border-brand-accent/20"
            >
              <div className="flex justify-between items-center pb-4 border-b border-brand-accent/20">
                <h2 className="text-xl font-serif font-bold text-brand-walnut dark:text-brand-beige flex items-center">
                  <ShoppingBag className="mr-2 text-brand-accent" /> Shopping Cart
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-brand-walnut hover:bg-brand-accent/15 dark:text-brand-beige-light"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <ShoppingBag size={48} className="text-brand-accent/40 mb-4" />
                    <p className="text-gray-500 font-serif">Your cart is empty.</p>
                    <p className="text-xs text-gray-400 mt-2">Explore our custom catalogs to add premium items.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-3 rounded-lg bg-white/40 dark:bg-white/5 border border-brand-accent/10">
                      <div className="w-20 h-20 bg-brand-cream/80 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-serif font-bold text-brand-walnut dark:text-white line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-brand-accent font-medium mt-0.5">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          {/* Quantity selector */}
                          <div className="flex items-center space-x-2 border border-brand-accent/20 rounded-md bg-white dark:bg-brand-walnut-dark px-1.5 py-0.5">
                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-brand-walnut dark:text-brand-beige p-0.5">
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-brand-walnut dark:text-brand-beige p-0.5">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-400 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Panel */}
              {cart.length > 0 && (
                <div className="border-t border-brand-accent/20 pt-4 space-y-3 bg-brand-cream/40 dark:bg-brand-walnut-dark/40 p-4 rounded-xl">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-brand-walnut dark:text-brand-beige">${cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-brand-walnut dark:text-brand-beige">
                      {shippingFee === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-bold uppercase tracking-wider text-[10px]">Free</span>
                      ) : (
                        `$${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-brand-walnut dark:text-brand-beige">${estimatedTax}</span>
                  </div>
                  
                  <div className="border-t border-brand-accent/10 pt-3 flex justify-between items-center text-sm font-bold">
                    <span className="text-brand-walnut dark:text-brand-beige">Total Balance</span>
                    <span className="text-brand-gold dark:text-brand-accent text-xl">${totalBalance}</span>
                  </div>

                  <button 
                    onClick={async () => {
                      const name = prompt("Enter your Full Name for checkout:");
                      if (!name) return;
                      const email = prompt("Enter your Email Address:");
                      if (!email) return;
                      const address = prompt("Enter your Shipping Address:");
                      if (!address) return;

                      const orderItems = cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity
                      }));

                      const payload = {
                        customer_name: name,
                        customer_email: email,
                        address,
                        items: orderItems,
                        subtotal: cartSubtotal,
                        shipping: shippingFee,
                        tax: estimatedTax,
                        total: totalBalance
                      };

                      await submitOrder(payload);
                      alert(`Thank you for your purchase! Your order total of $${totalBalance} was saved successfully.`);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg mt-2 cursor-pointer"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Slide-out Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ translateX: '100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-brand-cream dark:bg-brand-walnut-dark shadow-2xl z-50 p-6 flex flex-col h-screen border-l border-brand-accent/20"
            >
              <div className="flex justify-between items-center pb-4 border-b border-brand-accent/20">
                <h2 className="text-xl font-serif font-bold text-brand-walnut dark:text-brand-beige flex items-center">
                  <Heart className="mr-2 text-brand-accent fill-brand-accent" /> Wishlist
                </h2>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1 rounded-full text-brand-walnut hover:bg-brand-accent/15 dark:text-brand-beige-light"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4">
                {wishlistItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <Heart size={48} className="text-brand-accent/40 mb-4" />
                    <p className="text-gray-500 font-serif">Your wishlist is empty.</p>
                    <p className="text-xs text-gray-400 mt-2">Love something? Tap the heart icon to save it here.</p>
                  </div>
                ) : (
                  wishlistItems.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-3 rounded-lg bg-white/40 dark:bg-white/5 border border-brand-accent/10">
                      <div className="w-20 h-20 bg-brand-cream/80 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-serif font-bold text-brand-walnut dark:text-white line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-brand-accent font-medium mt-0.5">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={() => {
                              addToCart(item);
                              toggleWishlist(item.id);
                              setIsCartOpen(true);
                              setIsWishlistOpen(false);
                            }}
                            className="bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark text-xs font-bold px-3 py-1.5 rounded hover:opacity-95"
                          >
                            Add to Cart
                          </button>
                          <button 
                            onClick={() => toggleWishlist(item.id)}
                            className="text-red-500 hover:text-red-400 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

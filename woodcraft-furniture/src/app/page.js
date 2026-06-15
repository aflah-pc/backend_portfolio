"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Import Visual Components
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import WhyChooseUs from '@/components/WhyChooseUs';
import BestSellers from '@/components/BestSellers';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Statistics from '@/components/Statistics';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import QuickViewModal from '@/components/QuickViewModal';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 1. Handle initial luxury loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds load screen

    return () => clearTimeout(timer);
  }, []);

  // 2. Handle scroll visibility for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          /* Luxury Loading Screen */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-brand-walnut-dark z-50 flex flex-col items-center justify-center text-center select-none"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-wide text-brand-beige">
                WoodCraft<span className="text-brand-accent">.</span>
              </h1>
              <div className="w-16 h-[2px] bg-brand-accent mx-auto relative overflow-hidden">
                <motion.div 
                  animate={{ x: [-80, 80] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 top-0 bottom-0 w-8 bg-brand-beige-light"
                />
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-brand-beige/60">
                Premium Furniture Showroom
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Main Luxury Store Experience */
          <motion.div
            key="showroom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen flex flex-col"
          >
            {/* Nav Header */}
            <Navbar />

            {/* Visual Page Sections */}
            <main className="flex-grow">
              
              {/* Hero Banner */}
              <Hero />

              {/* Scroll reveal layout components */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Categories />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Products />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <WhyChooseUs />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <BestSellers />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Gallery />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Testimonials />
              </motion.div>

              <Statistics />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Contact />
              </motion.div>

            </main>

            {/* Footer */}
            <Footer />

            {/* Global Quick View Modal Overlay */}
            <QuickViewModal />

            {/* Floating Back-to-Top Button */}
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                  aria-label="Back to Top"
                >
                  <ArrowUp size={20} />
                </motion.button>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

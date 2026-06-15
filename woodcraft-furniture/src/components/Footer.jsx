"use client";

import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-walnut-dark text-brand-beige-light border-t border-brand-accent/25 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: About Brand */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-black tracking-wide text-white uppercase">
              PC RUBCO & <span className="text-brand-accent">INTERIOR WORKS</span>
            </h3>
            <p className="text-xs sm:text-sm text-brand-beige/75 leading-relaxed font-light">
              Premium handcrafted wooden furniture designed to elevate modern living. Combining generational carpentry skills with timeless architectural layouts.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-walnut-dark transition-all flex items-center justify-center" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-walnut-dark transition-all flex items-center justify-center" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-walnut-dark transition-all flex items-center justify-center" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono uppercase tracking-widest text-brand-accent font-bold">
              Showroom Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link to="home" smooth={true} duration={500} className="hover:text-brand-accent cursor-pointer transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="shop" smooth={true} duration={500} offset={-80} className="hover:text-brand-accent cursor-pointer transition-colors">Featured Shop</Link>
              </li>
              <li>
                <Link to="categories" smooth={true} duration={500} offset={-80} className="hover:text-brand-accent cursor-pointer transition-colors">Catalog Categories</Link>
              </li>
              <li>
                <Link to="testimonials" smooth={true} duration={500} offset={-80} className="hover:text-brand-accent cursor-pointer transition-colors font-medium">Customer Reviews</Link>
              </li>
              <li>
                <Link to="contact" smooth={true} duration={500} offset={-80} className="hover:text-brand-accent cursor-pointer transition-colors">Contact & Map</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support coordinates */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono uppercase tracking-widest text-brand-accent font-bold">
              Contact Coordinates
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-brand-beige/85">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-accent flex-shrink-0 mt-0.5" />
                <span>742 5th Avenue, New York, NY 10019</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-accent flex-shrink-0" />
                <span>+1 (212) 555-8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-accent flex-shrink-0" />
                <span>showroom@pcrubco.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter block */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono uppercase tracking-widest text-brand-accent font-bold">
              Newsletter Club
            </h4>
            <p className="text-xs text-brand-beige/75 leading-relaxed font-light">
              Subscribe to receive private previews, custom woodwork releases, and premium care guides.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-white/5 border border-brand-accent/30 focus:border-brand-accent rounded-xl py-3 px-4 text-xs text-white focus:outline-none pr-10"
              />
              <button 
                type="submit"
                className="absolute right-2 text-brand-accent hover:text-white p-1.5"
                aria-label="Subscribe Newsletter"
              >
                <Send size={14} />
              </button>
            </form>

            {subscribed && (
              <span className="flex items-center gap-1.5 text-xs text-brand-accent font-semibold">
                <CheckCircle2 size={12} /> Subscribed successfully!
              </span>
            )}
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-brand-accent/20 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-brand-beige/65 gap-4">
          <span>&copy; {new Date().getFullYear()} PC RUBCO AND INTERIOR WORKS. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

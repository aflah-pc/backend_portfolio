"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Contact = () => {
  const { submitInquiry } = useApp();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry(formState);
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-cream/35 dark:bg-brand-walnut-dark/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-walnut dark:text-brand-beige">
            Visit Our Showroom
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Coordinates & Map (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 border border-brand-accent/15">
              <h3 className="text-xl font-serif font-bold text-brand-walnut dark:text-white mb-6">
                PC RUBCO & INTERIOR WORKS Showroom
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-wider mb-1">Location</h4>
                    <p className="text-sm text-brand-walnut dark:text-brand-beige-light leading-relaxed">
                      742 5th Avenue, Midtown Suite 10, New York, NY 10019
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-wider mb-1">Phone</h4>
                    <p className="text-sm text-brand-walnut dark:text-brand-beige-light font-medium">
                      +1 (212) 555-8900
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-sm text-brand-walnut dark:text-brand-beige-light font-medium">
                      showroom@pcrubco.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Iframe Container */}
            <div className="h-64 rounded-2xl overflow-hidden border border-brand-accent/15 shadow-md relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.97581368459368!3d40.75895007932688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258ffb5a004eb%3A0xe21287c8ea3faec6!2s742%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="PC RUBCO Showroom Location Map"
                className="grayscale dark:invert opacity-85 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Right: Contact Form (Span 7) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10 border border-brand-accent/15">
              <h3 className="text-2xl font-serif font-bold text-brand-walnut dark:text-white mb-8">
                Consult With Our Designers
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white dark:bg-brand-walnut-dark border border-brand-accent/15 focus:border-brand-accent rounded-xl px-4 py-3 text-sm text-brand-walnut dark:text-white focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white dark:bg-brand-walnut-dark border border-brand-accent/15 focus:border-brand-accent rounded-xl px-4 py-3 text-sm text-brand-walnut dark:text-white focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark border border-brand-accent/15 focus:border-brand-accent rounded-xl px-4 py-3 text-sm text-brand-walnut dark:text-white focus:outline-none transition-colors"
                    placeholder="e.g., Custom Walnut Table Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mb-2">
                    Message Details
                  </label>
                  <textarea 
                    rows={5} required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark border border-brand-accent/15 focus:border-brand-accent rounded-xl px-4 py-3 text-sm text-brand-walnut dark:text-white focus:outline-none resize-none transition-colors"
                    placeholder="Describe your design needs, custom dimensions, or order queries..."
                  />
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-semibold text-sm"
                  >
                    <CheckCircle2 size={18} /> Inquiry submitted! Our designers will contact you shortly.
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 shadow-md transition-all disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Submit Inquiry"} <Send size={16} />
                  </button>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

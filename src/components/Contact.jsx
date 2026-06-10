import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const phoneNumber = "916282966549";
      const text = `Hello Aflah,\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Subject:* ${form.subject}\n\n*Message:*\n${form.message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
      
      setLoading(false);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setLoading(false);
      setStatus('error');
      console.error(error);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          <span className="gradient-text">Initialize Connection</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <p className="text-gray-400 mb-8">
              Whether you have a question, want to collaborate on a project, or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-4">
              <div className="glass-card p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{personalInfo.email}</p>
                </div>
              </div>
              
              <div className="glass-card p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">{personalInfo.phone}</p>
                </div>
              </div>

              <div className="glass-card p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 glass-card p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                  placeholder="Collaboration Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  rows="5"
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors resize-none"
                  placeholder="What do you want to say?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <p className="text-green-400 text-center mt-4 p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                  Message sent successfully! I will get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center mt-4 p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                  Oops! Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

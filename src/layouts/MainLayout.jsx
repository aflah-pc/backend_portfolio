import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import ScrollToTop from '../components/ScrollToTop';
import CyberBackground from '../components/CyberBackground';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      
      {/* Dynamic Background */}
      <CyberBackground />
      
      <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;

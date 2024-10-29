import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';

const ContactNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const handleHomeNavigation = () => {
    window.location.href = '/';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-lg' : 'py-4 bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Hexylon Analytics Logo" className="h-10 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#003366] to-[#FF6600] bg-clip-text text-transparent">
              Hexylon Analytics
            </span>
          </div>

          {/* Desktop Home Button */}
          <div className="hidden lg:flex items-center">
            <motion.button
              onClick={handleHomeNavigation}
              className="text-lg font-medium text-[#003366] hover:text-[#FF6600] transition-colors duration-300 relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Home
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6600]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#003366] block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-[#003366] block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#003366] block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 w-4/5 h-screen bg-white shadow-2xl lg:hidden"
          >
            <div className="p-8">
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#003366] text-white"
                >
                  <span className="sr-only">Close menu</span>
                  ×
                </button>
              </div>
              <div className="flex flex-col space-y-6">
                <motion.button
                  onClick={() => {
                    handleHomeNavigation();
                    setIsOpen(false);
                  }}
                  className="text-xl font-medium text-[#003366] hover:text-[#FF6600] transition-colors duration-300"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Home
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ContactNavbar;
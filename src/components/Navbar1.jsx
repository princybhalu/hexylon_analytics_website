import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";

const Navbar = ({ handleNavigateToContactPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const handleNavigation = (item) => {
    if (item === "Contact Us") {
      handleNavigateToContactPage();
    } else {
      window.location.href = `#${item.toLowerCase().replace(" ", "-")}`;
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-white shadow-lg" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Hexylon Analytics Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            {!scrolled ? (
              <span
                className={`text-2xl font-bold ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Hexylon Analytics
              </span>
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-[#003366] to-[#FF6600] bg-clip-text text-transparent">
                Hexylon Analytics
              </span>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {["About Us", "Our Work", "Contact Us"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`relative text-lg font-medium ${
                  index === 2
                    ? "px-6 py-2 bg-[#FF6600] text-white rounded-full hover:bg-[#FF8533] transition-colors duration-300"
                    : scrolled
                    ? "text-gray-900 hover:text-[#FF6600]"
                    : "text-white hover:text-[#FF6600]"
                }`}
                whileHover={
                  index !== 2
                    ? {
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }
                    : {}
                }
              >
                {item}
                {index !== 2 && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6600]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 ${
                scrolled ? "bg-gray-900" : "bg-white"
              } block`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-0.5 ${
                scrolled ? "bg-gray-900" : "bg-white"
              } block`}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 ${
                scrolled ? "bg-gray-900" : "bg-white"
              } block`}
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
            className="fixed top-0 right-0 w-4/5 h-screen bg-gray-900 shadow-2xl lg:hidden"
          >
            <div className="p-8">
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF6600] text-white"
                >
                  <span className="sr-only">Close menu</span>×
                </button>
              </div>
              <div className="flex flex-col space-y-6">
                {["About Us", "Our Work", "Contact Us"].map((item, i) => (
                  <motion.button
                    key={item}
                    onClick={() => handleNavigation(item)}
                    custom={i}
                    variants={linkVariants}
                    className={`text-xl font-medium ${
                      i === 2 ? "text-[#FF6600]" : "text-white"
                    } hover:text-[#FF6600] transition-colors duration-300`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

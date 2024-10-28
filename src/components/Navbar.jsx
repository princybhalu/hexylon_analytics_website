import React, { useState } from 'react';
import logo from '../assets/logo.jpg'; // Adjust the path to your logo image
import MenuIcon from '../assets/icons/MenuIcon'; // Ensure you have @heroicons/react installed
import XIcon from "../assets/icons/XIcon";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 fixed w-full z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Hexylon Analytics Logo" className="h-10 mr-2" />
          <span className="text-3xl text-navyBule font-bold Darker-Grotesque">Hexylon Analytics</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XIcon className="h-6 w-6 text-white" />
            ) : (
              <MenuIcon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Right side - Links */}
        <ul
          className={`flex-col lg:flex-row lg:flex items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#f1f1f1] lg:bg-transparent lg:p-0 transition-all duration-300 ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          <li className=''><a href="#about" className="hover:text-[#FF6600] py-4">About Us</a></li>
          <li className='p-3'><a href="/contact-us" className="hover:text-[#FF6600]">Our Work</a></li>
          <li className='p-3'>
            <a
              href="#contact"
              className="bg-[#FF6600] text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#FF6600] transition-colors duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

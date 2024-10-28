import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, description, icon, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: 45,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        delay: index * 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#003366] via-[#FF6600] to-[#003366] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
        <div className="h-full w-full bg-white rounded-xl" />
      </div>

      {/* Content Container */}
      <div className="relative">
        {/* Icon with Pulse Effect */}
        <div className="mb-6 relative">
          <div className={`absolute -inset-2 bg-blue-50 rounded-full transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
          <div className="relative animate-bounce-slow">{icon}</div>
        </div>

        {/* Title with Slide Effect */}
        <h3 className="text-xl font-bold text-[#003366] mb-4 transform transition-transform duration-500 group-hover:translate-x-2">
          {title}
        </h3>

        {/* Description with Fade Effect */}
        <p className="text-gray-600 leading-relaxed transition-opacity duration-500 group-hover:text-gray-800">
          {description}
        </p>

        {/* Animated Corner Accents */}
        {/* <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#003366] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#003366] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#003366] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#003366] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" /> */}
      </div>
    </div>
  );
};

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      title: "Customized AI",
      description: "No generic solutions. Everything is tailored to your business needs and goals, ensuring maximum impact and ROI.",
      icon: (
        <svg className="w-12 h-12 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
    {
      title: "Expert Consultancy",
      description: "Our experienced consultants guide you through the AI transformation journey, providing insights and expertise every step of the way.",
      icon: (
        <svg className="w-12 h-12 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "End-to-End Service",
      description: "From initial consultation to deployment and beyond, we're with you at every step, ensuring seamless integration and continuous support.",
      icon: (
        <svg className="w-12 h-12 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #003366 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Typing Animation */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6 relative z-10 Darker-Grotesque">
              <TypeAnimation
                sequence={[
                  'Why Choose',
                  1000,
                  'Why Choose Hexylon Analytics?',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
              <div className="h-1 w-32 bg-gradient-to-r from-[#003366] to-[#FF6600] mx-auto mt-4 rounded-full transform transition-transform duration-500 hover:scale-x-150"></div>
            </h2>
            <div className="absolute -inset-4 bg-blue-50 rounded-full opacity-20 blur-2xl animate-pulse-slow"></div>
          </div>
          <p className="mt-4 text-xl text-black max-w-3xl mx-auto opacity-0 animate-fadeIn">
            Experience the power of AI transformation with a partner that understands your unique needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
          
          {/* Enhanced Decorative Elements */}
          <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -right-64 -top-64 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
};

// Add these animations to your global CSS or tailwind.config.js
const style = {
  '.animate-fadeIn': {
    animation: 'fadeIn 1s ease-in forwards',
    animationDelay: '1s'
  },
  '.animate-pulse-slow': {
    animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  },
  '.animate-bounce-slow': {
    animation: 'bounce 3s infinite'
  },
  '.animation-delay-2000': {
    animationDelay: '2s'
  },
  '@keyframes fadeIn': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  '@keyframes blob': {
    '0%': {
      transform: 'translate(0px, 0px) scale(1)',
    },
    '33%': {
      transform: 'translate(30px, -50px) scale(1.1)',
    },
    '66%': {
      transform: 'translate(-20px, 20px) scale(0.9)',
    },
    '100%': {
      transform: 'translate(0px, 0px) scale(1)',
    },
  }
};

export default WhyChooseSection;
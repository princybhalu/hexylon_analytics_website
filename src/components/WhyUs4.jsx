import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, description, icon, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.3,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 flex items-center justify-center bg-[#003366]/5 rounded-full group-hover:scale-110 transition-transform duration-500">
            <div className="text-[#003366]">{icon}</div>
          </div>
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#003366]/20 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#003366] mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Hover line effect */}
        <div className="h-0.5 w-0 group-hover:w-1/3 bg-[#FF6600] mt-4 transition-all duration-500" />
      </div>
    </div>
  );
};

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);

  const features = [
    {
      title: "Customized AI",
      description: "Tailored AI solutions designed specifically for your business needs and goals.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
    {
      title: "Expert Consultancy",
      description: "Guidance from experienced consultants throughout your AI transformation journey.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "End-to-End Service",
      description: "Complete support from initial consultation through deployment and beyond.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Animate the headline
    tl.from(headlineRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate the description text
    tl.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");

    // Create the progress line animation
    gsap.to(".progress-line", {
      width: "100%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-white py-24 overflow-hidden" id="about-us">
      {/* Progress line */}
      <div className="fixed left-0 top-0 h-1 bg-[#003366]/10 w-full" >
        <div className="progress-line h-full w-0 bg-gradient-to-r from-[#003366] to-[#FF6600]" />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-0 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 bottom-0 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" >
        {/* Header Section */}
        <div className="text-center mb-20" >
          <h2 ref={headlineRef} className="text-4xl md:text-5xl font-bold text-[#003366] mb-6 h-[82px] md:h-[50px]">
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
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#003366] to-[#FF6600] mx-auto mb-6 rounded-full" />
          <p ref={textRef} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of AI transformation with a partner that understands your unique needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
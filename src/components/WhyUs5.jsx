import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';

gsap.registerPlugin(ScrollTrigger);

// Animated background component
const AnimatedBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const particles = [];
    const colors = ['#003366', '#FF6600'];
    const canvas = bgRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.direction = Math.PI - particle.direction;
        if (particle.y < 0 || particle.y > canvas.height) particle.direction = -particle.direction;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}10`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas 
      ref={bgRef} 
      className="absolute inset-0 w-full h-full opacity-30"
      style={{ filter: 'blur(2px)' }}
    />
  );
};

const FeatureCard = ({ title, description, icon, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 100,
        rotateY: 15,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.3,
        ease: "power4.out",
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
      className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#003366] via-[#FF6600] to-[#003366] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ padding: '2px' }}>
        <div className="h-full w-full bg-white rounded-xl" />
      </div>

      <div className="relative z-10">
        {/* Icon with floating animation */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gradient-to-br from-[#003366]/10 to-[#FF6600]/10 rounded-full group-hover:scale-110 transition-all duration-700">
            <div className="text-[#003366] animate-floating">
              {icon}
            </div>
          </div>
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border-2 border-[#003366]/20 scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
          <div className="absolute inset-0 rounded-full border-2 border-[#FF6600]/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100" />
        </div>

        {/* Title with slide effect */}
        <h3 className="text-xl font-bold text-[#003366] mb-4 transform transition-transform duration-700 group-hover:translate-x-2">
          {title}
        </h3>

        {/* Description with fade effect */}
        <p className="text-gray-600 leading-relaxed transition-all duration-700 group-hover:text-gray-800">
          {description}
        </p>

        {/* Animated underline */}
        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#003366] to-[#FF6600] mt-4 transition-all duration-700 ease-out" />
      </div>
    </div>
  );
};

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null);

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
    // Main timeline for section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Headline animation
    tl.from(headlineRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(gridRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3");

    // Progress line animation
    gsap.to(".progress-line", {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    // Floating blobs animation
    gsap.to(".floating-blob", {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-white py-24 overflow-hidden">
      {/* Animated canvas background */}
      <AnimatedBackground />
      
      {/* Progress line */}
      <div className="fixed left-0 top-0 h-1 w-full bg-[#003366]/10">
        <div className="progress-line h-full w-full bg-gradient-to-r from-[#003366] to-[#FF6600] scale-x-0" />
      </div>

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-blob absolute -right-64 -top-64 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl" />
        <div className="floating-blob absolute -left-64 -bottom-64 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 ref={headlineRef} className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
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
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

// Add these animations to your global CSS
const style = {
  '@keyframes floating': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
  '.animate-floating': {
    animation: 'floating 3s ease-in-out infinite',
  },
};

export default WhyChooseSection;
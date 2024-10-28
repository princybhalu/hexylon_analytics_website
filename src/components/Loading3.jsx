import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PatternBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-full h-full grid grid-cols-6 gap-4 p-8">
      {[...Array(48)].map((_, i) => {
        const patterns = [
          "★", "●", "♦", "♠", "♣", "♥", "⬟", "⬢"
        ];
        return (
          <div 
            key={i} 
            className="flex items-center justify-center text-[#4285f4]/10 text-4xl"
          >
            {patterns[i % patterns.length]}
          </div>
        );
      })}
    </div>
  </div>
);

const EntranceAnimation = ({setIsAnimationComplete}) => {
  
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const maskRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const radius = 60;
    const path = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 },
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.6 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.7 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      { x: window.innerWidth * 0.55, y: window.innerHeight * 0.5 },
      { x: window.innerWidth * 0.45, y: window.innerHeight * 0.35}, 
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.6, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.4, y: window.innerHeight * 0.6  },

    ];

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
              setIsAnimationComplete(true);
            }
          },
        });
      },
    });

    // Create path for the circle
    path.forEach((point, index) => {
      tl.to([circleRef.current, maskRef.current], {
        duration: 1,
        x: point.x,
        y: point.y,
        rotation: index * 180,
        ease: "power1.inOut",
      });
    });

    // Expand the revealed area
    tl.to(maskRef.current, {
      scale: 20,
      duration: 0.7,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-10 overflow-hidden">
      {/* Background with pattern */}

      {/* Hero Section as background */}
      <div className="absolute inset-0">
        <HeroSection />
      </div>

      {/* SVG Mask Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="circleMask">
            <rect width="100%" height="100%" fill="white" />
            <circle
              ref={maskRef}
              r="40"
              fill="black"
              style={{ transformOrigin: 'center' }}
            />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="white"
          mask="url(#circleMask)"
        />
      </svg>

      {/* Animated Circle */}
      <div
        ref={circleRef}
        className="absolute w-20 h-20 rounded-full bg-[#4285f4] shadow-lg"
        style={{ 
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%'
        }}
      />
    </div>
  );
};

const HeroSection = () => (
  // <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#4285f4] to-[#34a853]">
  //   <div className="text-center px-4">
  //     <h1 className="text-3xl md:text-5xl font-bold text-white">
  //       Welcome to Hexylon Analytics
  //     </h1>
  //     <p className="text-base md:text-lg text-white mt-4">
  //       Unlock the Future with Tailored AI Solutions
  //     </p>
  //   </div>
  // </section>
  <section className="hero w-full h-screen flex items-center justify-center bg-[#003366] text-white">
  <div className="text-center max-w-2xl px-4">
    <h1 className="text-5xl font-bold mb-4">Unlock the Future with Tailored AI Solutions</h1>
    <p className="text-lg">
      At <span className="font-semibold text-[#FF6600]">Hexylon Analytics</span>, we believe every business is unique, and so should be the technology that drives it. We specialize in creating AI solutions tailored specifically to your company’s <span className="font-semibold text-[#FF6600]">processes</span> and <span className="font-semibold text-[#FF6600]">workflow</span>. Our approach is simple yet effective: we understand your way of working, and we design our AI to amplify it.
    </p>
  </div>
</section>

);

const App = ({setIsAnimationComplete}) => {
  return (
    <div>
      <EntranceAnimation  setIsAnimationComplete={setIsAnimationComplete} />

    </div>
  );
};

export default App;
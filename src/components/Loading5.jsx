import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Updated color theme
const COLORS = {
  navyBlue: "#003366",
  saffron: "#FF6600",
  lightBlue: "#004d99",
  white: "#ffffff",
};

// Updated pattern background with scanning effect
const PatternBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    <div className="w-full h-full grid grid-cols-6 gap-4 p-8">
      {[...Array(48)].map((_, i) => {
        const patterns = ["⬡", "◈", "⬢", "⬣", "⬤", "◆", "◇", "◎"];
        return (
          <div 
            key={i} 
            className="flex items-center justify-center text-4xl opacity-20 transition-transform"
            style={{
              color: i % 2 === 0 ? COLORS.saffron : COLORS.white,
              animation: `scan ${3 + i * 0.1}s ease-in-out ${i * 0.1}s infinite`,
            }}
          >
            {patterns[i % patterns.length]}
          </div>
        );
      })}
    </div>
  </div>
);

const ScanningEffect = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div 
      className="absolute w-full h-2 bg-gradient-to-r from-transparent via-saffron to-transparent opacity-30"
      style={{
        animation: "scanLine 3s ease-in-out infinite",
      }}
    />
  </div>
);

const EntranceAnimation = () => {
  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 2,
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          },
        });
      },
    });

    // Scanning animation path
    tl.to(scannerRef.current, {
      top: "100%",
      duration: 2,
      ease: "power1.inOut",
      repeat: 2,
      yoyo: true,
    });

    // Mask expansion
    tl.to(maskRef.current, {
      scale: 30,
      duration: 1.5,
      ease: "power2.inOut",
    }, "-=1");

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navyBlue to-lightBlue">
        <PatternBackground />
      </div>

      <div className="absolute inset-0">
        <HeroSection />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="scannerMask">
            <rect width="100%" height="100%" fill="white" />
            <circle
              ref={maskRef}
              r="40"
              fill="black"
              style={{ transform: 'translate(50%, 50%)', transformOrigin: 'center' }}
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={COLORS.navyBlue} mask="url(#scannerMask)" />
      </svg>

      <div
        ref={scannerRef}
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-saffron to-transparent"
        style={{ 
          opacity: 0.6,
          filter: 'blur(4px)',
          boxShadow: `0 0 20px ${COLORS.saffron}`,
        }}
      />
    </div>
  );
};

const HeroSection = () => (
  <section className="w-full h-screen flex items-center justify-center bg-transparent text-white relative z-10">
    <div className="text-center px-4">
      <h1 
        className="text-4xl md:text-6xl font-bold text-white mb-6"
        style={{
          textShadow: `0 0 20px ${COLORS.saffron}`,
          animation: "pulse 2s infinite",
        }}
      >
        System Scan
      </h1>
      <p 
        className="text-lg md:text-xl text-white mt-4 opacity-90"
        style={{
          animation: "fadeIn 3s ease-out",
          textShadow: `0 0 10px ${COLORS.saffron}`,
        }}
      >
        Initializing Security Protocol...
      </p>
    </div>
  </section>
);

// Add required styles
const style = document.createElement('style');
style.textContent = `
  @keyframes scan {
    0%, 100% { opacity: 0.2; transform: translateY(0); }
    50% { opacity: 0.8; transform: translateY(-10px); }
  }
  
  @keyframes scanLine {
    0% { transform: translateY(0); }
    100% { transform: translateY(100vh); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

const App = () => {
  return (
    <div className="bg-navyBlue min-h-screen">
      <EntranceAnimation />
    </div>
  );
};

export default App;
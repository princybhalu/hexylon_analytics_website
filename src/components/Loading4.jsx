import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Circle, Star, Triangle, Square } from "lucide-react";

const COLORS = {
  primary: "#4285f4",
  secondary: "#34a853",
  accent: "#fbbc05",
  highlight: "#ea4335",
};

const PatternBackground = () => {
  const patternRef = useRef(null);

  useEffect(() => {
    const elements = patternRef.current.children;
    gsap.to(elements, {
      rotation: "random(-360, 360)",
      scale: "random(0.8, 1.2)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        grid: "auto",
        from: "random",
      },
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        ref={patternRef}
        className="w-full h-full grid grid-cols-8 md:grid-cols-12 gap-4 p-8"
      >
        {[...Array(96)].map((_, i) => {
          const icons = [
            <Circle key={1} size={24} />,
            <Star key={2} size={24} />,
            <Triangle key={3} size={24} />,
            <Square key={4} size={24} />,
          ];
          return (
            <div
              key={i}
              className="flex items-center justify-center text-[#4285f4]/10 transform transition-transform"
            >
              {icons[i % icons.length]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FloatingShapes = () => {
  const shapesRef = useRef(null);

  useEffect(() => {
    const shapes = shapesRef.current.children;
    gsap.to(shapes, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1.5,
        from: "random",
      },
    });
  }, []);

  return (
    <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.1,
          }}
        >
          {i % 2 === 0 ? (
            <Star size={24} className="text-white" />
          ) : (
            <Circle size={24} className="text-white" />
          )}
        </div>
      ))}
    </div>
  );
};

const EntranceAnimation = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const maskRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          },
        });
      },
    });

    // Create a more dynamic path
    const path = [
      { x: "20%", y: "30%", rotation: 180, scale: 1.2 },
      { x: "80%", y: "40%", rotation: 360, scale: 0.8 },
      { x: "30%", y: "70%", rotation: 540, scale: 1.4 },
      { x: "70%", y: "60%", rotation: 720, scale: 1 },
      { x: "50%", y: "50%", rotation: 900, scale: 1.2 },
    ];

    console.log(path)

    // Animate circle and mask along the path
    path.forEach((point, index) => {
      tl.to(
        [circleRef.current, maskRef.current, glowRef.current],
        {
          duration: 1.2,
          x: point.x,
          y: point.y,
          rotation: point.rotation,
          scale: point.scale,
          ease: "power2.inOut",
          onUpdate: () => {
            // Update glow effect position
            if (glowRef.current) {
              const circleBox = circleRef.current.getBoundingClientRect();
              gsap.set(glowRef.current, {
                x: circleBox.x + circleBox.width / 2,
                y: circleBox.y + circleBox.height / 2,
              });
            }
          },
        },
        index * 0.2
      );
    });

    // Final reveal
    tl.to(maskRef.current, {
      scale: 25,
      duration: 1.2,
      ease: "power3.inOut",
    }).to(
      glowRef.current,
      {
        scale: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      },
      "-=1"
    );

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-10 overflow-hidden">
      {/* Background with animated pattern */}
      <div className="absolute inset-0 bg-white">
        <PatternBackground />
      </div>

      {/* Hero Section as background */}
      <div className="absolute inset-0">
        <HeroSection />
        <FloatingShapes />
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
              style={{ transformOrigin: "center" }}
            />
          </mask>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="white" mask="url(#circleMask)" />
      </svg>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated Circle */}
      <div
        ref={circleRef}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#4285f4] to-[#34a853] shadow-lg"
        style={{
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
          filter: "drop-shadow(0 0 10px rgba(66, 133, 244, 0.3))",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#4285f4] to-[#34a853]">
    <div className="text-center px-4 relative z-0">
      <div className="absolute inset-0 bg-black/10 blur-3xl -z-10" />
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
        Welcome to Hexylon Analytics
      </h1>
      <p className="text-xl md:text-2xl text-white/90 mt-6 drop-shadow">
        Unlock the Future with Tailored AI Solutions
      </p>
    </div>
  </section>
);

const App = () => {
  return (
    <div>
      <EntranceAnimation />
    </div>
  );
};

export default App;
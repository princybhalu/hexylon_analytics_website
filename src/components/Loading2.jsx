import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const colors = {
  navyBlue: '#003366',
  saffron: '#FF6600'
};

const EntranceAnimation = () => {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const trailsRef = useRef([]);
  const [trails, setTrails] = useState([]);

  const generateRandomPath = () => {
    const paths = [];
    let currentX = 0;
    let currentY = window.innerHeight / 2;
    const steps = 5;
    
    for (let i = 0; i < steps; i++) {
      const randomY = Math.random() * (window.innerHeight * 0.6) - (window.innerHeight * 0.3);
      const nextX = (window.innerWidth / steps) * (i + 1);
      paths.push({ x: nextX, y: randomY });
    }
    return paths;
  };

  useEffect(() => {
    const paths = generateRandomPath();
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          },
        });
      },
    });

    // Create trail segments
    paths.forEach((path, index) => {
      const newTrail = {
        id: index,
        startX: index === 0 ? 0 : paths[index - 1].x,
        startY: index === 0 ? window.innerHeight / 2 : paths[index - 1].y,
        endX: path.x,
        endY: path.y,
        color: index % 2 === 0 ? colors.navyBlue : colors.saffron
      };
      setTrails(prev => [...prev, newTrail]);

      // Animate circle along the path
      tl.to(circleRef.current, {
        duration: 2,
        x: path.x,
        y: path.y,
        backgroundColor: index % 2 === 0 ? colors.navyBlue : colors.saffron,
        ease: "power1.inOut",
        onStart: () => {
          if (trailsRef.current[index]) {
            gsap.to(trailsRef.current[index], {
              duration: 0.5,
              opacity: 1,
              ease: "power1.inOut"
            });
          }
        }
      });
    });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-white z-10 flex items-center justify-center overflow-hidden"
    >
      {trails.map((trail, index) => (
        <svg
          key={trail.id}
          ref={el => trailsRef.current[index] = el}
          className="absolute top-0 left-0 w-full h-full"
          style={{ opacity: 0 }}
        >
          <line
            x1={trail.startX}
            y1={trail.startY}
            x2={trail.endX}
            y2={trail.endY}
            stroke={trail.color}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ))}
      <div
        ref={circleRef}
        className="w-12 h-12 md:w-20 md:h-20 rounded-full absolute"
        style={{ 
          backgroundColor: colors.navyBlue,
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />
    </div>
  );
};

const HeroSection = () => (
  <section className="hero w-full h-screen flex items-center justify-center" style={{ backgroundColor: colors.navyBlue }}>
    <div className="text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-white">
        Welcome to Hexylon Analytics
      </h1>
      <p className="text-base md:text-lg text-white mt-4">
        Unlock the Future with Tailored AI Solutions
      </p>
    </div>
  </section>
);

const App = () => {
  return (
    <div>
      <EntranceAnimation />
      <HeroSection />
    </div>
  );
};

export default App;
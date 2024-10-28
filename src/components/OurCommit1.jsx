import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Brain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CommitmentSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate the hexagon grid
      gsap.to(".hex-cell", {
        opacity: 0.2,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: {
          grid: [6,8],
          from: "center",
          amount: 1.5
        },
        ease: "power1.inOut"
      });

      // Animate content
      gsap.fromTo(
        ".content-fade",
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative bg-gradient-to-br from-[#003366] to-[#002244] text-white py-24 px-8 overflow-hidden"
    >
      {/* Hexagon Grid Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(48)].map((_, i) => (
          <div
            key={i}
            className="hex-cell absolute w-24 h-24"
            style={{
              top: `${Math.floor(i / 8) * 120}px`,
              left: `${(i % 8) * 120}px`,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(45deg, #003366, #FF6600)",
              transform: "scale(0.9)"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8 content-fade">
          <Brain className="w-16 h-16 text-[#FF6600]" />
        </div>

        <h2 className="text-4xl font-bold mb-6 content-fade">
          Our Commitment
          <span className="block h-1 w-20 bg-[#FF6600] mx-auto mt-4" />
        </h2>

        <div className="relative content-fade">
          {/* Decorative elements */}
          <Sparkles className="absolute -left-8 top-0 w-6 h-6 text-[#FF6600] opacity-50" />
          <Sparkles className="absolute -right-8 bottom-0 w-6 h-6 text-[#FF6600] opacity-50" />
          
          <p className="text-lg leading-relaxed text-gray-300 mb-12">
            At Hexylon Analytics, we are more than just an AI provider. We're a partner in your success, 
            ensuring that every solution we deliver adds value to your business. Let's work together to unlock 
            the potential of AI for your company.
          </p>
        </div>

        <div className="content-fade">
          <button className="bg-[#FF6600] hover:bg-[#FF7F00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-[#FF6600]/20 group">
            Get in Touch Today
            <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
          <div className="mt-4 text-sm text-gray-400">
            Take the first step towards a smarter future
          </div>
        </div>
      </div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600]/0 via-[#FF6600]/20 to-[#FF6600]/0 opacity-20 animate-pulse" />
    </div>
  );
};

export default CommitmentSection;
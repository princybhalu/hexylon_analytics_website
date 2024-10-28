import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Target, TrendingUp, ShieldCheck, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CommitmentSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate grid lines
      gsap.to(".grid-line", {
        opacity: 0.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 2,
          grid: "auto",
          from: "center"
        }
      });

      // Animate content
      gsap.fromTo(
        ".fade-in",
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

      // Floating animation for particles
      gsap.to(".particle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        stagger: {
          amount: 2,
          from: "random"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative bg-gradient-to-b from-[#003366] to-[#001830] text-white overflow-hidden py-24 px-8"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="grid-line absolute h-px bg-white"
            style={{
              top: `${(i + 1) * 5}%`,
              left: '0',
              right: '0',
              transform: `rotate(${i % 2 ? 90 : 0}deg)`
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-[#FF6600] rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Commitment Section */}
        <div className="text-center mb-20 fade-in">
          <h2 className="text-4xl font-bold mb-6">
            Our Commitment
            <span className="block h-1 w-20 bg-[#FF6600] mx-auto mt-4" />
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At Hexylon Analytics, we are more than just an AI provider. We're a partner in your success, 
            ensuring that every solution we deliver adds value to your business. Let's work together to unlock 
            the potential of AI for your company.
          </p>
        </div>

        {/* REequitiz Platform Section */}
        <div className="bg-white bg-opacity-5 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-10 fade-in">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-[#FF6600]" />
                <h3 className="text-3xl font-bold">REequitiz</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                REequitiz is our AI-powered stock market platform that helps individuals make informed 
                decisions about which stocks to invest in and why. By analyzing real-time market data, 
                trends, and stock performance, our platform offers personalized recommendations to guide 
                users in choosing the right stocks based on their investment goals.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Brain className="w-6 h-6" />, text: "AI-Powered Analysis" },
                  { icon: <Target className="w-6 h-6" />, text: "Personalized Goals" },
                  { icon: <ShieldCheck className="w-6 h-6" />, text: "Risk Management" },
                  { icon: <Zap className="w-6 h-6" />, text: "Real-time Insights" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    {feature.icon}
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-video bg-[#003366] rounded-lg overflow-hidden shadow-2xl border border-white border-opacity-10">
                {/* Animated Chart Lines */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-[#FF6600]"
                    style={{
                      left: '0',
                      right: '0',
                      top: `${20 + i * 15}%`,
                      opacity: 0.3,
                      transform: `scale(${1 - i * 0.1}) translateY(${i * 10}px)`
                    }}
                  >
                    <div 
                      className="h-full w-full animate-pulse"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        background: 'linear-gradient(90deg, transparent, #FF6600, transparent)'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 fade-in">
          <button className="bg-[#FF6600] hover:bg-[#FF7F00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Get in Touch Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommitmentSection;
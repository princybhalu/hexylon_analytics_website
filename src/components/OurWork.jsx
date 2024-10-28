import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Package, 
  Factory, 
  Shield, 
  Heart,
  ArrowRight,
  Percent,
  DollarSign,
  TrendingUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, icon: Icon, metric, metricLabel, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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
        delay: index * 0.2,
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
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6600] to-[#003366] opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 ${
        isHovered ? 'blur-xl' : ''
      }`}></div>
      
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl transform transition-all duration-500 hover:translate-y--2 hover:shadow-2xl">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-lg bg-[#FF6600]/20 transform transition-all duration-500 ${
            isHovered ? 'rotate-12' : ''
          }`}>
            <Icon className="w-8 h-8 text-[#FF6600]" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 mb-6">{description}</p>
            
            <div className="flex items-center gap-4">
              <div className="bg-[#003366]/40 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#FF6600]">{metric}</div>
                <div className="text-sm text-gray-300">{metricLabel}</div>
              </div>
              <ArrowRight className={`w-6 h-6 text-[#FF6600] transform transition-all duration-500 ${
                isHovered ? 'translate-x-2' : ''
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountUpMetric = ({ value, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(value);
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start > end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={countRef} className="text-center">
      <div className="text-4xl font-bold text-[#FF6600]">
        {count}+
      </div>
      <div className="text-gray-300 mt-2">{label}</div>
    </div>
  );
};

const OurWorkSection = () => {
  const projects = [
    {
      title: "Automated Inventory System",
      description: "Revolutionized supply chain operations for a global retail chain, implementing AI-driven inventory management.",
      icon: Package,
      metric: "30%",
      metricLabel: "Stock Wastage Reduction"
    },
    {
      title: "Predictive Manufacturing Analytics",
      description: "Developed advanced predictive maintenance systems for a major manufacturing firm, preventing costly breakdowns.",
      icon: Factory,
      metric: "$1M+",
      metricLabel: "Annual Savings"
    },
    {
      title: "Fraud Detection System",
      description: "Implemented cutting-edge AI algorithms to detect and prevent fraudulent activities for a leading fintech company.",
      icon: Shield,
      metric: "40%",
      metricLabel: "Fraud Reduction"
    },
    {
      title: "AI Virtual Healthcare Assistant",
      description: "Created an intelligent healthcare assistant that revolutionized patient engagement and care delivery.",
      icon: Heart,
      metric: "90%",
      metricLabel: "Patient Satisfaction"
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-[#003366]">
      {/* Animated background */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Our Work
              <div className="h-1 w-32 bg-[#FF6600] mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="absolute -inset-4 bg-[#FF6600] rounded-full opacity-20 blur-2xl"></div>
          </div>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Transforming industries through innovative AI solutions and data-driven insights.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-[#FF6600] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -right-64 -top-64 w-96 h-96 bg-[#003366] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default OurWorkSection;
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IndustryCard = ({ industry, icon, solutions, isActive, onClick, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
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
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'bg-[#003366] text-white' 
          : 'bg-white hover:bg-blue-50'
      } rounded-xl shadow-lg overflow-hidden`}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${
            isActive ? 'bg-white/10' : 'bg-blue-50'
          }`}>
            {icon}
          </div>
          <h3 className={`text-xl font-bold ${
            isActive ? 'text-white' : 'text-[#003366]'
          }`}>
            {industry}
          </h3>
        </div>

        {/* Solutions */}
        <div className={`grid gap-4 mt-4 ${
          isActive ? 'opacity-100' : 'opacity-0 h-0'
        } transition-all duration-500`}>
          {solutions.map((solution, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-4 h-4 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{solution.title}</h4>
                <p className="text-sm opacity-80">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IndustriesSection = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const sectionRef = useRef(null);

  const industries = [
    {
      industry: "Manufacturing",
      icon: (
        <svg className="w-8 h-8 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      solutions: [
        { title: "Streamline Operations", description: "Optimize production and reduce downtime with predictive analytics." },
        { title: "Predictive Maintenance", description: "Prevent costly equipment failures before they happen." },
        { title: "Supply Chain Optimization", description: "Improve logistics and inventory management." }
      ]
    },
    {
      industry: "Retail & E-commerce",
      icon: (
        <svg className="w-8 h-8 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      solutions: [
        { title: "Enhance Customer Experience", description: "Deliver personalized shopping experiences using AI." },
        { title: "Dynamic Pricing", description: "Adjust pricing strategies based on real-time demand." },
        { title: "Inventory Forecasting", description: "Prevent overstock or stockouts with smart predictions." }
      ]
    },
    {
      industry: "Finance & Fintech",
      icon: (
        <svg className="w-8 h-8 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      solutions: [
        { title: "Fraud Detection", description: "AI-driven models to identify fraudulent transactions." },
        { title: "Risk Assessment", description: "Automate risk management for faster decision-making." },
        { title: "Algorithmic Trading", description: "Use machine learning to optimize investment strategies." }
      ]
    },
    {
      industry: "Healthcare",
      icon: (
        <svg className="w-8 h-8 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      solutions: [
        { title: "Revolutionize Patient Care", description: "Predictive diagnostics to improve patient outcomes." },
        { title: "Resource Management", description: "Optimize hospital operations and allocation of resources." },
        { title: "Drug Discovery", description: "Accelerate research with AI-driven insights." }
      ]
    },
    {
      industry: "Service Industry",
      icon: (
        <svg className="w-8 h-8 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      solutions: [
        { title: "Customer Support Automation", description: "Streamline client interactions with AI-driven chatbots and virtual assistants." },
        { title: "Data-Driven Decision Making", description: "Use analytics to improve service quality and customer satisfaction." },
        { title: "Process Automation", description: "Automate routine tasks to reduce operational costs and increase efficiency." }
      ]
    }
  ];

  return (
    <div ref={sectionRef} className="relative bg-gray-50 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #003366 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6 relative z-10">
              Industries We Serve
              <div className="h-1 w-32 bg-[#FF6600] mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="absolute -inset-4 bg-blue-50 rounded-full opacity-20 blur-2xl"></div>
          </div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI solutions are crafted for a wide range of industries, delivering targeted value and innovation.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              {...industry}
              index={index}
              isActive={activeIndustry === index}
              onClick={() => setActiveIndustry(index)}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -right-64 -top-64 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default IndustriesSection;
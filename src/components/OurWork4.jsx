import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {  Sparkles, GraduationCap, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurWorkSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const projectsRef = useRef(null);

  const achievements = [
    {
      title: "Automated Inventory System for a Global Retail Chain",
      description: "Reduced stock wastage by 30% and optimized supply chain operations.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 text-[#003366]" fill="#003366" stroke="#003366">
        <path d="M24 32C10.7 32 0 42.7 0 56L0 456c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24L64 56c0-13.3-10.7-24-24-24L24 32zm88 0c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zm96 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zM448 56l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0c-13.3 0-24 10.7-24 24zm-64-8l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16s-16 7.2-16 16z"/></svg>
    },
    {
      title: "Predictive Analytics for a Major Manufacturing Firm",
      description: "Enabled the company to prevent equipment breakdowns, saving over $1 million annually.",
      icon: <Sparkles className="w-8 h-8 text-[#003366]" />
    },
    {
      title: "Fraud Detection System for a Leading Fintech Company",
      description: "Decreased fraudulent activities by 40%, enhancing customer trust.",
      icon: <svg className="w-12 h-12 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
    },
    {
      title: "AI-Based Virtual Healthcare Assistant",
      description: "Improved patient engagement and care delivery for a large healthcare provider.",
      icon: <Sparkles className="w-8 h-8 text-[#003366]" />
    }
  ];

  const projects = [
    {
      title: "Education AI: Personalized Learning",
      description: "Our Education AI system is built to provide customized learning paths for students, tailored to their needs and abilities. The platform supports multilingual, interactive learning environments, progress tracking, and career assessments, helping students navigate their educational journey with greater clarity and efficiency.",
      icon: <GraduationCap className="w-12 h-12 text-[#003366]" />,
      className: "bg-blue-50"
    },
    {
      title: "REequitiz: Smart Stock Market Decisions",
      description: "REequitiz is our AI-powered stock market platform that helps individuals make informed decisions about which stocks to invest in and why. By analyzing real-time market data, trends, and stock performance, our platform offers personalized recommendations to guide users in choosing the right stocks based on their investment goals.",
      icon: <TrendingUp className="w-12 h-12 text-[#003366]" />,
      className: "bg-orange-50"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Network lines animation
      gsap.to(".network-line", {
        opacity: "random(0.1, 0.3)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Work items animation
      gsap.fromTo(
        ".work-item",
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects animation
      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-white py-20 px-8 overflow-hidden" id='our-work'>
      {/* Network line background */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="network-line absolute h-px bg-[#003366] opacity-5"
          style={{
            top: `${Math.random() * 100}%`,
            left: '0',
            width: '100%',
            transform: `rotate(${Math.random() * 180}deg)`
          }}
        />
      ))}

      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-[#003366] text-center">
          Our Work
          <span className="block h-1 w-20 bg-[#FF6600] mx-auto mt-4" />
        </h2>
        
        <p className="text-lg max-w-2xl mx-auto text-center mb-12 text-gray-600">
          At Hexylon Analytics, we leverage cutting-edge AI technologies to deliver transformative solutions across diverse industries. Here are some of our key achievements:
        </p>

        <div ref={containerRef} className="space-y-6 max-w-4xl mx-auto mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="work-item bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 transform group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-[#003366] group-hover:text-[#FF6600] transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold mb-8 text-[#003366] text-center">
          Our Projects
          <span className="block h-1 w-20 bg-[#FF6600] mx-auto mt-4" />
        </h2>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card ${project.className} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#003366] group-hover:text-[#FF6600] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurWorkSection;
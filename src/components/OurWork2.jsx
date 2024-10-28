import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurWorkSection = () => {
  const sectionRef = useRef(null);

  const achievements = [
    {
      title: "Automated Inventory System for a Global Retail Chain",
      description: "Reduced stock wastage by 30% and optimized supply chain operations."
    },
    {
      title: "Predictive Analytics for a Major Manufacturing Firm",
      description: "Enabled the company to prevent equipment breakdowns, saving over $1 million annually."
    },
    {
      title: "Fraud Detection System for a Leading Fintech Company",
      description: "Decreased fraudulent activities by 40%, enhancing customer trust."
    },
    {
      title: "AI-Based Virtual Healthcare Assistant",
      description: "Improved patient engagement and care delivery for a large healthcare provider."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animation for each list item
      gsap.fromTo(
        ".work-item",
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100",
            end: "bottom bottom-=50",
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#003366] text-white py-20 px-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Our Work</h2>
      <p className="text-lg max-w-2xl mx-auto text-center mb-12">
        At Hexylon Analytics, we take pride in the transformative projects we’ve completed across diverse industries. Here are some key achievements:
      </p>
      <div className="space-y-10 max-w-4xl mx-auto">
        {achievements.map((achievement, index) => (
          <div key={index} className="work-item">
            <h3 className="text-2xl font-semibold mb-2">{achievement.title}</h3>
            <p className="text-gray-200">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWorkSection;

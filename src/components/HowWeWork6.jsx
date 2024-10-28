import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TypingEffect = ({ text, triggerAnimation }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  useEffect(() => {
    if (triggerAnimation && !isTyping) {
      let currentText = "";
      let currentIndex = 0;
      setIsTyping(true);

      const typeText = () => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setDisplayText(currentText);
          currentIndex++;
          setTimeout(typeText, 50);
        } else {
          setIsTyping(false);
          setTimeout(() => setIsComplete(true), 500);
        }
      };
      typeText();
    }
  }, [triggerAnimation, text, isTyping]);

  return (
    <div className="font-mono bg-[#003366] text-white p-6 rounded-lg shadow-lg w-full ml-10">
      <span>{displayText}</span>
      {isTyping && <span className="animate-blink">|</span>}
    </div>
  );
};

const DropletAnimation = () => {
  return (
    <div className="animation-container w-[60px] h-[100px]">
      <div className="circle-container w-full h-full">
        <div className="central-circle w-[50px] h-[50px] md:w-[120px] md:h-[120px]"></div>
        <div className="droplet w-[50px] h-[50px] md:w-[120px] md:h-[120px]"></div>
      </div>
    </div>
  );
};

const WorkCard = ({ title, description, number }) => {
  return (
    <div className="flex-shrink-0 w-[400px] h-[300px] bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl font-bold text-[#003366]">Step {number}</span>
      </div>
      <h3 className="text-xl font-bold mb-4 text-[#003366]">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const HowWeWorkSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerRef = useRef(null);
  const [triggerTyping, setTriggerTyping] = useState(false);

  const steps = [
    {
      title: "Understand Your Business",
      description:
        "We start by sending our expert consultants to your company. They immerse themselves in your processes, challenges, and work culture to get a firsthand understanding of what makes your company tick.",
    },
    {
      title: "Identify Opportunities",
      description:
        "Based on our detailed analysis, we uncover areas where AI can make a tangible difference. Whether it's improving efficiency, reducing costs, or enhancing customer experiences, we pinpoint the best AI opportunities.",
    },
    {
      title: "Tailored AI Solutions",
      description:
        "Our team of AI experts then develops a customized solution that aligns perfectly with your goals and workflow. From automation to advanced data analytics, every aspect is designed to fit seamlessly into your current system.",
    },
    {
      title: "Proven Outcomes and Scaling Support",
      description:
        "After implementation, we provide ongoing support and help scale the solution as your business grows. With proven results and actionable insights, we ensure long-term value from your AI investment.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = cardsContainerRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const distance = totalWidth - containerWidth;

      // Set up the scroll trigger for typing animation
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => setTriggerTyping(true),
      });

      // Set up scroll-based animation for cards
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      }).to(cardsContainerRef.current, {
        x: -distance,
        ease: "none",
        duration: 1,
      });

      return () => ctx.revert();
    });
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-row items-center gap-1 mb-16">
          <DropletAnimation />
          <TypingEffect text="Our methodology is grounded in understanding your unique challenges, finding opportunities for improvement, and crafting customized AI solutions. Here's how we make it happen:" triggerAnimation={triggerTyping} />
        </div>

        {/* Scrolling Container */}
        <div ref={containerRef} className="overflow-hidden">
          <div ref={cardsContainerRef} className="flex gap-8">
            {steps.map((step, index) => (
              <WorkCard
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          .animation-container {
            position: relative;
          }

          .circle-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: end;
          }

          .central-circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(
              135deg,
              #6e45e2,
              #88d3ce,
              #ff9a9e,
              #fad0c4
            );
            background-size: 300% 300%;
            animation: gradient-shift 4s ease infinite;
            box-shadow: 0 0 30px rgba(255, 166, 0, 0.5);
          }

          .droplet {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: droplet-animation 4s ease-in-out forwards;
          }

          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes droplet-animation {
            0% {
              transform: scale(1) translate(0, 0);
              opacity: 1;
            }
            30% {
              transform: scale(0.8) translate(0, 0);
            }
            50% {
              transform: scale(0.3) translate(-40%, -50%);
            }
            60% {
              transform: scale(0.3) translate(0%, -65%);
            }
            70% {
              transform: scale(0.3) translate(40%, -50%);
            }
            90% {
              transform: scale(0.8) translate(0, 0);
            }
            100% {
              transform: scale(1) translate(0, 0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HowWeWorkSection;

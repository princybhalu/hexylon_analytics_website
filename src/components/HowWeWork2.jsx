import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(true);

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setDisplayText(currentText);
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setIsTyping(false);
      }
    };

    typeText();
  }, [text]);

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

const WorkCard = ({ title, description, number, delay }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "left center",
          toggleActions: "play none none reverse",
          horizontal: true,
        },
        delay: delay,
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-xl shadow-lg p-6 mr-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl font-bold text-[#003366]">Step {number}</span>
      </div>
      <h3 className="text-xl font-bold mb-4 text-[#003366]">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const HowWeWorkSection = () => {
  const scrollContainerRef = useRef(null);
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
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-1 mb-16">
          <DropletAnimation />
          <TypingEffect text="How We Work?" />
        </div>

        {/* Horizontal Scrolling Cards */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-8 hide-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex">
            {steps.map((step, index) => (
              <WorkCard
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                delay={index * 0.3}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Main container for the animation */
        .animation-container {
          position: relative;
        }

        /* Container for the circle and droplets */
        .circle-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: end;
        }

        /* Central 3D gradient circle */
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

        /* Droplet that emerges, splits into 3, and returns */
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

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HowWeWorkSection;

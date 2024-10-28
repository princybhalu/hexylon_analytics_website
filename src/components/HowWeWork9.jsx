import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TypingEffect = ({ text, triggerAnimation, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (triggerAnimation && !isTyping && !isComplete) {
      let currentText = "";
      let currentIndex = 0;
      setIsTyping(true);

      const typeText = () => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setDisplayText(currentText);
          currentIndex++;
          setTimeout(typeText, 25);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          onComplete();
        }
      };
      typeText();
    }
  }, [triggerAnimation, text, isTyping, isComplete, onComplete]);

  return (
    <div className="text-xl font-normal relative z-10">
      <span>{displayText}</span>
      {isTyping && <span className="animate-blink">|</span>}
    </div>
  );
};

const WorkCard = ({ title, description, number, icon }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-[400px] min-h-[420px] bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 transform group-hover:scale-150 transition-transform duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl font-bold text-[#003366] bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center">
            {number}
          </span>
        </div>

        <div className="mb-6">{icon}</div>

        <h3 className="text-2xl font-bold mb-4 text-[#003366] border-b-2 border-[#FF6600] pb-2 inline-block">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#003366] to-[#FF6600] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

const HowWeWorkSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerRef = useRef(null);
  const [triggerTyping, setTriggerTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const scrollTriggerRef = useRef(null);

  const steps = [
    {
      title: "Understand Your Business",
      description:
        "We start by sending our expert consultants to your company. They immerse themselves in your processes, challenges, and work culture to get a firsthand understanding of what makes your company tick.",
      icon: (
        <svg
          className="w-16 h-16 text-[#003366]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Identify Opportunities",
      description:
        "Based on our detailed analysis, we uncover areas where AI can make a tangible difference. Whether it's improving efficiency, reducing costs, or enhancing customer experiences, we pinpoint the best AI opportunities.",
      icon: (
        <svg
          className="w-16 h-16 text-[#003366]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: "Tailored AI Solutions",
      description:
        "Our team of AI experts then develops a customized solution that aligns perfectly with your goals and workflow. From automation to advanced data analytics, every aspect is designed to fit seamlessly into your current system.",
      icon: (
        <svg
          className="w-16 h-16 text-[#003366]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Proven Outcomes and Scaling Support",
      description:
        "After implementation, we provide ongoing support and help scale the solution as your business grows. With proven results and actionable insights, we ensure long-term value from your AI investment.",
      icon: (
        <svg
          className="w-16 h-16 text-[#003366]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  // Function to handle typing completion
  const handleTypingComplete = () => {
    setTypingComplete(true);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set up the scroll trigger for typing animation
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          if (!typingComplete) {
            setTriggerTyping(true);
            // Disable scrolling during typing animation
            document.body.style.overflow = "hidden";
          }
        },
        once: true, // Ensures the trigger only fires once
      });
    });

    if (typingComplete) {
      const totalWidth = cardsContainerRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const distance = totalWidth - containerWidth;
      // Create a timeline for the horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Add parallax effect to background
            const progress = self.progress;
            sectionRef.current.style.backgroundPosition = `${
              progress * 100
            }% 50%`;
          },
        },
      });

      tl.to(cardsContainerRef.current, {
        x: -distance,
        ease: "none",
        duration: 1,
      });
    }

    return () => {
      ctx.revert();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [typingComplete]);

  return (
    <div
      ref={sectionRef}
      className="bg-gray-50 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #003366 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20">
        {/* Enhanced Header Section */}
        <div ref={headerRef} className="relative mb-16">
          {/* Decorative Elements */}
          <div className="absolute -left-4 -top-4 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-100 rounded-full opacity-50 animate-pulse delay-150"></div>

          {/* Main Header Content */}
          <div className="relative z-10 bg-gradient-to-r from-[#003366] to-[#004d99] rounded-2xl shadow-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col gap-6 items-start max-w-4xl mx-auto text-white">
              {/* Title */}
              <TypingEffect
                text="Our methodology is grounded in understanding your unique challenges, finding opportunities for improvement, and crafting customized AI solutions. Here's how we make it happen:"
                triggerAnimation={triggerTyping}
                onComplete={handleTypingComplete}
              />
              <div className="h-1 w-24 bg-[#FF6600] mt-4 rounded-full"></div>

              {/* Visual Elements */}
              <div className="absolute right-8 top-8 opacity-20">
                <svg
                  className="w-24 h-24 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Container - Only visible after typing is complete */}
        <div
          ref={containerRef}
          className="overflow-hidden transition-opacity duration-500 pb-10"
          style={{ opacity: typingComplete ? 1 : 0 }}
        >
          <div ref={cardsContainerRef} className="flex gap-8">
            {steps.map((step, index) => (
              <WorkCard
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#003366]/20 to-transparent"></div>
    </div>
  );
};

export default HowWeWorkSection;

// import React from 'react'

// export default function HowWeWork() {
//   return (
//    <>
//     <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
//     <div className="max-w-4xl mx-auto text-center">
        
//         </div></div>
//    </>
//   )
// }

// chat gpt : animation 
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import DropletAnimation from './avatar'; // Import your existing Droplet animation

const HowWeWork = () => {
  useEffect(() => {
    // GSAP Animations: Typing effect and fade-in for steps
    gsap.fromTo(
      ".typing-heading",
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 0.5 }
    );
    gsap.fromTo(
      ".work-step",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.6, delay: 2.5 }
    );
  }, []);

  return (
    <section className="how-we-work bg-[#003366] text-white py-10 px-5 md:px-10">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0">
        
        {/* Left Side - Typing Effect with Prompt Box */}
        <div className="typing-heading-box md:w-1/2 bg-[#003366] border-l-4 border-[#FF6600] pl-5">
          <h2 className="typing-heading text-3xl md:text-4xl font-bold mb-4">How We Work?</h2>
          <p className="text-lg text-gray-200">Discover our strategic approach in three clear steps:</p>
        </div>

        {/* Right Side - Step-by-Step Explanation with Droplet Animation */}
        <div className="steps-container md:w-1/2 flex flex-col space-y-6">
          <div className="work-step flex items-start">
            <DropletAnimation /> {/* Droplet animation next to each step */}
            <div className="ml-4">
              <h3 className="text-2xl font-semibold text-[#FF6600]">Step 1: Understand Your Business</h3>
              <p className="text-base text-gray-300">
                We start by sending our expert consultants to your company. They immerse themselves in
                your processes, challenges, and work culture to get a firsthand understanding of what
                makes your company tick.
              </p>
            </div>
          </div>

          <div className="work-step flex items-start">
            <DropletAnimation />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold text-[#FF6600]">Step 2: Identify Opportunities</h3>
              <p className="text-base text-gray-300">
                Based on our detailed analysis, we uncover areas where AI can make a tangible difference.
                Whether it’s improving efficiency, reducing costs, or enhancing customer experiences, we
                pinpoint the best AI opportunities.
              </p>
            </div>
          </div>

          <div className="work-step flex items-start">
            <DropletAnimation />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold text-[#FF6600]">Step 3: Tailored AI Solutions</h3>
              <p className="text-base text-gray-300">
                Our team of AI experts then develops a customized solution that aligns perfectly with
                your goals and workflow. From automation to advanced data analytics, every aspect is
                designed to fit seamlessly into your current system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;


// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const TypingEffect = ({ text }) => {
//   const textRef = useRef(null);
//   const [displayText, setDisplayText] = React.useState('');
//   const [isTyping, setIsTyping] = React.useState(true);

//   useEffect(() => {
//     let currentText = '';
//     let currentIndex = 0;

//     const typeText = () => {
//       if (currentIndex < text.length) {
//         currentText += text[currentIndex];
//         setDisplayText(currentText);
//         currentIndex++;
//         setTimeout(typeText, 100);
//       } else {
//         setIsTyping(false);
//       }
//     };

//     typeText();
//   }, [text]);

//   return (
//     <div className="font-mono bg-[#003366] text-white p-6 rounded-lg shadow-lg max-w-sm">
//       <span>{displayText}</span>
//       {isTyping && <span className="animate-blink">|</span>}
//     </div>
//   );
// };

// const Droplet = ({ color }) => {
//   const dropletRef = useRef(null);

//   useEffect(() => {
//     gsap.to(dropletRef.current, {
//       y: 20,
//       scale: 0.8,
//       opacity: 0.7,
//       duration: 1.5,
//       repeat: -1,
//       yoyo: true,
//       ease: "power1.inOut"
//     });
//   }, []);

//   return (
//     <div 
//       ref={dropletRef} 
//       className="w-4 h-4 relative"
//       style={{
//         backgroundColor: color,
//         clipPath: 'path("M10,0 C4.47715,0 0,4.47715 0,10 C0,12.5 1,15 2.5,17 C4,19 6,20.5 8,21.5 C9,22 11,22 12,21.5 C14,20.5 16,19 17.5,17 C19,15 20,12.5 20,10 C20,4.47715 15.5228,0 10,0z")',
//         transform: 'scale(1.5)'
//       }}
//     />
//   );
// };

// const WorkStep = ({ number, title, description, delay }) => {
//   const stepRef = useRef(null);

//   useEffect(() => {
//     gsap.fromTo(
//       stepRef.current,
//       { 
//         opacity: 0, 
//         x: 50 
//       },
//       { 
//         opacity: 1, 
//         x: 0,
//         duration: 1,
//         scrollTrigger: {
//           trigger: stepRef.current,
//           start: "top center+=100",
//           toggleActions: "play none none reverse"
//         },
//         delay: delay
//       }
//     );
//   }, [delay]);

//   return (
//     <div ref={stepRef} className="flex items-start gap-6 mb-12">
//       <div className="flex items-center gap-4">
//         <span className="text-3xl font-bold text-[#003366]">{number}</span>
//         <Droplet color="#FF6600" />
//       </div>
//       <div>
//         <h3 className="text-xl font-bold mb-2 text-[#003366]">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </div>
//   );
// };

// const HowWeWorkSection = () => {
//   const sectionRef = useRef(null);
//   const steps = [
//     {
//       title: "Initial Consultation",
//       description: "We begin with a thorough discussion of your business needs and objectives to understand your unique challenges."
//     },
//     {
//       title: "Analysis & Planning",
//       description: "Our team analyzes your current processes and develops a customized AI implementation strategy."
//     },
//     {
//       title: "Development & Integration",
//       description: "We develop and integrate AI solutions that seamlessly fit into your existing workflow."
//     },
//     {
//       title: "Testing & Optimization",
//       description: "Rigorous testing ensures optimal performance and refinement based on real-world usage."
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="min-h-screen bg-white py-20 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row gap-12">
//           <div className="md:w-1/3">
//             <TypingEffect text="How We Work?" />
//           </div>
          
//           <div className="md:w-2/3">
//             {steps.map((step, index) => (
//               <WorkStep 
//                 key={index}
//                 number={index + 1}
//                 title={step.title}
//                 description={step.description}
//                 delay={index * 0.3}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HowWeWorkSection;

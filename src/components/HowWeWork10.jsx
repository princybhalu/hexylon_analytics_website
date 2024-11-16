import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const TypingEffect = ({ text, triggerAnimation, onComplete }) => {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (triggerAnimation && !isTyping && !isComplete) {
      let currentText = ""
      let currentIndex = 0
      setIsTyping(true)

      const typeText = () => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex]
          setDisplayText(currentText)
          currentIndex++
          setTimeout(typeText, 25)
        } else {
          setIsTyping(false)
          setIsComplete(true)
          onComplete()
        }
      }
      typeText()
    }
  }, [triggerAnimation, text, isTyping, isComplete, onComplete])

  return (
    <div className="text-xl font-normal relative z-10">
      <span>{displayText}</span>
      {isTyping && <span className="animate-blink">|</span>}
    </div>
  )
}

const WorkCard = ({ title, description, number, icon, isActive, caseStudy }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className={`flex-shrink-0 w-[300px] md:w-[400px] min-h-[420px] bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl p-4 md:p-8 transform transition-all duration-300 ${
        isActive ? "ring-2 ring-[#FF6600] shadow-2xl" : ""
      } relative overflow-hidden group`}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl font-bold text-[#003366] bg-[#FF6600]/10 w-14 h-14 rounded-full flex items-center justify-center">
            {number}
          </span>
        </div>

        <div className="mb-6 text-[#FF6600]">{icon}</div>

        <h3 className="text-2xl font-bold mb-4 text-[#003366] border-b-2 border-[#FF6600] pb-2 inline-block">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-lg mb-4">{description}</p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-2 bg-[#003366] text-white hover:bg-[#FF6600] transition-colors duration-300 px-4 py-2 rounded-md"
        >
          View Case Study
        </button>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-br from-[#003366] to-[#004d99] text-white p-6 rounded-lg max-w-md"
              >
                <h2 className="text-2xl font-bold text-[#FF6600] mb-2">{caseStudy.title}</h2>
                <p className="text-gray-300 mb-4">{caseStudy.description}</p>
                <p className="text-gray-100 mb-6">{caseStudy.content}</p>
                <button
                  className="bg-[#FF6600] text-white hover:bg-[#FF8C00] transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function EnhancedHowWeWorkSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [triggerTyping, setTriggerTyping] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Understand Your Business",
      description: "We start by sending our expert consultants to thoroughly understand your business processes, challenges, and goals. This deep dive allows us to tailor our AI solutions specifically to your needs.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
      caseStudy: {
        title: "Global Retailer Transformation",
        description: "How we revolutionized inventory management for a Fortune 500 retailer",
        content: "Our team spent two weeks on-site, analyzing the client's existing inventory systems and supply chain processes. By understanding their unique challenges, we developed a custom AI solution that reduced stockouts by 35% and improved inventory turnover by 20%."
      }
    },
    {
      title: "Data Collection and Analysis",
      description: "We gather and analyze your existing data, identifying patterns and insights that will form the foundation of our AI models. Our advanced data processing techniques ensure we extract maximum value from your information.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      caseStudy: {
        title: "Financial Services Data Optimization",
        description: "Enhancing fraud detection for a major bank",
        content: "By collecting and analyzing five years of transaction data, we identified subtle patterns of fraudulent activity. Our AI model increased fraud detection rates by 60% while reducing false positives by 40%, saving the bank millions in potential losses."
      }
    },
    {
      title: "AI Model Development",
      description: "Our team of expert data scientists and machine learning engineers develop custom AI models tailored to your specific needs. We use cutting-edge algorithms and techniques to ensure optimal performance and accuracy.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      caseStudy: {
        title: "Healthcare Predictive Analytics",
        description: "Improving patient outcomes with AI",
        content: "We developed a neural network model that analyzes patient data to predict potential complications. This model achieved a 92% accuracy rate in identifying high-risk patients, allowing for early interventions and significantly improving patient outcomes."
      }
    },
    {
      title: "Integration and Testing",
      description: "We seamlessly integrate our AI solutions into your existing systems and rigorously test them to ensure optimal performance. Our iterative approach allows for continuous refinement and improvement.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
      caseStudy: {
        title: "Manufacturing Process Optimization",
        description: "Boosting efficiency in automotive production",
        content: "Our AI solution was integrated into the client's existing manufacturing systems. Through rigorous testing and optimization, we achieved a 15% increase in production efficiency and a 25% reduction in quality control issues, significantly improving the client's bottom line."
      }
    },
  ]

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 80%",
      onEnter: () => setTriggerTyping(true),
      once: true,
    })

    return () => scrollTrigger.kill()
  }, [])

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  return (
    <div ref={sectionRef} className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div ref={headerRef} className="relative mb-8 md:mb-16">
          <motion.div className="relative z-10 bg-gradient-to-r from-[#003366] to-[#004d99] rounded-2xl p-4">
            <TypingEffect
              text="Our methodology is grounded in understanding your unique challenges."
              triggerAnimation={triggerTyping}
              onComplete={() => setTypingComplete(true)}
            />
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl overflow-hidden">
            <motion.div
              className="flex transition-all duration-500 ease-in-out"
              animate={{ x: `-${currentStep * 100}%` }}
            >
              {steps.map((step, index) => (
                <WorkCard
                  key={index}
                  title={step.title}
                  description={step.description}
                  number={index + 1}
                  icon={step.icon}
                  isActive={index === currentStep}
                  caseStudy={step.caseStudy}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#FF6600] transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#FF6600] transition-colors duration-300 flex items-center"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
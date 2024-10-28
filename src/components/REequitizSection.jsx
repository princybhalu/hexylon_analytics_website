import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, PieChart, BarChart4, Briefcase, Brain, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedMetric = ({ value, label, icon: Icon }) => {
  const metricRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      metricRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: metricRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div ref={metricRef} className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#FF6600]/20 rounded-lg">
          <Icon className="w-6 h-6 text-[#FF6600]" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-gray-300 text-sm">{label}</div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon: Icon, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
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
      className="bg-white/5 backdrop-blur-md p-6 rounded-xl transform transition-all duration-500 hover:scale-105 hover:bg-white/10"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#FF6600]/20 rounded-lg">
          <Icon className="w-6 h-6 text-[#FF6600]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

const REequitizSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        onEnter: () => setIsVisible(true),
      },
    });

    return () => tl.kill();
  }, []);

  const features = [
    {
      title: "AI-Powered Market Analysis",
      description: "Advanced algorithms analyze market trends, patterns, and correlations to provide actionable insights.",
      icon: Brain
    },
    {
      title: "Real-Time Portfolio Optimization",
      description: "Dynamic portfolio rebalancing based on market conditions and risk tolerance levels.",
      icon: PieChart
    },
    {
      title: "Predictive Analytics",
      description: "Machine learning models forecast market movements and identify potential investment opportunities.",
      icon: TrendingUp
    },
    {
      title: "Risk Management",
      description: "Sophisticated risk assessment tools to protect your investments and maximize returns.",
      icon: BarChart4
    }
  ];

  return (
    <div ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-[#003366] to-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="text-sm text-[#FF6600] mb-2 font-mono">
              {isVisible && <span className="animate-typing">{">"} Analyzing market data...</span>}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              REequitiz
              <span className="text-[#FF6600]">.</span>
              <div className="h-1 w-32 bg-[#FF6600] mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="absolute -inset-4 bg-[#FF6600] rounded-full opacity-20 blur-2xl"></div>
          </div>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Make intelligent stock market decisions powered by advanced AI analytics and real-time data processing.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <AnimatedMetric value="99.9%" label="Prediction Accuracy" icon={Brain} />
          <AnimatedMetric value="500ms" label="Real-time Analysis" icon={LineChart} />
          <AnimatedMetric value="$2.5B+" label="Managed Assets" icon={Briefcase} />
          <AnimatedMetric value="40%" label="Average ROI" icon={TrendingUp} />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Live Chart Preview */}
        <div className="mt-20 bg-white/5 backdrop-blur-md p-8 rounded-xl transform transition-all duration-500 hover:scale-105">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600]/20 to-[#003366]/20 animate-pulse"></div>
            <div className="h-full w-full flex items-center justify-center">
              <LineChart className="w-16 h-16 text-[#FF6600]" />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-[#FF6600] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -right-64 -top-64 w-96 h-96 bg-[#003366] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default REequitizSection;
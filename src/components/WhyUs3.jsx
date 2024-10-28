import React from 'react';

const WhyChooseUs = () => {
  // Brand Colors
  const colors = {
    navyBlue: '#003366',
    saffron: '#FF6600',
    white: '#FFFFFF'
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${colors.navyBlue} 1px, transparent 1px),
              linear-gradient(to bottom, ${colors.navyBlue} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'moveGrid 20s linear infinite',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              background: i % 2 === 0 ? colors.navyBlue : colors.saffron,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${-Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Neural Network Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.navyBlue} />
              <stop offset="100%" stopColor={colors.saffron} />
            </linearGradient>
          </defs>
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
              stroke="url(#line-gradient)"
              strokeWidth="0.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4" style={{ color: colors.navyBlue }}>
            Why Choose Us?
          </h2>
          <div 
            className="h-1 w-32 mx-auto rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.navyBlue}, ${colors.saffron})` 
            }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#FF6600] to-[#003366] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white rounded-xl p-8 shadow-lg transition-all duration-500 group-hover:translate-y-[-8px]">
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="absolute -inset-2 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative" style={{ color: colors.navyBlue }}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 
                  className="text-xl font-semibold mb-3 transition-transform duration-500 group-hover:translate-x-2"
                  style={{ color: colors.navyBlue }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glowing Orb Effects */}
      <div 
        className="absolute -left-32 -top-32 w-64 h-64 rounded-full blur-3xl animate-pulse opacity-20"
        style={{ background: colors.navyBlue }}
      />
      <div 
        className="absolute -right-32 -bottom-32 w-64 h-64 rounded-full blur-3xl animate-pulse opacity-20"
        style={{ background: colors.saffron }}
      />
    </div>
  );
};

const features = [
  {
    title: "Customized AI Solutions",
    description: "Tailored artificial intelligence solutions designed specifically for your business needs and goals.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Expert Consultation",
    description: "Our experienced team provides strategic guidance throughout your AI transformation journey.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "End-to-End Service",
    description: "Comprehensive support from initial consultation to deployment and beyond, ensuring seamless integration.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

// Add these keyframes to your global CSS
const style = {
  '@keyframes moveGrid': {
    '0%': {
      transform: 'translateY(0)',
    },
    '100%': {
      transform: 'translateY(40px)',
    }
  },
  '@keyframes float': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '50%': {
      transform: 'translate(20px, 20px)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    }
  }
};

export default WhyChooseUs;
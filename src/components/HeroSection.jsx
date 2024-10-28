// import React from 'react';

// const HeroSection = () => {
//   return (
//     <section className="hero w-full h-screen flex items-center justify-center bg-[#003366] text-white">
//   <div className="text-center max-w-2xl px-4">
//     <h1 className="text-5xl font-bold mb-4">Unlock the Future with Tailored AI Solutions</h1>
//     <p className="text-lg">
//       At <span className="font-semibold text-[#FF6600]">Hexylon Analytics</span>, we believe every business is unique, and so should be the technology that drives it. We specialize in creating AI solutions tailored specifically to your company’s <span className="font-semibold text-[#FF6600]">processes</span> and <span className="font-semibold text-[#FF6600]">workflow</span>. Our approach is simple yet effective: we understand your way of working, and we design our AI to amplify it.
//     </p>
//   </div>
// </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const words = ['AI Solutions', 'HA Solutions'];
  const period = 2000;
  const [delta, setDelta] = useState(100);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting]);

  const tick = () => {
    let i = loopNum % words.length;
    let fullText = words[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(100);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 Darker-Grotesque">
          Unlock the Future with{' '}
        </h1>
        <p className="text-5xl md:text-6xl font-bold mb-8 text-[#003366] Darker-Grotesque relative h-[50px]">
          <span className=" left-1/2 transform -translate-x-1/2 w-full">
            {text}
            <span className="animate-blink text-black hidden">|</span>
          </span>
        </p>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
        At <span className="font-semibold text-[#FF6600]">Hexylon Analytics</span>, we believe every business is unique, and so should be the technology that drives it. We specialize in creating AI solutions tailored specifically to your company’s <span className="font-semibold text-[#FF6600]">processes</span> and <span className="font-semibold text-[#FF6600]">workflow</span>. Our approach is simple yet effective: we understand your way of working, and we design our AI to amplify it.
        </p>

        <button className="bg-[#003366] hover:bg-[#002347] text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

// Add this to your global CSS or Tailwind config
const styles = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .animate-blink {
    animation: blink 1s step-end infinite;
  }
`;

export default HeroSection;


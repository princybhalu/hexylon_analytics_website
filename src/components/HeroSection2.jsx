import React, { useState, useEffect, useRef } from 'react';
import { Circle } from 'lucide-react';

const Neural = ({ width, height }) => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const connections = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const numPoints = 50;

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#003366';
      ctx.strokeStyle = '#003366';

      // Update points
      points.current.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off walls
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      points.current.forEach((point, i) => {
        points.current.slice(i + 1).forEach(other => {
          const dx = other.x - point.x;
          const dy = other.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 51, 102, ${1 - distance / 100})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 z-0"
    />
  );
};

const TypingEffect = ({ words, period = 2000 }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
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
    <span className="relative bg-[#FF6600]">
      {text}
      <span className="absolute right-[-8px] top-0 animate-pulse font-normal ">|</span>
    </span>
  );
};

const FloatingCircles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <Circle
          key={i}
          size={20 + i * 10}
          className={`absolute text-[#FF6600] opacity-${10 + i * 10} animate-float-${i}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <Neural width={window.innerWidth} height={window.innerHeight} />
      {/* <FloatingCircles /> */}
      
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div 
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#003366] to-[#FF6600]  Darker-Grotesque">
            Unlock the Future with{' '}
          </h1>
          <p className="text-5xl md:text-7xl font-bold mb-8 text-white relative h-[80px] flex justify-center items-center  Darker-Grotesque">
            <TypingEffect words={['AI Solutions ', 'HA Solutions ']} />
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg">
            At <span className="font-semibold text-[#FF6600]">Hexylon Analytics</span>, 
            we believe every business is unique, and so should be the technology that drives it. 
            We specialize in creating AI solutions tailored specifically to your company's 
            <span className="font-semibold text-[#FF6600]"> processes </span> and 
            <span className="font-semibold text-[#FF6600]"> workflow</span>. 
            Our approach is simple yet effective: we understand your way of working, 
            and we design our AI to amplify it.
          </p>
          
          <button className="relative group bg-[#003366] hover:bg-[#002347] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#003366] to-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(-20px) }
  }
  
  .animate-float-0 { animation: float 3s ease-in-out infinite; }
  .animate-float-1 { animation: float 4s ease-in-out infinite; }
  .animate-float-2 { animation: float 5s ease-in-out infinite; }
  .animate-float-3 { animation: float 6s ease-in-out infinite; }
  .animate-float-4 { animation: float 7s ease-in-out infinite; }
`;

export default HeroSection;
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Component({ handleNavigateToContactPage }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.5,
      });
    }

    function drawHexagon(x, y, size) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        if (particle.x < 0 || particle.x > canvas.width) particle.angle = Math.PI - particle.angle;
        if (particle.y < 0 || particle.y > canvas.height) particle.angle = -particle.angle;

        drawHexagon(particle.x, particle.y, particle.size * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 102, 0, ${0.2 - (distance / connectionDistance) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Unlock Insights with{' '}
          <span className="text-[#FF6600]">AI-Powered Analytics</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Hexylon Analytics delivers custom AI solutions that adapt to your unique business processes,
          driving innovation and efficiency through advanced data analysis.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            className="bg-[#FF6600] hover:bg-[#FF8533] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300"
            onClick={handleNavigateToContactPage}
          >
            Get Started
          </button>
          <a
            className="border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300"
            href='#our-work'
          >
            Explore Solutions
          </a>
        </motion.div>
      </div>
    </div>
  );
}

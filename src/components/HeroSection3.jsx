import React, { useState, useEffect, useRef } from "react";

const Neural = ({ width, height }) => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const activeSets = useRef([]);
  const frameCount = useRef(0);

  const createHexagonPoints = (centerX, centerY, size) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push({
        x: centerX + size * Math.cos(angle),
        y: centerY + size * Math.sin(angle),
        angle: angle,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        originalX: centerX + size * Math.cos(angle),
        originalY: centerY + size * Math.sin(angle),
      });
    }
    return points;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initialize multiple hexagon sets at random positions
    const initializePoints = () => {
      points.current = [];
      activeSets.current = [];

      // Create random hexagon sets
      const numSets = Math.floor((width * height) / 80000); // Adjust density here
      for (let i = 0; i < numSets; i++) {
        const centerX = Math.random() * width;
        const centerY = Math.random() * height;
        const size = 30 + Math.random() * 20; // Random size between 30-50

        const hexPoints = createHexagonPoints(centerX, centerY, size);
        points.current.push(...hexPoints);

        activeSets.current.push({
          center: { x: centerX, y: centerY },
          points: hexPoints,
          size: size,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
        });
      }
    };

    const drawConnection = (point1, point2, distance, maxDistance) => {
      const opacity = Math.max(0, 1 - distance / maxDistance);
      const gradient = ctx.createLinearGradient(
        point1.x,
        point1.y,
        point2.x,
        point2.y
      );

      // Create a gradient effect based on distance
      const color1 = `rgba(0, 51, 102, ${opacity})`;
      const color2 = `rgba(255, 102, 0, ${opacity * 0.7})`;

      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);

      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = opacity * 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount.current++;

      // Update and draw hexagon sets
      activeSets.current.forEach((set) => {
        // Update points with organic movement
        set.points.forEach((point, index) => {
          // Add subtle floating motion
          const floatOffset =
            Math.sin(frameCount.current * 0.02 + set.phase) * 2;
          const rotationOffset =
            Math.sin(frameCount.current * 0.01 + set.phase) * 0.5;

          point.x =
            point.originalX +
            Math.cos(point.angle + rotationOffset) * floatOffset;
          point.y =
            point.originalY +
            Math.sin(point.angle + rotationOffset) * floatOffset;

          // Draw point
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#003366";
          ctx.fill();
        });

        // Draw hexagon outline with gradient
        ctx.beginPath();
        set.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.closePath();
        ctx.strokeStyle = `rgba(255, 102, 0, 0.2)`;
        ctx.stroke();
      });

      // Draw connections between nearby points
      points.current.forEach((point1, i) => {
        points.current.forEach((point2, j) => {
          if (i < j) {
            const dx = point2.x - point1.x;
            const dy = point2.y - point1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;

            if (distance < maxDistance) {
              drawConnection(point1, point2, distance, maxDistance);
            }
          }
        });
      });

      // Draw dynamic connection lines
      activeSets.current.forEach((set1) => {
        activeSets.current.forEach((set2) => {
          const dx = set2.center.x - set1.center.x;
          const dy = set2.center.y - set1.center.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const point1 = set1.points[0];
            const point2 = set2.points[0];

            if (Math.random() < 0.01) {
              // Occasional flashing connection
              ctx.beginPath();
              ctx.moveTo(point1.x, point1.y);
              ctx.lineTo(point2.x, point2.y);
              ctx.strokeStyle = `rgba(255, 102, 0, ${0.8 * Math.random()})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = width;
      canvas.height = height;
      initializePoints();
    };

    // Handle mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      points.current.forEach((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          point.x += dx * force * 0.01;
          point.y += dy * force * 0.01;
        }
      });
    };

    // Initialize
    handleResize();
    animate();

    // Event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 z-0"
      style={{ backgroundColor: "transparent" }}
    />
  );
};

const TypingEffect = ({ words, period = 2000 }) => {
  const [text, setText] = useState("");
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
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(100);
    }
  };

  return (
    <span className="relative">
      {text}
      <span className="absolute right-[-8px] top-0 animate-pulse font-normal ">
        |
      </span>
    </span>
  );
};

const HeroSection = ({ handleNavigateToContactPage }) => {
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
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-[#003366] Darker-Grotesque">
            Unlock the Future with{" "}
          </h1>
          <p className="text-5xl md:text-7xl font-bold mb-8 text-[#FF6600] relative h-[80px] flex justify-center items-center  Darker-Grotesque">
            <TypingEffect words={["AI Solution",  "Hexylon Analytics"]} />
          </p>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg">
            At{" "}
            <span className="font-semibold text-[#FF6600]">
              Hexylon Analytics
            </span>
            , we believe every business is unique, and so should be the
            technology that drives it. We specialize in creating AI solutions
            tailored specifically to your company's
            <span className="font-semibold text-[#FF6600]">
              {" "}
              processes{" "}
            </span>{" "}
            and
            <span className="font-semibold text-[#FF6600]"> workflow</span>. Our
            approach is simple yet effective: we understand your way of working,
            and we design our AI to amplify it.
          </p>

          <button
            className="relative group bg-[#003366] hover:bg-[#002347] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={handleNavigateToContactPage}
          >
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

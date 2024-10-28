import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const AnimatedInput = ({ label, type = "text", required = true }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.to(lineRef.current, {
      scaleX: isFocused || value ? 1 : 0,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [isFocused, value]);

  return (
    <div className="relative mb-6 group">
      {/* AI-themed animated background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#003366] to-[#FF6600] rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full bg-white/70 backdrop-blur-sm px-4 py-3 rounded-lg outline-none transition-all duration-300 border border-gray-200 focus:border-[#003366]"
        placeholder=" "
      />
      <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-gray-500
        ${(isFocused || value) ? 'text-xs -top-2 bg-white px-2 text-[#003366]' : 'text-base top-3'}`}>
        {label}
      </label>
      <div 
        ref={lineRef} 
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#003366] to-[#FF6600] transform scale-x-0 origin-left"
      />
    </div>
  );
};

const ContactPage = () => {
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const infoRef = useRef(null);

  // Particle animation for background
  const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const particles = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        });
      }

      function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = '#003366';
          ctx.fill();
        });
      }

      animate();
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-10" />;
  };

  useEffect(() => {
    // Animate form elements
    gsap.from(formRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animate map
    gsap.from(mapRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animate info section
    gsap.from(infoRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white relative overflow-hidden py-20">
      {/* Animated background */}
      <ParticleBackground />
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#003366]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#FF6600]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Get in Touch</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-[#003366] to-[#FF6600] mx-auto mb-6" />
          <p className="text-xl text-gray-600">Let's discuss how AI can transform your business</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput label="Full Name" />
              <AnimatedInput label="Email" type="email" />
              <AnimatedInput label="Phone" type="tel" />
              <div className="relative mb-6 group">
                <textarea
                  rows="4"
                  className="w-full bg-white/70 backdrop-blur-sm px-4 py-3 rounded-lg outline-none transition-all duration-300 border border-gray-200 focus:border-[#003366]"
                  placeholder="Your Message"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#003366] to-[#FF6600] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#003366] to-[#FF6600] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Map and Info */}
          <div className="space-y-8">
            {/* Map */}
            <div ref={mapRef} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg relative overflow-hidden h-[300px]">
              <img
                src="/api/placeholder/800/300"
                alt="Location Map"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Contact Information */}
            <div ref={infoRef} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg space-y-6">
              <div className="flex items-center gap-4 text-gray-600 hover:text-[#003366] transition-colors duration-300">
                <div className="p-3 bg-[#003366]/10 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">Location</h3>
                  <p>123 AI Innovation Street, Tech City, TC 12345</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600 hover:text-[#003366] transition-colors duration-300">
                <div className="p-3 bg-[#003366]/10 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">Email</h3>
                  <p>contact@hexylonanalytics.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600 hover:text-[#003366] transition-colors duration-300">
                <div className="p-3 bg-[#003366]/10 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600 hover:text-[#003366] transition-colors duration-300">
                <div className="p-3 bg-[#003366]/10 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default ContactPage;
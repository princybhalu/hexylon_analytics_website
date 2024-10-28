import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  Brain,
  Cpu,
  Network,
} from "lucide-react";
import Navbar from "../components/Navbar";

const THEME = {
  navyBlue: "#003366",
  saffron: "#FF6600",
  white: "#FFFFFF",
};

const ContactPage = () => {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    areaOfInterest: "",
    email: "",
    phone: "",
    location: "",
    industryFocus: "",
  });

  useGSAP(
    () => {
      // Animated background elements
      gsap.to(".floating-icon", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        stagger: {
          amount: 2,
          from: "random",
        },
      });

      // Hero section animation
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".interactive-form", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      // Contact info section animation
      gsap.from(".contact-info-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact-info-container",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(".form-flash", {
      opacity: 0.5,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        console.log("Form submitted:", formData);
        setFormData({
          name: "",
          companyName: "",
          areaOfInterest: "",
          email: "",
          phone: "",
          location: "",
          industryFocus: "",
        });
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div ref={containerRef} className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div
          className="fixed inset-0"
          style={{ backgroundColor: THEME.navyBlue, zIndex: -1 }}
        >
          <div className="absolute inset-0 opacity-10">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="floating-icon absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.3,
                }}
              >
                {i % 3 === 0 ? (
                  <Brain size={40} color={THEME.saffron} />
                ) : i % 3 === 1 ? (
                  <Cpu size={40} color={THEME.saffron} />
                ) : (
                  <Network size={40} color={THEME.saffron} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section with Form */}
          <div className="min-h-screen flex flex-col justify-center items-center mb-24">
            <h1 className="hero-title text-5xl md:text-6xl font-bold text-white text-center mb-12">
              Transform Your Business
              <br />
              <span style={{ color: THEME.saffron }}>With AI Solutions</span>
            </h1>

            <div className="interactive-form bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 max-w-4xl w-full">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <div className="prose lg:prose-lg max-w-none text-white">
                  <p className="leading-relaxed text-lg">
                    Hello! My name is{" "}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "200px" }}
                      placeholder="Your Name"
                      required
                    />
                    , and I represent{" "}
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "200px" }}
                      placeholder="Your Company Name"
                      required
                    />
                    . I'm interested in learning more about how Hexylon
                    Analytics can help us with{" "}
                    <input
                      type="text"
                      name="areaOfInterest"
                      value={formData.areaOfInterest}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "250px" }}
                      placeholder="Your Area of Interest"
                      required
                    />
                    . You can reach me at{" "}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "200px" }}
                      placeholder="Your Email"
                      required
                    />{" "}
                    or call me at{" "}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "150px" }}
                      placeholder="Your Phone Number"
                      required
                    />
                    . Our company is currently located in{" "}
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "200px" }}
                      placeholder="Your Location"
                      required
                    />
                    , and we are specifically focused on{" "}
                    <input
                      type="text"
                      name="industryFocus"
                      value={formData.industryFocus}
                      onChange={handleChange}
                      className="inline-block px-2 py-1 bg-transparent border-b-2 text-white placeholder-white/50 outline-none"
                      style={{ borderColor: THEME.saffron, width: "200px" }}
                      placeholder="Your Industry/Project Focus"
                      required
                    />
                    . Looking forward to connecting!
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-lg transition-all duration-300 font-medium text-white hover:scale-105"
                  style={{ backgroundColor: THEME.saffron }}
                >
                  Connect with Our AI Experts
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="contact-info-container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
              <h2
                className="text-3xl font-bold mb-8"
                style={{ color: THEME.saffron }}
              >
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <MapPin
                    style={{ color: THEME.saffron }}
                    className="w-6 h-6"
                  />
                  <div>
                    <h3 className="font-medium text-lg">Location</h3>
                    <p className="text-white/80">
                      123 AI Plaza, Silicon Valley, CA 94025
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <Phone style={{ color: THEME.saffron }} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium text-lg">Phone</h3>
                    <p className="text-white/80">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <Mail style={{ color: THEME.saffron }} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium text-lg">Email</h3>
                    <p className="text-white/80">
                      contact@hexylonanalytics.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <Building
                    style={{ color: THEME.saffron }}
                    className="w-6 h-6"
                  />
                  <div>
                    <h3 className="font-medium text-lg">Business Hours</h3>
                    <p className="text-white/80">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 aspect-video">
              <img
                src="/api/placeholder/800/400"
                alt="Location Map"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  CircuitBoard,
  Cpu,
  Network,
} from "lucide-react";
import ContactNavbar from "../components/NavbarForContact";
import ContactFooter from "../components/FooterOfContact"

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
      // Animated circuit pattern
      gsap.to(".circuit-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power1.inOut",
        stagger: 0.1,
      });

      // Floating icons animation
      gsap.to(".tech-icon", {
        y: "random(-15, 15)",
        rotation: "random(-15, 15)",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        stagger: {
          amount: 1.5,
          from: "random",
        },
      });

      // Hero text animation
      gsap.from(".hero-text span", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Form animation
      gsap.from(".form-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });

      // Contact info animation
      gsap.from(".contact-item", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top center",
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      scale: 0.98,
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
      <ContactNavbar />
      <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
        {/* Decorative Circuit Pattern */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 0 }}
        >
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                className="circuit-line"
                d="M10 10 H90 V90 H10 Z"
                fill="none"
                stroke={THEME.navyBlue}
                strokeWidth="0.5"
                strokeDasharray="300"
                strokeDashoffset="300"
                opacity="0.1"
              />
              <circle
                cx="10"
                cy="10"
                r="2"
                fill={THEME.saffron}
                opacity="0.2"
              />
              <circle
                cx="90"
                cy="90"
                r="2"
                fill={THEME.saffron}
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>

        {/* Floating Tech Icons */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="tech-icon absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 1,
            }}
          >
            {i % 3 === 0 ? (
              <CircuitBoard size={30} color={THEME.navyBlue} />
            ) : i % 3 === 1 ? (
              <Cpu size={30} color={THEME.navyBlue} />
            ) : (
              <Network size={30} color={THEME.navyBlue} />
            )}
          </div>
        ))}

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-12 mt-24">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1
              className="hero-text text-5xl font-bold mb-6"
              style={{ color: THEME.navyBlue }}
            >
              <span>Let's Connect </span>
              <span style={{ color: THEME.saffron }}>& Innovate</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your business with our cutting-edge AI solutions. Fill
              out the form below to start your journey.
            </p>
          </div>

          {/* Form Section */}
          <div className="form-container bg-white rounded-2xl shadow-xl p-8 mb-24 relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl opacity-50" />
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative space-y-8"
            >
              <div className="prose max-w-none">
                <p
                  className="leading-relaxed text-lg"
                  style={{ color: THEME.navyBlue }}
                >
                  Hello! My name is{" "}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
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
                   className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
                    style={{ borderColor: THEME.saffron, width: "200px" }}
                    placeholder="Your Company Name"
                    required
                  />
                  . I'm interested in learning more about how Hexylon Analytics
                  can help us with{" "}
                  <input
                    type="text"
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
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
                     className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
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
                     className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
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
                     className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
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
                     className="inline-block px-2 py-1 border-b-2 focus:border-b-2 outline-none transition-colors bg-transparent"
                    style={{ borderColor: THEME.saffron, width: "200px" }}
                    placeholder="Your Industry/Project Focus"
                    required
                  />
                  . Looking forward to connecting!
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: THEME.saffron }}
              >
                Send Message
              </button>
            </form>
          </div>

           {/* Contact Section */}
        <div className="contact-section grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2
              className="text-3xl font-bold"
              style={{ color: THEME.navyBlue }}
            >
              Get in Touch
            </h2>

            <div className="space-y-3">
              {[
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "B/410, Ganesh Plaza,Nr. Navrangpura Post Office, Navrangpura, Ahmedabad, Gujarat, India - 380 009",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+91 7990821728",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "Support@hexylon.in",
                },
                {
                  icon: Building,
                  title: "Business Hours",
                  content: "Mon - Fri: 9:00 AM - 7:00 PM IST",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="contact-item mx-auto flex items-center p-4 rounded-lg transition-all hover:shadow-md hover:translate-x-2 bg-white"
                  style={{ opacity: 1 }}
                >
                  <div
                    className="ml-8 p-3 rounded-full mr-4"
                    style={{ backgroundColor: `${THEME.navyBlue}10` }}
                  >
                    <item.icon size={24} style={{ color: THEME.saffron }} />
                  </div>
                  <div>
                    <h3
                      className="font-medium"
                      style={{ color: THEME.navyBlue }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-full">
              <div className="w-full h-full bg-gray-100 relative">
                <div className="absolute inset-0 bg-opacity-50 bg-gray-200">
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.684982717429!2d72.55826618629733!3d23.035335962144465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f461610533%3A0xa56a93bc9468d0!2sGanesh%20Plaza%2C%20Navrangpura%20Rd%2C%20Near%20Navrangpura%20Post%20Office%2C%20Shrimali%20Society%2C%20Navrangpura%2C%20Ahmedabad%2C%20Gujarat%20380009!5e0!3m2!1sen!2sin!4v1730131237754!5m2!1sen!2sin"
  width="600"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
                </div>
              </div>
            </div>
          </div>
        

        </div>
        </div>
      </div>
      <ContactFooter /> 
    </>
  );
};

export default ContactPage;

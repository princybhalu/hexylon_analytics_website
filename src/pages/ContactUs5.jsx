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
import Navbar from "../components/Navbar";
import FooterWithTransition from "../components/Footer";

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
      <Navbar />
      <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
        {/* Previous code remains the same until contact section */}
        
        {/* Contact Section */}
        <div className="contact-section grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2
              className="text-3xl font-bold"
              style={{ color: THEME.navyBlue }}
            >
              Get in Touch
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "2500 Innovation Way, Tech District, San Francisco, CA 94105",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "contact@hexylonanalytics.com",
                },
                {
                  icon: Building,
                  title: "Business Hours",
                  content: "Mon - Fri: 9:00 AM - 6:00 PM PST",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="contact-item flex items-center p-4 rounded-lg transition-all hover:shadow-md hover:translate-x-2 bg-white"
                  style={{ opacity: 1 }}
                >
                  <div
                    className="p-3 rounded-full mr-4"
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
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <MapPin size={48} className="text-saffron animate-bounce" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-gray-800">Hexylon Analytics HQ</p>
                    <p className="text-xs text-gray-600">2500 Innovation Way, SF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterWithTransition />
    </>
  );
};

export default ContactPage;
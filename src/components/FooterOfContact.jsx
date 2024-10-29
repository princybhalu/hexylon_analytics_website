import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Brain, 
  Mail, 
  MapPin, 
  Phone,
  Linkedin,
  Twitter,
  Github,
//   Circuit
} from "lucide-react";
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);

const FooterWithTransition = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate circuit paths
      gsap.to(".circuit-path", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".transition-section",
          start: "top center",
        }
      });

      // Animate content
      gsap.fromTo(
        ".fade-up",
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".footer-content",
            start: "top bottom-=100",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Transition Section */}

      {/* Footer */}
      <footer className="bg-[#001830] text-white py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="footer-content grid md:grid-cols-4 gap-8 items-start">
            {/* Logo & Tagline */}
            <div className="fade-up md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {/* <Brain className="w-6 h-6 text-[#FF6600]" /> */}
                <img src={logo} alt="Hexylon Analytics Logo" className="w-20 h-10 mr-2" />
                <span className="text-xl font-bold">Hexylon Analytics</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering businesses with intelligent AI solutions
              </p>
            </div>

            {/* Quick Links */}
            <div className="fade-up">
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-[#FF6600] cursor-pointer transition-colors" onClick={() => navigate("/")}>Home</li>
                <li className="hover:text-[#FF6600] cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="fade-up">
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 text-gray-400">
                <Linkedin className="w-5 h-5 hover:text-[#FF6600] cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-[#FF6600] cursor-pointer transition-colors" />
                <Github className="w-5 h-5 hover:text-[#FF6600] cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fade-up border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Hexylon Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterWithTransition;
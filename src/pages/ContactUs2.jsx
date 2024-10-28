import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MapPin, Phone, Mail, Building } from 'lucide-react';

const THEME = {
  navyBlue: '#003366',
  saffron: '#FF6600',
  white: '#FFFFFF'
};

const ContactPage = () => {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    areaOfInterest: '',
    email: '',
    phone: '',
    location: '',
    industryFocus: ''
  });

  useGSAP(() => {
    gsap.from('.contact-section', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.contact-info-item', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top center'
      }
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        console.log('Form submitted:', formData);
        setFormData({
          name: '',
          companyName: '',
          areaOfInterest: '',
          email: '',
          phone: '',
          location: '',
          industryFocus: ''
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: THEME.white }}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="contact-section text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: THEME.navyBlue }}>
            Contact Hexylon Analytics
          </h1>
          <p className="text-lg" style={{ color: THEME.navyBlue }}>
            Let's discuss how we can transform your business with AI
          </p>
        </div>

        {/* Interactive Paragraph Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="contact-section bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="prose lg:prose-lg" style={{ color: THEME.navyBlue }}>
                <p className="leading-relaxed">
                  Hello! My name is{' '}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '200px' }}
                    placeholder="Your Name"
                    required
                  />
                  , and I represent{' '}
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '200px' }}
                    placeholder="Your Company Name"
                    required
                  />
                  . I'm interested in learning more about how Hexylon Analytics can help us with{' '}
                  <input
                    type="text"
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '250px' }}
                    placeholder="Your Area of Interest"
                    required
                  />
                  . You can reach me at{' '}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '200px' }}
                    placeholder="Your Email"
                    required
                  />
                  {' '}or call me at{' '}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '150px' }}
                    placeholder="Your Phone Number"
                    required
                  />
                  . Our company is currently located in{' '}
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '200px' }}
                    placeholder="Your Location"
                    required
                  />
                  , and we are specifically focused on{' '}
                  <input
                    type="text"
                    name="industryFocus"
                    value={formData.industryFocus}
                    onChange={handleChange}
                    className="inline-block px-2 py-1 border-b-2 focus:border-b-2"
                    style={{ borderColor: THEME.saffron, width: '200px' }}
                    placeholder="Your Industry/Project Focus"
                    required
                  />
                  . Looking forward to connecting!
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg transition-colors duration-200 font-medium text-white"
                style={{ backgroundColor: THEME.saffron }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="contact-section space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 contact-info">
              <h2 className="text-2xl font-bold mb-6" style={{ color: THEME.navyBlue }}>
                Get in Touch
              </h2>
              
              <div className="space-y-4">
                <div className="contact-info-item flex items-center space-x-4">
                  <MapPin style={{ color: THEME.saffron }} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium" style={{ color: THEME.navyBlue }}>Location</h3>
                    <p className="text-gray-600">123 AI Plaza, Silicon Valley, CA 94025</p>
                  </div>
                </div>

                <div className="contact-info-item flex items-center space-x-4">
                  <Phone style={{ color: THEME.saffron }} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium" style={{ color: THEME.navyBlue }}>Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="contact-info-item flex items-center space-x-4">
                  <Mail style={{ color: THEME.saffron }} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium" style={{ color: THEME.navyBlue }}>Email</h3>
                    <p className="text-gray-600">contact@hexylonanalytics.com</p>
                  </div>
                </div>

                <div className="contact-info-item flex items-center space-x-4">
                  <Building style={{ color: THEME.saffron }} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium" style={{ color: THEME.navyBlue }}>Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="contact-section bg-white rounded-xl shadow-lg p-2 h-64">
              <img 
                src="/api/placeholder/800/300"
                alt="Location Map"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
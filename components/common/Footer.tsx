import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white mt-[100px] px-20 py-16 max-md:px-5 max-md:py-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Company Description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=40&fit=crop&auto=format"
                alt="EduVibe Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-black text-lg leading-relaxed tracking-[-0.5px] mb-6 max-w-md">
              EduVibe is a revolutionary platform that connects students with experienced mentors, 
              providing personalized guidance to help students achieve their academic and career goals 
              through meaningful mentorship relationships.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black text-xl font-medium tracking-[-0.6px] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#features" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#resources" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Resources
                </a>
              </li>
              <li>
                <a 
                  href="#help" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#blog" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-black text-xl font-medium tracking-[-0.6px] mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#about" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  className="text-black text-base hover:text-gray-600 transition-colors tracking-[-0.3px]"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-6">
              <span className="text-black text-base font-medium tracking-[-0.3px]">
                Follow Us:
              </span>
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="p-2 rounded-[9px] hover:bg-gray-100 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-black" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-[9px] hover:bg-gray-100 transition-colors"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="w-5 h-5 text-black" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-[9px] hover:bg-gray-100 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-black" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-[9px] hover:bg-gray-100 transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5 text-black" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-[9px] hover:bg-gray-100 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-black" />
                </a>
              </div>
            </div>
            
            <div className="text-black text-base tracking-[-0.3px]">
              © 2024 EduVibe. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neon neon-text mb-6">KAWAKI</h2>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              target="_blank"
              href="https://github.com/kawaki50" 
              className="text-gray-400 hover:text-neon transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              target="_blank"
              href="https://www.linkedin.com/in/ayman-ait-meriem" 
              className="text-gray-400 hover:text-neon transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:aymanaitmeriem50@gmail.com" 
              className="text-gray-400 hover:text-neon transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-400 mb-6">
            <a href="#about" className="hover:text-neon transition-colors">About</a>
            <a href="#skills" className="hover:text-neon transition-colors">Skills</a>
            <a href="#projects" className="hover:text-neon transition-colors">Projects</a>
            <a href="#contact" className="hover:text-neon transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-gray-500">
            &copy; {currentYear} KAWAKI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

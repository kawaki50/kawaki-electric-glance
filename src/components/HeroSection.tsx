
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(57,255,20,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
      
      <div className="z-10 text-center px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tighter text-white">
          <span className="neon-text text-neon">KAWAKI</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Full-Stack Developer | Crafting digital experiences with precision and innovation
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            onClick={scrollToProjects}
            className="bg-neon text-black hover:bg-neon/90 animate-pulse-neon py-6 px-8 text-lg"
          >
            See My Work
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-neon text-neon hover:bg-neon/10 neon-border py-6 px-8 text-lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-10 animate-float flex justify-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-neon hover:bg-transparent hover:text-neon animate-pulse-neon"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={30} />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

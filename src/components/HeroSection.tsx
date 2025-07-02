
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = () => {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [nameComplete, setNameComplete] = useState(false);
  
  const fullName = 'KAWAKI';
  const fullDescription = 'Full-Stack Developer | Crafting digital experiences with precision and innovation';

  useEffect(() => {
    let nameIndex = 0;
    const nameTimer = setInterval(() => {
      if (nameIndex < fullName.length) {
        setDisplayedName(fullName.slice(0, nameIndex + 1));
        nameIndex++;
      } else {
        clearInterval(nameTimer);
        setNameComplete(true);
      }
    }, 200);

    return () => clearInterval(nameTimer);
  }, []);

  useEffect(() => {
    if (nameComplete) {
      let descIndex = 0;
      const descTimer = setInterval(() => {
        if (descIndex < fullDescription.length) {
          setDisplayedDescription(fullDescription.slice(0, descIndex + 1));
          descIndex++;
        } else {
          clearInterval(descTimer);
        }
      }, 50);

      return () => clearInterval(descTimer);
    }
  }, [nameComplete]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(57,255,20,0.05)_0%,rgba(0,0,0,0)_70%)]" style={{ zIndex: 2 }}></div>
      
      <div className="z-10 text-center px-4 animate-fade-in" style={{ zIndex: 3 }}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tighter text-white">
          <span className="neon-text text-neon relative">
            {displayedName}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto min-h-[3rem]">
          {displayedDescription}
          {nameComplete && displayedDescription.length < fullDescription.length && (
            <span className="animate-pulse">|</span>
          )}
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
      
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-10 animate-float flex justify-center" style={{ zIndex: 3 }}>
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

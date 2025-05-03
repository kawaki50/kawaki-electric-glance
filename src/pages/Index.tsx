
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CVDownloadSection from '@/components/CVDownloadSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ChatWidget from '@/components/ChatWidget';

const Index = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle initial hash if present
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal delay={50}>
          <CVDownloadSection />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <SkillsSection />
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <ProjectsSection />
        </ScrollReveal>
        
        <ScrollReveal delay={300}>
          <ContactSection />
        </ScrollReveal>
      </main>
      
      <Footer />
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;

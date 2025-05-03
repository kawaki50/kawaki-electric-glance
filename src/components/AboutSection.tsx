
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading">About Me</h2>
        
        <Card className="border-0 bg-secondary overflow-hidden shadow-lg">
          <CardContent className="p-6 md:p-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Hello! I'm KAWAKI, a passionate full-stack developer with a keen eye for detail and a love for creating 
              elegant, efficient solutions. With over 5 years of experience in web development, I've worked on a diverse 
              range of projects from sleek single-page applications to complex enterprise systems.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in building robust applications using modern technologies and best practices.
              Whether it's crafting responsive front-end interfaces or architecting scalable back-end systems,
              I'm dedicated to delivering high-quality code that solves real-world problems.
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or sharing knowledge through technical writing and mentoring.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;

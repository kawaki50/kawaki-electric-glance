
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollReveal from './ScrollReveal';

const CVDownloadSection = () => {
  return (
    <section id="cv-download" className="section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading">My Resume</h2>
        
        <Card className="border-0 bg-secondary overflow-hidden shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-neon">Download My CV</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get a comprehensive overview of my skills, experience, and education in a downloadable format.
                </p>
              </div>
              
              <Button 
                className="bg-neon text-black hover:bg-neon/90 py-6 px-8 text-lg gap-2 animate-glow"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <FileDown size={24} />
                Download CV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CVDownloadSection;

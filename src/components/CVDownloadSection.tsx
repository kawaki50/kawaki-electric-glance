
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Image } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollReveal from './ScrollReveal';

const CVDownloadSection = () => {
  return (
    <section id="cv-download" className="section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading">My Documents</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Card */}
          <Card className="border-0 bg-secondary overflow-hidden shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4">
                  <FileDown size={48} className="mx-auto text-neon" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-neon">Resume</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Get a comprehensive overview of my skills, experience, and education.
                </p>
                
                <Button 
                  className="bg-neon text-black hover:bg-neon/90 py-4 px-6 text-lg gap-2 animate-glow w-full"
                  onClick={() => window.open('/public/AIT MERIEM AYMAN (CV2).pdf', '_blank')}
                >
                  <FileDown size={20} />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Graphic Card */}
          <Card className="border-0 bg-secondary overflow-hidden shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4">
                  <Image size={48} className="mx-auto text-neon" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-neon">Portfolio Graphic</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Visual showcase of my projects and design work in a graphic format.
                </p>
                
                <Button 
                  className="bg-neon text-black hover:bg-neon/90 py-4 px-6 text-lg gap-2 animate-glow w-full"
                  onClick={() => window.open('/portfolio-graphic.pdf', '_blank')}
                >
                  <Image size={20} />
                  Download Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CVDownloadSection;

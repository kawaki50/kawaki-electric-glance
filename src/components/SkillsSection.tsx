
import React from 'react';
import { developmentSkills, multimediaSkills } from '@/data/skillsData';
import SkillCard from '@/components/skills/SkillCard';
import MultimediaSkillCard from '@/components/skills/MultimediaSkillCard';
import SkillsCategorySummary from '@/components/skills/SkillsCategorySummary';
import FloatingElements from '@/components/skills/FloatingElements';

const SkillsSection = () => {
  return (
    <section id="skills" className="section-container bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Languages & Frameworks</h2>
        
        {/* Animated Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {developmentSkills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
        
        <FloatingElements />
        
        <SkillsCategorySummary skills={developmentSkills} />
        
        {/* Multimedia & Design Skills Section */}
        <div className="mt-20">
          <h3 className="section-heading text-center">Multimedia & Design</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {multimediaSkills.map((skill, index) => (
              <MultimediaSkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

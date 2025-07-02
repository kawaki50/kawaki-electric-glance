
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skill } from '@/types/skills';
import { getCategoryIcon } from '@/data/skillsData';

interface SkillsCategorySummaryProps {
  skills: Skill[];
}

const SkillsCategorySummary: React.FC<SkillsCategorySummaryProps> = ({ skills }) => {
  const categories = ['Frontend', 'Backend', 'Database', 'Language'] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {categories.map((category, index) => {
        const categorySkills = skills.filter(skill => skill.category === category);
        return (
          <Card 
            key={category}
            className="border-0 bg-secondary/50 hover:bg-secondary group transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2 group-hover:animate-spin">
                {getCategoryIcon(category)}
              </div>
              <h4 className="font-semibold text-neon">{category}</h4>
              <p className="text-sm text-gray-400">{categorySkills.length} Skills</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SkillsCategorySummary;

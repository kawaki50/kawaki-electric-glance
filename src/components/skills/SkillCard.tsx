
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skill } from '@/types/skills';
import { getCategoryIcon } from '@/data/skillsData';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  return (
    <Card 
      className="border-0 bg-black/50 hover:bg-black/70 group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-3"
      style={{
        animationDelay: `${skill.delay}s`,
        animation: `fade-in-up 0.8s ease-out forwards ${skill.delay}s, float 6s ease-in-out infinite ${skill.delay + 2}s`
      }}
    >
      <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center relative">
        {/* Animated Background Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${skill.color}, transparent)`,
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Category Icon */}
        <div className="text-2xl mb-2 group-hover:animate-bounce">
          {getCategoryIcon(skill.category)}
        </div>
        
        {/* Skill Name */}
        <h3 
          className="text-lg font-bold transition-all duration-300 group-hover:scale-110 group-hover:neon-text"
          style={{ 
            color: skill.color,
            textShadow: `0 0 10px ${skill.color}40`
          }}
        >
          {skill.name}
        </h3>
        
        {/* Category Badge */}
        <span className="text-xs text-gray-400 mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {skill.category}
        </span>
        
        {/* Animated Border */}
        <div 
          className="absolute inset-0 border-2 border-transparent group-hover:border-current rounded-lg transition-all duration-500"
          style={{ 
            borderColor: `${skill.color}60`,
            boxShadow: `inset 0 0 20px ${skill.color}20`
          }}
        />
      </CardContent>
    </Card>
  );
};

export default SkillCard;

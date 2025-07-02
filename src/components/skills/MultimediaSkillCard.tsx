
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MultimediaSkill } from '@/types/skills';

interface MultimediaSkillCardProps {
  skill: MultimediaSkill;
  index: number;
}

const MultimediaSkillCard: React.FC<MultimediaSkillCardProps> = ({ skill, index }) => {
  return (
    <Card 
      className="border-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 hover:from-purple-800/70 hover:to-pink-800/70 group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
      style={{
        animationDelay: `${skill.delay}s`,
        animation: `fade-in-up 0.8s ease-out forwards ${skill.delay}s`
      }}
    >
      <CardContent className="p-6 text-center relative">
        {/* Pulsing Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        
        {/* Icon with Pulse Animation */}
        <div className="text-4xl mb-3 group-hover:animate-pulse relative z-10">
          {skill.icon}
        </div>
        
        {/* Skill Name */}
        <h4 className="text-lg font-bold text-purple-300 group-hover:text-purple-100 transition-colors duration-300 relative z-10">
          {skill.name}
        </h4>
        
        {/* Description */}
        <p className="text-sm text-gray-400 group-hover:text-gray-300 mt-2 transition-colors duration-300 relative z-10">
          {skill.description}
        </p>
        
        {/* Animated Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/50 rounded-lg transition-all duration-500" />
      </CardContent>
    </Card>
  );
};

export default MultimediaSkillCard;

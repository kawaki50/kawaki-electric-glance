
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Language';
  color: string;
  delay: number;
}

const SkillsSection = () => {
  const skills: Skill[] = [
    { name: 'HTML', category: 'Frontend', color: '#E34F26', delay: 0 },
    { name: 'CSS', category: 'Frontend', color: '#1572B6', delay: 0.2 },
    { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', delay: 0.4 },
    { name: 'React.js', category: 'Frontend', color: '#61DAFB', delay: 0.6 },
    { name: 'jQuery', category: 'Frontend', color: '#0769AD', delay: 0.8 },
    { name: 'Ajax', category: 'Frontend', color: '#39ff14', delay: 1.0 },
    { name: 'PHP', category: 'Backend', color: '#777BB4', delay: 1.2 },
    { name: 'Python', category: 'Backend', color: '#3776AB', delay: 1.4 },
    { name: 'Java', category: 'Language', color: '#ED8B00', delay: 1.6 },
    { name: 'MySQL', category: 'Database', color: '#4479A1', delay: 1.8 },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return '🎨';
      case 'Backend':
        return '⚙️';
      case 'Database':
        return '🗄️';
      case 'Language':
        return '💻';
      default:
        return '🚀';
    }
  };

  return (
    <section id="skills" className="section-container bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Languages & Frameworks</h2>
        
        {/* Animated Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {skills.map((skill, index) => (
            <Card 
              key={index}
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
          ))}
        </div>
        
        {/* Floating Animation Elements */}
        <div className="relative mt-16 h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-neon rounded-full opacity-30"
                style={{
                  left: `${15 + i * 15}%`,
                  animation: `float 4s ease-in-out infinite ${i * 0.5}s, fade-in 2s ease-out ${i * 0.3}s`
                }}
              />
            ))}
          </div>
          
          {/* Animated Text */}
          <div className="text-center pt-8">
            <p className="text-lg text-gray-300 animate-pulse">
              Building amazing web experiences with cutting-edge technologies
            </p>
          </div>
        </div>
        
        {/* Skills Categories Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {['Frontend', 'Backend', 'Database', 'Language'].map((category, index) => {
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
      </div>
    </section>
  );
};

export default SkillsSection;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SkillCategory {
  title: string;
  skills: string[];
}

const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        "HTML5 & CSS3",
        "JavaScript (ES6+)",
        "TypeScript",
        "React.js",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "SCSS/SASS",
        "Redux",
        "Responsive Design"
      ]
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express",
        "Python",
        "Django",
        "PHP",
        "Laravel",
        "RESTful APIs",
        "GraphQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB"
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        "Git & GitHub",
        "Docker",
        "AWS",
        "Firebase",
        "CI/CD",
        "Jest",
        "Cypress",
        "Webpack",
        "Agile/Scrum",
        "System Design"
      ]
    }
  ];

  return (
    <section id="skills" className="section-container bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="border-0 bg-secondary hover:border-neon/40 hover:shadow-lg hover:shadow-neon/10 transition-all duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-neon">{category.title}</h3>
                
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li 
                      key={skillIndex} 
                      className="flex items-center text-gray-300"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-neon mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

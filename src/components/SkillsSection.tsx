
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Palette, Film, Brush, Image, PaintRoller, Layers } from 'lucide-react';

interface SkillCategory {
  title: string;
  skills: string[];
}

interface MultimediaSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
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

  const multimediaSkills: MultimediaSkill[] = [
    {
      name: "Adobe Photoshop",
      icon: <Image className="text-neon" />,
      description: "Photo editing, digital painting, and image manipulation"
    },
    {
      name: "Adobe Illustrator",
      icon: <Palette className="text-neon" />,
      description: "Vector graphics, logo design, and illustrations"
    },
    {
      name: "Adobe InDesign",
      icon: <Layers className="text-neon" />,
      description: "Print layouts, brochures, and publication design"
    },
    {
      name: "Adobe After Effects",
      icon: <Film className="text-neon" />,
      description: "Motion graphics, visual effects, and animations"
    },
    {
      name: "Sketch/Figma",
      icon: <PaintRoller className="text-neon" />,
      description: "UI/UX design, wireframing, and prototyping"
    },
    {
      name: "Graphic Design",
      icon: <Brush className="text-neon" />,
      description: "Charte graphique, branding, and visual identity"
    }
  ];

  const skillImages = [
    "/skills/html-css.webp",
    "/skills/javascript.webp",
    "/skills/react.webp",
    "/skills/node.webp",
    "/skills/python.webp",
    "/skills/database.webp"
  ];

  return (
    <section id="skills" className="section-container bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Skills & Expertise</h2>
        
        {/* Animated Skill Images Carousel */}
        <div className="mb-12">
          <Carousel
            opts={{
              align: "center",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {skillImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="border-0 bg-black/50 overflow-hidden h-full hover:shadow-lg hover:shadow-neon/20 transition-all duration-500">
                      <div className="aspect-square relative overflow-hidden group">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                          style={{ 
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 bg-neon/20 border-neon hover:bg-neon hover:text-black" />
            <CarouselNext className="-right-4 bg-neon/20 border-neon hover:bg-neon hover:text-black" />
          </Carousel>
        </div>
        
        {/* Development Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
        
        {/* Multimedia & Design Skills */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-neon">Multimedia & Design</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {multimediaSkills.map((skill, index) => (
              <Card 
                key={index} 
                className="border-0 bg-secondary hover:shadow-lg hover:shadow-neon/10 group transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 group-hover:animate-pulse-neon">
                    {skill.icon}
                  </div>
                  <h4 className="text-xl font-medium mb-2">{skill.name}</h4>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

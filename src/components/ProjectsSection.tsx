
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  image: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "Quantum Task Manager",
      description: "A sophisticated task management application with real-time updates, user authentication, and a responsive UI. Features drag-and-drop functionality and data visualization.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Chart.js"],
      demoUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "Echo E-commerce Platform",
      description: "A complete e-commerce solution with inventory management, payment processing, and an admin dashboard. Includes user reviews and recommendation algorithms.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Stripe API", "JWT Auth"],
      demoUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      title: "Nebula Social Network",
      description: "A modern social network application with real-time messaging, user profiles, and content sharing. Features a sophisticated friend recommendation system.",
      technologies: ["TypeScript", "Next.js", "GraphQL", "Firebase", "TailwindCSS"],
      demoUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Horizon Weather App",
      description: "A sleek weather forecasting application with location tracking, historical data visualization, and severe weather alerts. Features a minimalist interface.",
      technologies: ["React Native", "Redux", "Weather API", "Geolocation", "D3.js"],
      demoUrl: "#",
      githubUrl: "#",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    }
  ];

  return (
    <section id="projects" className="section-container">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="border border-gray-800 bg-secondary hover:border-neon/40 hover:shadow-lg hover:shadow-neon/10 transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  {project.technologies.join(" • ")}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-gray-300">{project.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-4 border-t border-gray-800">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-neon/70 text-neon hover:bg-neon/10"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github size={16} /> Code
                  </a>
                </Button>
                
                <Button 
                  size="sm"
                  className="bg-neon text-black hover:bg-neon/90"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Live Demo <ArrowRight size={16} />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;


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
      title: "MEUBLEA - Furniture Store",
      description: "A modern furniture e-commerce platform with a sleek design, and a shopping cart. Features product filtering and a secure checkout process.",
      technologies: ["HTML", "CSS","JavaScript", "BOOTSTRAP"],
      demoUrl: "https://meublea.netlify.app/",
      githubUrl: "https://github.com/kawaki50/MEUBLEA",
      image: "/public/img/MEUBLEA.png"
    },
    {
      title: "ARMAZON - Arme Store",
      description: "An advanced e-commerce application for firearms, featuring user authentication, product reviews, and a secure payment gateway.",
      technologies: ["HTML", "CSS", "SCSS","JavaScript","JQUERY", "BOOTSTRAP", "PHP", "MySQL"],
      demoUrl: "#",
      githubUrl: "https://github.com/kawaki50/ARMAZONE",
      image: "/public/img/ARMAZONE.png"
    },
    {
      title: "TOOLHUB - Tool Store",
      description: "A comprehensive tool e-commerce site with a user-friendly interface, login user, cart management, advanced search functionality, and a robust admin panel for inventory management.",
      technologies: ["REACT JS", "VITE", "CSS", "PHP", "MySQL"],
      demoUrl: "#",
      githubUrl: "https://github.com/kawaki50/TOOLHUB",
      image: "/public/img/TOOLHUB.png"
    },
    {
      title: "LA PRIMEUR - Primeur Store",
      description: "A fresh produce e-commerce platform with a vibrant design, featuring product categories, a shopping cart, and a secure checkout process.",
      technologies: ["HTML", "CSS", "JavaScript","JQUERY", "BOOTSTRAP", "PHP", "MySQL"],
      demoUrl: "#",
      githubUrl: "https://github.com/kawaki50/LA-PRIMEUR",
      image: "/public/img/LA PRIMEUR.png"
    },
    {
      title: "MEPORT - Travel & booking website",
      description: "A travel booking website that allows users to search for and book flights, hotels, and match tickets. It features a user-friendly interface, real-time availability, and secure payment processing.",
      technologies: ["HTML", "CSS", "JavaScript","JQUERY", "BOOTSTRAP","AJAX", "PHP", "MySQL", "API", "COMPOSER", "Stripe"],
      demoUrl: "#",
      githubUrl: "https://github.com/kawaki50/MEPORT",
      image: "/public/img/MEPORT.png"
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

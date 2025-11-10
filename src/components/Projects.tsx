import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import manufacturingImg from "@/assets/project-manufacturing.jpg";
import supplyChainImg from "@/assets/project-supply-chain.jpg";
import equipmentImg from "@/assets/project-equipment.jpg";
import qualityImg from "@/assets/project-quality.jpg";

const Projects = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 'equipment',
      title: t('projects.equipment.title'),
      description: t('projects.equipment.desc'),
      image: equipmentImg
    },
    {
      id: 'manufacturing',
      title: t('projects.manufacturing.title'),
      description: t('projects.manufacturing.desc'),
      image: manufacturingImg
    },
    {
      id: 'quality',
      title: t('projects.quality.title'),
      description: t('projects.quality.desc'),
      image: qualityImg
    },
    {
      id: 'supply',
      title: t('projects.supply.title'),
      description: t('projects.supply.desc'),
      image: supplyChainImg
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg transition-all duration-300 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  {t('projects.readMore')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

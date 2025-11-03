import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import manufacturingImg from "@/assets/project-manufacturing.jpg";
import supplyChainImg from "@/assets/project-supply-chain.jpg";
import equipmentImg from "@/assets/project-equipment.jpg";
import qualityImg from "@/assets/project-quality.jpg";

const Projects = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      title: t('projects.equipment.title'),
      description: t('projects.equipment.desc'),
      image: equipmentImg
    },
    {
      title: t('projects.manufacturing.title'),
      description: t('projects.manufacturing.desc'),
      image: manufacturingImg
    },
    {
      title: t('projects.quality.title'),
      description: t('projects.quality.desc'),
      image: qualityImg
    },
    {
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
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

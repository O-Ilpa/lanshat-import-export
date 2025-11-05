import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import manufacturingImg from "@/assets/project-manufacturing.jpg";
import supplyChainImg from "@/assets/project-supply-chain.jpg";
import equipmentImg from "@/assets/project-equipment.jpg";
import qualityImg from "@/assets/project-quality.jpg";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const projectsData: Record<string, any> = {
    equipment: {
      title: t('projects.equipment.title'),
      description: t('projects.equipment.desc'),
      detailedDescription: t('projects.equipment.detailed'),
      images: [equipmentImg, manufacturingImg, qualityImg],
      stats: [
        { label: t('projects.stats.completion'), value: "95%" },
        { label: t('projects.stats.satisfaction'), value: "98%" },
        { label: t('projects.stats.timeline'), value: t('projects.stats.onTime') }
      ]
    },
    manufacturing: {
      title: t('projects.manufacturing.title'),
      description: t('projects.manufacturing.desc'),
      detailedDescription: t('projects.manufacturing.detailed'),
      images: [manufacturingImg, equipmentImg, supplyChainImg],
      stats: [
        { label: t('projects.stats.completion'), value: "92%" },
        { label: t('projects.stats.satisfaction'), value: "96%" },
        { label: t('projects.stats.timeline'), value: t('projects.stats.onTime') }
      ]
    },
    quality: {
      title: t('projects.quality.title'),
      description: t('projects.quality.desc'),
      detailedDescription: t('projects.quality.detailed'),
      images: [qualityImg, equipmentImg, manufacturingImg],
      stats: [
        { label: t('projects.stats.completion'), value: "97%" },
        { label: t('projects.stats.satisfaction'), value: "99%" },
        { label: t('projects.stats.timeline'), value: t('projects.stats.onTime') }
      ]
    },
    supply: {
      title: t('projects.supply.title'),
      description: t('projects.supply.desc'),
      detailedDescription: t('projects.supply.detailed'),
      images: [supplyChainImg, manufacturingImg, qualityImg],
      stats: [
        { label: t('projects.stats.completion'), value: "94%" },
        { label: t('projects.stats.satisfaction'), value: "97%" },
        { label: t('projects.stats.timeline'), value: t('projects.stats.onTime') }
      ]
    }
  };

  const project = projectsData[projectId || ''];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('projects.notFound')}</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('projects.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('projects.backToHome')}
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {project.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {project.images.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative h-96 overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{t('projects.stats.title')}</h2>
              <div className="space-y-4">
                {project.stats.map((stat: any, index: number) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{t('projects.details')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.detailedDescription}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;
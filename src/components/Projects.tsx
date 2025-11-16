import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import aboHashem1 from "@/assets/projects/aboHashem1.jpg"
import stone1 from "@/assets/projects/stone1.jpg";
import alSanhori1 from "@/assets/projects/alSanhori1.jpg";
import power1 from "@/assets/projects/power2.jpg";


const Projects: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  /**
   * Each item uses:
   * - id: the route slug used by ProjectDetail (useParams -> projectId)
   * - tKey: the camelCase key under translations.projects.clients (used for titles/descs)
   * - image: visual thumbnail (reuse available images for placeholders)
   */
  const projects = [
    {
      id: "abo-hashem",
      tKey: "aboHashem",
      image: aboHashem1,
    },
    {
      id: "alsanhouri",
      tKey: "alsanhouri",
      image: alSanhori1,
    },
    {
      id: "almostakbal",
      tKey: "almostakbal",
      image: aboHashem1,
    },
    {
      id: "government",
      tKey: "government",
      image: aboHashem1,
    },
    {
      id: "stone", 
      tKey: "stone",
      image: stone1,
    },
    {
      id: "power", 
      tKey: "power",
      image: power1,
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const titleKey = `projects.clients.${project.tKey}.title`;
            const descKey = `projects.clients.${project.tKey}.desc`;
            return (
              <Card
                key={project.id}
                className="border-border rounded-none hover:shadow-lg transition-all duration-300 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(titleKey)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl mb-2">
                    {t(titleKey)}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t(descKey)}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full group"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    {t("projects.readMore")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

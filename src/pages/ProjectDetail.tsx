import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, CheckCircle, Clock, Flag } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import aboHashem1 from "@/assets/projects/aboHashem1.jpg";
import aboHashem2 from "@/assets/projects/aboHashem2.jpg";
import aboHashem3 from "@/assets/projects/aboHashem3.jpg";
import alSanhori1 from "@/assets/projects/alSanhori1.jpg";
import alSanhori2 from "@/assets/projects/alSanhori2.jpg";
import alSanhori4 from "@/assets/projects/alSanhori2.jpeg";
import alSanhori3 from "@/assets/projects/alSanhori3.jpeg";
import alMostakbl1 from "@/assets/projects/alMostakbl1.jpg";
import alMostakbl2 from "@/assets/projects/alMostakbl2.jpg";
import alMostakbl3 from "@/assets/projects/alMostakbl3.jpg";
import gov1 from "@/assets/projects/gov1.jpg";
import gov2 from "@/assets/projects/gov2.jpg";
import gov3 from "@/assets/projects/gov3.jpg";
import stone1 from "@/assets/projects/stone1.jpg";
import stone2 from "@/assets/projects/stone2.jpg";
import stone3 from "@/assets/projects/stone3.jpg";
import gen1 from "@/assets/projects/gen1.jpg";
import gen2 from "@/assets/projects/gen2.jpg";
import gen3 from "@/assets/projects/gen3.jpg";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // helper to provide a readable fallback if translation key is missing
  const withFallback = (key: string, fallback: string) => {
    try {
      const translated = t(key);
      // many i18n helpers return the key itself when missing — use fallback in that case
      if (!translated || translated === key) return fallback;
      return translated;
    } catch (err) {
      return fallback;
    }
  };

  // Projects data — uses translation keys so you can keep all copy in your translation files.
  // Add these keys to your i18n JSONs under projects.clients.* for bilingual content.
  const projectsData: Record<string, any> = {
    "abo-hashem": {
      title: withFallback(
        "projects.clients.aboHashem.title",
        "Abo Hashem Logistics"
      ),
      description: withFallback(
        "projects.clients.aboHashem.desc",
        "Comprehensive logistics and multi-level warehouse lifting systems (heavy hydraulic platforms and light goods elevators)."
      ),
      detailedDescription: withFallback(
        "projects.clients.aboHashem.detailed",
        "Delivered a turnkey logistics enhancement: installed heavy-duty hydraulic lifting platforms alongside standard elevators to improve throughput, safety, and operational flexibility across a multi-level warehouse."
      ),
      keyPoints: t("projects.clients.aboHashem.keyPoints") || [],
      images: [aboHashem1, aboHashem2, aboHashem3],
      stats: [
        { label: t("projects.stats.completion"), value: "93%" },
        { label: t("projects.stats.satisfaction"), value: "96%" },
        {
          label: t("projects.stats.timeline"),
          value: t("projects.stats.onTime"),
        },
      ],
    },

    alsanhouri: {
      title: withFallback(
        "projects.clients.alsanhouri.title",
        "Alsanhouri Chemicals"
      ),
      description: withFallback(
        "projects.clients.alsanhouri.desc",
        "Supply and assembly of reliable new and reconditioned chemical processing equipment."
      ),
      detailedDescription: withFallback(
        "projects.clients.alsanhouri.detailed",
        "Supplied and assembled a mix of new and refurbished process equipment, ensuring compatibility with existing lines and prioritizing operational reliability and safety standards."
      ),
      keyPoints: t("projects.clients.alsanhouri.keyPoints") || [],
      images: [alSanhori1, alSanhori2, alSanhori3, alSanhori4],
      stats: [
        { label: t("projects.stats.completion"), value: "90%" },
        { label: t("projects.stats.satisfaction"), value: "95%" },
        {
          label: t("projects.stats.timeline"),
          value: t("projects.stats.onTime"),
        },
      ],
    },

    almostakbal: {
      title: withFallback("projects.clients.almostakbal.title", "Almostakbal"),
      description: withFallback(
        "projects.clients.almostakbal.desc",
        "Assembly and supply of machines and raw materials for packaging production."
      ),
      detailedDescription: withFallback(
        "projects.clients.almostakbal.detailed",
        "Delivered complete packaging production setups — from sourcing machinery and raw materials to on-site assembly, commissioning, and calibration for immediate production use."
      ),
      keyPoints: t("projects.clients.almostakbal.keyPoints") || [],
      images: [stone1],
      stats: [
        { label: t("projects.stats.completion"), value: "92%" },
        { label: t("projects.stats.satisfaction"), value: "97%" },
        {
          label: t("projects.stats.timeline"),
          value: t("projects.stats.onTime"),
        },
      ],
    },

    government: {
      title: withFallback(
        "projects.clients.government.title",
        "Government Projects"
      ),
      description: withFallback(
        "projects.clients.government.desc",
        "Supply and on-site assembly of asphalt and concrete stations for public infrastructure."
      ),
      detailedDescription: withFallback(
        "projects.clients.government.detailed",
        "Executed sourcing, logistics, and assembly for asphalt and concrete batching stations to support government infrastructure projects, meeting regulatory and quality requirements."
      ),
      keyPoints: t("projects.clients.government.keyPoints") || [],
      images: [stone1],
      stats: [
        { label: t("projects.stats.completion"), value: "89%" },
        { label: t("projects.stats.satisfaction"), value: "94%" },
        {
          label: t("projects.stats.timeline"),
          value: t("projects.stats.onTime"),
        },
      ],
    },

    stone: {
      title: withFallback(
        "projects.clients.stone.title",
        "Stone Crushing & Classification"
      ),
      description: withFallback(
        "projects.clients.stone.desc",
        "Implementation of stone crushing and classification stations for construction materials."
      ),
      detailedDescription: withFallback(
        "projects.clients.stone.detailed",
        "Turnkey delivery of crushing and classification equipment, configured for optimal throughput and material grading — suitable for aggregate and construction material operations."
      ),
      keyPoints: t("projects.clients.stone.keyPoints") || [],
      images: [stone1, stone2, stone3],
      stats: [
        { label: t("projects.stats.completion"), value: "88%" },
        { label: t("projects.stats.satisfaction"), value: "92%" },
        {
          label: t("projects.stats.timeline"),
          value: t("projects.stats.onTime"),
        },
      ],
    },

    power: {
      title: withFallback(
        "projects.clients.power.title",
        "Power Generators & Standalone Units"
      ),
      description: withFallback(
        "projects.clients.power.desc",
        "Supply and commissioning of industrial power generator units and standalone energy solutions."
      ),
      detailedDescription: withFallback(
        "projects.clients.power.detailed",
        "Supplied and commissioned high-performance generator sets and standalone power solutions, including load testing and handover documentation for reliable long-term operation."
      ),
      keyPoints: t("projects.clients.power.keyPoints") || [],
      images: [stone1],
      stats: [
        { label: t("projects.stats.completion"), value: "91%" },
        { label: t("projects.stats.satisfaction"), value: "95%" },
        {
          label: t("projects.stats.timeline"),
          value: t("projects.stats.onTime"),
        },
      ],
    },
  };

  const project = projectsData[projectId || ""];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("projects.notFound")}</h1>
          <Button onClick={() => navigate("/")}>
            {t("projects.backToHome")}
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
          onClick={() => navigate("/")}
          className="mb-8"
        >
          {t("projects.backToHome")}
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
              <Carousel className="w-full flex">
                <CarouselContent dir={language === "ar" ? "ltr" : "ltr"}>
                  {project.images.map((image: string, index: number) => (
                    <CarouselItem key={index} className="basis-full">
                      <div 
                        className="relative h-96 overflow-hidden basis-full min-w-full cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setSelectedImageIndex(index);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
              </Carousel>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {t("projects.details")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 mb-6">
                {project.detailedDescription}
              </p>
              {project.keyPoints && (
                <ul className="space-y-2">
                  {project.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={lightboxOpen} onOpenChange={(open) => {
          setLightboxOpen(open);
          if (!open) setImageZoom(1);
        }}>
          <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black/95">
            <Carousel className="w-full h-full flex items-center justify-center" opts={{ startIndex: selectedImageIndex }}>
              <CarouselContent className="h-full" dir={language === "ar" ? "ltr" : "ltr"}>
                {project.images.map((image: string, index: number) => (
                  <CarouselItem key={index} className="basis-full flex items-center justify-center overflow-auto">
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      className="max-h-[85vh] max-w-full object-contain cursor-zoom-in transition-transform"
                      style={{ transform: `scale(${imageZoom})` }}
                      onClick={() => setImageZoom(prev => prev === 1 ? 2 : 1)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="right-4" />
              <CarouselPrevious className="left-4" />
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectDetail;

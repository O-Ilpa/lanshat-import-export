import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-industrial.jpg";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Industrial facility" 
          className="w-full h-full object-cover opacity-10"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group">
              <a href="#contact">
                {t('hero.cta')}
                </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#consultation">{t('hero.bookConsultation')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

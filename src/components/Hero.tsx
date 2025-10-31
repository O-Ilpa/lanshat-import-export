import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";

const Hero = () => {
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
            Expert Consultation for Industrial Excellence
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Streamline your operations with our specialized industrial services and importing solutions. 
            We transform complex challenges into seamless opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group">
              <a href="#contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#services">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

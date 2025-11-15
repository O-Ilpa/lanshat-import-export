import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, Ship, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Factory,
      title: t('services.industrial.title'),
      description: t('services.industrial.desc'),
      features: [
        t('services.industrial.1'),
        t('services.industrial.2'),
        t('services.industrial.3')
      ]
    },
    {
      icon: Ship,
      title: t('services.importing.title'),
      description: t('services.importing.desc'),
      features: [
        t('services.importing.1'),
        t('services.importing.2'),
        t('services.importing.3')
      ]
    },
    {
      icon: TrendingUp,
      title: t('services.consulting.title'),
      description: t('services.consulting.desc'),
      features: [
        t('services.consulting.1'),
        t('services.consulting.2'),
        t('services.consulting.3')
      ]
    }
  ];
  
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12  bg-accent/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex font-semibold items-center text-sm text-muted-foreground ">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent m-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

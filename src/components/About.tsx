import { CheckCircle2 } from "lucide-react";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const { count: projectsCount, elementRef: projectsRef } = useCountAnimation(500);
  const { count: satisfactionCount, elementRef: satisfactionRef } = useCountAnimation(98);
  const { count: countriesCount, elementRef: countriesRef } = useCountAnimation(35);

  const benefits = [
    t('about.benefit.1'),
    t('about.benefit.2'),
    t('about.benefit.3'),
    t('about.benefit.4'),
    t('about.benefit.5'),
    t('about.benefit.6')
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center animate-fade-in">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.subtitle')}
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mx-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 rounded-2xl p-12 border border-border">
            <div className="space-y-8">
              <div ref={projectsRef}>
                <div className="text-5xl font-bold text-foreground mb-2">{projectsCount}+</div>
                <div className="text-muted-foreground">{t('about.stats.projects')}</div>
              </div>
              <div ref={satisfactionRef}>
                <div className="text-5xl font-bold text-foreground mb-2">{satisfactionCount}%</div>
                <div className="text-muted-foreground">{t('about.stats.satisfaction')}</div>
              </div>
              <div ref={countriesRef}>
                <div className="text-5xl font-bold text-foreground mb-2">{countriesCount}+</div>
                <div className="text-muted-foreground">{t('about.stats.countries')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

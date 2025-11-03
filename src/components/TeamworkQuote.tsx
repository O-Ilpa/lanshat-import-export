import { useLanguage } from "@/contexts/LanguageContext";
import teamworkImage from "@/assets/teamwork-quote.jpg";

const TeamworkQuote = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${teamworkImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-relaxed mb-6">
            "{t('teamwork.quote')}"
          </blockquote>
          <cite className="text-xl text-muted-foreground not-italic">
            {t('teamwork.author')}
          </cite>
        </div>
      </div>
    </section>
  );
};

export default TeamworkQuote;

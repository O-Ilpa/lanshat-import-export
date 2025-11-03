import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-semibold text-foreground tracking-tight">
          {t('header.brandName')}
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('header.services')}
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('header.about')}
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('header.contact')}
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            <span className="text-sm">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </Button>
          <Button asChild variant="default" size="sm">
            <a href="#contact">{t('header.getStarted')}</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

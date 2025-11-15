import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Omar Ilpa",
      role: t("testimonials.roles.me"),
      content: t("testimonials.omar"),
    },
    {
      name: "Mohamed Ilpa",
      role: t("testimonials.roles.ceo"),
      content: t("testimonials.mohamed"),
    },
    {
      name: "Abdelkareem Ilpa",
      role: t("testimonials.roles.specialist"),
      content: t("testimonials.abdelkareem"),
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-fade-in hover-scale">
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-primary mb-4" />
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

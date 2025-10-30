import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, Ship, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Factory,
    title: "Industrial Services",
    description: "Comprehensive solutions for manufacturing optimization, process improvement, and operational efficiency.",
    features: ["Process Optimization", "Quality Management", "Safety Compliance"]
  },
  {
    icon: Ship,
    title: "Importing Services",
    description: "End-to-end import management, logistics coordination, and customs compliance for seamless global trade.",
    features: ["Logistics Coordination", "Customs Clearance", "Supply Chain Management"]
  },
  {
    icon: TrendingUp,
    title: "Strategic Consulting",
    description: "Data-driven insights and strategic planning to accelerate growth and maximize operational performance.",
    features: ["Market Analysis", "Risk Assessment", "Growth Strategy"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored solutions that drive efficiency, reduce costs, and accelerate your business growth
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
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
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
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3"></span>
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

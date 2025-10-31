import { CheckCircle2 } from "lucide-react";
import { useCountAnimation } from "@/hooks/useCountAnimation";

const benefits = [
  "20+ years of combined industry expertise",
  "Global network of trusted partners",
  "Customized solutions for your unique needs",
  "Proven track record of successful projects"
];

const About = () => {
  const { count: projectsCount, elementRef: projectsRef } = useCountAnimation(500);
  const { count: satisfactionCount, elementRef: satisfactionRef } = useCountAnimation(98);
  const { count: countriesCount, elementRef: countriesRef } = useCountAnimation(35);

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center animate-fade-in">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We combine deep industry knowledge with innovative solutions to help businesses 
              navigate the complexities of industrial operations and international trade.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 rounded-2xl p-12 border border-border">
            <div className="space-y-8">
              <div ref={projectsRef}>
                <div className="text-5xl font-bold text-foreground mb-2">{projectsCount}+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div ref={satisfactionRef}>
                <div className="text-5xl font-bold text-foreground mb-2">{satisfactionCount}%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div ref={countriesRef}>
                <div className="text-5xl font-bold text-foreground mb-2">{countriesCount}+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

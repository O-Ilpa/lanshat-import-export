import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import manufacturingImg from "@/assets/project-manufacturing.jpg";
import supplyChainImg from "@/assets/project-supply-chain.jpg";
import equipmentImg from "@/assets/project-equipment.jpg";
import qualityImg from "@/assets/project-quality.jpg";

const projects = [
  {
    title: "Global Manufacturing Optimization",
    client: "TechCorp Industries",
    description: "Streamlined production processes across 5 facilities, reducing operational costs by 32% while improving output quality and safety compliance.",
    category: "Industrial Services",
    year: "2024",
    tags: ["Process Optimization", "Cost Reduction", "Safety"],
    image: manufacturingImg
  },
  {
    title: "International Supply Chain Integration",
    client: "Pacific Trade Group",
    description: "Established comprehensive import operations from 12 countries, implementing customs compliance systems and reducing delivery times by 45%.",
    category: "Importing Services",
    year: "2023",
    tags: ["Logistics", "Compliance", "Supply Chain"],
    image: supplyChainImg
  },
  {
    title: "Industrial Equipment Sourcing",
    client: "Midwest Manufacturing Co.",
    description: "Coordinated procurement and importation of specialized machinery from European suppliers, managing all logistics and installation coordination.",
    category: "Importing Services",
    year: "2023",
    tags: ["Equipment", "Procurement", "Installation"],
    image: equipmentImg
  },
  {
    title: "Quality Management System Implementation",
    client: "Advanced Materials Ltd.",
    description: "Designed and implemented ISO-certified quality management framework, achieving 99.7% product consistency and reducing waste by 28%.",
    category: "Industrial Services",
    year: "2024",
    tags: ["Quality Management", "ISO Certification", "Waste Reduction"],
    image: qualityImg
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering measurable results for clients across industries
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg transition-all duration-300 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {project.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-base text-accent font-medium">
                  {project.client}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

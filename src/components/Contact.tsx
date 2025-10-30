import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to optimize your operations? Get in touch with our team today.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="text-foreground font-medium">contact@consultco.com</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">Phone</div>
              <div className="text-foreground font-medium">+1 (555) 123-4567</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">Office</div>
              <div className="text-foreground font-medium">New York, NY</div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input placeholder="Your Name" className="bg-background" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" className="bg-background" />
                </div>
              </div>
              <div>
                <Input placeholder="Subject" className="bg-background" />
              </div>
              <div>
                <Textarea 
                  placeholder="Tell us about your project" 
                  className="bg-background min-h-[150px]"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

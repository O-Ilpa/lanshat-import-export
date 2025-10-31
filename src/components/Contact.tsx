import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      // Replace these with your actual EmailJS credentials
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="text-foreground font-medium">contact@lanshat.com</div>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input 
                    name="name"
                    placeholder="Your Name" 
                    className="bg-background"
                    required 
                  />
                </div>
                <div>
                  <Input 
                    type="email"
                    name="email"
                    placeholder="Your Email" 
                    className="bg-background"
                    required 
                  />
                </div>
              </div>
              <div>
                <Input 
                  name="subject"
                  placeholder="Subject" 
                  className="bg-background"
                  required 
                />
              </div>
              <div>
                <Textarea 
                  name="message"
                  placeholder="Tell us about your project" 
                  className="bg-background min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

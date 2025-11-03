import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from '@emailjs/browser';
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      contactSchema.parse(data);

      // Save to Supabase
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name.trim(),
          email: data.email.trim(),
          subject: data.subject.trim(),
          message: data.message.trim(),
        });

      if (insertError) {
        throw insertError;
      }

      // Send via EmailJS
      try {
        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
          },
          'YOUR_PUBLIC_KEY'
        );
      } catch (emailError) {
        console.error("EmailJS error:", emailError);
        // Continue even if email fails since we saved to database
      }

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.desc'),
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('contact.form.validation'),
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t('contact.form.error.title'),
          description: t('contact.form.error.desc'),
          variant: "destructive",
        });
        console.error("Error submitting contact form:", error);
      }
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
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">{t('contact.email')}</div>
              <div className="text-foreground font-medium">{t('footer.email')}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">{t('contact.phone')}</div>
              <div className="text-foreground font-medium">{t('footer.phone')}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">{t('contact.office')}</div>
              <div className="text-foreground font-medium">{t('footer.address')}</div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input 
                    name="name"
                    placeholder={t('contact.form.name')}
                    className="bg-background"
                    required 
                  />
                </div>
                <div>
                  <Input 
                    type="email"
                    name="email"
                    placeholder={t('contact.form.email')}
                    className="bg-background"
                    required 
                  />
                </div>
              </div>
              <div>
                <Input 
                  name="subject"
                  placeholder={t('contact.form.subject')}
                  className="bg-background"
                  required 
                />
              </div>
              <div>
                <Textarea 
                  name="message"
                  placeholder={t('contact.form.message')}
                  className="bg-background min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

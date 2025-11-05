import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ConsultationForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    field: "",
    message: ""
  });
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error(t('consultation.selectDate'));
      return;
    }

    setLoading(true);

    try {
      // Insert into database
      const { error: dbError } = await supabase
        .from('consultation_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_date: date.toISOString(),
          field: formData.field,
          message: formData.message
        }]);

      if (dbError) throw dbError;

      // Send calendar invite via edge function
      const { error: calendarError } = await supabase.functions.invoke('send-calendar-invite', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: date.toISOString(),
          field: formData.field,
          message: formData.message
        }
      });

      if (calendarError) {
        console.error('Calendar error:', calendarError);
        toast.warning(t('consultation.submittedNoCalendar'));
      } else {
        toast.success(t('consultation.success'));
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        field: "",
        message: ""
      });
      setDate(undefined);
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('consultation.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('consultation.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('consultation.subtitle')}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t('consultation.formTitle')}</CardTitle>
            <CardDescription>{t('consultation.formDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t('consultation.name')}</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={t('consultation.namePlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('consultation.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={t('consultation.emailPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('consultation.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder={t('consultation.phonePlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('consultation.date')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t('consultation.pickDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">{t('consultation.field')}</Label>
                <Select
                  required
                  value={formData.field}
                  onValueChange={(value) => setFormData({...formData, field: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('consultation.fieldPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipment">{t('consultation.fields.equipment')}</SelectItem>
                    <SelectItem value="manufacturing">{t('consultation.fields.manufacturing')}</SelectItem>
                    <SelectItem value="quality">{t('consultation.fields.quality')}</SelectItem>
                    <SelectItem value="supply">{t('consultation.fields.supply')}</SelectItem>
                    <SelectItem value="other">{t('consultation.fields.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('consultation.message')}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={t('consultation.messagePlaceholder')}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('consultation.submitting') : t('consultation.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConsultationForm;
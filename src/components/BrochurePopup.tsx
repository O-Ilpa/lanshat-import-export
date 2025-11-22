import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

const BrochurePopup = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [error, setError] = useState("");
  //   const { t } = useLanguage();
  //   useEffect(() => {
  //     const hasSeenPopup = sessionStorage.getItem("brochurePopupSeen");
  //     if (!hasSeenPopup) {
  //       const timer = setTimeout(() => {
  //         setIsOpen(true);
  //       }, 15000); // 15 seconds
  //       return () => clearTimeout(timer);
  //     }
  //   }, []);
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError("");
  //     try {
  //       emailSchema.parse({ email });
  //       const { error: insertError } = await supabase
  //         .from('brochure_emails')
  //         .insert({ email: email.trim() });
  //       if (insertError) {
  //         throw insertError;
  //       }
  //       toast({
  //         title: t('brochure.success.title'),
  //         description: t('brochure.success.desc'),
  //       });
  //       sessionStorage.setItem("brochurePopupSeen", "true");
  //       setIsOpen(false);
  //       setEmail("");
  //     } catch (err) {
  //       if (err instanceof z.ZodError) {
  //         setError(err.errors[0].message);
  //       } else {
  //         toast({
  //           title: t('brochure.error.title'),
  //           description: t('brochure.error.desc'),
  //           variant: "destructive",
  //         });
  //         console.error("Error submitting email:", err);
  //       }
  //     }
  //   };
  //   const handleClose = () => {
  //     sessionStorage.setItem("brochurePopupSeen", "true");
  //     setIsOpen(false);
  //   };
  //   return (
  //     <Dialog open={isOpen} onOpenChange={setIsOpen} >
  //       <DialogContent className="sm:max-w-md bg-card border-border w-[90%]" >
  //         <button
  //           onClick={handleClose}
  //           className="absolute right-4 top-4  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  //         >
  //           <X className="h-4 w-4" />
  //           <span className="sr-only">Close</span>
  //         </button>
  //         <DialogHeader>
  //           <DialogTitle className="text-2xl">{t('brochure.title')}</DialogTitle>
  //           <DialogDescription className="text-base pt-2">
  //             {t('brochure.subtitle')}
  //           </DialogDescription>
  //         </DialogHeader>
  //         <form onSubmit={handleSubmit} className="space-y-4 pt-4">
  //           <div>
  //             <Input
  //               type="email"
  //               placeholder={t('brochure.email')}
  //               value={email}
  //               onChange={(e) => {
  //                 setEmail(e.target.value);
  //                 setError("");
  //               }}
  //               className={`bg-background ${error ? "border-destructive" : ""}`}
  //               maxLength={255}
  //             />
  //             {error && (
  //               <p className="text-sm text-destructive mt-2">{error}</p>
  //             )}
  //           </div>
  //           <div className="flex gap-3">
  //             <Button type="submit" className="flex-1">
  //               {t('brochure.download')}
  //             </Button>
  //             <Button type="button" variant="outline" onClick={handleClose}>
  //               {t('footer.contact')}
  //             </Button>
  //           </div>
  //         </form>
  //       </DialogContent>
  //     </Dialog>
  //   );
};

export default BrochurePopup;

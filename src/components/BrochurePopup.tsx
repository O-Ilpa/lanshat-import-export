import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" })
});

const BrochurePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("brochurePopupSeen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      emailSchema.parse({ email });
      
      // Here you would typically send the email to your backend
      toast({
        title: "Success!",
        description: "We'll send our brochure to your email shortly.",
      });
      
      sessionStorage.setItem("brochurePopupSeen", "true");
      setIsOpen(false);
      setEmail("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("brochurePopupSeen", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle className="text-2xl">Download Our Brochure</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Get detailed insights into our industrial and importing services. Enter your email to receive our comprehensive brochure.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Input
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`bg-background ${error ? "border-destructive" : ""}`}
              maxLength={255}
            />
            {error && (
              <p className="text-sm text-destructive mt-2">{error}</p>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Send Brochure
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Maybe Later
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrochurePopup;

-- Create consultation requests table
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date TIMESTAMP WITH TIME ZONE NOT NULL,
  field TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a consultation request
CREATE POLICY "Anyone can submit consultation request"
ON public.consultation_requests
FOR INSERT
WITH CHECK (true);

-- Policy: Admins can view all consultation requests
CREATE POLICY "Admins can view all consultation requests"
ON public.consultation_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
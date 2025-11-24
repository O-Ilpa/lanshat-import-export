-- Add meeting_type column to consultation_requests table
ALTER TABLE public.consultation_requests 
ADD COLUMN IF NOT EXISTS meeting_type TEXT;
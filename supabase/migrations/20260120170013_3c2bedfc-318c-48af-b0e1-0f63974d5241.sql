-- Add UPDATE and DELETE policies for admit_cards table
CREATE POLICY "Admins can update admit cards"
ON public.admit_cards FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete admit cards"
ON public.admit_cards FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add storage policy for admin access to documents bucket
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));
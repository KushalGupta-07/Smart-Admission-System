-- Allow users to delete their own applications (for cancellation)
CREATE POLICY "Users can delete their own applications" 
ON public.applications 
FOR DELETE 
USING (auth.uid() = user_id);

-- Also allow deleting related admit cards when application is cancelled
CREATE POLICY "Users can delete their own admit cards" 
ON public.admit_cards 
FOR DELETE 
USING (auth.uid() = user_id);
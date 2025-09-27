-- Fix administrative access policies for appointments table
CREATE POLICY "Admin and staff can view all appointments" 
ON public.appointments 
FOR SELECT 
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can update all appointments" 
ON public.appointments 
FOR UPDATE 
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can delete all appointments" 
ON public.appointments 
FOR DELETE 
USING (is_admin_or_staff(auth.uid()));

-- Fix administrative access policies for contact_messages table
CREATE POLICY "Admin and staff can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (is_admin_or_staff(auth.uid()));

-- Fix database function security by adding proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SET search_path = public;
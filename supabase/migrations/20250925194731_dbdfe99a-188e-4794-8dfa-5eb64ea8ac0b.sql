-- Fix database function security by adding proper search_path settings
-- and add input length constraints for security

-- Update existing functions to include proper search_path for security
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'staff')
  )
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'first_name', NEW.raw_user_meta_data ->> 'last_name');
  RETURN NEW;
END;
$function$;

-- Add input length constraints for security
ALTER TABLE public.contact_messages 
ADD CONSTRAINT check_first_name_length CHECK (char_length(first_name) <= 100);

ALTER TABLE public.contact_messages 
ADD CONSTRAINT check_last_name_length CHECK (char_length(last_name) <= 100);

ALTER TABLE public.contact_messages 
ADD CONSTRAINT check_email_length CHECK (char_length(email) <= 254);

ALTER TABLE public.contact_messages 
ADD CONSTRAINT check_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20);

ALTER TABLE public.contact_messages 
ADD CONSTRAINT check_subject_length CHECK (char_length(subject) <= 200);

ALTER TABLE public.contact_messages 
ADD CONSTRAINT check_message_length CHECK (char_length(message) <= 2000);

-- Add similar constraints to appointments table
ALTER TABLE public.appointments 
ADD CONSTRAINT check_first_name_length CHECK (char_length(first_name) <= 100);

ALTER TABLE public.appointments 
ADD CONSTRAINT check_last_name_length CHECK (char_length(last_name) <= 100);

ALTER TABLE public.appointments 
ADD CONSTRAINT check_email_length CHECK (char_length(email) <= 254);

ALTER TABLE public.appointments 
ADD CONSTRAINT check_phone_length CHECK (char_length(phone) <= 20);

ALTER TABLE public.appointments 
ADD CONSTRAINT check_service_length CHECK (char_length(service) <= 100);

ALTER TABLE public.appointments 
ADD CONSTRAINT check_membership_status_length CHECK (char_length(membership_status) <= 50);

ALTER TABLE public.appointments 
ADD CONSTRAINT check_notes_length CHECK (notes IS NULL OR char_length(notes) <= 1000);

-- Add constraints to profiles table
ALTER TABLE public.profiles 
ADD CONSTRAINT check_first_name_length CHECK (first_name IS NULL OR char_length(first_name) <= 100);

ALTER TABLE public.profiles 
ADD CONSTRAINT check_last_name_length CHECK (last_name IS NULL OR char_length(last_name) <= 100);

ALTER TABLE public.profiles 
ADD CONSTRAINT check_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20);

ALTER TABLE public.profiles 
ADD CONSTRAINT check_membership_type_length CHECK (membership_type IS NULL OR char_length(membership_type) <= 50);
-- Add subscriber role to the enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'subscriber';

-- Update the reset_daily_credits function to give different amounts based on role
CREATE OR REPLACE FUNCTION public.reset_daily_credits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Reset credits for normal users (20 credits)
  UPDATE public.user_credits
  SET daily_credits = 20,
      total_credits = total_credits + 20,
      last_reset_date = CURRENT_DATE
  WHERE last_reset_date < CURRENT_DATE
    AND user_id IN (
      SELECT user_id 
      FROM public.user_roles 
      WHERE role = 'user'
    );
  
  -- Reset credits for subscriber users (200 credits)
  UPDATE public.user_credits
  SET daily_credits = 200,
      total_credits = total_credits + 200,
      last_reset_date = CURRENT_DATE
  WHERE last_reset_date < CURRENT_DATE
    AND user_id IN (
      SELECT user_id 
      FROM public.user_roles 
      WHERE role = 'subscriber'
    );
END;
$function$;

-- Update handle_new_user to give 20 initial credits instead of 10
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- Insert default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Insert initial credits (20 for new users)
  INSERT INTO public.user_credits (user_id, daily_credits, total_credits)
  VALUES (NEW.id, 20, 20);
  
  RETURN NEW;
END;
$function$;
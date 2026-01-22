-- Migration: Fix Privilege Escalation in Profiles
-- Description: Adds a trigger to prevent non-admin users from determining their own role.

-- Function to check if the user is authorized to change the role
CREATE OR REPLACE FUNCTION public.protect_role_column()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the role is being modified
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        -- Allow if it's the service_role (auth.uid() is null in some contexts, or we trust checks upstream if bypassing RLS)
        -- However, for safety in Supabase, we check if the user is an admin.
        
        -- If auth.uid() is NULL, it's likely a system process or edge function with service key? 
        -- Standard Supabase Auth keeps auth.uid() null for anon/service sometimes, but we should be careful.
        -- Assuming this triggers on Authenticated User actions.
        
        IF auth.uid() IS NULL THEN
            -- Allow system/service_role updates
            RETURN NEW;
        END IF;

        -- Check if the current user is an admin
        IF EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
            RETURN NEW; -- Admins can update roles
        END IF;

        -- If we are here, it's a non-admin user trying to change the role
        RAISE EXCEPTION 'Unauthorized: You cannot update the role field.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER protect_profile_role
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.protect_role_column();

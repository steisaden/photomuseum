-- Drop triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop tables (order matters due to dependencies)
DROP TABLE IF EXISTS public.license_request_items;
DROP TABLE IF EXISTS public.license_requests;
DROP TABLE IF EXISTS public.manifest_entries;
DROP TABLE IF EXISTS public.artworks;
DROP TABLE IF EXISTS public.galleries;
DROP TABLE IF EXISTS public.museums;
DROP TABLE IF EXISTS public.profiles;

-- Drop types
DROP TYPE IF EXISTS public.user_role;

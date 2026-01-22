-- Create custom types
CREATE TYPE public.user_role AS ENUM ('visitor', 'licensee', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role public.user_role DEFAULT 'visitor'::public.user_role NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Secure the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'visitor');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create content tables

CREATE TABLE public.museums (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.museums ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.galleries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    museum_id UUID REFERENCES public.museums(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (museum_id, slug)
);

ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.artworks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    year_created INT,
    medium TEXT,
    dimensions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.manifest_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    gallery_id UUID REFERENCES public.galleries(id) ON DELETE CASCADE NOT NULL,
    artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE NOT NULL,
    frame_id TEXT NOT NULL, -- The ID of the frame in the 3D scene
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (gallery_id, frame_id)
);

ALTER TABLE public.manifest_entries ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.license_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.license_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.license_request_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID REFERENCES public.license_requests(id) ON DELETE CASCADE NOT NULL,
    artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE NOT NULL,
    usage_intent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.license_request_items ENABLE ROW LEVEL SECURITY;


-- RLS Policies

-- Profiles
-- Public can read basic profile info (can refine later to only show public fields if needed, for now all profiles are visible or we restrict to own)
-- Let's say users can read their own profile, admins can read all.
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Museums, Galleries, Artworks, Manifest Entries (Public Read, Admin Write)

-- Museums
CREATE POLICY "Public read museums" ON public.museums
    FOR SELECT USING (true);

CREATE POLICY "Admin full access museums" ON public.museums
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Galleries
CREATE POLICY "Public read galleries" ON public.galleries
    FOR SELECT USING (true);

CREATE POLICY "Admin full access galleries" ON public.galleries
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Artworks
CREATE POLICY "Public read artworks" ON public.artworks
    FOR SELECT USING (true);

CREATE POLICY "Admin full access artworks" ON public.artworks
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Manifest Entries
CREATE POLICY "Public read manifest entries" ON public.manifest_entries
    FOR SELECT USING (true);

CREATE POLICY "Admin full access manifest entries" ON public.manifest_entries
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );


-- License Requests (User own, Admin all)

CREATE POLICY "Users can create own license requests" ON public.license_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own license requests" ON public.license_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own license requests" ON public.license_requests
    FOR UPDATE USING (auth.uid() = user_id); -- Maybe restrict what they can update (e.g. not status)

CREATE POLICY "Admins can view all license requests" ON public.license_requests
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can update all license requests" ON public.license_requests
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- License Request Items

CREATE POLICY "Users can create items for own requests" ON public.license_request_items
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.license_requests WHERE id = request_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can read items for own requests" ON public.license_request_items
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.license_requests WHERE id = request_id AND user_id = auth.uid())
    );

CREATE POLICY "Admins can view all license request items" ON public.license_request_items
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Indexes

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_museums_slug ON public.museums(slug);
CREATE INDEX idx_galleries_museum_id ON public.galleries(museum_id);
CREATE INDEX idx_galleries_slug ON public.galleries(slug);
CREATE INDEX idx_manifest_entries_gallery_id ON public.manifest_entries(gallery_id);
CREATE INDEX idx_manifest_entries_artwork_id ON public.manifest_entries(artwork_id);
CREATE INDEX idx_license_requests_user_id ON public.license_requests(user_id);
CREATE INDEX idx_license_requests_status ON public.license_requests(status);
CREATE INDEX idx_license_request_items_request_id ON public.license_request_items(request_id);


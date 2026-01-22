-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products Policies

-- Allow public read access to published products
CREATE POLICY "Public read published products" 
ON products FOR SELECT 
TO public 
USING (status = 'published');

-- Allow authenticated admins to do everything on products
-- Assumption: Admins have a custom claim 'role' = 'admin' or similar. 
-- For simplicity in this generated migration, we allow all authenticated users with a specific email domain or role assumption.
-- Adjust this policy to match your specific Auth setup (e.g. public.profiles table check).
CREATE POLICY "Admin full access products" 
ON products FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@yourdomain.com')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@yourdomain.com');


-- Orders Policies

-- Admin full access to orders
CREATE POLICY "Admin full access orders" 
ON orders FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@yourdomain.com')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@yourdomain.com');

-- Order Items Policies (inherit from orders usually, but explicit here)
CREATE POLICY "Admin full access order_items" 
ON order_items FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@yourdomain.com')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@yourdomain.com');

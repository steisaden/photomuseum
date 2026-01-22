import { serve } from "std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PRINTIFY_BASE_URL = "https://api.printify.com/v1";

serve(async (req) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response('Missing Authorization header', { status: 401 });
        }

        // 1. Initialize Supabase Client
        const supabaseOps = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        );

        // 2. Get Printify Token & Shop ID
        const PRINTIFY_API_TOKEN = Deno.env.get('PRINTIFY_API_TOKEN');
        // For MVP, we might hardcode a shop ID or fetch the first one
        // Ideally, store this in a settings table or env var
        const SHOP_ID = Deno.env.get('PRINTIFY_SHOP_ID');

        if (!PRINTIFY_API_TOKEN || !SHOP_ID) {
            throw new Error('Missing Printify Configuration (Token or Shop ID)');
        }

        // 3. Fetch Products from Printify
        const response = await fetch(`${PRINTIFY_BASE_URL}/shops/${SHOP_ID}/products.json`, {
            headers: {
                'Authorization': `Bearer ${PRINTIFY_API_TOKEN}`
            }
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('Printify Error:', err);
            throw new Error(`Failed to fetch from Printify: ${response.statusText}`);
        }

        const data = await response.json();
        const printifyProducts = data.data; // Printify paginated response structure

        // 4. Upsert into Database
        const upserts = printifyProducts.map((p: any) => ({
            printify_id: p.id,
            name: p.title,
            description: p.description,
            images: p.images.map((img: any) => img.src),
            // Simple mapping: take the first variant's price or query separately
            // Storing in cents. Printify returns price in cents usually integer.
            price: p.variants?.[0]?.price ?? 0,
            status: p.visible ? 'published' : 'draft',
            provider_id: p.print_provider_id,
            updated_at: new Date().toISOString() // refresh timestamp
        }));

        const { error } = await supabaseOps
            .from('products')
            .upsert(upserts, { onConflict: 'printify_id' });

        if (error) throw error;

        return new Response(JSON.stringify({
            success: true,
            synced: upserts.length
        }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
});

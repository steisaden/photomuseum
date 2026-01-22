
import { ApiClient } from '../shared/client';
import fs from 'fs';
import path from 'path';

// Manual env parsing since we might not have dotenv installed
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
    const [key, val] = line.split('=');
    if (key && val) env[key.trim()] = val.trim();
});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

// @ts-ignore - Patch import.meta for any side effects in module scope if needed, 
// though we use constructor injection now.
global.import = { meta: { env: { VITE_SUPABASE_URL: SUPABASE_URL, VITE_SUPABASE_ANON_KEY: SUPABASE_KEY } } };

async function verify() {
    console.log("Initializing ApiClient...");
    const client = new ApiClient(SUPABASE_URL, SUPABASE_KEY);

    const testProduct = {
        name: "Script Verified Product " + Date.now(),
        price: "99.99",
        category: "Men",
        description: "Created via verification script",
        status: "Active" as const,
        image: "https://via.placeholder.com/150"
    };

    console.log("Creating product:", testProduct.name);
    const created = await client.createProduct(testProduct);

    if (created && created.id) {
        console.log("SUCCESS: Product created with ID:", created.id);
        console.log("Product:", JSON.stringify(created, null, 2));
    } else {
        console.error("FAILURE: Product creation returned null.");
        process.exit(1);
    }

    console.log("Verifying retrieval...");
    const fetched = await client.getProduct(created.id);
    if (fetched && fetched.name === testProduct.name) {
        console.log("SUCCESS: Product retrieved and matches.");
    } else {
        console.error("FAILURE: Could not retrieve product or mismatch.");
        console.log("Fetched:", fetched);
        process.exit(1);
    }
}

verify().catch(e => {
    console.error("Unexpected error:", e);
    process.exit(1);
});

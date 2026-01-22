
import { ApiClient } from '../shared/client';
import fs from 'fs';
import path from 'path';

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
    console.error('Missing Supabase credentials');
    process.exit(1);
}

// @ts-ignore
global.import = { meta: { env: { VITE_SUPABASE_URL: SUPABASE_URL, VITE_SUPABASE_ANON_KEY: SUPABASE_KEY } } };

async function debug() {
    console.log("Initializing ApiClient for debug...");
    const client = new ApiClient(SUPABASE_URL, SUPABASE_KEY);

    // @ts-ignore
    const supabase = client.supabase;

    // Try valid minimal insert
    const payload = {
        name: "Minimal Test",
        price: 100,
        // category: "Men", // Commented out to see if it works without
    };

    console.log("Attempting minimal insert:", payload);
    const { data, error } = await supabase
        .from('products')
        .insert([payload])
        .select();

    if (error) {
        console.error("Insert Error:", JSON.stringify(error, null, 2));
    } else {
        console.log("Insert Success:", data);
    }
}

debug().catch(console.error);

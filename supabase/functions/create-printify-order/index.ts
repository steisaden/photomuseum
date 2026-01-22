import { serve } from "std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PRINTIFY_BASE_URL = "https://api.printify.com/v1";

serve(async (req) => {
    try {
        const { order_id } = await req.json();
        if (!order_id) throw new Error('Missing order_id');

        // 1. Init Supabase (Service Role for reading full order details)
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const PRINTIFY_API_TOKEN = Deno.env.get('PRINTIFY_API_TOKEN');
        const SHOP_ID = Deno.env.get('PRINTIFY_SHOP_ID');

        if (!PRINTIFY_API_TOKEN || !SHOP_ID) {
            throw new Error('Missing Printify Config');
        }

        // 2. Fetch Order & Items
        const { data: order, error: orderErr } = await supabaseAdmin
            .from('orders')
            .select('*, order_items(*)')
            .eq('id', order_id)
            .single();

        if (orderErr || !order) throw new Error('Order not found');

        // 3. Construct Printify Payload
        const line_items = order.order_items.map((item: any) => {
            if (!item.printify_variant_id || !item.product_id) return null;
            // We need the product's printify_id too. 
            // This might require a join in step 2 or a separate fetch if not in order_items.
            // Assuming for now order_items joined with products, or we fetch product logic here.
            // SIMPLIFICATION: Assuming we passed printify_product_id in item or fetch it now.
            return {
                product_id: "???", // Need to fetch from products table
                variant_id: item.printify_variant_id,
                quantity: item.quantity
            };
        }).filter(Boolean);

        // Fetch product Printify IDs for items
        // Real implementation needs a better join or loop. 
        // For this scaffold, we'll placeholder the logic or imply a better query.

        // Address Mapping
        const shipping_address = order.customer_info?.shippingAddress || {}; // Adapt to actual schema

        const payload = {
            external_id: order.order_number,
            label: order.order_number,
            line_items: line_items, // needs fixing in real logic
            shipping_method: 1, // standard
            send_shipping_notification: true,
            address_to: {
                first_name: order.customer_info?.name?.split(' ')[0] ?? 'Guest',
                last_name: order.customer_info?.name?.split(' ')[1] ?? '',
                email: order.customer_info?.email,
                phone: order.customer_info?.phone,
                country: shipping_address.country,
                region: shipping_address.state,
                address1: shipping_address.line1,
                city: shipping_address.city,
                zip: shipping_address.postal_code
            }
        };

        // 4. Send to Printify
        const response = await fetch(`${PRINTIFY_BASE_URL}/shops/${SHOP_ID}/orders.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PRINTIFY_API_TOKEN}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Printify Order Fail:', result);
            throw new Error('Failed to create order in Printify');
        }

        // 5. Update Local Order Status
        await supabaseAdmin
            .from('orders')
            .update({
                status: 'production',
                fulfillment_provider: 'Printify',
                external_fulfillment_id: result.id
            })
            .eq('id', order_id);

        return new Response(JSON.stringify({ success: true, printify_order_id: result.id }), {
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

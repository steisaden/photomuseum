export interface Product {
    id: number | string;
    name: string;
    description?: string;
    category: string;
    price: string;
    image: string;
    // Admin specific fields
    status?: 'Draft' | 'Active' | 'Archived';
    visibility?: 'Public' | 'Hidden' | 'Scheduled';
    priceRange?: string;
    margin?: string;
    printifySync?: 'Synced' | 'Pending' | 'Error';
    lastUpdated?: string;
}

export interface OrderItem {
    id?: number | string;
    product_id: number | string;
    product_name: string;
    quantity: number;
    price: string;
    printify_variant_id?: number | string;
}

export interface Order {
    id: number | string;
    orderNumber: string;
    customer: string; // Full name
    email: string;
    items: number; // Item count
    orderItems?: OrderItem[]; // Detailed items
    status: 'Not Sent' | 'In Production' | 'Shipped';
    provider: string;
    shipping: string; // Method name
    addressVerified: boolean;
    date: string; // Display date
    shippingAddress: {
        line1: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    printify_order_id?: string;
}

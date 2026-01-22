import { useState } from 'react';
import { client } from '@shared/client';
import { useCart } from '../../app/context/CartContext';

interface MockCheckoutFormProps {
    amount: number;
}

export function MockCheckoutForm({ amount }: MockCheckoutFormProps) {
    const { items, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Create mock order via ApiClient using real cart items
            await client.createOrder({
                customer: 'Smoke Test User',
                email: 'smoke@test.com',
                items: items.reduce((acc: number, item) => acc + item.quantity, 0),
                shipping: 'Standard',
                status: 'Not Sent',
                // In a real app, these would come from form state
                shippingAddress: {
                    line1: '123 Test Ave',
                    city: 'Test City',
                    state: 'CA',
                    postal_code: '90000',
                    country: 'US'
                },
                orderItems: items.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            });

            // Allow some time for the mock delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Clear the cart
            clearCart();

            // Redirect on success
            window.location.href = '/payment-completion';
        } catch (err) {
            console.error(err);
            setError('Payment failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-600 text-sm">
                <strong>Test Mode</strong>: Backend payment service unavailable. Using Mock Payment.
            </div>

            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Card Information</label>
                    <div className="p-3 border rounded bg-muted/50 text-muted-foreground font-mono text-sm flex justify-between items-center">
                        <span>•••• •••• •••• 4242</span>
                        <span>12/28</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">CVC</label>
                        <div className="p-3 border rounded bg-muted/50 text-muted-foreground font-mono text-sm">
                            123
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Zip Code</label>
                        <div className="p-3 border rounded bg-muted/50 text-muted-foreground font-mono text-sm">
                            90210
                        </div>
                    </div>
                </div>

                <button
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-md disabled:opacity-50 font-medium transition-all"
                >
                    {isLoading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
                </button>

                {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                )}

                <p className="text-xs text-muted-foreground text-center mt-4">
                    This is a secure 128-bit SSL encrypted payment.
                </p>
            </form>
        </div>
    );
}

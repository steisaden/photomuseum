import { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';
import { MockCheckoutForm } from './MockCheckoutForm';

export function CheckoutForm({ amount }: { amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [useMock, setUseMock] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const createPaymentIntent = async () => {
            setMessage(null);

            try {
                const { data, error } = await supabase.functions.invoke('create-payment-intent', {
                    body: { amount, currency: 'usd' },
                });

                if (error) {
                    console.warn('Backend payment service unreachable, falling back to mock:', error);
                    setUseMock(true);
                    return;
                }

                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.warn('No client secret returned, falling back to mock.');
                    setUseMock(true);
                }
            } catch (err) {
                console.warn('Exception fetching payment intent, falling back to mock:', err);
                setUseMock(true);
            }
        };

        createPaymentIntent();
    }, [amount]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/payment-completion',
            },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message || 'An unexpected error occurred.');
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    if (useMock) {
        return <MockCheckoutForm amount={amount} />;
    }

    if (!clientSecret) {
        return (
            <div className="p-8 text-center space-y-4">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-muted-foreground">Securely connecting to payment provider...</p>
            </div>
        );
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" />

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-md disabled:opacity-50 font-medium transition-all"
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : "Pay now"}
                </span>
            </button>

            {message && <div id="payment-message" className="text-red-500 text-sm mt-2">{message}</div>}
        </form>
    );
}

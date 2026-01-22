import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface StripeProviderProps {
    children: React.ReactNode;
}

export function StripeProvider({ children }: StripeProviderProps) {
    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        console.warn("VITE_STRIPE_PUBLISHABLE_KEY is not set. Stripe will not load.");
    }

    // Options for Element appearance
    const options = {
        // clientSecret will be passed to individual Elements or fetched here if using 'mode: payment'
        // For SetupIntent or deferred intent, config might differ.
        // For now, valid appearance settings.
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#0f172a',
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
}

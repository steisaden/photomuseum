import { AddressForm } from '../checkout/AddressForm';
import { OrderSummary } from '../checkout/OrderSummary';
import { StripeProvider } from '@/components/providers/StripeProvider'; // Verify alias or relative path
import { CheckoutForm } from '@/components/checkout/CheckoutForm'; // Verify alias or relative path
import { useCart } from '../../context/CartContext';

export default function Checkout() {
    const { subtotal } = useCart();
    const amount = Math.round(subtotal * 100);

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <h1 className="font-heading text-3xl mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7">
                    <AddressForm />

                    <div className="mt-8">
                        <h2 className="font-heading text-xl mb-4">Payment Method</h2>
                        {amount > 50 ? (
                            <StripeProvider>
                                <CheckoutForm amount={amount} />
                            </StripeProvider>
                        ) : (
                            <div className="text-muted-foreground p-4 bg-secondary rounded-lg">
                                Your cart is empty or total is too low for payment processing.
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}

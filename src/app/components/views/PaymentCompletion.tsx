import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentCompletion() {
    const { clearCart } = useCart();
    // const [searchParams] = useSearchParams();
    // const redirectStatus = searchParams.get('redirect_status');

    useEffect(() => {
        // Clear cart on successful load
        clearCart();
    }, [clearCart]);

    return (
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
            <div className="bg-green-100 p-6 rounded-full mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>

            <h1 className="text-4xl font-heading mb-4">Payment Successful!</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Thank you for your purchase. Your order has been processed correctly.
            </p>

            <Link
                to="/"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

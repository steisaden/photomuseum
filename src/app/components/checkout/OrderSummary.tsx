import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export function OrderSummary() {
    const { items, subtotal } = useCart();
    const shipping: number = 0; // Free shipping for now
    const total = subtotal + shipping;

    return (
        <div className="bg-details p-6 rounded-lg sticky top-24">
            <h2 className="font-heading text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <p className="font-medium text-sm">{item.price}</p>
                    </div>
                ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between font-heading text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full" size="lg">
                Pay Now
            </Button>
        </div>
    );
}

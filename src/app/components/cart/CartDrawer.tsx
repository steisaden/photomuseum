import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { Button } from '../ui/button';
import { ShoppingBag } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

export function CartDrawer() {
    const { items, isOpen, toggleCart, subtotal } = useCart();
    const navigate = useNavigate();

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 mt-8 overflow-hidden">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-xl font-medium text-foreground">Your cart is empty</p>
                            <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
                            <Button onClick={toggleCart} className="mt-4">
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                            <div className="divide-y divide-gray-200">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() => {
                                    toggleCart();
                                    navigate('/checkout');
                                }}
                            >
                                Checkout
                            </Button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <button
                                    type="button"
                                    className="font-medium text-primary hover:text-primary/80"
                                    onClick={toggleCart}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

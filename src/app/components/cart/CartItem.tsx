import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../../context/CartContext';
import { Button } from '../ui/button';

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{item.price}</p>
                    </div>
                    {item.category && (
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    )}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="font-medium text-destructive hover:text-destructive/80 flex items-center gap-1"
                        onClick={() => removeFromCart(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

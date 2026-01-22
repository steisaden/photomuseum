import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: string;
    image: string;
    quantity: number;
    category?: string;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleCart: () => void;
    cartCount: number;
    subtotal: number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ecommerce-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // ... (existing useEffects)

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from local storage', e);
            }
        }
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsOpen(true); // Open drawer on add
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const toggleCart = () => setIsOpen((prev) => !prev);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const parsePrice = (priceStr: string) => {
        return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    };

    const subtotal = items.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleCart,
                cartCount,
                subtotal,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

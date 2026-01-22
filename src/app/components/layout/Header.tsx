import { useState } from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '../ui/sheet';

import { useCart } from '../../context/CartContext';

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();

    const NavLinks = () => (
        <>
            <a href="#" className="uppercase tracking-wide text-sm hover:text-accent transition-colors">
                New Arrivals
            </a>
            <a href="#" className="uppercase tracking-wide text-sm hover:text-accent transition-colors">
                Women
            </a>
            <a href="#" className="uppercase tracking-wide text-sm hover:text-accent transition-colors">
                Men
            </a>
            <a href="#" className="uppercase tracking-wide text-sm hover:text-accent transition-colors">
                Collections
            </a>
            <a href="#" className="uppercase tracking-wide text-sm hover:text-accent transition-colors">
                About
            </a>
        </>
    );

    return (
        <header className="border-b border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-1 lg:flex-initial">
                        <h1 className="text-2xl uppercase tracking-tighter">
                            Asshole <span className="text-accent">Athletic</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-12 flex-1 justify-center">
                        <NavLinks />
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-6 flex-1 justify-end">
                        <button className="hover:text-accent transition-colors" aria-label="Search">
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            className="hover:text-accent transition-colors relative"
                            aria-label="Shopping bag"
                            onClick={toggleCart}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <button
                                        className="hover:text-accent transition-colors"
                                        aria-label="Menu"
                                    >
                                        <Menu className="w-5 h-5" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <nav className="flex flex-col gap-6 mt-8">
                                        <NavLinks />
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

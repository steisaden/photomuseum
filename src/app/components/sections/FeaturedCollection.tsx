import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { client } from '@shared/client';
import type { Product } from '@shared/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

export function FeaturedCollection() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        client.getProducts().then(setProducts);
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20 gap-8">
                    <div className="flex-1">
                        <h2 className="text-5xl lg:text-6xl uppercase tracking-tight mb-6">
                            New Arrivals
                        </h2>
                        <div className="flex gap-8 text-sm uppercase tracking-wider">
                            <button className="border-b-2 border-black pb-2">View All</button>
                            <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">Women</button>
                            <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">Men</button>
                            <button className="text-muted-foreground hover:text-foreground transition-colors pb-2">Unisex</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm uppercase tracking-wide text-muted-foreground">Sort By</span>
                        <Select>
                            <SelectTrigger className="w-[180px] border-0 border-b border-foreground rounded-none px-0 py-2 h-auto text-sm uppercase tracking-wide focus:ring-0 focus:border-accent shadow-none">
                                <SelectValue placeholder="Featured" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

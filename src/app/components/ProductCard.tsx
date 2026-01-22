import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
}

export function ProductCard({ image, name, price, category }: ProductCardProps) {
  const { addToCart } = useCart();
  // Generate a pseudo-random ID based on the name for this demo
  const id = name.toLowerCase().replace(/\s+/g, '-');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product details
    addToCart({
      id,
      name,
      price,
      image,
      category
    });
  };

  return (
    <div className="group cursor-pointer">
      <div className="aspect-[2/3] overflow-hidden bg-white mb-6 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
        />
        {/* Hover overlay with Add to Cart button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button onClick={handleAddToCart} variant="secondary" className="translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h3 className="uppercase tracking-wider text-sm">{name}</h3>
        <p className="tracking-wide">{price}</p>
      </div>
    </div>
  );
}
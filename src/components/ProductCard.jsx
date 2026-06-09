import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            {product.category.replace('-', ' ')}
          </p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-bold text-dark">
            ${product.price.toFixed(2)}
          </p>
          <button 
            onClick={handleAdd}
            className={`rounded-full p-2 transition-all duration-300 ${
              added ? 'bg-green-500 text-white' : 'bg-light text-dark hover:bg-primary hover:text-white'
            }`}
            title="Add to cart"
          >
            {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

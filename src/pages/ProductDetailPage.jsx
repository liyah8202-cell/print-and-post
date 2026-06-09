import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ShoppingCart, Plus, Minus, Star, Truck, ShieldCheck, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const product = products.find(p => p.id === id);
  
  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="container px-4 py-24 mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Product not found</h1>
        <Link to="/" className="text-primary hover:underline flex items-center justify-center">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pb-12 relative">
      {/* Toast Notification */}
      <div className={`fixed top-20 right-4 z-50 transform transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-dark text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <div>
            <p className="font-bold text-sm">Added to cart!</p>
            <p className="text-xs text-gray-300">{quantity}x {product.name}</p>
          </div>
          <Link to="/cart" className="ml-4 text-xs font-bold text-primary hover:underline">VIEW CART</Link>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-light/30 border-b">
        <div className="container px-4 py-4 mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <Link to={`/category/${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <span className="font-medium text-dark truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-light border">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                {product.category.replace('-', ' ')}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-accent">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-dark mb-6">
                ${product.price.toFixed(2)}
              </p>
              <div className="prose prose-sm text-muted-foreground mb-8">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6 mb-10 border-t pt-8">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-dark uppercase tracking-wider">Quantity</span>
                <div className="flex items-center rounded-md border p-1 bg-white">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 hover:bg-light rounded transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-light rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 rounded-md bg-dark py-4 px-8 text-sm font-bold text-white transition hover:bg-dark/90 active:scale-[0.98]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center rounded-md border-2 border-dark/10 py-4 px-8 text-sm font-bold text-dark transition hover:bg-light active:scale-[0.98]">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features/Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs font-bold text-dark uppercase">Fast Shipping</span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-1">2-4 business days</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs font-bold text-dark uppercase">High Quality</span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-1">Giclée grade prints</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ArrowLeftRight className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs font-bold text-dark uppercase">Easy Returns</span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-1">30-day window</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-dark">You may also like</h2>
              <Link to={`/category/${product.category}`} className="text-sm font-bold text-primary hover:underline">
                View all {product.category.replace('-', ' ')}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(related => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

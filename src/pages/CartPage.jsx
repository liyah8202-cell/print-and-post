import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-24 mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-light p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our collection of art and stickers to find something you love.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="border-b pb-4 hidden md:flex text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <div className="flex-1">Product</div>
            <div className="w-32 text-center">Quantity</div>
            <div className="w-32 text-right">Total</div>
          </div>
          
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
              {/* Product Info */}
              <div className="flex flex-1 items-center gap-6 w-full">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-light">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-dark">{item.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{item.category.replace('-', ' ')}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">${item.price.toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 flex items-center text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex w-32 items-center justify-center gap-3">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="rounded-full border p-1 hover:bg-light transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="rounded-full border p-1 hover:bg-light transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              
              {/* Price */}
              <div className="w-32 text-right">
                <p className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <aside className="w-full lg:w-96">
          <div className="rounded-lg border bg-light/30 p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-dark">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="font-semibold text-dark">{cartTotal >= 30 ? 'Free' : '$5.00'}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${(cartTotal + (cartTotal >= 30 ? 0 : 5)).toFixed(2)}</span>
              </div>
            </div>
            
            {cartTotal < 30 && (
              <p className="mt-4 text-xs text-muted-foreground text-center">
                Add <span className="font-bold text-dark">${(30 - cartTotal).toFixed(2)}</span> more to your cart for free shipping!
              </p>
            )}
            
            <Link 
              to="/checkout"
              className="mt-8 w-full rounded-md bg-dark py-4 text-sm font-bold text-white transition hover:bg-dark/90 text-center inline-block"
            >
              Proceed to Checkout
            </Link>
            
            <Link 
              to="/" 
              className="mt-4 block text-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

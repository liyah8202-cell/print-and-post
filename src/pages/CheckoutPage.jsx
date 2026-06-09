import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-24 mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/" className="text-primary hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form Container */}
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="bg-light/20 rounded-lg p-8 border h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Your Order</h2>
          <div className="max-h-96 overflow-auto mb-6 pr-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <h3 className="font-bold line-clamp-1">{item.name}</h3>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-dark">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold text-dark">{cartTotal >= 30 ? 'Free' : '$5.00'}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span className="text-primary">${(cartTotal + (cartTotal >= 30 ? 0 : 5)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    // In a real app, you'd create a PaymentIntent on your server
    // and then confirm the payment here.
    // Since this is a demo/sandbox, we'll simulate success after a delay.
    
    setTimeout(() => {
      setProcessing(false);
      setSucceeded(true);
      clearCart();
    }, 2000);
  };

  if (succeeded) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 text-green-500">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Successful!</h2>
        <p className="text-muted-foreground mb-6">Thank you for your purchase. We've sent a confirmation email.</p>
        <a href="/" className="inline-block rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input required type="text" className="w-full rounded-md border border-input px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input required type="text" className="w-full rounded-md border border-input px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input required type="text" className="w-full rounded-md border border-input px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium mb-1">City</label>
            <input required type="text" className="w-full rounded-md border border-input px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium mb-1">ZIP / Postal Code</label>
            <input required type="text" className="w-full rounded-md border border-input px-3 py-2 text-sm" />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment</h2>
        <div className="rounded-md border p-4 bg-white shadow-sm">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
        </div>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </div>
      
      <button 
        disabled={processing || !stripe}
        className="w-full rounded-md bg-primary py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${(cartTotal + (cartTotal >= 30 ? 0 : 5)).toFixed(2)}`}
      </button>
    </form>
  );
}

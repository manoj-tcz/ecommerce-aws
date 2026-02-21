"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [ordered, setOrdered] = useState(false);
  const [orderId] = useState(() => `NB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const shipping = totalPrice >= 99 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  if (ordered) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
        <p className="text-muted mb-2">Thank you for your purchase</p>
        <p className="text-sm text-muted mb-8">Order ID: <span className="font-mono font-semibold text-foreground">{orderId}</span></p>
        <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-3">Empty Cart</h1>
        <p className="text-muted mb-8">Add some items before checking out.</p>
        <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {["Shipping", "Payment", "Review"].map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-all ${
              step > i + 1 ? "bg-success text-white" : step === i + 1 ? "bg-primary text-white" : "bg-surface text-muted"
            }`}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? "text-foreground" : "text-muted"}`}>{s}</span>
            {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? "bg-success" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">First Name</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="John" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="john@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Address</label>
                <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="123 Tech Street" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">City</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="San Francisco" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">State</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="CA" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">ZIP</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" defaultValue="94102" />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm mt-2 transition-colors">
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {["Credit Card", "PayPal", "Apple Pay"].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 cursor-pointer transition-colors">
                    <input type="radio" name="payment" defaultChecked={method === "Credit Card"} className="accent-primary" />
                    <span className="text-sm font-medium">{method}</span>
                  </label>
                ))}
              </div>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Card Number</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Expiry</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">CVC</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" placeholder="123" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted hover:border-primary hover:text-primary transition-all">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface">
                    <div className="w-12 h-12 rounded-lg bg-card overflow-hidden relative shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted hover:border-primary hover:text-primary transition-all">
                  Back
                </button>
                <button onClick={() => { clearCart(); setOrdered(true); }} className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors">
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border/60">
            <h3 className="font-bold mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal ({items.length} items)</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Shipping</span><span className={shipping === 0 ? "text-success" : ""}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted">Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

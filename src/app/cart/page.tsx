"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const shipping = totalPrice >= 99 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold mb-3">Your Cart is Empty</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">Looks like you haven&apos;t added anything yet. Explore our collection and find something you love.</p>
        <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <span className="text-sm text-muted">{items.length} {items.length === 1 ? "item" : "items"}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border/60">
              <Link href={`/shop/${item.product.id}`} className="relative w-24 h-24 rounded-xl bg-surface overflow-hidden shrink-0">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium text-primary uppercase tracking-wider">{item.product.category}</p>
                    <Link href={`/shop/${item.product.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-muted hover:text-secondary transition-colors shrink-0 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 py-1 hover:bg-surface transition-colors text-sm">−</button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 py-1 hover:bg-surface transition-colors text-sm">+</button>
                  </div>
                  <span className="font-bold">${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm text-muted hover:text-secondary transition-colors">
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border/60">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span className={shipping === 0 ? "text-success font-medium" : ""}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            {totalPrice < 99 && (
              <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary font-medium">
                  Add ${(99 - totalPrice).toFixed(2)} more for free shipping! 🚀
                </p>
              </div>
            )}

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-center text-sm transition-colors">
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="block w-full py-3 rounded-xl border border-border text-muted font-medium text-center text-sm mt-2 hover:border-primary hover:text-primary transition-all">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

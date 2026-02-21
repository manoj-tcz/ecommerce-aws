"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    addToast(`${product.name} added to cart`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface hover:bg-border flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-surface">
            {!imgError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z" />
                </svg>
              </div>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">{product.category}</p>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-warning" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted">{product.rating} ({product.reviews.toLocaleString()})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-muted line-through">${product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-semibold text-secondary">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{product.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {product.features.slice(0, 3).map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              {/* Quantity & Add */}
              {product.inStock ? (
                <div className="flex gap-2">
                  <div className="flex items-center border border-border rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 hover:bg-surface transition-colors text-sm">−</button>
                    <span className="px-3 py-2.5 text-sm font-medium min-w-[40px] text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-2.5 hover:bg-surface transition-colors text-sm">+</button>
                  </div>
                  <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors">
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button disabled className="w-full py-2.5 rounded-xl bg-surface text-muted font-medium text-sm cursor-not-allowed">
                  Out of Stock
                </button>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => { toggleWishlist(product); addToast(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist", "info"); }}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isInWishlist(product.id) ? "border-secondary text-secondary bg-secondary/5" : "border-border text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {isInWishlist(product.id) ? "♥ Wishlisted" : "♡ Wishlist"}
                </button>
                <Link
                  href={`/shop/${product.id}`}
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-center text-muted hover:border-primary hover:text-primary transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

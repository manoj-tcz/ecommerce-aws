"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "features" | "reviews">("description");
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const { addToRecentlyViewed } = useRecentlyViewed();

  if (!product) notFound();
  addToRecentlyViewed(product);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    addToast(`${product.name} added to cart`, "success");
  };

  const mockReviews = [
    { name: "Alex M.", rating: 5, date: "2 weeks ago", text: "Absolutely love this product. The quality is outstanding and it exceeded my expectations." },
    { name: "Sarah K.", rating: 4, date: "1 month ago", text: "Great value for money. Works perfectly and the build quality feels premium." },
    { name: "James R.", rating: 5, date: "2 months ago", text: "Best purchase I've made this year. Highly recommend to anyone looking for quality." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl bg-surface overflow-hidden">
          {!imgError ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" priority onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z" />
              </svg>
            </div>
          )}
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-white">{product.badge}</span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-warning" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted line-through">${product.originalPrice.toLocaleString()}</span>
                <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-muted leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.features.map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{f}</span>
            ))}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-success" : "bg-secondary"}`} />
            <span className="text-sm font-medium">{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          {/* Actions */}
          {product.inStock && (
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-surface transition-colors">−</button>
                <span className="px-4 py-3 font-medium min-w-[48px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-surface transition-colors">+</button>
              </div>
              <button onClick={handleAdd} className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-colors">
                Add to Cart — ${(product.price * qty).toLocaleString()}
              </button>
            </div>
          )}

          <button
            onClick={() => { toggleWishlist(product); addToast(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist", "info"); }}
            className={`w-full py-3 rounded-xl border text-sm font-medium transition-all ${
              isInWishlist(product.id) ? "border-secondary text-secondary bg-secondary/5" : "border-border text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {isInWishlist(product.id) ? "♥ In Your Wishlist" : "♡ Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex gap-1 border-b border-border mb-6">
          {(["description", "features", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "description" && (
          <p className="text-muted leading-relaxed max-w-3xl">{product.description}</p>
        )}
        {tab === "features" && (
          <ul className="space-y-3 max-w-3xl">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "reviews" && (
          <div className="space-y-6 max-w-3xl">
            {mockReviews.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-card border border-border/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{r.name}</span>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className={`w-4 h-4 ${j < r.rating ? "text-warning" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import Link from "next/link";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-primary/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-secondary/40 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Free shipping on orders over $99
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Tech That
              <span className="gradient-text"> Elevates</span>
              <br />Your Life
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Discover curated premium tech, audio gear, and smart gadgets from the world&apos;s best brands.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                Shop Now
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Free Shipping", sub: "On orders $99+" },
              { icon: "🔒", title: "Secure Payment", sub: "256-bit SSL" },
              { icon: "↩️", title: "Easy Returns", sub: "30-day policy" },
              { icon: "💬", title: "24/7 Support", sub: "We're here to help" },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{b.title}</p>
                  <p className="text-xs text-muted">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Browse Categories</h2>
            <p className="text-muted mt-1">Find exactly what you need</p>
          </div>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline hidden sm:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div className="text-center">
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-muted">{cat.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
              <p className="text-muted mt-1">Handpicked for you</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-primary hover:underline hidden sm:block">
              See All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative rounded-3xl overflow-hidden gradient-bg p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="w-full h-full bg-white rounded-full blur-3xl transform translate-x-1/2" />
          </div>
          <div className="relative max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">Limited Time</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Up to 40% Off Premium Audio
            </h2>
            <p className="text-white/70 mb-6">
              Upgrade your listening experience with world-class noise cancellation and studio-quality sound.
            </p>
            <Link
              href="/shop?category=audio"
              className="inline-flex px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Shop Audio →
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <RecentlyViewed />
      </div>
    </div>
  );
}

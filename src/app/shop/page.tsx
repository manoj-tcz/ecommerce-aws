"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || p.category === category;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCategory && matchPrice;
    });

    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
    }

    return result;
  }, [search, category, sort, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setPriceRange([0, 5000]);
    setSort("featured");
  };

  const hasFilters = search || category || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop</h1>
        <p className="text-muted">Explore our collection of {products.length} premium products</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Category</label>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!category ? "bg-primary/10 text-primary font-medium" : "text-muted hover:bg-surface"}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                      category === cat.slug ? "bg-primary/10 text-primary font-medium" : "text-muted hover:bg-surface"
                    }`}
                  >
                    <span>{cat.icon} {cat.name}</span>
                    <span className="text-xs">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                  className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:border-primary"
                />
                <span className="text-muted self-center">–</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                  className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="w-full py-2.5 rounded-xl border border-border text-sm font-medium text-muted hover:text-secondary hover:border-secondary transition-all">
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-surface transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Filters
            </button>

            <p className="text-sm text-muted hidden sm:block">{filtered.length} products</p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 rounded-2xl bg-card border border-border space-y-4 animate-fade-in">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setCategory("")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!category ? "bg-primary text-white" : "bg-surface text-muted"}`}>
                  All
                </button>
                {categories.map((cat) => (
                  <button key={cat.slug} onClick={() => setCategory(cat.slug)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === cat.slug ? "bg-primary text-white" : "bg-surface text-muted"}`}>
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {categories.find((c) => c.slug === category)?.name}
                  <button onClick={() => setCategory("")} className="hover:text-primary-dark">✕</button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  &ldquo;{search}&rdquo;
                  <button onClick={() => setSearch("")} className="hover:text-primary-dark">✕</button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}</div></div>}>
      <ShopContent />
    </Suspense>
  );
}

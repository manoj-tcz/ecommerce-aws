"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import ProductCard from "@/components/ProductCard";

function AccountContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(tabParam);
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const mockOrders = [
    { id: "NB-A7K2M1", date: "Feb 18, 2026", total: 799.00, status: "Delivered", items: 2 },
    { id: "NB-B3P9X5", date: "Feb 10, 2026", total: 349.99, status: "Shipped", items: 1 },
    { id: "NB-C1R8N4", date: "Jan 28, 2026", total: 528.99, status: "Delivered", items: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="p-5 rounded-2xl bg-card border border-border/60 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">J</div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-xs text-muted">john@example.com</p>
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Orders", value: "12", icon: "📦" },
                  { label: "Wishlist Items", value: String(wishlistItems.length), icon: "❤️" },
                  { label: "Total Spent", value: "$4,829", icon: "💳" },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 rounded-2xl bg-card border border-border/60">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border/60">
                <h3 className="font-semibold mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {mockOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-surface">
                      <div>
                        <p className="text-sm font-medium font-mono">{order.id}</p>
                        <p className="text-xs text-muted">{order.date} · {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${order.total.toFixed(2)}</p>
                        <span className={`text-xs font-medium ${order.status === "Delivered" ? "text-success" : "text-accent"}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold">Order History</h2>
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border/60">
                  <div>
                    <p className="font-semibold font-mono">{order.id}</p>
                    <p className="text-sm text-muted">{order.date} · {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-4">My Wishlist ({wishlistItems.length})</h2>
              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {wishlistItems.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard product={product} />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => { addToCart(product); removeFromWishlist(product.id); addToast("Moved to cart", "success"); }}
                          className="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-all"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => { removeFromWishlist(product.id); addToast("Removed from wishlist", "info"); }}
                          className="px-3 py-2 rounded-xl border border-border text-xs text-muted hover:border-secondary hover:text-secondary transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <span className="text-5xl">💔</span>
                  <p className="text-lg font-semibold mt-4 mb-2">Your wishlist is empty</p>
                  <p className="text-muted mb-6">Browse our products and save your favorites</p>
                  <Link href="/shop" className="inline-flex px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                    Explore Products
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-card border border-border/60">
                <h3 className="font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">First Name</label>
                    <input defaultValue="John" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                    <input defaultValue="Doe" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <button className="mt-4 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors">
                  Save Changes
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60">
                <h3 className="font-semibold mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                    <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">New Password</label>
                    <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <button className="mt-4 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8"><div className="animate-pulse h-96 bg-surface rounded-2xl" /></div>}>
      <AccountContent />
    </Suspense>
  );
}

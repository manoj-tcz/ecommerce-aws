import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[128px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            We believe technology should enhance life, not complicate it. NovaBuy curates the best tech from around the world, so you can focus on what matters.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "200+", label: "Premium Brands" },
            { value: "15+", label: "Countries Served" },
            { value: "99.8%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border border-border/60">
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Making Premium Tech Accessible</h2>
              <p className="text-muted leading-relaxed mb-4">
                Founded in 2023, NovaBuy started with a simple idea: everyone deserves access to the best technology without the premium markup. We partner directly with manufacturers and cut out unnecessary middlemen.
              </p>
              <p className="text-muted leading-relaxed">
                Every product in our store is hand-tested by our team. We only sell what we&apos;d use ourselves — no compromises on quality, ever.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: "Quality First", desc: "Every product hand-tested and vetted" },
                { icon: "🤝", title: "Direct Partnerships", desc: "Working with brands, not resellers" },
                { icon: "🌍", title: "Global Reach", desc: "Shipping to 15+ countries worldwide" },
                { icon: "💡", title: "Expert Curation", desc: "Tech enthusiasts picking the best" },
              ].map((v) => (
                <div key={v.title} className="p-5 rounded-2xl bg-card border border-border/60">
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="font-semibold text-sm mt-3 mb-1">{v.title}</h3>
                  <p className="text-xs text-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Meet the Team</h2>
          <p className="text-muted mt-2">The people behind NovaBuy</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Manoj Yadav", role: "Founder & CEO", emoji: "👨‍💻" },
            { name: "Priya Sharma", role: "Head of Design", emoji: "🎨" },
            { name: "Rahul Patel", role: "CTO", emoji: "⚙️" },
            { name: "Neha Singh", role: "Head of Operations", emoji: "📋" },
          ].map((member) => (
            <div key={member.name} className="text-center p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4 text-3xl">
                {member.emoji}
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="text-center p-12 rounded-3xl gradient-bg">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Explore?</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">Join thousands of tech enthusiasts who trust NovaBuy for their premium gadgets.</p>
          <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

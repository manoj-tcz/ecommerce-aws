"use client";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Message Sent!</h1>
        <p className="text-muted mb-8">We&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setSent(false)} className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto">Have a question or need help? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "📧", title: "Email Us", detail: "support@novabuy.com", sub: "We reply within 24 hours" },
            { icon: "📞", title: "Call Us", detail: "+1 (555) 123-4567", sub: "Mon–Fri, 9am–6pm EST" },
            { icon: "📍", title: "Visit Us", detail: "123 Innovation Drive", sub: "San Francisco, CA 94102" },
          ].map((card) => (
            <div key={card.title} className="p-6 rounded-2xl bg-card border border-border/60 text-center">
              <span className="text-3xl">{card.icon}</span>
              <h3 className="font-semibold mt-3 mb-1">{card.title}</h3>
              <p className="text-sm font-medium text-primary">{card.detail}</p>
              <p className="text-xs text-muted mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border/60">
            <h2 className="text-xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <input required className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary transition-colors" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Subject</label>
                <input required className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary transition-colors" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea required rows={5} className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us more..." />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

// ✅ PUT YOUR PRICE IDs HERE (price_... NOT prod_...)
const products = [
  {
    name: "Basic",
    price: "2Eur",
    priceId: "price_1TRWwTACh95vdJUnDRKVRAYk", // ← replace this
    description: "Perfect for individuals getting started.",
    features: ["Core features", "Email support", "1 project"],
    featured: false,
  },
  {
    name: "Pro",
    price: "1EUr",
    priceId: "price_1TRWWlACh95vdJUnlbTIxI1Q", // ← replace this
    description: "For professionals who need more power.",
    features: ["Everything in Basic", "Priority support", "10 projects"],
    featured: true,
  },
  {
    name: "Premium",
    price: "3Eur",
    priceId: "price_1TRWwhACh95vdJUnFXGIlPZX", // ← replace this
    description: "For teams who need everything.",
    features: ["Everything in Pro", "Dedicated support", "Unlimited projects"],
    featured: false,
  },
];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#dcfce7" />
    <polyline
      points="4.5,8 7,10.5 11.5,5.5"
      stroke="#16a34a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PricingPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuy = async (priceId: string) => {
    setLoadingId(priceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main style={{ fontFamily: "DM Sans, sans-serif", padding: "4rem 1rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "DM Serif Display, serif", fontSize: "42px", fontWeight: 400, textAlign: "center", margin: "0 0 0.5rem" }}>
        Simple, honest pricing
      </h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "3rem" }}>
        One-time payment. No subscriptions, no surprises.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {products.map((p) => (
          <div
            key={p.priceId}
            style={{
              border: p.featured ? "2px solid #3b82f6" : "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "1.5rem",
              background: "#fff",
              position: "relative",
            }}
          >
            {p.featured && (
              <span style={{
                display: "inline-block",
                background: "#eff6ff",
                color: "#2563eb",
                fontSize: "11px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "8px",
                marginBottom: "1rem",
                letterSpacing: "0.04em",
              }}>
                Most popular
              </span>
            )}

            <p style={{ fontSize: "12px", fontWeight: 500, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.4rem" }}>
              {p.name}
            </p>
            <p style={{ fontFamily: "DM Serif Display, serif", fontSize: "42px", margin: "0 0 0.25rem", lineHeight: 1 }}>
              {p.price} <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#9ca3af", fontWeight: 400 }}>one-time</span>
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 1.25rem", lineHeight: 1.5 }}>
              {p.description}
            </p>

            <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "1.25rem 0" }} />

            {p.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4b5563", marginBottom: "8px" }}>
                <CheckIcon />
                {f}
              </div>
            ))}

            <button
              onClick={() => handleBuy(p.priceId)}
              disabled={loadingId === p.priceId}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "1.25rem",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                border: p.featured ? "none" : "1px solid #e5e7eb",
                background: p.featured ? "#111827" : "transparent",
                color: p.featured ? "#fff" : "#111827",
                opacity: loadingId === p.priceId ? 0.6 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {loadingId === p.priceId ? "Loading..." : `Get ${p.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
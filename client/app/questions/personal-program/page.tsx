"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

const products = [
  {
    name: "Basic",
    price: "$11",
    priceId: "price_1TRWwTACh95vdJUnDRKVRAYk", // ← replace with USD price ID
    helperText: "This option helps us support those who need the lowest price — thank you for understanding.",
  },
  {
    name: "Standard",
    price: "$17",
    priceId: "price_1TRWWlACh95vdJUnlbTIxI1Q", // ← replace with USD price ID
    helperText: "This covers our exact production cost. A fair and honest choice.",
  },
  {
    name: "Premium",
    price: "$27",
    priceId: "price_1TRWwhACh95vdJUnFXGIlPZX", // ← replace with USD price ID
    helperText: "Thank you — your support helps us keep this accessible for everyone who needs it. 🙏",
  },
];

export default function PricingPage() {
  const [selected, setSelected] = useState(products[2]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Pull name from localStorage if you saved it during the quiz
    const saved = localStorage.getItem("userName");
    if (saved) setUsername(saved);
  }, []);

  const handleContinue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: selected.priceId }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col items-center justify-center gap-0 p-6 w-full">
        <div className="w-full max-w-md">

          {/* Passionate header */}
          <div className="mb-8 text-center">
            {username && (
              <p className="text-sm text-neutral-400 uppercase tracking-widest mb-2 font-medium">
                {username}
              </p>
            )}
            <h1 className="text-4xl font-semibold text-neutral-800 leading-tight mb-3">
              This is<br />your plan.
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
              It costs us approximately <strong className="text-neutral-700">$17</strong> to build each personal program.
              Choose what feels right for you — no subscription, ever.
            </p>
          </div>

          {/* Price buttons */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {products.map((p) => {
              const isSelected = selected.priceId === p.priceId;
              return (
                <button
                  key={p.priceId}
                  onClick={() => setSelected(p)}
                  className={`rounded-xl py-5 text-xl font-semibold transition-all ${
                    isSelected
                      ? "border-2 border-neutral-800 bg-white shadow-sm"
                      : "border border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {p.price}
                </button>
              );
            })}
          </div>

          {/* Helper text */}
          <p className="text-xs text-neutral-400 leading-relaxed mb-6 min-h-8 text-center px-2">
            {selected.helperText}
          </p>

          {/* CTA */}
          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full py-4 rounded-full bg-neutral-800 text-white font-semibold text-base hover:bg-neutral-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Processing..." : `Get my plan for ${selected.price}`}
          </button>

          <p className="text-center text-xs text-neutral-400 mt-3">
            One-time payment · No subscription · Instant delivery
          </p>

          {/* Legal links */}
          <div className="flex text-xs justify-between mt-6 text-neutral-400">
            <Link href="/refund-policy" className="hover:text-neutral-600 transition-colors">Refund Policy</Link>
            <Link href="/privacy-policy" className="hover:text-neutral-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-600 transition-colors">Terms of Service</Link>
            <a href="mailto:yourwellnesschatplan@gmail.com" className="hover:text-neutral-600 transition-colors">Contact</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
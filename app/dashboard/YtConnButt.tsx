'use client'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const YtConnButt = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    router.refresh();
    authClient.linkSocial({
      provider: "google",
      scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
      callbackURL: "/dashboard",
    });
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-neutral-200 text-sm text-neutral-500 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {/* YouTube icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.03 0 12 0 12s0 3.97.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.45 20.5 12 20.5 12 20.5s7.55 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.97 24 12 24 12s0-3.97-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
      </svg>
      {loading ? "Connecting..." : "Connect YouTube"}
    </button>
  );
};

export default YtConnButt;
'use client'
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const YtConnButt = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    authClient.listAccounts().then((accounts) => {
      const hasYoutube = accounts.data?.some(
  (a) => a.providerId === "google" && a.scopes?.includes("https://www.googleapis.com/auth/youtube.readonly")
);
      setConnected(!!hasYoutube);
    });
  }, []);

  const handleConnect = async () => {
    await authClient.linkSocial({ 
      provider: "google", 
      scopes: ["https://www.googleapis.com/auth/youtube.readonly"], 
      callbackURL: "/dashboard" 
    });
  };

 

  return (
    <Button className="bg-red-400" onClick={handleConnect}>
      Connect YouTube
    </Button>
  )
}

export default YtConnButt
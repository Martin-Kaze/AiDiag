'use client'
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation";
const YtConnButt = () => {
const router = useRouter();
   const handleConnect = async () => {
     
    // after OAuth / token is saved...
    router.refresh(); // 👈 this re-runs the server component
    authClient.linkSocial({ provider: "google", scopes: ["https://www.googleapis.com/auth/youtube.readonly"], callbackURL: "/dashboard" })
  };
  
  return (
   <button onClick={handleConnect}>
  Connect YouTube
</button>
  )
}

export default YtConnButt
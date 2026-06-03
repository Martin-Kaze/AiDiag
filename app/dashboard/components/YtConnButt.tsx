'use client'
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
const YtConnButt = () => {
const router = useRouter();
   const handleConnect = async () => {
     
    // after OAuth / token is saved...
    router.refresh(); // 👈 this re-runs the server component
    authClient.linkSocial({ provider: "google", scopes: ["https://www.googleapis.com/auth/youtube.readonly"], callbackURL: "/dashboard" })
  };
  
  return (
   <Button className="bg-red-400" onClick={handleConnect}>
  Connect YouTube
</Button>
  )
}

export default YtConnButt
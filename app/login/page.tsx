'use client'
import { Menu } from "@/components/ForAllPage/Menu"
import { Footer } from "@/components/ForAllPage/Footer"
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image"


const Page = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState<boolean>(false);

  const { data: session, isPending } = authClient.useSession();

useEffect(() => {

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("error") === "reauth") {
        authClient.signOut().then(() => {
          router.replace("/login"); // Clears the URL so it doesn't loop
        });
        return; 
      }
    }
    console.log(session);
    // 2. Normal flow: If they have a valid session, go to dashboard
    if (session) {
      router.push("/dashboard");
    }
    
    // We removed the aggressive signOut() block here!
  }, [session, router]);

const handleLogin = async () => {
    // 1. Removed the signOut() here!
    setSpinner(true);
    
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/login",
    });
  }

  // Prevent UI flickering while checking session
  if (isPending) {
    return <div className="flex h-screen items-center justify-center"><Spinner scale={10} /></div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full">
        <Menu />
      </header>
      
      <main className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">
        <p className="text-3xl font-bold text-center"> Try out now! </p>
        
        <div className="bg-white text-black flex items-center justify-center">
          <div className="p-8 border border-gray-200 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold mb-4">YouTube Analytics</h1>
            <Avatar className="mx-auto mb-4 border border-red-200">
              <AvatarImage
                src="/Youtube_logo.png"
                alt="Photo"
                className=""
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
          {spinner ? (
              <Spinner scale={10} className="mx-auto"/>
            ) : (
              <button 
                onClick={handleLogin} 
                disabled={spinner} // <--- ADD THIS
                className="px-6 py-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 font-medium text-black disabled:opacity-50" // <--- Added opacity for visual feedback
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </main> 
    
      <Footer/>
    </div>
  )
}

export default Page;
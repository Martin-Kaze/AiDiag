'use client'
import { Menu } from "@/components/ForAllPage/Menu"
import { Footer } from "@/components/ForAllPage/Footer"
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
const Page = () => {

  const [spinner, setSpinner] = useState <Boolean> (false)

  const handleLogin = async () => {
    setSpinner(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/login",
    });
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      
      <header className="w-full">
        <Menu />
      </header>
      
   
      <main className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">
         
        <p className="text-3xl font-bold text-center"> Hello login please </p>
    
        <div className="bg-white text-black flex items-center justify-center">
          <div className="p-8 border border-gray-200 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold mb-4">YouTube Analytics</h1>
            { (spinner) ? <Spinner scale={10} className="mx-auto"/> : <button 
              onClick={handleLogin} 
              className="px-6 py-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 font-medium text-black"
            >
              Sign in with Google
            </button> }
            
          </div>
        </div>

      </main> 
    
      <Footer/>
    
    </div>
  )
}

export default Page
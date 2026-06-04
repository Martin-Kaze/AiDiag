
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/login-form";
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
export default async function LoginPage() {
  const session = await auth.api.getSession({ 
    headers: await headers()  
  });

  if (session) redirect("/dashboard"); 

  return (
   <div className="flex flex-col min-h-screen w-full">

  <header className="w-full"><Menu /></header>
  
  <div className="flex flex-1 items-center justify-center">
    <LoginForm className="size-70 md:size-150" />
  </div>
   
  <Footer/>
</div>
   
  );
}
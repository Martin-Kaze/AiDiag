export const dynamic = "force-dynamic";

import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import { LoginForm } from "@/app/login/components/login-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full"><Menu /></header>
      <main className="relative flex flex-1 flex-col justify-center gap-4 mx-auto">
        <p className="text-3xl font-bold text-center mb-10">
          Your subscriptions, analyzed for your wellbeing.
        </p>
        <LoginForm className="mx-1" />
      </main>
      <Footer />
    </div>
  );
}
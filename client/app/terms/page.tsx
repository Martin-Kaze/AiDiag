import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full"><Menu /></header>
      <main className="flex flex-1 flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-medium text-neutral-800 mb-2">Terms of Service</h1>
        <p className="text-neutral-400 text-sm mb-8">Last updated: 2025</p>
        <div className="w-full space-y-4 text-sm text-neutral-600 leading-relaxed">
          <p>By purchasing a Wellness Plan, you agree to the following terms.</p>
          <div>
            <p className="font-medium text-neutral-800 mb-1">Product</p>
            <p>You are purchasing a one-time digital PDF wellness plan. There is no subscription. You will receive your plan via email after payment.</p>
          </div>
          <div>
            <p className="font-medium text-neutral-800 mb-1">Use</p>
            <p>Your plan is for personal use only. You may not resell, redistribute, or reproduce it without permission.</p>
          </div>
          <div>
            <p className="font-medium text-neutral-800 mb-1">Refunds</p>
            <p>We offer a 30-day refund policy. See our <a href="/refund-policy" className="underline">Refund Policy</a> for details.</p>
          </div>
          <div>
            <p className="font-medium text-neutral-800 mb-1">Disclaimer</p>
            <p>Our wellness plans are for informational purposes only and are not a substitute for professional medical advice.</p>
          </div>
          <div>
            <p className="font-medium text-neutral-800 mb-1">Contact</p>
            <p>Questions? <a href="mailto:yourwellnesschatplan@gmail.com" className="underline">yourwellnesschatplan@gmail.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
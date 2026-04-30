import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
 
export default function RefundPolicy() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full"><Menu /></header>
      <main className="flex flex-1 flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-medium text-neutral-800 mb-2">Refund Policy</h1>
        <p className="text-neutral-400 text-sm mb-8">Last updated: 2025</p>
        <div className="w-full space-y-4 text-sm text-neutral-600 leading-relaxed">
          <p>We want you to be happy with your Wellness Plan. If you are not satisfied, you can request a refund within <strong className="text-neutral-800">30 days</strong> of purchase.</p>
          <div>
            <p className="font-medium text-neutral-800 mb-1">How to request a refund:</p>
            <ol className="list-decimal list-inside space-y-1 text-neutral-600">
              <li>Email us at <a href="mailto:yourwellnesschatplan@gmail.com" className="underline">yourwellnesschatplan@gmail.com</a></li>
              <li>Provide a brief explanation of why the plan didn't work for you.</li>
            </ol>
          </div>
          <p>Once approved, your refund will be processed back to your original payment method via Stripe within <strong className="text-neutral-800">5–10 business days</strong>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
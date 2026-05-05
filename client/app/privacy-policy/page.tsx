import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen w-full text-center">
      <header className="w-full"><Menu /></header>
      <main className="flex flex-1 flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-medium text-neutral-800 mb-2">Privacy Policy</h1>
        <p className="text-neutral-400 text-sm mb-8">Last updated: 2026</p>
        <div className="w-full space-y-4 text-sm text-neutral-600 leading-relaxed">
          <p>Your privacy matters to us. Here is exactly what we collect and why.</p>
          <div>
            <p className="font-medium text-neutral-800 mb-1">What we collect</p>
            <p>everything...</p>
          </div>
          <div>
            <p className="font-medium text-neutral-800 mb-1">What we never do</p>
            <p>We never sell, share, or rent your data to third parties. Ever. (Atleast now)</p>
          </div>
          <div>
           
            <p className="font-medium text-neutral-800 mb-1">Contact</p>
            <p>Questions? Email us at <a href="mailto:yourwellnesschatplan@gmail.com" className="underline">yourwellnesschatplan@gmail.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
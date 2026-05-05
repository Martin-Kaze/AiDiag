import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen w-full ">
      <header className="w-full"><Menu /></header>
      <main className="flex flex-1 flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-medium text-neutral-800 mb-2">Terms of Service</h1>
        <p className="text-neutral-400 text-sm mb-8">Last updated: May 2026</p>
        
        <div className="w-full space-y-6 text-sm text-neutral-600 leading-relaxed">
          <section>
            <p className="font-medium text-neutral-800 mb-1">Content Ownership</p>
            <p>By posting content, you acknowledge it is public. You grant us a non-exclusive license to use, host, and distribute this content.</p>
          </section>

          <section>
            <p className="font-medium text-neutral-800 mb-1">Acceptable Use</p>
            <p>Users may not post illegal content or material that violates our community standards. We reserve the right to remove any content at our discretion.</p>
          </section>

          <section>
            <p className="font-medium text-neutral-800 mb-1">Medical Disclaimer</p>
            <p>All content on this website is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.</p>
          </section>

          <section>
            <p className="font-medium text-neutral-800 mb-1">Contact</p>
            <p>Questions? <a href="mailto:yourwellnesschatplan@gmail.com" className="underline hover:text-neutral-900 transition-colors">yourwellnesschatplan@gmail.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
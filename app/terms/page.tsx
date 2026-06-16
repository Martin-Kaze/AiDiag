import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full">
        <Menu />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-medium text-neutral-800 mb-2">Terms of Service</h1>
        <p className="text-neutral-400 text-sm mb-8">Last updated: June 2026</p>

        <div className="w-full space-y-6 text-sm text-neutral-600 leading-relaxed">

          {/* What the service does */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">What this service does</p>
            <p>
              Wellness.chat connects to your YouTube account read-only, analyses your
              subscriptions using AI, and gives you personalised wellness insights. We do not
              post, modify, or delete anything on your behalf.
            </p>
          </section>

          {/* Your data */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">Your data</p>
            <p>
              We do not store your YouTube subscription data. It is passed to an AI model in
              the moment and discarded. You can revoke our YouTube access at any time from
              your{" "}
              <a
                href="https://security.google.com/settings/security/permissions"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                Google security settings
              </a>
              .
            </p>
          </section>

          {/* YouTube Terms of Service — REQUIRED by Google policy */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">YouTube Terms of Service</p>
            <p>
              Wellness.chat uses YouTube API Services. By using this app, you agree that your
              use of YouTube features is also subject to the{" "}
              <a
                href="https://www.youtube.com/t/terms"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                YouTube Terms of Service
              </a>
              .
            </p>
          </section>

          {/* Medical disclaimer */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">Medical Disclaimer</p>
            <p>
              Wellness.chat is not a medical product. Nothing on this site is a substitute
              for professional medical advice, diagnosis, or treatment. If you are in crisis,
              please contact a medical professional.
            </p>
          </section>

          {/* Acceptable use */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">Acceptable Use</p>
            <p>
              You may not attempt to extract, scrape, or misuse data through this service. We
              reserve the right to suspend accounts that abuse the platform.
            </p>
          </section>

          {/* Changes */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">Changes</p>
            <p>
              We may update these terms. Continued use of the service after changes means you
              accept the new terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <p className="font-medium text-neutral-800 mb-1">Contact</p>
            <p>
              Questions?{" "}
              <a
                href="mailto:yourwellnesschatplan@gmail.com"
                className="underline hover:text-neutral-900 transition-colors"
              >
                yourwellnesschatplan@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
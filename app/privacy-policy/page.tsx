import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen w-full text-center">
      <header className="w-full">
        <Menu />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-medium text-neutral-800 mb-2">Privacy Policy</h1>
        <p className="text-neutral-400 text-sm mb-8">Last updated: June 2026</p>

        <div className="w-full space-y-6 text-sm text-neutral-600 leading-relaxed text-left">
          <p>
            Wellness.chat is a tool that analyses your YouTube subscriptions to give you
            personalised wellness insights. Here is exactly what happens with your data.
          </p>

          {/* What we access */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">What we access</p>
            <p>
              When you connect YouTube, we request read-only access to your subscription list
              via the YouTube Data API. We access your Google account email and name for login
              purposes only. We do not access your watch history, liked videos, comments, or
              any other YouTube data.
            </p>
          </div>

          {/* What we do with it */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">What we do with it</p>
            <p>
              Your subscription data is sent to DeepSeek, a third-party AI provider, solely
              to generate your wellness insights. DeepSeek does not retain your data beyond
              processing that single request. We do not store your subscription list, channel
              names, or any YouTube data on our servers. The data is used in the moment and
              discarded.
            </p>
          </div>

          {/* What we never do */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">What we never do</p>
            <p>
              We never store your YouTube subscription data. We never sell, share, or rent
              your data to any third parties beyond the AI processing described above. We
              never use your data for advertising. We never post, modify, or delete anything
              on your YouTube account.
            </p>
          </div>

          {/* Data protection */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">How we protect your data</p>
            <p>
              All data transmitted between your browser and our servers is encrypted in
              transit using HTTPS/TLS. Your subscription data is passed directly to the AI
              model over an encrypted connection and is never written to disk or stored in
              any database. We do not log the content of your YouTube subscription list.
            </p>
          </div>

          {/* Retention and deletion */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">Data retention and deletion</p>
            <p>
              We do not retain your YouTube subscription data. It is processed in memory to
              generate your insights and immediately discarded — nothing is written to our
              servers. Your Google account email and name are stored only for the purpose of
              maintaining your login session. You can delete your account and all associated
              data at any time by emailing us at{" "}
              <a href="mailto:yourwellnesschatplan@gmail.com" className="underline">
                yourwellnesschatplan@gmail.com
              </a>{" "}
              with the subject line "Delete my account". We will action this within 30 days.
            </p>
          </div>

          {/* YouTube API Services — required section */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">YouTube API Services</p>
            <p>
              Wellness.chat uses YouTube API Services. By using our app, you also agree to
              the{" "}
              <a
                href="https://www.youtube.com/t/terms"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                YouTube Terms of Service
              </a>{" "}
              and the{" "}
              <a
                href="https://policies.google.com/privacy"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                Google Privacy Policy
              </a>
              . You can revoke our access to your YouTube data at any time via your{" "}
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
          </div>

          {/* Contact */}
          <div>
            <p className="font-medium text-neutral-800 mb-1">Contact</p>
            <p>
              Questions about our privacy practices? Email us at{" "}
              <a href="mailto:yourwellnesschatplan@gmail.com" className="underline">
                yourwellnesschatplan@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
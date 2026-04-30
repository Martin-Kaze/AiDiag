import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t p-6 bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* The "Legal Crap" Stripe wants to see */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-medium">
          <Link href="/refund-policy" className="hover:text-foreground transition-colors">
            Refund Policy
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <a href="mailto:yourwellnesschatplan@gmail.com" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        {/* Your original copyright line */}
        <p className="text-sm text-neutral-400 text-center">
          © 2026 Wellness.chat
        </p>
      </div>
    </footer>
  )
}
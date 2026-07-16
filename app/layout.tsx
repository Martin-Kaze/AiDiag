import "./globals.css";
import StoreProvider from "@/state/stateProvider";
import { Inter, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip"


export const metadata = {
  title: "Wellness.chat",
  description: "Analyse your behaviour, social media, and daily patterns to help you become calmer, healthier and more at peace.",
  verification: {
    google: "SSJZMxzrCMzs0QFxmKBIt4koAYUFh9ZNrH50r2FF_28",
    other: {
      "msvalidate.01": "3788715B74BE2070194BA1B799D2AEA5",
    },
  },
};

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", "font-sans", inter.variable, quicksand.variable)}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QQTSCDPZXN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QQTSCDPZXN');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gray-50 font-sans text-foreground">
        <StoreProvider>
          <Suspense fallback={null} />
          <TooltipProvider>
      
            {children}
           
          </TooltipProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
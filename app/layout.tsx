import "./globals.css";
import StoreProvider from "@/state/stateProvider";
import { Public_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { AppSidebar } from "@/components/ForAllPage/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

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

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", publicSans.variable)}>
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
      <body className="min-h-screen bg-amber-50 font-sans text-foreground">
        <StoreProvider>
          <Suspense fallback={null} />
          <SidebarProvider defaultOpen={false}>
            <div className="fixed inset-y-0 left-0 z-50">
              <AppSidebar />
            </div>
            {children}
          </SidebarProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
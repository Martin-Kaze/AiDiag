import "./globals.css";
import StoreProvider from "@/state/stateProvider";
import PostHogPageView from "./PostHobPageView"; 
import { Public_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { AppSidebar } from "@/components/ForAllPage/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Script from "next/script"; // 1. Added Script import

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", publicSans.variable)}>
      <head>
        <meta name="msvalidate.01" content="3788715B74BE2070194BA1B799D2AEA5" />
        <meta name="google-site-verification" content="SSJZMxzrCMzs0QFxmKBIt4koAYUFh9ZNrH50r2FF_28" />
        {/* Google Analytics - G-QQTSCDPZXN */}
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
      <body className="min-h-screen bg-amber-50 font-sans text-foreground ">
        <StoreProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <SidebarProvider>
            <div className="fixed inset-y-0 left-0 z-50">
    <AppSidebar />
  </div>
            
          {children}
          </SidebarProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
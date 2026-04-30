import "./globals.css";
import StoreProvider from "@/state/stateProvider";
import PostHogPageView from "./PostHobPageView"; 
import { Public_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Suspense } from "react"; // 1. Import Suspense

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", publicSans.variable)}>
      <head>
        <meta name="msvalidate.01" content="3788715B74BE2070194BA1B799D2AEA5" />
      </head>
      <body className="min-h-screen bg-amber-50 font-sans text-foreground ">
        <StoreProvider>
          {/* 2. Wrap the tracker in Suspense */}
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
import "./globals.css";
import StoreProvider from "@/state/stateProvider";
import { Public_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en" className={cn("antialiased", publicSans.variable)}>

      <body className="min-h-screen bg-amber-50 font-sans text-foreground ">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
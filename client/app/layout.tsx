import "./globals.css";
import StoreProvider from "@/state/stateProvider";

import { Red_Hat_Text } from "next/font/google";

const redHat = Red_Hat_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-redhat", // Creates a CSS variable
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="royal-clinical">
      <body className={`bg-base-200 min-h-screen text-base-content ${redHat.variable} font-sans`}>
        <StoreProvider>
        {children}
        </StoreProvider>
        
      </body>
    </html>
  );
}
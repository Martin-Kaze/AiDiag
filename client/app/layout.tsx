import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="royal-clinical">
      <body className="bg-base-100 text-base-content">
        {children}
      </body>
    </html>
  );
}
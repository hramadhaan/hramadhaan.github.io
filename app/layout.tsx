import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "HANIF RAMADHAN ABDILLAH — Developer",
  description: "Mobile & Web Developer. 5+ years. Brutal. Direct. Effective.",
  keywords: [
    "Hanif Ramadhan Abdillah",
    "Mobile Developer",
    "Web Developer",
    "React Native",
    "Portfolio",
  ],
  openGraph: {
    title: "HANIF RAMADHAN ABDILLAH — Developer",
    description: "Mobile & Web Developer. 5+ years. Brutal. Direct. Effective.",
    type: "website",
    locale: "en_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

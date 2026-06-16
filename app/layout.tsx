// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// FIX: Brand title ko SmartIndia.club ke sath perfect sync kiya gaya hai (For SEO & Tabs)
export const metadata: Metadata = {
  title: "SmartIndia.club | Tournament & Learning Platform",
  description: "Building future skills through healthy digital learning, quiz-based challenges, logic practice and coding basics.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-slate-950 text-white">
        {/* Navigation Bar Header */}
        <Navbar />
        
        {/* Main Workspace Layout Container */}
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>

        {/* Dynamic Sticky Footer Layout */}
        <Footer />
      </body>
    </html>
  );
}
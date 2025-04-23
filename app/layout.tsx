// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GMF Reliability",
  description: "Portal Login GMF AeroAsia",
  icons: {
    icon: "/images/logo.png",  
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "GMF Reliability",
    description: "Portal Login GMF AeroAsia",
    siteName: "GMF AeroAsia",
    images: [
      {
        url: "/images/logo.png", 
        width: 600,
        height: 315,
        alt: "GMF AeroAsia",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}

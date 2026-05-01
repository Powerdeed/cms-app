import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import "../global components/icons/icons";
import Nav from "@global components/layout/nav/Nav";
import SideBar from "@global components/layout/SideBar";
import GlobalProvider from "@global utils/context/GlobalProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PTR Command Center",
    template: "%s | PTR Command Center", // Template for child pages
  },
  description: "A command center to edit PTR-Powerdeed website.",
  keywords: ["Powerdeed", "command center"],
  other: {
    "app-version": "1.0.0",
  },
  // You can also define specific Open Graph, Twitter, etc. metadata here
  openGraph: {
    title: "PTR Command Center",
    description: "A command center to edit PTR-Powerdeed website.",
    type: "website",
    url: "https://ptr-command-center.vercel.app/",
    siteName: "PTR Command Center",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${plusJakartaSans.variable} ${openSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <SpeedInsights />

        <GlobalProvider>
          <Nav />

          <SideBar />

          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}

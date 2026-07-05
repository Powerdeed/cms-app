import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import "../global components/icons/icons";
import Nav from "@global components/layout/nav/Nav";
import SideBar from "@global components/layout/SideBar";
import { GlobalProvider, UnsavedChangesGuard } from "@globals";
import { FileUploaderProvider } from "@global components/layout/fileUploader";

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
    default: "PTR CMS",
    template: "%s | PTR CMS", // Template for child pages
  },
  description: "A content management system to edit PTR-Powerdeed website.",
  keywords: ["Powerdeed", "cms"],
  other: {
    "app-version": "1.0.0",
  },
  // You can also define specific Open Graph, Twitter, etc. metadata here
  openGraph: {
    title: "PTR CMS",
    description: "A content management system to edit PTR-Powerdeed website.",
    type: "website",
    url: "https://cms.powerdeed.co.ke",
    siteName: "PTR CMS",
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
          <FileUploaderProvider>
            <Nav />

            <SideBar />

            <UnsavedChangesGuard />

            {children}
          </FileUploaderProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}

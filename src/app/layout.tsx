/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { defaultMetadata } from "@/lib/seo-config";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleTranslate from "@/components/GoogleTranslate";
import { Analytics } from "@vercel/analytics/next";

import { SEOIndicator } from "@/components/SEOIndicator";
import ChatAssistant from "@/components/ChatAssistant";
import SmoothScroll from "@/components/SmoothScroll";
// import DotsBackground from "@/components/DotsBackground";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script src="https://www.payhere.lk/lib/payhere.js" strategy="lazyOnload" />
        {/* google adsense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7796031889927448"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <SmoothScroll> */}
            <Header />
            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          {/* </SmoothScroll> */}
        </ThemeProvider>
        <WhatsAppButton />
        <GoogleTranslate />
        <ChatAssistant/>
        
        {/* Visual indicator */}
        <SEOIndicator />

        {/* Debug panel - remove in production */}
        {/* <SEODebug /> */}
        {/* <DotsBackground/> */}

        <Analytics />
      </body>
    </html>
  );
}


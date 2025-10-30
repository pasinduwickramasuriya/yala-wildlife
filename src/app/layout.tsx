/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

import { SEOIndicator } from "@/components/SEOIndicator";




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
          <Header />
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
        <WhatsAppButton />
        {/* <SEOOptimizer 
        pageTitle={"Yala Safari Tours | #1 Wildlife Experience Sri Lanka"} 
        pageDescription={"Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps."} 
        pageContent={"Yala National Park is Sri Lanka's premier safari destination..."} 
        pageUrl={"https://www.yalawildlife.com/"}/> */}

        {/* <AutoSEOWrapper children={undefined} 
        pageTitle={"Yala Safari Tours | #1 Wildlife Experience Sri Lanka"} 
        pageDescription={"Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps."} 
        pageType={"home"}/> */}

        {/* Visual indicator */}
        <SEOIndicator />

        {/* Debug panel - remove in production */}
        {/* <SEODebug /> */}
      </body>
    </html>
  );
}


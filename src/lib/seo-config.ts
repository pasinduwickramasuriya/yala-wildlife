export const siteConfig = {
  name: "Yala Wildlife Safari",
  description: "Book authentic Yala National Park safari experiences with professional guides and comfortable jeeps. Best rates for wildlife tours in Sri Lanka.",
  url: "https://yalawildlife.com",
  ogImage: "https://yalawildlife.com/og-image.jpg",
  links: {
    facebook: "https://facebook.com/yalawildlife",
    instagram: "https://instagram.com/yalawildlife",
  }
}

export const defaultMetadata = {
  metadataBase: new URL("https://yalawildlife.com"),
  title: {
    default: "Yala Safari Jeep Booking | Best Wildlife Tours in Sri Lanka",
    template: "%s | Yala Wildlife Safari"
  },
  description: "Book your Yala National Park safari jeep online. Professional guides, comfortable vehicles, and guaranteed wildlife experiences. Best rates for Yala safaris.",
  keywords: [
    "Yala safari booking",
    "Yala National Park jeep service",
    "book Yala safari jeep",
    "Yala wildlife tours",
    "Sri Lanka safari booking",
    "Yala National Park tours",
    "leopard safari Sri Lanka",
    "Yala safari packages",
    "Yala park entrance tickets"
  ],
  authors: [{ name: "Yala Wildlife Safari" }],
  creator: "Yala Wildlife Safari",
  publisher: "Yala Wildlife Safari",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yalawildlife.com",
    title: "Yala Safari Jeep Booking | Best Wildlife Tours in Sri Lanka",
    description: "Book your Yala National Park safari jeep online. Professional guides, comfortable vehicles, and guaranteed wildlife experiences. Best rates for Yala safaris.",
    siteName: "Yala Wildlife Safari",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yala Safari Jeep Booking | Best Wildlife Tours in Sri Lanka",
    description: "Book your Yala National Park safari jeep online. Professional guides, comfortable vehicles, and guaranteed wildlife experiences.",
    images: ["https://yalawildlife.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://yalawildlife.com",
  }
};

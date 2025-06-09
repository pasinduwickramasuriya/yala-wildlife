import { Metadata } from "next";
import { siteConfig } from "./seo-config";

export interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  image = "/images/og-default.jpg",
}: MetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yalawildlife",
    },
    alternates: {
      canonical: url,
    },
    keywords: [
      "Yala safari booking",
      "Yala National Park jeep service",
      "book Yala safari jeep",
      `${title} Yala wildlife tours`,
      "Sri Lanka safari booking",
      "Yala National Park tours",
      "leopard safari Sri Lanka",
      "Yala safari packages",
      "Yala park entrance tickets",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: siteConfig.name }],
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export function generatePackageMetadata(packageData: {
  name: string;
  description: string;
  slug: string;
  imageUrl: string;
}): Metadata {
  return generateMetadata({
    title: `${packageData.name} - Yala Safari Tour Package`,
    description: packageData.description.slice(0, 155) + "...",
    path: `/safari-packages/${packageData.slug}`,
    image: packageData.imageUrl,
  });
}

export function generateBlogMetadata(blogData: {
  title: string;
  content: string;
  slug: string;
  imageUrl?: string;
}): Metadata {
  return generateMetadata({
    title: `${blogData.title} | Yala Wildlife Blog`,
    description: blogData.content.slice(0, 155) + "...",
    path: `/blog/${blogData.slug}`,
    image: blogData.imageUrl,
  });
}

export const defaultPageMetadata = {
  home: generateMetadata({
    title: "Book Yala Safari Jeeps | Best Wildlife Tours in Sri Lanka",
    description: "Book your Yala National Park safari jeep online. Professional guides, comfortable vehicles, and guaranteed wildlife experiences. Best rates for Yala safaris.",
    path: "/",
  }),
  packages: generateMetadata({
    title: "Yala Safari Packages | All-Inclusive Wildlife Tours",
    description: "Choose from our range of Yala National Park safari packages. Morning, evening, and full-day tours available with expert guides and comfortable vehicles.",
    path: "/safari-packages",
  }),
  blog: generateMetadata({
    title: "Yala Wildlife Blog | Safari Stories & Wildlife Updates",
    description: "Read about wildlife encounters, safari experiences, and latest updates from Yala National Park. Expert tips and guides for your next safari adventure.",
    path: "/blog",
  }),
  contact: generateMetadata({
    title: "Contact Us | Yala Wildlife Safari Booking",
    description: "Get in touch with us for safari bookings, inquiries, and custom tour packages. We're here to help you plan your perfect Yala wildlife experience.",
    path: "/contact",
  }),
  reviews: generateMetadata({
    title: "Customer Reviews | Yala Safari Experience",
    description: "Read authentic reviews from our safari guests. Learn about their wildlife encounters and experiences with our professional guides and services.",
    path: "/reviews",
  }),
};
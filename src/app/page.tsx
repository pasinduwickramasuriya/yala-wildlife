import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo-config";
import ClientHome from "./ClientHome";

export const metadata: Metadata = {
  title:
    siteConfig.name ||
    "Book Yala Safari Jeeps | Best Wildlife Tours in Yala National Park",
  description:
    siteConfig.description ||
    "Expert-guided Yala National Park safari tours with comfortable jeeps. Book your wildlife adventure to spot leopards, elephants, and more. Best rates guaranteed.",
  openGraph: {
    title:
      siteConfig.name ||
      "Book Yala Safari Jeeps | Best Wildlife Tours in Yala National Park",
    description:
      siteConfig.description ||
      "Expert-guided Yala National Park safari tours with comfortable jeeps. Book your wildlife adventure to spot leopards, elephants, and more.",
    url: siteConfig.url || "/",
    type: "website",
  },
};

export default function Home() {
  return <ClientHome />;
}

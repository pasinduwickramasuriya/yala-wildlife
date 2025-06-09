import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import ClientSafariPackages from "./ClientSafariPackages";

export const metadata: Metadata = generateMetadata({
  title: "Yala Safari Packages | Best Wildlife Tours in Sri Lanka",
  description:
    "Book your perfect Yala safari package. Morning, evening, and full-day safari tours available with expert guides and comfortable jeeps. Best rates guaranteed.",
  path: "/safari-packages",
});

export default function SafariPackages() {
  return <ClientSafariPackages />;
}

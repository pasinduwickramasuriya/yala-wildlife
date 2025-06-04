"use client";

// import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Team", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const safariLinks = [
  { name: "Safari Packages", href: "/safari-packages" },
  { name: "Yala National Park", href: "/about" },
  { name: "Booking Info", href: "/safari-packages" },
  { name: "FAQs", href: "contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/pasindu.sadanjana.98/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/yala-safari",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/yala-safari" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/contact" },
  { name: "Terms of Service", href: "/safari-packages" },
];

export default function Footer() {
  // const [email, setEmail] = useState("");

  // const handleSubscribe = (e) => {
  //   e.preventDefault();
  //   console.log("Subscribed with:", email);
  //   setEmail("");
  // };

  return (
    <footer className="bg-transparent h-10 backdrop-blur-lg text-foreground py-16 relative ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link
            href="/"
            className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300"
          >
            Yala Wildlife
          </Link>
          <p className="text-muted-foreground text-sm">
            Your gateway to unforgettable safari adventures in Yala National
            Park.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="text-foreground/80 text-sm">
                Yala National Park, Sri Lanka
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-foreground/80 text-sm">
                +94 778 158 004
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="text-foreground/80 text-sm">
                pasindusadanjana17@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-foreground">Company</h4>
          <ul className="space-y-3">
            {companyLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="text-foreground/80 hover:text-green-600 transition-colors duration-300 text-sm"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-foreground">Safari</h4>
          <ul className="space-y-3">
            {safariLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="text-foreground/80 hover:text-green-600 transition-colors duration-300 text-sm"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-foreground">
            Connect With Us
          </h4>
          <div className="flex gap-4 mb-6">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors duration-300"
              >
                <Icon className="h-5 w-5 text-green-600" />
              </Link>
            ))}
          </div>
          <ul className="space-y-3">
            {legalLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="text-foreground/80 hover:text-green-600 transition-colors duration-300 text-sm"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-border/50 py-6 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Yala Wildlife Jeep Service. All rights
          reserved Made with ❤ love by Pasindu Wickramasuriya.
        </p>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";

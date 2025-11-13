// "use client";

// // import { useState } from "react";
// import Link from "next/link";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   MapPin,
//   Phone,
//   Mail,
// } from "lucide-react";

// const companyLinks = [
//   { name: "About Us", href: "/about" },
//   { name: "Our Team", href: "/about" },
//   { name: "Blog", href: "/blog" },
//   { name: "Contact Us", href: "/contact" },
// ];

// const safariLinks = [
//   { name: "Safari Packages", href: "/safari-packages" },
//   { name: "Yala National Park", href: "/about" },
//   { name: "Booking Info", href: "/safari-packages" },
//   { name: "FAQs", href: "contact" },
// ];

// const socialLinks = [
//   {
//     name: "Facebook",
//     icon: Facebook,
//     href: "https://www.facebook.com/pasindu.sadanjana.98/",
//   },
//   {
//     name: "Instagram",
//     icon: Instagram,
//     href: "https://instagram.com/yala-safari",
//   },
//   { name: "Twitter", icon: Twitter, href: "https://twitter.com/yala-safari" },
// ];

// const legalLinks = [
//   { name: "Privacy Policy", href: "/contact" },
//   { name: "Terms of Service", href: "/safari-packages" },
// ];

// export default function Footer() {

//   return (
//     <footer className="bg-transparent h-10 backdrop-blur-lg text-foreground py-16 relative ">
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//         <div className="space-y-6">
//           <Link
//             href="/"
//             className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300"
//           >
//             Yala Wildlife
//           </Link>
//           <p className="text-muted-foreground text-sm">
//             Your gateway to unforgettable safari adventures in Yala National
//             Park.
//           </p>
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <MapPin className="h-5 w-5 text-green-600" />
//               <span className="text-foreground/80 text-sm">
//                 Yala National Park, Sri Lanka
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Phone className="h-5 w-5 text-green-600" />
//               <span className="text-foreground/80 text-sm">
//                 +94 778 158 004
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Mail className="h-5 w-5 text-green-600" />
//               <span className="text-foreground/80 text-sm">
//                 pasindusadanjana17@gmail.com
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <h4 className="text-lg font-semibold text-foreground">Company</h4>
//           <ul className="space-y-3">
//             {companyLinks.map(({ name, href }) => (
//               <li key={name}>
//                 <Link
//                   href={href}
//                   className="text-foreground/80 hover:text-green-600 transition-colors duration-300 text-sm"
//                 >
//                   {name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="space-y-6">
//           <h4 className="text-lg font-semibold text-foreground">Safari</h4>
//           <ul className="space-y-3">
//             {safariLinks.map(({ name, href }) => (
//               <li key={name}>
//                 <Link
//                   href={href}
//                   className="text-foreground/80 hover:text-green-600 transition-colors duration-300 text-sm"
//                 >
//                   {name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="space-y-6">
//           <h4 className="text-lg font-semibold text-foreground">
//             Connect With Us
//           </h4>
//           <div className="flex gap-4 mb-6">
//             {socialLinks.map(({ name, icon: Icon, href }) => (
//               <Link
//                 key={name}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors duration-300"
//               >
//                 <Icon className="h-5 w-5 text-green-600" />
//               </Link>
//             ))}
//           </div>
//           <ul className="space-y-3">
//             {legalLinks.map(({ name, href }) => (
//               <li key={name}>
//                 <Link
//                   href={href}
//                   className="text-foreground/80 hover:text-green-600 transition-colors duration-300 text-sm"
//                 >
//                   {name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="mt-12 border-t border-border/50 py-6 text-center">
//         <p className="text-muted-foreground text-sm">
//           © {new Date().getFullYear()} Yala Wildlife Jeep Service. All rights
//           reserved Made with ❤ by Pasindu Wickramasuriya.
//         </p>
//       </div>
//     </footer>
//   );
// }

// Footer.displayName = "Footer";




"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Package, // New Icon
  Users, // New Icon
  MessageSquare, // New Icon
  HelpCircle, // New Icon
  ArrowRight, // New Icon
  CalendarCheck, // New Icon
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this


const RabbitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-green-400", className)} // Inherits the green color
  >
    <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M17.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M6.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M15.5 19.5c.5-1.5 1-3.5 0-5" />
    <path d="M8.5 19.5c-.5-1.5-1-3.5 0-5" />
    <path d="M12 21a7.5 7.5 0 0 0 5-2.5c1.5-2 0-5.5-5-5.5s-6.5 3.5-5 5.5A7.5 7.5 0 0 0 12 21Z" />
  </svg>
);


// --- Footer Link Data ---

const contactLinks = [
  {
    name: "Yala National Park, Sri Lanka",
    href: "#", // You can link this to a Google Map
    icon: MapPin,
  },
  {
    name: "+94 778 158 004",
    href: "tel:+94778158004",
    icon: Phone,
  },
  {
    name: "pasindusadanjana17@gmail.com",
    href: "mailto:pasindusadanjana17@gmail.com",
    icon: Mail,
  },
];

const exploreLinks = [
  { name: "Safari Packages", href: "/safari-packages", icon: Package },
  { name: "About Us", href: "/about", icon: Users },
  { name: "Blog", href: "/blog", icon: MessageSquare },
  { name: "Booking & FAQs", href: "/contact", icon: HelpCircle },
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

// --- Main Footer Component ---

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950/70 backdrop-blur-lg text-gray-200 py-16 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Social */}
        <div className="space-y-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-green-400 hover:text-green-300 transition-colors duration-300"
          >
            <RabbitIcon className="h-7 w-7" />
            <span>Yala Wildlife</span>
          </Link>
          <p className="text-gray-400 text-sm">
            Your gateway to unforgettable safari adventures in Yala National
            Park.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="p-3 rounded-full bg-white/10 text-green-400 hover:bg-green-500 hover:text-black transition-all duration-300"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Get in Touch */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
          <ul className="space-y-4">
            {contactLinks.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                >
                  <Icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm group-hover:underline">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Explore */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Explore</h4>
          <ul className="space-y-4">
            {exploreLinks.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                >
                  <Icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm group-hover:underline">{name}</span>
                </Link>
              </li>
            ))}
            {/* Special Highlighted CTA */}
            <li>
              <Link
                href="/safari-packages"
                className="flex items-center gap-3 text-green-400 font-bold hover:text-green-300 transition-colors duration-300 group"
              >
                <CalendarCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-sm group-hover:underline">Book Your Safari</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
          <p className="text-gray-400 text-sm">
            Get the latest safari news, package deals, and wildlife sightings
            straight to your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              aria-label="Submit email"
              className="p-3 rounded-lg bg-green-500 text-black hover:bg-green-600 transition-colors duration-300"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="container mx-auto px-4 mt-12 border-t border-white/10 pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Yala Wildlife. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="text-gray-500 hover:text-green-400 transition-colors duration-300 text-sm"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-xs text-center mt-6">
          Made with ❤ by Pasindu Wickramasuriya
        </p>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
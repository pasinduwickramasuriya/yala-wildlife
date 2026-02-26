"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
// 1. Import CSS
import "@/app/style/header.css";

// --- Icon Component ---
const PawPrintIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} // Class passed from parent controls color
  >
    <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M17.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M6.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M15.5 19.5c.5-1.5 1-3.5 0-5" />
    <path d="M8.5 19.5c-.5-1.5-1-3.5 0-5" />
    <path d="M12 21a7.5 7.5 0 0 0 5-2.5c1.5-2 0-5.5-5-5.5s-6.5 3.5-5 5.5A7.5 7.5 0 0 0 12 21Z" />
  </svg>
);

// Define the Package type
interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

// Interface for NavItems
interface NavItemsProps {
  items: { name: string; link: string }[];
  packages: Package[];
  className?: string;
  onItemClick?: () => void;
}

export default function Header() {
  const { scrollY } = useScroll();

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [expandedPackages, setExpandedPackages] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 100;
    if (isScrolled !== visible) {
      setVisible(isScrolled);
    }
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/package");
        if (!response.ok) throw new Error("Failed to fetch packages");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setExpandedPackages(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedPackages(false);
  };

  const handleLinkClick = () => closeMenu();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Safari Packages", link: "/safari-packages" },
    { name: "Tours/pickup-Dropoff", link: "/pickup-dropoff" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Reviews", link: "/reviews" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <>
      <motion.header className="site-header">
        {/* --- DESKTOP NAV --- */}
        <NavBody visible={visible}>
          {/* Logo */}
          <Link href="/" className="logo-desktop">
            <PawPrintIcon className="w-6 h-6 text-[#00ff00]" />
            <span className="logo-text">Yala Wildlife</span>
          </Link>

          {/* Navigation Items */}
          <NavItems
            items={navItems}
            packages={packages}
            className="flex-1 justify-center"
          />

          {/* Right Actions */}
          <div className="actions-container">
            <ModeToggle />
            <div className="separator"></div>
            <Link href="/safari-packages" className="book-btn">
              Book Now
            </Link>
          </div>
        </NavBody>

        {/* --- MOBILE NAV --- */}
        <MobileNavWrapper>
          {/* Left Pill: Logo */}
          <Link href="/" className="mobile-pill">
            <PawPrintIcon className="w-5 h-5 text-[#00ff00]" />
            <span className="font-bold text-[#00ff00] text-sm">Yala Wildlife</span>
          </Link>

          {/* Right Pill: Menu Button */}
          <button
            onClick={toggleMenu}
            className="mobile-pill mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </MobileNavWrapper>
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-overlay"
          >
            <div className="overlay-backdrop" onClick={closeMenu} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="mobile-content"
            >
              <div className="mobile-inner">

                {/* Close Button */}
                <motion.button onClick={closeMenu} className="close-btn">
                  <X className="w-6 h-6" />
                </motion.button>

                {/* <div className="text-center mb-10">
                  <Link href="/" onClick={handleLinkClick} className="mobile-logo-text">
                    <PawPrintIcon className="w-10 h-10" />
                    <span>Yala Wildlife</span>
                  </Link>
                </div> */}

                <div className="mobile-link-container">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="w-full text-center"
                    >
                      {item.name === "Safari Packages" ? (
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => setExpandedPackages(!expandedPackages)}
                            className="mobile-dropdown-btn"
                          >
                            <span>{item.name}</span>
                            <ChevronDown className={`h-5 w-5 transition-transform ${expandedPackages ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {expandedPackages && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mobile-sub-menu"
                              >
                                <div className="mobile-sub-inner">
                                  {packages.length > 0 ? (
                                    packages.map((pkg) => (
                                      <Link key={pkg.id} href={`/safari-packages/${pkg.slug}`} onClick={handleLinkClick} className="mobile-sub-link">
                                        {pkg.name}
                                      </Link>
                                    ))
                                  ) : (
                                    <div className="text-sm text-neutral-500">Loading...</div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link href={item.link} onClick={handleLinkClick} className="mobile-main-link">
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col items-center gap-6 w-full">
                  <Link href="/safari-packages" onClick={handleLinkClick} className="mobile-cta-btn">
                    Book Now
                  </Link>
                  <div className="mobile-theme-wrapper">
                    <span className="text-xs text-neutral-400">Theme</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- DESKTOP CONTAINER ---
const NavBody = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => (
  <motion.div
    animate={{ y: visible ? 0 : 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className="nav-body"
  >
    <div className="nav-body-content">
      {children}
    </div>
  </motion.div>
);

// --- MOBILE CONTAINER ---
const MobileNavWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="mobile-nav-wrapper">
    {children}
  </div>
);

// --- NAV ITEMS ---
const NavItems: React.FC<NavItemsProps> = ({
  items,
  packages,
  className,
  onItemClick,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={`nav-items-container ${className}`}
    >
      {items.map((item, idx) => (
        <div key={item.name} className="nav-item-group">
          <Link
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            href={item.link}
            className="nav-pill"
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="hover-bg"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            <span className={`nav-text ${hovered === idx ? "text-lime" : ""}`}>
              {item.name}
            </span>

            {item.name === "Safari Packages" && (
              <ChevronDown className={`dropdown-icon ${hovered === idx ? "rotate" : ""}`} />
            )}
          </Link>

          {item.name === "Safari Packages" && (
            <div className="dropdown-menu">
              {packages.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {packages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      href={`/safari-packages/${pkg.slug}`}
                      className="dropdown-link"
                      onClick={onItemClick}
                    >
                      {pkg.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-2 text-xs text-neutral-500 text-center">
                  Loading...
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

// Define the Package type based on your Prisma schema and route
interface Package {
  id: string; // MongoDB ObjectId as string
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);

  // Handle scroll effect for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch packages from API
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

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close mobile menu
  const closeMenu = () => setIsOpen(false);

  // Handle link click to close menu
  const handleLinkClick = () => closeMenu();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        closeMenu();
      }
    };

    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/25 backdrop-blur-lg  ${
        scrolled ? "" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-green-600 transition-colors duration-300"
          >
            Yala Safari
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              "Home",
              "Safari Packages",
              "About",
              "Contact",
              "Reviews",
              "Blog",
            ].map((item) => (
              <div key={item} className="relative group">
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Safari Packages"
                      ? "/safari-packages"
                      : item === "Reviews"
                      ? "/reviews"
                      : `/${item.toLowerCase()}`
                  }
                  className="text-foreground text-sm hover:text-green-600 font-medium flex items-center transition-colors duration-300"
                >
                  {item}
                  {item === "Safari Packages" && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>
                {item === "Safari Packages" && (
                  <div className="absolute left-0 mt-2 w-48 bg-popover/90 backdrop-blur-md rounded-md shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-border/50">
                    {packages.length > 0 ? (
                      packages.map((pkg) => (
                        <Link
                          key={pkg.id}
                          href={`/safari-packages/${pkg.slug}`}
                          className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 rounded-md transition-colors duration-200"
                        >
                          {pkg.name}
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-muted-foreground">
                        Loading packages...
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <ModeToggle />
            <Link
              href="/safari-packages"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground focus:outline-none p-2 menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/70 backdrop-blur-lg border-t border-border/50 mobile-menu">
          <div className="px-4 py-4 space-y-1">
            {[
              "Home",
              "Safari Packages",
              "About",
              "Contact",
              "Reviews",
              "Blog",
            ].map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : item === "Safari Packages"
                    ? "/safari-packages"
                    : item === "Reviews"
                    ? "/reviews"
                    : `/${item.toLowerCase()}`
                }
                className="block py-3 px-2 text-foreground hover:bg-muted/50 rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                {item}
              </Link>
            ))}
            {/* Mobile Dropdown for Safari Packages */}
            <div className="py-2">
              <span className="block py-3 px-2 text-foreground font-medium">
                Safari Packages
              </span>
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    href={`/safari-packages/${pkg.slug}`}
                    className="block py-2 px-4 text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    {pkg.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Loading packages...
                </div>
              )}
            </div>
            <div className="py-2 flex items-center justify-center">
              <ModeToggle />
            </div>
            <Link
              href="/safari-packages"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 text-center"
              onClick={handleLinkClick}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

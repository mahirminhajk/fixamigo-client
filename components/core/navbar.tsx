"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Search, MapPin } from "lucide-react";
import CartBtn from "../buttons/cartBtn";
import ProfileBtn from "../buttons/profileBtn";
import MobileNavMenu from "./mobileNavMenu";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname

interface NavbarProps {
  city?: string;
}

export default function Navbar({ city }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function to handle search icon click
  const handleSearchClick = () => {
    // Dispatch a custom event to focus the search input
    window.dispatchEvent(new CustomEvent("focusProductSearch"));
  };

  // Determine if the current page is in the repair section
  // Assuming URLs for repair section start with /repair/
  const isRepairSection = pathname.startsWith("/repair");

  let desktopNavLinks;
  if (isRepairSection) {
    desktopNavLinks = (
      <>
        <Link
          href="/"
          className="hover:text-blue-500 transition"
          title="Go to Home"
        >
          Home
        </Link>
        <Link
          href="/repair"
          className="hover:text-blue-500 transition"
          title="Browse all repair services"
        >
          All Repairs
        </Link>
        <Link
          href="/my-services"
          className="hover:text-blue-500 transition"
          title="View your orders"
        >
          Orders
        </Link>
      </>
    );
  } else {
    desktopNavLinks = (
      <>
        <Link
          href="/"
          className="hover:text-blue-500 transition"
          title="Go to Home"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-blue-500 transition"
          title="Learn more About us"
        >
          About
        </Link>
        <Link
          href="/my-services"
          className="hover:text-blue-500 transition"
          title="View your orders"
        >
          Orders
        </Link>
        <Link
          href="/contact"
          className="hover:text-blue-500 transition"
          title="Contact us"
        >
          Contact
        </Link>
      </>
    );
  }

  return (
    <>
      {/* Testing Phase Banner */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
        <div className="relative z-10">
          <Link
            href="/support-request"
            className="block hover:bg-black/10 transition-colors duration-300 cursor-pointer"
            title="Share feedback or request support"
          >
            <div className="container mx-auto px-4 py-2 sm:px-6 sm:py-3">
              {/* Mobile Layout */}
              <div className="flex flex-col sm:hidden text-center gap-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#D2691E] rounded-full animate-pulse"></div>
                  <div className="text-sm font-semibold">
                    We&apos;re Just Getting Started!
                  </div>
                </div>
                <div className="text-xs opacity-90 leading-tight px-2">
                  Early version — Your feedback helps us improve!
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-center text-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#D2691E] rounded-full animate-pulse"></div>
                  <div className="text-base font-semibold">
                    We&apos;re Just Getting Started!
                  </div>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="text-sm opacity-90">
                  This is our early version — we&apos;re improving every day.
                  Your feedback helps us make it better!
                </div>
                <div className="flex items-center gap-1 text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
                  <span>Share Feedback</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Animated background effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                        transform -skew-x-12 translate-x-[-100%] animate-pulse"
        ></div>
      </div>

      <header className="bg-white shadow-md z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div>
            <Link href="/" title="Go to Home">
              <Image
                src="/logos/text.png"
                alt="fixamigo logo"
                title="Fixamigo Logo"
                width={100}
                height={40}
                className="h-8 sm:h-10 w-auto cursor-pointer"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-lg font-medium">
            {desktopNavLinks}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {city && (
              <div className="flex flex-col items-center text-xs text-gray-700 mr-2">
                <MapPin className="w-4 h-4 mb-0.5 text-gray-500" />
                <span className="truncate max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px]">
                  {city}
                </span>
              </div>
            )}
            <Search
              className="w-6 h-6 cursor-pointer"
              onClick={handleSearchClick}
            />
            <CartBtn />
            <ProfileBtn />
            {/* Improved tappable area for Menu icon */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden -mr-2"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileNavMenu
          menuOpen={mobileMenuOpen}
          setMenuOpen={setMobileMenuOpen}
          isRepairSection={isRepairSection} // Pass the flag here
        />
      </header>
    </>
  );
}

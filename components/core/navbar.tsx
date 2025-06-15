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

  // Determine if the current page is in the repair section
  // Assuming URLs for repair section start with /repair/
  const isRepairSection = pathname.startsWith("/repair");

  let desktopNavLinks;
  if (isRepairSection) {
    desktopNavLinks = (
      <>
        <Link href="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/repair" className="hover:text-blue-500 transition">
          All Repairs
        </Link>
        <Link href="/my-services" className="hover:text-blue-500 transition">
          Orders
        </Link>
      </>
    );
  } else {
    desktopNavLinks = (
      <>
        <Link href="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-blue-500 transition">
          About
        </Link>
        <Link href="/my-services" className="hover:text-blue-500 transition">
          Orders
        </Link>
        <Link href="/contact" className="hover:text-blue-500 transition">
          Contact
        </Link>
      </>
    );
  }

  return (
    <header className="bg-white shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div>
          <Image
            src="/logos/text.png"
            alt="Logo"
            width={100}
            height={40}
            className="h-8 sm:h-10 w-auto" // Adjusted logo size for smaller screens
            priority
          />
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
          <Search className="w-6 h-6 cursor-pointer" />
          <CartBtn />
          <ProfileBtn />
          {/* Improved tappable area for Menu icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 md:hidden -mr-2" // Added padding, negative margin to maintain alignment
            aria-label="Open mobile menu"
          >
            <Menu
              className="w-6 h-6 cursor-pointer"
            />
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
  );
}

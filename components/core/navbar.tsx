"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Search, MapPin } from "lucide-react"; // Added MapPin
import CartBtn from "../buttons/cartBtn";
import ProfileBtn from "../buttons/profileBtn";
import MobileNavMenu from "./mobileNavMenu";

interface NavbarProps {
  city?: string;
}

export default function Navbar({ city }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          Fix<span className="text-2xl font-bold text-[#114FEE]">Amigo</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
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
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileNavMenu
        menuOpen={mobileMenuOpen}
        setMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
}

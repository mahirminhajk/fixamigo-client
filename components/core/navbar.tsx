"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import CartBtn from "../buttons/cartBtn";
import ProfileBtn from "../buttons/profileBtn";
import MobileNavMenu from "./mobileNavMenu";

export default function Navbar() {
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
          <Link href="/services" className="hover:text-blue-500 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-blue-500 transition">
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
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

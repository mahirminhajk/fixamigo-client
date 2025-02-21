"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          Fix<span className="text-xl font-bold text-[#114FEE]">Amigo</span>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 cursor-pointer" />
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Full-screen Menu with Navigation Links */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`fixed inset-0 bg-white transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <X
            className="absolute top-5 right-5 w-8 h-8 text-black cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="flex flex-col items-center justify-center h-full space-y-6 text-lg font-bold">
            <Link
              href="/"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

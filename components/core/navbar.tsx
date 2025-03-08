"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 backdrop-blur-lg bg-black/30 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={menuRef}
          className={`w-64 bg-white h-full shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <X
            className="w-8 h-8 text-black cursor-pointer mb-6"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="flex flex-col space-y-6 text-lg font-medium">
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

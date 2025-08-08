"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowLeft, User, Package, ShoppingCart } from "lucide-react";
import CartBtn from "../buttons/cartBtn";
import ProfileBtn from "../buttons/profileBtn";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface UserNavbarProps {
  title?: string;
  showBackButton?: boolean;
}

export default function UserNavbar({
  title,
  showBackButton = true,
}: UserNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Determine active nav item
  const isCart = pathname.includes("/cart");
  const isOrders = pathname.includes("/my-services");

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between h-16">
            {/* Left Section - Back Button or Menu */}
            <div className="flex items-center space-x-3">
              {showBackButton ? (
                <button
                  onClick={() => router.back()}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
              ) : (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
              )}

              {/* Logo - Mobile */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logos/text.png"
                  alt="FixAmigo"
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Center - Title (Mobile) */}
            {title && (
              <div className="flex-1 text-center px-4">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h1>
              </div>
            )}

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-1">
              <CartBtn />
              <ProfileBtn />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logos/text.png"
                  alt="FixAmigo"
                  width={120}
                  height={48}
                  className="h-10 w-auto"
                  priority
                />
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {showBackButton && (
                  <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#D2691E] hover:bg-orange-50 rounded-lg transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}

                <Link
                  href="/my-services"
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isOrders
                      ? "text-[#D2691E] bg-orange-50 border border-orange-200"
                      : "text-gray-600 hover:text-[#D2691E] hover:bg-orange-50"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </Link>

                <Link
                  href="/cart"
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isCart
                      ? "text-[#D2691E] bg-orange-50 border border-orange-200"
                      : "text-gray-600 hover:text-[#D2691E] hover:bg-orange-50"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart</span>
                </Link>

                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#D2691E] hover:bg-orange-50 rounded-lg transition-all duration-200"
                >
                  Browse Services
                </Link>
              </div>
            </div>

            {/* Center - Title (Desktop) */}
            {title && (
              <div className="flex-1 text-center px-8">
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              </div>
            )}

            {/* Right Section - User Actions */}
            <div className="flex items-center space-x-4">
              <CartBtn />
              <ProfileBtn />
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl z-50 transform transition-transform duration-300">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/logos/text.png"
                    alt="FixAmigo"
                    width={100}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 w-6 h-6">
                      <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col p-4 space-y-2">
                <Link
                  href="/my-services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    isOrders
                      ? "bg-orange-50 text-[#D2691E] border border-orange-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Orders</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    isCart
                      ? "bg-orange-50 text-[#D2691E] border border-orange-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Cart</span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Browse Services</span>
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Account Section */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                    Account
                  </p>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link
                    href="/support-request"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z"
                      />
                    </svg>
                    <span className="font-medium">Support</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

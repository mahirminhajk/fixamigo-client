"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";

interface MobileNavMenuProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  isRepairSection?: boolean; // Added optional prop
}

const MobileNavMenu = ({
  menuOpen,
  setMenuOpen,
  isRepairSection, // Destructure the new prop
}: MobileNavMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const user = useHydratedStore(useUserStore, (state) => state.user);
  const isLoggedIn = Boolean(user?._id);

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
  }, [menuOpen, setMenuOpen]);

  let mobileNavLinks;
  if (isRepairSection) {
    mobileNavLinks = (
      <>
        <Link
          href="/"
          className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
          onClick={() => setMenuOpen(false)}
          title="Go to Home"
        >
          Home
        </Link>
        {isLoggedIn ? (
          <Link
            href="/my-services"
            className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
            onClick={() => setMenuOpen(false)}
            title="View your orders"
          >
            Orders
          </Link>
        ) : (
          <Link
            href="/repair"
            className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
            onClick={() => setMenuOpen(false)}
            title="Browse all repair services"
          >
            All Repairs
          </Link>
        )}
      </>
    );
  } else {
    mobileNavLinks = (
      <>
        <Link
          href="/"
          className="block py-2 px-4 text-lg hover:bg-gray-100 rounded-md transition"
          onClick={() => setMenuOpen(false)}
          title="Go to Home"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
          onClick={() => setMenuOpen(false)}
          title="Learn more About us"
        >
          About
        </Link>
        {isLoggedIn ? (
          <Link
            href="/my-services"
            className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
            onClick={() => setMenuOpen(false)}
            title="View your orders"
          >
            Orders
          </Link>
        ) : (
          <Link
            href="/repair"
            className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
            onClick={() => setMenuOpen(false)}
            title="Browse all repair services"
          >
            Repairs
          </Link>
        )}
        <Link
          href="/contact"
          className="block py-2 px-4 text-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition"
          onClick={() => setMenuOpen(false)}
          title="Contact us"
        >
          Contact
        </Link>
      </>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out md:hidden ${
        menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setMenuOpen(false)}
    >
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
      >
        <div className="flex justify-end p-4">
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <nav className="flex flex-col p-4 space-y-2">{mobileNavLinks}</nav>
      </div>
    </div>
  );
};

export default MobileNavMenu;

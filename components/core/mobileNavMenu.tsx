import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface MobileNavMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MobileNavMenu = ({ menuOpen, setMenuOpen }: MobileNavMenuProps) => {
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
  }, [menuOpen, setMenuOpen]);

  return (
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
  );
};

export default MobileNavMenu;

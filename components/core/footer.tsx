import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { INFO } from "@/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Brand Section - Full width on mobile */}
          <div className="col-span-2 lg:col-span-2 mb-4 md:mb-0">
            <div className="mb-3 md:mb-4">
              {/* Logo Section */}
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <Image
                  src="/logos/circle-logo.png"
                  alt="fixamigo logo"
                  title="Fixamigo Logo"
                  width={32}
                  height={32}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <Image
                  src="/logos/text.png"
                  alt="fixamigo logo"
                  title="Fixamigo Title"
                  width={100}
                  height={24}
                  className="h-4 md:h-6 w-auto"
                />
              </div>
              <p className="text-gray-600 text-xs md:text-sm">{INFO.tagline}</p>
            </div>

            {/* Contact Info */}
            <div className="mb-4 md:mb-6">
              <p className="text-gray-600 text-xs md:text-sm mb-1">
                <a
                  href={INFO.emailLink()}
                  className="hover:text-blue-600 transition-colors"
                  title={`Email ${INFO.name}`}
                >
                  {INFO.email}
                </a>
              </p>
              <p className="text-gray-600 text-xs md:text-sm">
                <a
                  href={INFO.phoneLink()}
                  className="hover:text-blue-600 transition-colors"
                  title={`Call ${INFO.name}`}
                >
                  {INFO.phoneLabel}
                </a>
              </p>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3">
                Follow Us:
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <a
                  href={INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <FaInstagram className="w-3 h-3 md:w-4 md:h-4" />
                </a>
                {/* <a
                  href="#"
                  className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-3 h-3 md:w-4 md:h-4" />
                </a> */}
                <a
                  href={INFO.waLink(
                    "Hi, I found your contact through your website. I'd like to know more about your repair services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                  aria-label="WhatsApp"
                  title="Chat with us on WhatsApp"
                >
                  <FaWhatsapp className="w-3 h-3 md:w-4 md:h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 text-gray-800">
              Services
            </h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link
                  href="repair/mobile-phone"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm"
                  title="Repair mobile phones"
                >
                  Mobile
                </Link>
              </li>
              <li>
                <Link
                  href="/repair/laptop"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm"
                  title="Repair laptops"
                >
                  Laptop
                </Link>
              </li>
              <li>
                <Link
                  href="/repair/other"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm"
                  title="Other repair services"
                >
                  Other
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 text-gray-800">
              Company
            </h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm"
                  title="About Fixamigo"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm"
                  title="Read our blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support - Hidden on mobile, shown on md+ */}
          <div className="hidden md:block">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    title="Contact Fixamigo"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    title="Frequently asked questions"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    title="Warranty and returns policy"
                  >
                    Warranty & Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    title="Privacy policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    title="Terms and conditions"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Support & Legal Section */}
        <div className="md:hidden grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">
              Support
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs"
                >
                  Warranty & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-4 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-0">
              © 2025 {INFO.name}. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-800 transition-colors text-xs md:text-sm"
                title="Privacy policy"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-800 transition-colors text-xs md:text-sm"
                title="Terms and conditions"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-gray-800 transition-colors text-xs md:text-sm"
                title="Contact Fixamigo"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

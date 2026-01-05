'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface FixerNavbarProps {
  logo?: string;
  displayName: string;
  primaryColor?: string;
  phone?: string;
  email?: string;
}

export default function FixerNavbar({ logo, displayName, primaryColor, phone, email }: FixerNavbarProps) {
  return (
    <nav 
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      style={{ borderBottomColor: primaryColor || '#e2e8f0' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link href="#" className="flex items-center space-x-3">
            {logo ? (
              <div className="relative h-10 w-10 rounded-md overflow-hidden">
                <Image
                  src={logo}
                  alt={displayName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div 
                className="h-10 w-10 rounded-md flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: primaryColor || '#0f172a' }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xl font-bold text-slate-900">{displayName}</span>
          </Link>

          {/* Desktop Contact Links */}
          <div className="hidden md:flex items-center space-x-4">
            {phone && (
              <a 
                href={`tel:${phone}`}
                className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">{phone}</span>
              </a>
            )}
            {email && (
              <a 
                href={`mailto:${email}`}
                className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium">{email}</span>
              </a>
            )}
            <Button 
              style={{ backgroundColor: primaryColor || '#0f172a' }}
              className="text-white"
            >
              Book Repair
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                {phone && (
                  <a 
                    href={`tel:${phone}`}
                    className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 transition p-2 rounded-md hover:bg-slate-100"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">{phone}</span>
                  </a>
                )}
                {email && (
                  <a 
                    href={`mailto:${email}`}
                    className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 transition p-2 rounded-md hover:bg-slate-100"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">{email}</span>
                  </a>
                )}
                <Button 
                  style={{ backgroundColor: primaryColor || '#0f172a' }}
                  className="text-white w-full"
                >
                  Book Repair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

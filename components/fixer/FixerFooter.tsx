'use client';

import Image from 'next/image';
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface FixerFooterProps {
  displayName: string;
  name: string;
  phone?: string;
  altPhone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  primaryServiceLocation?: string;
  instagram?: string;
  facebook?: string;
  primaryColor?: string;
}

export default function FixerFooter({
  displayName,
  name,
  phone,
  altPhone,
  email,
  whatsapp,
  website,
  primaryServiceLocation,
  instagram,
  facebook,
  primaryColor,
}: FixerFooterProps) {
  return (
    <footer 
      className="border-t mt-12"
      style={{ borderTopColor: primaryColor || '#e2e8f0' }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">{displayName}</h3>
            <p className="text-slate-600 text-sm mb-4">{name}</p>
            {primaryServiceLocation && (
              <div className="flex items-start gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{primaryServiceLocation}</span>
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">Contact Us</h3>
            <div className="space-y-3">
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </a>
              )}
              {altPhone && (
                <a 
                  href={`tel:${altPhone}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>{altPhone}</span>
                </a>
              )}
              {whatsapp && (
                <a 
                  href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </a>
              )}
              {website && (
                <a 
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Social & Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">Connect With Us</h3>
            <div className="flex gap-3 mb-4">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-slate-100 transition"
                  style={{ color: primaryColor || '#0f172a' }}
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-slate-100 transition"
                  style={{ color: primaryColor || '#0f172a' }}
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} {displayName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

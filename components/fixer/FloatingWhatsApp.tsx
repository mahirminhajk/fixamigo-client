'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingWhatsAppProps {
  phone?: string;
  primaryColor?: string;
}

export default function FloatingWhatsApp({ phone, primaryColor }: FloatingWhatsAppProps) {
  if (!phone) return null;

  const whatsappNumber = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: primaryColor || '#25D366' }}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat on WhatsApp
      </span>
    </a>
  );
}

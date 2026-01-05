'use client';

import { MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ShopDetailsProps {
  shopName?: string;
  googleMapLink?: string;
  primaryColor?: string;
}

export default function ShopDetails({ shopName, googleMapLink, primaryColor }: ShopDetailsProps) {
  if (!shopName && !googleMapLink) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
          Shop Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        {shopName && (
          <p className="text-lg font-semibold text-slate-900 mb-3">{shopName}</p>
        )}
        {googleMapLink && (
          <div className="space-y-4">
            {/* Google Map Embed */}
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
              <iframe
                src={googleMapLink.replace('/maps/place/', '/maps/embed/v1/place?key=').concat('&zoom=15')}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a 
                href={googleMapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

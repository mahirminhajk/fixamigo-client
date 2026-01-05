'use client';

import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';

interface ProfileHeaderProps {
  logo?: string;
  displayName: string;
  name: string;
  bio?: string;
  primaryServiceLocation?: string;
  primaryColor?: string;
  rating?: number;
  reviewCount?: number;
}

export default function ProfileHeader({
  logo,
  displayName,
  name,
  bio,
  primaryServiceLocation,
  primaryColor,
  rating = 0,
  reviewCount = 0,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {logo ? (
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <Image
                src={logo}
                alt={displayName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-white shadow-lg flex items-center justify-center text-white text-3xl md:text-4xl font-bold"
              style={{ backgroundColor: primaryColor || '#0f172a' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            {displayName}
          </h1>
          <p className="text-slate-600 mb-3">{name}</p>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
              </div>
              <span className="text-slate-500 text-sm">
                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {/* Location */}
          {primaryServiceLocation && (
            <div className="flex items-center gap-2 text-slate-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{primaryServiceLocation}</span>
            </div>
          )}

          {/* Bio */}
          {bio && (
            <p className="text-slate-700 leading-relaxed">{bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFixerProfileBySlug } from '@/hooks/useFixerProfileBySlug';
import { useCartStore } from '@/stores/cartStore';
import { Loader2, MapPin, Phone, Mail, Globe, AlertCircle } from 'lucide-react';

export default function FixerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { profile, isLoading, error } = useFixerProfileBySlug(slug);
  const setSupplierContext = useCartStore((state) => state.setSupplierContext);

  useEffect(() => {
    if (profile && profile.supplier) {
      // Set supplier context in cart when profile loads
      setSupplierContext(profile.supplier._id, slug);
    }
  }, [profile, slug, setSupplierContext]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-slate-600">Loading fixer profile...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <Card className="max-w-md w-full border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Profile Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              {error || 'The fixer profile you are looking for is not available or has been removed.'}
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/')}
            >
              Go back to home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { supplier, branding, contact, featureFlags } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gradient-to-r from-slate-300 to-slate-400">
        {branding?.coverImage ? (
          <Image
            src={branding.coverImage}
            alt={supplier.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: branding?.primaryColor || '#0f172a',
            }}
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 -mt-20 relative z-10 mb-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            {branding?.logo ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white border-4 border-white shadow-lg">
                <Image
                  src={branding.logo}
                  alt={supplier.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div 
                className="w-32 h-32 rounded-lg border-4 border-white shadow-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{
                  backgroundColor: branding?.primaryColor || '#0f172a',
                }}
              >
                {supplier.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 flex flex-col justify-end pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {supplier.name}
            </h1>
            {branding?.tagline && (
              <p className="text-lg text-slate-600 mb-4">
                {branding.tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {profile.featureFlags?.showInListing && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Verified Fixer
                </span>
              )}
              {profile.subscription?.isActive && (
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{
                    backgroundColor: branding?.primaryColor || '#0f172a',
                  }}
                >
                  Premium Member
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {branding?.description && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-slate-700 leading-relaxed">
                {branding.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contact & Location */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contact?.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <a href={`tel:${contact.phone}`} className="text-primary font-medium hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {contact?.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-primary font-medium hover:underline break-all">
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              {contact?.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600">Website</p>
                    <a 
                      href={contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline break-all"
                    >
                      {contact.website}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          {contact?.address && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    {contact.address && (
                      <p className="font-medium text-slate-900">{contact.address}</p>
                    )}
                    {(contact.city || contact.state || contact.pincode) && (
                      <p className="text-slate-600 text-sm">
                        {[contact.city, contact.state, contact.pincode]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA Section */}
        {featureFlags?.allowDirectOrders && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                Browse our repair services and place your order now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="w-full md:w-auto"
                onClick={() => router.push('/repair')}
                style={{
                  backgroundColor: branding?.primaryColor,
                }}
              >
                Browse Repair Services
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Subscription Info */}
        {profile.subscription && (
          <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Service Available Until:</span>{' '}
              {new Date(profile.subscription.validUntil).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

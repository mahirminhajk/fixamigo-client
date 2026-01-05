'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFixerProfileBySlug } from '@/hooks/useFixerProfileBySlug';
import { useCartStore } from '@/stores/cartStore';
import FixerNavbar from '@/components/fixer/FixerNavbar';
import ProfileHeader from '@/components/fixer/ProfileHeader';
import RepairStats from '@/components/fixer/RepairStats';
import ShopDetails from '@/components/fixer/ShopDetails';
import FixerFooter from '@/components/fixer/FixerFooter';
import FloatingWhatsApp from '@/components/fixer/FloatingWhatsApp';
import FixamigoWatermark from '@/components/fixer/FixamigoWatermark';
import ProductSearch from '@/components/search/ProductSearch';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
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

  const { supplier, branding, contact, location, social, shopDetails, stats } = profile;

  // Ensure supplier data exists
  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="max-w-md w-full border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Profile Incomplete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              This fixer profile is not properly configured. Please contact support.
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

  const displayName = branding?.displayName || supplier.name;
  const primaryColor = branding?.primaryColor || '#0f172a';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Custom Navbar */}
      <FixerNavbar
        logo={branding?.logoUrl}
        displayName={displayName}
        primaryColor={primaryColor}
        phone={contact?.phone}
        email={contact?.email}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader
          logo={branding?.logoUrl}
          displayName={displayName}
          name={supplier.name}
          bio={branding?.bio}
          primaryServiceLocation={location?.primaryServiceLocation}
          primaryColor={primaryColor}
          rating={stats?.rating || 0}
          reviewCount={stats?.reviewCount || 0}
        />

        {/* Repair Stats */}
        <RepairStats
          totalRepairs={stats?.totalRepairs || 0}
          rating={stats?.rating || 0}
          primaryColor={primaryColor}
        />

        {/* Device Search */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Search for Your Device
          </h2>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <ProductSearch />
          </div>
        </div>

        {/* Shop Details */}
        <ShopDetails
          shopName={shopDetails?.name}
          googleMapLink={shopDetails?.googleMapLink}
          primaryColor={primaryColor}
        />

        {/* Tagline/Description */}
        {branding?.tagline && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <p 
              className="text-xl font-semibold text-center"
              style={{ color: primaryColor }}
            >
              {branding.tagline}
            </p>
            {branding.description && (
              <p className="text-slate-600 text-center mt-3">
                {branding.description}
              </p>
            )}
          </div>
        )}
      </main>

      {/* Custom Footer */}
      <FixerFooter
        displayName={displayName}
        name={supplier.name}
        phone={contact?.phone}
        altPhone={contact?.altPhone}
        email={contact?.email}
        whatsapp={contact?.whatsapp}
        website={contact?.website}
        primaryServiceLocation={location?.primaryServiceLocation}
        instagram={social?.instagram}
        facebook={social?.facebook}
        primaryColor={primaryColor}
      />

      {/* Watermark */}
      <FixamigoWatermark displayName={displayName} />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp
        phone={contact?.whatsapp || contact?.phone}
        primaryColor={primaryColor}
      />
    </div>
  );
}

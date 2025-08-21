import BrandsList from "@/components/list/brandsList";
import { Metadata } from "next";
import {
  getMobileBrandsMetadata,
  getMobileBrandsStructuredData,
} from "@/lib/seo/mobileBrandsMetadata";

// SEO Metadata for Mobile Phone Brands Page moved to lib/seo
export const metadata: Metadata = getMobileBrandsMetadata();

export default function AllBrandsPage() {
  // Structured Data for SEO moved to lib/seo
  const structuredData = getMobileBrandsStructuredData();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <BrandsList variant="all" />
    </section>
  );
}

import BrandsList from "@/components/list/brandsList";
import ListRepairCategory from "@/components/list/listRepairCategory";
import InlineToast from "@/components/others/InlineToast";
import ServiceSteps from "@/components/others/ServiceSteps";
import AvailableServices from "@/components/others/availableServices";
import HeroCarousel from "@/components/others/carousel";
import ProductSearch from "@/components/search/ProductSearch";
import {
  getHomepageMetadata,
  getHomepageStructuredData,
} from "@/lib/seo/homepageMetadata";
import Script from "next/script";

// Generate metadata for SEO
export const metadata = getHomepageMetadata();

// Export viewport and themeColor separately
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Home = ({ searchParams }: PageProps) => {
  const structuredData = getHomepageStructuredData();
  const toastParam = typeof searchParams?.toast === "string" ? searchParams?.toast : undefined;
  const shouldShowCampaignNotFound = toastParam === "campaign-not-found";

  return (
    <>
      {shouldShowCampaignNotFound && (
        <InlineToast message="Campaign not found" variant="error" />
      )}

      {/* JSON-LD Structured Data */}
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section>
        <HeroCarousel />
        <ProductSearch />
        <ListRepairCategory />
        <AvailableServices />
        <BrandsList variant="min" />
        <ServiceSteps />
      </section>
    </>
  );
};

export default Home;

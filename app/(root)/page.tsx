import HeroCarousel from "@/components/others/carousel";
import ProductSearch from "@/components/search/ProductSearch";
import ListRepairCategory from "@/components/list/listRepairCategory";
import BrandsList from "@/components/list/brandsList";
import ServiceSteps from "@/components/others/ServiceSteps";
import AvailableServices from "@/components/others/availableServices";
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

const Home = () => {
  const structuredData = getHomepageStructuredData();

  return (
    <>
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

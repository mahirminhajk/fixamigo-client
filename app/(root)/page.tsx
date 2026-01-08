import BrandsList from "@/components/list/brandsList";
import ListRepairCategory from "@/components/list/listRepairCategory";
import InlineToast from "@/components/others/InlineToast";
import ServiceSteps from "@/components/others/ServiceSteps";
import AvailableServices from "@/components/others/availableServices";
import CustomerReviews from "@/components/others/CustomerReviews";
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
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const Home = async ({ searchParams }: PageProps) => {
  const structuredData = getHomepageStructuredData();
  const sp = (await searchParams) ?? {};
  const toastParam = typeof sp.toast === "string" ? sp.toast : undefined;
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
        <ProductSearch />
        <ListRepairCategory />
        <AvailableServices />
        <BrandsList variant="min" />
        <CustomerReviews />
        <ServiceSteps />
      </section>
    </>
  );
};

export default Home;

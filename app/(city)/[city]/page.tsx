import Carousel from "@/components/others/carousel";
import ListRepairCategory from "@/components/list/listRepairCategory";
import BrandsList from "@/components/list/brandsList";
import { supportCities } from "@/constants";
import { getCityMetadata, getCityStructuredData } from "@/lib/seo/cityMetadata";
import Script from "next/script";

// Static Generation
export const dynamicParams = false;
export const revalidate = false;
export async function generateStaticParams() {
  return supportCities.map((city) => ({
    city: city.slug,
  }));
}

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  return getCityMetadata(city);
}

const CityHome = async ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = await params;
  const structuredData = getCityStructuredData(city);

  return (
    <>
      {/* JSON-LD Structured Data for City */}
      <Script
        id="city-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section>
        <Carousel />
        <ListRepairCategory />
        <BrandsList variant="min" />
      </section>
    </>
  );
};

export default CityHome;

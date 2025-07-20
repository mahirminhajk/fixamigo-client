import { brands } from "@/constants";
import {
  listBrandPageMetadata,
  getBrandMetadata,
  getBrandStructuredData,
} from "@/lib/seo/listBrandMetadata";
import { Metadata } from "next";
import BrandPageClient from "@/components/pageSpecific/BrandPageClient";
import { IDevice } from "@/types";
import { fetchDevicesByBrand } from "@/lib/apiService";
import Script from "next/script";

// Static Generation
export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
  const paths: {
    brand: string;
  }[] = [];

  brands.forEach((brand) => {
    paths.push({ brand: brand.slug });
  });

  return paths;
}

// Metadata (SEO) - Use the enhanced metadata function
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  return getBrandMetadata(brand);
}

// Fetch function (remains on the server)
const getData = async (brand: string): Promise<IDevice[]> => {
  return fetchDevicesByBrand(brand);
};

// Page Component (Server Component that fetches data and passes to Client Component)
export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const initialModels: IDevice[] = await getData(brand);
  const { heading } = listBrandPageMetadata(brand);

  // Generate structured data
  const structuredData = getBrandStructuredData(brand, initialModels);

  return (
    <>
      {/* JSON-LD Structured Data for Brand */}
      <Script
        id="brand-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BrandPageClient
        initialModels={initialModels}
        brand={brand}
        heading={heading}
      />
    </>
  );
}

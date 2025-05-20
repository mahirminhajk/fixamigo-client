import { brands } from "@/constants";
import { listBrandPageMetadata } from "@/lib/seo/listBrandMetadata";
import { Metadata } from "next";
import BrandPageClient from "@/components/pageSpecific/BrandPageClient"; // Import the new client component
import { IDevice } from "@/types"; // Import IDevice for type safety

// Static Generation
export const revalidate = 3600;
export const dynamicParams = false; // Keep this if you want to restrict to generated paths

export async function generateStaticParams() {
  const paths: {
    brand: string;
  }[] = [];

  brands.forEach((brand) => {
    paths.push({ brand: brand.slug });
  });

  return paths;
}

// Metadata (SEO) - This remains a server-side function
export async function generateMetadata({
  params,
}: {
  params: { brand: string }; // params is an object with brand string
}): Promise<Metadata> {
  const { brand } = params;
  const meta = listBrandPageMetadata(brand);

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
    },
    twitter: {
      title: meta.metaTitle,
      description: meta.metaDescription,
    },
  };
}

// Fetch function (remains on the server)
const getData = async (brand: string): Promise<IDevice[]> => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/device/brand?value=${brand}`
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch data for brand ${brand}: ${res.status} ${res.statusText}`
      );
      return []; // Return empty array on failure
    }

    const jsonData = await res.json();
    return (jsonData.data as IDevice[]) || []; // Type assertion and ensure data property exists
  } catch (error) {
    console.error("Error fetching models:", error);
    return []; // Return empty array on error
  }
};

// Page Component (Server Component that fetches data and passes to Client Component)
export default async function Page({
  params,
}: {
  params: { brand: string }; // params is an object with brand string
}) {
  const { brand } = params; // Directly access brand
  const initialModels: IDevice[] = await getData(brand); // Fetch models on the server
  const { heading } = listBrandPageMetadata(brand); // Generate heading on the server

  // Pass server-fetched data to the client component
  return (
    <BrandPageClient
      initialModels={initialModels}
      brand={brand}
      heading={heading}
    />
  );
}

/**
 * /repair/mobile-phone/[brand]
 */

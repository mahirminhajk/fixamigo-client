import { brands } from "@/constants";
import ModelList from "@/components/list/modelList";
import { IDevice } from "@/types";
import { listBrandPageMetadata } from "@/lib/seo/listBrandMetadata";
import { Metadata } from "next";

// Static Generation
export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: {
    brand: string;
  }[] = [];

  brands.forEach((brand) => {
    paths.push({ brand: brand.slug });
  });

  return paths;
}

// Metadata (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
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

// Fetch function
const getData = async (brand: string) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/device/brand?value=${brand}`
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    return (await res.json()).data;
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
};

// Page Component
export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const models: IDevice[] = await getData(brand); // Fetch models
  const { heading } = listBrandPageMetadata(brand); // Generate heading

  return (
    <section>
      <ModelList models={models} brand={brand} heading={heading} />
    </section>
  );
}

/**
 * /repair/mobile-phone/[brand]
 */

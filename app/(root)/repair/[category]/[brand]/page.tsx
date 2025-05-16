import { brands, repairCategory } from "@/constants";
import ModelList from "@/components/list/modelList";
import { IDevice } from "@/types";
import { generateBrandPageMeta } from "@/lib/seoUtils";
import { Metadata } from "next";

// Static Generation
export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: {
    category: string;
    brand: string;
  }[] = [];

  repairCategory.forEach((category) => {
    brands.forEach((brand) => {
      paths.push({ category: category.slug, brand: brand.slug });
    });
  });

  return paths;
}

// Metadata (SEO)
export async function generateMetadata({
  params,
}: {
  params: { category: string; brand: string };
}): Promise<Metadata> {
  const { category, brand } = params;
  const meta = generateBrandPageMeta(category, brand);

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
  params: Promise<{ category: string; brand: string }>;
}) {
  const { brand, category } = await params;
  const models: IDevice[] = await getData(brand); // Fetch models
  const { heading } = generateBrandPageMeta(category, brand); // Generate heading

  return (
    <section>
      <ModelList
        models={models}
        category={category}
        brand={brand}
        heading={heading}
      />
    </section>
  );
}

/**
 * /repair/[category]/[brand]
 * ex: /repair/display/apple
 */

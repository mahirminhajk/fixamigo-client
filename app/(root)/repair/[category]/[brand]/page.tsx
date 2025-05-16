import { brands, repairCategory } from "@/constants";
import ModelList from "@/components/list/modelList";
import { IDevice } from "@/types";

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

  return (
    <section>
      <ModelList models={models} category={category} brand={brand} />
    </section>
  );
}

/**
 * /repair/[category]/[brand]
 * ex: /repair/display/apple
 */

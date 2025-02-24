import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { brands, repairCategory } from "@/constants";

export const revalidate = 3600;
export const dynamicParams = false;

// interface
interface Devices {
  data: {
    _id: string;
    name: string;
    slug: string;
    images: string[];
  }[];
}

// Static Generation
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
    const res = await fetch(`${process.env.API_URL}/device?brand=${brand}`);

    if (!res.ok) throw new Error("Failed to fetch data");

    return await res.json(); // Parse JSON response
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
  const models: Devices = await getData(brand); // Fetch models

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Select Your Model from {brand}
      </h1>

      {models.data.length === 0 ? (
        <p className="text-center text-gray-500">
          No models available for {brand}.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {models.data.map((model) => (
            <Link
              key={model._id}
              href={`/repair/${category}/${brand}/${model.slug}`}
              className="w-full"
            >
              <Card className="cursor-pointer transition-transform transform hover:scale-105 h-[180px]">
                <CardContent className="h-full flex flex-col justify-center items-center p-4">
                  <Image
                    src={model.images[0] || "/placeholder.png"} // Fallback if no image
                    alt={model.name}
                    width={80}
                    height={80}
                    className="rounded-md object-contain"
                  />
                  <p className="mt-2 text-sm font-semibold text-center">
                    {model.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * /repair/[category]/[brand]
 * ex: /repair/display/apple
 */

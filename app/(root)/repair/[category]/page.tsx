import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { brands, repairCategory } from "@/constants";

export const dynamicParams = false;

// Static Generation
export async function generateStaticParams() {
  return repairCategory.map((category) => ({
    category: category.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Select Your Brand for {category} Repair
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/repair/${category}/${brand.slug}`}
            className="w-full"
          >
            <Card className="cursor-pointer transition-transform transform hover:scale-105 h-[150px]">
              <CardContent className="h-full flex flex-col justify-center items-center p-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <p className="mt-2 text-sm font-semibold text-center">
                  {brand.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 //* /repair/[category]
 //* ex: /repair/display
 * display
 * ports
 * battery
 * camera
 * speaker
 * others
 */

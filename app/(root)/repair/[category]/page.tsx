import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const dynamicParams = false;

const brands = [
  { name: "Samsung", slug: "samsung", image: "/brands/samsung.png" },
  { name: "Apple", slug: "apple", image: "/brands/apple.png" },
  { name: "Vivo", slug: "vivo", image: "/brands/vivo.png" },
  { name: "Honor", slug: "honor", image: "/brands/honor.png" },
  { name: "IQOO", slug: "iqoo", image: "/brands/iqoo.png" },
  { name: "MI", slug: "mi", image: "/brands/mi.png" },
  { name: "Oneplus", slug: "oneplus", image: "/brands/oneplus.png" },
  { name: "Motorola", slug: "motorola", image: "/brands/motorola.png" },
  { name: "OPPO", slug: "oppo", image: "/brands/oppo.png" },
  { name: "Pixel", slug: "google", image: "/brands/pixel.png" },
  { name: "Poco", slug: "poco", image: "/brands/poco.png" },
  { name: "Realme", slug: "realme", image: "/brands/realme.png" },
];

// Static Generation
export async function generateStaticParams() {
  const categories = [
    "display",
    "ports",
    "battery",
    "camera",
    "speaker",
    "others",
  ];

  return categories.map((category) => ({
    category: category,
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

import { brands } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface BrandsListProps {
  variant: "all" | "min";
  category?: string;
}

const BrandsList = ({ variant, category }: BrandsListProps) => {
  let displayedBrands = brands;
  if (variant === "min") {
    displayedBrands = brands.slice(0, 12);
  } else if (variant === "all") {
    displayedBrands = [...brands.slice(12), ...brands.slice(0, 12)];
  }

  if (!category) {
    category = "mobile-phone";
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-left">
          {category === "mobile-phone"
            ? "Select your brand"
            : `Select Your Brand for ${category} Repair`}
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center justify-center">
          {displayedBrands.map((brand, index) => (
            <Link
              key={index}
              href={`/repair/${category}/${brand.slug}`}
              className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-[4px] shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={80}
                height={40}
              />
            </Link>
          ))}
        </div>

        {variant === "min" && (
          <Link href="/brands">
            <p className="text-gray-500 mt-4 text-center cursor-pointer hover:underline">
              More brands....
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BrandsList;

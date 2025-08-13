import Image from "next/image";
import Link from "next/link";

const brands = [
  { name: "Apple", image: "/brands/apple.webp", slug: "apple" },
  { name: "Samsung", image: "/brands/samsung.webp", slug: "samsung" },
  { name: "Xiaomi", image: "/brands/xiaomi.webp", slug: "xiaomi" },
  { name: "Realme", image: "/brands/realme.webp", slug: "realme" },
  { name: "Vivo", image: "/brands/vivo.webp", slug: "vivo" },
  { name: "Oppo", image: "/brands/oppo.webp", slug: "oppo" },
  { name: "Motorola", image: "/brands/motorola.webp", slug: "motorola" },
  { name: "Nokia", image: "/brands/nokia.webp", slug: "nokia" },
  { name: "Sony", image: "/brands/sony.webp", slug: "sony" },
  { name: "OnePlus", image: "/brands/oneplus.webp", slug: "oneplus" },
  { name: "Pixel", image: "/brands/pixel.webp", slug: "pixel" },
  { name: "Poco", image: "/brands/poco.webp", slug: "poco" },
  { name: "iQOO", image: "/brands/iqoo.webp", slug: "iqoo" },
  { name: "Micromax", image: "/brands/micromax.webp", slug: "micromax" },
  { name: "Honor", image: "/brands/honor.webp", slug: "honor" },
  { name: "Huawei", image: "/brands/huawei.webp", slug: "huawei" },
  { name: "Nothing", image: "/brands/nothing.webp", slug: "nothing" },
  { name: "LG", image: "/brands/lg.webp", slug: "lg" },
];

export default function BrandListInRepair() {
  return (
    <div className="w-full max-w-4xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4 text-[#D2691E]">
        Select your brand
      </h2>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {brands.slice(0, 8).map((brand) => (
          <Link
            href={`/repair/mobile-phone/${brand.slug}`}
            key={brand.slug}
            className="flex items-center justify-center bg-gray-100 p-4 rounded-lg hover:shadow-md transition"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
        ))}
      </div>

      {/* View All Brands */}
      <div className="mt-6 text-center">
        <Link
          href="/brands"
          className="inline-block px-6 py-3 bg-[#D2691E] text-white font-semibold rounded-lg shadow hover:bg-[#121212] transition-colors"
        >
          View All Brands
        </Link>
      </div>
    </div>
  );
}
